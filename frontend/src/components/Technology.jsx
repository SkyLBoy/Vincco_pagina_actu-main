import { motion } from 'framer-motion';
import { Database, PhoneIncoming, Cloud, LineChart, Lock, Code } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const technologies = [
  { key: 'crm', icon: Database },
  { key: 'ivr', icon: PhoneIncoming },
  { key: 'cloud', icon: Cloud },
  { key: 'analytics', icon: LineChart },
  { key: 'security', icon: Lock },
  { key: 'api', icon: Code },
];

export const Technology = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section id="technology" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            {t('technology.title')}
          </h2>
          <p className="text-base lg:text-lg text-slate-500 max-w-2xl mx-auto">
            {t('technology.subtitle')}
          </p>
        </motion.div>

        {/* Technology Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.key}
              variants={itemVariants}
              className="group relative p-8 rounded-2xl bg-[#F8FAFC] border border-slate-100 hover:border-[#1EC2D7]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
              data-testid={`tech-card-${tech.key}`}
            >
              {/* Icon Container */}
              <div className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#04608E] to-[#1A4277] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <tech.icon className="w-10 h-10 text-white" />
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1EC2D7] to-[#04608E] opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
              </div>

              <h3 className="font-outfit text-xl font-bold text-[#0F172A] mb-3">
                {t(`technology.${tech.key}.title`)}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {t(`technology.${tech.key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#04608E] to-[#1A4277] relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-outfit text-2xl md:text-3xl font-bold text-white mb-4">
                Infraestructura de clase mundial
              </h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Nuestra plataforma está diseñada para manejar millones de interacciones 
                con alta disponibilidad, redundancia y seguridad empresarial.
              </p>
              <div className="flex flex-wrap gap-3">
                {['AWS', 'Docker', 'MongoDB', 'Redis', 'Kubernetes'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/90 border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-white/20 rounded w-3/4" />
                  <div className="h-4 bg-white/20 rounded w-1/2" />
                  <div className="h-4 bg-white/20 rounded w-5/6" />
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="h-16 bg-white/10 rounded-lg" />
                    <div className="h-16 bg-white/10 rounded-lg" />
                    <div className="h-16 bg-white/10 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
