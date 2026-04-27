# Bloque 3 · Tema 2
# Lenguajes de programación. Representación de tipos de datos. Operadores. Instrucciones condicionales. Bucles y recursividad. Procedimientos, funciones y parámetros. Vectores y registros. Estructura de un programa.

---

# 1. Esquema introductorio (visión rápida)

**Lenguajes de programación**
→ Herramientas formales para expresar algoritmos que una máquina puede ejecutar.

**Clasificación principal**
- Por nivel de abstracción: bajo, medio, alto nivel
- Por paradigma: imperativo, orientado a objetos, funcional, lógico
- Por ejecución: compilados, interpretados, mixtos (bytecode)

**Elementos básicos de un programa**
- Tipos de datos
- Operadores
- Variables y constantes
- Instrucciones de control (condicionales y bucles)
- Subprogramas (procedimientos y funciones)
- Estructuras de datos (vectores, registros)

---

# 2. Lenguajes de programación

## 2.1 Concepto

Un **lenguaje de programación** es un lenguaje formal que especifica un conjunto de instrucciones para que un ordenador realice determinadas tareas.

Consta de:
- **Sintaxis:** reglas que definen cómo escribir las instrucciones (forma).
- **Semántica:** significado de cada instrucción (lo que hace).
- **Pragmática:** uso práctico del lenguaje.

## 2.2 Clasificación por nivel de abstracción

| Nivel | Descripción | Ejemplos |
|-------|-------------|---------|
| **Bajo nivel** | Cercano al hardware, directamente comprensible por la máquina | Lenguaje máquina, ensamblador |
| **Medio nivel** | Combina control de bajo nivel con abstracciones | C |
| **Alto nivel** | Alejado del hardware, cercano al lenguaje humano | Python, Java, C++, Pascal |

### Lenguaje máquina
- Instrucciones en binario (0 y 1).
- Dependiente del procesador.
- Difícil de programar y mantener.

### Ensamblador (Assembler)
- Usa **nemónicos** (MOV, ADD, JMP…) en lugar de binario.
- Requiere un **ensamblador** para traducir al lenguaje máquina.
- Sigue siendo dependiente del hardware.

### Lenguajes de alto nivel
- Independientes del hardware.
- Requieren **compiladores** o **intérpretes** para ejecutarse.
- Mayor productividad y mantenibilidad.

## 2.3 Clasificación por paradigma

| Paradigma | Descripción | Ejemplos |
|-----------|-------------|---------|
| **Imperativo / procedural** | Secuencia de instrucciones que modifican el estado | C, Pascal, COBOL |
| **Orientado a objetos (POO)** | Modela la realidad con objetos que tienen estado y comportamiento | Java, C++, Python |
| **Funcional** | Basado en funciones matemáticas, sin estado mutable | Haskell, Lisp, Erlang |
| **Lógico / declarativo** | Se declara qué se quiere, no cómo obtenerlo | Prolog, SQL |
| **Orientado a eventos** | El flujo lo dirigen eventos (clics, mensajes…) | JavaScript, Visual Basic |
| **Multiparadigma** | Combina varios paradigmas | Python, Scala, Kotlin |

## 2.4 Clasificación por mecanismo de ejecución

| Tipo | Proceso | Ventajas | Ejemplos |
|------|---------|----------|---------|
| **Compilado** | El compilador traduce todo el código fuente a código máquina antes de ejecutar | Velocidad de ejecución | C, C++, Go |
| **Interpretado** | Un intérprete lee y ejecuta línea a línea en tiempo real | Portabilidad, desarrollo rápido | Python, Ruby, JavaScript |
| **Bytecode / VM** | Se compila a un código intermedio ejecutado por una máquina virtual | Portabilidad + rendimiento | Java (JVM), C# (.NET CLR) |

### Compilador vs. Intérprete

| | Compilador | Intérprete |
|--|-----------|-----------|
| Traducción | Todo antes de ejecutar | Línea a línea en ejecución |
| Velocidad ejecución | Mayor (código nativo) | Menor |
| Detección de errores | Antes de ejecutar | Durante ejecución |
| Portabilidad | Menor (binario específico) | Mayor |

### Fases del compilador
1. **Análisis léxico** – divide el código en tokens.
2. **Análisis sintáctico** – verifica la gramática (árbol sintáctico).
3. **Análisis semántico** – verifica el significado (tipos, declaraciones).
4. **Generación de código intermedio**.
5. **Optimización**.
6. **Generación de código final** (lenguaje máquina o bytecode).

