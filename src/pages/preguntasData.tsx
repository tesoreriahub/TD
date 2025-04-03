// Definición de tipos para nuestros datos
export interface Question {
    text: string;
    tooltip: string;
    publico: string[];
  }
  
  // Definiciones de las secciones con descripciones detalladas
  export const sectionDescriptions: Record<string, string[]> = {
    "Análisis de Datos y Toma de Decisiones": [
      "Este grupo se enfoca en la analítica de datos, incluyendo el uso de herramientas como SQL, NoSQL e inteligencia de negocios. Abarca la gestión, calidad y protección de datos, así como su uso para la toma de decisiones. También incluye la implementación de indicadores y la medición del desempeño organizacional basado en datos.",
      "A continuación, marque las afirmaciones con las que se identifique."
    ],
    "Colaboración Externa y Benchmarking": [
      "Abarca las alianzas estratégicas con otras organizaciones, el desarrollo colaborativo de productos o servicios y la realización de benchmarking para mejorar procesos y servicios digitales, lo cual incluye procesos de vigilancia tecnológica.",
      "A continuación, marque las afirmaciones con las que se identifique."
    ],
    "Competencias Digitales y Gestión de Información": [
      "Este grupo abarca las habilidades fundamentales para operar en el entorno digital, incluyendo la capacidad de identificar y gestionar información veraz, realizar búsquedas efectivas y utilizar herramientas de colaboración virtual. También incluye aspectos de comunicación digital y trabajo en equipo a través de medios virtuales, así como el uso efectivo de herramientas digitales para compartir conocimiento.",
      "A continuación, marque las afirmaciones con las que se identifique."
    ],
    "Estrategia y Modelo de Negocio Digital": [
      "Este grupo evalúa la definición, implementación y socialización de la estrategia digital organizacional, incluyendo el modelo de negocio, la estructura de gobierno y los objetivos digitales. También abarca la alineación de la misión y visión con la estrategia digital y el liderazgo en la transformación digital.",
      "A continuación, marque las afirmaciones con las que se identifique."
    ],
    "Gestión de Relaciones Digitales": [
      "Esta categoría comprende la gestión de relaciones profesionales y con el cliente interno y externo en el entorno digital. Incluye el uso de redes sociales profesionales, la gestión de la marca digital, la comunicación con los clientes, el seguimiento de prospectos y la implementación de estrategias de pauta digital. También abarca la medición del retorno de inversión en actividades de marketing digital y la gestión de la experiencia del cliente.",
      "A continuación, marque las afirmaciones con las que se identifique."
    ],
    "Infraestructura y Seguridad Tecnológica": [
      "Este grupo evalúa la robustez de la infraestructura tecnológica actual, su capacidad para satisfacer necesidades internas y externas, y la implementación de medidas de seguridad digital. También incluye la evaluación de canales digitales y la experiencia del usuario interno y externo.",
      "A continuación, marque las afirmaciones con las que se identifique."
    ],
    "Liderazgo y Cultura Digital": [
      "Esta categoría evalúa cómo los directivos y líderes adaptan sus estilos de gestión al entorno digital, promueven la innovación y el aprendizaje continuo, y fomentan una cultura organizacional abierta a la transformación digital. Incluye aspectos como el desarrollo del talento, la autonomía de los colaboradores y la implementación de programas formativos en habilidades digitales.",
      "A continuación, marque las afirmaciones con las que se identifique."
    ],
    "Metodologías Ágiles y Mejora Continua": [
      "Abarca la implementación de prácticas ágiles en la organización, la gestión de mejoras continuas y la automatización de procesos. Incluye aspectos como la formación de equipos multidisciplinarios y ágiles, la experimentación con nuevos métodos de trabajo y la documentación de mejoras, esto último incluye las lecciones aprendidas.",
      "A continuación, marque las afirmaciones con las que se identifique."
    ],
    "Propiedad Intelectual y Cumplimiento Normativo Digital": [
      "Esta categoría aborda el conocimiento y aplicación de normas de propiedad intelectual en medios digitales y tecnológicos, incluyendo licenciamiento y derechos de autor, así como el cumplimiento de regulaciones digitales.",
      "A continuación, marque las afirmaciones con las que se identifique."
    ],
    "Tecnología e Innovación Digital": [
      "Esta categoría se centra en la implementación y gestión de nuevas tecnologías, incluyendo la planificación, presupuestación y medición del impacto de proyectos tecnológicos. También abarca la innovación digital y la adopción de tecnologías emergentes.",
      "A continuación, marque las afirmaciones con las que se identifique."
    ]
  };
  
  // Objeto con las preguntas clasificadas por categoría y público
  export const preguntasPorCategoria: Record<string, Question[]> = {
    "Análisis de Datos y Toma de Decisiones": [
      { text: "¿Conoce los conceptos básicos de analítica de datos?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Utiliza lenguajes de dominio de datos cómo SQL o NoSQL?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Respalda las decisiones organizacionales, teniendo en cuenta el análisis de datos realizado a través de BI (Business Intelligence)?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Tiene conocimiento en la definición y uso de indicadores?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Apoya la toma de decisiones basándose en indicadores?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿La tecnología implementada por la Secretaria incentiva las soluciones basadas en datos?", tooltip: "", publico: ["profesionales"] },
      { text: "¿La calidad de los datos en la Secretaría cumple con los estándares requeridos?", tooltip: "", publico: ["profesionales"] },
      { text: "¿La recolección, tratamiento y uso de datos en la Secretaría es confiable y está debidamente soportada en sus bases de datos?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Las bases de datos son utilizadas para la toma de decisiones por las distintas áreas de la Secretaria?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Se centralizan e integran todos los datos e información generados por los procesos?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿La recolección, tratamiento y uso de datos se realiza de manera confiable y con soporte en bases de datos?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿Se utilizan bases de datos en las distintas áreas para la toma de decisiones?", tooltip: "", publico: ["lideres", "profesionales"] }
    ],
    "Colaboración Externa y Benchmarking": [
      { text: "¿Actualmente la Secretaria cuenta con alianzas colaborativas con empresas del sector público o privado?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿La Secretaria ha desarrollado alguna idea, producto o servicio en colaboración con otras empresas?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿La Secretaria genera espacios periódicos con empresas u otros actores públicos para identificar nuevas oportunidades de negocio que puedan desarrollarse de forma colaborativa?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Realizan benchmarking (investigación de la competencia) para saber si la Secretaria debe actualizar algún proceso, para que no afecte su experiencia a los usuarios?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Se involucran activamente a los usuarios en el desarrollo de nuevas innovaciones digitales?", tooltip: "", publico: ["directivos", "lideres"] }
    ],
    "Competencias Digitales y Gestión de Información": [
      { text: "¿Cuándo busca información en la web, es capaz de identificar entre información falsa e información real?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Sabe buscar información relevante y real en la web?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Depura la información encontrada en la web de acuerdo a sus necesidades? (El usuario no se queda surfeando, si no que va a búsquedas puntuales)", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Conoce las normas de convivencia de las redes sociales qué frecuenta?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Realiza regularmente copia de seguridad (backup) de su información?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Es capaz de trabajar en equipo a través de los medios digitales y herramientas virtuales?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Genera soluciones en conjunto con sus pares para el cumplimiento de objetivos a través de herramientas virtuales y medios digitales?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Anima y capacita al equipo al uso de herramientas digitales para la comunicación?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Utiliza las diferentes herramientas de mensajería para comunicarse constantemente con su equipo de trabajo?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Utiliza herramientas digitales para adquirir y transmitir conocimiento?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] }
    ],
    "Estrategia y Modelo de Negocio Digital": [
      { text: "¿Cuenta con un modelo de negocio definido para la Secretaria?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Busca desarrollar servicios innovadores, basados en la propuesta de valor que ofrece la Secretaria al distrito?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Se valida el modelo de negocio de la Secretaria, de acuerdo a los resultados obtenidos en un plazo estipulado?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿La Secretaria tiene definida su estrategia organizacional?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Existe una socialización activa y constante de la estrategia organizacional, para conocimiento de todos los colaboradores?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Cuenta con un mapa de procesos en el cual estén definidos y especificados los modelos de negocio que se ejecutan dentro de la Secretaria?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿La estructura de gobierno organizacional es clara, los colaboradores comprenden los roles y responsabilidades a nivel general?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿La misión estratégica de hacienda se encuentra alineada con una estrategia digital?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿La visión estratégica de hacienda se encuentra alineada con una estratégica digital?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿En la Secretaria de hacienda se han incorporado objetivos digitales?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿La Secretaria de hacienda dispone de una estrategia de comunicación para informar y divulgar los avances del despliegue digital?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿La Secretaria de hacienda tiene indicadores KPI relacionados con la digitalización?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿Hay inversiones en tecnologías digitales alineadas con la estrategia y las actividades de innovación de la Secretaria de hacienda?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Existe un equipo de trabajo para liderar y direccionar la transformación digital?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿El personal directivo en posición de liderazgo (Secretario, subsecretarios, jefes y lideres) tienen claridad del objetivo de la transformación digital?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿El personal directivo en posición de liderazgo (Secretario, subsecretarios, jefes y lideres) conocen las ventajas y desventajas de la transformación digital?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Existe un plan de transformación digital en la Secretaria de hacienda que indique la dirección, los proyectos, la priorización y recursos?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "Luego de realizar entregas de generación de valor, ¿se hace seguimiento de los resultados para aprender de los aspectos a mejorar?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿El esquema organizacional existente es efectivo para llevar adelante un proceso de transformación digital?", tooltip: "", publico: ["directivos", "lideres"] }
    ],
    "Gestión de Relaciones Digitales": [
      { text: "¿Conoce la diferencia entre una red profesional y una red personal?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Interactúa constantemente en redes profesionales para compartir conocimiento y aprender de los demás usuarios?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Utiliza dispositivos digitales y las diferentes redes sociales para conocer las necesidades de sus clientes?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Utiliza diferentes dispositivos digitales y redes sociales para estar en contacto con sus clientes?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Genera visibilidad de su perfil profesional en las diferentes redes sociales?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Está al tanto de las tendencias de la marca digital?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Mantiene una comunicación constante con sus usuarios?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿La Secretaria interactúa con sus usuarios para la definición y construcción de servicios, con el fin de entregar soluciones integrales?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿La Secretaria tiene en cuenta la retroalimentación de sus usuarios en la exploración y experimentación de nuevas ideas de servicios?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿Tiene una buena relación con sus usuarios, contribuyendo a mantener fidelidad a largo plazo?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Se actualiza mensualmente la base de datos suministrada por sus canales digitales (redes sociales, correo electrónico, sitio web, intranet) para mantener la información de sus usuarios actualizada?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿La Secretaria invierte en pauta digital para posicionar la marca del distrito o incrementar recaudo o ingresos?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿La Secretaria cuenta con KPIs (medidores de rendimiento) definidos para la correcta implementación de pauta digital?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿Se cuenta con indicadores para medir el retorno de inversión (ROI) de la pauta digital que implementa la Secretaria?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Se dispone de canales digitales de atención al cliente?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Existen desarrollos en medios digitales como página web, canales y perfiles de redes sociales, videocast; para los servicios y atención a los usuarios?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Se realizan eventos pedagógicos orientados a consolidar una experiencia digital?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Entregan a sus usuarios, de forma continua, servicios que generen valor?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Qué tan preparados están sus usuarios (ciudadanía y otros) para apropiar y aceptar los cambios de la entidad frente a su transformación digital?", tooltip: "", publico: ["directivos", "lideres"] }
    ],
    "Infraestructura y Seguridad Tecnológica": [
      { text: "¿Están las bases de datos protegidas por tecnologías y procesos en materia de seguridad y privacidad de la información?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿Publica contenido de información real dentro de las redes sociales qué frecuenta?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Sabe crear contraseñas con alto nivel de seguridad para sus redes sociales y sitios personales?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Conoce los protocolos de seguridad qué se necesitan para proteger sus datos cuando se interactúa en sitios web y redes sociales?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Las tecnologías actuales son lo suficientemente robustas para suplir las necesidades de los usuarios al interior de la Secretaria?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿Las tecnologías actuales son lo suficientemente robustas para suplir las necesidades en la interacción con la ciudadanía?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿Conoce las tecnologías más relevantes que se tienen implementadas en los procesos indispensables para el funcionamiento de la Secretaria?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Conoce las tecnologías de cuarta revolución industrial para potenciar la eficiencia y eficacia de los principales procesos y para mejorar la interacción con la ciudadanía?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Existen al interior brechas entre las tecnologías actuales de la Secretaria y las tecnologías de cuarta revolución industrial, para suplir las necesidades de los procesos indispensables?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿Se identifican los tiempos, riesgos y costos requeridos para la implementación y adaptación de las tecnologías de la cuarta revolución industrial en los procesos indispensables de la Secretaria?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿Se implementan buenas prácticas en materia de seguridad digital?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] }
    ],
    "Liderazgo y Cultura Digital": [
      { text: "¿Los líderes están abiertos a escuchar nuevas ideas e iniciativas de sus colaboradores?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Los líderes transmiten constantemente su conocimiento y experiencia, a través de espacios de aprendizaje?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Los líderes comunican al equipo la estrategia y las metas organizacionales, de forma clara y oportuna?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Los líderes promueven el empoderamiento y liderazgo de los colaboradores, teniendo en cuenta las habilidades y conocimientos de cada persona del equipo?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Los líderes interactúan constantemente con los colaboradores, con el fin de conocer sus motivaciones, para generar estrategias de desarrollo profesional y personal?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Los líderes promueven la experimentación de nuevas formas de trabajar y nuevos métodos para crear productos y/o negocios?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Los líderes tienen la capacidad para comprender el entorno digital e incorporarlo en el desarrollo de los proyectos de la Secretaria?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Los líderes impulsan la generación de valor en el desarrollo de los productos y servicios de la Secretaria?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Los líderes están abiertos a las sugerencias de mejora de sus colaboradores?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Los colaboradores se identifican con la cultura organizacional de la Secretaria?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Los colaboradores están en constante aprendizaje de las herramientas digitales para facilitar sus tareas?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Existe una medición de clima organizacional y satisfacción del colaborador en la Secretaria?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Existen planes de desarrollo individual que contemplen el aprendizaje continuo de los colaboradores?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Los colaboradores de la Secretaria tienen la libertad y autonomía para tomar decisiones de acuerdo a sus roles y responsabilidades?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Se tiene información completa del perfil de sus colaboradores (sociodemográfico, familiar, intereses, entre otros) y se alimenta constantemente para diseñar actividades alrededor de esta?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Los salarios de los colaboradores son competitivos frente a los salarios del mercado?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Los colaboradores de la Secretaria de hacienda muestran apertura a los cambios digitales y tecnológicos, así como a la incorporación de nuevas formas de trabajo mediadas por TIC?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "Los colaboradores de la Secretaria de hacienda conocen sobre tecnologías: Analítica de datos, Big data, IoT, Impresión 3D, IA, RA, RV, Ciberseguridad, Cloud Computing, RPA, Machine learning, BPM, Inteligencia de negocios, Blockchain", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Se disponen de programas formativos para empleados y contratistas para el desarrollo de habilidades digitales necesarias para la transformación digital?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Existen iniciativas para mejorar la comunicación interna, el trabajo en red y el acceso a conocimiento, además de compartir ideas con sus superiores?", tooltip: "", publico: ["profesionales"] },
      { text: "¿Qué tan preparada está la cultura dentro de la Secretaria para desarrollar iniciativas de transformación digital?", tooltip: "", publico: ["directivos", "lideres"] }
    ],
    "Metodologías Ágiles y Mejora Continua": [
      { text: "¿Actualmente existen equipos multidisciplinarios que ejecuten prácticas ágiles para la construcción de servicios para la generación de valor de manera oportuna?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "Para la construcción de los servicios, ¿se le brinda a los equipos de trabajo espacios de análisis e investigación, partiendo de una necesidad inicial?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Realiza pruebas antes de lanzar algún servicio al mercado, donde se recopila información valiosa para tener clara la funcionalidad del servicio?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿Las personas trabajan de forma colaborativa para gestionar dependencias durante la construcción de servicios?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "Cuando se presenta una oportunidad de mejora dentro de la Secretaria, ¿se busca implementarla lo más pronto posible?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "Cuando se presenta una oportunidad de mejora dentro de la Secretaria, ¿se asigna el tiempo y espacio suficiente para la ejecución del proceso?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Define e implementa acciones de mejora con la intención de potenciar los servicios de la Secretaria?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "Cuando se da un cambio en un proceso, ¿se comunica el motivo del cambio, el resultado esperado y la estrategia a seguir, a todos los involucrados?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "Durante la ejecución de un proceso, ¿se crean espacios para visibilizar los resultados, permitiendo el diálogo y la participación de todos los involucrados?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿La Secretaria cuenta con personas que impulsan nuevas acciones de mejora para la organización y el crecimiento de sus colaboradores?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿Cuentan con herramientas que permiten la oportuna documentación de acciones de mejora dentro de la Secretaria?", tooltip: "", publico: ["directivos", "lideres"] },
      { text: "¿La organización promueve la automatización de procesos y actividades que facilitan la entrega oportuna de servicios?", tooltip: "", publico: ["lideres", "profesionales"] }
    ],
    "Propiedad Intelectual y Cumplimiento Normativo Digital": [
      { text: "¿Se dispone de políticas de protección de datos, información sensible y de negocio?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿Tiene conocimiento y aplica los conceptos de la norma de propiedad intelectual en medios digitales?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
      { text: "¿Conoce el proceso para licenciar propiedad intelectual en medios digitales?", tooltip: "", publico: ["lideres", "profesionales"] },
      { text: "¿Conoce y cumple con la normativa de derechos de autor?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] }
    ],
    
"Tecnología e Innovación Digital": [
    { text: "¿Tiene un plan de trabajo y/o estudio para integrar una nueva tecnología en la Secretaria?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
    { text: "¿Tiene destinado un presupuesto para financiar los proyectos tecnológicos que se vayan a ejecutar en la Secretaria?", tooltip: "", publico: ["lideres", "profesionales"] },
    { text: "¿Cuenta con herramientas de medición que le ayuden a identificar la forma en que sus proyectos tecnológicos le están generando valor a sus usuarios?", tooltip: "", publico: ["lideres", "profesionales"] },
    { text: "¿Cuenta con un plan de trabajo definido donde se contemplen los proyectos tecnológicos que la Secretaria piensa ejecutar?", tooltip: "", publico: ["lideres", "profesionales"] },
    { text: "¿Tiene definidos espacios en los cuales sus colaboradores puedan construir nuevas ideas partiendo de las necesidades que los usuarios están demandando?", tooltip: "", publico: ["lideres", "profesionales"] },
    { text: "¿Se están implementando nuevos procesos para fomentar la innovación digital?", tooltip: "", publico: ["lideres", "profesionales"] },
    { text: "¿La secretaria de hacienda utiliza tecnologías como redes sociales, webinars o videoconferencias y videocasts como parte de su estrategia innovadora?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
    { text: "¿Se utilizan herramientas digitales como Office 365-Teams o redes sociales corporativas para el trabajo en grupo y en red?", tooltip: "", publico: ["directivos", "lideres", "profesionales"] },
    { text: "¿Se dispone de un modelo o marco de referencia para diagnosticar el estado de sus tecnologías?", tooltip: "", publico: ["lideres", "profesionales"] },
    { text: "¿Se realiza un análisis periódico del contexto para conocer, explorar y testear nuevas tecnologías emergentes como Blockchain, RV, RA, IoT entre otros?", tooltip: "", publico: ["lideres", "profesionales"] },
    { text: "¿Se personaliza la comunicación digital con los usuarios basándose en su comportamiento y datos?", tooltip: "", publico: ["lideres", "profesionales"] }
  ]
};

// Función para obtener preguntas por categoría y rol
export const obtenerPreguntasPorRol = (categoria: string, rol: string): Question[] => {
  const preguntasCategoria = preguntasPorCategoria[categoria] || [];
  return preguntasCategoria.filter(pregunta => pregunta.publico.includes(rol));
};

// Función para generar secciones por rol
export interface Section {
  title: string;
  description: string[];
  questions: Question[];
}

export const getSeccionesPorRol = (rolSeleccionado: string): Section[] => {
  const secciones: Section[] = [];
  
  // Para cada categoría en preguntasPorCategoria
  Object.keys(preguntasPorCategoria).forEach(categoria => {
    const preguntasFiltradas = obtenerPreguntasPorRol(categoria, rolSeleccionado);
    
    if (preguntasFiltradas.length > 0) {
      secciones.push({
        title: categoria,
        description: sectionDescriptions[categoria] || [
          `Evaluación sobre ${categoria}.`,
          "A continuación, marque las afirmaciones con las que se identifique."
        ],
        questions: preguntasFiltradas
      });
    }
  });
  
  return secciones;
};