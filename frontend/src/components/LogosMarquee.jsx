import { motion } from 'framer-motion';
import { Building2, Briefcase, Store, Factory, Building, Landmark, ShoppingBag, Truck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const companies = [
  { name: 'TechCorp', icon: Building2 },
  { name: 'Grupo Empresarial', icon: Briefcase },
  { name: 'RetailMax', icon: Store },
  { name: 'Industrial MX', icon: Factory },
  { name: 'Corporativo Plus', icon: Building },
  { name: 'Finanzas Global', icon: Landmark },
  { name: 'Commerce Pro', icon: ShoppingBag },
  { name: 'Logística Express', icon: Truck },
];

export const LogosMarquee = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-[#F8FAFC] border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-slate-500 mb-8"
        >
          {t('logos.trustedBy')}
        </motion.p>
      </div>
      
      {/* Marquee Container */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />
        
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
          className="flex gap-12"
        >
          {/* First Set */}
          {[...companies, ...companies, ...companies, ...companies].map((company, index) => (
            <div
              key={`company-${index}`}
              className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-slate-200/50 shadow-sm min-w-fit"
              data-testid={`logo-placeholder-${index}`}
            >
              <company.icon className="w-6 h-6 text-[#04608E]" />
              <span className="text-slate-600 font-medium whitespace-nowrap">{company.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Note for client */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <p className="text-center text-xs text-slate-400">
          * Espacio reservado para logos de clientes reales
        </p>
      </div>
    </section>
  );
};
