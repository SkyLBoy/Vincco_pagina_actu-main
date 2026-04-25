import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Megaphone, Wrench, Wallet, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const services = [
  {
    key: 'phone',
    icon: Phone,
    color: 'from-[#04608E] to-[#1A4277]',
    video: '/videos/phone.mp4',
  },
  {
    key: 'telemarketing',
    icon: Megaphone,
    color: 'from-[#1EC2D7] to-[#04608E]',
    video: '/videos/telemarketing.mp4',
  },
  {
    key: 'support',
    icon: Wrench,
    color: 'from-[#1A4277] to-[#04608E]',
    video: '/videos/support.mp4',
  },
  {
    key: 'collections',
    icon: Wallet,
    color: 'from-[#04608E] to-[#1EC2D7]',
    video: '/videos/collections.mp4',
  },
];

export const ServicesSection = () => {
  const { t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="services" className="py-16 md:py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#1EC2D7] font-semibold text-sm uppercase tracking-wider mb-2 px-4 py-1 bg-[#1EC2D7]/10 rounded-full">
            02
          </span>
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight mt-3 mb-3">
            {t('services.title')}
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Cards Grid */}
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
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-outfit text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#04608E] transition-colors">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                  {t(`services.${service.key}.description`)}
                </p>

                {/* Ver más Button */}
                <button
                  onClick={() => setActiveVideo(service)}
                  className="mt-4 flex items-center gap-1 text-[#1EC2D7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:gap-2 transition-all"
                >
                  <span className="text-sm font-medium">Ver más</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Background Gradient on Hover */}
                <div
                  className={`absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-full blur-2xl transition-opacity duration-300`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`flex items-center justify-between px-5 py-3 bg-gradient-to-r ${activeVideo.color}`}>
                <div className="flex items-center gap-2">
                  <activeVideo.icon className="w-4 h-4 text-white/80" />
                  <h3 className="text-white font-semibold text-base">
                    {t(`services.${activeVideo.key}.title`)}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="text-white/70 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
              <video
                key={activeVideo.video}
                controls
                autoPlay
                className="w-full aspect-video bg-black"
              >
                <source src={activeVideo.video} type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};