import { motion } from "framer-motion";

export const Metaballs = () => {
  // Grupo 1: Fondo (Más lentos, más "lejanos")
  const blobsBack = [
    { size: 450, duration: 45, initialX: "5%", initialY: "15%" },
    { size: 350, duration: 40, initialX: "85%", initialY: "10%" },
    { size: 300, duration: 38, initialX: "75%", initialY: "65%" },
  ];

  // Grupo 2: Frente (Más rápidos, más definidos, interacción principal)
  const blobsFront = [
    { size: 400, duration: 25, initialX: "15%", initialY: "5%" },
    { size: 280, duration: 28, initialX: "90%", initialY: "30%" },
    { size: 350, duration: 30, initialX: "45%", initialY: "80%" },
    { size: 200, duration: 26, initialX: "55%", initialY: "25%" },
  ];

  // Estilo para las "bolas" individuales antes de fusionarse
  // Usamos blanco puro para máxima inversión con mix-blend-mode
  const blobStyle = {
    backgroundColor: "#032644",
    willChange: "transform", // Optimización de rendimiento
    backfaceVisibility: "hidden", // Optimización de rendimiento
    transform: "translateZ(0)", // Activar aceleración por hardware
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg className="hidden">
        <defs>
          {/* 
            Filtro para el Grupo Frontal 
            Ajustado para bordes nítidos ("trazo" definido) y fusión líquida
            Aumentamos stdDeviation para que se junten desde más lejos
          */}
          <filter id="goo-front">
            <feGaussianBlur in="SourceGraphic" stdDeviation="35" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              // Aumentamos el multiplicador alpha (18 -> 30) para mantener el borde duro
              // Reducimos el threshold (-7 -> -10) para compensar el desenfoque
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10"
              result="goo"
            />
            {/* Añade un ligero borde/resplandor compuesto */}
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#ffffff" floodOpacity="0.5" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>

          {/* 
            Filtro para el Grupo Trasero
            Ligeramente diferente para dar profundidad
          */}
          <filter id="goo-back">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Capa 1: Fondo (Menos opacidad para simular profundidad) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-40"
        style={{ filter: "url(#goo-back)" }}
      >
        {blobsBack.map((blob, i) => (
          <motion.div
            key={`back-${i}`}
            className="absolute rounded-full"
            style={{
              width: blob.size,
              height: blob.size,
              ...blobStyle,
            }}
            animate={{
              x: [0, Math.random() * 150 - 75, Math.random() * 150 - 75, 0],
              y: [0, Math.random() * 150 - 75, Math.random() * 150 - 75, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            initial={{
              left: blob.initialX,
              top: blob.initialY,
            }}
          />
        ))}
      </div>

      {/* Capa 2: Frente (Opacidad completa para inversión fuerte y borde definido) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ filter: "url(#goo-front)" }}
      >
        {blobsFront.map((blob, i) => (
          <motion.div
            key={`front-${i}`}
            className="absolute rounded-full"
            style={{
              width: blob.size,
              height: blob.size,
              ...blobStyle,
            }}
            animate={{
              x: [0, Math.random() * 250 - 125, Math.random() * 250 - 125, 0],
              y: [0, Math.random() * 250 - 125, Math.random() * 250 - 125, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            initial={{
              left: blob.initialX,
              top: blob.initialY,
            }}
          />
        ))}
      </div>
    </div>
  );
};
