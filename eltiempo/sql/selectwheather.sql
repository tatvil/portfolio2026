    SELECT 
        DATE(fecha) AS dia,
        MAX(temp_max) AS temp_max,
        MIN(temp_min) AS temp_min,
        AVG(humedad) AS humedad,
        SUM(lluvia) AS lluvia,
        AVG(nubes) AS nubes,
        AVG(viento_velocidad) AS viento_velocidad,
        AVG(viento_direccion) AS viento_direccion
    FROM weather
    WHERE ciudad LIKE CONCAT('%', 'madrid', '%')
 AND DATE(fecha) BETWEEN '2026-02-01' AND '2026-02-17'
    GROUP BY DATE(fecha)
    ORDER BY DATE(fecha);