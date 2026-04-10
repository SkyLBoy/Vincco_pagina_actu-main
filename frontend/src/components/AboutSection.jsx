import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 md:py-24 overflow-hidden" style={{ background: '#DBEAFE' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#1EC2D7] font-semibold text-sm uppercase tracking-wider mb-2 px-4 py-1 bg-[#1EC2D7]/10 rounded-full">01</span>
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight mt-3 mb-3">
            {t('about.title')}
          </h2>
          <p className="text-xl text-[#04608E] font-medium mb-4">
            {t('about.subtitle')}
          </p>
          <p className="text-base text-slate-500 max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="group relative h-full p-8 rounded-2xl bg-gradient-to-br from-[#04608E] to-[#1A4277] text-white overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-[#1EC2D7]" />
                </div>
                <h3 className="font-outfit text-xl font-bold mb-3">{t('about.mission')}</h3>
                <p className="text-white/80 leading-relaxed text-sm">{t('about.missionText')}</p>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="group relative h-full p-8 rounded-2xl bg-white border-2 border-[#1EC2D7]/20 overflow-hidden hover:border-[#1EC2D7]/40 hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1EC2D7] to-[#04608E]" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#1EC2D7]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6 text-[#04608E]" />
                </div>
                <h3 className="font-outfit text-xl font-bold text-[#0F172A] mb-3">{t('about.vision')}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{t('about.visionText')}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Heart, label: 'Compromiso', value: '100%' },
            { icon: Award, label: 'Calidad', value: 'AAA' },
            { icon: Target, label: 'Precisión', value: '99.5%' },
            { icon: Eye, label: 'Transparencia', value: 'Total' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group text-center p-5 rounded-xl bg-white border border-slate-100 hover:border-[#1EC2D7]/30 hover:shadow-lg transition-all duration-300"
            >
              <item.icon className="w-5 h-5 text-[#1EC2D7] mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-2xl font-bold text-[#04608E]">{item.value}</p>
              <p className="text-xs text-slate-500">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};