# Bloque 4 · Tema 6
# Comunicaciones. Medios de transmisión. Modos de comunicación. Equipos terminales y equipos de interconexión y conmutación. Redes de comunicaciones. Redes de conmutación y redes de difusión. Comunicaciones móviles e inalámbricas.

---

# 1. Esquema introductorio (visión rápida)

**Comunicación de datos:** transmisión de información entre sistemas.

**Medios de transmisión**
- Guiados: par trenzado (UTP/STP), coaxial, fibra óptica.
- No guiados (inalámbricos): ondas de radio, microondas, infrarrojos.

**Modos de comunicación**
- Simplex (un sentido), Half-duplex (alternado, ej. walkie-talkie), Full-duplex (bidireccional simultáneo).

**Redes**
- Conmutación de circuitos (PSTN, RDSI): camino dedicado.
- Conmutación de paquetes (Internet): los datos viajan en paquetes independientes.
- Difusión (broadcast): todos reciben el mensaje (ej. Ethernet legacy, radio, TV).

---

# 2. Medios de transmisión

## 2.1 Medios guiados

### Par trenzado

El cable más utilizado en redes de área local (LAN).

| Tipo | Descripción |
|------|-------------|
| **UTP** (Unshielded Twisted Pair) | Sin blindaje; más económico y flexible |
| **STP** (Shielded Twisted Pair) | Con blindaje; mejor protección contra interferencias |
| **FTP** | Pantalla global sobre todos los pares |

**Categorías:**

| Categoría | Ancho de banda | Uso típico |
|-----------|---------------|------------|
| Cat 5e | 100 MHz | Fast Ethernet (100 Mbps) |
| Cat 6 | 250 MHz | Gigabit Ethernet |
| Cat 6A | 500 MHz | 10 Gigabit Ethernet |
| Cat 7 | 600 MHz | 10 GbE con mejor blindaje |
| Cat 8 | 2000 MHz | 40 GbE en CPD |

Conectores: **RJ-45** (8P8C).

### Cable coaxial
- Conductor central + aislante + malla conductora + cubierta exterior.
- Usado en TV por cable, redes antiguas (10Base2, 10Base5).
- En desuso en redes LAN modernas.

### Fibra óptica
Transmite luz a través de un núcleo de vidrio o plástico. No sufre interferencias electromagnéticas.

| Tipo | Descripción | Distancia |
|------|-------------|-----------|
| **Monomodo (SMF)** | Solo un modo de propagación; núcleo muy fino (~9 µm); láser | Decenas de km |
| **Multimodo (MMF)** | Varios modos; núcleo más grueso (50/62,5 µm); LED o VCSEL | Hasta ~2 km |

Conectores: SC, LC, ST, MTP/MPO.  
Velocidades: 1 Gbps, 10 Gbps, 40 Gbps, 100 Gbps, 400 Gbps+.

## 2.2 Medios no guiados (inalámbricos)

| Medio | Frecuencia | Uso |
|-------|-----------|-----|
| **Ondas de radio** | < 300 MHz | Radiodifusión AM/FM, comunicaciones móviles |
| **Microondas terrestres** | 300 MHz – 300 GHz | Enlace punto a punto (repetidores) |
| **Microondas por satélite** | 1-30 GHz | GPS, TV satélite, comunicaciones globales |
| **Infrarrojos** | 300 GHz – 430 THz | Mandos a distancia; corto alcance; sin obstáculos |

### Wi-Fi (IEEE 802.11)

| Estándar | Frecuencia | Velocidad máxima | Nombre comercial |
|----------|-----------|-----------------|-----------------|
| 802.11b | 2,4 GHz | 11 Mbps | Wi-Fi 1 |
| 802.11a | 5 GHz | 54 Mbps | Wi-Fi 2 |
| 802.11g | 2,4 GHz | 54 Mbps | Wi-Fi 3 |
| 802.11n | 2,4/5 GHz | 600 Mbps | Wi-Fi 4 |
| 802.11ac | 5 GHz | 6,9 Gbps | Wi-Fi 5 |
| 802.11ax | 2,4/5/6 GHz | 9,6 Gbps | Wi-Fi 6 / 6E |
| 802.11be | 2,4/5/6 GHz | 46 Gbps | Wi-Fi 7 |

---

# 3. Modos de comunicación

| Modo | Descripción | Ejemplo |
|------|-------------|---------|
| **Simplex** | Solo en un sentido | TV, radio (emisión) |
| **Half-duplex** | Ambos sentidos, pero no simultáneamente | Walkie-talkie, CB radio |
| **Full-duplex** | Ambos sentidos simultáneamente | Teléfono, Ethernet moderno |

