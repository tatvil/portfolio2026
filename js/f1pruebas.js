const BASE_URL = 'https://api.openf1.org/v1';

async function cargarDatosF1() {
    const statusDiv = document.getElementById('api-status');
    const tablaCuerpo = document.getElementById('tabla-pilotos-body');

    try {
        statusDiv.innerHTML = 'Conectando con OpenF1...';

        // Usamos una session_key fija de un GP pasado para probar que funciona
        // Bahrain 2024 Session Key: 9465
        const sessionKey = '9465'; 
        
        document.getElementById('session-info').innerText = "GP de Bahrain (Datos de Test)";

        const driversRes = await fetch(`${BASE_URL}/drivers?session_key=${sessionKey}`);
        
        if (!driversRes.ok) throw new Error(`Error HTTP: ${driversRes.status}`);

        const drivers = await driversRes.json();

        if (drivers.length === 0) {
            statusDiv.innerHTML = 'No se encontraron pilotos.';
            return;
        }

        tablaCuerpo.innerHTML = '';
        drivers.forEach(driver => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border-left: 4px solid #${driver.team_colour || 'ccc'}">
                    ${driver.driver_number}
                </td>
                <td><strong>${driver.full_name}</strong></td>
                <td>${driver.team_name}</td>
                <td>${driver.name_acronym}</td>
            `;
            tablaCuerpo.appendChild(row);
        });

        statusDiv.innerHTML = '<span style="color: #4caf50;">● Datos cargados con éxito</span>';

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        statusDiv.innerHTML = `<span style="color: #ff4b4b;">● Error: ${error.message}</span>`;
    }
}

document.addEventListener('DOMContentLoaded', cargarDatosF1);