---

# 3. Representación de tipos de datos

## 3.1 Qué es un tipo de dato

Un **tipo de dato** define:
- El **conjunto de valores** posibles que puede tomar una variable.
- Las **operaciones** que se pueden realizar sobre ella.
- La **representación interna** en memoria (número de bytes).

## 3.2 Tipos de datos simples (o primitivos)

### Enteros (integer, int)
- Representan números sin parte decimal.
- Se almacenan en complemento a dos (para negativos).

| Tipo | Tamaño típico | Rango |
|------|--------------|-------|
| `byte` / `char` | 1 byte (8 bits) | −128 a 127 (con signo) / 0 a 255 (sin signo) |
| `short` | 2 bytes | −32.768 a 32.767 |
| `int` | 4 bytes | −2.147.483.648 a 2.147.483.647 |
| `long` | 8 bytes | ±9,2 × 10¹⁸ |

### Reales / Coma flotante (float, double)
- Representan números con parte decimal.
- Estándar **IEEE 754**.

| Tipo | Tamaño | Precisión |
|------|--------|-----------|
| `float` | 4 bytes | ~7 dígitos decimales |
| `double` | 8 bytes | ~15 dígitos decimales |

- Se almacenan como: `signo | exponente | mantisa`.

### Caracteres (char)
- Representan un único carácter.
- Codificaciones: **ASCII** (7/8 bits, 128/256 caracteres), **Unicode / UTF-8** (hasta 4 bytes, >1 millón de caracteres).

### Booleano (boolean, bool)
- Solo dos valores: **verdadero** (`true`) / **falso** (`false`).
- Ocupa 1 byte en la mayoría de implementaciones.
- Fundamental en expresiones lógicas y control de flujo.

### Enumerados (enum)
- Tipo que define un conjunto finito de valores con nombre.
```
enum DiaSemana { LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO }
```

## 3.3 Tipos de datos compuestos (o estructurados)

- **Vectores / Arrays:** colección de elementos del mismo tipo, acceso por índice.
- **Registros / Structs:** colección de campos de distintos tipos bajo un mismo nombre.
- **Cadenas (String):** secuencia de caracteres.
- **Listas, pilas, colas:** estructuras de datos dinámicas.
- **Clases / Objetos:** en POO, agrupan datos y comportamiento.

## 3.4 Variables y constantes

| Concepto | Descripción |
|----------|-------------|
| **Variable** | Posición en memoria con un nombre simbólico cuyo valor puede cambiar durante la ejecución |
| **Constante** | Igual que una variable pero su valor no puede modificarse tras la inicialización |

**Declaración típica:**
```
int edad = 25;          // variable
const double PI = 3.14159;  // constante
```

**Ámbito (scope):**
- **Local:** visible solo dentro del bloque donde se declara.
- **Global:** visible en todo el programa.
- **Estática:** conserva su valor entre llamadas a la función.

**Conversión de tipos (casting):**
- **Implícita (widening):** automática, sin pérdida de información (int → long → double).
- **Explícita (narrowing):** manual, posible pérdida de información (double → int).

---

# 4. Operadores

## 4.1 Tipos de operadores

### Aritméticos
| Operador | Operación | Ejemplo |
|----------|-----------|---------|
| `+` | Suma | `a + b` |
| `-` | Resta | `a - b` |
| `*` | Multiplicación | `a * b` |
| `/` | División | `a / b` |
| `%` | Módulo (resto) | `a % b` |
| `**` / `^` | Potencia | `a ** 2` |

> En división entera (int/int), el resultado es entero: `7 / 2 = 3`.

### Relacionales (comparación)
Devuelven un valor booleano.

| Operador | Significado |
|----------|-------------|
| `==` | Igual a |
| `!=` | Distinto de |
| `<` | Menor que |
| `>` | Mayor que |
| `<=` | Menor o igual |
| `>=` | Mayor o igual |

### Lógicos
| Operador | Significado | Descripción |
|----------|-------------|-------------|
| `&&` / `AND` | Y lógico | Verdadero si ambos son verdaderos |
| `\|\|` / `OR` | O lógico | Verdadero si al menos uno es verdadero |
| `!` / `NOT` | Negación | Invierte el valor booleano |

**Cortocircuito:** en `A && B`, si A es falso, B no se evalúa. En `A || B`, si A es verdadero, B no se evalúa.

