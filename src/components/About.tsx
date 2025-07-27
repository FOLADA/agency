import { motion } from "framer-motion";
import { Zap, Target, Globe, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const chaosCards = [
  {
    key: "visionary",
    icon: <Zap className="w-8 h-8" />,
    gradient: "from-indigo-500 to-purple-600",
    rotate: "rotate-[3deg]",
    scale: "scale-100",
  },
  {
    key: "endtoend",
    icon: <Target className="w-8 h-8" />,
    gradient: "from-fuchsia-600 to-pink-600",
    rotate: "rotate-[-2deg]",
    scale: "scale-95",
  },
  {
    key: "growthAcceleration",
    icon: <TrendingUp className="w-8 h-8" />,
    gradient: "from-emerald-500 to-lime-500",
    rotate: "rotate-[1deg]",
    scale: "scale-105",
  },
  {
    key: "userObsession",
    icon: <Users className="w-8 h-8" />,
    gradient: "from-yellow-400 to-orange-500",
    rotate: "rotate-[4deg]",
    scale: "scale-95",
  },
  {
    key: "partnership",
    icon: <Globe className="w-8 h-8" />,
    gradient: "from-red-500 to-rose-600",
    rotate: "rotate-[-3deg]",
    scale: "scale-100",
  },
];

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-slate-900">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
              {t("about.title")}
            </span>
          </h2>
          <p className="text-xl text-slate-400 font-light">{t("about.paragraph")}</p>
        </motion.div>
      </div>

      {/* Cards container */}
      <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto px-6 relative z-10">
        {chaosCards.map(({ key, icon, gradient, rotate, scale }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            viewport={{ once: true }}
            className={`w-72 ${rotate} ${scale} hover:scale-105 transition-transform duration-700`}
          >
            <Card className="overflow-hidden bg-slate-800/60 border border-slate-600 backdrop-blur-md shadow-xl hover:shadow-2xl">
              <div
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 transition-opacity duration-500`}
              />
              <CardContent className="relative p-8 text-center space-y-4">
                <div
                  className={`mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-md`}
                >
                  {icon}
                </div>
                <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-pink-300">
                  {t(`about.highlights.${key}.title`)}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t(`about.highlights.${key}.desc`)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
