# Bloque 3. Tema 7.
# Aplicaciones web

## 1. Concepto de aplicación web

Una aplicación web es un software accesible mediante un navegador, que se ejecuta en Internet o en una intranet.

### Características
- No requiere instalación en el equipo del usuario.
- Acceso mediante navegador web.
- Actualización centralizada en el servidor.
- Compatible con múltiples sistemas operativos.
- Arquitectura cliente/servidor.

---

## 2. Desarrollo web front-end

El desarrollo front-end es la parte de la aplicación que se ejecuta en el navegador del usuario.

### Tecnologías principales
- HTML: estructura del contenido.
- CSS: presentación y diseño.
- JavaScript: comportamiento e interactividad.

### Funciones del front-end
- Mostrar información al usuario.
- Gestionar la interacción.
- Validación básica de formularios.
- Adaptación a distintos dispositivos.

---

## 3. Desarrollo web en servidor (back-end)

El back-end es la parte que se ejecuta en el servidor.

### Funciones principales
- Procesamiento de peticiones.
- Gestión de bases de datos.
- Lógica de negocio.
- Generación de respuestas (HTML, JSON, XML).

### Lenguajes habituales
- Java (Jakarta EE)
- C# (.NET)
- PHP
- Python
- JavaScript (Node.js)

---

## 4. Lenguajes de marcado

### 4.1 HTML
HTML (HyperText Markup Language) es el lenguaje estándar para crear páginas web.

### Características
- Define la estructura del contenido.
- Utiliza etiquetas.
- Es interpretado por el navegador.

### Ejemplo
<h1>Título</h1>
<p>Párrafo de ejemplo</p>

---

### 4.2 XML
XML (eXtensible Markup Language) es un lenguaje de marcado para almacenar e intercambiar datos.

### Características
- Estructura jerárquica.
- No define presentación.
- Es extensible.

### Ejemplo
<persona>
  <nombre>Tatiana</nombre>
  <edad>54</edad>
</persona>

---

### 4.3 Derivaciones de XML/HTML
- XHTML: versión estricta de HTML basada en XML.
- SVG: gráficos vectoriales.
- MathML: representación de fórmulas matemáticas.

---

## 5. Navegadores web

Un navegador web es una aplicación que permite acceder e interpretar contenidos web.

### Funciones principales
- Interpretar HTML, CSS y JavaScript.
- Ejecutar scripts del lado del cliente.
- Gestionar solicitudes HTTP/HTTPS.

### Componentes
- Motor de renderizado.
- Motor JavaScript.

---

## 6. Lenguajes de programación web

### 6.1 Lenguajes del lado del cliente
Se ejecutan en el navegador:
- JavaScript
- TypeScript

### 6.2 Lenguajes del lado del servidor
Se ejecutan en el servidor:
- Java
- C#
- PHP
- Python
- JavaScript (Node.js)

---

## 7. Lenguajes de script

Los lenguajes de script son lenguajes interpretados utilizados para automatizar tareas y dar dinamismo a las aplicaciones web.

### Características
- Interpretados.
- Dinámicos.
- Integración directa con la web.

### Ejemplos
- JavaScript
- PHP
- Python
- Bash

---

## 8. Validación de datos en aplicaciones web

### 8.1 ¿Qué son las validaciones?

Las validaciones de datos son comprobaciones que aseguran que los datos introducidos por el usuario son correctos.

### Objetivos
- Evitar errores.
- Mejorar calidad de datos.
- Reducir errores antes del servidor.
- Mejorar experiencia de usuario.

---

### 8.2 Tipos de validación

#### Validación en cliente (front-end)
Se realiza en el navegador.

Características:
- Rápida.
- Mejora experiencia de usuario.
- No es segura por sí sola.

Ejemplos:
- Campos obligatorios.
- Formato de email.
- Longitud de contraseña.

---

#### Validación en servidor (back-end)
Se realiza en el servidor.

Características:
- Obligatoria.
- Más segura.
- Última barrera de control.

Ejemplos:
- Validación de usuarios.
- Comprobación en base de datos.
- Reglas de negocio.

---

### 8.3 Validación de emails

Un email válido debe tener:
- Texto antes de @
- Símbolo @
- Dominio después del @

Ejemplos:
- usuario@gmail.com (válido)
- usuariogmail.com (inválido)
- usuario@ (inválido)

---

### 8.4 Implementación de validaciones

#### HTML5
<input type="email" required>

- Comprueba formato básico.
- Campo obligatorio.

---

#### JavaScript
function validarEmail(email) {
    return email.includes("@");
}

Expresión regular:
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

---

#### Servidor
El servidor siempre valida los datos por seguridad.

---

### 8.5 Reglas típicas de validación
- Campos obligatorios
- Formato de email
- Longitud mínima y máxima
- Solo números
- Contraseñas seguras
- Confirmación de contraseña

---

### 8.6 Idea clave de examen

La validación en cliente mejora la usabilidad, pero la validación en servidor es obligatoria por seguridad.

---

## 9. Resumen final

- Arquitectura cliente/servidor.
- Front-end = navegador.
- Back-end = servidor.
- HTML estructura.
- XML datos.
- Navegador interpreta contenido.
- JavaScript principal lenguaje de scripting.
- Validaciones en cliente y servidor.