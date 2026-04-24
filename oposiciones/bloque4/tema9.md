# Bloque 4 · Tema 9
# Seguridad y protección en redes de comunicaciones. Seguridad perimetral. Acceso remoto seguro a redes. Redes privadas virtuales (VPN). Seguridad en el puesto del usuario.

---

# 1. Esquema introductorio (visión rápida)

**Seguridad en redes:** conjunto de medidas técnicas y organizativas que protegen la integridad, confidencialidad y disponibilidad de la información en tránsito.

**Seguridad perimetral:** "muralla" entre la red interna (confiable) y el exterior (no confiable).  
Herramientas: firewall, DMZ, IDS/IPS, proxy, WAF.

**VPN:** túnel cifrado sobre una red pública (Internet) que simula una red privada.  
Protocolos: IPsec, OpenVPN, WireGuard, SSL/TLS.

**Seguridad en el puesto final:** antivirus/EDR, actualizaciones, cifrado de disco, DLP.

---

# 2. Fundamentos de seguridad en redes

## 2.1 Amenazas en redes

| Amenaza | Descripción |
|---------|-------------|
| **Sniffing (escucha)** | Captura de tráfico de red con herramientas como Wireshark |
| **Spoofing** | Suplantación de identidad: IP spoofing, ARP spoofing, DNS spoofing |
| **Man-in-the-Middle (MitM)** | Interposición entre dos comunicantes para capturar o alterar datos |
| **DoS / DDoS** | Saturación de un servicio para hacerlo inaccesible |
| **Port scanning** | Exploración de puertos abiertos para buscar vulnerabilidades (ej. Nmap) |
| **Replay attack** | Reenvío de un paquete capturado para repetir una acción |
| **SQL Injection / XSS** | Inyección de código malicioso en aplicaciones web |

## 2.2 Principios básicos de diseño seguro de redes

- **Defensa en profundidad:** múltiples capas de seguridad; ningún mecanismo único es suficiente.
- **Mínimo privilegio:** cada sistema/usuario solo accede a lo estrictamente necesario.
- **Segmentación:** dividir la red en zonas con distintos niveles de confianza.
- **Zero Trust:** ningún usuario ni dispositivo es de confianza por defecto, aunque esté dentro de la red.

---

# 3. Seguridad perimetral

## 3.1 Concepto

La **seguridad perimetral** es el conjunto de técnicas y dispositivos que protegen la red interna de amenazas externas, controlando el tráfico que entra y sale.

## 3.2 Firewall (cortafuegos)

Ya visto en el tema 5. Resumen en contexto de red perimetral:

| Tipo | Nivel OSI | Funcionamiento |
|------|----------|---------------|
| **Filtrado de paquetes** | 3-4 | Filtra por IP, puerto, protocolo |
| **Stateful inspection** | 3-4 | Rastrea el estado de las conexiones |
| **Application-level gateway (Proxy)** | 7 | Inspecciona el contenido; entiende el protocolo |
| **NGFW** | 3-7 | DPI, IDS/IPS integrado, control por app, SSL inspection |

### Reglas de firewall
Las reglas se procesan en orden. Política por defecto: **denegar todo lo no permitido explícitamente** (*default deny*).

```
Ejemplo de reglas típicas:
1. ALLOW   TCP  ANY        → 80,443   (HTTP/HTTPS saliente)
2. ALLOW   TCP  ANY        → 22       (SSH saliente)
3. ALLOW   TCP  DMZ:80     → INTERNET (Servidor web accesible)
4. DENY    ALL  ANY        → ANY      (Default deny)
```

## 3.3 DMZ (Zona Desmilitarizada)

Una **DMZ** es una subred intermedia, separada tanto de la red interna como de Internet, donde se ubican los servidores que deben ser accesibles desde el exterior.

```
             [INTERNET]
                  |
             [FIREWALL 1]          <- Primer firewall perimetral
                  |
          [DMZ - Zona Pública]     <- Servidores web, correo, DNS
              |        |
           [Web]    [Mail]
                  |
             [FIREWALL 2]          <- Segundo firewall interno
                  |
          [RED INTERNA]            <- Servidores corporativos, BD, usuarios
```

**Servidores típicos en DMZ:**
- Servidor web (HTTP/HTTPS).
- Servidor de correo (SMTP entrante).
- Servidor DNS público.
- Proxy inverso.

