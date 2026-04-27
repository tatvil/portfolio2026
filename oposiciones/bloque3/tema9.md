# Bloque 3 · Tema 9
# Repositorios: estructura y actualización. Generación de código y documentación. Metodologías de desarrollo. Pruebas. Programas para control de versiones. Plataformas de desarrollo colaborativo de software.

---

# 1. Esquema introductorio (visión rápida)

**Control de versiones**
→ Sistema que registra los cambios en el código a lo largo del tiempo.

**Tipos de repositorios**
- Locales, centralizados (SVN), distribuidos (Git)

**Metodologías de desarrollo**
- Tradicionales: cascada, espiral
- Ágiles: Scrum, Kanban, XP

**Pruebas de software**
- Unitarias, integración, sistema, aceptación
- Caja blanca vs. caja negra

**Plataformas colaborativas**
- GitHub, GitLab, Bitbucket

---

# 2. Repositorios: concepto y estructura

## 2.1 Qué es un repositorio

Un **repositorio** (*repository* o *repo*) es un almacén centralizado o distribuido donde se guarda el código fuente y el historial de todos los cambios realizados sobre él.

Contiene:
- El **árbol de trabajo** (*working tree*): los archivos actuales.
- El **historial de commits**: cada instantánea del proyecto.
- Las **ramas** (*branches*): líneas de desarrollo paralelas.
- Las **etiquetas** (*tags*): marcas en commits concretos (versiones).
- Los **metadatos** del sistema de control de versiones.

## 2.2 Tipos de repositorios

### Repositorio local
- Existe solo en el equipo del desarrollador.
- Sin colaboración directa.

### Repositorio centralizado (VCS centralizado)
- Un único servidor central almacena el historial.
- Los desarrolladores hacen *checkout* del servidor.
- Ejemplos: **SVN (Subversion)**, CVS.
- Desventaja: punto único de fallo; sin acceso hay sin historial.

### Repositorio distribuido (DVCS)
- Cada desarrollador tiene una copia completa del repositorio (historial incluido).
- Se puede trabajar sin conexión.
- Ejemplos: **Git**, Mercurial.
- Ventaja: redundancia, velocidad, flujos de trabajo flexibles.

## 2.3 Estructura de un repositorio Git

```
proyecto/
├── .git/                  ← Directorio oculto con todos los metadatos de Git
│   ├── HEAD               ← Apunta a la rama actual
│   ├── config             ← Configuración del repositorio
│   ├── objects/           ← Objetos (blobs, trees, commits, tags)
│   ├── refs/
│   │   ├── heads/         ← Ramas locales
│   │   └── tags/          ← Etiquetas
│   └── index              ← Área de staging (índice)
├── src/
├── tests/
└── README.md
```

## 2.4 Objetos internos de Git

| Objeto | Descripción |
|--------|-------------|
| **blob** | Contenido de un archivo |
| **tree** | Directorio (lista de blobs y otros trees) |
| **commit** | Instantánea + autor + mensaje + referencia al commit padre |
| **tag** | Referencia con nombre a un commit concreto |

Todos los objetos se identifican por su **hash SHA-1** (40 caracteres hexadecimales).

---

# 3. Control de versiones con Git

## 3.1 Áreas de trabajo en Git

```
Working Directory → Staging Area (index) → Repositorio local → Repositorio remoto
      (editar)           (git add)            (git commit)          (git push)
```

| Área | Descripción |
|------|-------------|
| **Working directory** | Archivos que ves y editas |
| **Staging area** | Archivos preparados para el próximo commit |
| **Repositorio local** | Historial de commits almacenado en `.git/` |
| **Repositorio remoto** | Copia en servidor (GitHub, GitLab…) |

## 3.2 Comandos principales de Git

```bash
# Configuración inicial
git config --global user.name  "Nombre"
git config --global user.email "email@ejemplo.com"

# Iniciar repositorio
git init                    # nuevo repo local
git clone URL               # clonar repo remoto

# Ciclo básico
git status                  # ver estado de los archivos
git add archivo.py          # añadir al staging
git add .                   # añadir todo
git commit -m "mensaje"     # crear commit
git log --oneline --graph   # ver historial

# Ramas
git branch                  # listar ramas
git branch nueva-rama       # crear rama
git checkout nueva-rama     # cambiar a rama
git checkout -b nueva-rama  # crear y cambiar
git merge otra-rama         # fusionar rama
git branch -d rama          # eliminar rama

# Repositorio remoto
git remote add origin URL   # vincular remoto
git push origin main        # subir cambios
git pull origin main        # bajar cambios
git fetch origin            # descargar sin fusionar

# Etiquetas
git tag v1.0.0              # etiqueta ligera
git tag -a v1.0.0 -m "msg" # etiqueta anotada
git push origin --tags      # subir etiquetas

# Deshacer
git revert HASH             # crear commit que deshace otro
git reset --soft HEAD~1     # deshacer commit, mantener staging
git reset --hard HEAD~1     # deshacer commit y cambios (¡destructivo!)
git stash                   # guardar cambios sin commit
git stash pop               # recuperar stash
```

