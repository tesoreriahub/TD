// src/pages/Autodiagnostico.tsx
import { Alert, Autocomplete, Box, Button, Container, Tab, Tabs, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';

// Función para generar el archivo Excel y permitir la descarga
const generarExcel = (nombre: string, apellido: string, preguntas: string[], respuestas: string[]) => {
  // Crear una hoja de cálculo con preguntas y respuestas
  const data = preguntas.map((pregunta, index) => ({
    Pregunta: pregunta,
    Respuesta: respuestas[index] || 'Sin responder',
  }));

  // Crear un libro de Excel
  const hoja = XLSX.utils.json_to_sheet(data);

  // Crear el libro con la hoja
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Resultados');

  // Generar archivo Excel y guardarlo
  const nombreArchivo = `${nombre}_${apellido}.xls`;
  XLSX.writeFile(libro, nombreArchivo);
};

const Autodiagnostico: React.FC = () => {
  // Actualización de secciones y preguntas con mensajes de tooltip personalizados
  const sections = [
    {
      title: 'Autenticación',
      description: 'La mayoría de las violaciones de datos reportadas se deben al uso de contraseñas débiles, predeterminadas o robadas. Utilice contraseñas largas, seguras y únicas, adminístrelas en un administrador de contraseñas seguro, habilite la autenticación de dos factores.',
      questions: [
        { text: "¿Utiliza una contraseña segura?", tooltip: "Una contraseña segura debe tener al menos 8 caracteres, incluir letras, números y símbolos." },
        { text: "¿Evita reutilizar sus contraseñas?", tooltip: "Es importante que cada cuenta tenga una contraseña única." },
        { text: "¿Utiliza un administrador de contraseñas seguro?", tooltip: "Un administrador de contraseñas ayuda a gestionar contraseñas únicas y seguras." },
        { text: "¿Evita compartir contraseñas?", tooltip: "Compartir contraseñas puede poner en riesgo la seguridad de su cuenta." },
        { text: "¿Habilita la autenticación de 2 factores?", tooltip: "Habilitar la autenticación de dos factores añade una capa adicional de seguridad." },
        { text: "¿Mantiene seguros los códigos de respaldo?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
      ],
    },
    {
      title: 'Navegación Web',
      description: 'La mayoría de los sitios web en Internet utilizan algún tipo de seguimiento, a menudo para obtener información sobre el comportamiento y las preferencias de sus usuarios. Estos datos pueden ser increíblemente detallados y, por lo tanto, son extremadamente valiosos para las organizaciones, gobiernos y los ladrones de propiedad intelectual. Las violaciones y filtraciones de datos son comunes, y desanonimizar la actividad web de los usuarios suele ser una tarea trivial.',
      questions: [
        { text: "¿Bloquea los anuncios?", tooltip: "Una contraseña segura debe tener al menos 8 caracteres, incluir letras, números y símbolos." },
        { text: "¿Se asegura que el sitio web sea legitimo?", tooltip: "Es importante que cada cuenta tenga una contraseña única." },
        { text: "¿Utiliza un navegador que respeta su privacidad?", tooltip: "Un administrador de contraseñas ayuda a gestionar contraseñas únicas y seguras." },
        { text: "¿Utiliza un motor de búsqueda privado?", tooltip: "Compartir contraseñas puede poner en riesgo la seguridad de su cuenta." },
        { text: "¿Elimina complementos innecesarios del navegador?", tooltip: "Habilitar la autenticación de dos factores añade una capa adicional de seguridad." },
        { text: "¿Mantiene el navegador actualizado?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
        { text: "¿Comprueba HTTPS?", tooltip: ""},
        { text: "¿Utiliza modo incógnito?", tooltip: ""},
        { text: "¿Administra las cookies?", tooltip: ""},
      ],
    },
    {
      title: 'E-mail',
      description: 'Si un pirata informático obtiene acceso a sus correos electrónicos, proporciona una puerta de entrada para que sus otras cuentas se vean comprometidas (mediante el restablecimiento de contraseñas), por lo que la seguridad del correo electrónico es primordial para su seguridad digital.',
      questions: [
        { text: "¿Tiene más de una dirección de correo electrónico?", tooltip: "Una contraseña segura debe tener al menos 8 caracteres, incluir letras, números y símbolos." },
        { text: "¿Mantiene privada la dirección de correo electrónico?", tooltip: "Es importante que cada cuenta tenga una contraseña única." },
        { text: "¿Mantiene su cuenta segura?", tooltip: "Un administrador de contraseñas ayuda a gestionar contraseñas únicas y seguras." },
        { text: "¿Deshabilita la carga automática de contenido remoto?", tooltip: "Compartir contraseñas puede poner en riesgo la seguridad de su cuenta." },
      ],
    },
    {
      title: 'Mensajeria',
      questions: [
        { text: "¿Utiliza únicamente mensajeros totalmente cifrados de extremo a extremo?", tooltip: "Una contraseña segura debe tener al menos 8 caracteres, incluir letras, números y símbolos." },
        { text: "¿Utiliza únicamente plataformas de mensajería de código abierto?", tooltip: "Es importante que cada cuenta tenga una contraseña única." },
        { text: "¿Utiliza una plataforma de mensajería confiable?", tooltip: "Un administrador de contraseñas ayuda a gestionar contraseñas únicas y seguras." },
        { text: "¿Verifica la configuración de seguridad?", tooltip: "Compartir contraseñas puede poner en riesgo la seguridad de su cuenta." },
        { text: "¿Se asegura de que el entorno de sus destinatarios sea seguro?", tooltip: "Habilitar la autenticación de dos factores añade una capa adicional de seguridad." },
        { text: "¿Deshabilita los servicios en la nube?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
        { text: "¿Sus chats grupales son seguros?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
      ],
    },
    {
      title: 'Redes Sociales',
      description: 'Las comunidades en línea existen desde la invención de Internet y brindan a personas de todo el mundo la oportunidad de conectarse, comunicarse y compartir. Aunque estas redes son una excelente manera de promover la interacción social y unir a las personas, eso tiene un lado oscuro: existen algunas preocupaciones serias sobre la privacidad de los servicios de redes sociales, y estos sitios de redes sociales son propiedad de corporaciones privadas y generan ingresos. recopilando datos sobre individuos y vendiéndolos, a menudo a terceros anunciantes. Asegure su cuenta, bloquee su configuración de privacidad, pero sepa que incluso después de hacerlo, todos los datos cargados intencionalmente o no son efectivamente públicos. Si es posible, evite el uso de redes sociales convencionales.',
      questions: [
        { text: "¿Asegura su cuenta?", tooltip: "Una contraseña segura debe tener al menos 8 caracteres, incluir letras, números y símbolos." },
        { text: "¿Verifica la configuración de privacidad?", tooltip: "Es importante que cada cuenta tenga una contraseña única." },
        { text: "¿Piensa en todas las interacciones como públicas?", tooltip: "Un administrador de contraseñas ayuda a gestionar contraseñas únicas y seguras." },
        { text: "¿Piensa en todas las interacciones como permanentes?", tooltip: "Compartir contraseñas puede poner en riesgo la seguridad de su cuenta." },
        { text: "¿Evita revelar demasiado de su vida personal?", tooltip: "Habilitar la autenticación de dos factores añade una capa adicional de seguridad." },
        { text: "¿Tiene cuidado con lo que sube?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
        { text: "¿Comparte su correo electrónico y su número de teléfono?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
        { text: "¿Evita otorgar permisos o conexiones innecesarias?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
        { text: "¿Evita publicar datos geográficos mientras esté fuera?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
      ],
    },
    {
      title: 'Redes',
      description: 'Esta sección cubre cómo conectar sus dispositivos a Internet de forma segura, incluida la configuración de su enrutador y una VPN.',
      questions: [
        { text: "¿Utiliza una VPN?", tooltip: "Una contraseña segura debe tener al menos 8 caracteres, incluir letras, números y símbolos." },
        { text: "¿Cambia la contraseña de su enrutador?", tooltip: "Es importante que cada cuenta tenga una contraseña única." },
        { text: "¿Utiliza WPA2 y una contraseña segura?", tooltip: "Un administrador de contraseñas ayuda a gestionar contraseñas únicas y seguras." },
        { text: "¿Mantiene actualizado el firmware del enrutador?", tooltip: "Compartir contraseñas puede poner en riesgo la seguridad de su cuenta." },
      ],
    },
    {
      title: 'Dispositivos Móviles',
      description: 'Los teléfonos inteligentes han revolucionado muchos aspectos de la vida y han puesto el mundo a nuestro alcance. Para muchos de nosotros, los teléfonos inteligentes son nuestro principal medio de comunicación, entretenimiento y acceso al conocimiento. Pero si bien han llevado la comodidad a un nivel completamente nuevo, suceden algunas cosas indeseadas detrás de la pantalla. El seguimiento geográfico se utiliza para rastrear cada uno de nuestros movimientos y tenemos poco control sobre quién tiene estos datos; su teléfono incluso puede rastrear su ubicación sin GPS. A lo largo de los años, surgieron numerosos informes que describen formas en las que el micrófono de su teléfono puede espiar y la cámara puede observarlo, todo sin su conocimiento o consentimiento. Y luego están las aplicaciones maliciosas, la falta de parches de seguridad y las posibles o probables puertas traseras. El uso de un teléfono inteligente genera una gran cantidad de datos sobre usted, desde información que comparte intencionalmente hasta datos generados silenciosamente a partir de sus acciones. Puede resultar aterrador ver lo que Google, Microsoft, Apple y Facebook saben sobre nosotros; a veces saben más que nuestra familia más cercana. Es difícil comprender qué revelarán sus datos, especialmente en combinación con otros datos. Estos datos se utilizan para mucho más que solo publicidad: más a menudo se utilizan para calificar a las personas en materia de finanzas, seguros y empleo. Los anuncios dirigidos pueden incluso utilizarse para una vigilancia detallada (ver ADINT). A muchos de nosotros nos preocupa cómo los gobiernos recopilan y utilizan los datos de nuestros teléfonos inteligentes y, con razón, las agencias federales a menudo solicitan nuestros datos a Google, Facebook, Apple, Microsoft, Amazon y otras empresas de tecnología. A veces, las solicitudes se realizan de forma masiva y devuelven información detallada sobre todas las personas que se encuentran dentro de una determinada geocerca, a menudo de personas inocentes. Y esto no incluye todo el tráfico de Internet al que las agencias de inteligencia de todo el mundo tienen acceso sin obstáculos.',
      questions: [
        { text: "¿Cifra su dispositivo?", tooltip: "Una contraseña segura debe tener al menos 8 caracteres, incluir letras, números y símbolos." },
        { text: "¿Desactiva las funciones de conectividad que no se estén utilizando?", tooltip: "Es importante que cada cuenta tenga una contraseña única." },
        { text: "¿Mantiene el recuento de aplicaciones al mínimo?", tooltip: "Un administrador de contraseñas ayuda a gestionar contraseñas únicas y seguras." },
        { text: "¿Evita otorgar permisos a las aplicaciones?", tooltip: "Compartir contraseñas puede poner en riesgo la seguridad de su cuenta." },
        { text: "¿Instala aplicaciones unicamente de fuentes oficiales?", tooltip: "Habilitar la autenticación de dos factores añade una capa adicional de seguridad." },
      ],
    },
    {
      title: 'Computadora Personal',
      description: 'Aunque Windows y OS X son fáciles de usar y convenientes, ambos están lejos de ser seguros. Su sistema operativo proporciona la interfaz entre el hardware y sus aplicaciones, por lo que, si se ve comprometido, puede tener efectos perjudiciales',
      questions: [
        { text: "¿Mantiene su sistema actualizado?", tooltip: "Una contraseña segura debe tener al menos 8 caracteres, incluir letras, números y símbolos." },
        { text: "¿Cifra su dispositivo?", tooltip: "Es importante que cada cuenta tenga una contraseña única." },
        { text: "¿Tiene copia de seguridad de los datos importantes?", tooltip: "Un administrador de contraseñas ayuda a gestionar contraseñas únicas y seguras." },
        { text: "¿Activa el bloqueo de pantalla cuando está inactivo?", tooltip: "Compartir contraseñas puede poner en riesgo la seguridad de su cuenta." },
        { text: "¿Deshabilita asistentes como Siri?", tooltip: "Habilitar la autenticación de dos factores añade una capa adicional de seguridad." },
        { text: "¿Revisa sus programas instalados?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
        { text: "¿Administra los permisos?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
        { text: "¿Apaga su computadora en lugar de ponerla en espera?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
        { text: "¿Tiene cuidado al conectar dispositivos tipo USB a su computadora?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
      ],
    },
    {
      title: 'Smart Home',
      description: 'Los asistentes domésticos (como Google Home, Alexa y Siri) y otros dispositivos conectados a Internet recopilan grandes cantidades de datos personales (incluidas muestras de voz, datos de ubicación, detalles del hogar y registros de todas las interacciones). Dado que usted tiene un control limitado sobre lo que se recopila, cómo se almacena y para qué se utilizará, esto hace que sea difícil recomendar cualquier producto de consumo para el hogar inteligente a cualquiera que se preocupe por la privacidad y la seguridad. Seguridad versus Privacidad: Hay muchos dispositivos inteligentes en el mercado que afirman aumentar la seguridad de su hogar y al mismo tiempo ser fáciles y convenientes de usar (como alarmas antirrobo inteligentes, cámaras de seguridad para Internet, cerraduras inteligentes y timbres de acceso remoto, por nombrar algunos). Puede parecer que estos dispositivos facilitan la seguridad, pero existe una contrapartida en términos de privacidad: ya que recopilan grandes cantidades de datos personales y le dejan sin control sobre cómo se almacenan o utilizan. La seguridad de estos dispositivos también es cuestionable, ya que muchos de ellos pueden ser (y están siendo) pirateados, lo que permite a un intruso eludir la detección con el mínimo esfuerzo. La opción que más respeta la privacidad sería no utilizar dispositivos inteligentes conectados a Internet en su hogar y no depender de un dispositivo de seguridad que requiera una conexión a Internet. Pero si lo hace, es importante comprender completamente los riesgos de cualquier producto antes de comprarlo. Luego ajuste la configuración para aumentar la privacidad y la seguridad. Las siguientes preguntas le guiarán a mitigar los riesgos asociados con los dispositivos domésticos conectados a Internet.',
      questions: [
        { text: "¿Cambia el nombre de los dispositivos para no especificar marca/modelo?", tooltip: "Una contraseña segura debe tener al menos 8 caracteres, incluir letras, números y símbolos." },
        { text: "¿Desactiva el micrófono y la cámara cuando no estén en uso?", tooltip: "Es importante que cada cuenta tenga una contraseña única." },
        { text: "¿Comprende qué datos se recopilan, almacenan y transmiten?", tooltip: "Un administrador de contraseñas ayuda a gestionar contraseñas únicas y seguras." },
        { text: "¿Establece configuraciones de privacidad y opta por no compartir datos con terceros?", tooltip: "Compartir contraseñas puede poner en riesgo la seguridad de su cuenta." },
        { text: "¿Evita vincular tus dispositivos domésticos inteligentes a su identidad real?", tooltip: "Habilitar la autenticación de dos factores añade una capa adicional de seguridad." },
        { text: "¿Proteje su red?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
      ],
    },
    {
      title: 'Finanzas Personales',
      description: 'El fraude con tarjetas de crédito es la forma más común de robo de identidad (con 133.015 informes en los EE. UU. solo en 2017) y una pérdida total de 905 millones de dólares, lo que representó un aumento del 26% con respecto al año anterior. La cantidad promedio perdida por persona fue de US429 en 2017. Es más importante que nunca tomar medidas básicas para protegerse de ser víctima. Nota sobre las tarjetas de crédito: Las tarjetas de crédito cuentan con métodos tecnológicos para detectar y detener algunas transacciones fraudulentas. Los principales procesadores de pagos implementan esto extrayendo enormes cantidades de datos de los titulares de sus tarjetas, para saber mucho sobre los hábitos de gasto y consumo de cada persona. Estos datos se utilizan para identificar fraudes, pero también se venden a otros intermediarios de datos. Por lo tanto, las tarjetas de crédito son buenas para la seguridad, pero terribles para la privacidad de los datos',
      questions: [
        { text: "¿Esta registrado para recibir alertas de fraude y monitoreo de crédito?", tooltip: "Una contraseña segura debe tener al menos 8 caracteres, incluir letras, números y símbolos." },
        { text: "¿Aplica un congelamiento de crédito?", tooltip: "Es importante que cada cuenta tenga una contraseña única." },
        { text: "¿Utiliza tarjetas virtuales?", tooltip: "Un administrador de contraseñas ayuda a gestionar contraseñas únicas y seguras." },
        { text: "¿Utiliza efectivo para transacciones locales?", tooltip: "Compartir contraseñas puede poner en riesgo la seguridad de su cuenta." },
        { text: "¿Utiliza una dirección de entrega alternativa?", tooltip: "Habilitar la autenticación de dos factores añade una capa adicional de seguridad." },
      ],
    },
    {
      title: 'Aspecto Humano',
      description: 'Muchas filtraciones, hackeos y ataques de datos son causados ​por errores humanos. Las siguientes preguntas contiene los aspectos básicos para validar el riesgo de que esto le suceda. Muchas de ellas son de sentido común, pero vale la pena tomar nota de ellas',
      questions: [
        { text: "¿Verifica los destinatarios?", tooltip: "Una contraseña segura debe tener al menos 8 caracteres, incluir letras, números y símbolos." },
        { text: "¿Nunca deja sus dispositivos desatendidos?", tooltip: "Es importante que cada cuenta tenga una contraseña única." },
        { text: "¿Esta alerta de la Cam-fectación?", tooltip: "Un administrador de contraseñas ayuda a gestionar contraseñas únicas y seguras." },
        { text: "¿Esta alerta del Shoulder Surfing?", tooltip: "Compartir contraseñas puede poner en riesgo la seguridad de su cuenta." },
        { text: "¿Esta alerta de los ataques de Phising?", tooltip: "Habilitar la autenticación de dos factores añade una capa adicional de seguridad." },
        { text: "¿Esta alerta del Stalkerware?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
        { text: "¿Instala software de fuentes confiables?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
        { text: "¿Almacena sus datos de forma segura?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
        { text: "¿Oculta sus detalles personales de los documentos?", tooltip: "Guarde los códigos de respaldo en un lugar seguro para acceder a sus cuentas en caso de emergencia." },
      ],
    },
  ];
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [answers, setAnswers] = useState(Array(sections.length).fill(null).map((_, i) => Array(sections[i].questions.length).fill('')));
  const [currentSection, setCurrentSection] = useState(-1); // -1 es el estado inicial para pedir nombre y apellido
  const [showResults, setShowResults] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const options = ["Sí", "No"];

  const handleChange = (index: number, value: string | null) => {
    const newAnswers = [...answers];
    newAnswers[currentSection][index] = value || '';
    setAnswers(newAnswers);
  };

  const handleNextSection = () => {
    if (currentSection === -1 && (name === '' || surname === '')) {
      setShowAlert(true);
    } else if (currentSection >= 0 && answers[currentSection].includes('')) {
      setShowAlert(true); // Mostrar alerta si hay preguntas sin responder
    } else {
      setShowAlert(false);
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const calculateResults = () => {
    return sections.map((section, secIndex) => {
      const score = answers[secIndex].reduce((acc, answer) => (answer === "Sí" ? acc + 1 : acc), 0);
      return {
        subject: section.title,
        A: score,
        fullMark: section.questions.length,
      };
    });
  };

 return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      {currentSection === -1 && !showResults ? (
        <Box>
          {/* Introducción antes de pedir el nombre */}
          <Typography variant="h4" align="center" gutterBottom>
            Defensa Digital Personal en Seguridad de la Información (DDPSI)
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Bienvenido(a) a DDPSI
          </Typography>

          <Typography variant="h6" gutterBottom>
            Objetivo
          </Typography>
          <Typography variant="body1" paragraph>
            Esta aplicación web sirve como una herramienta de diagnóstico y autoevaluación personalizada para evaluar aspectos clave sobre la seguridad de la información de un individuo. Al examinar el manejo de aspectos tales como Redes Sociales, Navegación Web, Dispositivos Móviles entre otros, proporciona a los usuarios una representación visual de su seguridad personal, destacando áreas de posible mejora.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Créditos
          </Typography>
          <Typography variant="body2" paragraph>
            Desarrollado por Julián Uribe - julian.uribe@medellin.gov.co
          </Typography>
          <Typography variant="body2" paragraph>
            Supervisado por Jorge Iván Brand Ortíz - Subsecretaria de Tesoreria - Secretaria de Hacienda
          </Typography>

          {/* Sección para pedir el nombre y apellido */}
          <Typography variant="h4" gutterBottom>
            Ingrese su Nombre y Apellido
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
          {showAlert && (
            <Alert severity="warning" onClose={() => setShowAlert(false)}>
              Por favor, ingrese su nombre y apellido para continuar.
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
            <Typography variant="h6">Referencias</Typography>
            <Typography variant="body2" paragraph>
              Desarrollado por Julián Uribe - julian.uribe@medellin.gov.co
            </Typography>
            <Typography variant="body2" paragraph>
            Chaudhary, S. (2024). Driving Behaviour Change with Cybersecurity Awareness. Computers & Security, 103858. https://doi.org/10.1016/j.cose.2024.103858
            </Typography>
            <Typography variant="body2" paragraph>
            Prümmer, J., Van Steen, T., & Van Den Berg, B. (2024). A systematic review of current cybersecurity training methods. Computers & Security, 136, 103585. https://doi.org/10.1016/j.cose.2023.103585
            </Typography>
            <Typography variant="body2" paragraph>
            Baltuttis, D., Teubner, T., & Adam, M. T. (2024). A Typology of Cybersecurity Behavior among Knowledge Workers. Computers & Security, 140, 103741. https://doi.org/10.1016/j.cose.2024.103741
            </Typography>
            <Typography variant="body2" paragraph>
            Lubis, M., Safitra, M. F., Fakhrurroja, H., & Putri, D. P. (2024). Navigating Online Privacy: Insights from Cybersecurity Expert. Procedia Computer Science, 234, 1388–1395. https://doi.org/10.1016/j.procs.2024.03.137
            </Typography>
            <Typography variant="body2" paragraph>
            Ebert, N., Schaltegger, T., Ambuehl, B., Schöni, L., Zimmermann, V., & Knieps, M. (2023). Learning from safety science: A way forward for studying cybersecurity incidents in organizations. Computers & Security, 134, 103435. https://doi.org/10.1016/j.cose.2023.103435
            </Typography>
            <Typography variant="body2" paragraph>
            Rizal, M. A., & Setiawan, B. (2024). Information Security Awareness Literature Review: Focus Area for measurement Instruments. Procedia Computer Science, 234, 1420–1427. https://doi.org/10.1016/j.procs.2024.03.141
            </Typography>
            <Typography variant="body2" paragraph>
            Angafor, G., Yevseyeva, I., & Maglaras, L. (2024). MalAware: A tabletop exercise for malware security awareness education and incident response training. Internet of Things and Cyber-physical Systems. https://doi.org/10.1016/j.iotcps.2024.02.003
            </Typography>
        </Box>
      ) : !showResults ? (
        <Box>
          <Tabs
            value={currentSection}
            onChange={(e, newValue) => setCurrentSection(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Secciones de la encuesta"
          >
            {sections.map((section, index) => (
              <Tab label={section.title} key={index} />
            ))}
          </Tabs>

          <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
            {sections[currentSection].title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {sections[currentSection].description}
          </Typography>

          {/* Contenedor en formato de grid para preguntas y respuestas */}
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            columnGap={3}
            rowGap={2}
          >
            {sections[currentSection].questions.map((question, index) => (
              <React.Fragment key={index}>
                {/* Preguntas en la columna izquierda */}
                <Box>
                  <Tooltip title={question.tooltip} placement="top" arrow>
                    <Typography variant="body1">
                      {index + 1 + currentSection * 3}. {question.text}
                    </Typography>
                  </Tooltip>
                </Box>

                {/* Respuestas en la columna derecha */}
                <Box>
                  <Autocomplete
                    value={answers[currentSection][index]}
                    onChange={(event, newValue) => handleChange(index, newValue)}
                    options={options}
                    renderInput={(params) => <TextField {...params} label="Seleccione una opción" variant="outlined" size="small" />}
                    fullWidth
                  />
                </Box>
              </React.Fragment>
            ))}
          </Box>

          {showAlert && (
            <Alert severity="warning" onClose={() => setShowAlert(false)}>
              Por favor, responda todas las preguntas antes de continuar.
            </Alert>
          )}
          <Box display="flex" justifyContent="space-between" marginTop={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePrevSection}
              disabled={currentSection === 0}
            >
              Anterior
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextSection}
            >
              {currentSection < sections.length - 1 ? "Siguiente" : "Enviar"}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" gutterBottom>
            Resultados del Autodiagnóstico de {name} {surname}
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={calculateResults()}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar name="Puntuación" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>

          {/* Botón para generar el archivo Excel */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => generarExcel(
              name, 
              surname, 
              sections.flatMap(section => section.questions.map(q => q.text)), 
              answers.flatMap(a => a)
            )}
            style={{ marginTop: '20px' }}
          >
            Generar Respuestas en Excel
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Autodiagnostico;

