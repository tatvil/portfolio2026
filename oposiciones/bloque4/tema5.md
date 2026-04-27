# Bloque 4 · Tema 5
# Conceptos de seguridad de los sistemas de información. Seguridad física. Seguridad lógica. Amenazas y vulnerabilidades. Técnicas criptográficas y protocolos seguros. Mecanismos de firma digital. Infraestructura física de un CPD: acondicionamiento y equipamiento. Sistemas de gestión de incidencias. Control remoto de puestos de usuario.

---

# 1. Esquema introductorio (visión rápida)

**Seguridad de la información – tríada CIA**
- **Confidencialidad:** solo acceden los autorizados.
- **Integridad:** la información no se altera sin autorización.
- **Disponibilidad:** el sistema está accesible cuando se necesita.

**Tipos de seguridad**
- Física: protección del hardware y las instalaciones.
- Lógica: protección del software, datos y accesos.

**Criptografía**
- Simétrica (clave única): AES, DES, 3DES.
- Asimétrica (clave pública/privada): RSA, ECC.
- Hash: SHA-256, MD5 (obsoleta).
- Firma digital: autenticidad + integridad + no repudio.

---

# 2. Conceptos fundamentales de seguridad

## 2.1 Tríada CIA

| Propiedad | Descripción | Medidas |
|-----------|-------------|---------|
| **Confidencialidad** | Solo los autorizados pueden acceder a la información | Cifrado, control de acceso, VPN |
| **Integridad** | La información no es alterada sin autorización | Hash, firmas digitales, checksums |
| **Disponibilidad** | El sistema funciona y da servicio cuando se necesita | Redundancia, backups, monitorización |

## 2.2 Otras propiedades de seguridad

| Propiedad | Descripción |
|-----------|-------------|
| **Autenticidad** | Se puede verificar la identidad del emisor |
| **No repudio** | El emisor no puede negar haber enviado un mensaje |
| **Trazabilidad / Auditoría** | Se registra quién hizo qué y cuándo |
| **Control de acceso** | Se gestiona quién puede acceder a qué recursos |

## 2.3 Amenazas, vulnerabilidades y riesgos

| Concepto | Definición |
|----------|-----------|
| **Amenaza** | Evento que puede causar daño (ataque, catástrofe, error humano) |
| **Vulnerabilidad** | Debilidad del sistema que puede ser explotada |
| **Riesgo** | Probabilidad × Impacto de que una amenaza explote una vulnerabilidad |
| **Impacto** | Consecuencia del incidente (económica, reputacional, operacional) |
| **Contramedida** | Acción que reduce el riesgo |

## 2.4 Tipos de amenazas

### Amenazas externas
- **Malware:** virus, gusanos (*worms*), troyanos, ransomware, spyware, rootkits.
- **Ataques de red:** DoS/DDoS, Man-in-the-Middle (MitM), spoofing, sniffing.
- **Intrusión:** acceso no autorizado a sistemas.
- **Ingeniería social:** phishing, vishing, pretexting.

### Amenazas internas
- Empleados malintencionados.
- Errores humanos.
- Privilegios excesivos.

### Amenazas físicas
- Incendio, inundación, seísmo.
- Robo de equipos.
- Corte eléctrico.

## 2.5 OWASP Top 10 (principales vulnerabilidades web)

Las 10 vulnerabilidades de aplicaciones web más críticas, publicadas por OWASP:
1. Control de acceso roto.
2. Fallos criptográficos.
3. Inyección (SQL, XSS, command injection).
4. Diseño inseguro.
5. Mala configuración de seguridad.
6. Componentes vulnerables y desactualizados.
7. Fallos de identificación y autenticación.
8. Fallos en la integridad del software y los datos.
9. Fallos en el registro y monitorización de seguridad.
10. Server-Side Request Forgery (SSRF).

---

# 3. Seguridad física

La **seguridad física** protege el hardware, las instalaciones y las personas frente a amenazas físicas.

## 3.1 Control de acceso físico

- **Perímetro de seguridad:** vallas, muros, control de acceso al edificio.
- **Control de acceso a las instalaciones:** tarjetas de proximidad, biometría (huella, iris, facial), guardias de seguridad.
- **Zonas de seguridad:** recepción, zona de trabajo, CPD (sala de servidores).
- **CCTV:** videovigilancia con cámaras de seguridad.
- **Registro de visitas:** quién entra y sale, y cuándo.

