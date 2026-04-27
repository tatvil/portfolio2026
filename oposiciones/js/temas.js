/**
 * js/temas.js
 * Mapa completo del temario TAI – AGE.
 * Cada bloque incluye todos los temas del README.md exactamente.
 */

const TEMARIO = [
  {
    id: 1,
    titulo: "Organización del Estado y Administración electrónica",
    color: "#007acc",
    temas: [
      {
        num: 1,
        titulo: "La Constitución Española de 1978. Derechos y deberes fundamentales. Su garantía y suspensión. La Corona: funciones constitucionales del Rey.",
        archivo: "bloque1/tema1.md"
      },
      {
        num: 2,
        titulo: "Las Cortes Generales: atribuciones del Congreso de los Diputados y del Senado. El Tribunal Constitucional: composición y atribuciones. El Defensor del Pueblo.",
        archivo: "bloque1/tema2.md"
      },
      {
        num: 3,
        titulo: "El Gobierno: composición, nombramiento y cese. Las funciones del Gobierno. Relaciones entre el Gobierno y las Cortes Generales.",
        archivo: "bloque1/tema3.md"
      },
      {
        num: 4,
        titulo: "Estatuto Básico del Empleado Público: derechos y deberes, provisión de puestos, promoción interna, carrera profesional, situaciones administrativas, incompatibilidades y régimen sancionador. Ley 19/2013 de transparencia. Agenda 2030 y ODS.",
        archivo: "bloque1/tema4.md"
      },
      {
        num: 5,
        titulo: "Políticas de igualdad y contra la violencia de género. Igualdad LGTBI. Discapacidad y dependencia.",
        archivo: "bloque1/tema5.md"
      },
      {
        num: 6,
        titulo: "Sociedad de la información. Identidad y firma electrónica. DNIe. Agenda Digital para España.",
        archivo: "bloque1/tema6.md"
      },
      {
        num: 7,
        titulo: "Protección de datos personales: principios, derechos y obligaciones. Derechos digitales.",
        archivo: "bloque1/tema7.md"
      },
      {
        num: 8,
        titulo: "Acceso electrónico a los servicios públicos. Registros, notificaciones, medios electrónicos. ENS y ENI. NTI.",
        archivo: "bloque1/tema8.md"
      },
      {
        num: 9,
        titulo: "Instrumentos de acceso electrónico: sedes electrónicas, canales, identificación y autenticación. Infraestructuras y servicios comunes.",
        archivo: "bloque1/tema9.md"
      }
    ]
  },
  {
    id: 2,
    titulo: "Tecnología básica",
    color: "#c586c0",
    temas: [
      {
        num: 1,
        titulo: "Informática básica. Representación y comunicación de la información: elementos constitutivos de un sistema de información. Características y funciones. Arquitectura de ordenadores. Componentes internos de los equipos microinformáticos.",
        archivo: "bloque2/tema1.md"
      },
      {
        num: 2,
        titulo: "Periféricos: conectividad y administración. Elementos de impresión. Elementos de almacenamiento. Elementos de visualización y digitalización.",
        archivo: "bloque2/tema2.md"
      },
      {
        num: 3,
        titulo: "Tipos abstractos y Estructuras de datos. Organizaciones de ficheros. Algoritmos. Formatos de información y ficheros.",
        archivo: "bloque2/tema3.md"
      },
      {
        num: 4,
        titulo: "Sistemas operativos. Características y elementos constitutivos. Sistemas Windows. Sistemas Unix y Linux. Sistemas operativos para dispositivos móviles.",
        archivo: "bloque2/tema4.md"
      },
      {
        num: 5,
        titulo: "Sistemas de gestión de bases de datos relacionales, orientados a objetos y NoSQL: características y componentes.",
        archivo: "bloque2/tema5.md"
      }
    ]
  },
  {
    id: 3,
    titulo: "Desarrollo de sistemas",
    color: "#d7ba7d",
    temas: [
      {
        num: 1,
        titulo: "Modelado de datos, metodologías y reglas. Entidades, atributos y relaciones. Diseño de bases de datos. Diseño lógico y físico. El modelo lógico relacional. Normalización.",
        archivo: "bloque3/tema1.md"
      },
      {
        num: 2,
        titulo: "Lenguajes de programación. Representación de tipos de datos. Operadores. Instrucciones condicionales. Bucles y recursividad. Procedimientos, funciones y parámetros. Vectores y registros. Estructura de un programa.",
        archivo: "bloque3/tema2.md"
      },
      {
        num: 3,
        titulo: "Lenguajes de interrogación de bases de datos. Estándar ANSI SQL. Procedimientos almacenados. Eventos y disparadores.",
        archivo: "bloque3/tema3.md"
      },
      {
        num: 4,
        titulo: "Diseño y programación orientada a objetos. Elementos y componentes software: objetos, clases, herencia, métodos, sobrecarga. Ventajas e inconvenientes. Patrones de diseño y lenguaje de modelado unificado (UML).",
        archivo: "bloque3/tema4.md"
      },
      {
        num: 5,
        titulo: "Arquitectura Java EE/Jakarta EE y plataforma .NET: componentes, persistencia y seguridad. Características, elementos, lenguajes y funciones en ambos entornos. Desarrollo de interfaces.",
        archivo: "bloque3/tema5.md"
      },
      {
        num: 6,
        titulo: "Arquitectura de sistemas cliente/servidor y multicapas: componentes y operación. Arquitecturas de servicios web y protocolos asociados.",
        archivo: "bloque3/tema6.md"
      },
      {
        num: 7,
        titulo: "Aplicaciones web. Desarrollo web front-end y en servidor, multiplataforma y multidispositivo. Lenguajes: HTML, XML y sus derivaciones. Navegadores y lenguajes de programación web. Lenguajes de script.",
        archivo: "bloque3/tema7.md"
      },
      {
        num: 8,
        titulo: "Accesibilidad, diseño universal y usabilidad. Acceso y usabilidad de las tecnologías, productos y servicios relacionados con la sociedad de la información. Confidencialidad y disponibilidad de la información en puestos de usuario final. Conceptos de seguridad en el desarrollo de los sistemas.",
        archivo: "bloque3/tema8.md"
      },
      {
        num: 9,
        titulo: "Repositorios: estructura y actualización. Generación de código y documentación. Metodologías de desarrollo. Pruebas. Programas para control de versiones. Plataformas de desarrollo colaborativo de software.",
        archivo: "bloque3/tema9.md"
      }
    ]
  },
  {
    id: 4,
    titulo: "Sistemas y comunicaciones",
    color: "#4ec9b0",
    temas: [
      {
        num: 1,
        titulo: "Administración del Sistema operativo y software de base. Actualización, mantenimiento y reparación del sistema operativo.",
        archivo: "bloque4/tema1.md"
      },
      {
        num: 2,
        titulo: "Administración de bases de datos. Sistemas de almacenamiento y su virtualización. Políticas, sistemas y procedimientos de backup y su recuperación. Backup de sistemas físicos y virtuales. Virtualización de sistemas y virtualización de puestos de usuario.",
        archivo: "bloque4/tema2.md"
      },
      {
        num: 3,
        titulo: "Administración de servidores de correo electrónico y sus protocolos. Administración de contenedores y microservicios.",
        archivo: "bloque4/tema3.md"
      },
      {
        num: 4,
        titulo: "Administración de redes de área local. Gestión de usuarios. Gestión de dispositivos. Monitorización y control de tráfico.",
        archivo: "bloque4/tema4.md"
      },
      {
        num: 5,
        titulo: "Conceptos de seguridad de los sistemas de información. Seguridad física. Seguridad lógica. Amenazas y vulnerabilidades. Técnicas criptográficas y protocolos seguros. Mecanismos de firma digital. Infraestructura física de un CPD: acondicionamiento y equipamiento. Sistemas de gestión de incidencias. Control remoto de puestos de usuario.",
        archivo: "bloque4/tema5.md"
      },
      {
        num: 6,
        titulo: "Comunicaciones. Medios de transmisión. Modos de comunicación. Equipos terminales y equipos de interconexión y conmutación. Redes de comunicaciones. Redes de conmutación y redes de difusión. Comunicaciones móviles e inalámbricas.",
        archivo: "bloque4/tema6.md"
      },
      {
        num: 7,
        titulo: "El modelo TCP/IP y el modelo de referencia de interconexión de sistemas abiertos (OSI) de ISO. Protocolos TCP/IP.",
        archivo: "bloque4/tema7.md"
      },
      {
        num: 8,
        titulo: "Internet: arquitectura de red. Origen, evolución y estado actual. Principales servicios. Protocolos HTTP, HTTPS y SSL/TLS.",
        archivo: "bloque4/tema8.md"
      },
      {
        num: 9,
        titulo: "Seguridad y protección en redes de comunicaciones. Seguridad perimetral. Acceso remoto seguro a redes. Redes privadas virtuales (VPN). Seguridad en el puesto del usuario.",
        archivo: "bloque4/tema9.md"
      },
      {
        num: 10,
        titulo: "Redes locales. Tipología. Técnicas de transmisión. Métodos de acceso. Dispositivos de interconexión.",
        archivo: "bloque4/tema10.md"
      }
    ]
  }
];

/**
 * Total de temas en el temario.
 */
const TOTAL_TEMAS = TEMARIO.reduce((acc, b) => acc + b.temas.length, 0);

/**
 * Dado un bloque (1-based) y un num de tema (1-based) devuelve
 * el tema anterior y el siguiente en orden lineal, o null.
 */
function getNavigation(bloqueId, temaNum) {
  const flat = [];
  for (const bloque of TEMARIO) {
    for (const tema of bloque.temas) {
      flat.push({ bloqueId: bloque.id, temaNum: tema.num });
    }
  }
  const idx = flat.findIndex(x => x.bloqueId === bloqueId && x.temaNum === temaNum);
  return {
    prev: idx > 0               ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
    pos:  idx + 1,
    total: flat.length
  };
}