### De asignación
| Operador | Equivale a |
|----------|-----------|
| `=` | Asignación simple |
| `+=` | `a = a + b` |
| `-=` | `a = a - b` |
| `*=` | `a = a * b` |
| `/=` | `a = a / b` |
| `%=` | `a = a % b` |

### De bits (bitwise)
Operan sobre los bits individuales del número.

| Operador | Descripción |
|----------|-------------|
| `&` | AND bit a bit |
| `\|` | OR bit a bit |
| `^` | XOR bit a bit |
| `~` | Complemento a uno (NOT) |
| `<<` | Desplazamiento izquierda (×2 por bit) |
| `>>` | Desplazamiento derecha (÷2 por bit) |

### Otros
- **Operador ternario:** `condicion ? valor_si_true : valor_si_false`
- **Operador de dirección (`&`)** y **desreferenciación (`*`)** en C/C++.
- **`instanceof`** en Java para comprobar el tipo de un objeto.

## 4.2 Precedencia de operadores

De mayor a menor prioridad (simplificado):

1. `()` – Paréntesis
2. `!`, `~`, `++`, `--` – Unarios
3. `*`, `/`, `%` – Multiplicativos
4. `+`, `-` – Aditivos
5. `<<`, `>>` – Desplazamiento
6. `<`, `<=`, `>`, `>=` – Relacionales
7. `==`, `!=` – Igualdad
8. `&`, `^`, `|` – Bitwise
9. `&&`, `||` – Lógicos
10. `?:` – Ternario
11. `=`, `+=`, `-=`… – Asignación

> Ante la duda, usar **paréntesis** para forzar el orden deseado.

---

# 5. Instrucciones condicionales

Las instrucciones condicionales permiten **tomar decisiones** en función del valor de una condición booleana.

## 5.1 If – Else if – Else

```
if (condicion1) {
    // bloque A: se ejecuta si condicion1 es verdadera
} else if (condicion2) {
    // bloque B: se ejecuta si condicion1 es falsa y condicion2 es verdadera
} else {
    // bloque C: se ejecuta si ninguna condicion es verdadera
}
```

- Solo se ejecuta **un bloque**.
- El `else` es opcional.
- Se pueden encadenar tantos `else if` como haga falta.

## 5.2 Switch – Case

Útil cuando se compara la misma variable contra múltiples valores constantes.

```
switch (variable) {
    case valor1:
        // instrucciones
        break;
    case valor2:
        // instrucciones
        break;
    default:
        // si no coincide ningún caso
}
```

- **`break`** es esencial para evitar el **fall-through** (ejecución de casos siguientes).
- **`default`** es el equivalente al `else`.
- En Java/C, solo funciona con tipos enteros, char o String (Java 7+).

## 5.3 Operador ternario

Versión compacta del `if-else` para asignaciones simples:

```
int max = (a > b) ? a : b;
```

## 5.4 Condicionales en pseudocódigo (examen)

```
SI condicion ENTONCES
    instrucciones
SINO SI condicion2 ENTONCES
    instrucciones
SINO
    instrucciones
FIN_SI
```

---

# 6. Bucles y recursividad

Los **bucles** (o estructuras de repetición) permiten ejecutar un bloque de código **varias veces**.

## 6.1 Bucle while (mientras)

Se ejecuta mientras la condición sea verdadera. La condición se comprueba **antes** de cada iteración.

```
while (condicion) {
    // cuerpo del bucle
}
```

- Si la condición es falsa desde el inicio, el cuerpo **no se ejecuta nunca**.
- Riesgo de **bucle infinito** si la condición nunca se hace falsa.

**Pseudocódigo:**
```
MIENTRAS condicion HACER
    instrucciones
FIN_MIENTRAS
```

## 6.2 Bucle do-while (hacer…mientras)

El cuerpo se ejecuta **al menos una vez**; la condición se comprueba **al final**.

```
do {
    // cuerpo del bucle
} while (condicion);
```

**Pseudocódigo:**
```
HACER
    instrucciones
MIENTRAS condicion
```

## 6.3 Bucle for (para)

Ideal cuando se conoce el **número de iteraciones** de antemano.

```
for (inicializacion; condicion; actualizacion) {
    // cuerpo del bucle
}

// Ejemplo
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

Partes:
- **Inicialización:** se ejecuta una vez al inicio.
- **Condición:** se evalúa antes de cada iteración; si es falsa, termina el bucle.
- **Actualización:** se ejecuta al final de cada iteración.

**Pseudocódigo:**
```
PARA i DESDE 1 HASTA 10 HACER
    instrucciones
