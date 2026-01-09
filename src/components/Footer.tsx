import { Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            © {currentYear} Joan Medina. {t.footer.rights}
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
          </div>

          <div className="flex gap-4">
            <a
              href="#about"
              className="text-muted-foreground hover:text-primary smooth-transition text-sm"
            >
              {t.header.about}
            </a>
            <a
              href="#skills"
              className="text-muted-foreground hover:text-primary smooth-transition text-sm"
            >
              {t.header.skills}
            </a>
            <a
              href="#projects"
              className="text-muted-foreground hover:text-primary smooth-transition text-sm"
            >
              {t.header.projects}
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-primary smooth-transition text-sm"
            >
              {t.header.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