---

# 4. Parámetros de la transmisión

| Concepto | Definición |
|----------|-----------|
| **Ancho de banda** | Rango de frecuencias disponible (Hz) o tasa máxima de transferencia (bps) |
| **Velocidad de transmisión** | Bits por segundo (bps, Kbps, Mbps, Gbps) |
| **Latencia / Retardo** | Tiempo que tarda un bit en ir de origen a destino |
| **Jitter** | Variación en la latencia; crítico en voz/video en tiempo real |
| **Tasa de error (BER)** | Bit Error Rate: proporción de bits recibidos con error |
| **Throughput** | Tasa de transferencia real efectiva |

### Teorema de Nyquist (canal sin ruido)
$$C = 2B \cdot \log_2(M)$$
Donde $B$ es el ancho de banda en Hz y $M$ es el número de niveles de señal.

### Teorema de Shannon (canal con ruido)
$$C = B \cdot \log_2(1 + S/N)$$
Donde $S/N$ es la relación señal/ruido.

---

# 5. Equipos terminales y de interconexión

## 5.1 Equipos terminales (DTE – Data Terminal Equipment)

Dispositivos que generan o consumen información:
- Ordenadores, servidores.
- Teléfonos, smartphones.
- Impresoras en red.

## 5.2 Equipos de interconexión

### Repetidor (capa 1)
- Regenera la señal eléctrica para extender el alcance.
- Opera en capa 1 del modelo OSI.
- No filtra, no procesa: retransmite todos los bits.

### Hub (concentrador – capa 1)
- Conecta varios equipos en estrella.
- Retransmite a todos los puertos (dominio de colisión único).
- En desuso: sustituido por el switch.

### Bridge (puente – capa 2)
- Conecta dos segmentos de red.
- Aprende direcciones MAC; filtra tramas por segmento.

### Switch (conmutador – capa 2)
- Conecta dispositivos en LAN.
- Crea una **tabla MAC** → envía la trama solo al puerto de destino.
- Cada puerto es un dominio de colisión independiente.
- Puede crear **VLANs** (redes virtuales).
- **Switch de capa 3:** también enruta (tiene capacidades de router).

### Router (encaminador – capa 3)
- Conecta redes distintas (LAN-WAN, entre subredes).
- Trabaja con **direcciones IP**.
- Selecciona la mejor ruta mediante protocolos de enrutamiento.
- Separa dominios de broadcast.

| Protocolo de enrutamiento | Tipo | Descripción |
|--------------------------|------|-------------|
| **RIP** | Vector-distancia | Métrica: número de saltos; max. 15 |
| **OSPF** | Estado del enlace | Métrica: coste; más escalable |
| **BGP** | Vector de ruta | Enrutamiento entre sistemas autónomos (Internet) |
| **EIGRP** | Híbrido | Propietario Cisco |

### Gateway (pasarela – capa 7)
- Traduce entre protocolos distintos (ej. red IP a red X.25).
- Opera en todas las capas si es necesario.

### Comparación de dispositivos

| Dispositivo | Capa OSI | Dirección usada | Dominio de colisión | Dominio broadcast |
|-------------|---------|----------------|--------------------|--------------------|
| Hub | 1 | — | Único | Único |
| Bridge | 2 | MAC | Separado por puerto | Único |
| Switch | 2 (o 3) | MAC (o IP) | Separado por puerto | Único (excepto VLAN) |
| Router | 3 | IP | Separado | Separado |

---

# 6. Redes de comunicaciones

## 6.1 Clasificación por cobertura geográfica

| Tipo | Cobertura | Ejemplo |
|------|-----------|---------|
| **PAN** | Personal (~10 m) | Bluetooth, ZigBee |
| **LAN** | Local (edificio) | Ethernet, Wi-Fi |
| **MAN** | Metropolitana (ciudad) | Metro Ethernet, WiMAX |
| **WAN** | Amplia (país/internacional) | Internet, MPLS, ATM |

## 6.2 Topologías de red

| Topología | Descripción | Ventajas | Desventajas |
|-----------|-------------|----------|-------------|
| **Bus** | Todos comparten un cable único | Sencilla, barata | Un fallo afecta a todos |
| **Estrella** | Todos conectados a un nodo central | Fácil de gestionar | El nodo central es punto de fallo |
| **Anillo** | Cada nodo conectado al siguiente y al anterior | Predecible | Un fallo afecta a todos |
| **Malla** | Cada nodo conectado a todos los demás | Alta redundancia | Muy cara |
| **Árbol** | Jerarquía de estrellas | Escalable | El nodo raíz es punto de fallo |

