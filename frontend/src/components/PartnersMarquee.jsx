import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const partners = [
  { 
    name: 'Microsoft', 
    logo: '/img/microsoft-logo.png',
    filter: false
  },
  { 
    name: 'Dell EMC', 
    logo: '/img/dell-logo.png',
    filter: false,
    height: '100px'
  },
  { 
    name: 'Kaspersky', 
    logo: '/img/kaspersky-logo.png',
    filter: false
  },
  { 
    name: 'HP', 
    logo: '/img/logo-hp.png',
    filter: false,
    height: '80px'  // ajustar este valor al para cada icono
  },
  { 
    name: 'Samsung', 
    logo: '/img/samsung-logo.png',
    filter: false,
    height: '110px'  // ajustar este valor al para cada icono
  },
  { 
    name: 'CT Internacionales', 
    logo: '/img/logo-ct.png',
    filter: false
  },
];

export const PartnersMarquee = () => {
  const { language } = useLanguage();

  const title = language === 'es' 
    ? 'Nuestros Clientes' 
    : 'Our Clients';

  return (
    <section className="bg-[#0F172A] py-8 overflow-hidden">
      <div className="max-w-10xl mx-auto px-10 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-2xl font-semibold text-slate-200 mb-12 uppercase tracking-widest"
        >
          {title}
        </motion.p>
      </div>
      
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#0F172A] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#0F172A] to-transparent z-10" />
        
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
          className="flex items-center gap-24"
        >
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`partner-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-24 min-w-[160px]"
              data-testid={`partner-logo-${index}`}
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                style={partner.height ? { height: partner.height } : { height: '56px' }}
                className={`w-auto object-contain opacity-70 hover:opacity-100 transition-opacity ${
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