import { Alert, Autocomplete, Box, Button, Container, Tab, Tabs, TextField, Tooltip, Typography } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef, useState } from 'react';
import { Bar, BarChart, CartesianGrid, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import * as XLSX from 'xlsx';
interface Recomendacion {
  texto: string;
  link: string;
}
const recomendaciones:{ [key: string]: Recomendacion[] } = {
  Autenticación: [
    { texto: "howsecureismypassword", link: "https://howsecureismypassword.net/" },
    { texto: "KeePass", link: "https://keepass.info/" },
    { texto: "Bitwarden", link: "https://bitwarden.com/" },
    { texto: "Proton", link: "https://proton.me/" },
    { texto: "2fas", link: "https://2fas.com/" },
    { texto: "Aegis", link: "https://getaegis.app/" },
    { texto: "Authenticator", link: "https://authenticator.cc/" }
  ],
  "Navegación Web": [
    { texto: "Mozilla Firefox", link: "https://www.mozilla.org/en-US/firefox/new/" },
    { texto: "Brave Browser", link: "https://brave.com/" },
    { texto: "DuckDuckGo", link: "https://duckduckgo.com/" },
    { texto: "Qwant", link: "https://www.qwant.com/" },
    { texto: "Whatismybrowser", link: "https://www.whatismybrowser.com/" },
    { texto: "EFF", link: "https://www.eff.org/" }
  ],
  "E-mail": [
    { texto: "Howtostopemailtracking", link: "https://emailprivacytester.com/" }
  ],
  "Mensajeria": [
    { texto: "Signal", link: "https://signal.org/" }
  ],
  "Redes Sociales": [
    { texto: "Mastodon", link: "https://joinmastodon.org/" },
    { texto: "PeerTube", link: "https://joinpeertube.org/" },
    { texto: "dTube", link: "https://d.tube/" }
  ],
  Redes: [
    { texto: "IPFire", link: "https://www.ipfire.org/" }, // Firewalls de código abierto
    { texto: "pfSense", link: "https://www.pfsense.org/" }, // Seguridad en redes
    { texto: "Wireshark", link: "https://www.wireshark.org/" } // Análisis de tráfico de red
  ],
  "Dispositivos Móviles": [
    { texto: "GrapheneOS", link: "https://grapheneos.org/" }, // Sistema operativo móvil enfocado en seguridad
    { texto: "CalyxOS", link: "https://calyxos.org/" }, // Sistema operativo móvil seguro y privado
    { texto: "Blokada", link: "https://blokada.org/" } // Bloqueador de anuncios y rastreadores para móviles
  ],
  "Computadora Personal": [
    { texto: "Cryptomator", link: "https://cryptomator.org/" },
    { texto: "Veracrypt", link: "https://www.veracrypt.fr/en/Home.html" },
    { texto: "oo-software", link: "https://www.oo-software.com/en/shutup10" }
  ],
  "Smart Home": [
    { texto: "Home Assistant", link: "https://www.home-assistant.io/" }, // Plataforma de automatización del hogar enfocada en privacidad
    { texto: "OpenHAB", link: "https://www.openhab.org/" }, // Solución de automatización del hogar open source
    { texto: "ESET Smart Home", link: "https://www.eset.com/" } // Seguridad para dispositivos del hogar inteligente
  ],
  "Finanzas Personales": [
    { texto: "Privacy", link: "https://privacy.com/" },
    { texto: "MYSUDO", link: "https://mysudo.com/" }
  ],
  "Aspecto Humano": [
    { texto: "VirusTotal", link: "https://www.virustotal.com/" }
  ]
};



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
        { text: "¿Utiliza una contraseña segura?", tooltip: "Una contraseña segura debe tener al menos 12 caracteres, incluir letras mayúsculas, minúsculas, números y símbolos." },
        { text: "¿Evita reutilizar sus contraseñas?", tooltip: "Reutilizar contraseñas en varias cuentas aumenta el riesgo en caso de violación de datos." },
        { text: "¿Utiliza un administrador de contraseñas seguro?", tooltip: "Un administrador de contraseñas genera y guarda contraseñas seguras y únicas para cada cuenta." },
        { text: "¿Evita compartir contraseñas?", tooltip: "Compartir contraseñas, incluso con personas de confianza, pone en riesgo su seguridad." },
        { text: "¿Habilita la autenticación de 2 factores?", tooltip: "La autenticación de dos factores requiere un código adicional, mejorando significativamente la seguridad." },
        { text: "¿Mantiene seguros los códigos de respaldo?", tooltip: "Los códigos de respaldo le permiten recuperar su cuenta si pierde el acceso a su método de autenticación principal." },
      ],
    },
    {
      title: 'Navegación Web',
      description: 'La mayoría de los sitios web en Internet utilizan algún tipo de seguimiento, a menudo para obtener información sobre el comportamiento y las preferencias de sus usuarios. Estos datos pueden ser increíblemente detallados y, por lo tanto, son extremadamente valiosos para las organizaciones, gobiernos y los ladrones de propiedad intelectual.',
      questions: [
        { text: "¿Bloquea los anuncios?", tooltip: "Bloquear anuncios ayuda a reducir la cantidad de seguimiento y malware potencial." },
        { text: "¿Se asegura que el sitio web sea legítimo?", tooltip: "Verifique el dominio, la ortografía y la presencia de HTTPS antes de compartir información." },
        { text: "¿Utiliza un navegador que respeta su privacidad?", tooltip: "Navegadores enfocados en la privacidad, como Firefox o Brave, reducen el seguimiento y protegen sus datos." },
        { text: "¿Utiliza un motor de búsqueda privado?", tooltip: "Motores de búsqueda privados como DuckDuckGo no rastrean ni almacenan sus búsquedas." },
        { text: "¿Elimina complementos innecesarios del navegador?", tooltip: "Los complementos innecesarios pueden ser vulnerables y filtrar datos, elimínelos regularmente." },
        { text: "¿Mantiene el navegador actualizado?", tooltip: "Las actualizaciones de navegador incluyen parches de seguridad esenciales." },
        { text: "¿Comprueba HTTPS?", tooltip: "HTTPS cifra la conexión con el sitio web, protegiendo sus datos durante la navegación." },
        { text: "¿Utiliza modo incógnito?", tooltip: "El modo incógnito reduce el almacenamiento de datos localmente, pero no garantiza privacidad completa." },
        { text: "¿Administra las cookies?", tooltip: "Las cookies pueden rastrear su actividad, configure su navegador para gestionarlas de manera estricta." },
      ],
    },
    {
      title: 'E-mail',
      description: 'Si un pirata informático obtiene acceso a sus correos electrónicos, proporciona una puerta de entrada para que sus otras cuentas se vean comprometidas, por lo que la seguridad del correo electrónico es primordial.',
      questions: [
        { text: "¿Tiene más de una dirección de correo electrónico?", tooltip: "Tener correos electrónicos separados para trabajo, finanzas y ocio reduce el riesgo de compromiso." },
        { text: "¿Mantiene privada la dirección de correo electrónico?", tooltip: "Evite compartir su correo personal en sitios públicos o redes sociales." },
        { text: "¿Mantiene su cuenta segura?", tooltip: "Use contraseñas fuertes y habilite la autenticación de dos factores para su correo electrónico." },
        { text: "¿Deshabilita la carga automática de contenido remoto?", tooltip: "Desactivar la carga automática de imágenes y contenido remoto evita el seguimiento a través del correo." },
      ],
    },
    {
      title: 'Mensajeria',
      questions: [
        { text: "¿Utiliza únicamente mensajeros totalmente cifrados de extremo a extremo?", tooltip: "El cifrado de extremo a extremo asegura que solo usted y su destinatario puedan leer los mensajes." },
        { text: "¿Utiliza únicamente plataformas de mensajería de código abierto?", tooltip: "Las plataformas de código abierto permiten auditorías de seguridad externas, aumentando la transparencia." },
        { text: "¿Utiliza una plataforma de mensajería confiable?", tooltip: "Utilice plataformas recomendadas por la comunidad de seguridad, como Signal o Telegram." },
        { text: "¿Verifica la configuración de seguridad?", tooltip: "Revise y ajuste la configuración de seguridad de su aplicación de mensajería regularmente." },
        { text: "¿Se asegura de que el entorno de sus destinatarios sea seguro?", tooltip: "Asegúrese de que los dispositivos de sus contactos también sean seguros para evitar compromisos." },
        { text: "¿Deshabilita los servicios en la nube?", tooltip: "Desactivar las copias de seguridad en la nube protege sus mensajes de posibles filtraciones." },
        { text: "¿Sus chats grupales son seguros?", tooltip: "Asegúrese de que todos los participantes de los chats grupales también usen cifrado de extremo a extremo." },
      ],
    },
    {
      title: 'Redes Sociales',
      description: 'Las redes sociales pueden comprometer la privacidad si no se configuran correctamente. Es importante que asegure sus cuentas y sea consciente de la cantidad de información que comparte.',
      questions: [
        { text: "¿Asegura su cuenta?", tooltip: "Utilice contraseñas fuertes y habilite autenticación de dos factores en sus cuentas de redes sociales." },
        { text: "¿Verifica la configuración de privacidad?", tooltip: "Revise y ajuste las configuraciones de privacidad para limitar el acceso a su información personal." },
        { text: "¿Piensa en todas las interacciones como públicas?", tooltip: "Considere que todo lo que comparte en línea puede volverse público." },
        { text: "¿Piensa en todas las interacciones como permanentes?", tooltip: "Incluso si borra una publicación, otros pueden haberla guardado o capturado." },
        { text: "¿Evita revelar demasiado de su vida personal?", tooltip: "Comparta solo la información necesaria para evitar riesgos de seguridad." },
        { text: "¿Tiene cuidado con lo que sube?", tooltip: "Evite subir fotos o información que puedan comprometer su seguridad." },
        { text: "¿Comparte su correo electrónico y su número de teléfono?", tooltip: "Evite publicar información de contacto en redes sociales para reducir el riesgo de spam o phishing." },
        { text: "¿Evita otorgar permisos o conexiones innecesarias?", tooltip: "Revoque permisos innecesarios a aplicaciones y servicios conectados a sus redes sociales." },
        { text: "¿Evita publicar datos geográficos mientras esté fuera?", tooltip: "Publicar su ubicación en tiempo real puede comprometer su seguridad personal." },
      ],
    },
    {
      title: 'Redes',
      description: 'Conectarse a Internet de forma segura implica proteger su red doméstica y utilizar herramientas como VPN para asegurar su conexión.',
      questions: [
        { text: "¿Utiliza una VPN?", tooltip: "Una VPN cifra su tráfico y protege su privacidad al ocultar su ubicación." },
        { text: "¿Cambia la contraseña de su enrutador?", tooltip: "Cambie las contraseñas predeterminadas de su enrutador para evitar accesos no autorizados." },
        { text: "¿Utiliza WPA2 y una contraseña segura?", tooltip: "WPA2 es el estándar de seguridad más seguro para redes Wi-Fi. Use una contraseña compleja." },
        { text: "¿Mantiene actualizado el firmware del enrutador?", tooltip: "Las actualizaciones de firmware corrigen vulnerabilidades de seguridad en su enrutador." },
      ],
    },
    {
      title: 'Dispositivos Móviles',
      description: 'Los teléfonos inteligentes generan una gran cantidad de datos sobre usted. Asegúrese de proteger su dispositivo y ser consciente de los permisos que otorga a las aplicaciones.',
      questions: [
        { text: "¿Cifra su dispositivo?", tooltip: "El cifrado del dispositivo protege sus datos en caso de pérdida o robo." },
        { text: "¿Desactiva las funciones de conectividad que no se estén utilizando?", tooltip: "Desactive Bluetooth, Wi-Fi y NFC cuando no las esté utilizando para reducir riesgos." },
        { text: "¿Mantiene el recuento de aplicaciones al mínimo?", tooltip: "Instalar solo aplicaciones esenciales reduce las vulnerabilidades en su dispositivo." },
        { text: "¿Evita otorgar permisos a las aplicaciones?", tooltip: "Revise los permisos solicitados por las aplicaciones y otorgue solo los necesarios." },
        { text: "¿Instala aplicaciones únicamente de fuentes oficiales?", tooltip: "Descargar aplicaciones solo de tiendas oficiales como Google Play o App Store reduce riesgos de malware." },
      ],
    },
    {
      title: 'Computadora Personal',
      description: 'Es crucial mantener su sistema operativo y aplicaciones actualizadas, además de implementar prácticas de seguridad adicionales como el cifrado y copias de seguridad.',
      questions: [
        { text: "¿Mantiene su sistema actualizado?", tooltip: "Las actualizaciones corrigen vulnerabilidades de seguridad en el sistema operativo." },
        { text: "¿Cifra su dispositivo?", tooltip: "El cifrado protege los datos almacenados en su computadora en caso de pérdida o robo." },
        { text: "¿Tiene copia de seguridad de los datos importantes?", tooltip: "Realice copias de seguridad regulares de sus archivos más importantes para evitar pérdidas de datos." },
        { text: "¿Activa el bloqueo de pantalla cuando está inactivo?", tooltip: "Configurar el bloqueo automático de pantalla ayuda a proteger su dispositivo de accesos no autorizados." },
        { text: "¿Deshabilita asistentes como Siri?", tooltip: "Los asistentes de voz pueden activar funciones de forma accidental y comprometer su privacidad." },
        { text: "¿Revisa sus programas instalados?", tooltip: "Revise regularmente los programas instalados y elimine aquellos que no utilice." },
        { text: "¿Administra los permisos?", tooltip: "Revise y gestione los permisos que tienen los programas instalados en su computadora." },
        { text: "¿Apaga su computadora en lugar de ponerla en espera?", tooltip: "Apagar completamente su computadora reduce riesgos de seguridad relacionados con acceso físico." },
        { text: "¿Tiene cuidado al conectar dispositivos tipo USB a su computadora?", tooltip: "Evite conectar dispositivos USB desconocidos para prevenir la instalación de malware." },
      ],
    },
    {
      title: 'Smart Home',
      description: 'Los dispositivos conectados a Internet en su hogar pueden comprometer su privacidad si no se configuran adecuadamente.',
      questions: [
        { text: "¿Cambia el nombre de los dispositivos para no especificar marca/modelo?", tooltip: "Cambiar el nombre predeterminado de los dispositivos dificulta la identificación por atacantes." },
        { text: "¿Desactiva el micrófono y la cámara cuando no estén en uso?", tooltip: "Desactivar el micrófono y la cámara cuando no los use previene escuchas y grabaciones no autorizadas." },
        { text: "¿Comprende qué datos se recopilan, almacenan y transmiten?", tooltip: "Lea las políticas de privacidad para saber qué datos recopilan sus dispositivos y cómo se utilizan." },
        { text: "¿Establece configuraciones de privacidad y opta por no compartir datos con terceros?", tooltip: "Revise las configuraciones de privacidad y desactive el uso compartido de datos si es posible." },
        { text: "¿Evita vincular sus dispositivos domésticos inteligentes a su identidad real?", tooltip: "Utilice cuentas o alias separados para evitar exponer su identidad real." },
        { text: "¿Protege su red?", tooltip: "Asegúrese de que su red esté protegida mediante contraseñas seguras y WPA2." },
      ],
    },
    {
      title: 'Finanzas Personales',
      description: 'Proteger sus finanzas en línea es esencial para evitar fraudes y robos de identidad.',
      questions: [
        { text: "¿Está registrado para recibir alertas de fraude y monitoreo de crédito?", tooltip: "Las alertas de fraude y monitoreo de crédito le notifican sobre actividad sospechosa." },
        { text: "¿Aplica un congelamiento de crédito?", tooltip: "Un congelamiento de crédito evita que terceros abran cuentas a su nombre sin su consentimiento." },
        { text: "¿Utiliza tarjetas virtuales?", tooltip: "Las tarjetas virtuales son temporales y pueden ayudar a reducir el riesgo de fraude en línea." },
        { text: "¿Utiliza efectivo para transacciones locales?", tooltip: "El uso de efectivo reduce la cantidad de datos financieros que se comparten en línea." },
        { text: "¿Utiliza una dirección de entrega alternativa?", tooltip: "Utilizar una dirección de entrega distinta de su hogar para compras en línea puede proteger su privacidad." },
      ],
    },
    {
      title: 'Aspecto Humano',
      description: 'Muchos ataques cibernéticos ocurren debido a errores humanos. Estas preguntas lo ayudarán a evaluar su nivel de riesgo personal.',
      questions: [
        { text: "¿Verifica los destinatarios?", tooltip: "Siempre verifique que los destinatarios de correos y mensajes sean los correctos para evitar compartir datos sensibles." },
        { text: "¿Nunca deja sus dispositivos desatendidos?", tooltip: "Dejar dispositivos sin supervisión aumenta el riesgo de que personas no autorizadas accedan a ellos." },
        { text: "¿Está alerta de la Cam-fectación?", tooltip: "La cam-fectación es el acceso remoto no autorizado a la cámara de su dispositivo." },
        { text: "¿Está alerta del Shoulder Surfing?", tooltip: "El shoulder surfing ocurre cuando alguien observa lo que hace en su dispositivo sin su conocimiento." },
        { text: "¿Está alerta de los ataques de Phishing?", tooltip: "Los ataques de phishing son intentos de obtener información personal a través de correos o mensajes engañosos." },
        { text: "¿Está alerta del Stalkerware?", tooltip: "El stalkerware es software diseñado para espiar a alguien sin su consentimiento." },
        { text: "¿Instala software de fuentes confiables?", tooltip: "Instalar software solo de fuentes confiables reduce el riesgo de malware." },
        { text: "¿Almacena sus datos de forma segura?", tooltip: "Utilice cifrado y almacenamiento seguro para proteger sus datos personales y sensibles." },
        { text: "¿Oculta sus detalles personales de los documentos?", tooltip: "Antes de compartir documentos, asegúrese de que no contengan información personal no necesaria." },
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

  const resultRef = useRef<HTMLDivElement>(null); // Ref para capturar la sección de resultados


  const isSectionComplete = (sectionIndex: number) => {
    return !answers[sectionIndex].includes(''); // Si alguna respuesta está vacía, el módulo no está completo
  };

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

  const handleSectionSelect = (event: React.SyntheticEvent, newValue: number) => {
    // Solo permitir cambiar de sección si la anterior está completa
    if (newValue <= currentSection || isSectionComplete(currentSection)) {
      setCurrentSection(newValue);
    } else {
      setShowAlert(true);
    }
  };

  const calculatePercentages = () => {
    return sections.map((section, secIndex) => {
      const correctAnswers = answers[secIndex].reduce((acc, answer) => (answer === "Sí" ? acc + 1 : acc), 0);
      const totalQuestions = section.questions.length;
      const percentage = (correctAnswers / totalQuestions) * 100;

      return {
        section: section.title,
        percentage: percentage.toFixed(2), // Convertir a porcentaje con 2 decimales
        correctAnswers,
        totalQuestions,
      };
    });
  };

  const generatePDF = () => {
    const input = resultRef.current;
    if (input) {
      html2canvas(input, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        // Agrega la primera página con la imagen
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        // Agrega páginas adicionales si el contenido es más alto que una página A4
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save(`${name}_${surname}_Resultados.pdf`);
      });
    }
  };
  

  const shouldShowRecomendations = (percentages: { percentage: string }[]) => {
    return percentages.some(p => parseFloat(p.percentage) < 50); // Si hay alguna sección con menos del 50% de respuestas correctas
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
            Desarrollado por Alejandro Salgar  - alejandro.salgar@medellin.gov.co
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
              disabled={index > currentSection && !isSectionComplete(index - 1)} // Deshabilitar si la sección anterior no está completa
            />
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
        <Box ref={resultRef}>
          <Typography variant="h4" gutterBottom>
            Resultados del Autodiagnóstico de {name} {surname}
          </Typography>
          <Typography variant="h4" gutterBottom>
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={calculateResults()}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar name="Puntuación" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
          <Typography variant="h4" gutterBottom>
            Porcentaje de respuestas correctas
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={calculatePercentages()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="section" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="percentage" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>

          {shouldShowRecomendations(calculatePercentages()) && (
            <Box marginTop={4}>
              <Typography variant="h5" gutterBottom>
                Recomendaciones
              </Typography>
              {calculatePercentages().map((sectionResult, index) => {
                if (parseFloat(sectionResult.percentage) < 50) {
                  return (
                    <Box key={index} marginBottom={2}>
                      <Typography variant="h6">
                        {sectionResult.section} ({sectionResult.percentage}%)
                      </Typography>
                      <ul>
                        {recomendaciones[sectionResult.section]?.map((rec: Recomendacion, i: number) => (
                          <li key={i}>
                            <Typography variant="body1">
                              <a href={rec.link} target="_blank" rel="noopener noreferrer">
                                {rec.texto}
                              </a>
                            </Typography>
                          </li>
                        )) || <Typography variant="body1">Por recomendar</Typography>}
                      </ul>
                    </Box>
                  );
                }
                return null;
              })}
            </Box>
          )}

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
          <Button
            variant="contained"
            color="primary"
            onClick={generatePDF}  // Llamada a la función para generar el PDF
            style={{ marginTop: '20px', marginLeft: '10px' }}
          >
            Descargar Resultados en PDF
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Autodiagnostico;

