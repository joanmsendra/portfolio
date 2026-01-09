import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RetroTV } from "./RetroTV";
import { GrainGradient } from '@paper-design/shaders-react';
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

// Controles simples sin auto-reset
const CameraControls = () => {
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate={false}
      target={[0, 0, 0]}
      makeDefault
    />
  );
};

const Loader = () => {
  const joanLetters = ["J", "o", "a", "n"];
  const medinaLetters = ["M", "e", "d", "i", "n", "a"];

  return (
    <div className="loader-wrapper">
      <div className="loader-text">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.1em' }}>
          {joanLetters.map((letter, index) => (
            <span key={`joan-${index}`} className="loader-letter" style={{ animationDelay: `${index * 0.1}s` }}>
              {letter}
            </span>
          ))}
          <span style={{ width: '0.5em' }}></span>
          {medinaLetters.map((letter, index) => (
            <span key={`medina-${index}`} className="loader-letter" style={{ animationDelay: `${(index + joanLetters.length) * 0.1}s` }}>
              {letter}
            </span>
          ))}
        </div>
      </div>
      <div className="loader"></div>
    </div>
  );
};

// ==================== CONFIGURACIÓN DE ILUMINACIÓN 3D ====================
const LIGHTING_CONFIG = {
  ambient: {
    intensity: 1,
    color: "#ffffff",
  },
  directional: {
    intensity: 1,
    position: [5, 5, 5] as [number, number, number],
    color: "#ffffff",
  },
  pointLight1: {
    intensity: 1.5,
    position: [-5, 3, 5] as [number, number, number],
    color: "#00d4ff",
  },
  pointLight2: {
    intensity: 1,
    position: [5, -3, 3] as [number, number, number],
    color: "#ff00ff",
  },
};

// ==================== CONFIGURACIÓN LIQUID GLASS WRAPPER ====================
const GLASS_WRAPPER_CONFIG = {
  background: {
    opacity: 0.6,
    color: "black",
  },
  blur: {
    intensity: "xl",
  },
  borderRadius: {
    size: "3xl",
  },
  padding: {
    size: 8,
  },
  border: {
    width: 1,
    opacity: 0.1,
    color: "white",
  },
  shadow: {
    size: "2xl",
    opacity: 1,
  },
};

export const Hero3D = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [dpr, setDpr] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.1 }); // Se activa cuando se ve al menos un 10%
  
  const [dimensions, setDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth / 2 : 640, 
    height: typeof window !== 'undefined' ? window.innerHeight / 2 : 360 
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth / 2,
          height: window.innerHeight / 2
        });
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    
    const failsafe = setTimeout(() => {
      if (!isLoaded) setIsLoaded(true);
    }, 4000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      clearTimeout(failsafe);
    };
  }, [isLoaded]);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      
      {/* Loading Overlay */}
      <motion.div
        className="absolute inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
        style={{ pointerEvents: isLoaded ? 'none' : 'all' }}
      >
        {!isLoaded && <Loader />}
      </motion.div>

      {/* Gradient Background - Keep mounted to avoid reloading, but stop rendering when not in view */}
      <motion.div 
        className="absolute inset-0 z-0 will-change-transform"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 2.0, delay: 0.5 }}
        style={{ display: isInView ? 'block' : 'none' }}
      >
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, transform: 'scale(2)', transformOrigin: 'top left' }}>
            <GrainGradient
                width={dimensions.width}
                height={dimensions.height}
                colors={["#7300ff", "#eba8ff", "#00bfff", "#2b00ff"]}
                colorBack="#000000"
                softness={0.5}
                intensity={0.5}
                noise={0.25}
                shape="corners"
                speed={1}
            />
        </div>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-screen">
          
          {/* Texto a la izquierda */}
          <div className="text-center lg:text-left order-2 lg:order-1 px-6 lg:pl-20 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative z-30 will-change-transform"
              style={{
                backgroundColor: isMobile 
                  ? `${GLASS_WRAPPER_CONFIG.background.color}${Math.round(0.3 * 255).toString(16).padStart(2, '0')}`
                  : `${GLASS_WRAPPER_CONFIG.background.color}${Math.round(GLASS_WRAPPER_CONFIG.background.opacity * 255).toString(16).padStart(2, '0')}`,
                backdropFilter: `blur(${isMobile ? '8px' : '16px'})`,
                borderRadius: '1.5rem',
                padding: `${GLASS_WRAPPER_CONFIG.padding.size * 0.25}rem`,
                borderWidth: '1px',
                borderColor: `white${Math.round(0.1 * 255).toString(16).padStart(2, '0')}`,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-xl will-change-transform"
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 1.2, duration: 1.0, ease: "easeOut" }}
              >
                <span className="gradient-text" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>{t.hero.title}</span>
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-white/90 font-medium mb-8 drop-shadow-md will-change-transform"
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 1.4, duration: 1.0, ease: "easeOut" }}
              >
                {t.hero.role}
              </motion.p>

              <motion.p
                className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-12 drop-shadow-sm will-change-transform"
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 1.6, duration: 1.0, ease: "easeOut" }}
              >
                 {t.hero.subrole}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start will-change-transform"
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 1.8, duration: 1.0, ease: "easeOut" }}
              >
                <a
                  href="#projects"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold smooth-transition hover:scale-105 glow-effect shadow-lg"
                >
                  {t.hero.ctaProject}
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-card/80 backdrop-blur-sm border-2 border-primary text-white rounded-lg font-semibold smooth-transition hover:scale-105 hover:bg-primary/10 shadow-lg"
                >
                  {t.hero.ctaContact}
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* TV Retro 3D - Keep mounted, control frameloop for performance */}
          <motion.div 
            className="relative h-[400px] md:h-[500px] lg:h-[600px] order-1 lg:order-2 will-change-transform"
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
            style={{ overflow: 'visible' }}
          >
            <Canvas
              style={{ width: '150%', marginLeft: '-25%', pointerEvents: isInView ? 'auto' : 'none' }} 
              dpr={dpr}
              frameloop={isInView ? 'always' : 'never'}
              gl={{ 
                powerPreference: "high-performance", 
                antialias: false,
                stencil: false,
                depth: true,
                alpha: true
              }}
              performance={{ min: 0.5 }}
              camera={{ 
                position: [0, 0, 4],
                fov: 45,
                near: 0.1,
                far: 1000
              }}
            >
              <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
              <ambientLight intensity={LIGHTING_CONFIG.ambient.intensity} color={LIGHTING_CONFIG.ambient.color} />
              <directionalLight position={LIGHTING_CONFIG.directional.position} intensity={LIGHTING_CONFIG.directional.intensity} color={LIGHTING_CONFIG.directional.color} />
              <pointLight position={LIGHTING_CONFIG.pointLight1.position} intensity={LIGHTING_CONFIG.pointLight1.intensity} color={LIGHTING_CONFIG.pointLight1.color} />
              <pointLight position={LIGHTING_CONFIG.pointLight2.position} intensity={LIGHTING_CONFIG.pointLight2.intensity} color={LIGHTING_CONFIG.pointLight2.color} />
              <RetroTV onLoad={() => setIsLoaded(true)} />
              <CameraControls />
            </Canvas>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ delay: 2.5, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-2 bg-black/30 backdrop-blur-sm">
          <div className="w-1 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};