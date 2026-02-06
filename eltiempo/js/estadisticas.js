// API URL absoluta
const API_URL = "https://aplicacionesdevanguardia.es/eltiempo/servidor/api-weather.php?ciudad=madrid";
const API_URL_TODAY = "https://aplicacionesdevanguardia.es/eltiempo/servidor/weather-hoy.php?ciudad=madrid";

// ====================
// Helper
// ====================
function $(id) { return document.getElementById(id); }

const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

let selectedMonth = new Date().getMonth(); // mes actual

function updateMonthHeader() {
    $("mes-nombre").textContent = monthNames[selectedMonth];
}

// ====================
// Cargar datos del JSON
// ====================
async function loadStats() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error cargando datos: " + response.status);

        const data = await response.json();

        if (!data || !data.length) throw new Error("Datos vacíos");

        renderLastData(data);
        renderMonthStats(data);
        renderTrend(data);
    } catch (err) {
        console.error(err);
        $("stats-location").textContent = "Error cargando datos";
    }
}

async function loadStatsToday() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error cargando datos: " + response.status);

        const data = await response.json();

        if (!data || !data.length) throw new Error("Datos vacíos");

        renderLastData(data);
        renderMonthStats(data);
        renderTrend(data);
    } catch (err) {
        console.error(err);
        $("stats-location").textContent = "Error cargando datos";
    }
}

// ====================
// Último dato
// ====================
function renderLastData(data) {
    const last = data[data.length - 1];
    $("last-date").textContent = last.dia;
    $("last-temp").textContent = last.temp_max + "°C / " + last.temp_min + "°C";
    $("last-humidity").textContent = last.humedad + " %";
    $("last-rain").textContent = last.lluvia + " mm";
    $("last-wind").textContent = last.viento_velocidad + " km/h";
    $("last-sunrise").textContent = last.amanecer;
    $("last-sunset").textContent = last.anochecer;
} 

// ====================
// Estadísticas del mes seleccionado
// ====================
function renderMonthStats(data) {
    const monthData = data.filter(d => new Date(d.dia).getMonth() === selectedMonth);

    if (!monthData.length) return;

    const maxTemps = monthData.map(d => d.temp_max);
    const minTemps = monthData.map(d => d.temp_min);
    const lluvia = monthData.reduce((sum, d) => sum + parseFloat(d.lluvia), 0);
    const humedad = (monthData.reduce((sum, d) => sum + parseFloat(d.humedad), 0) / monthData.length).toFixed(1);

    $("month-days").textContent = monthData.length;
    $("month-max").textContent = Math.max(...maxTemps) + "°C";
    $("month-min").textContent = Math.min(...minTemps) + "°C";
    $("month-rain").textContent = lluvia.toFixed(1) + " mm";
    $("month-humidity").textContent = humedad + " %";
}

// ====================
// Tendencia histórica
// ====================
function renderTrend(data) {
    const byYear = {};

    // Agrupar datos por año para el mes seleccionado
    data.forEach(d => {
        const date = new Date(d.dia);
        if (date.getMonth() === selectedMonth) {
            const year = date.getFullYear();
            if (!byYear[year]) byYear[year] = { max: [], min: [], rain: [] };
            byYear[year].max.push(d.temp_max);
            byYear[year].min.push(d.temp_min);
            byYear[year].rain.push(parseFloat(d.lluvia));
        }
    });

    const container = $("trend-container");

    // Si no hay datos para el mes, mostrar mensaje
    if (Object.keys(byYear).length === 0) {
        container.innerHTML = "<p>No hay datos históricos para este mes.</p>";
        return;
    }

    // Construir tabla completa en una variable
    let html = "<table class=\"trend-table\"><thead><tr><th>Año</th><th>Máx</th><th>Mín</th><th>Lluvia</th></tr></thead><tbody>";

    // Ordenar años de más reciente a más antiguo
    Object.keys(byYear).sort((a, b) => b - a).forEach(year => {
        const maxAvg = (byYear[year].max.reduce((a,b)=>a+b,0)/byYear[year].max.length).toFixed(1);
        const minAvg = (byYear[year].min.reduce((a,b)=>a+b,0)/byYear[year].min.length).toFixed(1);
        const rainTotal = byYear[year].rain.reduce((a,b)=>a+b,0).toFixed(1);

        html += `
            <tr>
                <td><strong>${year}</strong></td>
                <td>${maxAvg}°C</td>
                <td>${minAvg}°C</td>
                <td>${rainTotal} mm</td>
            </tr>
        `;
    });

    html += "</tbody></table>";

    // Insertar tabla en el contenedor
    container.innerHTML = html;
}


// ====================
// Botones de mes
// ====================
document.addEventListener("DOMContentLoaded", () => {
    updateMonthHeader();
    loadStats();
    loadStatsToday();

    $("prev-month").addEventListener("click", () => {
        selectedMonth = (selectedMonth + 11) % 12;
        updateMonthHeader();
        loadStats();
        loadStatsToday();
    });

    $("next-month").addEventListener("click", () => {
        selectedMonth = (selectedMonth + 1) % 12;
        updateMonthHeader();
        loadStats();
        loadStatsToday();
    });

    $("year").textContent = new Date().getFullYear();
});
