# Bloque 3 · Tema 3
# Lenguajes de interrogación de bases de datos. Estándar ANSI SQL. Procedimientos almacenados. Eventos y disparadores.

---

# 1. Esquema introductorio (visión rápida)

**SQL (Structured Query Language)**
→ Lenguaje estándar para interactuar con bases de datos relacionales.

**Sublenguajes de SQL**
- DDL – Definición (CREATE, ALTER, DROP)
- DML – Manipulación (SELECT, INSERT, UPDATE, DELETE)
- DCL – Control (GRANT, REVOKE)
- TCL – Transacciones (COMMIT, ROLLBACK, SAVEPOINT)

**Objetos avanzados**
- Vistas (VIEW)
- Índices (INDEX)
- Procedimientos almacenados
- Funciones de usuario
- Disparadores (TRIGGER)
- Eventos

---

# 2. Estándar ANSI SQL

## 2.1 Historia y versiones

| Versión | Año | Novedades principales |
|---------|-----|----------------------|
| SQL-86 | 1986 | Primera normalización ANSI/ISO |
| SQL-89 | 1989 | Mejoras de integridad referencial |
| SQL-92 | 1992 | Estándar ampliamente adoptado (joins, subconsultas) |
| SQL:1999 | 1999 | POO, recursividad, tipos complejos |
| SQL:2003 | 2003 | XML, MERGE, funciones ventana |
| SQL:2011 | 2011 | Datos temporales |
| SQL:2016 | 2016 | JSON |

## 2.2 DDL – Lenguaje de Definición de Datos

Permite crear y modificar la estructura de la base de datos.

### CREATE TABLE
```sql
CREATE TABLE empleados (
    id          INT          PRIMARY KEY AUTO_INCREMENT,
    nombre      VARCHAR(100) NOT NULL,
    dni         CHAR(9)      UNIQUE NOT NULL,
    departamento_id INT,
    salario     DECIMAL(10,2) DEFAULT 0.00,
    fecha_alta  DATE,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
```

### Restricciones (CONSTRAINTS)
| Restricción | Descripción |
|------------|-------------|
| `PRIMARY KEY` | Identifica únicamente cada fila; implica NOT NULL + UNIQUE |
| `FOREIGN KEY` | Referencia a la clave primaria de otra tabla (integridad referencial) |
| `UNIQUE` | Los valores del campo son únicos |
| `NOT NULL` | El campo no puede ser nulo |
| `DEFAULT` | Valor por defecto si no se especifica |
| `CHECK` | Condición que deben cumplir los valores |

### ALTER TABLE
```sql
-- Añadir columna
ALTER TABLE empleados ADD COLUMN email VARCHAR(200);

-- Modificar tipo
ALTER TABLE empleados MODIFY COLUMN salario DECIMAL(12,2);

-- Eliminar columna
ALTER TABLE empleados DROP COLUMN email;

-- Añadir restricción
ALTER TABLE empleados ADD CONSTRAINT chk_salario CHECK (salario >= 0);
```

### DROP
```sql
DROP TABLE empleados;           -- Elimina tabla y datos
DROP TABLE IF EXISTS empleados; -- Evita error si no existe
TRUNCATE TABLE empleados;       -- Vacía la tabla (más rápido que DELETE)
```

## 2.3 DML – Lenguaje de Manipulación de Datos

### SELECT – Consulta de datos

```sql
-- Estructura completa (orden obligatorio)
SELECT   columnas
FROM     tabla
JOIN     otra_tabla ON condicion
WHERE    filtros
GROUP BY agrupacion
HAVING   filtro_sobre_grupos
ORDER BY columna [ASC|DESC]
LIMIT    n OFFSET m;
```

**Ejemplo completo:**
```sql
SELECT d.nombre AS departamento,
       COUNT(e.id) AS num_empleados,
       AVG(e.salario) AS salario_medio
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.id
WHERE e.fecha_alta >= '2020-01-01'
GROUP BY d.nombre
HAVING AVG(e.salario) > 2000
ORDER BY salario_medio DESC
LIMIT 5;
```

### Tipos de JOIN

| JOIN | Resultado |
|------|-----------|
| `INNER JOIN` | Solo filas que coinciden en ambas tablas |
| `LEFT JOIN` | Todas las de la izquierda + coincidencias de la derecha |
| `RIGHT JOIN` | Todas las de la derecha + coincidencias de la izquierda |
| `FULL OUTER JOIN` | Todas las filas de ambas tablas |
| `CROSS JOIN` | Producto cartesiano (todas las combinaciones posibles) |
| `SELF JOIN` | La tabla se une consigo misma |

### Funciones de agregación

