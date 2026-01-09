import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es' | 'ca';

type Translations = {
  header: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
  hero: {
    title: string;
    role: string;
    subrole: string;
    ctaProject: string;
    ctaContact: string;
  };
  about: {
    title: string;
    subtitle: string;
    locationTitle: string;
    locationDesc: string;
    studiesTitle: string;
    studiesDesc: string;
    profileTitle: string;
    profileDesc: string;
    langTitle: string;
    langDesc: string;
    bio1: string;
    bio2: string;
    bio3: string;
  };
  skills: {
    title: string;
    subtitle: string;
    core: string;
    mobile: string;
    backend: string;
    cloud: string;
    additional: string;
  };
  projects: {
    title: string;
    subtitle: string;
    footballTitle: string;
    footballDesc: string;
    citadelTitle: string;
    citadelDesc: string;
    portfolioTitle: string;
    portfolioDesc: string;
    gameTitle: string;
    gameDesc: string;
    more: string;
    contact: string;
    demo: string;
    code: string;
  };
  contact: {
    title: string;
    subtitle: string;
    infoTitle: string;
    whyTitle: string;
    why1: string;
    why2: string;
    why3: string;
    why4: string;
    formTitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    location: string;
    phone: string;
  };
  footer: {
    rights: string;
  };
};

