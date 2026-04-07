import { motion } from 'framer-motion';
import { Search, Palette, Rocket, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const steps = [
  { key: 'step1', icon: Search, number: '01' },
  { key: 'step2', icon: Palette, number: '02' },
  { key: 'step3', icon: Rocket, number: '03' },
  { key: 'step4', icon: TrendingUp, number: '04' },
];

export const Process = () => {
  const { t } = useLanguage();

  return (
    <section id="process" className="py-20 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            {t('process.title')}
          </h2>
          <p className="text-base lg:text-lg text-slate-500 max-w-2xl mx-auto">
            {t('process.subtitle')}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#04608E] via-[#1EC2D7] to-[#04608E]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
                data-testid={`process-step-${step.number}`}
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Number Badge */}
                  <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#04608E] to-[#1A4277] flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#1EC2D7] flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{step.number}</span>
                    </div>
                  </div>

                  <h3 className="font-outfit text-xl font-bold text-[#0F172A] text-center mb-3">
                    {t(`process.${step.key}.title`)}
                  </h3>
                  <p className="text-sm text-slate-500 text-center leading-relaxed">
                    {t(`process.${step.key}.description`)}
                  </p>
                </div>

                {/* Connector Arrow - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 z-10">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-[#1EC2D7] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#1EC2D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Connector Arrow - Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-[#1EC2D7] flex items-center justify-center rotate-90">
                      <svg className="w-4 h-4 text-[#1EC2D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