| Función | Descripción |
|---------|-------------|
| `COUNT(*)` | Número de filas |
| `COUNT(col)` | Número de valores no nulos |
| `SUM(col)` | Suma |
| `AVG(col)` | Media |
| `MAX(col)` | Valor máximo |
| `MIN(col)` | Valor mínimo |

### Subconsultas (subqueries)
```sql
-- En WHERE
SELECT nombre FROM empleados
WHERE salario > (SELECT AVG(salario) FROM empleados);

-- Con IN
SELECT nombre FROM empleados
WHERE departamento_id IN (SELECT id FROM departamentos WHERE nombre = 'IT');

-- Subconsulta correlacionada
SELECT nombre, salario FROM empleados e
WHERE salario = (
    SELECT MAX(salario) FROM empleados
    WHERE departamento_id = e.departamento_id
);
```

### INSERT
```sql
-- Una fila
INSERT INTO empleados (nombre, dni, salario) VALUES ('Ana López', '12345678A', 2500);

-- Varias filas
INSERT INTO empleados (nombre, salario) VALUES
    ('Luis Pérez', 2200),
    ('Marta Ruiz', 2800);

-- Desde otra tabla
INSERT INTO empleados_backup SELECT * FROM empleados WHERE fecha_alta < '2020-01-01';
```

### UPDATE
```sql
UPDATE empleados
SET salario = salario * 1.05,   -- subida del 5%
    fecha_alta = CURDATE()
WHERE departamento_id = 3;
```

### DELETE
```sql
DELETE FROM empleados WHERE id = 42;

-- Con condición compuesta
DELETE FROM empleados
WHERE salario < 1000 AND departamento_id IS NULL;
```

## 2.4 DCL – Lenguaje de Control de Datos

```sql
-- Conceder permisos
GRANT SELECT, INSERT ON empleados TO usuario1;
GRANT ALL PRIVILEGES ON base_datos.* TO admin@'localhost';

-- Revocar permisos
REVOKE INSERT ON empleados FROM usuario1;
```

## 2.5 TCL – Control de Transacciones

Una **transacción** es un conjunto de operaciones que se tratan como una unidad atómica (todas o ninguna).

```sql
START TRANSACTION;

UPDATE cuentas SET saldo = saldo - 1000 WHERE id = 1;
UPDATE cuentas SET saldo = saldo + 1000 WHERE id = 2;

COMMIT;    -- confirma los cambios
-- o
ROLLBACK;  -- deshace todos los cambios desde START TRANSACTION

-- Punto de guardado
SAVEPOINT punto1;
ROLLBACK TO SAVEPOINT punto1;
```

### Propiedades ACID

| Propiedad | Descripción |
|-----------|-------------|
| **Atomicidad** | Todo o nada |
| **Consistencia** | La BD pasa de un estado válido a otro válido |
| **Aislamiento** | Las transacciones concurrentes no interfieren entre sí |
| **Durabilidad** | Los cambios confirmados persisten aunque haya fallo |

## 2.6 Vistas (VIEW)

Una **vista** es una consulta almacenada que se comporta como una tabla virtual.

```sql
-- Crear vista
CREATE VIEW empleados_activos AS
SELECT id, nombre, salario FROM empleados
WHERE activo = 1;

-- Usar la vista como si fuera una tabla
SELECT * FROM empleados_activos WHERE salario > 2000;

-- Eliminar vista
DROP VIEW empleados_activos;
```

**Ventajas:** seguridad (ocultan columnas/filas sensibles), simplicidad, reutilización.

## 2.7 Índices (INDEX)

Los índices aceleran las consultas a costa de mayor espacio en disco y más lentitud en escrituras.

```sql
-- Índice normal
CREATE INDEX idx_nombre ON empleados(nombre);

-- Índice único
CREATE UNIQUE INDEX idx_dni ON empleados(dni);

-- Índice compuesto
CREATE INDEX idx_dept_sal ON empleados(departamento_id, salario);

-- Eliminar índice
DROP INDEX idx_nombre ON empleados;
```

**Tipos de índices:** B-Tree (más común), Hash, Full-Text, Espacial.

**Cuándo usarlos:** columnas muy consultadas en WHERE, JOIN o ORDER BY.
**Cuándo evitarlos:** tablas pequeñas, columnas con poca selectividad (ej. booleanos).

---

# 3. Procedimientos almacenados

## 3.1 Concepto

Un **procedimiento almacenado** (*stored procedure*) es un bloque de código SQL (y lógica de control) que se guarda en la propia base de datos y se puede invocar por nombre.

