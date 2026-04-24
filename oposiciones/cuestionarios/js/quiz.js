/**
 * cuestionarios/js/quiz.js
 * Lógica del cuestionario TAI con fórmula de corrección AGE.
 * Fórmula: Nota = (Aciertos - Fallos/3) / TotalPreguntas * 10
 */

// ── Estado ──────────────────────────────────────────────────
let preguntas     = [];
let supuestosData = {};   // { "Supuesto I": [...], "Supuesto II": [...] }
let faseActual    = 'test'; // 'test' | 'supuesto'
let indice        = 0;
let aciertos      = 0;
let fallos        = 0;
let respondida    = false;

// ── Elementos DOM ────────────────────────────────────────────
const selExamen       = document.getElementById('sel-examen');
const btnIniciar      = document.getElementById('btn-iniciar');
const btnSiguiente    = document.getElementById('btn-siguiente');
const seccionQuiz     = document.getElementById('seccion-quiz');
const seccionFinal    = document.getElementById('seccion-final');
const seccionEmpty    = document.getElementById('seccion-empty');
const seccionSupSel   = document.getElementById('seccion-supuesto-sel');
const supCardsWrap    = document.getElementById('sup-cards');
const contextoPanel   = document.getElementById('contexto-pregunta');
const examPdfsPanel   = document.getElementById('exam-pdfs');

// ── Mapa de PDFs por examen ───────────────────────────────────
const EXAM_PDFS = {
  'data/TAI_2019.json': [
    { label: 'Cuestionario oficial',     icon: 'fa-file-alt',  url: 'pdfs/cues_1er_ejer_TAI-L_oep19_154AB89SD658.pdf' },
    { label: 'Plantilla definitiva',     icon: 'fa-check-square', url: 'pdfs/Plantilla_defTAI-L1ejer_154AB89SD658.pdf' },
    { label: 'Plantilla provisional',    icon: 'fa-clipboard', url: 'pdfs/plant_prov_1er_ejer_TAI-L_oep19_154AB89SD658.pdf' },
    { label: 'Material adicional (supuesto)', icon: 'fa-book-open', url: 'pdfs/07TAIL_154AB89SD658.pdf' },
  ],
  'data/TAI_2023.json': [
    { label: 'Cuestionario oficial',     icon: 'fa-file-alt',  url: 'pdfs/Cuestionario TAI-L_2023.pdf' },
    { label: 'Plantilla de respuestas',  icon: 'fa-check-square', url: 'pdfs/PlantillaRespuestas TAI-L_2023.pdf' },
  ],
  'data/TAI_2024A.json': [
    { label: 'Cuestionario oficial',     icon: 'fa-file-alt',  url: 'pdfs/Cuestionario_TAI_LI_2024_A_M8L91VL1CL_154AB89SD658.pdf' },
    { label: 'Plantilla de respuestas',  icon: 'fa-check-square', url: 'pdfs/Plantilla_Respuestas_PROV_TAI_LI_2024_A_6J5MFQ8OEN_154AB89SD658.pdf' },
    { label: 'Material supuesto II',     icon: 'fa-book-open', url: 'data/tai_2024A_supuesto2.md' },
  ],
  'data/TAI_2024B.json': [
    { label: 'Cuestionario oficial',     icon: 'fa-file-alt',  url: 'pdfs/Cuestionario_TAI_LI_2024_B_DNFGFEK45R_154AB89SD658.pdf' },
    { label: 'Plantilla de respuestas',  icon: 'fa-check-square', url: 'pdfs/Plantilla_Respuestas_PROV_TAI_LI_2024_B_JQE95HBC1R_154AB89SD658.pdf' },
  ],
};

const elPreguntaNum   = document.getElementById('pregunta-num');
const elPreguntaTxt   = document.getElementById('pregunta-txt');
const elOpciones      = document.getElementById('opciones');
const elFeedback      = document.getElementById('feedback');

const elAciertos      = document.getElementById('val-aciertos');
const elFallos        = document.getElementById('val-fallos');
const elProgreso      = document.getElementById('val-progreso');
const elNota          = document.getElementById('val-nota');

// ── Eventos ──────────────────────────────────────────────────
btnIniciar.addEventListener('click', iniciarExamen);
btnSiguiente.addEventListener('click', siguiente);

selExamen.addEventListener('change', () => {
  btnIniciar.disabled = !selExamen.value;
  renderExamPdfs(selExamen.value);
});

