
// ===============================
// FUNCIONES DE CONSULTA API
// https://ergast.com/mrd/overview/f1/
// ===============================

async function obtenerCalendario() {
    // Cargar la programación completa de la actual temporada
    const response = await fetch("https://api.jolpi.ca/ergast/f1/current.json");
    const data = await response.json();
    const carreras = data.MRData.RaceTable.Races;
    return carreras;
}

function encontrarSiguienteCarrera(carreras) {
    const ahora = new Date();
    for (let carrera of carreras) {
        const fecha = new Date(`${carrera.date}T${carrera.time || '00:00:00Z'}`);
        if (fecha > ahora) {
            return { ...carrera, fecha };
        }
    }
    return null;
}

// ===============================
// CUENTA ATRÁS DINÁMICA
// ===============================
function iniciarCuentaAtras(fechaCarrera) {
    const countdown = document.getElementById("countdown");

    function actualizar() {
        const ahora = new Date();
        const diff = fechaCarrera - ahora;

        if (diff <= 0) {
            countdown.textContent = "🏁 ¡La carrera empezó!";
            return;
        }

        const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diff / (1000 * 60)) % 60);
        const segundos = Math.floor((diff / 1000) % 60);

        countdown.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }

    actualizar();
    setInterval(actualizar, 1000);
}

// ===============================
// INIT PRINCIPAL
// ===============================
async function init() {
    // 1) Obtener calendario
    const carreras = await obtenerCalendario();

    // 2) Calcular siguiente evento
    const proxima = encontrarSiguienteCarrera(carreras);

    if (!proxima) {
        document.getElementById("countdown").textContent =
            "No hay próximos Grandes Premios este año";
        return;
    }

    // Mostramos el nombre de la próxima carrera
    document.querySelector(".cuenta-atras h3").textContent =
        `Cuenta atrás para el GP de ${proxima.raceName}`;

    // 3) Poner la cuenta atrás
    iniciarCuentaAtras(proxima.fecha);

    // 4) Si estamos en fin de semana de carrera o justo comienza
    const ahora = new Date();
    if (ahora >= proxima.fecha) {
        // Aquí puedes pedir sesiones o tiempos reales si la API lo soporta
        console.log("Estamos en modo carrera");
        document.getElementById("session-info").textContent =
            "Modo carrera — datos en vivo o resultados";
    } else {
        // Modo pronóstico/previo
        console.log("Estamos antes del fin de semana de carrera");
        document.getElementById("session-info").textContent =
            `Próxima sesión de ${proxima.raceName}`;
    }
}

document.addEventListener("DOMContentLoaded", init);