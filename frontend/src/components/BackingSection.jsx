import { motion } from 'framer-motion';
import { Cpu, Server, Users, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const backingItems = [
  { key: 'technology', icon: Cpu, gradient: 'from-[#04608E] to-[#1A4277]' },
  { key: 'infrastructure', icon: Server, gradient: 'from-[#1EC2D7] to-[#04608E]' },
  { key: 'team', icon: Users, gradient: 'from-[#1A4277] to-[#1EC2D7]' },
  { key: 'security', icon: Lock, gradient: 'from-[#04608E] to-[#1EC2D7]' },
];

export const BackingSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="backing"
      className="py-16 md:py-24 overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #04608E 0%, #1A4277 100%)' }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >

          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mt-3 mb-3">
            {t('backing.title')}
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto">
            {t('backing.subtitle')}
          </p>
        </motion.div>

        {/* Compact Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {backingItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="group relative h-full p-6 rounded-2xl border backdrop-blur-sm hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}
                data-testid={`backing-card-${item.key}`}
              >
                {/* Top Accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: 'linear-gradient(90deg, #04608E, #1EC2D7)' }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, #04608E, #1EC2D7)' }}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-outfit text-lg font-bold text-white mb-2 group-hover:text-[#1EC2D7] transition-colors">
                  {t(`backing.${item.key}.title`)}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {t(`backing.${item.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};