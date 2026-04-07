import { motion } from 'framer-motion';
import { Phone, Megaphone, Wrench, Wallet, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const services = [
  { key: 'phone', icon: Phone, color: 'from-[#04608E] to-[#1A4277]' },
  { key: 'telemarketing', icon: Megaphone, color: 'from-[#1EC2D7] to-[#04608E]' },
  { key: 'support', icon: Wrench, color: 'from-[#1A4277] to-[#04608E]' },
  { key: 'collections', icon: Wallet, color: 'from-[#04608E] to-[#1EC2D7]' }
];

export const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-16 md:py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#1EC2D7] font-semibold text-sm uppercase tracking-wider mb-2 px-4 py-1 bg-[#1EC2D7]/10 rounded-full">02</span>
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight mt-3 mb-3">
            {t('services.title')}
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Compact Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div 
                className="group relative h-full p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                data-testid={`service-card-${service.key}`}
              >
                {/* Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="font-outfit text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#04608E] transition-colors">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                  {t(`services.${service.key}.description`)}
                </p>

                {/* Hover Arrow */}
                <div className="mt-4 flex items-center gap-1 text-[#1EC2D7] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Ver más</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Background Gradient on Hover */}
                <div className={`absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-full blur-2xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