FIN_PARA
```

## 6.4 For-each (para cada)

Recorre automáticamente todos los elementos de una colección.

```
for (Tipo elemento : coleccion) {
    // usar elemento
}
```

## 6.5 Control de bucles

| Instrucción | Efecto |
|-------------|--------|
| `break` | Sale inmediatamente del bucle |
| `continue` | Salta a la siguiente iteración (omite el resto del cuerpo) |
| `return` | Sale de la función (también termina el bucle) |

## 6.6 Recursividad

Una función es **recursiva** cuando **se llama a sí misma** para resolver un problema.

### Estructura de una función recursiva
```
funcion factorial(n):
    SI n == 0 ENTONCES        // Caso base (condicion de parada)
        DEVOLVER 1
    SINO
        DEVOLVER n * factorial(n - 1)  // Llamada recursiva
    FIN_SI
```

### Elementos clave
| Elemento | Descripción |
|----------|-------------|
| **Caso base** | Condición que detiene la recursión (sin él → bucle infinito → desbordamiento de pila) |
| **Llamada recursiva** | La función se invoca a sí misma con un subproblema más pequeño |
| **Convergencia** | Cada llamada debe acercarse al caso base |

### Cómo funciona internamente
Cada llamada recursiva añade un **marco de activación** a la **pila de llamadas** (*call stack*). Si hay demasiadas llamadas anidadas se produce un **StackOverflowError**.

### Recursividad vs. Iteración

| | Recursividad | Iteración (bucle) |
|--|-------------|-------------------|
| Legibilidad | Mayor (en problemas divisibles) | Mayor (en secuencias simples) |
| Coste de memoria | Mayor (pila de llamadas) | Menor |
| Riesgo | Stack overflow | Bucle infinito |
| Idóneo para | Árboles, grafos, divide y vencerás | Bucles simples, arrays |

### Tipos de recursividad
- **Directa:** la función se llama a sí misma.
- **Indirecta (mutua):** A llama a B, y B llama a A.
- **De cola (tail recursion):** la llamada recursiva es la **última operación** (los compiladores pueden optimizarla a iteración).

### Ejemplos clásicos
- Factorial: `n! = n * (n-1)!`
- Fibonacci: `fib(n) = fib(n-1) + fib(n-2)`
- Torres de Hanói
- Búsqueda binaria
- Recorrido de árboles

---

# 7. Procedimientos, funciones y parámetros

## 7.1 Concepto de subprograma

Un **subprograma** (subrutina) es un bloque de código con nombre que realiza una tarea concreta y puede ser llamado desde distintos puntos del programa.

**Ventajas:**
- Reutilización de código.
- Modularidad y mantenibilidad.
- Abstracción (ocultar detalles de implementación).
- Facilita las pruebas.

## 7.2 Procedimiento vs. Función

| | Procedimiento | Función |
|-|--------------|---------|
| Devuelve valor | No (o `void`) | Sí |
| Se usa en | Instrucción independiente | Expresión o asignación |
| Ejemplo (pseudocódigo) | `PROCEDIMIENTO imprimirSaludo()` | `FUNCION calcularArea(r): real` |

> En Java y C, la distinción se hace mediante el tipo de retorno: `void` para procedimientos, cualquier tipo para funciones.

## 7.3 Parámetros y argumentos

| Término | Definición |
|---------|-----------|
| **Parámetro formal** | Variable declarada en la firma de la función |
| **Argumento (parámetro real)** | Valor concreto que se pasa al llamar la función |

```java
// Parámetros formales: radio, pi
double calcularCircunferencia(double radio, double pi) {
    return 2 * pi * radio;
}

// Argumentos: 5.0, 3.14159
double c = calcularCircunferencia(5.0, 3.14159);
```

## 7.4 Paso de parámetros

### Por valor (by value)
- Se copia el valor del argumento en la variable del parámetro.
- Cambios dentro de la función **no afectan** a la variable original.
- Java usa este mecanismo para tipos primitivos.

```
funcion incrementar(x):
    x = x + 1   // modifica la copia local, no el original
