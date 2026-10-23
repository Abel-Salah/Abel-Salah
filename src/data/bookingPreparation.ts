export const bookingPreparation = {
  fr: {
    description: "Les prochaines étapes pour profiter de votre session avec Abel SALAH.",
    emailTitle: "Votre email de confirmation fait référence.",
    email: "Vous y trouverez la date, l’heure, le lien de visioconférence et les informations pour modifier votre réservation. Si vous venez de réserver, vérifiez aussi vos courriers indésirables.",
    prepare: "À préparer en 5 minutes",
    note: "Vos cases cochées restent sur cette page : rien n’est envoyé. Aucun document confidentiel ni donnée personnelle de vos clients n’est nécessaire.",
    back: "Retour à ma page", help: "Pas de confirmation ou une question ?", backPath: "/card",
    call: { path: "/confirmation-rdv", title: "Préparer votre échange IA — Abel SALAH", kicker: "ÉCHANGE PERSONNALISÉ · 30 MIN", confirmed: "Votre rendez-vous est réservé !", heading: "Préparez notre échange", intro: "Trois éléments simples pour un échange utile, centré sur vos priorités.", items: [
      ["Présentez votre activité", "Votre entreprise, votre rôle et les outils que vous utilisez déjà. L’adresse de votre site peut suffire."],
      ["Choisissez votre principal blocage", "Une tâche chronophage ou un problème précis. Un exemple concret nous aidera davantage qu’une longue présentation."],
      ["Définissez le résultat attendu", "Gagner du temps, mieux vendre ou rendre votre équipe autonome : quelle priorité souhaitez-vous faire avancer ?"],
    ] },
    webinar: { path: "/confirmation-webinaire", title: "Préparer votre webinaire IA — Abel SALAH", kicker: "WEBINAIRE IA · 1 H EN DIRECT", confirmed: "Vous êtes inscrit au webinaire !", heading: "Préparez votre webinaire IA", intro: "Un cas concret et une question suffisent pour profiter pleinement de la session.", items: [
      ["Choisissez un cas concret", "Une tâche répétitive, un document ou une difficulté sur laquelle vous aimeriez utiliser l’IA."],
      ["Notez votre question prioritaire", "Ce que vous aimeriez comprendre ou réussir à faire après la session."],
      ["Préparez votre connexion", "Privilégiez un ordinateur, testez le son et ouvrez le lien Google Meet reçu par email quelques minutes avant."],
    ] },
  },
  en: {
    description: "Next steps to make the most of your session with Abel SALAH.",
    emailTitle: "Refer to your confirmation email.",
    email: "It contains the date, time, video meeting link and instructions to change your booking. If you have just booked, please also check your spam folder.",
    prepare: "Prepare in 5 minutes",
    note: "Your checkmarks stay on this page: nothing is sent. You do not need confidential documents or your clients’ personal information.",
    back: "Back to the website", help: "No confirmation or a question?", backPath: "/en",
    call: { path: "/en/confirmation-rdv", title: "Prepare for your AI consultation — Abel SALAH", kicker: "PERSONAL CONSULTATION · 30 MIN", confirmed: "Your appointment is booked!", heading: "Prepare for our conversation", intro: "Three simple things to make our conversation useful and focused on your priorities.", items: [
      ["Introduce your business", "Your company, your role and the tools you already use. Your website address can be enough."],
      ["Choose your main challenge", "A time-consuming task or a specific problem. A concrete example will help more than a long presentation."],
      ["Define your desired outcome", "Save time, improve sales or help your team work independently: which priority would you like to address?"],
    ] },
    webinar: { path: "/en/confirmation-webinaire", title: "Prepare for your AI webinar — Abel SALAH", kicker: "AI WEBINAR · 1 H LIVE", confirmed: "You are registered for the webinar!", heading: "Prepare for your AI webinar", intro: "A concrete example and one question are enough to make the most of the session.", items: [
      ["Choose a concrete example", "A repetitive task, document or challenge where you would like to use AI."],
      ["Write down your main question", "What you would like to understand or be able to do after the session."],
      ["Check your connection", "Preferably use a computer, test your audio and open the Google Meet link from your email a few minutes early."],
    ] },
  },
  es: {
    description: "Los próximos pasos para aprovechar tu sesión con Abel SALAH.",
    emailTitle: "Consulta tu correo de confirmación.",
    email: "Incluye la fecha, la hora, el enlace de la videollamada y las instrucciones para modificar tu reserva. Si acabas de reservar, revisa también la carpeta de spam.",
    prepare: "Prepárate en 5 minutos",
    note: "Las casillas marcadas se quedan en esta página: no se envía nada. No necesitas documentos confidenciales ni datos personales de tus clientes.",
    back: "Volver al sitio web", help: "¿No tienes la confirmación o tienes alguna pregunta?", backPath: "/es",
    call: { path: "/es/confirmation-rdv", title: "Prepara tu consulta de IA — Abel SALAH", kicker: "CONSULTA PERSONALIZADA · 30 MIN", confirmed: "¡Tu cita está reservada!", heading: "Prepara nuestra conversación", intro: "Tres elementos sencillos para una conversación útil y centrada en tus prioridades.", items: [
      ["Presenta tu actividad", "Tu empresa, tu función y las herramientas que ya utilizas. La dirección de tu sitio web puede ser suficiente."],
      ["Elige tu principal dificultad", "Una tarea que consume tiempo o un problema concreto. Un ejemplo práctico ayudará más que una presentación larga."],
      ["Define el resultado que esperas", "Ahorrar tiempo, mejorar las ventas o dar autonomía a tu equipo: ¿qué prioridad quieres abordar?"],
    ] },
    webinar: { path: "/es/confirmation-webinaire", title: "Prepara tu webinar de IA — Abel SALAH", kicker: "WEBINAR DE IA · 1 H EN DIRECTO", confirmed: "¡Estás inscrito en el webinar!", heading: "Prepara tu webinar de IA", intro: "Un caso práctico y una pregunta bastan para aprovechar la sesión.", items: [
      ["Elige un caso práctico", "Una tarea repetitiva, un documento o una dificultad en la que te gustaría utilizar la IA."],
      ["Anota tu pregunta principal", "Lo que te gustaría comprender o saber hacer después de la sesión."],
      ["Prepara tu conexión", "Utiliza preferiblemente un ordenador, comprueba el sonido y abre el enlace de Google Meet recibido por correo unos minutos antes."],
    ] },
  },
} as const;
