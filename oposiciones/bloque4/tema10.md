# Bloque 4 · Tema 10
# Redes locales. Tipología. Técnicas de transmisión. Métodos de acceso. Dispositivos de interconexión.

---

# 1. Esquema introductorio (visión rápida)

**LAN (Local Area Network):** red de comunicaciones de corto alcance (edificio o campus).

**Topologías físicas:** bus, estrella, anillo, malla, árbol.  
**Topologías lógicas:** bus (CSMA/CD), anillo de token.

**Técnicas de transmisión:**
- Banda base (baseband): señal digital sobre todo el ancho de banda del medio.
- Banda ancha (broadband): múltiples canales sobre el ancho de banda.

**Métodos de acceso al medio:**
- **CSMA/CD (Ethernet):** detecta colisiones.
- **CSMA/CA (Wi-Fi):** evita colisiones.
- **Token Ring:** turno garantizado.

**Dispositivos:** repetidor, hub, bridge, switch, router, gateway.

---

# 2. Redes de área local (LAN) – Concepto y clasificación

## 2.1 Definición

Una **LAN (Local Area Network)** es una red de comunicaciones que cubre un área geográfica limitada (habitación, edificio, campus). Se caracteriza por:
- Alta velocidad de transmisión (100 Mbps − 100 Gbps).
- Baja tasa de errores.
- Propiedad privada (la organización es dueña de la infraestructura).
- Tecnologías predominantes: **Ethernet** (IEEE 802.3) y **Wi-Fi** (IEEE 802.11).

## 2.2 Clasificación por extensión

| Tipo | Cobertura | Velocidad típica | Ejemplo |
|------|-----------|-----------------|---------|
| **PAN** | ~10 m | 1-100 Mbps | Bluetooth, USB |
| **LAN** | Edificio/campus | 100 Mbps – 100 Gbps | Ethernet, Wi-Fi |
| **MAN** | Ciudad | 10 Mbps – 10 Gbps | Metro Ethernet, WiMAX |
| **WAN** | País/internacional | Variable | Internet, MPLS |

---

# 3. Topologías de red

La **topología** describe la estructura física o lógica de cómo están interconectados los nodos.

## 3.1 Topología en bus

```
[PC1]---[PC2]---[PC3]---[PC4]
        ←── Cable coaxial ──→
        (terminadores en extremos)
```

- Todos los nodos comparten el mismo medio de transmisión.
- Las señales se propagan en ambos sentidos.
- **Terminadores:** impiden las reflexiones en los extremos del cable.
- **Ventaja:** sencilla y económica.
- **Desventaja:** un corte en el cable inutiliza toda la red; colisiones frecuentes; difícil diagnóstico.
- Ejemplo: Ethernet 10BASE2 (coaxial delgado), 10BASE5 (grueso).

## 3.2 Topología en estrella

```
        [PC1]
          |
[PC2]--[SWITCH]--[PC3]
          |
        [PC4]
```

- Todos los nodos se conectan a un **nodo central** (switch, hub).
- **Ventaja:** fallo de un nodo no afecta al resto; fácil diagnóstico; sencillo de ampliar.
- **Desventaja:** el nodo central es **punto único de fallo**; coste del cableado a cada nodo.
- **La topología más utilizada en LAN modernas** (con switches).

## 3.3 Topología en anillo

```
[PC1] → [PC2] → [PC3] → [PC4] → [PC1]
```

- Los nodos forman un círculo; los datos circulan en un sentido (o en ambos en anillos duales).
- Acceso al medio: **Token Ring (IEEE 802.5)** o **FDDI**.
- **Ventaja:** predecible; no hay colisiones (acceso ordenado por token).
- **Desventaja:** un fallo en el anillo interrumpe la red; en desuso frente a Ethernet.

## 3.4 Topología en malla

- Cada nodo está conectado directamente a todos los demás nodos (malla completa) o a varios (malla parcial).
- **Ventaja:** muy alta redundancia y tolerancia a fallos.
- **Desventaja:** coste muy elevado en cables y puertos.
- Uso: redes de backbone críticas, Internet (malla parcial).

