import { 
  Alert, 
  Box, 
  Button, 
  Checkbox, 
  Container, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  FormControlLabel, 
  MenuItem, 
  Select, 
  Tab, 
  Tabs, 
  TextField, 
  Tooltip, 
  Typography 
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// Tipos para las preguntas y recomendaciones
type Question = {
  text: string;
  tooltip: string;
};

// Objeto con las preguntas clasificadas por categoría y público
const preguntasPorCategoria = {
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
const obtenerPreguntasPorRol = (categoria: string, rol: string) => {
  const preguntasCategoria = preguntasPorCategoria[categoria as keyof typeof preguntasPorCategoria] || [];
  return preguntasCategoria.filter(pregunta => pregunta.publico.includes(rol));
};

// Función para generar secciones por rol
const getSeccionesPorRol = (rolSeleccionado: string) => {
  const secciones = [];
  
  // Para cada categoría en preguntasPorCategoria
  Object.keys(preguntasPorCategoria).forEach(categoria => {
    const preguntasFiltradas = obtenerPreguntasPorRol(categoria, rolSeleccionado);
    
    if (preguntasFiltradas.length > 0) {
      secciones.push({
        title: categoria,
        description: [
          `Evaluación sobre ${categoria}.`,
          "A continuación, marque las afirmaciones con las que se identifique."
        ],
        questions: preguntasFiltradas
      });
    }
  });
  
  return secciones;
};

// Función para generar el archivo Excel
const generarExcel = (nombre: string, apellido: string, correo: string, preguntas: any[], respuestas: boolean[]) => {
  // Crear una hoja de cálculo con preguntas y respuestas
  const data = preguntas.map((pregunta, index) => ({
    Correo: correo,
    Pregunta: pregunta.text,
    Respuesta: respuestas[index] ? 'Sí' : 'No',
  }));

  // Crear un libro de Excel
  const hoja = XLSX.utils.json_to_sheet(data);

  // Crear el libro con la hoja
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Resultados');

  // Generar archivo Excel y guardarlo
  const nombreArchivo = `${nombre}_${apellido}.xlsx`;
  XLSX.writeFile(libro, nombreArchivo);
};

const Autodiagnostico = () => {
  // Estado para el rol seleccionado
  const [rol, setRol] = useState('');
  
  // Generar las secciones una vez esté seleccionado el rol
  const [sections, setSections] = useState([]);
  
  // Estados para la gestión del formulario
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(''); 
  
  // Estado para respuestas
  const [answers, setAnswers] = useState([]);
  
  const [currentSection, setCurrentSection] = useState(-1); // -1 es para pedir datos personales
  const [showAlert, setShowAlert] = useState(false);
  const [showConsentPopup, setShowConsentPopup] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Actualizar secciones cuando cambia el rol
  useEffect(() => {
    if (rol) {
      const newSections = getSeccionesPorRol(rol);
      setSections(newSections);
      
      // Inicializar respuestas con arrays vacíos
      const initialAnswers = newSections.map(section => 
        Array(section.questions.length).fill(false)
      );
      setAnswers(initialAnswers);
    }
  }, [rol]);
  
  // Validación de correo electrónico
  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  // Verificar si una sección está completa
  const isSectionComplete = (sectionIndex) => {
    return answers[sectionIndex] && answers[sectionIndex].every(answer => answer !== undefined);
  };

  // Manejar cambio en las respuestas
  const handleChange = (sectionIndex, questionIndex, checked) => {
    const newAnswers = [...answers];
    newAnswers[sectionIndex][questionIndex] = checked;
    setAnswers(newAnswers);
  };

  // Navegar a la siguiente sección
  const handleNextSection = () => {
    if (!consentGiven && currentSection === -1) {
      setShowConsentPopup(true);
      return;
    }
    
    if (currentSection === -1) {
      if (name === '' || surname === '' || email === '' || rol === '') {
        setShowAlert(true);
        setEmailError('');
      } else if (!validarCorreo(email)) {
        setEmailError('Por favor ingrese un correo electrónico válido.');
        setShowAlert(false);
      } else {
        setEmailError('');
        setShowAlert(false);
        setCurrentSection(0);
      }
    } else if (currentSection >= 0 && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setCompleted(true);
    }
  };

  // Aceptar consentimiento
  const handleAcceptConsent = () => {
    setConsentGiven(true);
    setShowConsentPopup(false);
    handleNextSection();
  };

  // Navegar a la sección anterior
  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else if (currentSection === 0) {
      setCurrentSection(-1); // Volver a la página de datos personales
    }
  };

  // Manejar selección de sección
  const handleSectionSelect = (event, newValue) => {
    setCurrentSection(newValue);
  };

  // Obtener todas las preguntas para generar el Excel
  const getAllQuestions = () => {
    return sections.flatMap(section => section.questions);
  };

  // Obtener todas las respuestas para generar el Excel
  const getAllAnswers = () => {
    return answers.flat();
  };

  // Volver a iniciar el cuestionario
  const handleReset = () => {
    setCompleted(false);
    setCurrentSection(-1);
    setName('');
    setSurname('');
    setEmail('');
    setRol('');
    setAnswers([]);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      {currentSection === -1 && !completed ? (
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Autodiagnóstico por Rol
          </Typography>
          
          <Typography variant="h6" gutterBottom>
            Ingrese sus datos
          </Typography>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
          />
          <TextField
            label="Apellido"
            fullWidth
            margin="normal"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            size="small"
          />
          <TextField
            label="Correo electrónico"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            error={!!emailError}
            helperText={emailError}
          />

          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Seleccione su rol en la organización
          </Typography>
          <Select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            displayEmpty
            fullWidth
            required
          >
            <MenuItem value="" disabled>
              Seleccione un rol
            </MenuItem>
            <MenuItem value="directivos">Directivo</MenuItem>
            <MenuItem value="lideres">Líder</MenuItem>
            <MenuItem value="profesionales">Profesional</MenuItem>
          </Select>
          
          {showAlert && (
            <Alert severity="warning" onClose={() => setShowAlert(false)}>
              Por favor, complete todos los campos para continuar.
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleNextSection}
            style={{ marginTop: '20px' }}
          >
            Comenzar Encuesta
          </Button>

          <Dialog
            open={showConsentPopup}
            onClose={() => setShowConsentPopup(false)}
            aria-labelledby="habeas-data-dialog-title"
            aria-describedby="habeas-data-dialog-description"
          >
            <DialogTitle id="habeas-data-dialog-title">Consentimiento de Habeas Data</DialogTitle>
            <DialogContent>
              <DialogContentText id="habeas-data-dialog-description">
                Para el ejercicio del Habeas Data, el titular del dato personal o quien demuestre un legítimo interés conforme lo señalado en la normatividad vigente, podrá hacerlo a través del correo electrónico institucional correspondiente.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowConsentPopup(false)} color="secondary">
                Rechazar
              </Button>
              <Button onClick={handleAcceptConsent} color="primary" autoFocus>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : !completed ? (
        <Box>
          <Tabs
            value={currentSection}
            onChange={handleSectionSelect}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Secciones de la encuesta"
          >
            {sections.map((section, index) => (
              <Tab
                label={section.title}
                key={index}
              />
            ))}
          </Tabs>

          <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
            {sections[currentSection].title}
          </Typography>

          {Array.isArray(sections[currentSection].description) ? (
            sections[currentSection].description.map((line, index) => (
              <Typography key={index} variant="body2" gutterBottom>
                {line}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" gutterBottom>
              {sections[currentSection].description}
            </Typography>
          )}

          <Box display="grid" gridTemplateColumns="1fr" gap={2}>
            {sections[currentSection].questions.map((question, index) => (
              <Box key={index}>
                <Tooltip title={question.tooltip || ""} arrow>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={answers[currentSection][index]}
                        onChange={(e) => handleChange(currentSection, index, e.target.checked)}
                      />
                    }
                    label={question.text}
                  />
                </Tooltip>
              </Box>
            ))}
          </Box>
          
          <Box display="flex" justifyContent="space-between" marginTop={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePrevSection}
            >
              Anterior
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextSection}
            >
              {currentSection < sections.length - 1 ? "Siguiente" : "Finalizar"}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" gutterBottom>
            Gracias por completar el autodiagnóstico
          </Typography>
          
          <Box display="flex" justifyContent="center" gap={2} marginTop={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => generarExcel(
                name, 
                surname, 
                email,
                getAllQuestions(), 
                getAllAnswers()
              )}
            >
              Descargar Resultados en Excel
            </Button>
            
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
            >
              Realizar nuevo diagnóstico
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Autodiagnostico;