```

### Por referencia (by reference)
- Se pasa la **dirección de memoria** de la variable.
- Cambios dentro de la función **sí afectan** al original.
- Usado en C/C++ con punteros (`&`), Ç en Java para objetos (referencia al objeto).

```c
void incrementar(int *x) {
    (*x)++;    // modifica el valor en la dirección recibida
}
```

### Por nombre (by name)
- El argumento se evalúa cada vez que se usa dentro de la función (lazy evaluation).
- Típico de lenguajes funcionales (Haskell).

### Resumen

| Mecanismo | Modifica el original | Lenguajes |
|-----------|---------------------|----------|
| Por valor | No | Java (primitivos), C (por defecto) |
| Por referencia | Sí | C++ (`&`), C (punteros), C# (`ref`) |
| Por nombre | Depende | Haskell, algunos funcionales |

## 7.5 Tipos de parámetros según su uso

| Tipo | Dirección del flujo de datos |
|------|------------------------------|
| **Entrada (IN)** | Del llamador a la función |
| **Salida (OUT)** | De la función al llamador |
| **Entrada/Salida (IN/OUT)** | Ambas direcciones |

## 7.6 Funciones de orden superior

En lenguajes funcionales o modernos (Python, JavaScript, Java 8+), las funciones son **ciudadanos de primera clase**: pueden pasarse como parámetros, devolverse como resultado y almacenarse en variables.

```python
def aplicar(funcion, valor):
    return funcion(valor)

resultado = aplicar(lambda x: x * 2, 5)  # 10
```

## 7.7 Sobrecarga (overloading)

**Overloading:** definir varias funciones con el **mismo nombre** pero diferente número o tipo de parámetros. El compilador elige cuál usar según los argumentos.

```java
int suma(int a, int b) { return a + b; }
double suma(double a, double b) { return a + b; }
```

---

# 8. Vectores y registros

## 8.1 Vectores (arrays / arreglos)

Un **vector** es una estructura de datos que almacena una colección **ordenada** de elementos del **mismo tipo**, accesibles mediante un **índice**.

### Características
- Tamaño **fijo** (definido en la declaración, en arrays estáticos).
- Acceso **directo** (O(1)): conociendo el índice, se accede al elemento en tiempo constante.
- Los índices suelen empezar en **0** (C, Java, Python) o en **1** (Pascal, algunos pseudocódigos).

### Declaración y acceso
```java
// Declaración
int[] notas = new int[10];   // array de 10 enteros

// Inicialización
int[] primos = {2, 3, 5, 7, 11};

// Acceso por índice
notas[0] = 8;
int primera = primos[0];   // 2
```

### Vectores multidimensionales (matrices)
- **Bidimensional (matriz):** `int[][] matriz = new int[3][4];`
- Acceso: `matriz[fila][columna]`

### Operaciones típicas con vectores
- Recorrido (for, for-each).
- Búsqueda lineal (O(n)) y búsqueda binaria (O(log n), requiere ordenación).
- Ordenación: burbuja, inserción, selección, quicksort, mergesort.
- Inserción y eliminación (en arrays estáticos implica desplazar elementos).

### Pseudocódigo para recorrer un vector
```
PARA i DESDE 0 HASTA longitud(v)-1 HACER
    ESCRIBIR v[i]
FIN_PARA
```

## 8.2 Cadenas de caracteres (String)

- Secuencia de caracteres, internamente un array de `char`.
- En muchos lenguajes son **inmutables** (Java: `String`; Python: `str`).
- Operaciones típicas: longitud, concatenación, subcadena, búsqueda, comparación, conversión a mayúsculas/minúsculas.

## 8.3 Registros (records / structs)

Un **registro** es una estructura de datos que agrupa variables de **distintos tipos** bajo un mismo nombre. Cada variable del registro se llama **campo**.

### Ejemplo en pseudocódigo
```
REGISTRO Empleado
    nombre: cadena
    dni: cadena
    edad: entero
    salario: real