## 3.2 Protección contra desastres físicos

### Incendios
- Detectores de humo y temperatura.
- Sistemas de extinción: **agente limpio** (gases inertes como FM-200, Novec) en CPD para no dañar los equipos; evitar agua o polvo.
- Separación de zonas (cortafuegos físicos).

### Suministro eléctrico
- **SAI / UPS (Sistema de Alimentación Ininterrumpida):** batería que mantiene el sistema en marcha ante cortes breves.
- **Grupos electrógenos (generadores):** energía de emergencia para cortes prolongados.
- **Redundancia de suministro:** conexiones a distintas subestaciones eléctricas.
- **PDU redundantes:** distribución de energía dentro del CPD.

### Temperatura y humedad
- **Sistemas HVAC:** climatización (aire acondicionado de precisión).
- **Temperatura recomendada en CPD:** 18-27°C; humedad relativa 40-60%.
- Monitorización continua de temperatura y humedad.

### Otros riesgos físicos
- Protección frente a inundaciones (drenaje, ubicación elevada).
- Protección antisísmica.
- Protección frente a interferencias electromagnéticas (jaula de Faraday).

---

# 4. Seguridad lógica

La **seguridad lógica** protege los sistemas de información frente al acceso, alteración o destrucción no autorizados a través de medios electrónicos.

## 4.1 Control de acceso lógico

### Identificación y autenticación

| Factor | Descripción | Ejemplo |
|--------|-------------|---------|
| **Algo que sabes** | Contraseña, PIN, pregunta secreta | Password |
| **Algo que tienes** | Token físico, tarjeta inteligente, OTP | DNIe, Google Authenticator |
| **Algo que eres** | Biometría | Huella dactilar, reconocimiento facial |

**MFA (Autenticación Multifactor):** combina al menos dos factores distintos.  
**2FA:** caso particular con exactamente dos factores.

### Modelos de control de acceso

| Modelo | Descripción |
|--------|-------------|
| **DAC (Discretionary Access Control)** | El propietario del recurso decide quién accede (ej. permisos UNIX) |
| **MAC (Mandatory Access Control)** | El sistema impone reglas según etiquetas de seguridad (clasificada/secreta) |
| **RBAC (Role-Based Access Control)** | Los permisos se asignan a roles; los usuarios tienen roles |
| **ABAC (Attribute-Based Access Control)** | Acceso basado en atributos del usuario, recurso y entorno |

**Principio de mínimo privilegio:** cada usuario/servicio solo tiene los permisos estrictamente necesarios.

## 4.2 Gestión de contraseñas

Buenas prácticas:
- Longitud mínima de 12 caracteres.
- Combinación de mayúsculas, minúsculas, números y caracteres especiales.
- No reutilizar contraseñas.
- **No almacenar contraseñas en texto claro** → usar funciones de hash con sal (*salt*): bcrypt, Argon2, PBKDF2.
- Política de caducidad y bloqueo tras intentos fallidos.

## 4.3 Antivirus y protección contra malware

- Software que detecta, bloquea y elimina código malicioso.
- Técnicas: firmas, heurística, análisis de comportamiento (sandbox).
- Soluciones actuales: **EDR (Endpoint Detection and Response)**.

## 4.4 Firewall (cortafuegos)

Filtra el tráfico de red basándose en reglas (IP, puerto, protocolo).

| Tipo | Descripción |
|------|-------------|
| **Filtrado de paquetes** | Reglas por IP de origen/destino y puerto |
| **Stateful inspection** | Rastrea el estado de las conexiones |
| **Proxy / Application-level gateway** | Intermediario que entiende el protocolo de aplicación |
| **NGFW (Next-Generation Firewall)** | Inspección profunda de paquetes, IDS/IPS integrado, control por aplicación |

## 4.5 IDS/IPS

| Sistema | Función |
|---------|---------|
| **IDS** (Intrusion Detection System) | Detecta y **alerta** sobre intrusiones |
| **IPS** (Intrusion Prevention System) | Detecta **y bloquea** las intrusiones en tiempo real |

Técnicas de detección:
- **Basada en firmas:** compara con patrones de ataques conocidos.
- **Basada en anomalías:** detecta desvíos del comportamiento normal.

---

# 5. Técnicas criptográficas y protocolos seguros

## 5.1 Criptografía simétrica

