// ===============================
// FUNCIONES DE CONSULTA API
// ===============================

// Obtener calendario completo de la temporada actual
async function obtenerCalendario() {
    try {
        const response = await fetch("https://api.jolpi.ca/ergast/f1/current.json");
        const data = await response.json();
        const carreras = data.MRData.RaceTable.Races;
        return carreras;
    } catch (error) {
        console.error("Error al obtener calendario:", error);
        return [];
    }
}

// Encontrar la siguiente carrera
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
// PILOTOS
// ===============================
async function cargarPilotos() {
    try {
        const response = await fetch('/f1/api/pilotos');
        const pilotos = await response.json();
        const tbody = document.querySelector('#pilotos-table tbody');

        tbody.innerHTML = ''; // Limpiamos antes de rellenar

        pilotos.forEach(p => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${p.numero}</td>
                <td>${p.nombre}</td>
                <td>${p.apellido}</td>
                <td>${p.equipo || '-'}</td>
                <td>${p.nacionalidad}</td>
                <td>${p.codigo}</td>
            `;
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error cargando pilotos:', error);
        const tbody = document.querySelector('#pilotos-table tbody');
        tbody.innerHTML = `<tr><td colspan="6">No se pudieron cargar los pilotos</td></tr>`;
    }
}

// ===============================
// ESCUDERÍAS
// ===============================
async function cargarEscuderias() {
    try {
        const response = await fetch('/f1/api/escuderias');
        const escuderias = await response.json();
        const tbody = document.querySelector('#escuderias-table tbody');

        tbody.innerHTML = ''; // Limpiamos tabla

        escuderias.forEach(e => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${e.nombre}</td>
                <td>${e.pais}</td>
                <td>${e.motor}</td>
            `;
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error cargando escuderías:', error);
        const tbody = document.querySelector('#escuderias-table tbody');
        tbody.innerHTML = `<tr><td colspan="4">No se pudieron cargar las escuderías</td></tr>`;
    }
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

    // 3) Mostrar nombre de la próxima carrera
    document.querySelector(".cuenta-atras h3").textContent =
        `Cuenta atrás para el GP de ${proxima.raceName}`;

    // 4) Iniciar cuenta atrás
    iniciarCuentaAtras(proxima.fecha);

    // 5) Indicar modo carrera o pronóstico
    const ahora = new Date();
    if (ahora >= proxima.fecha) {
        document.getElementById("session-info").textContent =
            "Modo carrera — datos en vivo o resultados";
    } else {
        document.getElementById("session-info").textContent =
            `Próxima sesión de ${proxima.raceName}`;
    }

// Cargar pilotos y escuderías al inicio y cada minuto
cargarPilotos();
cargarEscuderias();
setInterval(() => { cargarPilotos(); cargarEscuderias(); }, 60000);
}

// Arrancar todo al cargar la página
document.addEventListener("DOMContentLoaded", init);