## 3.5 Topología en árbol (jerárquica)

```
              [Core Switch]
              /            \
     [Distrib SW]      [Distrib SW]
     /    \                 /    \
[Access] [Access]    [Access] [Access]
```

- Jerarquía de nodos en tres niveles: **core, distribución, acceso**.
- La más usada en redes corporativas (arquitectura de tres capas).
- **Ventaja:** escalable y fácil de gestionar.
- **Desventaja:** dependencia de los nodos superiores.

## 3.6 Topología lógica vs física

| Tipo | Descripción |
|------|-------------|
| **Topología física** | Cómo están conectados físicamente los cables y dispositivos |
| **Topología lógica** | Cómo fluye la información lógicamente en la red |

Ejemplo: Ethernet moderno tiene **topología física en estrella** (con switch) pero **topología lógica de bus** (todos comparten el dominio de broadcast).

---

# 4. Técnicas de transmisión

## 4.1 Banda base (Baseband)

- La señal digital ocupa **todo el ancho de banda** del medio.
- Solo se puede transmitir una señal a la vez.
- Codificación típica: **Manchester** (combinación de señal de reloj y datos).
- Ejemplo: **Ethernet (10BASE-T, 100BASE-TX)**.
- Es la técnica estándar en LAN.

## 4.2 Banda ancha (Broadband)

- El ancho de banda del medio se divide en **múltiples canales** de frecuencia (multiplexación por frecuencia, FDM).
- Cada canal puede llevar una señal diferente.
- Ejemplo: **ADSL, cable coaxial (TV por cable), DOCSIS**.
- En LAN se usa excepcionalmente (ej. 10BROAD36, obsoleto).

## 4.3 Comparativa

| Característica | Banda base | Banda ancha |
|---------------|-----------|------------|
| Señal | Digital | Analógica (modulada) |
| Canales | Uno | Varios |
| Distancia | Corta (LAN) | Larga (WAN/MAN) |
| Uso en LAN | Sí (estándar) | Excepcional |

## 4.4 Codificación de la señal

| Codificación | Descripción | Uso |
|-------------|-------------|-----|
| **NRZ (Non-Return to Zero)** | 1 = voltaje alto, 0 = voltaje bajo; no tiene señal de reloj integrada | Básica |
| **Manchester** | Transición a mitad del bit (↑ = 1, ↓ = 0); reloj auto-sincronizado | 10BASE-T Ethernet |
| **Manchester diferencial** | La transición indica el bit; más robusto al ruido | Token Ring |
| **4B5B / 8B10B** | Bloques de código; balance DC y sincronización | Fast Ethernet, Gigabit Ethernet |
| **PAM-4** | 4 niveles de amplitud por símbolo; dobla la tasa | 25G/400G Ethernet |

---

# 5. Métodos de acceso al medio

El **método de acceso al medio (MAC – Medium Access Control)** controla cómo los nodos comparten el medio de transmisión para evitar o resolver colisiones.

## 5.1 CSMA/CD – Carrier Sense Multiple Access with Collision Detection

**Usado en: Ethernet (IEEE 802.3) en topología de bus o con hub.**

Algoritmo:
1. **Carrier Sense (CS):** el nodo escucha el medio antes de transmitir.
2. **Multiple Access (MA):** varios nodos pueden transmitir si el medio está libre.
3. Si dos nodos transmiten a la vez → **colisión**.
4. **Collision Detection (CD):** los nodos detectan la colisión.
5. Se envía una señal **jam** para notificar la colisión a todos.
6. Cada nodo espera un tiempo aleatorio (**backoff exponencial binario**) y reintenta.

**Nota importante:** con switches modernos (full-duplex), no hay colisiones → CSMA/CD ya no es relevante en redes actuales, pero se sigue estudiando como concepto.

## 5.2 CSMA/CA – Carrier Sense Multiple Access with Collision Avoidance

**Usado en: Wi-Fi (IEEE 802.11).**

