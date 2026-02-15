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
document.getElementById("edad-andrea").textContent = edadAndrea;

const fechaNacimientoGemelos = "2004-11-24"; 
const edadGemelos = calcularEdad(fechaNacimientoGemelos);
document.getElementById("edad-gemelos").textContent = edadGemelos;

const fechaPandemia = "2020-03-11";
const edadPandemia = calcularEdad(fechaPandemia);
document.getElementById("edad-pandemia").textContent = edadPandemia;

// añade el año actual al pie de página
document.getElementById("anio").textContent = new Date().getFullYear();

