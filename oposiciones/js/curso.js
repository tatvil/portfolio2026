/**
 * js/curso.js
 * Lógica del visor de curso: sidebar, carga de markdown y navegación.
 * Depende de: js/temas.js + marked.js (CDN)
 */

// ── Estado ──────────────────────────────────────────────────
let currentBloque = 1;
let currentTema   = 1;

// ── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  currentBloque = parseInt(params.get('bloque') || '1', 10);
  currentTema   = parseInt(params.get('tema')   || '1', 10);

  buildSidebar();
  loadTema(currentBloque, currentTema);
});

// ── Build sidebar ───────────────────────────────────────────
function buildSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  let html = '<div class="sidebar-header">TEMARIO TAI – AGE</div>';

  for (const bloque of TEMARIO) {
    const isOpenBloque = (bloque.id === currentBloque);
    html += `
      <div class="bloque-group ${isOpenBloque ? 'open' : ''}" id="bloque-group-${bloque.id}">
        <div class="bloque-group-header" onclick="toggleBloque(${bloque.id})">
          <span style="color:${bloque.color}">&#x25A0;</span>
          <span>Bloque ${toRoman(bloque.id)}</span>
          <span class="chevron">&#9654;</span>
        </div>
        <div class="bloque-group-items">`;

    for (const tema of bloque.temas) {
      const isActive = (bloque.id === currentBloque && tema.num === currentTema);
      const shortTitle = shortTemaTitle(tema.titulo);
      html += `
          <div class="sidebar-item ${isActive ? 'active' : ''}"
               id="item-${bloque.id}-${tema.num}"
               onclick="navigateTo(${bloque.id}, ${tema.num})">
            <span class="item-num">${tema.num}.</span>
            <span>${shortTitle}</span>
          </div>`;
    }

    html += `
        </div>
      </div>`;
  }

  sidebar.innerHTML = html;
}

// ── Toggle bloque ────────────────────────────────────────────
function toggleBloque(id) {
  const group = document.getElementById(`bloque-group-${id}`);
  if (group) group.classList.toggle('open');
}

// ── Navigate ─────────────────────────────────────────────────
function navigateTo(bloqueId, temaNum) {
  currentBloque = bloqueId;
  currentTema   = temaNum;
  const url = new URL(location.href);
  url.searchParams.set('bloque', bloqueId);
  url.searchParams.set('tema', temaNum);
  history.pushState({}, '', url.toString());
  updateSidebarActive();
  loadTema(bloqueId, temaNum);
  // Cerrar sidebar en móvil
  document.querySelector('.sidebar')?.classList.remove('open');
}

// ── Load markdown ─────────────────────────────────────────────
async function loadTema(bloqueId, temaNum) {
  const bloque = TEMARIO.find(b => b.id === bloqueId);
  if (!bloque) return showError('Bloque no encontrado.');
  const tema = bloque.temas.find(t => t.num === temaNum);
  if (!tema) return showError('Tema no encontrado.');

  const content = document.getElementById('lesson-content');
  if (!content) return;

  content.innerHTML = '<div class="spinner"><i class="fas fa-circle-notch fa-spin"></i></div>';

  try {
    const resp = await fetch(tema.archivo);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const md = await resp.text();
    renderMarkdown(md, tema, bloque, bloqueId, temaNum);
  } catch (e) {
    showError(`No se ha podido cargar <strong>${tema.archivo}</strong>.<br><small>${e.message}</small>`);
  }
}

function renderMarkdown(md, tema, bloque, bloqueId, temaNum) {
  const { prev, next, pos, total } = getNavigation(bloqueId, temaNum);

  const prevBtn = prev
    ? `<button class="lesson-nav-btn" onclick="navigateTo(${prev.bloqueId},${prev.temaNum})">
         <i class="fas fa-chevron-left"></i> Anterior
       </button>`
    : `<button class="lesson-nav-btn disabled"><i class="fas fa-chevron-left"></i> Anterior</button>`;

  const nextBtn = next
    ? `<button class="lesson-nav-btn" onclick="navigateTo(${next.bloqueId},${next.temaNum})">
         Siguiente <i class="fas fa-chevron-right"></i>
       </button>`
    : `<button class="lesson-nav-btn disabled">Siguiente <i class="fas fa-chevron-right"></i></button>`;

  const html = marked.parse(md);

  document.getElementById('lesson-content').innerHTML = `
    <div class="md-body">${html}</div>
    <nav class="lesson-nav" aria-label="Navegación entre temas">
      ${prevBtn}
      <span class="lesson-pos">Tema ${pos} de ${total} &nbsp;·&nbsp; Bloque ${toRoman(bloqueId)}</span>
      ${nextBtn}
    </nav>`;

  // Actualizar título de pestaña
  document.title = `T${temaNum} – Bloque ${toRoman(bloqueId)} | TAI–AGE`;

  // Scroll arriba
  document.querySelector('.content-pane')?.scrollTo(0, 0);

  // Actualizar progress en topbar
  updateTopbarProgress(pos, total);
}

function showError(msg) {
  document.getElementById('lesson-content').innerHTML = `
    <div class="empty-state">
      <i class="fas fa-exclamation-triangle" style="color:var(--warning)"></i>
      <p>Error cargando el tema</p>
      <p style="font-size:.85rem;color:var(--text-muted)">${msg}</p>
    </div>`;
}

// ── Sidebar active ────────────────────────────────────────────
function updateSidebarActive() {
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
  const el = document.getElementById(`item-${currentBloque}-${currentTema}`);
  if (el) {
    el.classList.add('active');
    el.scrollIntoView({ block: 'nearest' });
  }
  // Abrir bloque activo
  document.querySelectorAll('.bloque-group').forEach(g => g.classList.remove('open'));
  document.getElementById(`bloque-group-${currentBloque}`)?.classList.add('open');
}

// ── Topbar progress ───────────────────────────────────────────
function updateTopbarProgress(pos, total) {
  const el = document.querySelector('.topbar-progress');
  if (el) el.textContent = `${pos} / ${total}`;
}

// ── Hamburger (móvil) ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.querySelector('.sidebar').classList.toggle('open');
    });
  }
  // Cerrar sidebar al pulsar fuera (móvil)
  document.addEventListener('click', e => {
    if (window.innerWidth > 768) return;
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !sidebar.contains(e.target) && e.target.id !== 'menu-toggle') {
      sidebar.classList.remove('open');
    }
  });
});

// ── broswer back/forward ──────────────────────────────────────
window.addEventListener('popstate', () => {
  const params = new URLSearchParams(location.search);
  currentBloque = parseInt(params.get('bloque') || '1', 10);
  currentTema   = parseInt(params.get('tema')   || '1', 10);
  updateSidebarActive();
  loadTema(currentBloque, currentTema);
});

// ── Helpers ───────────────────────────────────────────────────
function toRoman(n) {
  return ['', 'I', 'II', 'III', 'IV', 'V'][n] ?? n;
}

/**
 * Acorta el título del tema al primer fragmento antes de "." o ":" (máx 55 chars).
 */
function shortTemaTitle(titulo) {
  const first = titulo.split(/[.:–]/)[0].trim();
  return first.length > 55 ? first.slice(0, 53) + '…' : first;
}