- En inalámbrico, una estación no puede detectar colisiones mientras transmite (no oye su propia señal reflejada).
- En lugar de detectar, intenta **evitar** las colisiones.
- Mecanismo: **DIFS + espera aleatoria (ventana de contención)** antes de transmitir.
- **ACK obligatorio:** el receptor confirma la recepción de cada trama.
- Variante: **RTS/CTS (Request to Send / Clear to Send)** para evitar el problema del nodo oculto.

### Problema del nodo oculto
Dos estaciones (A y C) no se "escuchan" entre sí pero ambas pueden comunicarse con B.  
Si A y C transmiten simultáneamente a B → colisión en B sin que A ni C la detecten.  
Solución: **RTS/CTS**.

## 5.3 Token Ring (IEEE 802.5)

- Un **token** (ficha) circula por el anillo.
- Solo el nodo que tiene el token puede transmitir.
- Acceso **determinista**: sin colisiones; latencia predecible.
- Velocidades: 4 Mbps y 16 Mbps.
- **Obsoleto**; reemplazado por Ethernet switched.

## 5.4 FDDI (Fiber Distributed Data Interface)

- Anillo dual de fibra óptica a **100 Mbps**.
- Acceso por token; tolerante a fallos (anillo secundario de backup).
- Usado en MAN y backbone en los 90.
- **Obsoleto**; reemplazado por Fast/Gigabit Ethernet y fibra.

## 5.5 Comparativa de métodos de acceso

| Método | Tecnología | Tipo | Colisiones | Determinista |
|--------|-----------|------|-----------|-------------|
| **CSMA/CD** | Ethernet legacy | Contención | Detecta y recupera | No |
| **CSMA/CA** | Wi-Fi | Contención | Evita | No |
| **Token Ring** | IEEE 802.5 | Turno | Sin colisiones | Sí |
| **FDDI** | Fibra FDDI | Turno (token) | Sin colisiones | Sí |
| **Full-duplex Ethernet** | Ethernet moderno | Conmutación | Sin colisiones | No (pero muy baja latencia) |

---

# 6. Ethernet – El estándar de LAN

## 6.1 Historia y evolución

| Versión | Velocidad | Medio | Estándar |
|---------|-----------|-------|---------|
| **10BASE5** | 10 Mbps | Coaxial grueso | IEEE 802.3 (1983) |
| **10BASE2** | 10 Mbps | Coaxial delgado | IEEE 802.3a |
| **10BASE-T** | 10 Mbps | Par trenzado UTP Cat3 | IEEE 802.3i (1990) |
| **100BASE-TX** | 100 Mbps | UTP Cat5 | IEEE 802.3u (1995) – Fast Ethernet |
| **1000BASE-T** | 1 Gbps | UTP Cat5e | IEEE 802.3ab (1999) – Gigabit Ethernet |
| **10GBASE-T** | 10 Gbps | UTP Cat6A | IEEE 802.3an (2006) |
| **10GBASE-SR/LR** | 10 Gbps | Fibra | IEEE 802.3ae |
| **40/100GBASE** | 40/100 Gbps | Fibra | IEEE 802.3ba (2010) |
| **400GBASE** | 400 Gbps | Fibra | IEEE 802.3bs (2017) |

La nomenclatura `VelocidadBASE-Tipo` sigue el patrón:
- **Velocidad** en Mbps o Gbps.
- **BASE** = banda base.
- **Tipo:** T = par trenzado, S = fibra multimodo (short), L = fibra monomodo (long), X = codificación especial.

## 6.2 Trama Ethernet (IEEE 802.3)

```
| Preámbulo | SFD | MAC Dst | MAC Src | EtherType/Longitud | Datos (payload) | FCS |
|  7 bytes  | 1 B | 6 bytes | 6 bytes |       2 bytes      |   46-1500 bytes | 4 B |
```

- **Preámbulo:** sincronización del receptor (patrón 10101010...).
- **SFD (Start Frame Delimiter):** indica el inicio de la trama (10101011).
- **MAC Dst / Src:** direcciones físicas (48 bits / 6 bytes) en notación hexadecimal.
- **EtherType:** indica el protocolo de capa superior (0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6).
- **FCS (Frame Check Sequence):** CRC para detección de errores.