Utiliza la **misma clave** para cifrar y descifrar.

**Ventaja:** muy rápida.  
**Inconveniente:** problema de distribución de claves (¿cómo compartir la clave de forma segura?).

| Algoritmo | Estado | Descripción |
|-----------|--------|-------------|
| **DES** | Obsoleto | 56 bits de clave; vulnerable a fuerza bruta |
| **3DES** | En desuso | Aplica DES tres veces; más lento y debilitándose |
| **AES** | Estándar actual | Claves de 128, 192 o 256 bits; muy eficiente |
| **ChaCha20** | Moderno | Alternativa a AES en dispositivos sin hardware AES |

Modos de operación de AES: ECB, CBC, CTR, GCM (autenticado; el más recomendado).

## 5.2 Criptografía asimétrica (de clave pública)

Utiliza un **par de claves**:
- **Clave pública:** se distribuye libremente; cifra datos o verifica firmas.
- **Clave privada:** se guarda en secreto; descifra datos o genera firmas.

**Lo que cifra la clave pública solo lo descifra la clave privada (y viceversa).**

**Ventaja:** no hay problema de distribución de claves.  
**Inconveniente:** mucho más lenta que la simétrica.

| Algoritmo | Uso | Notas |
|-----------|-----|-------|
| **RSA** | Cifrado y firma | Clave de 2048+ bits recomendada |
| **DSA** | Solo firma digital | |
| **ECDSA / ECC** | Firma y cifrado | Clave más corta con igual seguridad que RSA |
| **Diffie-Hellman (DH)** | Intercambio de claves | No cifra datos, acuerda clave simétrica entre dos extremos |

**Uso híbrido (habitual):** la clave de cifrado simétrico (sesión) se intercambia con criptografía asimétrica → TLS, PGP.

## 5.3 Funciones hash criptográficas

Transforman una entrada de cualquier longitud en una **cadena de longitud fija** (resumen o *digest*).

Propiedades:
- **Deterministas:** misma entrada → mismo hash.
- **Unidireccionales:** imposible obtener la entrada a partir del hash.
- **Resistencia a colisiones:** muy difícil encontrar dos entradas con el mismo hash.
- **Efecto avalancha:** un pequeño cambio en la entrada cambia completamente el hash.

| Algoritmo | Longitud del hash | Estado |
|-----------|------------------|--------|
| **MD5** | 128 bits | Obsoleto (colisiones conocidas) |
| **SHA-1** | 160 bits | Obsoleto (colisiones demostradas) |
| **SHA-256** | 256 bits | **Estándar actual** (familia SHA-2) |
| **SHA-3** | Variable | Más reciente, basado en Keccak |

**Usos:** verificar integridad de archivos, almacenar contraseñas (con salt), firma digital.

## 5.4 Firma digital

La **firma digital** garantiza simultáneamente:
- **Autenticidad:** el mensaje proviene realmente del firmante.
- **Integridad:** el mensaje no ha sido modificado.
- **No repudio:** el firmante no puede negar haber firmado.

### Proceso de firma y verificación

```
FIRMA:
1. Calcular el hash del mensaje (e.g. SHA-256)
2. Cifrar el hash con la CLAVE PRIVADA del firmante
→ Resultado: firma digital

VERIFICACIÓN:
1. Descifrar la firma con la CLAVE PÚBLICA del firmante → hash original
2. Calcular el hash del mensaje recibido
3. Comparar ambos hashes → si son iguales, firma válida
```

## 5.5 Certificados digitales y PKI

Un **certificado digital** vincula una clave pública con la identidad de su propietario, avalado por una **Autoridad de Certificación (CA)**.

Estándar: **X.509**.

### PKI (Public Key Infrastructure)
Infraestructura que gestiona certificados digitales:
- **CA (Certification Authority):** emite y firma certificados.
- **RA (Registration Authority):** verifica la identidad del solicitante.
- **CRL (Certificate Revocation List):** lista de certificados revocados.
- **OCSP (Online Certificate Status Protocol):** verificación en tiempo real del estado del certificado.

### En España
- **FNMT-RCM:** Fábrica Nacional de Moneda y Timbre → emite certificados a ciudadanos.
- **DNIe:** chip criptográfico con certificado de identidad y de firma.
- **@Firma:** plataforma de validación de firmas de la AGE.

## 5.6 Protocolos seguros