## 3.3 Flujos de trabajo (workflows) con Git

### Gitflow
Workflow estructurado con ramas fijas:
- `main` – código en producción.
- `develop` – integración de features.
- `feature/*` – nuevas funcionalidades.
- `release/*` – preparación de versión.
- `hotfix/*` – correcciones urgentes en producción.

### GitHub Flow / Trunk-Based
- Solo `main` + ramas de feature.
- Pull Request → revisión → merge a main.
- Más sencillo, orientado a despliegue continuo.

### Resolución de conflictos
Ocurre cuando dos ramas modifican las mismas líneas. Git marca el conflicto y el desarrollador debe resolverlo manualmente:
```
<<<<<<< HEAD
  código de la rama actual
=======
  código de la rama a fusionar
>>>>>>> otra-rama
```

---

# 4. Generación de código y documentación

## 4.1 Generación de código

### Herramientas de generación
| Herramienta | Descripción |
|-------------|-------------|
| **Scaffolding** | Genera estructura básica del proyecto (Rails, Angular CLI, Spring Initializr) |
| **ORM / generadores de mapeo** | Genera clases desde el esquema de BD (Hibernate, Entity Framework) |
| **Generadores de API** | Genera código desde especificación OpenAPI/Swagger |
| **Compiladores / transpiladores** | TypeScript → JavaScript, SASS → CSS |
| **Plantillas (templates)** | Freemarker, Thymeleaf, Mustache |

### Integración Continua (CI) y Entrega Continua (CD)
- **CI (Continuous Integration):** los cambios se integran y construyen automáticamente con cada push.
- **CD (Continuous Delivery):** el software puede desplegarse en cualquier momento.
- **CD (Continuous Deployment):** cada cambio validado se despliega automáticamente.

Herramientas: **Jenkins**, **GitHub Actions**, **GitLab CI/CD**, Travis CI.

## 4.2 Documentación del código

### Javadoc (Java)
```java
/**
 * Calcula el área de un círculo.
 *
 * @param radio El radio del círculo (debe ser positivo).
 * @return El área calculada.
 * @throws IllegalArgumentException si el radio es negativo.
 */
public double calcularArea(double radio) {
    if (radio < 0) throw new IllegalArgumentException("Radio negativo");
    return Math.PI * radio * radio;
}
```

### Docstrings (Python)
```python
def calcular_area(radio: float) -> float:
    """
    Calcula el área de un círculo.

    Args:
        radio: El radio del círculo (debe ser positivo).
    Returns:
        El área calculada.
    Raises:
        ValueError: Si el radio es negativo.
    """
```

### Herramientas de documentación
| Herramienta | Lenguaje |
|-------------|---------|
| **Javadoc** | Java |
| **Sphinx / pdoc** | Python |
| **JSDoc** | JavaScript |
| **Doxygen** | C, C++, y otros |
| **Swagger / OpenAPI** | APIs REST |
| **ReadTheDocs** | Publicación online |

---

# 5. Metodologías de desarrollo de software

## 5.1 Metodologías tradicionales (predictivas)

### Cascada (Waterfall)
Fases secuenciales, sin retroceso entre ellas:
1. Requisitos → 2. Diseño → 3. Implementación → 4. Pruebas → 5. Despliegue → 6. Mantenimiento

**Ventajas:** simple, bien documentado, adecuado para proyectos estables.  
**Inconvenientes:** inflexible ante cambios de requisitos; los errores se descubren tarde.

### Modelo en V
Extiende la cascada asociando cada fase de desarrollo con una fase de pruebas:
- Diseño de sistema ↔ Pruebas de sistema
- Diseño de componentes ↔ Pruebas de integración
- Codificación ↔ Pruebas unitarias

### Modelo en Espiral (Boehm)
Combina iteración con análisis de riesgos en cada ciclo.
Cada espiral: Planificación → Análisis de riesgos → Ingeniería → Evaluación.