**MTU:** 1500 bytes (payload máximo).  
**Tamaño mínimo de trama:** 64 bytes (para que CSMA/CD funcione correctamente).

## 6.3 Dirección MAC

- **48 bits** (6 bytes) = 12 dígitos hexadecimales (ej. `00:1A:2B:3C:4D:5E`).
- Los primeros 24 bits: **OUI (Organizationally Unique Identifier)** → identifica al fabricante.
- Los últimos 24 bits: asignados por el fabricante (número de serie).
- **Dirección broadcast:** `FF:FF:FF:FF:FF:FF` (enviada a todos los nodos).
- **Dirección multicast:** bit LSB del primer byte = 1.

## 6.4 VLANs (IEEE 802.1Q)

Una **VLAN (Virtual LAN)** segmenta una LAN física en múltiples LANs virtuales independientes.

```
           [SWITCH]
          /    |    \
      VLAN10 VLAN20 VLAN30
     (Ventas) (IT) (RRHH)
```

- Los dispositivos de distintas VLANs no pueden comunicarse directamente sin un **router o switch L3**.
- **Puerto de acceso (access):** asignado a una VLAN; el switch agrega la etiqueta 802.1Q internamente.
- **Puerto troncal (trunk):** transporta tráfico de múltiples VLANs; la etiqueta 802.1Q viaja en los frames.
- **VLAN tag (802.1Q):** 4 bytes adicionales en la trama Ethernet con el ID de VLAN (VID, 12 bits → hasta 4094 VLANs).

**Ventajas:**
- Segmentación de tráfico → mayor seguridad.
- Reducción del dominio de broadcast.
- Flexibilidad: agrupación lógica sin cambios físicos.

---

# 7. Dispositivos de interconexión

## 7.1 Repetidor (capa 1)

- Regenera la señal digital para extender el alcance del cable.
- No filtra ni procesa: transmite todos los bits.
- Extiende el dominio de colisión.
- Prácticamente en desuso (sustituido por switches).

## 7.2 Hub (concentrador – capa 1)

- Conecta múltiples dispositivos en topología estrella.
- Funciona como repetidor multipuerto: retransmite a todos los puertos.
- Un único dominio de colisión y broadcast para todos los nodos.
- **Obsoleto**; sustituido por switches.

## 7.3 Bridge (puente – capa 2)

- Conecta dos segmentos de red.
- Aprende direcciones MAC de cada segmento.
- Filtra el tráfico: solo retransmite tramas al segmento donde está el destino.
- Separa dominios de colisión (pero no de broadcast).
- **STP (Spanning Tree Protocol – IEEE 802.1D):** evita bucles lógicos en redes con múltiples bridges.

## 7.4 Switch (conmutador – capa 2)

El switch es el dispositivo central de las LAN modernas.

**Funcionamiento:**
1. Cuando llega una trama, el switch aprende la MAC origen y el puerto de entrada.
2. Busca la MAC destino en su **tabla CAM (Content Addressable Memory)**.
3. Si encuentra la entrada → envía la trama solo por ese puerto (**unicast**).
4. Si no la encuentra → **flooding** (envía por todos los puertos excepto el de entrada).
5. Broadcasts y multicasts → envía por todos los puertos.

**Modos de conmutación:**

| Modo | Descripción | Latencia | Errores |
|------|-------------|----------|---------|
| **Store-and-Forward** | Almacena la trama completa, verifica FCS antes de reenviar | Mayor | Filtra errores |
| **Cut-Through** | Empieza a reenviar en cuanto lee la MAC destino | Menor | No filtra errores |
| **Fragment-Free** | Lee los primeros 64 bytes (detecta fragmentos de colisión) | Media | Parcial |

**Switch capa 3:**
- Añade capacidad de enrutamiento IP al switch.
- Enrutamiento inter-VLAN sin necesidad de router externo.
- Más rápido que un router para el tráfico interno (enrutamiento hardware).

