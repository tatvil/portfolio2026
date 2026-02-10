# 2. Administración de bases de datos. Sistemas de almacenamiento y su virtualización. Políticas, sistemas y procedimientos de backup y su recuperación. Backup de sistemas físicos y virtuales. Virtualización de sistemas y virtualización de puestos de usuario.

## Administración de bases de datos. 
## Sistemas de almacenamiento y su virtualización. 
## Políticas, sistemas y procedimientos de backup y su recuperación. 
## Backup de sistemas físicos y virtuales. 
## Virtualización de sistemas y virtualización de puestos de usuario.# 3. Administración de servidores de correo electrónico sus protocolos. Administración de contenedores y microservicios.

## Administración de servidores de correo electrónico sus protocolos.

### Puerto de correo

| **Puerto** | **Protocolo** | **Función** |
| --- | --- | --- |
| 25 | SMTP | Envío de correo. |
| 110 | POP3 | Descarga de correo. |
| 143 | IMAP | Gestión de correo en servidor. |
| 465/587 | SMTPS | Envío de correo cifrado. |


### 1. Introducción

El correo electrónico es un servicio fundamental en redes corporativas. Su administración implica gestionar el envío, recepción, almacenamiento y seguridad de los mensajes mediante servidores especializados y protocolos estandarizados.

###  2. Componentes de un sistema de correo

#### MUA – Mail User Agent
Cliente de correo utilizado por el usuario (Outlook, Thunderbird, Webmail).

#### MTA – Mail Transfer Agent

Servidor encargado de enviar y recibir correos entre dominios.
Ejemplos: Postfix, Exim, Sendmail, Microsoft Exchange.

#### MDA – Mail Delivery Agent

Entrega el correo en el buzón del usuario.
Ejemplos: Dovecot, Procmail.

#### Buzones de correo

Formatos habituales:
- Maildir
- mbox

### 3. Protocolos principales

#### SMTP – Simple Mail Transfer Protocol

Protocolo estándar para envío de correo entre servidores y desde clientes.
- Puertos: 25, 465, 587
- Extensiones: ESMTP, SMTP AUTH, STARTTLS

#### POP3 – Post Office Protocol v3

Protocolo para descargar el correo al cliente.
- Puertos: 110, 995 (POP3S)
- Elimina el correo del servidor (según configuración).

#### IMAP – Internet Message Access Protocol

Protocolo para sincronizar correo entre varios dispositivos.

    Puertos: 143, 993 (IMAPS)

    Mantiene los mensajes en el servidor.

🟦 4. Seguridad en el correo electrónico
🔐 TLS / STARTTLS

Cifrado de las comunicaciones entre cliente y servidor.
🔐 SPF – Sender Policy Framework

Define qué servidores están autorizados a enviar correo en nombre del dominio.
🔐 DKIM – DomainKeys Identified Mail

Firma criptográfica que garantiza la integridad del mensaje.
🔐 DMARC – Domain-based Message Authentication, Reporting and Conformance

Política que indica qué hacer si falla SPF o DKIM (none, quarantine, reject).
🟦 5. Tareas habituales de administración
✔️ Gestión de usuarios y buzones

Creación de cuentas, alias, listas de distribución y cuotas.
✔️ Configuración del MTA

Dominios, rutas, límites de tamaño, autenticación y cifrado.
✔️ Filtrado y antispam

Uso de herramientas como:

    SpamAssassin

    Rspamd

    ClamAV

    Listas negras (RBL)

    Greylisting

✔️ Monitorización y logs

Revisión de:

    /var/log/mail.log

    /var/log/maillog

✔️ Gestión de certificados

Renovación automática con Let's Encrypt.
🟦 6. Flujo básico de un correo electrónico

    El usuario redacta el mensaje en el MUA.

    El cliente lo envía al servidor mediante SMTP (587).

    El MTA del remitente consulta DNS (MX) y entrega el mensaje al MTA del destinatario.

    El MDA deposita el mensaje en el buzón del usuario.

    El usuario accede al correo mediante IMAP o POP3.

🟦 7. Conclusión

La administración de servidores de correo requiere conocer la arquitectura del sistema, dominar los protocolos SMTP, IMAP y POP3, y aplicar medidas de seguridad como SPF, DKIM y DMARC. Un administrador debe gestionar usuarios, buzones, filtrado antispam y monitorización para garantizar un servicio fiable y seguro.



## Administración de contenedores y microservicios.# 4. Administración de redes de área local. Gestión de usuarios. Gestión de dispositivos. Monitorización y control de tráfico.

## Administración de redes de área local. 

