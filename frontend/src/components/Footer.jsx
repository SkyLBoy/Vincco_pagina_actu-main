import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const services = language === 'es' 
    ? ['Atención Telefónica', 'Telemarketing', 'Soporte Técnico', 'Cobranza', 'Chat en Línea', 'Email']
    : ['Phone Support', 'Telemarketing', 'Technical Support', 'Collections', 'Live Chat', 'Email'];

  const quickLinks = language === 'es'
    ? [
        { label: 'Inicio', href: '#' },
        { label: 'Quiénes Somos', href: '#about' },
        { label: 'Servicios', href: '#services' },
        { label: 'Soluciones', href: '#solutions' },
        { label: 'Contacto', href: '#contact' },
      ]
    : [
        { label: 'Home', href: '#' },
        { label: 'About Us', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Solutions', href: '#solutions' },
        { label: 'Contact', href: '#contact' },
      ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#0F172A]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1 - About & Logo */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://vincco.com/static/logo/logo_grande.png" 
                alt="Vincco Logo" 
                className="h-12 mb-5 brightness-0 invert"
              />
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {language === 'es' 
                  ? 'Somos el vínculo perfecto entre usted y sus clientes. Centro de contacto con más de 15 años de experiencia.'
                  : 'We are the perfect link between you and your customers. Contact center with over 15 years of experience.'}
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {[
                  { href: 'https://www.facebook.com/vinccocentrodecontacto/', icon: 'M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z', name: 'Facebook' },
                  { href: 'https://twitter.com/VINCCO1', icon: 'M23.44,4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96,1.32-2.02-.88.52-1.86.9-2.9,1.1-.82-.88-2-1.43-3.3-1.43-2.5,0-4.55,2.04-4.55,4.54,0,.36.03.7.1,1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6,1.45-.6,2.3,0,1.56.8,2.95,2,3.77-.74-.03-1.44-.23-2.05-.57v.06c0,2.2,1.56,4.03,3.64,4.44-.67.2-1.37.2-2.06.08.58,1.8,2.26,3.12,4.25,3.16C5.78,18.1,3.37,18.74,1,18.46c2,1.3,4.4,2.04,6.97,2.04,8.35,0,12.92-6.92,12.92-12.93,0-.2,0-.4-.02-.6.9-.63,1.96-1.22,2.56-2.14Z', name: 'Twitter' },
                  { href: 'https://www.linkedin.com/company/vincco', icon: 'M20.45,20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85,0-2.14,1.45-2.14,2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9,1.64-1.85,3.37-1.85,3.6,0,4.27,2.37,4.27,5.46v6.28ZM5.34,7.43c-1.14,0-2.07-.93-2.07-2.07s.93-2.07,2.07-2.07,2.07.93,2.07,2.07-.93,2.07-2.07,2.07ZM7.12,20.45H3.56V9h3.56v11.45ZM22.22,0H1.77C.79,0,0,.77,0,1.72v20.56c0,.95.79,1.72,1.77,1.72h20.45c.98,0,1.78-.77,1.78-1.72V1.72c0-.95-.8-1.72-1.78-1.72Z', name: 'LinkedIn' },
                  { href: 'https://www.instagram.com/vinccocentrodecontacto/', icon: 'M12,2.16c3.2,0,3.58.01,4.85.07,1.17.05,1.8.25,2.23.41.56.22.96.48,1.38.9s.68.82.9,1.38c.16.43.36,1.06.41,2.23.06,1.27.07,1.65.07,4.85s-.01,3.58-.07,4.85c-.05,1.17-.25,1.8-.41,2.23-.22.56-.48.96-.9,1.38s-.82.68-1.38.9c-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9s-.68-.82-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38s.82-.68,1.38-.9c.43-.16,1.06-.36,2.23-.41,1.27-.06,1.65-.07,4.85-.07M12,0C8.74,0,8.33.01,7.05.07,5.78.13,4.9.33,4.14.63c-.78.3-1.44.71-2.1,1.37s-1.07,1.32-1.37,2.1c-.3.76-.5,1.64-.56,2.91C.05,8.33,0,8.74,0,12s.01,3.67.07,4.95c.06,1.27.26,2.15.56,2.91.3.78.71,1.44,1.37,2.1s1.32,1.07,2.1,1.37c.76.3,1.64.5,2.91.56,1.28.06,1.69.07,4.95.07s3.67-.01,4.95-.07c1.27-.06,2.15-.26,2.91-.56.78-.3,1.44-.71,2.1-1.37s1.07-1.32,1.37-2.1c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.78-.71-1.44-1.37-2.1s-1.32-1.07-2.1-1.37c-.76-.3-1.64-.5-2.91-.56C15.67.01,15.26,0,12,0Zm0,5.84c-3.4,0-6.16,2.76-6.16,6.16s2.76,6.16,6.16,6.16,6.16-2.76,6.16-6.16-2.76-6.16-6.16-6.16Zm0,10.16c-2.21,0-4-1.79-4-4s1.79-4,4-4,4,1.79,4,4-1.79,4-4,4Zm7.85-10.4c0,.79-.64,1.43-1.43,1.43s-1.43-.64-1.43-1.43.64-1.43,1.43-1.43,1.43.64,1.43,1.43Z', name: 'Instagram' },
                ].map((social, index) => (
                  <a  
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#1EC2D7] transition-all duration-300 group"
                    data-testid={`footer-social-${social.name.toLowerCase()}`}
                  >
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-white font-outfit font-bold text-lg mb-5">
                {language === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a  
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-slate-400 hover:text-[#1EC2D7] transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#1EC2D7] transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Column 3 - Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white font-outfit font-bold text-lg mb-5">
                {language === 'es' ? 'Servicios' : 'Services'}
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-slate-400 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1EC2D7]" />
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-white font-outfit font-bold text-lg mb-5">
                {language === 'es' ? 'Contacto' : 'Contact'}
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#1EC2D7]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">+52 (55) 5555-5555</p>
                    <p className="text-slate-500 text-xs">{language === 'es' ? 'Lun - Vie 9am - 6pm' : 'Mon - Fri 9am - 6pm'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#1EC2D7]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">contacto@vincco.com</p>
                    <p className="text-slate-500 text-xs">{language === 'es' ? 'Respuesta en 24hrs' : 'Response within 24hrs'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#1EC2D7]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Ciudad de México</p>
                    <p className="text-slate-500 text-xs">México</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {currentYear} VINCCO. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-slate-600 text-xs">{t('footer.division')}</span>
              <img 
                src="https://vincco.com/static/imgs/logo/logo-ct.png" 
                alt="CT Logo" 
                className="h-8 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};