### STP – Spanning Tree Protocol (IEEE 802.1D)

Evita **bucles físicos** en redes con enlaces redundantes entre switches.

- Se elige un **Root Bridge** (switch raíz).
- Se calculan los caminos más cortos al Root Bridge.
- Los puertos redundantes quedan en estado **blocking** (bloqueados).
- Si el camino activo falla → STP reconverge y activa el camino bloqueado.
- **RSTP (IEEE 802.1w):** Rapid STP; converge en milisegundos (vs 30-50 s del STP original).
- **MSTP (IEEE 802.1s):** Multiple STP; instancias STP por VLAN.

## 7.5 Router (encaminador – capa 3)

- Conecta redes diferentes (distintas subredes IP).
- Toma decisiones de enrutamiento basadas en la dirección **IP destino**.
- **Tabla de enrutamiento:** lista de redes conocidas con el siguiente salto.
- Separa dominios de broadcast.

## 7.6 Gateway (pasarela)

- Traduce entre protocolos de redes heterogéneas.
- Opera en todas las capas (hasta capa 7).
- Ejemplo: gateway entre red IP y red ATM.

## 7.7 Resumen comparativo

| Dispositivo | Capa OSI | Dirección usada | Dom. colisión | Dom. broadcast | Inteligencia |
|-------------|---------|----------------|--------------|----------------|-------------|
| Repetidor | 1 | — | Extende | — | Ninguna |
| Hub | 1 | — | Único | Único | Ninguna |
| Bridge | 2 | MAC | Separa | Único | Tabla MAC |
| Switch | 2 (o 3) | MAC (o IP) | Separa | Único (o VLAN) | Tabla CAM |
| Router | 3 | IP | Separa | Separa | Tabla enrutamiento |
| Gateway | 1-7 | Todas | — | — | Protocolo app |

---

# 8. Resumen: conceptos clave para el examen

| Concepto | Dato clave |
|----------|-----------|
| LAN | Red local; alta velocidad; propiedad privada |
| Topología estrella | La más común en LAN; nodo central = switch |
| Topología bus | Cable coaxial compartido; terminadores; colisiones |
| Topología anillo | Token circulante; IEEE 802.5; obsoleto |
| Banda base | Señal digital; todo el ancho de banda; Ethernet |
| Banda ancha | Múltiples canales FDM; ADSL, cable coaxial |
| Codificación Manchester | Transición a mitad del bit; 10BASE-T Ethernet |
| CSMA/CD | Ethernet legacy; detecta colisiones; backoff exponencial |
| CSMA/CA | Wi-Fi; evita colisiones; DIFS + ventana aleatoria |
| Token Ring | Acceso determinista; sin colisiones; IEEE 802.5 |
| Trama Ethernet | Preámbulo+SFD+MAC dst+MAC src+EtherType+Datos+FCS |
| MAC | 48 bits (6 bytes); OUI (24 bits fabricante) |
| Broadcast MAC | FF:FF:FF:FF:FF:FF |
| MTU Ethernet | 1500 bytes |
| VLAN (IEEE 802.1Q) | Hasta 4094 VLANs; tag de 4 bytes; trunk/access |
| Switch – tabla CAM | Aprende MACs; unicast, flooding, broadcast |
| Store-and-Forward | Almacena y verifica FCS; filtra errores |
| Cut-Through | Reenvía leyendo solo MAC destino; menor latencia |
| STP (IEEE 802.1D) | Evita bucles; Root Bridge; puertos blocking |
| RSTP (IEEE 802.1w) | STP rápido; converge en milisegundos |
| Switch L3 | Enrutamiento inter-VLAN sin router externo |
| Router | Capa 3; separa dominios broadcast; tabla enrutamiento |
| 100BASE-TX | Fast Ethernet; 100 Mbps; UTP Cat5; IEEE 802.3u |
| 1000BASE-T | Gigabit Ethernet; 1 Gbps; UTP Cat5e; IEEE 802.3ab |
