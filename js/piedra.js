const DOM = {};

function inicializarDOM() {
  DOM.nombre = document.getElementById('nombre');
  DOM.etiquetaJugador = document.getElementById("etiquetaJugador");
  DOM.botonNombre = document.getElementById("botonNombre");
  DOM.errorNombre = document.getElementById("errorNombre");
  DOM.persona = document.getElementById("persona");
  DOM.ordenador = document.getElementById("ordenador");
  DOM.imagenCentral = document.getElementById("imagencentro");
  DOM.puntosOrdenador = document.getElementById("puntos-ordenador");
  DOM.puntosPersona = document.getElementById("puntos-persona");
  DOM.eleccionjugador = document.getElementById("eleccionjugador");
  DOM.eleccionordenador = document.getElementById("eleccionordenador");
  DOM.resultado = document.getElementById("resultado");
  DOM.opciones = document.querySelectorAll(".btn-img");
  DOM.toggleTema = document.getElementById("toggle-tema");

  DOM.eleccionordenador = document.getElementById("eleccionordenador");
  DOM.resultado = document.getElementById("resultado");

  DOM.opciones = document.querySelectorAll(".game-btn"); 
  DOM.toggleTema = document.getElementById("toggle-tema");
}

function ocultarJuego() {
  DOM.persona.style.visibility = "hidden";
  DOM.ordenador.style.visibility = "hidden";
}

function mostrarJuego() {
  DOM.persona.style.visibility = "visible";
  DOM.ordenador.style.visibility = "visible";
}

function verificarNombre() {
  const nombreValido = DOM.nombre.value.trim();
  if (nombreValido === "") {
    DOM.errorNombre.textContent = "El nombre no puede estar vacío";
    ocultarJuego();
  } else {
    DOM.errorNombre.textContent = "";
    comenzarPartida(nombreValido);
    mostrarJuego();
  }
}

function comenzarPartida(nombreJugador) {
  DOM.etiquetaJugador.textContent = `Puntuación de ${nombreJugador}:`;
  DOM.puntosOrdenador.textContent = "0";
  DOM.puntosPersona.textContent = "0";
}

function animarResultado(tipo) {
  DOM.resultado.classList.remove("victoria", "derrota", "empate");
  void DOM.resultado.offsetWidth;
  DOM.resultado.classList.add(tipo);
}

function reproducirSonido() {
  const sonidoClick = new Audio("sounds/click.wav");
  sonidoClick.currentTime = 0;
  sonidoClick.play();
}

function quienGana(opcionJugador) {
    // 1. Definir opciones y elección aleatoria del ordenador
    const opciones = ["piedra", "papel", "tijera", "lagarto", "spock"];
    const opcionOrdenador = opciones[Math.floor(Math.random() * opciones.length)];

    // Diccionario de emojis para actualizar los textos de pantalla
    const emojis = {
        piedra: "🪨",
        papel: "📄",
        tijera: "✂️",
        lagarto: "🦎",
        spock: "🖖"
    };

    // 2. Actualizar visualmente la elección en el DOM
    DOM.eleccionjugador.textContent = `Elegiste: ${emojis[opcionJugador]}`;
    DOM.eleccionordenador.textContent = `PC eligió: ${emojis[opcionOrdenador]}`;

    // 3. Resaltar el icono del ordenador (opcional, para dar feedback visual)
    document.querySelectorAll('.game-btn-pc').forEach(el => el.classList.remove('pc-elegido'));
    const pcIcono = document.getElementById(`pc-${opcionOrdenador}`);
    if (pcIcono) {
        pcIcono.classList.add('pc-elegido');
    }

    // 4. Lógica de victoria (Reglas extendidas de Sheldon Cooper)
    // El jugador gana si su opción vence a la del ordenador
    const ganaJugador =
        (opcionJugador === "piedra" && (opcionOrdenador === "tijera" || opcionOrdenador === "lagarto")) ||
        (opcionJugador === "papel" && (opcionOrdenador === "piedra" || opcionOrdenador === "spock")) ||
        (opcionJugador === "tijera" && (opcionOrdenador === "papel" || opcionOrdenador === "lagarto")) ||
        (opcionJugador === "lagarto" && (opcionOrdenador === "papel" || opcionOrdenador === "spock")) ||
        (opcionJugador === "spock" && (opcionOrdenador === "piedra" || opcionOrdenador === "tijera"));

    // 5. Determinar resultado y actualizar puntuación
    if (opcionJugador === opcionOrdenador) {
        DOM.resultado.textContent = "¡Empate! 🤝";
        animarResultado("empate");
    } else if (ganaJugador) {
        DOM.resultado.textContent = "¡Has ganado! 🏆";
        // Convertimos a número, sumamos 1 y devolvemos a texto
        let puntosActuales = parseInt(DOM.puntosPersona.textContent);
        DOM.puntosPersona.textContent = (puntosActuales + 1).toString();
        animarResultado("victoria");
    } else {
        DOM.resultado.textContent = "Has perdido 😢";
        let puntosPC = parseInt(DOM.puntosOrdenador.textContent);
        DOM.puntosOrdenador.textContent = (puntosPC + 1).toString();
        animarResultado("derrota");
    }

    // 6. Efecto de sonido
    reproducirSonido();
}

