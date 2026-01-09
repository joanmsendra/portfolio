import { motion } from "framer-motion";
import { MapPin, GraduationCap, Code, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import React from "react";

export const About = React.memo(() => {
  const { t } = useLanguage();

  const facts = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t.about.locationTitle,
      description: t.about.locationDesc,
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: t.about.studiesTitle,
      description: t.about.studiesDesc,
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: t.about.profileTitle,
      description: t.about.profileDesc,
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t.about.langTitle,
      description: t.about.langDesc,
    },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-6 relative overflow-hidden will-change-transform">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 will-change-transform"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.about.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="will-change-transform"
          >
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {t.about.bio1}
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {t.about.bio2}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.about.bio3}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 will-change-transform"
          >
            {facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card-gradient p-6 rounded-xl border border-primary/20 smooth-transition hover:border-primary/50 hover:scale-105 will-change-transform"
              >
                <div className="text-primary mb-3">{fact.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{fact.title}</h3>
                <p className="text-sm text-muted-foreground">{fact.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";
