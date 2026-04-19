// edad
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

const fechaNacimientoAndrea = "2001-01-14"; 
const edadAndrea = calcularEdad(fechaNacimientoAndrea);
if (document.getElementById("edad-andrea")) document.getElementById("edad-andrea").textContent = edadAndrea;

const fechaNacimientoGemelos = "2004-11-24"; 
const edadGemelos = calcularEdad(fechaNacimientoGemelos);
if (document.getElementById("edad-gemelos")) document.getElementById("edad-gemelos").textContent = edadGemelos;

const fechaPandemia = "2020-03-11";
const edadPandemia = calcularEdad(fechaPandemia);
if (document.getElementById("edad-pandemia")) document.getElementById("edad-pandemia").textContent = edadPandemia;

// añade el año actual al pie de página
if (document.getElementById("anio")) document.getElementById("anio").textContent = new Date().getFullYear();

// PROYECTOS

/**
 * Script para la cuenta atrás del examen TAI AGE
 * Fecha: 23 de mayo de 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // Definimos la fecha objetivo (23 de mayo de 2026 a las 09:00)
    const examenDate = new Date("May 23, 2026 09:00:00").getTime();
    const countdownContainer = document.getElementById("countdown");

    // Si el contenedor no existe en esta página, no ejecutamos el intervalo
    if (!countdownContainer) return;

    const updateTimer = () => {
        const now = new Date().getTime();
        const diff = examenDate - now;

        if (diff < 0) {
            countdownContainer.innerHTML = "¡Día del examen!";
            clearInterval(timerInterval);
            return;
        }

        // Cálculos de tiempo
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        // Formateamos el texto
        countdownContainer.innerHTML = `Examen en: ${d}d ${h}h ${m}m ${s}s`;
    };

    // Ejecutamos una vez al cargar y luego cada segundo
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
});