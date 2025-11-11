import { Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            © {currentYear} Joan Medina. Todos los derechos reservados.
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
            <span>y mucho código</span>
          </div>

          <div className="flex gap-4">
            <a
              href="#about"
              className="text-muted-foreground hover:text-primary smooth-transition text-sm"
            >
              Sobre Mí
            </a>
            <a
              href="#skills"
              className="text-muted-foreground hover:text-primary smooth-transition text-sm"
            >
              Habilidades
            </a>
            <a
              href="#projects"
              className="text-muted-foreground hover:text-primary smooth-transition text-sm"
            >
              Proyectos
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-primary smooth-transition text-sm"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
