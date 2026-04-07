import { motion } from 'framer-motion';
import { ArrowRight, Play, Headphones, Users, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F9FF]">
        <div 
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: `radial-gradient(circle at 5px 5px, #04608E 0.5px, transparent 0)`,
            backgroundSize: '75px 75px'
          }}
        />
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-80 h-80 bg-[#1EC2D7]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#04608E]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1EC2D7]/10 border border-[#1EC2D7]/20 rounded-full mb-5"
            >
              <span className="w-2 h-2 bg-[#1EC2D7] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#04608E]">{t('hero.tagline')}</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0F172A] tracking-tight leading-[1.1] mb-2">
              {t('hero.headline')}
            </h1>
            <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1EC2D7] tracking-tight leading-[1.1] mb-5">
              {t('hero.headlineSub')}
            </h2>

            {/* Description */}
            <p className="text-sm lg:text-base text-slate-600 max-w-xl mb-7 leading-relaxed">
              {t('hero.description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={(e) => scrollToSection(e, '#contact')}
                className="bg-[#04608E] hover:bg-[#1A4277] text-white rounded-full px-7 py-5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#04608E]/20"
                data-testid="hero-cta-primary"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={(e) => scrollToSection(e, '#services')}
                className="border-2 border-[#04608E] text-[#04608E] hover:bg-[#04608E] hover:text-white rounded-full px-7 py-5 text-sm font-medium transition-all"
                data-testid="hero-cta-secondary"
              >
                <Play className="mr-2 w-4 h-4" />
                {t('hero.ctaSecondary')}
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative pb-8"
          >
            <div className="grid grid-cols-2 gap-3 md:gap-4 items-start">
              {[
                { icon: Headphones, titleKey: 'hero.card1Title', descKey: 'hero.card1Desc', gradient: 'from-[#04608E] to-[#1A4277]' },
                { icon: Users, titleKey: 'hero.card2Title', descKey: 'hero.card2Desc', gradient: 'from-[#1EC2D7] to-[#04608E]', offset: true },
                { icon: Shield, titleKey: 'hero.card3Title', descKey: 'hero.card3Desc', gradient: 'from-[#1A4277] to-[#04608E]' },
                { icon: Zap, titleKey: 'hero.card4Title', descKey: 'hero.card4Desc', gradient: 'from-[#04608E] to-[#1EC2D7]', offset: true },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={card.offset ? 'mt-8' : ''}
                >
                  <div className="group bg-white rounded-2xl p-5 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-outfit text-base font-bold text-slate-800 mb-1">{t(card.titleKey)}</h3>
                    <p className="text-xs text-slate-500">{t(card.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#04608E] to-[#1A4277] text-white px-5 py-2.5 rounded-full shadow-lg whitespace-nowrap"
            >
              <span className="text-xs font-medium">{t('hero.badge')}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