FIN_REGISTRO
```

### Uso
```
Empleado e;
e.nombre = "Ana García";
e.edad = 34;
e.salario = 2500.00;
```

### En lenguajes reales
- **C:** `struct`
- **Pascal:** `record`
- **Java/C++:** `class` (aunque con más funcionalidades: métodos, acceso controlado)

### Arrays de registros
Se pueden combinar: un array donde cada elemento es un registro.
```
Empleado[] plantilla = new Empleado[100];
plantilla[0].nombre = "Ana";
```

## 8.4 Diferencias clave

| | Vector / Array | Registro / Struct |
|--|---------------|-----------------|
| Tipos de elementos | Todos iguales (homogéneo) | Pueden ser distintos (heterogéneo) |
| Acceso | Por índice numérico | Por nombre del campo |
| Tamaño | Fijo (estático) o dinámico (ArrayList) | Fijo (definido por los campos) |
| Uso típico | Colecciones ordenadas del mismo tipo | Representar una entidad con varios atributos |

---

# 9. Estructura de un programa

## 9.1 Estructura general

Un programa bien estructurado se organiza en bloques diferenciados:

```
[1] ZONA DE DECLARACIONES
    - Importaciones / usos de módulos
    - Constantes globales
    - Tipos de datos definidos por el usuario
    - Variables globales

[2] SUBPROGRAMAS (funciones y procedimientos)
    - Cada uno con su cabecera y cuerpo

[3] PROGRAMA PRINCIPAL
    - Punto de entrada
    - Llamadas a subprogramas
    - Secuencia principal de instrucciones
```

## 9.2 Ejemplo en pseudocódigo

```
PROGRAMA CalculadoraSimple

CONSTANTE PI = 3.14159

FUNCION cuadrado(x: real): real
    DEVOLVER x * x
FIN_FUNCION

FUNCION areaCirculo(radio: real): real
    DEVOLVER PI * cuadrado(radio)
FIN_FUNCION

INICIO
    radio ← LEER("Introduce el radio: ")
    area ← areaCirculo(radio)
    ESCRIBIR("Área = ", area)
FIN
```

## 9.3 Estructura en Java (ejemplo)

```java
// 1. Declaración del paquete e importaciones
package com.ejemplo;
import java.util.Scanner;

// 2. Declaración de la clase
public class Calculadora {

    // 3. Constantes y variables de clase
    static final double PI = 3.14159;

    // 4. Métodos (subprogramas)
    static double cuadrado(double x) {
        return x * x;
    }

    static double areaCirculo(double radio) {
        return PI * cuadrado(radio);
    }

    // 5. Método principal (punto de entrada)
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Introduce el radio: ");
        double radio = sc.nextDouble();
        System.out.println("Área = " + areaCirculo(radio));
    }
}
```

## 9.4 Principios de buena estructura

| Principio | Descripción |
|-----------|-------------|
| **Modularidad** | Dividir el problema en módulos independientes |
| **Cohesión** | Cada módulo hace una sola cosa (alta cohesión) |
| **Acoplamiento** | Los módulos deben depender lo menos posible entre sí (bajo acoplamiento) |
| **Legibilidad** | Nombres descriptivos, indentación consistente, comentarios |
| **Reutilización** | Escribir código que pueda usarse en otros contextos |

## 9.5 Programación estructurada

Tres estructuras de control son **suficientes** para expresar cualquier algoritmo (**Teorema de Böhm-Jacopini**):

1. **Secuencia:** instrucciones una tras otra.
2. **Selección:** condicionales (if-else, switch).
3. **Repetición:** bucles (while, for, do-while).

La programación estructurada evita el uso de `GOTO`, que genera código difícil de seguir (*spaghetti code*).

---

# 10. Resumen: conceptos clave para el examen

| Concepto | Dato clave |
|----------|-----------|
| Lenguaje compilado | Todo se traduce antes de ejecutar (C, C++) |
| Lenguaje interpretado | Se traduce línea a línea (Python, JavaScript) |
| Bytecode | Código intermedio para máquina virtual (Java → JVM, C# → CLR) |
| Fases del compilador | Léxico → Sintáctico → Semántico → Generación → Optimización → Código final |
| IEEE 754 | Estándar para representación de números en coma flotante |
| Complemento a dos | Representación de enteros negativos en binario |
| Cortocircuito | `&&` no evalúa el segundo operando si el primero es falso |
| Recursión: caso base | Condición de parada que evita el bucle infinito |
| Stack overflow | Error por exceso de llamadas recursivas (pila llena) |
| Paso por valor | Se copia el dato; cambios no afectan al original |
| Paso por referencia | Se pasa la dirección; cambios sí afectan al original |
| Array | Colección de elementos del mismo tipo, acceso por índice O(1) |
| Registro / Struct | Agrupación de campos de distintos tipos |
| Teorema de Böhm-Jacopini | Secuencia + Selección + Repetición son suficientes |
| Sobrecarga | Mismo nombre de función, distintos parámetros |
