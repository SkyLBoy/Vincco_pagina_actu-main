import { motion } from 'framer-motion';
import { Users, Shield, Layers, Clock, BarChart2, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const benefits = [
  { key: 'staff', icon: Users },
  { key: 'security', icon: Shield },
  { key: 'omnichannel', icon: Layers },
  { key: 'realtime', icon: Clock },
  { key: 'analytics', icon: BarChart2 },
  { key: 'results', icon: Target },
];

const stats = [
  { key: 'satisfaction', value: '98%' },
  { key: 'efficiency', value: '+35%' },
  { key: 'costReduction', value: '-25%' },
];

export const Benefits = () => {
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
    <section id="benefits" className="py-20 md:py-32 bg-[#1A4277]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            {t('benefits.title')}
          </h2>
          <p className="text-base lg:text-lg text-white/70 max-w-2xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16"
        >
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center"
              data-testid={`stat-${stat.key}`}
            >
              <p className="text-4xl md:text-5xl font-bold text-[#1EC2D7] mb-2">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-white/70">
                {t(`benefits.stats.${stat.key}`)}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.key}
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              data-testid={`benefit-card-${benefit.key}`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#1EC2D7]/20 flex items-center justify-center mb-4 group-hover:bg-[#1EC2D7]/30 transition-colors">
                <benefit.icon className="w-6 h-6 text-[#1EC2D7]" />
              </div>
              <h3 className="font-outfit text-lg font-semibold text-white mb-2">
                {t(`benefits.${benefit.key}.title`)}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {t(`benefits.${benefit.key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
