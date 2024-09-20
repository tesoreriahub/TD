import { Alert, Box, Button, Checkbox, Container, FormControlLabel, MenuItem, Select, Tab, Tabs, TextField, Tooltip, Typography } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef, useState } from 'react';
import { Bar, BarChart, CartesianGrid, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import * as XLSX from 'xlsx';

interface Recomendacion {
  texto: string;
  categoria: string;
}
const recomendacionesPorPregunta: { [key: string]: Recomendacion[] } = {
  Autenticación: [
    { texto: "Asegúrate de crear contraseñas robustas de mínimo 9 caracteres que incorporen mayúsculas, minúsculas, números y caracteres especiales. Esta combinación permite reducir el riesgo de ataques de fuerza bruta. ", categoria: "contraseñas" },
    { texto: "Activa siempre la autenticación de dos factores (2FA) para añadir una capa de seguridad adicional a tu cuenta.", categoria: "contraseñas" },
    { texto: "Utiliza contraseñas únicas para cada cuenta y cambia las predeterminadas inmediatamente para evitar vulnerabilidades comunes.", categoria: "contraseñas" },
    { texto: "Usa un administrador de contraseñas confiable para generar y almacenar tus contraseñas de manera segura.", categoria: "contraseñas" },
    { texto: "Mantén tus contraseñas privadas y no las compartas con nadie para prevenir accesos no autorizados.", categoria: "contraseñas" },
    { texto: "Revisa frecuentemente los registros de actividad de tus cuentas y cierra sesiones activas para evitar accesos no deseados. ", categoria: "contraseñas" },
    { texto: "Asegúrate de que tu información de recuperación (correo alternativo, número de teléfono) esté actualizada para recuperar acceso en caso de problemas. ", categoria: "contraseñas" }
  ],
  "Navegación Web": [
    { texto: "Verifica que los sitios web sean legítimos revisando la URL y asegurándote de que utilicen HTTPS.", categoria: "https://www.mozilla.org/en-US/firefox/new/" },
    { texto: "Digita la URL directamente en lugar de buscarla en motores de búsqueda para evitar sitios falsos.", categoria: "https://brave.com/" },
    { texto: "Evita descargar archivos de páginas no confiables para prevenir malware y amenazas a tu sistema.", categoria: "https://duckduckgo.com/" },
    { texto: "Mantén tu navegador actualizado, bloquea anuncios y elimina complementos que no uses para reducir vulnerabilidades.", categoria: "https://www.qwant.com/" },
    { texto: "Desactiva la opción de guardar contraseñas críticas en el navegador para proteger tus cuentas sensibles.", categoria: "https://www.whatismybrowser.com/" },
    { texto: "Utiliza el modo incógnito para proteger tu información privada al navegar por sitios web sensibles.", categoria: "https://www.whatismybrowser.com/" },
    { texto: "Revisa y ajusta regularmente los permisos que otorgas a los sitios web, como acceso a cookies, ubicación, y dispositivos.", categoria: "https://www.whatismybrowser.com/" },
    { texto: "Evita realizar transacciones importantes o ingresar credenciales en redes Wi-Fi públicas para minimizar riesgos.", categoria: "https://www.whatismybrowser.com/" },
  ],
  "Correo electrónico": [
    { texto: "Asegúrate de confirmar la autenticidad de los remitentes para evitar la divulgación de información sensible.", categoria: "https://emailprivacytester.com/" },
    { texto: "No hagas clic en enlaces ni descargues archivos de correos sospechosos para prevenir posibles amenazas.", categoria: "https://signal.org/" },
    { texto: "Mantén tu software de correo electrónico actualizado para protegerte contra vulnerabilidades de seguridad.", categoria: "https://signal.org/" },
    { texto: "Marca los correos electrónicos sospechosos como spam para mantener tu bandeja de entrada limpia y segura.", categoria: "https://signal.org/" },
    { texto: "Verifica los destinatarios de tus correos electrónicos antes de enviar información confidencial para evitar errores.", categoria: "https://signal.org/" }
    
  ],
  "Aplicaciones de mensajería": [
    { texto: "Usa únicamente plataformas de mensajería de buena reputación para asegurar la privacidad de tus comunicaciones.", categoria: "https://signal.org/" },
    { texto: "Cierra sesión en tus servicios de mensajería en dispositivos compartidos para evitar accesos no autorizados.", categoria: "https://signal.org/" },
    { texto: "Ten cuidado antes de hacer clic en enlaces recibidos por chat para prevenir ataques de phishing o malware.", categoria: "https://signal.org/" },
    { texto: "Actualiza regularmente tus aplicaciones de mensajería para protegerlas contra vulnerabilidades y amenazas de seguridad.", categoria: "https://signal.org/" },
    { texto: "Realiza copias de seguridad de tus datos importantes para evitar la pérdida de información en caso de problemas.", categoria: "https://signal.org/" },
    { texto: "Evita enviar datos sensibles como contraseñas o archivos confidenciales a través de chats para proteger tu información.", categoria: "https://signal.org/" },
    { texto: "Comparte información únicamente en grupos donde conozcas a los destinatarios para minimizar el riesgo de divulgación no autorizada.", categoria: "https://signal.org/" }
  ],
  "Redes Sociales": [
    { texto: "Sé consciente del alcance público o privado de tus publicaciones para proteger tu privacidad.", categoria: "https://joinmastodon.org/" },
    { texto: "No reveles información personal sensible como teléfono y correo electrónico en tus publicaciones para evitar riesgos de exposición.", categoria: "https://joinpeertube.org/" },
    { texto: "Evita compartir tu ubicación geográfica mientras estás fuera de casa para prevenir posibles amenazas a tu seguridad.", categoria: "https://d.tube/" },
    { texto: "Verifica la autenticidad de las solicitudes de información personal antes de responder para evitar fraudes.", categoria: "https://d.tube/" },
    { texto: "No participes en encuestas o concursos que soliciten información personal innecesaria para proteger tus datos.", categoria: "https://d.tube/" }

  ],
  "Dispositivos Móviles": [
    { texto: "Configura opciones de localización en tu teléfono para poder rastrearlo en caso de robo o hurto.", categoria: "https://grapheneos.org/" }, 
    { texto: "Elimina las aplicaciones que ya no usas para reducir el riesgo de vulnerabilidades y mantener tu dispositivo seguro.", categoria: "https://calyxos.org/" },
    { texto: "Instala solo aplicaciones de fuentes oficiales, revisa los permisos que solicitan y verifica las reseñas antes de la instalación.", categoria: "https://blokada.org/" },
    { texto: "Mantén actualizado el sistema operativo y las aplicaciones para protegerte contra vulnerabilidades y amenazas de seguridad.", categoria: "https://cryptomator.org/" },
    { texto: "Asegúrate de tener un antivirus instalado en tu teléfono para protegerlo contra malware y otras amenazas.", categoria: "https://cryptomator.org/" },
    { texto: "Realiza copias de seguridad periódicas de tus datos para prevenir la pérdida de información importante.", categoria: "https://cryptomator.org/" },
    { texto: "Configura tu dispositivo para que se bloquee automáticamente después de un período de inactividad para proteger tu información.", categoria: "https://cryptomator.org/" },

  ],
  "Equipos de cómputo": [
    { texto: "Asegúrate de que tu sistema operativo esté actualizado para protegerte contra vulnerabilidades y amenazas.", categoria: "https://cryptomator.org/" },
    { texto: "Activa el cifrado de disco duro para proteger tus datos en caso de pérdida o robo del dispositivo. En Windows puedes hacerlo a través de las funciones de Bitlocker", categoria: "https://www.veracrypt.fr/en/Home.html" },
    { texto: "Realiza copias de seguridad de tus datos importantes para prevenir la pérdida de información esencial.", categoria: "https://www.oo-software.com/en/shutup10" },
    { texto: "Configura el bloqueo de pantalla automático para proteger tu dispositivo cuando no esté en uso.", categoria: "https://www.veracrypt.fr/en/Home.html" },
    { texto: "Elimina archivos y programas que no utilices para reducir el riesgo de seguridad y liberar espacio.", categoria: "https://www.veracrypt.fr/en/Home.html" },
    { texto: "Evita conectar dispositivos USB no confiables o no autorizados para prevenir posibles infecciones o daños.", categoria: "https://www.veracrypt.fr/en/Home.html" },
    { texto: "Instala y mantén actualizado un software antivirus para proteger tu dispositivo contra amenazas y malware. Manten activo el Windows Defender. También es ideal que instaleces una licencia de un antivirus confiable que te pueda recomendar un experto informático.", categoria: "https://www.veracrypt.fr/en/Home.html" },
    { texto: "Asegúrate de que el firewall esté activo para proteger tu red y dispositivos de accesos no autorizados.", categoria: "https://www.veracrypt.fr/en/Home.html" },
    { texto: "Realiza auditorías regulares de permisos y accesos a tus archivos y carpetas para asegurar que solo usuarios autorizados puedan acceder a ellos.", categoria: "https://www.veracrypt.fr/en/Home.html" },

  ],
  "Dispositivos Domóticos": [
    { texto: "Cambia el nombre de tus dispositivos a uno que no revele información personal o detalles sobre marcas o modelos para proteger tu privacidad.", categoria: "https://www.home-assistant.io/" },
    { texto: "Entiende qué datos se recopilan, almacenan y transmiten en tus dispositivos inteligentes para gestionar mejor tu información.", categoria: "https://www.openhab.org/" },
    { texto: "Configura las opciones de privacidad para no compartir datos con terceros y proteger tu información personal.", categoria: "https://www.openhab.org/" },
    { texto: "Mantén actualizado el software de tus dispositivos domóticos para asegurar que cuenten con las últimas mejoras de seguridad.", categoria: "https://www.openhab.org/" },
    { texto: "Revisa y ajusta las configuraciones de privacidad de tus dispositivos domóticos de acuerdo con las recomendaciones de seguridad para proteger tu información.", categoria: "https://www.eset.com/" }
  ],
  "Buenas prácticas financieras": [
    { texto: "Activa y revisa las notificaciones de tus movimientos y transacciones para detectar actividades sospechosas.", categoria: "https://privacy.com/" },
    { texto: "Usa una clave dinámica o token para añadir una capa adicional de seguridad a tus transacciones.", categoria: "https://privacy.com/" },
    { texto: "Verifica la legitimidad de las plataformas de pago y comercios electrónicos antes de realizar compras para evitar fraudes.", categoria: "https://privacy.com/" },
    { texto: "Protege la información de tu tarjeta de crédito o débito al realizar pagos para prevenir el robo de datos.", categoria: "https://privacy.com/" },
    { texto: "Revisa regularmente los saldos de tus cuentas para identificar y resolver rápidamente cualquier discrepancia.", categoria: "https://privacy.com/" },
    { texto: "Evita realizar transacciones financieras en redes públicas para proteger tu información de posibles interceptaciones.", categoria: "https://privacy.com/" },
    { texto: "Desactiva servicios de auto-completar en aplicaciones financieras para evitar el almacenamiento inseguro de datos sensibles.", categoria: "https://mysudo.com/" }
  ],
  "Otras Amenazas latentes": [
    { texto: "Revisa regularmente el consentimiento que otorgas a aplicaciones y servicios para asegurar que solo compartas la información necesaria.", categoria: "https://www.virustotal.com/" },
    { texto: "Realiza revisiones periódicas de las configuraciones de privacidad y seguridad en tus aplicaciones y dispositivos para mantener tu protección actualizada.", categoria: "https://www.virustotal.com/" },
    { texto: "Investiga sobre qué es el shoulder surfing y toma medidas para proteger tus datos personales cuando estés en público.", categoria: "https://www.virustotal.com/" },
    { texto: "Infórmate sobre el phishing y verifica la autenticidad de los mensajes y correos electrónicos para evitar caer en fraudes.", categoria: "https://www.virustotal.com/" },
    { texto: "Investiga qué es el stalkerware y mantén tu dispositivo seguro para prevenir el seguimiento no deseado.", categoria: "https://www.virustotal.com/" },
    { texto: "Entiende qué es el malware y asegúrate de tener medidas de protección para evitar infecciones.", categoria: "https://www.virustotal.com/" },
    { texto: "Mantente alerta ante ataques de ransomware y realiza copias de seguridad periódicas para proteger tus datos.", categoria: "https://www.virustotal.com/" },
    { texto: "Investiga las estafas de soporte técnico y/o vishing y verifica la identidad de quienes te contactan antes de proporcionar información.", categoria: "https://www.virustotal.com/" },
    { texto: "Reconoce los ataques de ingeniería social y mantén una actitud crítica ante solicitudes de información personal.", categoria: "https://www.virustotal.com/" }
  ]
};



// Función para generar el archivo Excel y permitir la descarga

const generarExcel = (nombre: string, apellido: string, unidad: string,correo:string, preguntas: string[], respuestas: string[]) => {
  // Crear una hoja de cálculo con preguntas y respuestas
  const data = preguntas.map((pregunta, index) => ({
    correo: correo,
    Pregunta: pregunta,
    Respuesta: respuestas[index] || 'Sin responder',
  }));

  // Crear un libro de Excel
  const hoja = XLSX.utils.json_to_sheet(data);

  // Crear el libro con la hoja
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Resultados');

  // Generar archivo Excel y guardarlo
  const nombreArchivo = `${nombre}_${apellido}_${unidad}.xls`;
  XLSX.writeFile(libro, nombreArchivo);
};

const Autodiagnostico: React.FC = () => {
  // Actualización de secciones y preguntas con mensajes de tooltip personalizados
  const sections = [
    {
      title: 'Autenticación',
      description: 'La mayoría de las violaciones de datos reportadas se deben al uso de contraseñas débiles, predeterminadas o robadas. Utilice contraseñas largas, seguras y únicas, adminístrelas en un administrador de contraseñas seguro, habilite la autenticación de dos factores.',
      questions: [
        { text: "Establezco contraseñas seguras de mínimo 9 caracteres que incorporan mayúsculas, minúsculas, números y caracteres especiales", tooltip: "Establecer contraseñas con estos requisitos dificulta su descifrado por atacantes." },
        { text: "Cuando están disponibles, habilito los métodos de doble factor de autenticación, reconocimiento facial o huella", tooltip: "Estos métodos añaden una capa adicional de seguridad, evitando accesos no autorizados." },
        { text: "Evito reutilizar mis contraseñas entre diferentes aplicaciones o usar contraseñas predeterminadas de aplicaciones o dispositivos", tooltip: "El uso de contraseñas únicas reduce el riesgo de comprometer múltiples cuentas si una es vulnerada." },
        { text: "Utilizo un administrador de contraseñas seguro y evito guardar mis contraseñas en navegadores, notas físicas o notas digitales", tooltip: "Un administrador de contraseñas genera y almacena contraseñas de manera segura." },
        { text: "Evito compartir mis contraseñas con otras personas, las mantengo de uso personal", tooltip: "Compartir contraseñas aumenta el riesgo de accesos no autorizados a sus cuentas." },
        { text: "Reviso regularmente la actividad de inicio de sesión de mis cuentas y cierro las sesiones luego de usarlas", tooltip: "Revisar la actividad ayuda a identificar accesos sospechosos o no autorizados a tiempo." },
        { text: "Mantengo actualizada la información de recuperación de mi cuenta", tooltip: "Esto garantiza que pueda recuperar el acceso en caso de olvido o pérdida de credenciales." },
      ],
    },
    {
      title: 'Navegación Web',
      description: 'La mayoría de los sitios web utilizan algún tipo de seguimiento, lo que puede comprometer la privacidad. Es importante ser consciente de la seguridad al navegar por Internet.',
      questions: [
        { text: "Compruebo que los sitios sean legítimos y usen HTTPS", tooltip: "HTTPS asegura la conexión cifrada entre el navegador y el servidor, protegiendo la información." },
        { text: "Prefiero digitar la URL de las aplicaciones web en lugar de encontrarlas en un motor de búsqueda", tooltip: "Escribir directamente la URL reduce el riesgo de caer en sitios web fraudulentos." },
        { text: "Evito descargar archivos de páginas web de dudosa reputación", tooltip: "Descargar archivos de fuentes no confiables puede introducir malware en su dispositivo." },
        { text: "Mantengo mi navegador actualizado, bloqueo anuncios y desactivo complementos o plugins en desuso.", tooltip: "Estas prácticas reducen las vulnerabilidades y mejoran la seguridad del navegador." },
        { text: "Evito guardar contraseñas de aplicaciones críticas en mi navegador", tooltip: "Guardar contraseñas en navegadores puede exponerlas si el navegador es comprometido." },
        { text: "Utilizo el modo incógnito para separar la navegación abierta en Internet de mi navegación en aplicaciones protegidas", tooltip: "El modo incógnito no almacena el historial ni las cookies, pero no garantiza privacidad completa." },
        { text: "Cuando me lo solicitan, reviso y gestiono los permisos de sitios web tales como acceso a cookies, ubicación, micrófono, cámara, etc.", tooltip: "Revisar y gestionar los permisos evita que los sitios web accedan a datos sin autorización." },
        { text: "Hago un uso prudente de las redes Wi-Fi públicas evitando hacer transacciones o ingresar credenciales de mis servicios", tooltip: "Las redes Wi-Fi públicas son vulnerables a ataques y pueden comprometer sus datos." },
      ],
    },
    {
      title: 'Correo electrónico',
      description: 'La seguridad del correo electrónico es esencial para proteger otras cuentas asociadas. Un correo electrónico comprometido puede permitir acceso no autorizado a múltiples servicios.',
      questions: [
        { text: "Verifico la autenticidad de los remitentes antes de responder o proporcionar información confidencial", tooltip: "Verificar el remitente ayuda a evitar ataques de phishing." },
        { text: "Evito hacer clic en enlaces sospechosos o descargar archivos de correos electrónicos de dudosa procedencia", tooltip: "Enlaces y archivos en correos no solicitados pueden contener malware o estafas." },
        { text: "Verifico y autorizo actualizaciones de mi software de correo electrónico para protegerme contra vulnerabilidades", tooltip: "Mantener el software actualizado ayuda a prevenir vulnerabilidades." },
        { text: "Marco como spam a aquellos correos electrónicos que incluyen contenido inapropiado o de dudosa procedencia", tooltip: "Marcar como spam reduce la exposición a correos maliciosos o no deseados." },
        { text: "Verifico los destinatarios de mis correos electrónicos antes de enviar con información confidencial", tooltip: "Revisar los destinatarios evita enviar información sensible a personas equivocadas." },
      ],
    },
    {
      title: 'Aplicaciones de mensajería',
      questions: [
        { text: "Utilizo una plataforma de mensajería de buena reputación", tooltip: "El cifrado de extremo a extremo protege sus mensajes contra accesos no autorizados." },
        { text: "Evito dejar abiertas sesiones de mis servicios de mensajería en dispositivos de uso compartido", tooltip: "Cerrar sesiones en dispositivos compartidos evita accesos no deseados." },
        { text: "Tengo cuidado antes de hacer click en enlaces que recibo por medio de chats.", tooltip: "Enlaces maliciosos enviados por chat pueden comprometer su dispositivo o datos." },
        { text: "Mantengo actualizadas mis aplicaciones de mensajería para protegerlas contra vulnerabilidades", tooltip: "Las actualizaciones corrigen vulnerabilidades y mejoran la seguridad." },
        { text: "Realizo copias de seguridad de mis datos importantes", tooltip: "Hacer copias de seguridad protege contra la pérdida de datos en caso de fallos o ataques." },
        { text: "Evito enviar datos sensibles como contraseñas o archivos confidenciales por medio de chats", tooltip: "Enviar datos sensibles por chat aumenta el riesgo de que sean interceptados." },
        { text: "Comparto información pertinente solo en grupos donde reconozco a los destinatarios", tooltip: "Verificar los miembros del grupo evita compartir información con personas no deseadas." },
      ],
    },
    {
      title: 'Redes Sociales',
      description: 'Es importante proteger la información personal en redes sociales configurando adecuadamente la privacidad y siendo consciente de lo que se comparte.',
      questions: [
        { text: "Mantengo conciencia del alcance público o privado de mis publicaciones", tooltip: "Ajustar la privacidad de sus publicaciones ayuda a proteger su información." },
        { text: "Evito revelar demasiado de mi vida o datos personales como teléfono y correo electrónico", tooltip: "Compartir demasiada información puede ser aprovechado por ciberdelincuentes." },
        { text: "Evito publicar datos geográficos mientras estoy fuera de casa", tooltip: "Evitar publicaciones geográficas en tiempo real reduce el riesgo de robo o acoso." },
        { text: "Verifico la autenticidad de las solicitudes de información personal antes de responder", tooltip: "Verificar solicitudes evita ser víctima de suplantación o estafas." },
        { text: "Evito participar en encuestas o concursos que soliciten información personal innecesaria", tooltip: "Evitar compartir información en encuestas reduce el riesgo de robo de identidad." },
      ],
    },
    {
      title: 'Dispositivos Móviles',
      description: 'Los dispositivos móviles generan una gran cantidad de datos, por lo que es fundamental protegerlos adecuadamente.',
      questions: [
        { text: "Configuro opciones para localización del teléfono ante robo o hurto", tooltip: "Configurar opciones de localización facilita recuperar el dispositivo en caso de pérdida o robo." },
        { text: "Elimino aplicaciones que ya no utilizo para reducir el riesgo de vulnerabilidades", tooltip: "Eliminar aplicaciones no utilizadas minimiza posibles vectores de ataque." },
        { text: "Instalo solo aplicaciones de fuentes oficiales, verifico los permisos que solicita y reviso las reseñas antes de la instalación.", tooltip: "Instalar aplicaciones solo de fuentes confiables reduce el riesgo de malware." },
        { text: "Actualizo regularmente el sistema operativo y las aplicaciones", tooltip: "Las actualizaciones incluyen mejoras de seguridad para evitar vulnerabilidades." },
        { text: "Tengo instalado un antivirus en mi teléfono", tooltip: "El antivirus protege su dispositivo de malware y otras amenazas." },
        { text: "Realizo copias de seguridad periódicas de mis datos", tooltip: "Hacer copias de seguridad regularmente protege sus datos en caso de pérdida." },
        { text: "Configuro el dispositivo para que se bloquee automáticamente después de un período de inactividad", tooltip: "El bloqueo automático previene accesos no autorizados si el dispositivo se deja desatendido." },
      ],
    },
    {
      title: 'Equipos de cómputo',
      description: 'Es crucial mantener su sistema operativo y aplicaciones actualizadas, además de implementar prácticas de seguridad adicionales como el cifrado y copias de seguridad.',
      questions: [
        { text: "Promuevo que mi sistema operativo esté actualizado", tooltip: "Mantener el sistema operativo actualizado protege contra vulnerabilidades conocidas." },
        { text: "Me intereso por tener el cifrado de disco duro habilitado", tooltip: "El cifrado de disco asegura que los datos no puedan ser leídos sin autorización." },
        { text: "Tengo copia de seguridad de mis datos importantes", tooltip: "Las copias de seguridad protegen sus datos en caso de fallos o ataques." },
        { text: "Me intereso por el bloqueo de pantalla cuando está inactivo", tooltip: "El bloqueo de pantalla impide accesos no autorizados cuando se deja el equipo desatendido." },
        { text: "Verifico la eliminación de los archivos o programas que no utilizo", tooltip: "Eliminar archivos y programas innecesarios reduce la superficie de ataque." },
        { text: "Evito conectar dispositivos tipo USB no confiables o no autorizados", tooltip: "Los dispositivos USB pueden ser vectores de malware, evite conectar dispositivos no verificados." },
        { text: "Verifico la instalación de un software antivirus actualizado", tooltip: "El antivirus actualizado protege contra malware y otras amenazas en tiempo real." },
        { text: "Verifico que el firewall esté activo para proteger mi red y dispositivos", tooltip: "El firewall controla las conexiones entrantes y salientes, protegiendo contra accesos no autorizados." },
        { text: "Hago auditorías regulares de los permisos y accesos a mis archivos y carpetas", tooltip: "Revisar permisos previene accesos indebidos a archivos sensibles o importantes." },
      ],
    },
    {
      title: 'Dispositivos Domóticos',
      description: 'Los dispositivos conectados a Internet en su hogar pueden comprometer su privacidad si no se configuran adecuadamente.',
      questions: [
        { text: "Cambio el nombre de los dispositivos por un nombre que no revele información personal o marcas/modelos.", tooltip: "Renombrar dispositivos dificulta que sean identificados y atacados fácilmente." },
        { text: "Comprendo qué datos se recopilan, almacenan y transmiten en los dispositivos inteligentes que utilizo", tooltip: "Entender la recopilación de datos ayuda a proteger su privacidad y evitar abusos." },
        { text: "Establezco configuraciones de privacidad y decido no compartir datos con terceros", tooltip: "Configurar la privacidad correctamente previene el acceso no autorizado a sus datos personales." },
        { text: "Actualizo regularmente el software de mis dispositivos domóticos", tooltip: "Las actualizaciones corrigen vulnerabilidades que podrían ser explotadas por atacantes." },
        { text: "Reviso y ajusto las configuraciones de privacidad de mis dispositivos domóticos según las recomendaciones de seguridad", tooltip: "Revisar y ajustar la configuración de privacidad mejora la protección de datos sensibles." },
      ],
    },
    {
      title: 'Buenas prácticas financieras',
      description: 'Proteger sus finanzas en línea es esencial para evitar fraudes y robos de identidad.',
      questions: [
        { text: "Tengo activas y estoy atento a las notificaciones sobre mis movimientos y transacciones", tooltip: "Recibir notificaciones en tiempo real permite detectar rápidamente actividades sospechosas." },
        { text: "Tengo activa una clave dinámica o un token", tooltip: "El uso de claves dinámicas o tokens añade una capa adicional de seguridad en las transacciones financieras." },
        { text: "Verifico la legitimidad de las plataformas de pago y comercios electrónicos", tooltip: "Comprar solo en plataformas legítimas reduce el riesgo de fraudes y robos de información." },
        { text: "Protejo la información de mi tarjeta cuando realizo pagos en algún comercio", tooltip: "Proteger los datos de la tarjeta evita que sean interceptados durante las transacciones." },
        { text: "Reviso con regularidad los saldos de mis cuentas", tooltip: "Monitorear el saldo ayuda a identificar transacciones no autorizadas rápidamente." },
        { text: "Evito hacer transacciones financieras en redes públicas", tooltip: "Las redes públicas pueden ser vulnerables a ataques, comprometiendo la seguridad de sus datos financieros." },
        { text: "Desactivo servicios o configuraciones de auto-completar en aplicaciones financieras", tooltip: "Desactivar el autocompletado evita que información sensible sea introducida automáticamente en lugares inseguros." },
      ],
    },
    {
      title: 'Otras Amenazas latentes',
      description: 'Muchos ataques cibernéticos ocurren debido a errores humanos. Estas preguntas lo ayudarán a evaluar su nivel de riesgo personal.',
      questions: [
        { text: "Protejo mis datos personales al revisar el consentimiento otorgado a aplicaciones y servicios", tooltip: "Revisar los consentimientos otorgados evita que aplicaciones recolecten más información de la necesaria." },
        { text: "Realizo una revisión periódica de las configuraciones de privacidad y seguridad en mis aplicaciones y dispositivos", tooltip: "Revisar las configuraciones de privacidad asegura que sus datos estén bien protegidos." },
        { text: "Entiendo qué es y evito ser víctima del shoulder surfing.", tooltip: "El shoulder surfing es cuando alguien observa su pantalla sin su conocimiento para obtener información confidencial." },
        { text: "Entiendo qué son y estoy alerta ante ataques de phishing", tooltip: "Los ataques de phishing buscan engañarlo para que comparta datos sensibles o descargue malware." },
        { text: "Entiendo qué es y estoy alerta al stalkerware", tooltip: "El stalkerware es software diseñado para espiar sus actividades sin su consentimiento." },
        { text: "Entiendo qué es y estoy alerta al malware", tooltip: "El malware puede comprometer sus dispositivos, robar información o controlar sus sistemas sin su permiso." },
        { text: "Estoy alerta de los ataques de ransomware", tooltip: "El ransomware cifra sus archivos y pide un rescate para devolver el acceso, por lo que es importante protegerse." },
        { text: "Entiendo qué son y estoy alerta ante estafas de soporte técnico y/o vishing", tooltip: "Las estafas de soporte técnico buscan engañar para robar datos o instalar malware mediante llamadas fraudulentas." },
        { text: "Entiendo qué son y estoy alerta de los ataques de ingeniería social", tooltip: "La ingeniería social manipula a las personas para que divulguen información confidencial o realicen acciones peligrosas." },
      ],
    },
  ];

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(''); 
  const [unidad, setUnidad] = useState('');
  const [answers, setAnswers] = useState(Array(sections.length).fill(null).map((_, i) => Array(sections[i].questions.length).fill(false)));
  const [currentSection, setCurrentSection] = useState(-1); // -1 es el estado inicial para pedir nombre y apellido
  const [showResults, setShowResults] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const resultRef = useRef<HTMLDivElement>(null); // Ref para capturar la sección de resultados
  
  const validarCorreo = (correo: string) => {
    // Expresión regular para validar el correo
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };


  const isSectionComplete = (sectionIndex: number) => {
    return !answers[sectionIndex].includes(''); // Si alguna respuesta está vacía, el módulo no está completo
  };

  const handleChange = (index: number, checked: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentSection][index] = checked;
    setAnswers(newAnswers);
  };

  const handleNextSection = () => {
    if (currentSection === -1) {
      if (name === '' || surname === '' || unidad === '' || email === '') {
        setShowAlert(true);
        setEmailError(''); // Resetear el error del correo si faltan otros campos
      } else if (!validarCorreo(email)) { // Validar el formato del correo
        setEmailError('Por favor ingrese un correo institucional válido.');
        setShowAlert(false); // Ocultar otras alertas
      } else {
        setEmailError(''); // No hay error, limpiar mensaje
        setShowAlert(false);
        setCurrentSection(0); // Comenzar la encuesta
      }
    } else if (currentSection >= 0 && answers[currentSection].includes('')) {
      setShowAlert(true); // Mostrar alerta si hay preguntas sin responder
    } else if (currentSection === -1 && unidad === ''){
      setShowAlert(true);
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
      const score = answers[secIndex].reduce((acc, answer) => (answer ? acc + 1 : acc), 0);
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
      const correctAnswers = answers[secIndex].reduce((acc, answer) => (answer ? acc + 1 : acc), 0);
      const totalQuestions = section.questions.length;
      const percentage = (correctAnswers / totalQuestions) * 100;
  
      return {
        section: section.title,
        percentage: percentage.toFixed(2),
        correctAnswers,
        totalQuestions,
      };
    }).sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)); // Ordena de mayor a menor porcentaje
  };

  const obtenerRecomendaciones = () => {
    let recomendacionesPersonalizadas: { categoria: string; recomendaciones: Recomendacion[], porcentaje: number }[] = [];
    
    sections.forEach((section, secIndex) => {
      let recomendacionesPorSeccion: Recomendacion[] = [];
      let correctAnswers = 0;
  
      section.questions.forEach((question, questionIndex) => {
        // Contamos las respuestas correctas
        if (answers[secIndex][questionIndex]) {
          correctAnswers += 1;
        } else {
          const recomendacion = recomendacionesPorPregunta[section.title]?.[questionIndex];
          if (recomendacion) {
            recomendacionesPorSeccion.push(recomendacion);
          }
        }
      });
  
      const totalQuestions = section.questions.length;
      const porcentaje = (correctAnswers / totalQuestions) * 100;
  
      if (recomendacionesPorSeccion.length > 0) {
        recomendacionesPersonalizadas.push({
          categoria: section.title,
          recomendaciones: recomendacionesPorSeccion,
          porcentaje: parseFloat(porcentaje.toFixed(2)), // Redondear a dos decimales
        });
      }
    });
  
    // Ordenar por porcentaje de aciertos de mayor a menor
    return recomendacionesPersonalizadas.sort((a, b) => b.porcentaje - a.porcentaje);
  };
  
  
  

  const calculateMeanPercentage = () => {
    const percentages = calculatePercentages();
    const totalPercentage = percentages.reduce((acc, item) => acc + parseFloat(item.percentage), 0);
    return totalPercentage / percentages.length;
  };
  
  const getClassification = (meanPercentage: number) => {
    if (meanPercentage <= 25) {
      return "Novato ingenuo";
    } else if (meanPercentage <= 50) {
      return "Examinador tradicional";
    } else if (meanPercentage <= 75) {
      return "Inconformista flexible";
    } else {
      return "Colaborador confiable";
    }
  };

  const meanPercentage = calculateMeanPercentage();
  const classification = getClassification(meanPercentage);

  

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
  
        pdf.save(`${name}_${surname}_${unidad}_Resultados.pdf`);
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
            Defensa Digital Individual en Seguridad de la Información (DDISI)
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Bienvenido(a) a DDISI
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
            Desarrollado por Alejandro Salgar  - alejandro.salgar@medellin.gov.co
          </Typography>
          <Typography variant="body2" paragraph>
            Supervisado por Jorge Iván Brand Ortíz - Subsecretaria de Tesoreria - Secretaria de Hacienda
          </Typography>
          <Typography variant="body2" paragraph>
            Asesoria conceptual por Javier Durán - javier.duran@medellin.gov.co
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
          <TextField
            label="Correo Institucional"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            error={!!emailError} // Mostrar error si el estado de error no está vacío
            helperText={emailError} // Mostrar el mensaje de error
          />
          {showAlert && (
            <Alert severity="warning" onClose={() => setShowAlert(false)}>
              Por favor, ingrese su nombre y apellido para continuar.
            </Alert>
          )}
          <Typography variant="h4" gutterBottom>
            Seleccione la unidad a la que pertenece 
          </Typography>
          <Select
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            displayEmpty
            fullWidth
            required
          >
            <MenuItem value="" disabled>
              Seleccione una unidad
            </MenuItem>
            <MenuItem value="Control y riesgos">Control y riesgos</MenuItem>
            <MenuItem value="Inversiones">inversiones</MenuItem>
            <MenuItem value="Caja">caja</MenuItem>
            <MenuItem value="Caja - pagos">Caja - pagos</MenuItem>
            <MenuItem value="Caja - recaudos">Caja - recaudos</MenuItem>
            <MenuItem value="Cobranza - coactivo">Cobranza - coactivo</MenuItem>
            <MenuItem value="Cobranza - fp">Cobranza - fp</MenuItem>
            <MenuItem value="Cobranza - concursales">cobranza - concursales</MenuItem>
            <MenuItem value="Cobranza - persuasivo">cobranza - persuasivo</MenuItem>
            <MenuItem value="Despacho">Despacho</MenuItem>
          </Select>
          {showAlert && (
            <Alert severity="warning" onClose={() => setShowAlert(false)}>
              Por favor, seleccione la unidad a la que pertenece.
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
          <Box display="grid" gridTemplateColumns="1fr" gap={2}>
            {sections[currentSection].questions.map((question, index) => (
              <Box key={index}>
                <Tooltip title={question.tooltip} arrow>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={answers[currentSection][index]}
                        onChange={(e) => handleChange(index, e.target.checked)}
                      />
                    }
                    label={question.text}
                  />
                </Tooltip>
              </Box>
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
          <Typography variant="h5" gutterBottom>
            Clasificación: {classification} ({meanPercentage.toFixed(2)}%)
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
          <ResponsiveContainer width="100%" height={350}>
          <BarChart data={calculatePercentages()} margin={{ top: 0, right: 30, left: 30, bottom: 115 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="section" angle={-45} textAnchor="end" />
            <YAxis />
            <RechartsTooltip />
            <Bar dataKey="percentage" fill="#8884d8" />
          </BarChart>

          </ResponsiveContainer>

          {shouldShowRecomendations(calculatePercentages()) && (
            <Box marginTop={4}>
              <Typography variant="h5" gutterBottom>
                Recomendaciones Personalizadas
              </Typography>
              {obtenerRecomendaciones().map((sectionResult, index) => (
                <Box key={index} marginBottom={2}>
                  <Typography variant="h6">
                    {sectionResult.categoria} ({sectionResult.porcentaje}% )
                  </Typography>
                  <ul>
                    {sectionResult.recomendaciones.map((rec, i) => (
                      <li key={i}>
                        <Typography variant="body1">
                          {rec.texto}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              ))}
            </Box>
          )}



          {/* Botón para generar el archivo Excel */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => generarExcel(
              name, 
              surname, 
              unidad,
              email,
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