---

# 7. Redes de conmutación y redes de difusión

## 7.1 Redes de conmutación de circuitos

- **Se establece un camino dedicado** entre origen y destino antes de transmitir.
- El circuito está reservado durante toda la comunicación, aunque no haya datos.
- Ejemplo: red telefónica pública (**PSTN**), **RDSI (ISDN)**.

**Ventaja:** latencia predecible, calidad constante.  
**Desventaja:** ineficiente (recursos reservados aunque no se usen).

### RDSI (Red Digital de Servicios Integrados / ISDN)
- Digitaliza la línea telefónica convencional.
- Canales B (64 Kbps, para datos/voz) y canal D (señalización).
- **BRI (Basic Rate Interface):** 2B+D (128 Kbps de datos + señalización).
- **PRI (Primary Rate Interface):** 30B+D en Europa (E1 = 2 Mbps).
- Actualmente en desuso; sustituida por ADSL, fibra y VoIP.

## 7.2 Redes de conmutación de paquetes

- Los datos se dividen en **paquetes**, cada uno con cabecera (origen, destino, número de secuencia).
- Los paquetes viajan de forma independiente por la red y pueden tomar rutas distintas.
- El receptor reensambla los paquetes.
- Ejemplo: **Internet (IP/TCP)**, Frame Relay, X.25, ATM.

**Ventaja:** uso eficiente de la red; comparte recursos entre muchos usuarios.  
**Desventaja:** latencia variable (jitter); no garantizado por defecto.

### Variantes
| Variante | Descripción |
|---------|-------------|
| **Datagramas** | Paquetes completamente independientes (UDP) |
| **Circuito virtual** | Se establece un camino lógico antes de transmitir pero los recursos no son dedicados (ATM, Frame Relay) |

## 7.3 Redes de difusión (broadcast)

- Un nodo transmite y **todos los nodos** de la red reciben el mensaje.
- Ejemplo: Ethernet en hub, Wi-Fi, radio, televisión terrestre.

**Multidifusión (multicast):** los datos se envían a un grupo de receptores suscritos, no a todos.

---

# 8. Comunicaciones móviles e inalámbricas

## 8.1 Generaciones de la telefonía móvil

| Generación | Tecnología | Velocidad | Características |
|-----------|-----------|-----------|----------------|
| **1G** | AMPS, NMT | ~2,4 Kbps | Analógica; solo voz |
| **2G** | GSM, CDMA | 14,4 Kbps – 384 Kbps | Digital; SMS; GPRS/EDGE |
| **3G** | UMTS, HSPA | 384 Kbps – 42 Mbps | Internet móvil; vídeo llamada |
| **4G** | LTE, LTE-A | 100 Mbps – 1 Gbps | Totalmente basado en IP |
| **5G** | NR (New Radio) | Hasta 20 Gbps | Baja latencia (<1 ms); IoT masivo |

### Términos de 2G
- **GSM (Global System for Mobile communications):** estándar europeo de 2G.
- **SIM (Subscriber Identity Module):** tarjeta identificadora del usuario.
- **GPRS:** extensión de GSM para transmisión de datos (hasta 172 Kbps).
- **EDGE:** mejora de GPRS (hasta 384 Kbps); también llamado 2,5G.

## 8.2 Bluetooth

| Versión | Velocidad | Alcance | Notas |
|---------|-----------|---------|-------|
| Bluetooth 4.0 (BLE) | 1 Mbps | ~50 m | Bajo consumo; IoT |
| Bluetooth 5.0 | 2 Mbps | ~240 m | Más alcance y velocidad |
| Bluetooth 5.4 | 2 Mbps | — | Seguridad mejorada |

Usa la banda de 2,4 GHz (ISM); frecuencia *hopping* para evitar interferencias.

## 8.3 Otras tecnologías inalámbricas

| Tecnología | Frecuencia | Velocidad | Uso |
|------------|-----------|-----------|-----|
| **ZigBee** (IEEE 802.15.4) | 2,4 GHz | 250 Kbps | Domótica, IoT, bajo consumo |
| **Z-Wave** | 868/915 MHz | 100 Kbps | Domótica; menor interferencia con Wi-Fi |
| **WiMAX** (IEEE 802.16) | 2-66 GHz | Hasta 1 Gbps | WAN inalámbrica; alternativa DSL en zonas rurales |
| **NFC** | 13,56 MHz | 424 Kbps | Pago contactless; distancia < 20 cm |
| **RFID** | 125 KHz – 5,8 GHz | Variable | Identificación de objetos; logística |
| **LoRa / LoRaWAN** | 868 MHz | < 50 Kbps | IoT de largo alcance y bajo consumo |

