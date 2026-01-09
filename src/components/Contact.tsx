import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";

export const Contact = () => {
  const contactLinks = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "joan.medina@example.com",
      href: "mailto:joan.medina@example.com",
      gradient: "from-tech-cyan to-tech-blue",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      value: "linkedin.com/in/joanmedina",
      href: "https://linkedin.com",
      gradient: "from-tech-blue to-primary",
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      value: "github.com/joanmedina",
      href: "https://github.com",
      gradient: "from-tech-purple to-secondary",
    },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 px-6 bg-tech-darker/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Necesitas mi <span className="gradient-text">Contacto?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estoy disponible para oportunidades de desarrollo y colaboraciones
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="card-gradient p-8 rounded-2xl border border-primary/20 mb-8">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                {contactLinks.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar mi perfil de ${contact.label}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 p-4 bg-muted rounded-xl smooth-transition hover:bg-primary/10 hover:scale-105 group"
                  >
                    <div className={`bg-gradient-to-br ${contact.gradient} w-12 h-12 rounded-lg flex items-center justify-center glow-effect`}>
                      <div className="text-white">{contact.icon}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{contact.label}</div>
                      <div className="font-medium group-hover:text-primary smooth-transition">{contact.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-3 text-muted-foreground mb-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Reus, Barcelona - España</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>Disponible para llamadas y videollamadas</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="card-gradient p-6 rounded-xl border border-primary/20"
            >
              <h4 className="font-bold mb-3">¿Por qué trabajar conmigo?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>Enfoque creativo combinado con habilidades técnicas sólidas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>Experiencia en proyectos completos desde el concepto hasta la implementación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>Pasión por aprender nuevas tecnologías y metodologías</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>Capacidad para trabajar tanto en frontend como en backend</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-gradient p-8 rounded-2xl border border-primary/20"
          >
            <h3 className="text-2xl font-bold mb-6">Envíame un Mensaje</h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 smooth-transition"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 smooth-transition"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 smooth-transition resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold smooth-transition hover:scale-105 glow-effect"
              >
                Enviar Mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
