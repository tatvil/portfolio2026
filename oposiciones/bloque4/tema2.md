# 2. Administración de bases de datos. Sistemas de almacenamiento y su virtualización. Políticas, sistemas y procedimientos de backup y su recuperación. Backup de sistemas físicos y virtuales. Virtualización de sistemas y virtualización de puestos de usuario.

## Administración de bases de datos. Sistemas de almacenamiento y su virtualización. Backup y recuperación. Virtualización

En este tema se estudian los conceptos clave relacionados con la gestión de bases de datos, los sistemas de almacenamiento, las copias de seguridad y la virtualización.

Es un tema muy importante en el examen, especialmente en lo relativo a almacenamiento (RAID), backup y virtualización.

---

## 1. Administración de bases de datos

La administración de bases de datos consiste en gestionar, mantener y asegurar el correcto funcionamiento de un sistema gestor de bases de datos (SGBD).

Un SGBD es el software que permite crear, gestionar y consultar bases de datos.

---

### Definiciones clave

Base de datos: conjunto organizado de datos relacionados.

SGBD: software que permite gestionar bases de datos (ejemplo: MySQL, Oracle, SQL Server).

Tabla: estructura donde se almacenan los datos.

Registro: fila de una tabla.

Campo: columna de una tabla.

Índice: estructura que mejora la velocidad de búsqueda.

Consulta: operación para recuperar datos.

---

### Funciones del administrador de bases de datos (DBA)

Instalación y configuración del SGBD.

Gestión de usuarios y permisos.

Optimización del rendimiento.

Realización de copias de seguridad.

Recuperación ante fallos.

Monitorización del sistema.

---

### Miniresumen

El DBA se encarga de que la base de datos funcione correctamente, sea segura y tenga buen rendimiento.

---

## 2. Sistemas de almacenamiento

El almacenamiento es el soporte físico o lógico donde se guardan los datos.

---

### Tipos de almacenamiento

Almacenamiento primario: memoria RAM.

Almacenamiento secundario: discos duros (HDD), SSD.

Almacenamiento terciario: cintas, sistemas de archivo externo.

---

### Tecnologías de almacenamiento

DAS (Direct Attached Storage): almacenamiento conectado directamente al equipo.

NAS (Network Attached Storage): almacenamiento conectado a la red.

SAN (Storage Area Network): red dedicada de almacenamiento de alto rendimiento.

---

### Miniresumen

El almacenamiento puede ser local o en red. NAS y SAN son muy importantes en entornos empresariales.

---

## 3. RAID (Redundant Array of Independent Disks)

El RAID es un sistema que combina varios discos duros para mejorar el rendimiento, la redundancia o ambos.

Este es uno de los puntos más preguntados en el examen.

---

### Objetivos del RAID

Aumentar la disponibilidad de los datos.

Mejorar el rendimiento.

Proteger frente a fallos de disco.

---

### Niveles de RAID más importantes

RAID 0 (striping)

Distribuye los datos entre varios discos.

Ventaja: alto rendimiento.

Inconveniente: sin tolerancia a fallos.

Si falla un disco → se pierde todo.

---

RAID 1 (mirroring)

Duplica la información en dos discos.

Ventaja: alta seguridad.

Inconveniente: menor capacidad útil.

---

RAID 5 (paridad distribuida)

Distribuye datos y paridad entre varios discos.

Ventaja: equilibrio entre rendimiento y seguridad.

Soporta fallo de un disco.

---

RAID 6

Similar a RAID 5 pero con doble paridad.

Soporta fallo de dos discos.

---

RAID 10 (1+0)

Combinación de RAID 1 y RAID 0.

Alta seguridad y alto rendimiento.

Necesita mínimo 4 discos.

---

### Tabla resumen RAID

Nivel | Rendimiento | Redundancia | Mínimo discos
----- |------------|-------------|---------------
RAID 0 | Muy alto   | No          | 2
RAID 1 | Medio      | Sí          | 2
RAID 5 | Alto       | Sí (1 disco)| 3
RAID 6 | Medio      | Sí (2 discos)| 4
RAID 10| Muy alto   | Sí          | 4

---

### Miniresumen

RAID combina discos para mejorar rendimiento y/o seguridad. RAID 0 no protege datos, RAID 1 duplica, RAID 5 y 6 usan paridad, RAID 10 combina ambos.

---

## 4. Virtualización del almacenamiento

La virtualización del almacenamiento consiste en abstraer los recursos físicos para gestionarlos como si fueran un único sistema.

---

### Ventajas

Mejor aprovechamiento del hardware.

Mayor flexibilidad.

Facilidad de gestión.

Escalabilidad.

---

### Ejemplos

Volúmenes lógicos.

Cabinas de almacenamiento virtualizadas.

---

### Miniresumen

La virtualización permite gestionar el almacenamiento de forma más flexible y eficiente.

---

## 5. Backup y recuperación

El backup es la copia de seguridad de los datos para poder recuperarlos en caso de fallo.

---

### Tipos de backup

Backup completo: copia total de los datos.

Backup incremental: copia solo los cambios desde el último backup.

Backup diferencial: copia los cambios desde el último backup completo.

---

### Comparativa

Tipo          | Copia | Restauración
-------------|-------|--------------
Completo     | Lenta | Rápida
Incremental  | Rápida| Lenta
Diferencial  | Media | Media

---

### Políticas de backup

Frecuencia de copias.

Retención de datos.

Ubicación de copias (local, remoto, nube).

Verificación de copias.

---

### Regla 3-2-1

3 copias de los datos.

2 soportes diferentes.

1 copia fuera del sitio.

---

### Miniresumen

El backup protege la información. Tipos: completo, incremental y diferencial. Muy importante la regla 3-2-1.

---

## 6. Backup en sistemas físicos y virtuales

---

### Backup en sistemas físicos

Se realiza sobre servidores o equipos reales.

Uso de software de backup tradicional.

---

### Backup en sistemas virtuales

Se realiza sobre máquinas virtuales.

Permite:

Snapshots (instantáneas).

Clonado de máquinas.

Recuperación rápida.

---

### Miniresumen

El backup en virtualización es más flexible gracias a snapshots y clonación.

---

## 7. Virtualización de sistemas

La virtualización permite ejecutar varios sistemas operativos en un mismo hardware.

---

### Definiciones

Máquina virtual: sistema operativo virtual.

Hipervisor: software que gestiona máquinas virtuales.

---

### Tipos de hipervisor

Tipo 1 (bare metal): se ejecuta directamente sobre el hardware.

Tipo 2: se ejecuta sobre un sistema operativo.

---

### Ventajas

Ahorro de costes.

Mejor uso de recursos.

Aislamiento de sistemas.

---

### Miniresumen

La virtualización permite ejecutar varios sistemas en un solo equipo mediante hipervisores.

---

## 8. Virtualización de puestos de usuario

Consiste en ejecutar escritorios virtuales en servidores.

---

### Características

Acceso remoto.

Centralización.

Seguridad.

---

### Ejemplos

VDI (Virtual Desktop Infrastructure).

---

### Miniresumen

Permite que el usuario trabaje desde cualquier dispositivo accediendo a un escritorio remoto.

---

## Miniresumen final del tema

El DBA gestiona bases de datos.

El almacenamiento puede ser DAS, NAS o SAN.

RAID mejora rendimiento y seguridad.

El backup protege datos (completo, incremental, diferencial).

La regla 3-2-1 es clave.

La virtualización permite ejecutar múltiples sistemas y escritorios en un mismo hardware.