# Bloque 2 – Tema 5  
## Sistemas de gestión de bases de datos relacionales, orientados a objetos y NoSQL: características y componentes.

---

## Introducción

Un **Sistema de Gestión de Bases de Datos (SGBD)** es el software que permite **crear, gestionar y administrar bases de datos**.  
En el examen TAI se pregunta este tema desde un punto de vista **conceptual y comparativo**, centrándose en **tipos de SGBD, características y componentes**, no en SQL avanzado ni administración práctica.

---

## 1. Sistemas de gestión de bases de datos (SGBD)

### 1.1. Concepto de SGBD

Un **Sistema de Gestión de Bases de Datos (SGBD)** es el conjunto de programas que permiten:
- Definir bases de datos.
- Crear y mantener datos.
- Acceder y modificar información.
- Garantizar integridad, seguridad y concurrencia.

> Clave de examen:  
> **Base de datos ≠ SGBD**.

---

### 1.2. Funciones principales de un SGBD

Funciones básicas:
- Definición de datos.
- Manipulación de datos.
- Control de accesos.
- Gestión de transacciones.
- Copias de seguridad y recuperación.

#### Miniresumen
- El SGBD gestiona los datos.
- Asegura integridad y seguridad.

---

## 2. Componentes de un SGBD

### 2.1. Componentes principales

Un SGBD está formado por:
- **Motor de la base de datos**.
- **Diccionario de datos**.
- **Lenguajes de acceso**.
- **Gestor de almacenamiento**.
- **Gestor de transacciones**.
- **Usuarios y aplicaciones**.

---

### 2.2. Diccionario de datos

El **diccionario de datos** contiene:
- Metadatos.
- Definición de tablas.
- Restricciones.
- Usuarios y permisos.

> Clave TAI:  
> El diccionario de datos **describe los datos**, no los datos en sí.

#### Miniresumen
- El SGBD tiene varios gestores.
- El diccionario almacena metadatos.

---

## 3. SGBD relacionales

### 3.1. Concepto de SGBD relacional

Un **SGBD relacional** organiza la información en:
- **Tablas (relaciones)**.
- Filas (registros).
- Columnas (campos).

Se basa en el **modelo relacional**.

---

### 3.2. Características del modelo relacional

- Uso de tablas.
- Relaciones mediante claves.
- Integridad de los datos.
- Lenguaje estándar: **SQL**.

---

### 3.3. Claves en el modelo relacional

- **Clave primaria**: identifica de forma única un registro.
- **Clave foránea**: referencia a la clave primaria de otra tabla.

> Clave TAI:  
> La clave foránea **no identifica**, referencia.

---

### 3.4. Ejemplos de SGBD relacionales

- Oracle.
- MySQL.
- PostgreSQL.
- SQL Server.

#### Miniresumen
- Relacional = tablas.
- SQL es el lenguaje estándar.

---

## 4. SGBD orientados a objetos

### 4.1. Concepto

Un **SGBD orientado a objetos** almacena la información en forma de **objetos**, similares a los utilizados en programación orientada a objetos.

---

### 4.2. Características

- Uso de objetos.
- Encapsulación.
- Herencia.
- Métodos asociados a los datos.

---

### 4.3. Ventajas e inconvenientes

Ventajas:
- Modelado complejo más natural.
- Integración con lenguajes OO.

Inconvenientes:
- Menor estandarización.
- Menor implantación que los relacionales.

#### Miniresumen
- Basados en objetos.
- Menos usados que los relacionales.

---

## 5. SGBD NoSQL

### 5.1. Concepto de NoSQL

Los **SGBD NoSQL** son sistemas de bases de datos:
- No relacionales.
- Diseñados para grandes volúmenes de datos.
- Orientados a escalabilidad y rendimiento.

---

### 5.2. Características de NoSQL

- No usan tablas relacionales clásicas.
- Escalabilidad horizontal.
- Esquema flexible.
- Alta disponibilidad.

---

### 5.3. Tipos de bases de datos NoSQL

- **Clave-valor**.
- **Documentales**.
- **Columnas**.
- **Grafos**.

---

### 5.4. Ejemplos de SGBD NoSQL

- MongoDB.
- Cassandra.
- Redis.
- Neo4j.

> Clave TAI:  
> NoSQL **no significa “sin SQL”**, sino “no solo SQL”.

#### Miniresumen
- NoSQL = no relacional.
- Pensado para grandes volúmenes.

---

## Miniresumen final del tema

- El SGBD gestiona bases de datos.
- Existen SGBD relacionales, orientados a objetos y NoSQL.
- El modelo relacional usa tablas y claves.
- SQL es el lenguaje estándar relacional.
- NoSQL prioriza escalabilidad y flexibilidad.