### RUP (Rational Unified Process)
- Iterativo e incremental.
- 4 fases: Inicio, Elaboración, Construcción, Transición.
- Usa artefactos UML.

## 5.2 Metodologías ágiles

El **Manifiesto Ágil (2001)** establece 4 valores:
- Individuos e interacciones > procesos y herramientas.
- Software funcionando > documentación exhaustiva.
- Colaboración con el cliente > negociación de contratos.
- Respuesta al cambio > seguir un plan.

### Scrum

| Elemento | Descripción |
|----------|-------------|
| **Sprint** | Iteración de 1-4 semanas con entregable funcional |
| **Product Backlog** | Lista priorizada de funcionalidades |
| **Sprint Backlog** | Tareas del sprint actual |
| **Daily Scrum** | Reunión diaria de 15 min (¿qué hice? ¿qué haré? ¿impedimentos?) |
| **Sprint Review** | Demostración del producto al cliente al final del sprint |
| **Sprint Retrospective** | Mejora del proceso del equipo |
| **Product Owner** | Representa al cliente, prioriza el backlog |
| **Scrum Master** | Facilita el proceso, elimina impedimentos |
| **Development Team** | Equipo autogestionado que desarrolla el producto |

### Kanban
- Visualización del trabajo en un tablero con columnas (Pendiente / En progreso / Hecho).
- Límite de trabajo en curso (WIP limits).
- Flujo continuo sin sprints fijos.

### XP (Extreme Programming)
Prácticas técnicas intensas: **TDD** (Test-Driven Development), **pair programming**, integración continua, refactoring, releases frecuentes.

### Comparativa

| | Cascada | Scrum | Kanban |
|-|---------|-------|--------|
| Plan | Fijo | Iterativo (sprints) | Continuo |
| Cambios | Difíciles | Cada sprint | En cualquier momento |
| Documentación | Extensa | Mínima necesaria | Mínima |
| Adecuado para | Requisitos claros y estables | Proyectos medianos/grandes con cambios | Mantenimiento, flujo continuo |

---

# 6. Pruebas de software

## 6.1 Objetivos de las pruebas

- Detectar defectos (*bugs*).
- Verificar que el software cumple los requisitos.
- Validar que el software satisface las necesidades del usuario.
- Aumentar la confianza en la calidad del producto.

> **Verificación:** ¿estamos construyendo el sistema correctamente?  
> **Validación:** ¿estamos construyendo el sistema correcto?

## 6.2 Niveles de prueba

### Pruebas unitarias (Unit Testing)
- Prueban la **unidad mínima de código** (función, método, clase) de forma aislada.
- Se usan mocks/stubs para sustituir dependencias externas.
- Herramientas: **JUnit** (Java), **pytest** (Python), **Jest** (JavaScript).

### Pruebas de integración
- Verifican que varios módulos o componentes funcionan correctamente **juntos**.
- Detectan problemas de interfaz entre módulos.

### Pruebas de sistema
- Prueban el sistema completo como un todo.
- Verifican el comportamiento frente a los requisitos funcionales y no funcionales.

### Pruebas de aceptación (UAT)
- Realizadas por el usuario final o cliente.
- Confirman que el sistema cumple los requisitos del negocio.
- Criterio de **DoD** (Definition of Done).

## 6.3 Técnicas de prueba

### Caja negra (Black-box)
- No se conoce (o no importa) la implementación interna.
- Se prueba la **funcionalidad**: entradas → salidas esperadas.
- Técnicas: particiones de equivalencia, valores límite, tablas de decisión.

### Caja blanca (White-box / Glass-box)
- Se conoce y analiza el código fuente interno.
- Se persigue cubrir el máximo de rutas del código.
- Métricas: **cobertura de líneas**, **cobertura de ramas**, **cobertura de caminos**.
- Técnicas: recorrido de código, análisis de flujo de control.

### Caja gris (Grey-box)
- Combinación de las dos anteriores.

## 6.4 Tipos de pruebas por objetivo

| Tipo | Qué verifica |
|------|-------------|
| **Pruebas de regresión** | Que los cambios nuevos no rompen funcionalidad existente |
| **Pruebas de rendimiento / carga** | Comportamiento bajo condiciones de estrés |
| **Pruebas de seguridad (Pen Testing)** | Vulnerabilidades explotables |
| **Pruebas de usabilidad** | Facilidad de uso para el usuario |
| **Pruebas de accesibilidad** | Cumplimiento de estándares WCAG |
| **Smoke testing** | Verificación rápida de las funciones básicas |
| **Pruebas de humo / regresión automatizadas** | CI/CD pipeline |