**Ventaja:** si el servidor web es comprometido, el atacante no tiene acceso directo a la red interna.

## 3.4 Proxy

Un **proxy** es un intermediario entre los clientes internos e Internet.

| Tipo | Descripción |
|------|-------------|
| **Proxy directo (forward proxy)** | Los clientes internos acceden a Internet a través del proxy |
| **Proxy inverso (reverse proxy)** | Recibe solicitudes de Internet y las redirige a servidores internos (ej. nginx, HAProxy) |
| **Proxy transparente** | Intercepta el tráfico sin necesidad de configuración en el cliente |

**Funciones del proxy directo:**
- Control y filtrado de contenidos (listas negras, categorías).
- Caché de contenidos (rendimiento).
- Autenticación de usuarios.
- Anonimización (oculta las IPs internas).
- Log de navegación.

## 3.5 WAF (Web Application Firewall)

- Protege aplicaciones web frente a ataques de capa 7: SQL Injection, XSS, CSRF, etc.
- Analiza tráfico HTTP/HTTPS.
- Puede operar en modo: *detección* (solo alerta) o *prevención* (bloquea).
- Ejemplos: ModSecurity, AWS WAF, Cloudflare WAF.

## 3.6 IDS / IPS

| Sistema | Posición | Respuesta |
|---------|----------|-----------|
| **IDS** | Pasiva (copia del tráfico, fuera de banda) | Solo alerta (no bloquea por sí mismo) |
| **IPS** | Activa (en línea, *inline*) | Detecta y bloquea el tráfico malicioso |
| **HIDS** | En el host | Monitoriza eventos del sistema (logs, ficheros) |
| **NIDS** | En la red | Monitoriza el tráfico de red |

**Técnicas de detección:**
- **Basada en firmas:** compara con patrones de ataques conocidos.
- **Basada en anomalías:** modelo de comportamiento normal; alerta ante desviaciones.

## 3.7 SIEM (Security Information and Event Management)

Agregación, correlación y análisis de eventos de seguridad de múltiples fuentes:
- Firewalls, IDS/IPS, servidores, aplicaciones.
- Alertas en tiempo real.
- Cumplimiento normativo (auditoría, ENS, GDPR).
- Ejemplos: Splunk, IBM QRadar, Microsoft Sentinel, Wazuh (open-source).

---

# 4. Acceso remoto seguro

## 4.1 Por qué es necesario el acceso remoto seguro

El **teletrabajo**, los **desplazamientos** y la administración remota de sistemas requieren acceder a la red corporativa desde redes no controladas (Wi-Fi pública, Internet). Sin medidas de seguridad, las comunicaciones quedan expuestas.

## 4.2 SSH (Secure Shell)

- Acceso remoto **seguro** a la línea de comandos de servidores Linux/Unix.
- Puerto estándar: **TCP 22**.
- Cifrado: TLS (en versiones modernas, curva25519, AES-256-GCM).
- Autenticación: contraseña o **par de claves RSA/ECDSA** (más seguro).
- Funciones adicionales: **SCP** (copia segura de ficheros), **SFTP**, **port forwarding** (túnel SSH).

```bash
# Generar par de claves SSH
ssh-keygen -t ed25519 -C "usuario@ejemplo.com"

# Conectar a un servidor
ssh usuario@servidor.ejemplo.com

# Copiar ficheros de forma segura
scp archivo.txt usuario@servidor:/ruta/destino/
```

## 4.3 SSL VPN / TLS VPN

- VPN que funciona sobre **HTTPS (TLS/SSL)**, puerto 443.
- Solo requiere un navegador o cliente ligero.
- Muy flexible; funciona a través de firewalls y NAT.
- Ejemplo: **OpenVPN**, Cisco AnyConnect, Pulse Secure.

---

# 5. Redes Privadas Virtuales (VPN)

## 5.1 Concepto

Una **VPN (Virtual Private Network)** crea un **túnel cifrado** a través de una red pública (Internet) que conecta dos puntos como si estuvieran en la misma red privada.

**Proporciona:**
- **Confidencialidad:** el tráfico viaja cifrado.
- **Autenticidad:** se verifica la identidad de los extremos.
- **Integridad:** los datos no son alterados en tránsito.

