import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Megaphone, Wrench, Wallet, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const services = [
  {
    key: 'phone',
    icon: Phone,
    color: 'from-[#04608E] to-[#1A4277]',
    video: 'https://res.cloudinary.com/dx96mvwyq/video/upload/f_auto,q_auto/v1777148320/phone_eeu8x5.mp4',
  },
  {
    key: 'telemarketing',
    icon: Megaphone,
    color: 'from-[#1EC2D7] to-[#04608E]',
    video: 'https://res.cloudinary.com/dx96mvwyq/video/upload/f_auto,q_auto/v1777146891/telemarketing_xylxcq.mp4',
  },
  {
    key: 'support',
    icon: Wrench,
    color: 'from-[#1A4277] to-[#04608E]',
    video: 'https://res.cloudinary.com/dx96mvwyq/video/upload/f_auto,q_auto/v1777146889/support_u2voym.mp4',
  },
  {
    key: 'collections',
    icon: Wallet,
    color: 'from-[#04608E] to-[#1EC2D7]',
    video: 'https://res.cloudinary.com/dx96mvwyq/video/upload/f_auto,q_auto/v1777146890/collections_u5yfeo.mp4',
  },
];

export const ServicesSection = () => {
  const { t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="services" className="py-16 md:py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
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
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] mt-3 mb-3">
            {t('services.title')}
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
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
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`} />

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-outfit text-lg font-bold text-[#0F172A] mb-2">
                  {t(`services.${service.key}.title`)}
                </h3>

                <p className="text-sm text-slate-500 line-clamp-3">
                  {t(`services.${service.key}.description`)}
                </p>

                <button
                  onClick={() => setActiveVideo(service)}
                  className="mt-4 flex items-center gap-1 text-[#1EC2D7] hover:gap-2 transition-all"
                >
                  <span className="text-sm font-medium">Ver más</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`flex justify-between px-5 py-3 bg-gradient-to-r ${activeVideo.color}`}>
                <h3 className="text-white font-semibold">
                  {t(`services.${activeVideo.key}.title`)}
                </h3>

                <button onClick={() => setActiveVideo(null)}>
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* VIDEO OPTIMIZADO */}
              <video
                key={activeVideo.video}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="w-full aspect-video bg-black"
              >
                <source src={activeVideo.video} type="video/mp4" />
                Tu navegador no soporta video.
              </video>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};