function renderExamPdfs(url) {
  const pdfs = EXAM_PDFS[url];
  if (!pdfs || !pdfs.length) { examPdfsPanel.style.display = 'none'; return; }
  examPdfsPanel.innerHTML =
    '<span class="exam-pdfs-label"><i class="fas fa-file-pdf"></i> Documentos INAP:</span>' +
    pdfs.map(p =>
      `<a href="${encodeURI(p.url)}" target="_blank" rel="noopener" class="exam-pdf-link">` +
      `<i class="fas ${p.icon}"></i> ${escHtml(p.label)}</a>`
    ).join('');
  examPdfsPanel.style.display = 'flex';
}

// ── Funciones ────────────────────────────────────────────────
async function iniciarExamen() {
  const url = selExamen.value;
  if (!url) return;

  btnIniciar.disabled = true;
  btnIniciar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando…';

  try {
    const datos = await fetch(url).then(r => r.json());
    const todas = Array.isArray(datos) ? datos : (datos.preguntas || []);
    // Separar preguntas tipo test de supuestos prácticos
    const testQs     = todas.filter(p => !p.contexto?.supuesto);
    const supuestoQs = todas.filter(p =>  p.contexto?.supuesto);
    preguntas    = mezclar(testQs);
    supuestosData = {};
    for (const p of supuestoQs) {
      const nombre = p.contexto.supuesto;
      if (!supuestosData[nombre]) supuestosData[nombre] = [];
      supuestosData[nombre].push(p);
    }
  } catch (e) {
    alert('Error cargando el examen. Comprueba la ruta del fichero.');
    btnIniciar.disabled = false;
    btnIniciar.innerHTML = '<i class="fas fa-play"></i> Iniciar';
    return;
  }

  faseActual = 'test';
  indice     = 0;
  aciertos   = 0;
  fallos     = 0;
  respondida = false;

  mostrarSolo('quiz');
  actualizarMarcador();
  mostrarPregunta();

  btnIniciar.disabled = false;
  btnIniciar.innerHTML = '<i class="fas fa-redo"></i> Reiniciar';
}

function mostrarSolo(seccion) {
  seccionEmpty.style.display   = seccion === 'empty'  ? 'block' : 'none';
  seccionQuiz.style.display    = seccion === 'quiz'   ? 'block' : 'none';
  seccionFinal.style.display   = seccion === 'final'  ? 'block' : 'none';
  seccionSupSel.style.display  = seccion === 'supsel' ? 'block' : 'none';
}

function mostrarSelectorSupuesto() {
  supCardsWrap.innerHTML = '';
  for (const [nombre, pregs] of Object.entries(supuestosData)) {
    const ctx = pregs[0]?.contexto || {};
    const ref = ctx.referencia_diagrama || ctx.referencia || null;
    const esImg = ref && /\.(png|jpg|jpeg|gif|webp)$/i.test(ref);
    const esPdf = ref && /\.pdf$/i.test(ref);

    const card = document.createElement('div');
    card.className = 'sup-card';
    card.innerHTML = `
      <div class="sup-card-header">
        <i class="fas fa-file-code"></i>
        <strong>${escHtml(nombre)}</strong>
        <span class="sup-card-num">${pregs.length} preguntas</span>
      </div>
      <p class="sup-card-desc">${escHtml(ctx.descripcion || '')}</p>
      ${esImg ? `<div class="sup-material"><img src="data/${ref}" alt="Material ${escHtml(nombre)}" style="max-width:100%;border-radius:6px;margin:.5rem 0"></div>` : ''}
      ${esPdf ? `<div class="sup-material"><a href="data/${ref}" target="_blank" rel="noopener" class="btn btn-outline" style="font-size:.85rem"><i class="fas fa-file-pdf"></i> Ver enunciado (PDF)</a></div>` : ''}
      <button class="btn btn-primary" style="margin-top:.75rem" onclick="iniciarSupuesto('${nombre.replace(/'/g, "\\'")}')"><i class="fas fa-play"></i> Practicar este supuesto</button>
    `;
    supCardsWrap.appendChild(card);
  }
  mostrarSolo('supsel');
}

