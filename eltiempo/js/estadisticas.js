// API URL absoluta
const API_URL = "https://aplicacionesdevanguardia.es/eltiempo/servidor/api-weather-reverse.php?ciudad=madrid";
//"/eltiempo/servidor/api-weather-reverse.php?ciudad=madrid";

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
    container.innerHTML = "<table><thead><tr><th>Año</th><th>Máx</th><th>Mín</th><th>Lluvia</th></tr></thead><tbody>";

    Object.keys(byYear).sort().forEach(year => {
        const maxAvg = (byYear[year].max.reduce((a,b)=>a+b,0)/byYear[year].max.length).toFixed(1);
        const minAvg = (byYear[year].min.reduce((a,b)=>a+b,0)/byYear[year].min.length).toFixed(1);
        const rainTotal = byYear[year].rain.reduce((a,b)=>a+b,0).toFixed(1);

        container.innerHTML += `
            <tr>
                <td><strong>${year}</strong></td>
                <td>Máx ${maxAvg}°C</td>
                <td>Mín ${minAvg}°C</td>
                <td>Lluvia ${rainTotal} mm</td>
            </tr>
        `;
    });
    container.innerHTML += "</tbody></table>";
}

// ====================
// Botones de mes
// ====================
document.addEventListener("DOMContentLoaded", () => {
    updateMonthHeader();
    loadStats();

    $("prev-month").addEventListener("click", () => {
        selectedMonth = (selectedMonth + 11) % 12;
        updateMonthHeader();
        loadStats();
    });

    $("next-month").addEventListener("click", () => {
        selectedMonth = (selectedMonth + 1) % 12;
        updateMonthHeader();
        loadStats();
    });

    $("year").textContent = new Date().getFullYear();
});