**Ventajas:**
- Reutilización de código.
- Rendimiento (se compilan y optimizan una vez).
- Seguridad (solo se expone el nombre del procedimiento, no las tablas).
- Reducción del tráfico de red (se ejecuta en el servidor).
- Centralización de la lógica de negocio.

**Inconvenientes:**
- Difícil depuración.
- Dependencia del SGBD (menor portabilidad).
- Más complejidad en el mantenimiento.

## 3.2 Sintaxis (MySQL / MariaDB)

```sql
DELIMITER $$

CREATE PROCEDURE actualizar_salario(
    IN  p_departamento  INT,
    IN  p_porcentaje    DECIMAL(5,2),
    OUT p_afectados     INT
)
BEGIN
    -- Variables locales
    DECLARE v_count INT DEFAULT 0;

    -- Lógica
    UPDATE empleados
    SET salario = salario * (1 + p_porcentaje / 100)
    WHERE departamento_id = p_departamento;

    SET v_count = ROW_COUNT();
    SET p_afectados = v_count;
END$$

DELIMITER ;

-- Llamada
CALL actualizar_salario(3, 5.0, @afectados);
SELECT @afectados;
```

## 3.3 Tipos de parámetros

| Tipo | Dirección | Descripción |
|------|-----------|-------------|
| `IN` | Entrada | El llamador pasa un valor; no se modifica en el exterior |
| `OUT` | Salida | El procedimiento devuelve un valor |
| `INOUT` | Bidireccional | Entrada y salida |

## 3.4 Estructuras de control en procedimientos

```sql
-- Condicional
IF condicion THEN
    instrucciones;
ELSEIF otra_condicion THEN
    instrucciones;
ELSE
    instrucciones;
END IF;

-- CASE
CASE variable
    WHEN valor1 THEN instrucciones;
    WHEN valor2 THEN instrucciones;
    ELSE instrucciones;
END CASE;

-- Bucle WHILE
WHILE condicion DO
    instrucciones;
END WHILE;

-- Bucle LOOP con LEAVE
mi_bucle: LOOP
    IF condicion_salida THEN LEAVE mi_bucle; END IF;
    instrucciones;
END LOOP;

-- Cursor (recorrer filas)
DECLARE cur CURSOR FOR SELECT id, nombre FROM empleados;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
OPEN cur;
FETCH cur INTO v_id, v_nombre;
CLOSE cur;
```

## 3.5 Funciones de usuario (UDF)

Similares a los procedimientos pero **devuelven un valor** y pueden usarse dentro de consultas SQL.

```sql
CREATE FUNCTION calcular_irpf(salario DECIMAL(10,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE irpf DECIMAL(10,2);
    IF salario < 12450 THEN SET irpf = salario * 0.19;
    ELSEIF salario < 20200 THEN SET irpf = salario * 0.24;
    ELSE SET irpf = salario * 0.30;
    END IF;
    RETURN irpf;
END;

-- Uso dentro de SELECT
SELECT nombre, salario, calcular_irpf(salario) AS irpf FROM empleados;
```

| | Procedimiento | Función |
|-|--------------|---------|
| Devuelve valor | No (usa OUT) | Sí (RETURNS) |
| Uso dentro de SELECT | No | Sí |
| Transacciones (COMMIT/ROLLBACK) | Sí | No (generalmente) |

---

# 4. Disparadores (TRIGGERS)

## 4.1 Concepto

Un **disparador** (*trigger*) es un bloque de código que se ejecuta **automáticamente** cuando ocurre un evento concreto (INSERT, UPDATE, DELETE) sobre una tabla.

No se llama directamente: se activa de forma implícita cuando se produce el evento.

## 4.2 Sintaxis

```sql
CREATE TRIGGER nombre_trigger
    { BEFORE | AFTER }
    { INSERT | UPDATE | DELETE }
    ON nombre_tabla
    FOR EACH ROW
BEGIN
    -- cuerpo del trigger
    -- acceso a filas con NEW y OLD
END;
```

## 4.3 NEW y OLD

| | INSERT | UPDATE | DELETE |
|-|--------|--------|--------|
| `NEW` | Nueva fila | Fila después de actualizar | No disponible |
| `OLD` | No disponible | Fila antes de actualizar | Fila eliminada |

## 4.4 BEFORE vs AFTER

| | BEFORE | AFTER |
|-|--------|-------|
| Se ejecuta | Antes de la operación | Después de la operación |
| Puede cancelar la operación | Sí (usando SIGNAL) | No |
| Uso típico | Validaciones, modificar valores antes de insertar | Auditoría, actualizar tablas relacionadas |

## 4.5 Ejemplos

