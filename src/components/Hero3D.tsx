import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RetroTV } from "./RetroTV";
import { GrainGradient } from '@paper-design/shaders-react';

// Controles simples sin auto-reset
const CameraControls = () => {
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate={false}
      target={[0, 0, 0]}
    />
  );
};

const Loader = () => {
  const joanLetters = ["J", "o", "a", "n"];
  const medinaLetters = ["M", "e", "d", "i", "n", "a"];

  return (
    <div className="loader-wrapper">
      <div className="loader-text">
        {/* Línea 1: Joan */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.1em' }}>
          {joanLetters.map((letter, index) => (
            <span key={`joan-${index}`} className="loader-letter" style={{ animationDelay: `${index * 0.1}s` }}>
              {letter}
            </span>
          ))}
          {/* Spacer between words */}
          <span style={{ width: '0.5em' }}></span>
          {/* Línea 2: Medina */}
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
  // Luz ambiente (ilumina todo uniformemente)
  ambient: {
    intensity: 1,      // Intensidad base (0-5)
    color: "#ffffff",    // Color de la luz ambiente
  },
  
  // Luz direccional (simula sol/dirección principal)
  directional: {
    intensity: 1,        // Intensidad (0-5)
    position: [5, 5, 5] as [number, number, number], // Posición [X, Y, Z]
    color: "#ffffff",    // Color de la luz direccional
  },
  
  // Luz puntual 1 (accent cyan)
  pointLight1: {
    intensity: 1.5,      // Intensidad (0-5)
    position: [-5, 3, 5] as [number, number, number], // Posición [X, Y, Z]
    color: "#00d4ff",    // Color cyan
  },
  
  // Luz puntual 2 (accent magenta)
  pointLight2: {
    intensity: 1,        // Intensidad (0-5)
    position: [5, -3, 3] as [number, number, number], // Posición [X, Y, Z]
    color: "#ff00ff",    // Color magenta
  },
};
// =========================================================================

// ==================== CONFIGURACIÓN LIQUID GLASS WRAPPER ====================
const GLASS_WRAPPER_CONFIG = {
  // Fondo del wrapper (opacidad y color)
  background: {
    opacity: 0.6,        // Opacidad del fondo (0-1) - 0.6 = 60% negro
    color: "black",      // Color base (black, white, o color hex)
  },
  
  // Efecto de blur (backdrop-blur)
  blur: {
    intensity: "xl",      // Intensidad: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  },
  
  // Bordes redondeados
  borderRadius: {
    size: "3xl",         // Tamaño: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  },
  
  // Padding interno
  padding: {
    size: 8,             // Padding en unidades Tailwind (8 = 2rem = 32px)
  },
  
  // Borde del wrapper
  border: {
    width: 1,            // Ancho del borde (1 = 1px)
    opacity: 0.1,        // Opacidad del borde (0-1)
    color: "white",      // Color del borde
  },
  
  // Sombra
  shadow: {
    size: "2xl",         // Tamaño: "sm" | "md" | "lg" | "xl" | "2xl"
    opacity: 1,          // Intensidad de la sombra (0-1)
  },
};
// =============================================================================

export const Hero3D = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 640, height: 360 }); // Start smaller

  useEffect(() => {
    // Initial set with half resolution for performance
    setDimensions({
      width: window.innerWidth / 2,
      height: window.innerHeight / 2
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth / 2,
        height: window.innerHeight / 2
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      
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

      {/* Gradient Background - Optimized Resolution */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 2.0, delay: 0.5 }}
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

      {/* Gradient Overlay - Improved for contrast */}
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
              className="relative z-30"
              style={{
                backgroundColor: `${GLASS_WRAPPER_CONFIG.background.color}${Math.round(GLASS_WRAPPER_CONFIG.background.opacity * 255).toString(16).padStart(2, '0')}`,
                backdropFilter: `blur(${GLASS_WRAPPER_CONFIG.blur.intensity === 'sm' ? '4px' : GLASS_WRAPPER_CONFIG.blur.intensity === 'md' ? '8px' : GLASS_WRAPPER_CONFIG.blur.intensity === 'lg' ? '12px' : GLASS_WRAPPER_CONFIG.blur.intensity === 'xl' ? '16px' : GLASS_WRAPPER_CONFIG.blur.intensity === '2xl' ? '24px' : '40px'})`,
                borderRadius: GLASS_WRAPPER_CONFIG.borderRadius.size === 'sm' ? '0.25rem' : GLASS_WRAPPER_CONFIG.borderRadius.size === 'md' ? '0.375rem' : GLASS_WRAPPER_CONFIG.borderRadius.size === 'lg' ? '0.5rem' : GLASS_WRAPPER_CONFIG.borderRadius.size === 'xl' ? '0.75rem' : GLASS_WRAPPER_CONFIG.borderRadius.size === '2xl' ? '1rem' : '1.5rem',
                padding: `${GLASS_WRAPPER_CONFIG.padding.size * 0.25}rem`,
                borderWidth: `${GLASS_WRAPPER_CONFIG.border.width}px`,
                borderColor: `${GLASS_WRAPPER_CONFIG.border.color}${Math.round(GLASS_WRAPPER_CONFIG.border.opacity * 255).toString(16).padStart(2, '0')}`,
                boxShadow: GLASS_WRAPPER_CONFIG.shadow.size === 'sm' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : GLASS_WRAPPER_CONFIG.shadow.size === 'md' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : GLASS_WRAPPER_CONFIG.shadow.size === 'lg' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : GLASS_WRAPPER_CONFIG.shadow.size === 'xl' ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 1.2, duration: 1.0, ease: "easeOut" }}
              >
                <span className="gradient-text" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>Joan Medina</span>
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-white/90 font-medium mb-8 drop-shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 1.4, duration: 1.0, ease: "easeOut" }}
              >
                Software Developer & 
                Creative Technologist
              </motion.p>

              <motion.p
                className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-12 drop-shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 1.6, duration: 1.0, ease: "easeOut" }}
              >
                 Multimedia Creator | 3D Artist | DJ
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 1.8, duration: 1.0, ease: "easeOut" }}
              >
                <a
                  href="#projects"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold smooth-transition hover:scale-105 glow-effect shadow-lg"
                >
                  Ver Proyectos
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-card/80 backdrop-blur-sm border-2 border-primary text-white rounded-lg font-semibold smooth-transition hover:scale-105 hover:bg-primary/10 shadow-lg"
                >
                  Contacto
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* TV Retro 3D a la derecha - PROTAGONISTA */}
          <motion.div 
            className="relative h-[400px] md:h-[500px] lg:h-[600px] order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
            style={{ overflow: 'visible' }}
          >
            <Canvas
              style={{ width: '150%', marginLeft: '-25%' }} 
              dpr={[1, 1]} // Optimization: Lowest safe DPI
              gl={{ 
                powerPreference: "high-performance", 
                antialias: false, // Disable antialias for performance
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
              <ambientLight 
                intensity={LIGHTING_CONFIG.ambient.intensity} 
                color={LIGHTING_CONFIG.ambient.color}
              />
              <directionalLight 
                position={LIGHTING_CONFIG.directional.position} 
                intensity={LIGHTING_CONFIG.directional.intensity}
                color={LIGHTING_CONFIG.directional.color}
              />
              <pointLight 
                position={LIGHTING_CONFIG.pointLight1.position} 
                intensity={LIGHTING_CONFIG.pointLight1.intensity} 
                color={LIGHTING_CONFIG.pointLight1.color}
              />
              <pointLight 
                position={LIGHTING_CONFIG.pointLight2.position} 
                intensity={LIGHTING_CONFIG.pointLight2.intensity} 
                color={LIGHTING_CONFIG.pointLight2.color}
              />
              
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