const translations: Record<Language, Translations> = {
  en: {
    header: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      title: "Joan Medina",
      role: "Software Developer & Creative Technologist",
      subrole: "Multimedia Creator | 3D Artist | DJ",
      ctaProject: "View Projects",
      ctaContact: "Contact Me",
    },
    about: {
      title: "About",
      subtitle: "Software Engineer specialized in scalable and creative solutions",
      locationTitle: "Location",
      locationDesc: "Barcelona, Spain (Ireland Experience)",
      studiesTitle: "Education",
      studiesDesc: "Software Engineering - La Salle Bonanova (2026)",
      profileTitle: "Profile",
      profileDesc: "Full Stack, Cloud (AWS) & 3D Dev",
      langTitle: "Languages",
      langDesc: "Native ES/CAT, Advanced English (C1/C2)",
      bio1: "Final year Software Engineer at La Salle Bonanova with real-world experience in the full development cycle, from C architecture to App Store deployment.",
      bio2: "I specialize in creating scalable solutions, network management (CCNA), and Cloud environments (AWS). I combine technical rigor with digital creativity, having experience in game development and 3D web.",
      bio3: "In addition to my technical profile, I have a consolidated career as a Professional DJ, which has given me key skills in event management, personal branding, and problem-solving under pressure.",
    },
    skills: {
      title: "Technical Skills",
      subtitle: "Versatile profile mastering low and high-level languages",
      core: "Core Programming",
      mobile: "Mobile & Web 3D",
      backend: "Backend & Data",
      cloud: "Cloud & Network",
      additional: "Additional Technologies",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "From distributed systems in C to commercial mobile apps",
      footballTitle: "Social Football App",
      footballDesc: "Social network for team management published on the App Store. Global state architecture with Redux, real-time persistence, and full deployment cycle management on Apple.",
      citadelTitle: "The Citadel System (OS)",
      citadelDesc: "Multi-client distributed system designed in C. Concurrency management, Unix sockets, shared memory, and mutual exclusion mechanisms for high robustness.",
      portfolioTitle: "Interactive 3D Portfolio",
      portfolioDesc: "Immersive web with 3D model integration and custom shaders. Rendering optimization for mobile web and desktop using React Three Fiber.",
      gameTitle: "Professional 3D Game",
      gameDesc: "3D video game developed in Unity implementing advanced mechanics, particle systems, and complex physics logic in C#.",
      more: "More Projects in Development",
      contact: "Contact me to see more",
      demo: "View Demo",
      code: "Code",
    },
    contact: {
      title: "Let's Talk?",
      subtitle: "Available for development opportunities and collaborations",
      infoTitle: "Contact Info",
      whyTitle: "Why work with me?",
      why1: "Creative approach combined with solid technical skills",
      why2: "Experience in full projects from concept to implementation",
      why3: "Passion for learning new technologies and methodologies",
      why4: "Ability to work on both frontend and backend",
      formTitle: "Send me a Message",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      location: "Barcelona, Spain",
      phone: "Available for calls",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  es: {
    header: {
      home: "Inicio",
      about: "Sobre Mí",
      skills: "Habilidades",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      title: "Joan Medina",
      role: "Desarrollador de Software & Tecnólogo Creativo",
      subrole: "Creador Multimedia | Artista 3D | DJ",
      ctaProject: "Ver Proyectos",
      ctaContact: "Contacto",
    },
    about: {
      title: "Sobre Mí",
      subtitle: "Ingeniero de Software especializado en soluciones escalables y creativas",
      locationTitle: "Ubicación",
      locationDesc: "Barcelona, España (Experiencia en Irlanda)",
      studiesTitle: "Estudios",
      studiesDesc: "Ingeniería de Software - La Salle Bonanova (2026)",
      profileTitle: "Perfil",
      profileDesc: "Full Stack, Cloud (AWS) & 3D Dev",
      langTitle: "Idiomas",
      langDesc: "Nativo ES/CAT, Inglés Avanzado (C1/C2)",
      bio1: "Ingeniero de Software en último año por La Salle Bonanova con experiencia real en el ciclo completo de desarrollo, desde la arquitectura en C hasta el despliegue de aplicaciones en la App Store.",
      bio2: "Me especializo en la creación de soluciones escalables, gestión de redes (CCNA) y entornos Cloud (AWS). Combino rigor técnico con creatividad digital, teniendo experiencia en desarrollo de videojuegos y web 3D.",
      bio3: "Además de mi perfil técnico, tengo una trayectoria consolidada como DJ Profesional, lo que me ha aportado habilidades clave en gestión de eventos, marca personal y resolución de problemas bajo presión.",
    },
    skills: {
      title: "Habilidades Técnicas",
      subtitle: "Perfil polivalente con dominio de lenguajes de bajo y alto nivel",
      core: "Programación Core",
      mobile: "Móvil y Web 3D",
      backend: "Backend y Datos",
      cloud: "Nube y Redes",
      additional: "Tecnologías Adicionales",
    },
    projects: {
      title: "Proyectos Destacados",
      subtitle: "Desde sistemas distribuidos en C hasta aplicaciones móviles comerciales",
      footballTitle: "Social Football App",
      footballDesc: "Red social para gestión de equipos publicada en App Store. Arquitectura de estado global con Redux, persistencia en tiempo real y gestión completa del ciclo de despliegue en Apple.",
      citadelTitle: "The Citadel System (OS)",
      citadelDesc: "Sistema distribuido multicliente diseñado en C. Gestión de concurrencia, sockets Unix, memoria compartida y mecanismos de exclusión mutua para alta robustez.",
      portfolioTitle: "Portfolio Web 3D Interactivo",
      portfolioDesc: "Web inmersiva con integración de modelos 3D y shaders personalizados. Optimización de renderizado para web móvil y escritorio usando React Three Fiber.",
      gameTitle: "Juego 3D Profesional",
      gameDesc: "Videojuego 3D desarrollado en Unity implementando mecánicas avanzadas, sistemas de partículas y lógica de físicas compleja en C#.",
      more: "Más Proyectos en Desarrollo",
      contact: "Contáctame para ver más",
      demo: "Ver Demo",
      code: "Código",
    },
    contact: {
      title: "¿Hablamos?",
      subtitle: "Disponible para oportunidades de desarrollo y colaboraciones",
      infoTitle: "Información de Contacto",
      whyTitle: "¿Por qué trabajar conmigo?",
      why1: "Enfoque creativo combinado con habilidades técnicas sólidas",
      why2: "Experiencia en proyectos completos desde el concepto hasta la implementación",
      why3: "Pasión por aprender nuevas tecnologías y metodologías",
      why4: "Capacidad para trabajar tanto en frontend como en backend",
      formTitle: "Envíame un Mensaje",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar Mensaje",
      location: "Barcelona, España",
      phone: "Disponible para llamadas",
    },
    footer: {
      rights: "Todos los derechos reservados.",
    },
  },
  ca: {
    header: {
      home: "Inici",
      about: "Sobre Mi",
      skills: "Habilitats",
      projects: "Projectes",
      contact: "Contacte",
    },
    hero: {
      title: "Joan Medina",
      role: "Desenvolupador de Programari i Tecnòleg Creatiu",
      subrole: "Creador Multimèdia | Artista 3D | DJ",
      ctaProject: "Veure Projectes",
      ctaContact: "Contacte",
    },
    about: {
      title: "Sobre Mi",
      subtitle: "Enginyer de Programari especialitzat en solucions escalables i creatives",
      locationTitle: "Ubicació",
      locationDesc: "Barcelona, Espanya (Experiència a Irlanda)",
      studiesTitle: "Estudis",
      studiesDesc: "Enginyeria de Programari - La Salle Bonanova (2026)",
      profileTitle: "Perfil",
      profileDesc: "Full Stack, Cloud (AWS) i 3D Dev",
      langTitle: "Idiomes",
      langDesc: "Natiu ES/CAT, Anglès Avançat (C1/C2)",
      bio1: "Enginyer de Programari en últim any per La Salle Bonanova amb experiència real en el cicle complet de desenvolupament, des de l'arquitectura en C fins al desplegament d'aplicacions a l'App Store.",
      bio2: "M'especialitzo en la creació de solucions escalables, gestió de xarxes (CCNA) i entorns Cloud (AWS). Combino rigor tècnic amb creativitat digital, tenint experiència en desenvolupament de videojocs i web 3D.",
      bio3: "A més del meu perfil tècnic, tinc una trajectòria consolidada com a DJ Professional, fet que m'ha aportat habilitats clau en gestió d'esdeveniments, marca personal i resolució de problemes sota pressió.",
    },
    skills: {
      title: "Habilitats Tècniques",
      subtitle: "Perfil polivalent amb domini de llenguatges de baix i alt nivell",
      core: "Programació Core",
      mobile: "Mòbil i Web 3D",
      backend: "Backend i Dades",
      cloud: "Núvol i Xarxes",
      additional: "Tecnologies Addicionals",
    },
    projects: {
      title: "Projectes Destacats",
      subtitle: "Des de sistemes distribuïts en C fins a aplicacions mòbils comercials",
      footballTitle: "Social Football App",
      footballDesc: "Xarxa social per a gestió d'equips publicada a l'App Store. Arquitectura d'estat global amb Redux, persistència en temps real i gestió completa del cicle de desplegament a Apple.",
      citadelTitle: "The Citadel System (OS)",
      citadelDesc: "Sistema distribuït multiclient dissenyat en C. Gestió de concurrència, sockets Unix, memòria compartida i mecanismes d'exclusió mútua per a alta robustesa.",
      portfolioTitle: "Portfolio Web 3D Interactiu",
      portfolioDesc: "Web immersiva amb integració de models 3D i shaders personalitzats. Optimització de renderitzat per a web mòbil i escriptori utilitzant React Three Fiber.",
      gameTitle: "Joc 3D Professional",
      gameDesc: "Videojoc 3D desenvolupat en Unity implementant mecàniques avançades, sistemes de partícules i lògica de físiques complexa en C#.",
      more: "Més Projectes en Desenvolupament",
      contact: "Contacta'm per veure més",
      demo: "Veure Demo",
      code: "Codi",
    },
    contact: {
      title: "Parlem?",
      subtitle: "Disponible per a oportunitats de desenvolupament i col·laboracions",
      infoTitle: "Informació de Contacte",
      whyTitle: "Per què treballar amb mi?",
      why1: "Enfocament creatiu combinat amb habilitats tècniques sòlides",
      why2: "Experiència en projectes complets des del concepte fins a la implementació",
      why3: "Passió per aprendre noves tecnologies i metodologies",
      why4: "Capacitat per treballar tant en frontend com en backend",
      formTitle: "Envia'm un Missatge",
      name: "Nom",
      email: "Email",
      message: "Missatge",
      send: "Enviar Missatge",
      location: "Barcelona, Espanya",
      phone: "Disponible per a trucades",
    },
    footer: {
      rights: "Tots els drets reservats.",
    },
  },
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
} | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en'); // Default English

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

