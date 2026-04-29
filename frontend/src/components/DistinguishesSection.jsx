import { motion } from 'framer-motion';
import { Users, Shield, Layers, Clock, Lightbulb, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const icons = [Users, Shield, Layers, Clock, Lightbulb, TrendingUp];

export const DistinguishesSection = () => {
  const { t, tArray, language } = useLanguage();
  const items = tArray('distinguishes.items');

  return (
    <section id="distinguishes" className="py-16 md:py-24 bg-[#1A4277] overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

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
            {t('distinguishes.title')}
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto">
            {t('distinguishes.subtitle')}
          </p>
        </motion.div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => {
            const Icon = icons[index] || CheckCircle2;
            
            return (
              <motion.div
                key={`${language}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div 
                  className="group flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-[#1EC2D7]/30 transition-all duration-300"
                  data-testid={`distinguishes-item-${index}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-[#1EC2D7]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1EC2D7]/30 group-hover:scale-110 transition-all">
                    <Icon className="w-5 h-5 text-[#1EC2D7]" />
                  </div>
                  <p className="text-white font-medium text-sm leading-snug">{item}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
