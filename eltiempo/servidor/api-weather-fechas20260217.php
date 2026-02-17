<?php
// ============================
// 1. HEADERS
// ============================
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=utf-8");

// ============================
// 2. CONFIGURACIÓN BD
// (En producción esto debería ir
//  en un archivo fuera del webroot)
// ============================
define('DB_HOST', 'localhost');
define('DB_USER', 'admin');
define('DB_PASS', 'Eavne,e1m');
define('DB_NAME', 'clima');

// ============================
// 3. VALIDACIÓN DE ENTRADA
// ============================
$ciudad = $_GET['ciudad'] ?? '';
$fecha  = $_GET['fecha'] ?? '';
$desde  = $_GET['desde'] ?? '';
$hasta  = $_GET['hasta'] ?? '';

if (empty($ciudad)) {
    http_response_code(400);
    echo json_encode(["error" => "El parámetro 'ciudad' es obligatorio."]);
    exit();
}

// Validar formato fecha YYYY-MM-DD
function fechaValida($fecha) {
    return preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha);
}

if (!empty($fecha) && !fechaValida($fecha)) {
    http_response_code(400);
    echo ["error" => "El parámetro 'fecha' debe tener formato YYYY-MM-DD."];
    exit();
}

if (!empty($desde) && !fechaValida($desde)) {
    http_response_code(400);
    echo ["error" => "El parámetro 'desde' debe tener formato YYYY-MM-DD."];
    exit();
}

if (!empty($hasta) && !fechaValida($hasta)) {
    http_response_code(400);
    echo ["error" => "El parámetro 'hasta' debe tener formato YYYY-MM-DD."];
    exit();
}

// ============================
// 4. CONEXIÓN BD
// ============================
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    http_response_code(500);
    echo ["error" => "Error de conexión a la base de datos."];
    exit();
}

// ============================
// 5. CONSTRUIR QUERY DINÁMICA
// ============================
$sql = "
    SELECT 
        DATE(fecha) AS dia,
        MIN(fecha) AS primera_fecha_del_dia,
        MIN(amanecer) AS amanecer,
        MAX(anochecer) AS anochecer,
        MAX(temp_max) AS temp_max,
        MIN(temp_min) AS temp_min,
        AVG(humedad) AS humedad,
        SUM(lluvia) AS lluvia,
        AVG(nubes) AS nubes,
        AVG(viento_velocidad) AS viento_velocidad,
        AVG(viento_direccion) AS viento_direccion
    FROM weather
    WHERE ciudad LIKE CONCAT('%', ?, '%')
";

$params = [$ciudad];
$types  = "s";

// Filtro por fecha exacta
if (!empty($fecha)) {
    $sql .= " AND DATE(fecha) = ?";
    $params[] = $fecha;
    $types .= "s";
}

// Filtro por rango
if (!empty($desde) && !empty($hasta)) {
    $sql .= " AND DATE(fecha) BETWEEN ? AND ?";
    $params[] = $desde;
    $params[] = $hasta;
    $types .= "ss";
} elseif (!empty($desde)) {
    $sql .= " AND DATE(fecha) >= ?";
    $params[] = $desde;
    $types .= "s";
} elseif (!empty($hasta)) {
    $sql .= " AND DATE(fecha) <= ?";
    $params[] = $hasta;
    $types .= "s";
}

$sql .= "
    GROUP BY DATE(fecha)
    ORDER BY DATE(fecha);
";
echo $sql; // Para depuración: muestra la consulta generada
// ============================
// 6. PREPARAR Y EJECUTAR
// ============================
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
//    echo json_encode(["error" => "Error al preparar la consulta."]);
    $conn->close();
    exit();
}

$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$datos = [];

while ($row = $result->fetch_assoc()) {
//    $datos[] = $row;
    echo $row['dia'] . " - " . $row['temp_max'] . "°C / " . $row['temp_min'] . "°C\n";
}

// ============================
// 7. RESPUESTA
// ============================
//http_response_code(200);
//echo json_encode($datos);

// ============================
// 8. CIERRE
// ============================
$stmt->close();
$conn->close();
?>