function iniciarSupuesto(nombre) {
  preguntas  = supuestosData[nombre] || [];
  faseActual = 'supuesto';
  indice     = 0;
  aciertos   = 0;
  fallos     = 0;
  respondida = false;
  mostrarSolo('quiz');
  actualizarMarcador();
  mostrarPregunta();
}

function mostrarPregunta() {
  respondida = false;
  btnSiguiente.style.display = 'none';
  elFeedback.className = 'question-feedback';
  elFeedback.textContent = '';

  if (indice >= preguntas.length) {
    if (faseActual === 'test' && Object.keys(supuestosData).length > 0) {
      mostrarSelectorSupuesto();
    } else {
      finalizarExamen();
    }
    return;
  }

  const p = preguntas[indice];

  elPreguntaNum.textContent = `Pregunta ${indice + 1} de ${preguntas.length}`;
  elPreguntaTxt.textContent = p.pregunta;

  // Mostrar contexto si estamos en un supuesto práctico
  if (faseActual === 'supuesto' && p.contexto?.descripcion) {
    contextoPanel.style.display = 'block';
    contextoPanel.innerHTML = `<i class="fas fa-info-circle"></i> <strong>Contexto:</strong> ${escHtml(p.contexto.descripcion)}`;
  } else {
    contextoPanel.style.display = 'none';
  }

  elOpciones.innerHTML = '';
  for (const [letra, texto] of Object.entries(p.opciones)) {
    const li = document.createElement('li');
    li.className = 'options-list__item';

    const label = document.createElement('label');
    label.className = 'option-label';
    label.innerHTML = `
      <input type="radio" name="resp" value="${letra}">
      <span class="option-letter">${letra.toUpperCase()})</span>
      <span>${escHtml(texto)}</span>`;

    label.querySelector('input').addEventListener('change', () => {
      if (!respondida) comprobar(p);
    });

    li.appendChild(label);
    elOpciones.appendChild(li);
  }

  actualizarMarcador();
}

function comprobar(p) {
  respondida = true;
  const marcada = document.querySelector('input[name="resp"]:checked');
  if (!marcada) return;

  // Deshabilitar todos los radio
  document.querySelectorAll('input[name="resp"]').forEach(r => r.disabled = true);

  // Marcar opciones
  document.querySelectorAll('.option-label').forEach(label => {
    const val = label.querySelector('input').value;
    if (val === p.correcta) label.classList.add('correct');
    else if (val === marcada.value) label.classList.add('incorrect');
  });

  if (marcada.value === p.correcta) {
    aciertos++;
    elFeedback.textContent = '✔ ¡Correcto!';
    elFeedback.className = 'question-feedback show ok';
  } else {
    fallos++;
    elFeedback.textContent = `✘ Incorrecto. La respuesta correcta era la ${p.correcta.toUpperCase()})`;
    elFeedback.className = 'question-feedback show ko';
  }

  actualizarMarcador();
  btnSiguiente.style.display = 'inline-flex';
  btnSiguiente.focus();
}

function siguiente() {
  indice++;
  mostrarPregunta();
  // mostrarPregunta() detecta si el índice superó el total y actúa
}

function actualizarMarcador() {
  const contestadas = aciertos + fallos;
  const puntosNetos = aciertos - fallos / 3;
  const nota = contestadas > 0
    ? Math.max(0, (puntosNetos / preguntas.length) * 10).toFixed(2)
    : '—';

  elAciertos.textContent  = aciertos;
  elFallos.textContent    = fallos;
  elProgreso.textContent  = `${contestadas} / ${preguntas.length}`;
  elNota.textContent      = nota;
}

function finalizarExamen() {
  mostrarSolo('final');

  const total       = preguntas.length;
  const puntosNetos = aciertos - fallos / 3;
  const nota        = Math.max(0, (puntosNetos / total) * 10).toFixed(2);
  const sinRespuesta = total - aciertos - fallos;

  document.getElementById('final-nota').textContent    = nota;
  document.getElementById('final-aciertos').textContent = aciertos;
  document.getElementById('final-fallos').textContent   = fallos;
  document.getElementById('final-sin').textContent      = sinRespuesta;
  document.getElementById('final-total').textContent    = total;

  const notaNum = parseFloat(nota);
  const color   = notaNum >= 5 ? 'var(--success)' : notaNum >= 4 ? 'var(--warning)' : 'var(--error)';
  document.getElementById('final-nota').style.color = color;
}

// ── Helpers ───────────────────────────────────────────────────
function mezclar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
