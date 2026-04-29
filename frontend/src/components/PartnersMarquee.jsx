import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const partners = [
  { 
    name: 'Microsoft', 
    logo: '/img/microsoft-logo.png',
    invert: true   // logo oscuro → se invierte a blanco sobre fondo azul
  },
  { 
    name: 'Dell EMC', 
    logo: '/img/dell-logo.png',
    invert: true
  },
  { 
    name: 'Kaspersky', 
    logo: '/img/kaspersky-logo.png',
    invert: true
  },
  { 
    name: 'HP', 
    logo: '/img/logo-hp.png',
    invert: true
  },
  { 
    name: 'Samsung', 
    logo: '/img/samsung-logo.png',
    invert: false  // logo ya tiene colores claros, no necesita inversión
  },
  { 
    name: 'CT Internacionales', 
    logo: '/img/logo-ct.png',
    invert: false
  },
];

const stats = {
  es: [
    { value: '+500', label: 'Agentes capacitados' },
    { value: '24/7', label: 'Atención continua' },
    { value: '+10', label: 'Años de experiencia' },
  ],
  en: [
    { value: '+500', label: 'Trained agents' },
    { value: '24/7', label: 'Continuous support' },
    { value: '+10', label: 'Years of experience' },
  ],
};

export const PartnersMarquee = () => {
  const { language } = useLanguage();

  const title = language === 'es'
    ? 'Impulsamos las campañas de empresas líderes'
    : 'We power campaigns for leading companies';

  const subtitle = language === 'es'
    ? 'Brindamos servicios de telemarketing especializados para marcas líderes, ayudando a maximizar el contacto, seguimiento y conversión de sus clientes.'
    : 'We provide specialized telemarketing services for leading brands, helping maximize contact, follow-up, and customer conversion.';

  const disclaimer = language === 'es'
    ? 'Servicios de telemarketing y seguimiento a campañas para estas marcas.'
    : 'Telemarketing and campaign follow-up services for these brands.';

  const cta = language === 'es' ? 'Solicitar información' : 'Request information';

  const currentStats = stats[language] || stats.es;

  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#04608E] to-[#1A4277] py-12 overflow-hidden relative">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header */}
      <div className="relative max-w-4xl mx-auto px-6 text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/70 text-base md:text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Logos grid — altura y estilos homologados para todos los logos */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative max-w-5xl mx-auto px-6"
      >
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center h-16 w-full"
              data-testid={`partner-logo-${partner.name}`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                style={{ height: '48px', maxWidth: '100%' }}
                className={`w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300 ${
                  partner.invert
                    ? 'brightness-0 invert grayscale hover:grayscale-0 hover:brightness-200 hover:invert-0'
                    : 'grayscale hover:grayscale-0'
                }`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center mt-6" style={{ fontSize: '0.90rem', color: '#fff' }}>
          {disclaimer}
        </p>
      </motion.div>

      {/* Divider */}
      <div className="relative max-w-3xl mx-auto px-6 mt-10">
        <div className="border-t border-white/10" />
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative max-w-3xl mx-auto px-6 mt-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {currentStats.map((stat, i) => (
            <div key={i} className="text-center md:px-10 py-2 md:py-0">
              <span className="block text-3xl font-bold text-[#1EC2D7]">{stat.value}</span>
              <span className="block text-white/70 text-sm mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative flex justify-center mt-8"
      >
        <a
          href="#contact"
          onClick={scrollToContact}
          className="inline-block bg-white text-[#04608E] hover:bg-[#1EC2D7] hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 text-sm tracking-wide shadow-lg hover:scale-[1.02] active:scale-95"
        >
          {cta} →
        </a>
      </motion.div>
    </section>
  );
};