// ====================
// Helper
// ====================
function $(id) { return document.getElementById(id); }

const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

let selectedMonth = new Date().getMonth(); // mes actual
let ciudadActual = "Madrid"; // ciudad por defecto

const BASE_API = "https://aplicacionesdevanguardia.es/eltiempo/servidor/api-weather-fechas.php";

// ====================
// Construir URL de API según filtros
// ====================
function buildApiUrl({ ciudad, fecha = null, desde = null, hasta = null }) {
    const params = new URLSearchParams();
    params.append("ciudad", ciudad);
    if (fecha) params.append("fecha", fecha);
    if (desde) params.append("desde", desde);
    if (hasta) params.append("hasta", hasta);

    return `${BASE_API}?${params.toString()}`;
}

// ====================
// Actualizar nombre de mes
// ====================
function updateMonthHeader() {
    $("mes-nombre").textContent = monthNames[selectedMonth];
}

// ====================
// Cargar datos desde la API
// ====================
async function loadStats(options = {}) {
    try {
        const url = buildApiUrl({
            ciudad: ciudadActual,
            ...options
        });

        const response = await fetch(url);
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

    $("stats-location").textContent = `${ciudadActual} - Estadísticas`;
}

// ====================
// FASES LUNARES
// ====================
function getMoonPhase() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const c = Math.floor(365.25 * year);
    const e = Math.floor(30.6 * (month + 1));
    const jd = c + e + day - 694039.09; 
    const phase = (jd / 29.53) % 1; 
    const age = phase * 29.53;

    let phaseName = "", icon = "";

    if (age < 1.84566) { phaseName = "Luna Nueva"; icon = "🌑"; }
    else if (age < 5.53699) { phaseName = "Creciente Iluminante"; icon = "🌒"; }
    else if (age < 9.22831) { phaseName = "Cuarto Creciente"; icon = "🌓"; }
    else if (age < 12.91963) { phaseName = "Gibosa Creciente"; icon = "🌔"; }
    else if (age < 16.61096) { phaseName = "Luna Llena"; icon = "🌕"; }
    else if (age < 20.30228) { phaseName = "Gibosa Menguante"; icon = "🌖"; }
    else if (age < 23.99361) { phaseName = "Cuarto Menguante"; icon = "🌗"; }
    else if (age < 27.68493) { phaseName = "Creciente Menguante"; icon = "🌘"; }
    else { phaseName = "Luna Nueva"; icon = "🌑"; }

    $("moon-phase").textContent = phaseName;
    $("moon-icon").textContent = icon;

    const today = new Date();
    $("stats-location").textContent += ` | Hoy ${today.getDate()} de ${monthNames[today.getMonth()]} de ${today.getFullYear()}`;
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

    const lluviamedia = lluvia/monthData.length; // media de lluvia diaria

    $("month-days").textContent = monthData.length;
    $("month-max").textContent = Math.max(...maxTemps) + "°C";
    $("month-min").textContent = Math.min(...minTemps) + "°C";
    $("month-rain").textContent = lluvia.toFixed(1) + " mm (total) / " + lluviamedia.toFixed(1) + " mm (media diaria)";
    $("month-humidity").textContent = humedad + " % (media diaria)";
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

    if (Object.keys(byYear).length === 0) {
        container.innerHTML = "<p>No hay datos históricos para este mes.</p>";
        return;
    }

    let html = "<table class=\"trend-table\"><thead><tr><th>Año</th><th>Máx</th><th>Mín</th><th>Lluvia</th></tr></thead><tbody>";

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
    container.innerHTML = html;
}

// ====================
// Cargar mes actual según selectedMonth
// ====================
function loadCurrentMonth() {
    const year = new Date().getFullYear();
    const month = selectedMonth + 1;

    const firstDay = `${year}-${String(month).padStart(2,"0")}-01`;
    const lastDay = new Date(year, month, 0).toISOString().split("T")[0];

    loadStats({ desde: firstDay, hasta: lastDay });
}

// ====================
// Inicialización
// ====================
document.addEventListener("DOMContentLoaded", () => {
    updateMonthHeader();
    getMoonPhase();
    loadCurrentMonth();

    $("prev-month").addEventListener("click", () => {
        selectedMonth = (selectedMonth + 11) % 12;
        updateMonthHeader();
        loadCurrentMonth();
    });

    $("next-month").addEventListener("click", () => {
        selectedMonth = (selectedMonth + 1) % 12;
        updateMonthHeader();
        loadCurrentMonth();
    });

    $("year").textContent = new Date().getFullYear();

    // ====================
    // Selector de ciudad
    // ====================
    $("city-select").addEventListener("change", (e) => {
        ciudadActual = e.target.value;
        loadCurrentMonth();
    });
});
