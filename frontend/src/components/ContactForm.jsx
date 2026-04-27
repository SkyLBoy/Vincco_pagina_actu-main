import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const ContactForm = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = language === 'es' ? 'Requerido' : 'Required';
    if (!formData.email.trim()) {
      newErrors.email = language === 'es' ? 'Requerido' : 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'es' ? 'Email inválido' : 'Invalid email';
    }
    if (!formData.message.trim()) newErrors.message = language === 'es' ? 'Requerido' : 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('loading');

    try {
      await axios.post(`${API}/contacts`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#04608E] to-[#1A4277]" />
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Content */}
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <span className="inline-block text-[#1EC2D7] font-semibold text-sm uppercase tracking-wider mb-3 px-3 py-1 bg-[#1EC2D7]/20 rounded-full">
                  {language === 'es' ? 'Contacto' : 'Contact'}
                </span>
                <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                  {t('contact.title')}
                </h2>
                <p className="text-white/70 text-base mb-8">
                  {t('contact.subtitle')}
                </p>
              </motion.div>

              {/* Contact Info */}
              <div className="space-y-5">
                {[
                  { icon: Phone, label: language === 'es' ? 'Teléfono' : 'Phone', value: '(66)-21091000' },
                  { icon: Mail, label: 'Email', value: 'wilfredo.benitez@vincco.mx' },
                  { icon: MapPin, label: language === 'es' ? 'Ubicación' : 'Location', value: 'Hermosillo, Sonora | Col. Centro | Guerrero #19' },
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#1EC2D7]" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50">{item.label}</p>
                      <p className="text-white font-medium text-sm">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex gap-3 mt-8"
              >
                {[
                  { href: 'https://www.facebook.com/vinccocentrodecontacto/', icon: 'M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z' },
                  { href: 'https://twitter.com/VINCCO1', icon: 'M23.44,4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96,1.32-2.02-.88.52-1.86.9-2.9,1.1-.82-.88-2-1.43-3.3-1.43-2.5,0-4.55,2.04-4.55,4.54,0,.36.03.7.1,1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6,1.45-.6,2.3,0,1.56.8,2.95,2,3.77-.74-.03-1.44-.23-2.05-.57v.06c0,2.2,1.56,4.03,3.64,4.44-.67.2-1.37.2-2.06.08.58,1.8,2.26,3.12,4.25,3.16C5.78,18.1,3.37,18.74,1,18.46c2,1.3,4.4,2.04,6.97,2.04,8.35,0,12.92-6.92,12.92-12.93,0-.2,0-.4-.02-.6.9-.63,1.96-1.22,2.56-2.14Z' },
                  { href: 'https://www.linkedin.com/company/vincco', icon: 'M20.45,20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85,0-2.14,1.45-2.14,2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9,1.64-1.85,3.37-1.85,3.6,0,4.27,2.37,4.27,5.46v6.28ZM5.34,7.43c-1.14,0-2.07-.93-2.07-2.07s.93-2.07,2.07-2.07,2.07.93,2.07,2.07-.93,2.07-2.07,2.07ZM7.12,20.45H3.56V9h3.56v11.45ZM22.22,0H1.77C.79,0,0,.77,0,1.72v20.56c0,.95.79,1.72,1.77,1.72h20.45c.98,0,1.78-.77,1.78-1.72V1.72c0-.95-.8-1.72-1.78-1.72Z' },
                  { href: 'https://www.instagram.com/vinccocentrodecontacto/', icon: 'M12,2.16c3.2,0,3.58.01,4.85.07,1.17.05,1.8.25,2.23.41.56.22.96.48,1.38.9s.68.82.9,1.38c.16.43.36,1.06.41,2.23.06,1.27.07,1.65.07,4.85s-.01,3.58-.07,4.85c-.05,1.17-.25,1.8-.41,2.23-.22.56-.48.96-.9,1.38s-.82.68-1.38.9c-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9s-.68-.82-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38s.82-.68,1.38-.9c.43-.16,1.06-.36,2.23-.41,1.27-.06,1.65-.07,4.85-.07M12,0C8.74,0,8.33.01,7.05.07,5.78.13,4.9.33,4.14.63c-.78.3-1.44.71-2.1,1.37s-1.07,1.32-1.37,2.1c-.3.76-.5,1.64-.56,2.91C.05,8.33,0,8.74,0,12s.01,3.67.07,4.95c.06,1.27.26,2.15.56,2.91.3.78.71,1.44,1.37,2.1s1.32,1.07,2.1,1.37c.76.3,1.64.5,2.91.56,1.28.06,1.69.07,4.95.07s3.67-.01,4.95-.07c1.27-.06,2.15-.26,2.91-.56.78-.3,1.44-.71,2.1-1.37s1.07-1.32,1.37-2.1c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.78-.71-1.44-1.37-2.1s-1.32-1.07-2.1-1.37c-.76-.3-1.64-.5-2.91-.56C15.67.01,15.26,0,12,0Zm0,5.84c-3.4,0-6.16,2.76-6.16,6.16s2.76,6.16,6.16,6.16,6.16-2.76,6.16-6.16-2.76-6.16-6.16-6.16Zm0,10.16c-2.21,0-4-1.79-4-4s1.79-4,4-4,4,1.79,4,4-1.79,4-4,4Zm7.85-10.4c0,.79-.64,1.43-1.43,1.43s-1.43-.64-1.43-1.43.64-1.43,1.43-1.43,1.43.64,1.43,1.43Z' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1EC2D7] transition-all duration-300 group"
                    data-testid={`social-link-${index}`}
                  >
                    <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-xl"
            >
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-outfit text-xl font-bold text-[#0F172A] mb-2">
                    {t('contact.success')}
                  </h3>
                  <p className="text-slate-500 text-center text-sm">
                    {t('contact.successMessage')}
                  </p>
                </div>
              ) : status === 'error' ? (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="font-outfit text-xl font-bold text-[#0F172A] mb-2">
                    {t('contact.error')}
                  </h3>
                  <p className="text-slate-500 text-center text-sm">
                    {t('contact.errorMessage')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm">{t('contact.name')} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`h-11 ${errors.name ? 'border-red-500' : ''}`}
                        data-testid="contact-input-name"
                      />
                      {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">{t('contact.email')} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`h-11 ${errors.email ? 'border-red-500' : ''}`}
                        data-testid="contact-input-email"
                      />
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="company" className="text-sm">{t('contact.company')}</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="h-11"
                        data-testid="contact-input-company"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm">{t('contact.phone')}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-11"
                        data-testid="contact-input-phone"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm">{t('contact.message')} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.messagePlaceholder')}
                      className={`resize-none ${errors.message ? 'border-red-500' : ''}`}
                      data-testid="contact-input-message"
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#04608E] hover:bg-[#1A4277] text-white rounded-xl py-5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-95"
                    data-testid="contact-submit-button"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.submit')}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