// Reglas: qué opciones vence cada elección
const vence = {
  piedra:  ["tijera", "lagarto"],
  papel:   ["piedra", "spock"],
  tijera:  ["papel",  "lagarto"],
  lagarto: ["papel",  "spock"],
  spock:   ["piedra", "tijera"]
};

const nombresMapa = {
  piedra: "Piedra", papel: "Papel", tijera: "Tijera",
  lagarto: "Lagarto", spock: "Spock"
};

function activarMapaHover(choice) {
  const mapa = document.getElementById("mapa-juego");
  if (!mapa) return;

  mapa.classList.add("mapa-activo");

  // Marcar nodo origen
  const origen = document.getElementById(`nodo-${choice}`);
  if (origen) origen.classList.add("nodo-origen");

  // Marcar nodos vencidos y conexiones activas
  vence[choice].forEach(beaten => {
    const nodo = document.getElementById(`nodo-${beaten}`);
    if (nodo) nodo.classList.add("nodo-vencido");
  });
  mapa.querySelectorAll(`.conexion[data-from="${choice}"]`)
      .forEach(l => l.classList.add("conexion-activa"));

  // Texto de pista
  const hint = document.getElementById("mapa-hint");
  if (hint) {
    const vencidos = vence[choice].map(v => nombresMapa[v]).join(" y ");
    hint.textContent = `${nombresMapa[choice]} vence a: ${vencidos}`;
  }
}

function desactivarMapaHover() {
  const mapa = document.getElementById("mapa-juego");
  if (!mapa) return;

  mapa.classList.remove("mapa-activo");
  mapa.querySelectorAll(".nodo-origen, .nodo-vencido")
      .forEach(n => n.classList.remove("nodo-origen", "nodo-vencido"));
  mapa.querySelectorAll(".conexion-activa")
      .forEach(l => l.classList.remove("conexion-activa"));

  const hint = document.getElementById("mapa-hint");
  if (hint) hint.textContent = "";
}

function configurarEventos() {
  DOM.botonNombre.addEventListener("click", verificarNombre);
  DOM.nombre.addEventListener("change", verificarNombre);
  DOM.toggleTema.addEventListener("click", () => document.body.classList.toggle("dark"));

  DOM.opciones.forEach(op => {
    op.addEventListener("click", () => {
      DOM.opciones.forEach(o => o.classList.remove("seleccionada"));
      op.classList.add("seleccionada");
      quienGana(op.id);
    });
    op.addEventListener("mouseenter", () => activarMapaHover(op.dataset.choice));
    op.addEventListener("mouseleave", desactivarMapaHover);
  });
}

window.addEventListener("load", () => {
  inicializarDOM();
  ocultarJuego();
  configurarEventos();
});
