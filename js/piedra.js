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
  const opciones = ["piedra", "papel", "tijera", "lagarto", "spock"];
  const opcionOrdenador = opciones[Math.floor(Math.random() * opciones.length)];

  DOM.eleccionjugador.textContent = opcionJugador;
  DOM.eleccionordenador.textContent = opcionOrdenador;

  const ganaJugador =
    (opcionJugador === "piedra" && ["tijera", "lagarto"].includes(opcionOrdenador)) ||
    (opcionJugador === "papel" && ["piedra", "spock"].includes(opcionOrdenador)) ||
    (opcionJugador === "tijera" && ["papel", "lagarto"].includes(opcionOrdenador)) ||
    (opcionJugador === "lagarto" && ["papel", "spock"].includes(opcionOrdenador)) ||
    (opcionJugador === "spock" && ["piedra", "tijera"].includes(opcionOrdenador));

  if (opcionJugador === opcionOrdenador) {
    DOM.resultado.textContent = "Empate";
    animarResultado("empate");
  } else if (ganaJugador) {
    DOM.resultado.textContent = "Ganaste";
    DOM.puntosPersona.textContent = (parseInt(DOM.puntosPersona.textContent) + 1).toString();
    animarResultado("victoria");
  } else {
    DOM.resultado.textContent = "Perdiste";
    DOM.puntosOrdenador.textContent = (parseInt(DOM.puntosOrdenador.textContent) + 1).toString();
    animarResultado("derrota");
  }

  reproducirSonido();
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
  });
}

window.addEventListener("load", () => {
  inicializarDOM();
  ocultarJuego();
  configurarEventos();
});