## 5.2 Tipos de VPN

| Tipo | Descripción | Uso típico |
|------|-------------|-----------|
| **VPN de acceso remoto (cliente-a-sitio)** | Un usuario se conecta a la red corporativa | Teletrabajador → oficina |
| **VPN de sitio a sitio** | Connecta dos redes corporativas permanentemente | Sede central ↔ sucursal |
| **VPN de cliente a cliente** | Conecta dos usuarios individuales | P2P cifrado |

## 5.3 Protocolos VPN

### IPsec
- Estándar IETF para asegurar comunicaciones IP.
- Opera en **capa 3 (red)**.
- **Dos modos:**
  - **Modo transporte:** solo cifra el payload del paquete IP (no la cabecera).
  - **Modo túnel:** cifra el paquete IP completo y añade nueva cabecera → más seguro para VPN.
- **Dos protocolos:**
  - **AH (Authentication Header):** autenticación e integridad, *sin* cifrado.
  - **ESP (Encapsulating Security Payload):** autenticación, integridad *y* cifrado.
- **IKE / IKEv2 (Internet Key Exchange):** protocolo de negociación de claves para IPsec.

| Protocolo IPsec | Autenticación | Integridad | Cifrado |
|----------------|--------------|------------|---------|
| AH | ✓ | ✓ | ✗ |
| ESP | ✓ | ✓ | ✓ |

### OpenVPN
- Open-source; basado en **TLS/SSL**.
- Puerto: **1194/UDP** (o TCP 443 para evitar bloqueos).
- Muy flexible y ampliamente auditado.
- Usa certificados X.509 para autenticación.

### WireGuard
- Protocolo moderno (2020); código muy reducido (~4.000 líneas vs ~100.000 de IPsec).
- **Extremadamente rápido** y sencillo.
- Criptografía moderna: **ChaCha20, Poly1305, Curve25519, BLAKE2**.
- Puerto: **UDP 51820** (por defecto).
- Integrado en el kernel Linux desde la versión 5.6.

### L2TP/IPsec
- **L2TP (Layer 2 Tunneling Protocol):** crea el túnel (capa 2) pero sin cifrado propio.
- Se combina con **IPsec** para el cifrado.
- Común en sistemas operativos sin necesidad de cliente adicional.

### PPTP (Point-to-Point Tunneling Protocol)
- Antiguo protocolo de Microsoft.
- **Obsoleto e inseguro;** no debe usarse.

### Comparativa de protocolos VPN

| Protocolo | Seguridad | Velocidad | Complejidad | Uso |
|-----------|-----------|-----------|-------------|-----|
| IPsec/IKEv2 | Alta | Alta | Media | Empresarial |
| OpenVPN | Alta | Media | Media | Empresarial/Personal |
| **WireGuard** | Muy alta | Muy alta | Baja | Moderno, recomendado |
| L2TP/IPsec | Media-Alta | Media | Media | Legado |
| PPTP | **Muy baja** | Alta | Baja | Obsoleto |

## 5.4 Componentes de una VPN

- **Concentrador VPN / VPN Gateway:** servidor que acepta conexiones VPN entrantes.
- **Cliente VPN:** software en el puesto del usuario.
- **Certificados / PSK (PreShared Key):** para autenticación.
- **Split tunneling:** solo el tráfico corporativo va por la VPN; el resto va directamente a Internet.
- **Full tunneling:** todo el tráfico pasa por la VPN.

---

# 6. Seguridad en el puesto del usuario

## 6.1 Endpoint Security

El **puesto de usuario (endpoint)** es el punto de entrada más habitual de los atacantes (email malicioso, USB infectado, navegación web).

## 6.2 Antivirus y EDR

| Solución | Descripción |
|----------|-------------|
| **Antivirus tradicional** | Detección por firmas; necesita actualizaciones constantes |
| **EDR (Endpoint Detection & Response)** | Monitorización continua del comportamiento; respuesta automática a incidentes |
| **XDR (Extended Detection & Response)** | EDR + correlación con red, cloud, email |

## 6.3 Actualizaciones y parcheo

- **Mantener el SO y las aplicaciones actualizados** es la medida con mayor impacto en seguridad.
- Los parches corrigen vulnerabilidades conocidas (CVEs).
- **Patch Management:** proceso de gestión y despliegue centralizado de actualizaciones.
- Herramientas: WSUS (Windows), Red Hat Satellite, Ansible.

