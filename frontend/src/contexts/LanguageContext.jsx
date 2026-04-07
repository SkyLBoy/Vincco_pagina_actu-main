import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  es: {
    // Navbar
    nav: {
      home: 'Inicio',
      about: 'Quiénes Somos',
      services: 'Servicios',
      solutions: 'Soluciones',
      distinguishes: 'Qué Nos Distingue',
      backing: 'Qué Nos Respalda',
      contact: 'Contactar',
      jobs: '¿Buscas Trabajo?'
    },
    // Hero
    hero: {
      tagline: 'Centro de Contacto',
      headline: 'Somos el vínculo perfecto',
      headlineSub: 'entre usted y sus clientes',
      description: 'Dirigido a todos aquellos proveedores de productos y/o servicios que deseen potencializar el acercamiento con sus clientes a través una atención cálida de nuestros ASESORES TELEFÓNICOS CALIFICADOS, respaldados con infraestructura y tecnología de punta, dando como resultado la satisfacción de las necesidades de sus clientes.',
      cta: 'Solicitar información',
      ctaSecondary: 'Ver servicios',
      card1Title: 'Atención 24/7',
      card1Desc: 'Servicio continuo para tus clientes',
      card2Title: '+500 Agentes',
      card2Desc: 'Personal altamente capacitado',
      card3Title: 'Seguridad',
      card3Desc: 'Altos estándares de protección',
      card4Title: 'Tecnología',
      card4Desc: 'Infraestructura de punta',
      badge: '+15 años de experiencia'
    },
    // About
    about: {
      title: 'Quiénes Somos',
      subtitle: 'Tu aliado estratégico en atención al cliente',
      description: 'Ofrecemos un servicio personalizado y adaptado a las necesidades de cada cliente. Somos especialistas en crear conexiones significativas entre las empresas y sus clientes a través de soluciones de contact center de clase mundial.',
      mission: 'Nuestra Misión',
      missionText: 'Ser el vínculo perfecto entre las empresas y sus clientes, brindando atención de calidad que genere satisfacción y fidelización.',
      vision: 'Nuestra Visión',
      visionText: 'Ser reconocidos como el centro de contacto líder en México por nuestra excelencia operativa e innovación tecnológica.'
    },
    // Services
    services: {
      title: 'Servicios Personalizados',
      subtitle: 'Ofrecemos un servicio personalizado y adaptado a las necesidades de cada cliente',
      phone: {
        title: 'Atención Telefónica',
        description: 'Con nuestros servicios de atención de calidad ante: reclamos, consultas, dudas, sugerencias, cambios o nuevas adquisiciones que sus clientes deseen realizar, con la intención de crear impresiones positivas antes sus clientes.'
      },
      telemarketing: {
        title: 'Telemarketing',
        description: 'A través de la interacción telefónica mantenemos informados a tus clientes o potenciales para informarles de las promociones y ofertas comerciales de tus productos o servicios con el fin de aumentar sus ventas.'
      },
      support: {
        title: 'Soporte Técnico',
        description: 'Damos respuesta o solución a las consultas o problemas que sus clientes puedan experimentar en relación al uso o consumo de productos que adquirieron.'
      },
      collections: {
        title: 'Cobranza',
        description: 'Con nuestro personal capacitado y mediante esquema de acciones correctivas y preventivas recuperamos activos y bajamos al máximo la antigüedad de las cuentas por cobrar de tu empresa.'
      }
    },
    // Solutions
    solutions: {
      title: 'Soluciones',
      subtitle: 'Servicios de contacto adaptados a tu negocio',
      question: '¿Tienes alguna duda? Contáctanos',
      withAgent: 'Servicios de Contacto con Agente',
      withoutAgent: 'Servicios de Contacto sin Agente',
      calls: {
        title: 'Llamadas',
        description: 'Atención personalizada de llamadas entrantes y salientes.'
      },
      chat: {
        title: 'Chat',
        description: 'Por medio de esta función estamos en contacto directo con tus clientes a través de tu página web atendiendo sus necesidades.'
      },
      email: {
        title: 'Atención a Email',
        description: 'Permite a tus clientes por medio de correo electrónico obtener una respuesta eficiente, inmediata y de calidad.'
      },
      backoffice: {
        title: 'Back Office',
        description: 'Gestiones administrativas que se realizan generalmente una vez finalizada la llamada con tu cliente, la cual ha podido generar una reclamación, consulta, solicitud, etc.'
      },
      social: {
        title: 'Atención a Redes Sociales',
        description: 'Atención y respuesta de notificaciones de redes sociales.'
      },
      blasting: {
        title: 'Blasting',
        description: 'Distribución masiva de mensajes de voz previamente grabados, de manera simultánea a gran cantidad de receptores.'
      },
      mailing: {
        title: 'Mailing',
        description: 'Envío de información por correo a un gran número de personas de manera directa, personalizada y programable.'
      },
      sms: {
        title: 'SMS',
        description: 'Envíos masivos de mensajes de texto que pueden o no ser personalizados según sea el requerimiento.'
      },
      ivr: {
        title: 'IVR',
        description: 'Pre atención que permite a una persona interactuar sobre un menú de voz mediante las teclas del teléfono.'
      }
    },
    // Distinguishes
    distinguishes: {
      title: 'Qué Nos Distingue',
      subtitle: 'Nuestros diferenciadores nos convierten en tu mejor aliado',
      items: [
        'Personal motivado y altamente capacitado',
        'Altos estándares de seguridad en la información',
        'Unificación de todos tus canales de contacto',
        'Acceso inmediato a la información',
        'Detección de las necesidades de tus clientes',
        'Propuestas periódicas de mejoras'
      ]
    },
    // Backing
    backing: {
      title: 'Qué Nos Respalda',
      subtitle: 'Infraestructura y tecnología de clase mundial',
      technology: {
        title: 'Tecnología de Punta',
        description: 'Sistemas CRM, IVR y plataformas omnicanal de última generación.'
      },
      infrastructure: {
        title: 'Infraestructura Robusta',
        description: 'Data centers con alta disponibilidad y redundancia.'
      },
      team: {
        title: 'Equipo Profesional',
        description: 'Asesores telefónicos calificados y en constante capacitación.'
      },
      security: {
        title: 'Seguridad Certificada',
        description: 'Protocolos de seguridad empresarial para proteger tu información.'
      },
      division: 'Una división de'
    },
    // Contact Form
    contact: {
      title: '¿Necesitas ayuda?',
      subtitle: 'Contáctanos y descubre cómo podemos ayudarte',
      name: 'Nombre completo',
      email: 'Correo electrónico',
      company: 'Empresa',
      phone: 'Teléfono',
      message: 'Mensaje',
      messagePlaceholder: '¿Cómo podemos ayudarte?',
      submit: 'Enviar',
      sending: 'Enviando...',
      success: '¡Mensaje enviado!',
      successMessage: 'Nos pondremos en contacto contigo pronto.',
      error: 'Error al enviar',
      errorMessage: 'Por favor intenta de nuevo.'
    },
    // Footer
    footer: {
      rights: 'Todos los derechos reservados',
      division: 'Una división de'
    }
  },
  en: {
    // Navbar
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      solutions: 'Solutions',
      distinguishes: 'What Sets Us Apart',
      backing: 'Our Backing',
      contact: 'Contact',
      jobs: 'Looking for a Job?'
    },
    // Hero
    hero: {
      tagline: 'Contact Center',
      headline: 'We are the perfect link',
      headlineSub: 'between you and your customers',
      description: 'Aimed at all providers of products and/or services who wish to enhance their approach to their customers through warm attention from our QUALIFIED TELEPHONE ADVISORS, backed by cutting-edge infrastructure and technology, resulting in the satisfaction of your customers\' needs.',
      cta: 'Request information',
      ctaSecondary: 'View services',
      card1Title: '24/7 Support',
      card1Desc: 'Continuous service for your clients',
      card2Title: '+500 Agents',
      card2Desc: 'Highly trained staff',
      card3Title: 'Security',
      card3Desc: 'High protection standards',
      card4Title: 'Technology',
      card4Desc: 'Cutting-edge infrastructure',
      badge: '+15 years of experience',
    },
    // About
    about: {
      title: 'About Us',
      subtitle: 'Your strategic ally in customer service',
      description: 'We offer a personalized service adapted to the needs of each client. We are specialists in creating meaningful connections between companies and their customers through world-class contact center solutions.',
      mission: 'Our Mission',
      missionText: 'To be the perfect link between companies and their customers, providing quality service that generates satisfaction and loyalty.',
      vision: 'Our Vision',
      visionText: 'To be recognized as the leading contact center in Mexico for our operational excellence and technological innovation.'
    },
    // Services
    services: {
      title: 'Personalized Services',
      subtitle: 'We offer a personalized service adapted to the needs of each client',
      phone: {
        title: 'Phone Support',
        description: 'With our quality service for: claims, inquiries, doubts, suggestions, changes or new acquisitions that your customers wish to make, with the intention of creating positive impressions for your customers.'
      },
      telemarketing: {
        title: 'Telemarketing',
        description: 'Through telephone interaction we keep your customers or prospects informed about promotions and commercial offers of your products or services in order to increase your sales.'
      },
      support: {
        title: 'Technical Support',
        description: 'We provide response or solution to queries or problems that your customers may experience in relation to the use or consumption of products they acquired.'
      },
      collections: {
        title: 'Collections',
        description: 'With our trained staff and through a scheme of corrective and preventive actions, we recover assets and minimize the age of your company\'s accounts receivable.'
      }
    },
    // Solutions
    solutions: {
      title: 'Solutions',
      subtitle: 'Contact services adapted to your business',
      question: 'Have any questions? Contact us',
      withAgent: 'Contact Services with Agent',
      withoutAgent: 'Contact Services without Agent',
      calls: {
        title: 'Calls',
        description: 'Personalized attention for inbound and outbound calls.'
      },
      chat: {
        title: 'Chat',
        description: 'Through this function we are in direct contact with your customers through your website, attending to their needs.'
      },
      email: {
        title: 'Email Support',
        description: 'Allow your customers to receive an efficient, immediate and quality response via email.'
      },
      backoffice: {
        title: 'Back Office',
        description: 'Administrative tasks that are generally performed once the call with your client has ended, which may have generated a claim, query, request, etc.'
      },
      social: {
        title: 'Social Media Support',
        description: 'Attention and response to social media notifications.'
      },
      blasting: {
        title: 'Blasting',
        description: 'Mass distribution of pre-recorded voice messages, simultaneously to a large number of recipients.'
      },
      mailing: {
        title: 'Mailing',
        description: 'Sending information by mail to a large number of people in a direct, personalized and programmable way.'
      },
      sms: {
        title: 'SMS',
        description: 'Mass text message sending that can be personalized or not according to requirement.'
      },
      ivr: {
        title: 'IVR',
        description: 'Pre-attention that allows a person to interact on a voice menu using the telephone keys.'
      }
    },
    // Distinguishes
    distinguishes: {
      title: 'What Sets Us Apart',
      subtitle: 'Our differentiators make us your best ally',
      items: [
        'Motivated and highly trained staff',
        'High information security standards',
        'Unification of all your contact channels',
        'Immediate access to information',
        'Detection of your customers\' needs',
        'Periodic improvement proposals'
      ]
    },
    // Backing
    backing: {
      title: 'Our Backing',
      subtitle: 'World-class infrastructure and technology',
      technology: {
        title: 'Cutting-Edge Technology',
        description: 'CRM systems, IVR and state-of-the-art omnichannel platforms.'
      },
      infrastructure: {
        title: 'Robust Infrastructure',
        description: 'Data centers with high availability and redundancy.'
      },
      team: {
        title: 'Professional Team',
        description: 'Qualified telephone advisors in constant training.'
      },
      security: {
        title: 'Certified Security',
        description: 'Enterprise security protocols to protect your information.'
      },
      division: 'A division of'
    },
    // Contact Form
    contact: {
      title: 'Need help?',
      subtitle: 'Contact us and discover how we can help you',
      name: 'Full name',
      email: 'Email',
      company: 'Company',
      phone: 'Phone',
      message: 'Message',
      messagePlaceholder: 'How can we help you?',
      submit: 'Send',
      sending: 'Sending...',
      success: 'Message sent!',
      successMessage: 'We will contact you soon.',
      error: 'Error sending',
      errorMessage: 'Please try again.'
    },
    // Footer
    footer: {
      rights: 'All rights reserved',
      division: 'A division of'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('vincco-language');
    return saved || 'es';
  });

  useEffect(() => {
    localStorage.setItem('vincco-language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const tArray = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return Array.isArray(value) ? value : [];
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, tArray }}>
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
