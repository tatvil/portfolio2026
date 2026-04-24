'use strict';

// ── Configuración ──────────────────────────────────────────────
// BOE Sección II-B: Oposiciones, concursos y vacantes
const BOE_RSS   = 'https://www.boe.es/rss/boe_dias.php?s=2B';
// Proxy CORS gratuito que convierte RSS a JSON
const RSS2JSON  = 'https://api.rss2json.com/v1/api.json?rss_url=';
// Palabras clave para resaltar entradas de interés informático/TAI
const KW_TAI    = /\b(TAI|T\.A\.I|técnico[a]? (de )?administración (general |de la )?inform|inform[aá]tic|sistemas?\s+de\s+información|AGE\b)/i;

// ── Carga del feed BOE ─────────────────────────────────────────
async function cargarBOE() {
  const panel = document.getElementById('boe-items');
  const badge = document.getElementById('boe-fecha');

  try {
    const resp = await fetch(RSS2JSON + encodeURIComponent(BOE_RSS));
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();
    if (data.status !== 'ok') throw new Error('Feed error: ' + data.message);

    const items = data.items || [];
    if (items.length === 0) {
      panel.innerHTML = '<p class="news-empty">No hay publicaciones recientes en esta sección.</p>';
      badge.textContent = 'Sin datos';
      return;
    }

    // Separar: primero los que coincidan con TAI/informática, luego el resto
    const importantes = items.filter(it => KW_TAI.test(it.title + ' ' + (it.description || '')));
    const resto       = items.filter(it => !KW_TAI.test(it.title + ' ' + (it.description || '')));
    const ordenados   = [...importantes, ...resto].slice(0, 25);

    // Fecha de la última actualización del feed
    const fechaFeed = data.feed?.lastBuildDate
      ? new Date(data.feed.lastBuildDate).toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' })
      : 'hoy';
    badge.textContent = 'Act. ' + fechaFeed;

    panel.innerHTML = ordenados.map(item => {
      const esTAI = KW_TAI.test(item.title + ' ' + (item.description || ''));
      const fecha = item.pubDate
        ? new Date(item.pubDate).toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' })
        : '';
      const titulo = escHtml(truncar(item.title || 'Sin título', 120));

      return `
        <a href="${escHtml(item.link || '#')}" target="_blank" rel="noopener"
           class="news-item${esTAI ? ' news-item--tai' : ''}">
          <div class="news-item-meta">
            ${esTAI
              ? '<span class="news-tag-tai"><i class="fas fa-star"></i> TAI / Informática</span>'
              : ''}
            <span class="news-date">${fecha}</span>
          </div>
          <div class="news-title">${titulo}</div>
        </a>`;
    }).join('');

  } catch (err) {
    console.warn('[noticias.js] Error cargando BOE:', err.message);
    badge.textContent = 'Error';
    panel.innerHTML = `
      <div class="news-error">
        <i class="fas fa-exclamation-triangle"></i>
        No se pudo cargar el feed automáticamente. Consulta el BOE directamente:
        <a href="https://www.boe.es/diario_boe/ultimos_dias.php" target="_blank" rel="noopener">
          Últimas publicaciones BOE <i class="fas fa-external-link-alt"></i>
        </a>
      </div>`;
  }
}

// ── Helpers ────────────────────────────────────────────────────
function escHtml(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function truncar(s, max) {
  return s.length > max ? s.slice(0, max) + '…' : s;
}

// ── Arranque ───────────────────────────────────────────────────
cargarBOE();
