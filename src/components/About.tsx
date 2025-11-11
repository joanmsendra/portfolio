import { motion } from "framer-motion";
import { MapPin, GraduationCap, Code, Music } from "lucide-react";

export const About = () => {
  const facts = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Ubicación",
      description: "De Reus, estudiando en Barcelona",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Estudios",
      description: "Técnicas de Aplicaciones de Software - La Salle Bonanova",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Pasión",
      description: "Programación, diseño y tecnología creativa",
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Extra",
      description: "DJ profesional para financiar mis estudios",
    },
  ];

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre <span className="gradient-text">Mí</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Desarrollador apasionado por crear experiencias digitales únicas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Soy un desarrollador de software en formación con una pasión por la tecnología y la creatividad. 
              Mi enfoque combina habilidades técnicas sólidas con un ojo artístico, lo que me permite crear 
              soluciones innovadoras y visualmente atractivas.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Además de la programación, tengo experiencia en diseño gráfico, edición de video y producción 
              musical como DJ. Esta combinación única me permite aportar una perspectiva creativa a cada 
              proyecto técnico que desarrollo.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              He creado proyectos ambiciosos como aplicaciones completas para equipos de fútbol y videojuegos, 
              demostrando mi capacidad para llevar ideas desde el concepto hasta la implementación completa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card-gradient p-6 rounded-xl border border-primary/20 smooth-transition hover:border-primary/50 hover:scale-105"
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
};
