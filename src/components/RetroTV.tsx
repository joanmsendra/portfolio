import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from '@react-spring/three';

// ==================== CONFIGURACIÓN AJUSTABLE ====================
const TV_CONFIG = {
  // Escala del modelo (1 = tamaño original)
  scale: 3.5,
  
  // Posición [X, Y, Z]
  // X: izquierda(-) / derecha(+)
  // Y: abajo(-) / arriba(+)
  // Z: lejos(-) / cerca(+)
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  
  // ========== OSCILACIÓN (Balanceo izquierda-derecha) ==========
  oscillation: {
    enabled: true,       // true = balanceo activado, false = sin balanceo
    
    // Ángulo máximo de balanceo en grados (cuánto se balancea)
    angleX: 0,           // Balanceo adelante/atrás (0 = sin balanceo X)
    angleY: 10,          // Balanceo izquierda/derecha (15° = balanceo suave Y) ← AJUSTA AQUÍ
    angleZ: 0,           // Balanceo lateral (0 = sin balanceo Z)
    
    // Velocidad del balanceo (mayor = más rápido)
    speed: 0.6,          // Velocidad del péndulo (0.5 = lento, 1.5 = rápido) ← AJUSTA AQUÍ
  },
  // =============================================================
  
  // Animación de flotación
  floatSpeed: 0.8,     // Velocidad del movimiento arriba/abajo
  floatAmount: 0.1,    // Amplitud del movimiento (qué tan alto/bajo)
  
  // Inclinación inicial [X, Y, Z] en radianes (posición de reposo)
  initialRotation: {
    x: 0,
    y: -1.9,
    z: 0,
  },
  
  // Animación de entrada (solo fade-in con opacity)
  entryAnimation: {
    enabled: false,      // true = con animación, false = aparece directo (SIEMPRE 100% OPACITY)
    duration: 1.8,       // Duración en segundos (no se usa si enabled = false)
    delay: 0.5,          // Delay antes de empezar (no se usa si enabled = false)
    initialOpacity: 1,   // Opacity inicial (1 = siempre visible)
  },

  // Efecto hover para el modelo 3D
  hover: {
    scaleAmount: 1.05,   // Factor de escala al hacer hover (1.05 = 5% más grande)
    springConfig: {
      mass: 1,           // Masa para la física del resorte
      tension: 170,      // Tensión del resorte
      friction: 26,      // Fricción del resorte
    },
  },
};
// =================================================================

export const RetroTV = ({ onLoad }: { onLoad?: () => void }) => {
  const outerGroupRef = useRef<THREE.Group>(null);
  const innerGroupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/retro_tv.glb");
  
  // Memoize cloned scene to prevent expensive cloning on every render
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  // Estado para animación de entrada
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(!TV_CONFIG.entryAnimation.enabled);
  const loadTimeRef = useRef(0);
  const materialsRef = useRef<THREE.Material[]>([]);

  // Estado para el hover
  const [isHovered, setIsHovered] = useState(false);
  
  // Animación de escala con spring para el hover
  const { springScale } = useSpring({
    springScale: isHovered ? TV_CONFIG.hover.scaleAmount : 1,
    config: {
      mass: 0.8, // Menor masa para respuesta más rápida
      tension: 200, // Mayor tensión para más "fuerza"
      friction: 15, // Menor fricción para menos rebote
    },
  });
  
  // Clonar el modelo para evitar problemas de reutilización
  // const clonedScene = scene.clone(); // Moved to useMemo above
  
  useEffect(() => {
    // Recopilar todos los materiales del modelo
    if (outerGroupRef.current) {
      const materials: THREE.Material[] = [];
      outerGroupRef.current.traverse((child) => {
        if ('isMesh' in child && child.isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const mat = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mat.forEach((m) => {
              // SIEMPRE 100% OPACITY - Sin transparencia
              m.transparent = false;
              m.opacity = 1;
              materials.push(m);
            });
          }
        }
      });
      materialsRef.current = materials;
      
      // Hacer visible después de un pequeño delay para que se cargue todo
      setTimeout(() => {
        setIsVisible(true);
        setIsLoaded(true);
        onLoad?.();
      }, 50);
    } else {
      setIsLoaded(true);
      setIsVisible(true);
      onLoad?.();
    }
  }, [onLoad]);

  useEffect(() => {
    // Set cursor to pointer when hovered
    if (isHovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [isHovered]);

  useFrame((state) => {
    const currentTime = state.clock.getElapsedTime();

    if (innerGroupRef.current) {
      // Animación de flotación (solo en Y)
      const baseY = TV_CONFIG.position.y;
      innerGroupRef.current.position.y = baseY + Math.sin(currentTime * TV_CONFIG.floatSpeed) * TV_CONFIG.floatAmount;
      
      // Oscilación (balanceo) - como un péndulo
      if (TV_CONFIG.oscillation.enabled) {
        const time = currentTime * TV_CONFIG.oscillation.speed;
        
        // Convertir grados a radianes y aplicar oscilación con sin()
        innerGroupRef.current.rotation.x = TV_CONFIG.initialRotation.x + 
          Math.sin(time) * (TV_CONFIG.oscillation.angleX * Math.PI / 180);
        
        innerGroupRef.current.rotation.y = TV_CONFIG.initialRotation.y + 
          Math.sin(time) * (TV_CONFIG.oscillation.angleY * Math.PI / 180);
        
        innerGroupRef.current.rotation.z = TV_CONFIG.initialRotation.z + 
          Math.sin(time) * (TV_CONFIG.oscillation.angleZ * Math.PI / 180);
      }
    }
  });

  return (
    <group 
      ref={outerGroupRef}
      position={[TV_CONFIG.position.x, TV_CONFIG.position.y, TV_CONFIG.position.z]}
      visible={isVisible}
    >
      {/* Aplicamos la animación de escala al grupo interno que también rota y se flota */}
      <animated.group ref={innerGroupRef} scale={springScale.to(s => s * TV_CONFIG.scale)}>
        <Center>
          {/* Detectamos eventos SOLO en la malla primitiva para precisión */}
          <primitive
            object={clonedScene}
            onPointerOver={(e) => {
              e.stopPropagation();
              setIsHovered(true);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setIsHovered(false);
            }}
          />
        </Center>
      </animated.group>
    </group>
  );
};

// Preload del modelo para mejor rendimiento
useGLTF.preload("/retro_tv.glb");

