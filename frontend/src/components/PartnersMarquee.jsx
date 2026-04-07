import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

// Logos de socios tecnológicos
const partners = [
  { 
    name: 'Microsoft', 
    logo: 'https://www.microsoft.com/favicon.ico',
    filter: false
  },
  { 
    name: 'Dell EMC', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
    filter: false  
  },
  { 
    name: 'Kaspersky', 
    logo: '/img/kaspersky-logo.png',
    filter: false
  },
  { 
    name: 'HP', 
    logo: '/img/logo-hp.jpg',
    filter: false
  },
  { 
    name: 'CT Internacionales', 
    logo: 'https://vincco.com/static/imgs/logo/logo-ct.png',
    filter: true
  },
];

export const PartnersMarquee = () => {
  const { language } = useLanguage();

  const title = language === 'es' 
    ? 'Respaldados por líderes tecnológicos' 
    : 'Backed by technology leaders';

  return (
    <section className="bg-[#0F172A] py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs font-medium text-slate-400 mb-4 uppercase tracking-wider"
        >
          {title}
        </motion.p>
      </div>
      
      {/* Marquee Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0F172A] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0F172A] to-transparent z-10" />
        
        {/* Marquee Animation - Right to Left */}
        <motion.div
          animate={{ x: [0, -1500] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
          className="flex items-center gap-16"
        >
          {/* Double the logos for seamless loop */}
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`partner-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-12 min-w-[140px]"
              data-testid={`partner-logo-${index}`}
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className={`h-9 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity ${
                  partner.filter ? 'filter brightness-0 invert' : ''
                }`}
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
