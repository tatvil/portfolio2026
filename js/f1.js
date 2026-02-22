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
// EQUIPOS
// ===============================
async function cargarEquipos() {
    try {
        const response = await fetch('/f1/api/pilotos');
        const pilotos = await response.json();
        const tbody = document.querySelector('#equipos-table tbody');

        tbody.innerHTML = ''; // Limpiamos tabla

        // Agrupar pilotos por equipo
        const equiposMap = {};
        pilotos.forEach(p => {
            const eq = p.equipo || 'Sin equipo';
            if (!equiposMap[eq]) equiposMap[eq] = [];
            equiposMap[eq].push(p);
        });

        // Crear filas por equipo
        Object.keys(equiposMap).forEach(eq => {
            const pilotosEq = equiposMap[eq];
            const nacionalidades = [...new Set(pilotosEq.map(p => p.nacionalidad))].join(', ');
            const codigos = pilotosEq.map(p => p.codigo).join(', ');

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${eq}</td>
                <td>${pilotosEq.length}</td>
                <td>${nacionalidades}</td>
                <td>${codigos}</td>
            `;
            tbody.appendChild(fila);
        });

    } catch (error) {
        console.error('Error cargando equipos:', error);
        const tbody = document.querySelector('#equipos-table tbody');
        tbody.innerHTML = `<tr><td colspan="4">No se pudieron cargar los equipos</td></tr>`;
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

// Cargar pilotos y equipos al inicio y cada minuto
cargarPilotos();
cargarEquipos();
setInterval(() => { cargarPilotos(); cargarEquipos(); }, 60000);
}

// Arrancar todo al cargar la página
document.addEventListener("DOMContentLoaded", init);