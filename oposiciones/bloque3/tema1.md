# Bloque 3 · Tema 1
# Modelado de datos, metodologías y reglas. Entidades, atributos y relaciones. Diseño de bases de datos. Diseño lógico y físico. El modelo lógico relacional. Normalización.

---

# 1. Esquema introductorio (visión rápida)

**Modelado de datos**

→ Representación conceptual de la información de un sistema.

**Elementos básicos**

- Entidades
- Atributos
- Relaciones

**Diseño de bases de datos**

1. Diseño conceptual
2. Diseño lógico
3. Diseño físico

**Modelo relacional**

- Tablas (relaciones)
- Filas (tuplas)
- Columnas (atributos)
- Claves primarias
- Claves foráneas

**Normalización**

Proceso para:

- eliminar redundancias
- evitar anomalías
- mejorar la integrid

Formas normales principales:

- 1FN
- 2FN
- 3FN
- BCNF

---

# 2. Modelado de datos

## 2.1 Qué es el modelado de datos

El **modelado de datos** es el proceso mediante el cual se analiza y representa la información que debe gestionar un sistema de información.

Permite definir:

- qué datos existen
- cómo se relacionan
- qué reglas deben cumplir

Se utiliza principalmente en el **diseño de bases de datos**.

### Objetivos del modelado

- Representar la realidad del negocio.
- Facilitar el diseño de bases de datos.
- Reducir redundancias.
- Garantizar integridad de datos.
- Facilitar mantenimiento y evolución del sistema.

---

## 2.2 Niveles de modelado

El modelado se divide normalmente en **tres niveles**.

| Nivel | Objetivo | Características |
|-----|-----|-----|
| Conceptual | Representar la realidad del negocio | Independiente del SGBD |
| Lógico | Adaptar el modelo al tipo de base de datos | Define tablas y relaciones |
| Físico | Implementación real | Optimización de almacenamiento |

---

### Miniresumen

El modelado de datos:

- describe la información del sistema
- se divide en **conceptual, lógico y físico**
- es la base del **diseño de bases de datos**

---

# 3. Entidades, atributos y relaciones

El **modelo Entidad-Relación (E-R)** es uno de los modelos más utilizados para el diseño conceptual de bases de datos.

Sus elementos fundamentales son:

- entidades
- atributos
- relaciones

---

# 3.1 Entidades

Una **entidad** es cualquier objeto del mundo real sobre el que se desea almacenar información.

Ejemplos:

- Cliente
- Producto
- Pedido
- Empleado

Las entidades suelen representarse con **rectángulos en diagramas E-R**.

---

### Tipos de entidades

**Entidad fuerte**

- tiene clave propia
- existe por sí misma

Ejemplo:
