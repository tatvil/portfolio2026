## Administración del sistema operativo y software de base

En este tema vamos a estudiar la administración del sistema operativo y del software de base, centrándonos en su definición, funciones, gestión, actualización, mantenimiento y reparación.

El objetivo es comprender cómo mantener un sistema informático operativo, seguro y eficiente, algo fundamental en entornos profesionales y en la Administración Pública.

---

## 1. Sistema operativo y software de base

El sistema operativo es el software principal de un equipo informático. Actúa como intermediario entre el hardware y el usuario, permitiendo ejecutar aplicaciones y gestionar los recursos del sistema.

Un sistema operativo se encarga de coordinar todos los elementos del ordenador para que funcionen de forma conjunta.

### Definiciones clave

Sistema operativo: conjunto de programas que gestionan el hardware y permiten la ejecución de aplicaciones.

Kernel: núcleo del sistema operativo. Es la parte que interactúa directamente con el hardware.

Proceso: programa en ejecución.

Hilo: unidad mínima de ejecución dentro de un proceso.

Sistema de archivos: estructura que organiza y almacena la información en discos.

Driver o controlador: software que permite al sistema operativo comunicarse con un dispositivo hardware.

Firmware: software integrado en el hardware que controla su funcionamiento básico.

Software de base: conjunto formado por el sistema operativo, drivers, firmware y utilidades del sistema.

---

### Funciones del sistema operativo

Gestión de procesos: creación, planificación y finalización de procesos.

Gestión de memoria: asignación y liberación de memoria RAM.

Gestión de dispositivos: control de periféricos mediante drivers.

Gestión de archivos: creación, eliminación y organización de archivos.

Seguridad: control de accesos y permisos.

---

### Miniresumen

El sistema operativo es el núcleo del sistema y gestiona todos los recursos del equipo. El software de base incluye todos los componentes necesarios para que el sistema funcione correctamente.

---

## 2. Sistemas operativos en el examen

Para el examen de TAI debes centrarte principalmente en:

Sistemas Windows: muy importante a nivel práctico y de comandos.

Sistemas Linux/Unix: muy importante en administración, comandos y conceptos.

No es necesario profundizar en sistemas minoritarios.

---

### Diferencias clave

Windows: interfaz gráfica predominante, administración sencilla, comandos básicos.

Linux: mayor uso de línea de comandos, muy utilizado en servidores, gran control del sistema.

---

### Miniresumen

En el examen debes dominar Windows y Linux, especialmente comandos y administración básica.

---

## 3. Administración del sistema operativo

Administrar un sistema operativo consiste en realizar tareas para garantizar su funcionamiento correcto.

---

### 3.1 Gestión de usuarios

Permite controlar quién accede al sistema.

Tipos de usuarios:

Administrador: control total del sistema.

Usuario estándar: permisos limitados.

Invitado: acceso restringido.

---

### Comandos en Windows

Crear usuario:
net user nombre_usuario contraseña /add

Eliminar usuario:
net user nombre_usuario /delete

Ver usuarios:
net user

Agregar usuario a grupo administradores:
net localgroup Administradores nombre_usuario /add

---

### Comandos en Linux

Crear usuario:
useradd nombre_usuario

Asignar contraseña:
passwd nombre_usuario

Eliminar usuario:
userdel nombre_usuario

Ver usuarios:
cat /etc/passwd

Añadir usuario a grupo:
usermod -aG grupo nombre_usuario

---

### 3.2 Gestión de permisos

Permite controlar qué puede hacer cada usuario.

Permisos básicos:

Lectura

Escritura

Ejecución

---

### Comandos en Linux

Cambiar permisos:
chmod 755 archivo

Cambiar propietario:
chown usuario:grupo archivo

---

### Miniresumen

La gestión de usuarios y permisos es clave para la seguridad. En el examen suelen preguntar comandos básicos de Windows y Linux.

---

## 4. Actualización del sistema operativo

Actualizar el sistema operativo consiste en aplicar mejoras y correcciones.

---

### Tipos de actualizaciones

Actualizaciones de seguridad: corrigen vulnerabilidades.

Actualizaciones funcionales: añaden nuevas características.

Parche: corrección de errores concretos.

Service Pack: conjunto acumulado de actualizaciones.

---

### Comandos en Linux

Actualizar repositorios:
apt update

Actualizar sistema:
apt upgrade

En sistemas RedHat:
yum update

---

### Miniresumen

Actualizar el sistema es fundamental para mantener la seguridad y estabilidad.

---

## 5. Mantenimiento del sistema operativo

El mantenimiento busca prevenir problemas y mejorar el rendimiento.

---

### Tipos de mantenimiento

Preventivo: evitar fallos.

Correctivo: solucionar fallos.

Evolutivo: mejorar el sistema.

---

### Tareas de mantenimiento

Eliminar archivos temporales.

Monitorizar CPU, memoria y disco.

Revisar logs.

Gestionar procesos.

---

### Comandos en Windows

Ver procesos:
tasklist

Finalizar proceso:
taskkill /PID número

Ver información del sistema:
systeminfo

Comprobar disco:
chkdsk

---

### Comandos en Linux

Ver procesos:
ps aux

Monitorizar sistema:
top

Espacio en disco:
df -h

Uso de disco:
du -h

---

### Miniresumen

El mantenimiento incluye tareas de limpieza, monitorización y control del sistema.

---

## 6. Reparación del sistema operativo

La reparación se realiza cuando el sistema presenta errores.

---

### Tipos de problemas

Errores de arranque.

Archivos corruptos.

Problemas de hardware.

Malware.

---

### Técnicas de reparación

Restaurar sistema.

Reparar arranque.

Reinstalar sistema operativo.

Recuperar desde copia de seguridad.

---

### Comandos en Windows

Reparar archivos del sistema:
sfc /scannow

Reparar disco:
chkdsk /f

---

### Comandos en Linux

Comprobar sistema de archivos:
fsck

---

### Miniresumen

La reparación implica restaurar, reparar o reinstalar el sistema según la gravedad del problema.

---

## 7. Seguridad en el sistema operativo

La seguridad es fundamental en la administración del sistema.

---

### Principios básicos

Confidencialidad: la información solo es accesible por quien debe.

Integridad: la información no se modifica sin autorización.

Disponibilidad: la información está accesible cuando se necesita.

---

### Medidas de seguridad

Control de accesos.

Uso de antivirus.

Actualizaciones periódicas.

Copias de seguridad.

Firewalls.

---

### Miniresumen

La seguridad se basa en proteger la información y el sistema mediante controles y buenas prácticas.

---

## Miniresumen final del tema

El sistema operativo es el software principal que gestiona el hardware.

El software de base incluye sistema operativo, drivers y utilidades.

La administración incluye usuarios, permisos y configuración.

Las actualizaciones mejoran seguridad y funcionalidad.

El mantenimiento previene fallos y optimiza el sistema.

La reparación soluciona problemas graves.

En el examen debes centrarte en Windows y Linux, especialmente en comandos.