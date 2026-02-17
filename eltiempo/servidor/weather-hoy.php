<?php
// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

// --- 1. Database Configuration (Example with external config) ---
// In a real scenario, this would come from a file outside the web root.
// For demonstration, let's just make it clear that this should be external.
define('DB_HOST', 'localhost');
define('DB_USER', 'admin');
define('DB_PASS', 'Eavne,e1m'); // !! IMPORTANT: Store this securely in a real application !!
define('DB_NAME', 'clima');

// Crear conexión
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$ciudad = $_GET['ciudad'] ?? '';
$hoy = date("Y-m-d");

$sql = "SELECT amanecer, anochecer, MIN(temp_min), MAX(temp_max), MAX(viento_velocidad), AVG(viento_direccion), MAX(nubes), MAX(lluvia) 
        FROM weather 
        WHERE fecha LIKE '%" . $hoy . "%' AND ciudad LIKE '%" . $ciudad . "%'";

$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode(array("message" => "No data found"));
}
$conn->close();
?>
