import { useState, useRef } from "react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const filtersKeys = [
  "all",
  "photography",
  "startup",
  "entertainment",
  "energy",
  "transportation",
  "hospitality",
];

const portfolioItems = [
  {
    titleKey: "portfolioItems.photography.title",
    descriptionKey: "portfolioItems.photography.description",
    url: "https://photography-sf.vercel.app/",
    categoryKey: "filters.photography",
    features: ["3D Gallery", "Interactive UI", "Mobile Optimized"],
    image: "/photography.png",
    categoryRaw: "Photography",
  },
  {
    titleKey: "portfolioItems.education.title",
    descriptionKey: "portfolioItems.education.description",
    url: "https://tergi-for-generations.vercel.app/",
    categoryKey: "filters.startup",
    features: ["Interactive Stories", "Heritage Design", "Modern UX"],
    image: "/tergi.png",
    categoryRaw: "Startup",
  },
  {
    titleKey: "portfolioItems.movie_catalog.title",
    descriptionKey: "portfolioItems.movie_catalog.description",
    url: "https://movixgeo.netlify.app/",
    categoryKey: "filters.entertainment",
    features: ["Advanced Search", "High Performance", "Responsive Design"],
    image: "/movix.png",
    categoryRaw: "Entertainment",
  },
  {
    titleKey: "portfolioItems.sun_panels.title",
    descriptionKey: "portfolioItems.sun_panels.description",
    url: "https://energosun.ge/",
    categoryKey: "filters.energy",
    features: ["Interactive Solutions", "Modern Design", "User-Friendly"],
    image: "/energosun.png",
    categoryRaw: "Energy",
  },
  {
    titleKey: "portfolioItems.car_rental.title",
    descriptionKey: "portfolioItems.car_rental.description",
    url: "https://primesdrive.vercel.app/",
    categoryKey: "filters.transportation",
    features: ["Dynamic Booking", "Vehicle Previews", "User-Friendly"],
    image: "/primedrive.png",
    categoryRaw: "Transportation",
  },
  {
    titleKey: "portfolioItems.hotel.title",
    descriptionKey: "portfolioItems.hotel.description",
    url: "https://clever-kashata-ae744e.netlify.app/",
    categoryKey: "filters.hospitality",
    features: ["Dynamic Booking", "Room Previews", "User-Friendly"],
    image: "/hotel.png",
    categoryRaw: "Hospitality",
  },
];

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLImageElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      style={{ y }}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
  );
}

export default function PortfolioSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter(
          (item) => item.categoryRaw.toLowerCase() === activeFilter
        );

  return (
    <section
      id="portfolio"
      className="py-32 bg-gradient-to-b from-slate-900/50 to-transparent"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              {t("portfolio.title")}
            </span>
          </h2>
          <p className="text-xl text-gray-300 font-light">
            {t("portfolio.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center flex-wrap gap-4 mb-16"
        >
          {filtersKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === key
                  ? "bg-violet-500 text-white shadow-lg"
                  : "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-gray-200"
              }`}
            >
              {t(`filters.${key}`)}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {filtered.map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.15}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                className="group"
              >
                <Card className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-slate-700/50 overflow-hidden backdrop-blur-md transform transition-transform duration-500 group-hover:scale-105">
                  <CardContent className="p-0 relative">
                    <div className="relative aspect-video overflow-hidden">
                      <ParallaxImage src={item.image} alt={t(item.titleKey)} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <span className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs uppercase tracking-wide">
                          {t(item.categoryKey)}
                        </span>
                        <h3 className="mt-2 text-2xl font-light tracking-tight">
                          {t(item.titleKey)}
                        </h3>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                      >
                        <ArrowRight className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col justify-center items-center bg-black/60 text-center p-6 opacity-0"
                    >
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {t(item.descriptionKey)}
                      </p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-400 hover:text-orange-400 transition-colors font-medium"
                      >
                        {t("portfolio.view_project")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </motion.div>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
