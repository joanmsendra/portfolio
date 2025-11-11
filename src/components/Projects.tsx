import { motion } from "framer-motion";
import { ExternalLink, Github, Smartphone, Gamepad2 } from "lucide-react";

export const Projects = () => {
  const projects = [
    {
      title: "App de Gestión de Equipos de Fútbol",
      description: "Aplicación completa y funcional para la gestión de equipos de fútbol. Incluye gestión de jugadores, estadísticas, calendarios de partidos y comunicación del equipo.",
      icon: <Smartphone className="w-8 h-8" />,
      tech: ["React", "Node.js", "MongoDB", "REST API"],
      gradient: "from-tech-cyan to-tech-blue",
    },
    {
      title: "Videojuego Interactivo",
      description: "Videojuego desarrollado desde cero con mecánicas avanzadas, gráficos personalizados y sistema de puntuación. Proyecto que demuestra dominio de programación de juegos y diseño de UX.",
      icon: <Gamepad2 className="w-8 h-8" />,
      tech: ["JavaScript", "HTML5 Canvas", "Game Design", "Animation"],
      gradient: "from-tech-purple to-secondary",
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Proyectos <span className="gradient-text">Destacados</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Proyectos desarrollados por amor al arte y la tecnología
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="card-gradient p-8 rounded-2xl border border-primary/20 smooth-transition hover:border-primary/50 hover:scale-[1.02] group relative overflow-hidden"
            >
              {/* Background Gradient Effect */}
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

                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium smooth-transition hover:scale-105 glow-effect">
                    <ExternalLink className="w-4 h-4" />
                    Ver Demo
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-card border border-primary/30 rounded-lg font-medium smooth-transition hover:border-primary hover:bg-primary/10">
                    <Github className="w-4 h-4" />
                    Código
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="card-gradient p-8 rounded-2xl border border-primary/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Más Proyectos en Desarrollo</h3>
            <p className="text-muted-foreground mb-6">
              Constantemente trabajo en nuevos proyectos que combinan programación, diseño y creatividad. 
              Cada proyecto es una oportunidad para aprender nuevas tecnologías y mejorar mis habilidades.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold smooth-transition hover:scale-105 glow-effect"
            >
              Contáctame para ver más
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