```sql
-- AFTER INSERT: guardar en tabla de auditoría
CREATE TRIGGER trg_auditoria_empleados
AFTER INSERT ON empleados
FOR EACH ROW
BEGIN
    INSERT INTO auditoria (accion, tabla, id_registro, fecha)
    VALUES ('INSERT', 'empleados', NEW.id, NOW());
END;

-- BEFORE UPDATE: no permitir reducir el salario
CREATE TRIGGER trg_controlar_salario
BEFORE UPDATE ON empleados
FOR EACH ROW
BEGIN
    IF NEW.salario < OLD.salario THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'No se puede reducir el salario';
    END IF;
END;

-- AFTER DELETE: actualizar contador en departamento
CREATE TRIGGER trg_actualizar_contador
AFTER DELETE ON empleados
FOR EACH ROW
BEGIN
    UPDATE departamentos
    SET num_empleados = num_empleados - 1
    WHERE id = OLD.departamento_id;
END;
```

## 4.6 Gestión de triggers

```sql
-- Ver triggers
SHOW TRIGGERS FROM nombre_base_datos;

-- Eliminar trigger
DROP TRIGGER IF EXISTS trg_auditoria_empleados;
```

## 4.7 Usos habituales de los triggers

- **Auditoría:** registrar automáticamente quién cambió qué y cuándo.
- **Integridad:** validaciones complejas que no pueden expresarse con CHECK.
- **Sincronización:** mantener datos derivados actualizados (contadores, totales).
- **Soft delete:** marcar como borrado en lugar de eliminar físicamente.
- **Historial:** guardar versiones anteriores de un registro.

---

# 5. Eventos (EVENT)

## 5.1 Concepto

Un **evento** en MySQL/MariaDB es una tarea programada que se ejecuta automáticamente en un momento concreto o de forma periódica. Es como un *cron job* dentro del propio SGBD.

```sql
-- Habilitar el planificador de eventos
SET GLOBAL event_scheduler = ON;
```

## 5.2 Sintaxis

```sql
CREATE EVENT nombre_evento
ON SCHEDULE
    { AT timestamp | EVERY intervalo [STARTS inicio] [ENDS fin] }
[ON COMPLETION { NOT } PRESERVE]
[ENABLE | DISABLE]
DO
    sentencia_sql;
```

## 5.3 Ejemplos

```sql
-- Ejecutar una vez en el futuro
CREATE EVENT limpiar_logs_antiguos
ON SCHEDULE AT '2026-12-31 23:59:00'
DO DELETE FROM logs WHERE fecha < '2026-01-01';

-- Ejecutar periódicamente
CREATE EVENT backup_diario
ON SCHEDULE EVERY 1 DAY
STARTS '2026-01-01 02:00:00'
ON COMPLETION PRESERVE
DO CALL hacer_backup_diario();

-- Cada hora
CREATE EVENT purgar_sesiones
ON SCHEDULE EVERY 1 HOUR
DO DELETE FROM sesiones WHERE expira < NOW();
```

## 5.4 Gestión de eventos

```sql
SHOW EVENTS;                     -- Ver eventos
ALTER EVENT backup_diario DISABLE; -- Desactivar
DROP EVENT IF EXISTS backup_diario; -- Eliminar
```

---

# 6. Resumen: conceptos clave para el examen

| Concepto | Dato clave |
|----------|-----------|
| DDL | CREATE, ALTER, DROP – define la estructura |
| DML | SELECT, INSERT, UPDATE, DELETE – manipula datos |
| DCL | GRANT, REVOKE – controla permisos |
| TCL | COMMIT, ROLLBACK, SAVEPOINT – gestiona transacciones |
| ACID | Atomicidad, Consistencia, Aislamiento, Durabilidad |
| INNER JOIN | Solo filas que coinciden en ambas tablas |
| LEFT JOIN | Todas las de la izquierda + coincidencias |
| GROUP BY + HAVING | Agrupa filas; HAVING filtra sobre grupos (≠ WHERE) |
| Vista | Consulta guardada como tabla virtual |
| Índice | Acelera consultas; B-Tree es el más común |
| Procedimiento almacenado | Bloque SQL guardado en BD, invocado con CALL |
| Función de usuario | Como procedimiento pero devuelve valor; usable en SELECT |
| Parámetros IN/OUT/INOUT | Entrada / Salida / Bidireccional |
| Trigger BEFORE | Se ejecuta antes; puede cancelar la operación con SIGNAL |
| Trigger AFTER | Se ejecuta después; útil para auditoría |
| NEW / OLD en trigger | Fila nueva (INSERT/UPDATE) / fila antigua (UPDATE/DELETE) |
| Evento (EVENT) | Tarea programada dentro del SGBD (cron job de SQL) |
