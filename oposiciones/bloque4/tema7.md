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
  - Base de Internet