## 6.4 Cifrado del disco

| Solución | Sistema | Notas |
|---------|---------|-------|
| **BitLocker** | Windows | Cifrado de disco completo; TPM |
| **FileVault** | macOS | Cifrado de disco con clave del usuario |
| **LUKS (Linux Unified Key Setup)** | Linux | Estándar de facto en Linux |
| **VeraCrypt** | Multiplataforma | Cifrado de volúmenes y contenedores |

El cifrado de disco protege los datos si el equipo es robado.

## 6.5 DLP (Data Loss Prevention)

- Evita que datos sensibles salgan de la organización (USB, email, nube).
- Clasifica la información por nivel de sensibilidad.
- Políticas: bloquear, cifrar, alertar según el tipo de dato.
- Ejemplos: Microsoft Purview DLP, Symantec DLP, Forcepoint.

## 6.6 Gestión de identidad y acceso (IAM)

- **SSO (Single Sign-On):** el usuario se autentica una vez y accede a todas las aplicaciones.
- **MFA:** obligatorio en accesos críticos.
- **PAM (Privileged Access Management):** control de cuentas privilegiadas (administradores).
- **Directorio activo (Active Directory):** gestión centralizada de usuarios y políticas (GPO).
- **LDAP/Kerberos:** protocolos de autenticación en redes corporativas.

## 6.7 Políticas de seguridad en el puesto

- **Bloqueo automático de pantalla** tras inactividad.
- **Prohibición de medios extraíbles** (USB) no autorizados.
- **Navegación segura:** filtrado de URLs, certificado SSL obligatorio.
- **Correo electrónico seguro:** filtros antispam, antiphishing, DKIM/SPF/DMARC.
- **Formación al usuario:** la ingeniería social es la principal causa de incidentes.

---

# 7. ENS (Esquema Nacional de Seguridad)

El **ENS (Real Decreto 311/2022)** establece los principios y requisitos mínimos de seguridad para las Administraciones Públicas españolas que traten información en sistemas electrónicos.

| Aspecto | Descripción |
|---------|-------------|
| **Ámbito** | Toda la AGE y demás administraciones que usen medios electrónicos |
| **Categorías** | Básica, Media, Alta (según el impacto de un incidente) |
| **Dimensiones de seguridad** | Confidencialidad (C), Integridad (I), Disponibilidad (D), Autenticidad (A), Trazabilidad (T) |
| **CCN-CERT** | Centro Criptológico Nacional – Computer Emergency Response Team de la AGE |
| **Guías CCN-STIC** | Guías técnicas del CCN para implementar el ENS |

---

# 8. Resumen: conceptos clave para el examen

| Concepto | Dato clave |
|----------|-----------|
| Defensa en profundidad | Múltiples capas de seguridad |
| Zero Trust | Ningún dispositivo/usuario es confiable por defecto |
| DMZ | Subred intermedia para servicios públicos |
| Default deny | Denegar todo lo no permitido explícitamente |
| WAF | Firewall de aplicación web; protege contra SQLi, XSS |
| IPS | En línea; detecta Y bloquea tráfico malicioso |
| SIEM | Agregación y correlación de eventos de seguridad |
| VPN de acceso remoto | Teletrabajador → red corporativa cifrada |
| VPN de sitio a sitio | Sede central ↔ sucursal |
| IPsec AH | Solo autenticación e integridad; sin cifrado |
| IPsec ESP | Autenticación, integridad Y cifrado |
| IPsec modo túnel | Cifra el paquete IP completo; más seguro |
| WireGuard | VPN moderno; ChaCha20; muy rápido; kernel Linux 5.6+ |
| OpenVPN | TLS-based; puerto 1194/UDP; open-source |
| PPTP | Obsoleto e inseguro |
| SSH | Acceso remoto seguro; puerto TCP 22 |
| Split tunneling | Solo tráfico corporativo por VPN |
| EDR | Monitorización del comportamiento del endpoint |
| BitLocker | Cifrado de disco Windows; requiere TPM |
| ENS | Real Decreto 311/2022; seguridad en AAPP; CCN-CERT |
| CCN-STIC | Guías técnicas del CCN para el ENS |
