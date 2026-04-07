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
      transition={{ delay: index * 0.1 }}
      className="group p-6 bg-white rounded-2xl border border-slate-100 hover:border-[#1EC2D7]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      data-testid={`channel-card-${channelKey}`}
    >
      <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center mb-4 group-hover:bg-[#1EC2D7]/10 transition-colors">
        <Icon className="w-6 h-6 text-[#04608E] group-hover:text-[#1EC2D7] transition-colors" />
      </div>
      <h3 className="font-outfit text-lg font-semibold text-[#0F172A] mb-2">
        {t(`channels.${channelKey}.title`)}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {t(`channels.${channelKey}.description`)}
      </p>
    </motion.div>
  );
};

export const ChannelsTabs = () => {
  const { t } = useLanguage();

  return (
    <section id="channels" className="py-20 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            {t('channels.title')}
          </h2>
          <p className="text-base lg:text-lg text-slate-500 max-w-2xl mx-auto">
            {t('channels.subtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="with-agent" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
              <TabsTrigger
                value="with-agent"
                className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-[#04608E] data-[state=active]:text-white transition-all"
                data-testid="tab-with-agent"
              >
                {t('channels.withAgent')}
              </TabsTrigger>
              <TabsTrigger
                value="without-agent"
                className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-[#04608E] data-[state=active]:text-white transition-all"
                data-testid="tab-without-agent"
              >
                {t('channels.withoutAgent')}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="with-agent" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
