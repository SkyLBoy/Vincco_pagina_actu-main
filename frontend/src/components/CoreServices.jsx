import { motion } from 'framer-motion';
import { Phone, Megaphone, Wrench, Wallet, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const services = [
  {
    key: 'phone',
    icon: Phone,
    gradient: 'from-[#04608E] to-[#1A4277]',
    size: 'lg:col-span-8 lg:row-span-2',
    featured: true
  },
  {
    key: 'telemarketing',
    icon: Megaphone,
    gradient: 'from-[#1EC2D7] to-[#04608E]',
    size: 'lg:col-span-4',
    featured: false
  },
  {
    key: 'support',
    icon: Wrench,
    gradient: 'from-[#1A4277] to-[#04608E]',
    size: 'lg:col-span-4',
    featured: false
  },
  {
    key: 'collections',
    icon: Wallet,
    gradient: 'from-[#04608E] to-[#1EC2D7]',
    size: 'lg:col-span-12',
    featured: false
  }
];

export const CoreServices = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            {t('services.title')}
          </h2>
          <p className="text-base lg:text-lg text-slate-500 max-w-2xl">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.key}
              variants={itemVariants}
              className={`group relative ${service.size}`}
            >
              <div
                className={`relative h-full min-h-[240px] ${service.featured ? 'lg:min-h-[400px]' : ''} p-6 md:p-8 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                data-testid={`service-card-${service.key}`}
              >
                {/* Background Gradient Orb */}
                <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
                
                {/* Icon */}
                <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-outfit text-xl md:text-2xl font-bold text-[#0F172A]">
                      {t(`services.${service.key}.title`)}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-[#1EC2D7] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className={`text-slate-500 leading-relaxed ${service.featured ? 'text-base md:text-lg max-w-md' : 'text-sm md:text-base'}`}>
                    {t(`services.${service.key}.description`)}
                  </p>
                </div>

                {/* Featured card extra visual */}
                {service.featured && (
                  <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-[#04608E] to-[#1EC2D7] flex items-center justify-center"
                        >
                          <span className="text-xs text-white font-medium">{i}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-slate-400">+500 agentes disponibles</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