## 6.5 TDD – Test Driven Development

Ciclo **Red → Green → Refactor**:
1. **Red:** escribir un test que falle (la funcionalidad no existe aún).
2. **Green:** escribir el código mínimo para que el test pase.
3. **Refactor:** mejorar el código sin romper los tests.

**Ventajas:** código más simple, mejor diseño, alta cobertura de tests, documentación viva.

---

# 7. Plataformas de desarrollo colaborativo

## 7.1 GitHub

- Mayor plataforma de alojamiento de código Git basada en la web.
- **Pull Request (PR):** propuesta de cambios para revisión antes de mergear.
- **Issues:** gestión de tareas, bugs y mejoras.
- **GitHub Actions:** CI/CD integrado.
- **GitHub Pages:** alojamiento de sitios estáticos.
- **GitHub Copilot:** asistente de código basado en IA.
- Propiedad de Microsoft (desde 2018).

## 7.2 GitLab

- Alternativa a GitHub, disponible también como instalación **on-premise**.
- Incluye CI/CD integrado muy completo.
- **GitLab CI/CD Pipelines** con fichero `.gitlab-ci.yml`.
- Gestión de proyectos, wikis, registros de contenedores Docker.
- Muy usado en la Administración Pública y entornos corporativos.

## 7.3 Bitbucket

- Propiedad de **Atlassian** (misma empresa que Jira y Confluence).
- Integración nativa con Jira para gestión de proyectos.
- Compatible con Git y Mercurial (Mercurial fue descontinuado en 2020).
- Muy usado en entornos empresariales con ecosistema Atlassian.

## 7.4 Otras herramientas

| Herramienta | Tipo | Descripción |
|-------------|------|-------------|
| **Jira** | Gestión de proyectos | Seguimiento de tareas, sprints, backlog |
| **Confluence** | Documentación | Wiki corporativa |
| **SonarQube** | Calidad de código | Análisis estático, detección de code smells |
| **Jenkins** | CI/CD | Servidor de automatización open-source |
| **Docker Hub** | Registro de contenedores | Imágenes Docker públicas y privadas |
| **Nexus / Artifactory** | Repositorios de artefactos | Maven, npm, Docker |

## 7.5 Funcionalidades colaborativas clave

| Función | Descripción |
|---------|-------------|
| **Fork** | Copia independiente de un repositorio en tu cuenta |
| **Pull Request / Merge Request** | Solicitud para integrar cambios tras revisión |
| **Code review** | Revisión del código por otro desarrollador antes de mergear |
| **Branch protection** | Impide push directo a ramas protegidas (ej. main) |
| **Webhooks** | Notificaciones automáticas a servicios externos en cada evento |
| **Wiki** | Documentación del proyecto integrada en la plataforma |

---

# 8. Resumen: conceptos clave para el examen

| Concepto | Dato clave |
|----------|-----------|
| DVCS | Sistema de control de versiones distribuido; cada clon tiene el historial completo |
| Git | DVCS más usado; crea repositorios con `.git/` |
| Commit | Instantánea del proyecto identificada por hash SHA-1 |
| Branch | Línea de desarrollo paralela; `main` es la rama principal |
| Merge | Fusión de dos ramas |
| Gitflow | Rama main + develop + feature/* + release/* + hotfix/* |
| CI/CD | Integración y entrega/despliegue continuo (Jenkins, GitHub Actions…) |
| Cascada | Fases secuenciales, sin retroceso |
| Scrum | Sprints, Product Owner, Scrum Master, Daily, Review, Retrospective |
| Kanban | Tablero visual, límites WIP, flujo continuo |
| TDD | Test → Código → Refactor (Red → Green → Refactor) |
| Prueba unitaria | Prueba la unidad mínima de forma aislada |
| Prueba de integración | Prueba varios módulos juntos |
| Prueba de aceptación (UAT) | La realiza el usuario final |
| Caja negra | Prueba funcionalidad sin ver el código |
| Caja blanca | Prueba conociendo la implementación interna |
| Pull Request | Propuesta de cambios para revisión antes de mergear |
| GitHub / GitLab / Bitbucket | Principales plataformas de desarrollo colaborativo |
| SonarQube | Análisis estático de calidad del código |