## Gestión de usuarios. 

## Gestión de dispositivos. 

## Monitorización y control de tráfico.

| Puerto | Protocolo | Función |
| --- | --- | --- |
| 161/162 | SNMP | Monitorización de dispositivos de red.
# El modelo TCP/IP y el modelo de referencia de interconexión de sistemas abiertos (OSI) de ISO. Protocolos TCP/IP

## 1. El modelo TCP/IP y el modelo de referencia OSI (ISO)

El **modelo OSI** (*Open Systems Interconnection*), desarrollado por la **ISO**, es un **modelo teórico de referencia** que describe cómo se comunican los sistemas en red mediante una arquitectura en **7 capas**.

> No define protocolos concretos, sino funciones.

### Capas del modelo OSI

1. **Capa Física**
   - Transmisión de bits por el medio físico
   - Señales, voltajes, cables, conectores
   - Ejemplos: cable Ethernet, fibra óptica

2. **Capa de Enlace de datos**
   - Comunicación entre nodos de la misma red
   - Direcciones MAC
   - Control de errores
   - Ejemplos: Ethernet, Wi-Fi

3. **Capa de Red**
   - Direccionamiento lógico y enrutamiento
   - Determina el camino de los paquetes
   - Protocolo principal: IP

4. **Capa de Transporte**
   - Comunicación extremo a extremo
   - Control de flujo y errores
   - Protocolos: TCP y UDP

5. **Capa de Sesión**
   - Establece, mantiene y finaliza sesiones
   - Control del diálogo entre aplicaciones

6. **Capa de Presentación**
   - Formato de los datos
   - Compresión y cifrado
   - Ejemplo conceptual: SSL/TLS

7. **Capa de Aplicación**
   - Interfaz con el usuario
   - Servicios de red
   - Ejemplos: HTTP, FTP, SMTP, DNS

---

## 2. Modelo TCP/IP

El **modelo TCP/IP** es un **modelo práctico**, base de **Internet**, desarrollado por **DARPA**.  
Define tanto la arquitectura como los **protocolos reales** de comunicación.

### Capas del modelo TCP/IP

1. **Acceso a red**
   - Equivale a las capas Física y Enlace del modelo OSI
   - Ejemplos: Ethernet, Wi-Fi

2. **Internet**
   - Direccionamiento y enrutamiento
   - Protocolos: IP, ICMP, ARP

3. **Transporte**
   - Comunicación extremo a extremo
   - Protocolos: TCP y UDP

4. **Aplicación**
   - Servicios de red para el usuario
   - Protocolos: HTTP, HTTPS, FTP, SMTP, DNS, SSH

---

## 3. Correspondencia entre OSI y TCP/IP

| Modelo OSI            | Modelo TCP/IP   |
|----------------------|-----------------|
| Aplicación           | Aplicación      |
| Presentación         | Aplicación      |
| Sesión               | Aplicación      |
| Transporte           | Transporte      |
| Red                  | Internet        |
| Enlace de datos      | Acceso a red    |
| Física               | Acceso a red    |

---

## 4. Protocolos principales de TCP/IP

### Protocolo IP
- Capa: Internet
- Función: direccionamiento y enrutamiento
- Versiones: IPv4 e IPv6
- No garantiza la entrega de paquetes

### Protocolo TCP
- Capa: Transporte
- Orientado a conexión
- Fiable: control de errores y retransmisión
- Usado en: web, correo electrónico

### Protocolo UDP
- Capa: Transporte
- No orientado a conexión
- Más rápido, menos fiable
- Usado en: streaming, DNS, VoIP

### Otros protocolos importantes
- **ICMP**: mensajes de error y control (ping)
- **ARP**: resolución de direcciones IP a MAC
- **HTTP / HTTPS**: servicios web
- **FTP**: transferencia de archivos
- **SMTP / POP3 / IMAP**: correo electrónico
- **DNS**: resolución de nombres de dominio

---

## 5. Diferencias entre OSI y TCP/IP

- **Modelo OSI**
  - Teórico
  - 7 capas
  - Enfoque didáctico

- **Modelo TCP/IP**
  - Práctico
  - 4 capas
  - Base de Internet# 8. Internet: arquitectura de red. Origen, evolución y estado actual. Principales servicios. Protocolos HTTP, HTTPS y SSL/TLS.

| **Puerto** | **Protocolo** | **Función** |
| --- | --- | --- |
| 80 | HTTP | Navegación web sin cifrado. |
| 443 | HTTPS | Navegación web cifrada. |
| 8080 | HTTP alternativo | Proxies, servidores web secundarios. |