## 8.4 WLAN – Wi-Fi (IEEE 802.11)

Ya detallado en la sección de medios. Aspectos adicionales:

- **SSID:** nombre de la red Wi-Fi.
- **WPA2 / WPA3:** protocolos de seguridad actuales (reemplazaron WEP y WPA, que son inseguros).
- **802.11i:** estándar de seguridad; base de WPA2.
- **MIMO (Multiple Input Multiple Output):** múltiples antenas para mejorar el rendimiento.
- **OFDM (Orthogonal Frequency-Division Multiplexing):** modulación usada en 802.11a/g/n/ac/ax.

---

# 9. Modelo OSI y TCP/IP (referencia de capas)

## 9.1 Modelo OSI (7 capas)

| Nº | Capa | Función | Protocolos/tecnologías |
|----|------|---------|----------------------|
| 7 | **Aplicación** | Interfaz con el usuario/app | HTTP, FTP, SMTP, DNS, SSH |
| 6 | **Presentación** | Formato, cifrado, compresión | SSL/TLS, JPEG, MPEG |
| 5 | **Sesión** | Control de diálogo, sesiones | NetBIOS, RPC |
| 4 | **Transporte** | Transporte extremo a extremo, control de flujo | TCP, UDP |
| 3 | **Red** | Enrutamiento, direccionamiento lógico | IP, ICMP, BGP, OSPF |
| 2 | **Enlace de datos** | Acceso al medio, direccionamiento físico | Ethernet, Wi-Fi, PPP |
| 1 | **Física** | Transmisión de bits por el medio | Cables, señales, conectores |

## 9.2 Modelo TCP/IP (4 capas)

| Capa TCP/IP | Capas OSI equivalentes | Protocolos |
|-------------|----------------------|------------|
| **Aplicación** | 5, 6, 7 | HTTP, DNS, SMTP, FTP, SSH |
| **Transporte** | 4 | TCP, UDP |
| **Internet** | 3 | IP, ICMP, ARP |
| **Acceso a red** | 1, 2 | Ethernet, Wi-Fi, PPP |

## 9.3 TCP vs UDP

| Característica | TCP | UDP |
|----------------|-----|-----|
| Orientado a conexión | Sí (three-way handshake) | No |
| Fiabilidad | Sí (ACK, retransmisión) | No |
| Control de flujo | Sí | No |
| Orden de llegada | Garantizado | No garantizado |
| Velocidad | Más lento | Más rápido |
| Uso | Web, email, FTP | Streaming, DNS, VoIP, juegos |

---

# 10. Resumen: conceptos clave para el examen

| Concepto | Dato clave |
|----------|-----------|
| Par trenzado Cat 6 | Gigabit Ethernet; conector RJ-45 |
| Fibra monomodo | Larga distancia (km); láser; núcleo ~9 µm |
| Fibra multimodo | Corta distancia (~2 km); LED; núcleo 50 µm |
| Full-duplex | Transmisión bidireccional simultánea |
| Fórmula de Shannon | $C = B \cdot \log_2(1 + S/N)$ |
| Hub | Capa 1; dominio de colisión único |
| Switch | Capa 2; tabla MAC; por puerto dominio colisión |
| Router | Capa 3; enrutamiento IP; separa broadcasts |
| Conmutación de circuitos | Camino dedicado; PSTN, RDSI |
| Conmutación de paquetes | Paquetes independientes; Internet, TCP/IP |
| RDSI BRI | 2B+D; 128 Kbps de datos |
| 4G/LTE | 100 Mbps – 1 Gbps; totalmente IP |
| 5G | Hasta 20 Gbps; latencia <1 ms; IoT masivo |
| WPA3 | Protocolo de seguridad Wi-Fi actual |
| IEEE 802.11ax | Wi-Fi 6; 2,4/5/6 GHz; hasta 9,6 Gbps |
| Bluetooth BLE | 4.0; bajo consumo; IoT; 2,4 GHz |
| NFC | 13,56 MHz; <20 cm; pago contactless |
| OSI capa 3 | Red; enrutamiento; IP |
| TCP three-way handshake | SYN → SYN-ACK → ACK |
| UDP | No orientado a conexión; más rápido; streaming/VoIP |
