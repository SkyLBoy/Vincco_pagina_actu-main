import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, FileText, Share2, Volume2, Send, MessageSquare, Smartphone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const agentChannels = [
  { key: 'calls', icon: Phone },
  { key: 'chat', icon: MessageCircle },
  { key: 'email', icon: Mail },
  { key: 'backoffice', icon: FileText },
  { key: 'social', icon: Share2 },
];

const noAgentChannels = [
  { key: 'blasting', icon: Volume2 },
  { key: 'mailing', icon: Send },
  { key: 'sms', icon: MessageSquare },
  { key: 'ivr', icon: Smartphone },
];

const ChannelCard = ({ channelKey, Icon, index }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group"
    >
      <div 
        className="relative p-5 bg-white rounded-xl border border-slate-100 hover:border-[#1EC2D7]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        data-testid={`channel-card-${channelKey}`}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1EC2D7]/10 transition-colors">
            <Icon className="w-5 h-5 text-[#04608E] group-hover:text-[#1EC2D7] transition-colors" />
          </div>
          <div>
            <h3 className="font-outfit text-base font-semibold text-[#0F172A] mb-1 group-hover:text-[#04608E] transition-colors">
              {t(`solutions.${channelKey}.title`)}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
              {t(`solutions.${channelKey}.description`)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const SolutionsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="solutions" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-[#1EC2D7] font-semibold text-sm uppercase tracking-wider mb-2 px-4 py-1 bg-[#1EC2D7]/10 rounded-full">03</span>
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight mt-3 mb-3">
            {t('solutions.title')}
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto mb-2">
            {t('solutions.subtitle')}
          </p>
          <p className="text-[#1EC2D7] font-medium text-sm">
            {t('solutions.question')}
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="with-agent" className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <TabsList className="bg-[#F8FAFC] p-1 rounded-full border border-slate-200">
              <TabsTrigger
                value="with-agent"
                className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-[#04608E] data-[state=active]:text-white transition-all"
                data-testid="tab-with-agent"
              >
                {t('solutions.withAgent')}
              </TabsTrigger>
              <TabsTrigger
                value="without-agent"
                className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-[#04608E] data-[state=active]:text-white transition-all"
                data-testid="tab-without-agent"
              >
                {t('solutions.withoutAgent')}
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="with-agent" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {agentChannels.map((channel, index) => (
                <ChannelCard
                  key={channel.key}
                  channelKey={channel.key}
                  Icon={channel.icon}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="without-agent" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {noAgentChannels.map((channel, index) => (
                <ChannelCard
                  key={channel.key}
                  channelKey={channel.key}
                  Icon={channel.icon}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
