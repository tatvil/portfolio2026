'use strict';
/**
 * inap-watch.js
 * Comprueba si la página de la convocatoria TAI del INAP ha cambiado
 * desde la última visita. Si detecta cambios, muestra un banner en la
 * página de inicio.
 *
 * Estrategia:
 *  1. Descarga la página via un proxy CORS (allorigins.win)
 *  2. Extrae solo el texto visible (sin scripts/estilos) y normaliza espacios
 *  3. Calcula un hash djb2 del texto
 *  4. Compara con el hash almacenado en localStorage
 *  5. Si difiere → muestra el banner y guarda el nuevo hash
 *     (el usuario puede silenciarlo con "Lo he visto")
 */

const INAP_URL  = 'https://sede.inap.gob.es/es/procedimientos-y-servicios/seleccion/procesos-selectivos-de-cuerpos-y-escalas-generales/cuerpo-de-tecnicos-auxiliares-de-informatica-de-la-administracion-del-estado-ingreso-libre-convocatoria-2025';
const PROXY     = 'https://api.allorigins.win/get?url=';
const STORE_KEY = 'inap_tai_hash';
const SEEN_KEY  = 'inap_tai_hash_seen';

function djb2(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h = h >>> 0; // mantener 32 bits sin signo
  }
  return h.toString(16);
}

function extraerTexto(html) {
  // Eliminar scripts, estilos, comentarios y atributos dinámicos
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')      // quitar etiquetas
    .replace(/\s+/g, ' ')          // normalizar espacios
    .trim();
}

function mostrarBanner(urlPagina) {
  const banner = document.getElementById('inap-cambio-banner');
  if (!banner) return;
  banner.style.display = 'flex';
  banner.querySelector('.inap-banner-link').href = urlPagina;
}

function ocultarBanner() {
  const banner = document.getElementById('inap-cambio-banner');
  if (!banner) return;
  banner.style.display = 'none';
  // Marcar como visto para esta versión del hash
  const hash = localStorage.getItem(STORE_KEY);
  if (hash) localStorage.setItem(SEEN_KEY, hash);
}

async function comprobarCambios() {
  // Si el navegador no tiene fetch o localStorage, salir silenciosamente
  if (typeof fetch === 'undefined' || typeof localStorage === 'undefined') return;

  const hashPrevio = localStorage.getItem(STORE_KEY);
  const hashVisto  = localStorage.getItem(SEEN_KEY);

  // Si ya hay cambio pendiente que el usuario aún no ha marcado como visto → mostrar banner
  if (hashPrevio && hashPrevio !== hashVisto) {
    mostrarBanner(INAP_URL);
    // Seguir para comprobar si hay cambios adicionales desde entonces
  }

  try {
    const resp = await fetch(PROXY + encodeURIComponent(INAP_URL), { cache: 'no-store' });
    if (!resp.ok) return;
    const data = await resp.json();
    const texto = extraerTexto(data.contents || '');
    if (!texto) return;

    const hashNuevo = djb2(texto);

    if (!hashPrevio) {
      // Primera visita: guardar referencia silenciosamente
      localStorage.setItem(STORE_KEY, hashNuevo);
      localStorage.setItem(SEEN_KEY, hashNuevo);
      return;
    }

    if (hashNuevo !== hashPrevio) {
      // La página cambió
      localStorage.setItem(STORE_KEY, hashNuevo);
      mostrarBanner(INAP_URL);
    }
  } catch (_) {
    // Fallo de red o proxy caído: no hacer nada, sin ruido
  }
}

// ── Arranque ───────────────────────────────────────────────────
// Exponer función de cierre al botón del banner
window.cerrarBannerInap = ocultarBanner;

// Ejecutar cuando la página esté lista (sin bloquear el render)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', comprobarCambios);
} else {
  comprobarCambios();
}
