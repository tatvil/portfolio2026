/* Apuntes de clase */

Comunicacion
- Sincrona
- Asincrona

WS

# Tema 6 – Arquitectura cliente/servidor y multicapas. Servicios web y protocolos

---

## 1. Esquema general

1. Arquitectura cliente/servidor  
2. Arquitectura multicapas (n-tier)  
3. Componentes principales  
4. Funcionamiento (operación)  
5. Arquitecturas de servicios web  
6. Protocolos asociados  

---

## 2. Desarrollo

### 2.1 Arquitectura cliente/servidor

**Definición**  
Modelo en el que un cliente solicita servicios y un servidor los proporciona.

**Elementos**
- Cliente: realiza peticiones  
- Servidor: responde y gestiona recursos  
- Red: medio de comunicación  

**Características**
- Separación de funciones  
- Centralización de recursos  
- Escalabilidad  
- Comunicación por red  

**Tipos**
- Modelo de 2 capas  
- Cliente pesado (thick client)  
- Cliente ligero (thin client)  

**Ejemplo**
- Navegador web (cliente)  
- Servidor web (servidor)  

---

### 2.2 Arquitectura multicapas (n-tier)

**Definición**  
Modelo que divide la aplicación en varias capas independientes.

**Capas principales**
1. Capa de presentación  
   - Interfaz de usuario  
2. Capa de lógica de negocio  
   - Procesamiento y reglas  
3. Capa de datos  
   - Acceso a bases de datos  

**Capas adicionales (opcional)**
- Capa de servicios  
- Capa de integración  

**Ventajas**
- Modularidad  
- Mantenimiento sencillo  
- Escalabilidad  
- Reutilización  

**Importante**
Cliente/servidor es un modelo general, mientras que multicapas define la estructura interna de la aplicación.

---

### 2.3 Componentes principales

**En cliente/servidor**
- Cliente  
- Servidor  
- Red  

**En multicapas**
- Front-end (presentación)  
- Back-end (lógica)  
- Base de datos  
- Middleware  

---

### 2.4 Funcionamiento (operación) – Comunicación síncrona y asíncrona

**Comunicación síncrona**
- El cliente envía una petición y **espera la respuesta** del servidor.
- La ejecución queda bloqueada hasta recibir respuesta.
- Es el modelo clásico en HTTP.

**Ejemplo**
- Un navegador solicita una página web y espera a que el servidor responda.

**Ventajas**
- Simplicidad  
- Fácil de implementar  

**Inconvenientes**
- Menor rendimiento en sistemas distribuidos  
- Bloqueo del cliente  

---

**Comunicación asíncrona**
- El cliente envía una petición y **no espera inmediatamente la respuesta**.
- Puede seguir ejecutando otras tareas.
- La respuesta llega posteriormente (callback, cola, eventos).

**Ejemplo**
- Sistemas de mensajería (colas de mensajes)  
- Notificaciones push  
- Procesos en segundo plano  

**Ventajas**
- Mayor escalabilidad  
- Mejor rendimiento  
- No bloquea procesos  

**Inconvenientes**
- Mayor complejidad  
- Gestión de estados más difícil  

---

**Clave de examen**
- HTTP tradicional → síncrono  
- Sistemas distribuidos modernos → combinan síncrono y asíncrono  
- La asincronía es clave en arquitecturas escalables (microservicios, colas, eventos)

---

### 2.5 Arquitecturas de servicios web – WS (Web Services)

**WS (Web Services)**  
Son **servicios web** que permiten la comunicación entre aplicaciones a través de una red, independientemente del lenguaje o sistema.

---

**Características**
- Interoperabilidad (distintos sistemas se comunican)
- Uso de estándares abiertos
- Comunicación a través de red (normalmente HTTP)
- Orientados a servicios

---

**Tipos de Web Services**

**1. SOAP (Web Services clásicos)**
- Basados en XML
- Protocolo formal y estricto
- Utilizan:
  - SOAP → formato de mensajes
  - WSDL → descripción del servicio
- Más pesados pero más estandarizados

---

**2. REST (estilo arquitectónico)**
- Más ligero
- Usa HTTP directamente (GET, POST, PUT, DELETE)
- Datos en JSON (principalmente)
- Más utilizado actualmente

---

**Ejemplo sencillo**

Una aplicación pide datos de un usuario:

- Cliente → petición HTTP (REST)
- Servidor → devuelve JSON con los datos

---

**Relación con el temario**
- WS = forma de implementar **arquitectura cliente/servidor distribuida**
- Muy usado en arquitecturas multicapas
- Base de APIs modernas

---

**Trampas típicas de examen**
- WS no es solo SOAP → REST también es Web Service
- SOAP = protocolo  
- REST = estilo arquitectónico (no protocolo)
- JSON → típico de REST  
- XML → típico de SOAP  

---

**Resumen rápido**
- WS = comunicación entre aplicaciones  
- SOAP (XML, pesado, formal)  
- REST (JSON, ligero, actual)

---

### 2.6 Protocolos asociados

**HTTP / HTTPS**
- Protocolo principal de la web  
- Modelo petición/respuesta  
- HTTPS añade seguridad mediante cifrado  

**TCP/IP**
- Base de las comunicaciones en red  
- TCP: transmisión fiable  
- IP: direccionamiento  

**SSL/TLS**
- Protocolos de seguridad  
- Proporcionan cifrado  

**Otros protocolos**
- FTP: transferencia de archivos  
- SMTP: envío de correo  
- DNS: resolución de nombres  

---

## 3. Ejemplo práctico

Aplicación web:

- Cliente: navegador  
- Presentación: HTML, CSS, JavaScript  
- Lógica: servidor de aplicaciones  
- Datos: base de datos  

Flujo:
1. Usuario realiza una acción  
2. Se envía una petición HTTP  
3. El servidor procesa la lógica  
4. Consulta la base de datos  
5. Devuelve la respuesta  

---

## 4. Miniresumen

- Cliente/servidor: el cliente solicita y el servidor responde  
- Multicapas: separación en presentación, lógica y datos  
- Ventajas: modularidad, mantenimiento y escalabilidad  
- Servicios web: comunicación entre aplicaciones  
- REST es el modelo más utilizado actualmente  
- Protocolos clave: HTTP/HTTPS, TCP/IP, SSL/TLS  