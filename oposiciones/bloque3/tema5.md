# Arquitectura Java EE/Jakarta EE y plataforma .NET
## Componentes, persistencia y seguridad. Características, lenguajes y desarrollo de interfaces

---

# 1. Esquema general del tema

- Arquitectura Java EE / Jakarta EE
  - Servidor de aplicaciones
  - APIs principales
  - Persistencia (JDBC, ORM, JPA)
  - Seguridad

- Plataforma .NET
  - Componentes
  - Persistencia
  - Seguridad

- Comparativa Java EE vs .NET

- Desarrollo de interfaces
  - Tecnologías front-end
  - Comunicación cliente-servidor

---

# 2. Arquitectura Java EE / Jakarta EE

## 2.1. Definición

Plataforma de desarrollo para aplicaciones empresariales en Java.

- Java EE (Oracle)
- Jakarta EE (Eclipse Foundation)

Permite crear aplicaciones:
- Web
- Distribuidas
- Escalables

Se ejecuta sobre un servidor de aplicaciones.

Ejemplos:
- WildFly
- GlassFish
- WebLogic

---

## 2.2. Servidor de aplicaciones

Software que proporciona servicios a aplicaciones empresariales:

Funciones:
- Ejecución de aplicaciones web
- Gestión de transacciones
- Seguridad
- Gestión de conexiones a base de datos
- Gestión de sesiones

Idea clave:
El servidor implementa las APIs de Jakarta EE.

---

## 2.3. APIs principales

### Servlet

Gestiona peticiones HTTP.

- Métodos: GET, POST, PUT, DELETE
- Base del desarrollo web en Java

Flujo:
Cliente → Servlet → Respuesta

---

### JSP (JavaServer Pages)

- Páginas HTML con código Java incrustado
- Generación dinámica de contenido

Uso actual:
Limitado, sustituido por frameworks modernos.

---

### EJB (Enterprise JavaBeans)

Componentes de lógica de negocio.

Características:
- Gestión automática de transacciones
- Seguridad
- Concurrencia

Uso actual:
Menor en aplicaciones modernas.

---

### JSF (JavaServer Faces)

Framework de interfaces web basado en componentes.

---

### JPA (Java Persistence API)

API estándar para persistencia.

Permite:
- Mapear objetos a tablas
- Consultas orientadas a objetos

---

### JTA (Java Transaction API)

Gestión de transacciones distribuidas.

Propiedades ACID:
- Atomicidad
- Consistencia
- Aislamiento
- Durabilidad

---

## 2.4. Persistencia

### JDBC

Acceso directo a base de datos mediante SQL.

Patrón asociado:
DAO (Data Access Object)

Ventajas:
- Control total

Desventajas:
- Mucho código manual

---

### ORM (Object Relational Mapping)

Mapeo objeto-relacional:
- Tablas → Clases
- Registros → Objetos

Tecnologías:
- JPA (estándar)
- Hibernate (implementación)

Lenguaje:
JPQL (Java Persistence Query Language)

---

## 2.5. Documentación

- JavaDoc: documentación del código Java
- Swagger / OpenAPI: documentación de APIs REST

---

## 2.6. Seguridad

Tipos de seguridad:

### Seguridad declarativa
- Configuración mediante ficheros o anotaciones
- Basada en roles

### Seguridad programática
- Implementada mediante código

---

### Spring Security

Framework para seguridad en aplicaciones Java:

Funciones:
- Autenticación
- Autorización
- Control de accesos
- Protección CSRF

---

# 3. Plataforma .NET

## 3.1. Definición

Plataforma de Microsoft para desarrollo de aplicaciones.

Permite crear:
- Aplicaciones web
- Aplicaciones de escritorio
- Servicios

Actualmente:
.NET moderno es multiplataforma.

---

## 3.2. Componentes

- CLR (Common Language Runtime)
- Framework de clases base
- ASP.NET para aplicaciones web

---

## 3.3. Lenguajes

- C# (principal)
- VB.NET
- F#

---

## 3.4. Persistencia

### ADO.NET

Acceso directo a bases de datos.

### Entity Framework

ORM de .NET equivalente a JPA/Hibernate.

---

## 3.5. Seguridad

Características:
- Integrada en el framework
- Basada en roles

Métodos de autenticación:
- Windows Authentication
- JWT
- OAuth

---

# 4. Comparativa Java EE vs .NET

| Característica | Java EE / Jakarta EE | .NET |
|----------------|---------------------|------|
| Propietario | Eclipse Foundation | Microsoft |
| Lenguaje | Java | C# |
| Servidor | WildFly, GlassFish | IIS, Kestrel |
| ORM | JPA / Hibernate | Entity Framework |
| Multiplataforma | Sí | Sí |
| Seguridad | Spring Security | Integrada |

Conclusión:
Ambos son frameworks empresariales equivalentes.

---

# 5. Características comunes

- Arquitectura en capas:
  - Presentación
  - Negocio
  - Persistencia

- Aplicaciones distribuidas
- Escalabilidad
- Seguridad integrada
- Uso de servicios web

---

# 6. Desarrollo de interfaces

## 6.1. Front-end

Tecnologías principales:
- HTML
- CSS
- JavaScript

Frameworks:
- Angular
- React
- Vue

---

## 6.2. Back-end

Java:
- Jakarta EE
- Spring

.NET:
- ASP.NET

---

## 6.3. Comunicación cliente-servidor

Protocolos:
- HTTP / HTTPS

Formatos:
- JSON
- XML

Arquitecturas:
- REST
- SOAP

---

## 6.4. Tipos de aplicaciones

- Aplicaciones web tradicionales
- SPA (Single Page Applications)
- Aplicaciones móviles con API backend

---

# 7. Conceptos importantes de examen

- Servlet: gestión de peticiones HTTP
- JSP: páginas dinámicas (uso limitado hoy)
- JPA: estándar de persistencia
- Hibernate: implementación de ORM
- Entity Framework: ORM de .NET
- Spring Security: seguridad en Java

---

# 8. Miniresumen final

Java EE/Jakarta EE y .NET son plataformas de desarrollo empresarial.

Java EE usa:
- Servlets, JSP, EJB, JPA

.NET usa:
- ASP.NET, C#, Entity Framework

Ambos:
- Arquitectura multicapa
- Seguridad integrada
- Persistencia mediante ORM o acceso directo
- Desarrollo de aplicaciones web y servicios