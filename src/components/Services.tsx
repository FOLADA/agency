import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Globe2,
  Code2,
  Smartphone,
  BarChart3,
  PenTool,
  Type,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ContactForm from "@/components/ContactForm";
import { useTranslation } from 'react-i18next';

export default function ServicesSection() {
  const { t, i18n } = useTranslation();
  // Get translated services
  let translatedServices = t('servicesSection.services', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;
  // Fallback to English if translation is missing or empty
  if (!Array.isArray(translatedServices) || translatedServices.length === 0) {
    translatedServices = i18n.getResource('en', 'translation', 'servicesSection.services') || [];
  }
  console.log('Translated services:', translatedServices, 'Current lang:', i18n.language);
  // Icon and gradient arrays to match by index
  const icons = [
    <Code2 className="w-7 h-7 text-white" />, // Web Development
    <Smartphone className="w-7 h-7 text-white" />, // Mobile Apps
    <PenTool className="w-7 h-7 text-white" />, // UI/UX Design
    <BarChart3 className="w-7 h-7 text-white" />, // SEO & Analytics
    <Globe2 className="w-7 h-7 text-white" />, // SMM
    <Type className="w-7 h-7 text-white" />, // Copywriting
    <PenTool className="w-7 h-7 text-white" />, // Brand Identity
    <Type className="w-7 h-7 text-white" />, // Content Strategy
    <BarChart3 className="w-7 h-7 text-white" />, // Maintenance & Support
  ];
  const gradients = [
    "from-violet-600 to-purple-700",
    "from-indigo-500 to-blue-600",
    "from-pink-500 to-rose-600",
    "from-green-500 to-emerald-600",
    "from-amber-400 to-orange-500",
    "from-teal-400 to-cyan-500",
    "from-fuchsia-500 to-pink-600",
    "from-lime-400 to-green-500",
    "from-slate-500 to-gray-700",
  ];
  return (
    <section
      id="services"
      className="py-32 bg-gradient-to-b from-black via-slate-900 to-black overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-28"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {t('servicesSection.heading')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            {t('servicesSection.subtitle')}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-y-20 gap-x-10 relative z-10">
          {translatedServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              className={`relative ${index % 2 === 0 ? "md:-mt-6" : "md:mt-6"}`}
            >
              <TiltCard>
                <Card className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-slate-700/50 hover:border-amber-500/50 rounded-2xl shadow-xl group transform transition-transform duration-300">
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl z-0`}
                  />
                  <CardContent className="relative p-10 z-10">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${gradients[index]} flex items-center justify-center mb-8 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                    >
                      {icons[index]}
                    </div>
                    <h3 className="text-2xl font-light mb-4 text-white group-hover:text-amber-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="inline-flex items-center text-amber-400 group-hover:text-orange-400 font-medium">
                          <span className="mr-2">{t('servicesSection.discoverMore')}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border border-slate-700 text-white max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
                            {service.title}
                          </DialogTitle>
                        </DialogHeader>
                        <p className="text-slate-300 mb-8">{service.description}</p>
                        <ContactForm />
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - bounds.left) / bounds.width;
        const py = (e.clientY - bounds.top) / bounds.height;
        x.set(px);
        y.set(py);
      }}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
