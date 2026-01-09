import { motion } from "framer-motion";
import { Smartphone, Terminal, Gamepad2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import React from "react";

export const Projects = React.memo(() => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t.projects.footballTitle,
      description: t.projects.footballDesc,
      icon: <Smartphone className="w-8 h-8" />,
      tech: ["React Native", "Redux", "Firebase", "App Store"],
      gradient: "from-tech-cyan to-tech-blue",
    },
    {
      title: t.projects.citadelTitle,
      description: t.projects.citadelDesc,
      icon: <Terminal className="w-8 h-8" />,
      tech: ["C Language", "Unix Sockets", "Distributed Systems", "Concurrency"],
      gradient: "from-primary to-tech-purple",
    },
    {
      title: t.projects.gameTitle,
      description: t.projects.gameDesc,
      icon: <Gamepad2 className="w-8 h-8" />,
      tech: ["Unity 3D", "C#", "Game Design", "Physics"],
      gradient: "from-tech-blue to-primary",
    },
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 px-6 relative overflow-hidden will-change-transform">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 will-change-transform"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.projects.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="card-gradient p-8 rounded-2xl border border-primary/20 smooth-transition hover:border-primary/50 group relative overflow-hidden will-change-transform"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 smooth-transition`} />
              
              <div className="relative z-10">
                <div className={`bg-gradient-to-br ${project.gradient} w-16 h-16 rounded-xl flex items-center justify-center mb-6 glow-effect`}>
                  <div className="text-white">{project.icon}</div>
                </div>

                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 text-center will-change-transform"
        >
          <div className="card-gradient p-8 rounded-2xl border border-primary/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{t.projects.more}</h3>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold smooth-transition hover:scale-105 glow-effect"
            >
              {t.projects.contact}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";