| Protocolo | Capa | Función |
|-----------|------|---------|
| **TLS** (Transport Layer Security) | Transporte | Cifrado de comunicaciones (sustituyó a SSL) |
| **SSL** | Transporte | Obsoleto (vulnerabilidades POODLE, BEAST) |
| **HTTPS** | Aplicación | HTTP + TLS; protege la web |
| **SSH** | Aplicación | Acceso remoto seguro a servidores |
| **S/MIME** | Aplicación | Firma y cifrado de correo electrónico |
| **PGP / GPG** | Aplicación | Cifrado y firma de ficheros y correo |
| **IPsec** | Red | Cifrado a nivel de paquete IP; base de muchas VPN |
| **SFTP / FTPS** | Aplicación | Transferencia segura de ficheros |

### TLS (versiones)
- TLS 1.0 y 1.1: obsoletos y desaconsejados.
- **TLS 1.2:** ampliamente usado.
- **TLS 1.3:** versión actual; más rápido y seguro (elimina algoritmos débiles).

---

# 6. Infraestructura física de un CPD

## 6.1 Concepto de CPD

Un **CPD (Centro de Procesamiento de Datos)** es la instalación física que alberga los sistemas informáticos de una organización: servidores, almacenamiento, equipos de red y telecomunicaciones.

## 6.2 Clasificación por disponibilidad (TIER)

Estándar del **Uptime Institute**:

| Nivel | Disponibilidad | Tiempo de inactividad máximo/año | Características |
|-------|---------------|----------------------------------|----------------|
| **TIER I** | 99,671% | 28,8 h | Sin redundancia |
| **TIER II** | 99,741% | 22 h | Componentes redundantes |
| **TIER III** | 99,982% | 1,6 h | Concurrentemente mantenible |
| **TIER IV** | 99,995% | 26 min | Tolerante a fallos |

## 6.3 Acondicionamiento del CPD

### Ubicación
- Planta baja o sótano (riesgo de inundación) → mejor planta intermedia o elevada.
- Lejos de áreas con riesgo de inundación, zonas sísmicas, etc.
- Control de acceso físico estricto.

### Suelo técnico
- Suelo elevado (falso suelo) para el paso de cables y la distribución del aire frío.

### Climatización
- Precisión en temperatura (18-27°C) y humedad (40-60%).
- Sistemas de **pasillos fríos/calientes** (*hot aisle/cold aisle*) para optimizar el flujo de aire.
- Sistemas redundantes (N+1 o 2N).

### Electricidad
- SAI / UPS: protección ante microcortes y cortes breves.
- Generadores diésel: cortes prolongados.
- PDU (Power Distribution Unit) redundantes.
- Doble circuito eléctrico para equipos críticos.

### Contra incendios
- Detección precoz: detectores de humo, temperatura, aspiración de partículas (VESDA).
- Extinción con **gases inertes** (FM-200, Novec 1230, CO₂) que no dañan equipos.
- Compartimentación con puertas y paredes cortafuegos.

### Seguridad física
- Control de acceso por zonas (tarjeta, biometría).
- CCTV.
- Doble puerta (SAS – Sistema de Acceso de Seguridad): antesala que impide acceso simultáneo desde exterior e interior.

## 6.4 Equipamiento del CPD

| Equipo | Función |
|--------|---------|
| **Servidores rack** | Procesamiento; montados en armarios rack (unidades U) |
| **Blade servers** | Muchos servidores en un chasis compartido; alta densidad |
| **SAN / NAS** | Almacenamiento en red |
| **Switches de core/distribución/acceso** | Conectividad de red |
| **Routers / Firewalls** | Conectividad externa y seguridad perimetral |
| **KVM** | Control de varios servidores con un solo teclado/monitor |
| **DCIM** | Data Center Infrastructure Management: monitorización global |

---

# 7. Sistemas de gestión de incidencias

## 7.1 Concepto

Un **sistema de gestión de incidencias** (*ticketing system*) es una herramienta que permite registrar, clasificar, priorizar, asignar y resolver los incidentes de soporte técnico de forma organizada.

## 7.2 Marco ITIL

**ITIL (Information Technology Infrastructure Library)** es un conjunto de buenas prácticas para la gestión de servicios de TI.

Conceptos clave de ITIL relacionados con incidencias:

