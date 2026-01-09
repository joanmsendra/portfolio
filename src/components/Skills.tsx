import { motion } from "framer-motion";
import { Code2, Globe, Database, Cloud } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: t.skills.core,
      skills: ["JavaScript (ES6+)", "TypeScript", "C", "C++", "Python", "Java"],
      color: "from-tech-cyan to-tech-blue",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t.skills.mobile,
      skills: ["React Native", "React.js", "Three.js/WebGL", "Unity 3D", "HTML5/CSS3", "Redux"],
      color: "from-primary to-tech-purple",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t.skills.backend,
      skills: ["Node.js", "MySQL", "MongoDB", "REST APIs", "Flask"],
      color: "from-tech-purple to-secondary",
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: t.skills.cloud,
      skills: ["AWS Cloud Practitioner", "Docker", "Git/GitHub", "Cisco CCNA", "Linux"],
      color: "from-tech-blue to-primary",
    },
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 px-6 bg-tech-darker/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.skills.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card-gradient p-8 rounded-2xl border border-primary/20 smooth-transition hover:border-primary/50 group will-change-transform"
            >
              <div className={`bg-gradient-to-br ${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow smooth-transition`}>
                <div className="text-white">{category.icon}</div>
              </div>
              
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + skillIndex * 0.05, duration: 0.3 }}
                    className="px-3 py-1 bg-muted rounded-full text-sm text-foreground smooth-transition hover:bg-primary hover:text-primary-foreground cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Technical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">{t.skills.additional}</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["Git", "GitHub", "SQL", "MongoDB", "REST APIs", "Responsive Design", "Webpack", "Vite"].map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.05, duration: 0.3 }}
                className="px-5 py-2 bg-card border border-primary/30 rounded-lg text-sm font-medium smooth-transition hover:border-primary hover:bg-primary/10"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
