# 3. Administración de servidores de correo electrónico sus protocolos. Administración de contenedores y microservicios.

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



## Administración de contenedores y microservicios.