| Concepto | Descripción |
|----------|-------------|
| **Incidente** | Interrupción no planificada o degradación de un servicio |
| **Problema** | Causa raíz desconocida de uno o más incidentes |
| **Workaround** | Solución temporal para restaurar el servicio |
| **SLA (Service Level Agreement)** | Acuerdo de nivel de servicio: tiempo de respuesta y resolución |
| **RCA (Root Cause Analysis)** | Análisis de la causa raíz del problema |

## 7.3 Ciclo de vida de un incidente

1. **Detección y registro:** el usuario reporta o el sistema detecta el incidente.
2. **Clasificación y priorización:** según impacto y urgencia.
3. **Diagnóstico inicial:** soporte de primer nivel intenta resolver.
4. **Escalado:** si no se resuelve, pasa a segundo o tercer nivel.
5. **Resolución y restauración del servicio.**
6. **Cierre:** confirmación del usuario y documentación.

## 7.4 Herramientas de gestión de incidencias

| Herramienta | Descripción |
|-------------|-------------|
| **Jira Service Management** | Muy extendida, basada en ITIL |
| **ServiceNow** | Plataforma empresarial completa |
| **Remedy (BMC)** | Muy usada en grandes organizaciones |
| **Zammad / osTicket** | Open-source |
| **Zendesk** | Orientada a soporte al cliente |

---

# 8. Control remoto de puestos de usuario

## 8.1 Concepto

El **control remoto** permite acceder y gestionar un equipo desde otro equipo a través de la red, como si estuviera físicamente delante de él.

## 8.2 Protocolos y tecnologías

| Tecnología | Protocolo | Puerto | Descripción |
|------------|-----------|--------|-------------|
| **RDP** (Remote Desktop Protocol) | Propietario Microsoft | TCP 3389 | Escritorio remoto en Windows |
| **VNC** (Virtual Network Computing) | RFB | TCP 5900 | Multiplataforma; comparte el escritorio gráfico |
| **SSH** | SSH | TCP 22 | Acceso remoto a la línea de comandos (Linux/Unix) |
| **TeamViewer** | Propietario | Vario | Fácil de usar; muy extendido en soporte técnico |
| **AnyDesk** | Propietario | Vario | Alternativa a TeamViewer |
| **SPICE / RDP sobre VDI** | Vario | Vario | Virtual Desktop Infrastructure |

## 8.3 Seguridad en el control remoto

Riesgos:
- Acceso no autorizado si las credenciales son débiles.
- Exposición del escritorio a través de la red.
- Ataques de fuerza bruta al puerto RDP (3389).

Medidas:
- Usar autenticación fuerte (MFA).
- **No exponer RDP directamente a Internet** → acceder a través de VPN.
- Cambiar puertos por defecto.
- Cifrado TLS en todas las sesiones remotas.
- Registro y auditoría de sesiones.
- Listas de IPs autorizadas.

---

# 9. Resumen: conceptos clave para el examen

| Concepto | Dato clave |
|----------|-----------|
| Tríada CIA | Confidencialidad, Integridad, Disponibilidad |
| No repudio | El emisor no puede negar haber firmado/enviado |
| AES | Cifrado simétrico estándar; claves 128/192/256 bits |
| RSA | Cifrado asimétrico; par de claves público-privada |
| SHA-256 | Función hash estándar actual (familia SHA-2) |
| MD5 / SHA-1 | Obsoletos; colisiones conocidas |
| Firma digital | Hash del mensaje cifrado con clave privada |
| Certificado X.509 | Vincula clave pública con identidad; emitido por CA |
| FNMT / @Firma / DNIe | Infraestructura de PKI en la AGE española |
| TLS 1.3 | Versión actual del protocolo de cifrado web |
| HTTPS | HTTP + TLS; cifra la comunicación web |
| SSH | Acceso remoto seguro a servidores (puerto 22) |
| SAI / UPS | Alimentación ininterrumpida ante cortes eléctricos |
| TIER IV CPD | 99,995% disponibilidad; tolerante a fallos |
| Pasillos fríos/calientes | Optimización del flujo de aire en CPD |
| Gases inertes en CPD | FM-200, Novec; extinción sin dañar equipos |
| ITIL | Marco de buenas prácticas para gestión de servicios TI |
| SLA | Acuerdo de nivel de servicio (tiempos de respuesta) |
| RDP | Escritorio remoto Windows; puerto TCP 3389 |
| MFA | Autenticación multifactor; al menos dos factores |
| RBAC | Control de acceso basado en roles |
