import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from '@react-spring/three';
import { useIsMobile } from "@/hooks/use-mobile";

// ==================== CONFIGURACIÓN AJUSTABLE ====================
const TV_CONFIG = {
  // Escala del modelo (1 = tamaño original)
  scale: 3.5,
  
  // Posición [X, Y, Z]
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  
  // ========== OSCILACIÓN (Balanceo izquierda-derecha) ==========
  oscillation: {
    enabled: true,
    angleX: 0,
    angleY: 10, // Base angle
    angleZ: 0,
    speed: 0.6,
  },
  // =============================================================
  
  floatSpeed: 0.8,
  floatAmount: 0.1,
  
  initialRotation: {
    x: 0,
    y: -1.9,
    z: 0,
  },

  // Configuración específica para móvil
  mobile: {
    rotationY: -1.57, // Exactamente frontal (-90°)
    angleY: 8,        // Balanceo más sutil (izquierda a derecha)
    scale: 2.8,
  },
  
  entryAnimation: {
    enabled: false,
    duration: 1.8,
    delay: 0.5,
    initialOpacity: 1,
  },

  hover: {
    scaleAmount: 1.05,
    springConfig: {
      mass: 1,
      tension: 170,
      friction: 26,
    },
  },
};
// =================================================================

export const RetroTV = ({ onLoad }: { onLoad?: () => void }) => {
  const isMobile = useIsMobile();
  const outerGroupRef = useRef<THREE.Group>(null);
  const innerGroupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/retro_tv.glb");
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(!TV_CONFIG.entryAnimation.enabled);
  const materialsRef = useRef<THREE.Material[]>([]);

  const [isHovered, setIsHovered] = useState(false);
  
  const { springScale } = useSpring({
    springScale: isHovered ? TV_CONFIG.hover.scaleAmount : 1,
    config: {
      mass: 0.8,
      tension: 200,
      friction: 15,
    },
  });
  
  useEffect(() => {
    if (outerGroupRef.current) {
      const materials: THREE.Material[] = [];
      outerGroupRef.current.traverse((child) => {
        if ('isMesh' in child && child.isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const mat = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mat.forEach((m) => {
              m.transparent = false;
              m.opacity = 1;
              if ('precision' in m) m.precision = 'lowp';
              m.needsUpdate = true;
              materials.push(m);
            });
          }
        }
      });
      materialsRef.current = materials;
      
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
    if (isHovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [isHovered]);

  useFrame((state) => {
    const currentTime = state.clock.getElapsedTime();

    if (innerGroupRef.current) {
      const baseY = TV_CONFIG.position.y;
      innerGroupRef.current.position.y = baseY + Math.sin(currentTime * TV_CONFIG.floatSpeed) * TV_CONFIG.floatAmount;
      
      if (TV_CONFIG.oscillation.enabled) {
        const time = currentTime * TV_CONFIG.oscillation.speed;
        
        // Ajustar rotación base y amplitud según dispositivo
        const targetInitialY = isMobile ? TV_CONFIG.mobile.rotationY : TV_CONFIG.initialRotation.y;
        const targetAngleY = isMobile ? TV_CONFIG.mobile.angleY : TV_CONFIG.oscillation.angleY;

        innerGroupRef.current.rotation.x = TV_CONFIG.initialRotation.x + 
          Math.sin(time) * (TV_CONFIG.oscillation.angleX * Math.PI / 180);
        
        innerGroupRef.current.rotation.y = targetInitialY + 
          Math.sin(time) * (targetAngleY * Math.PI / 180);
        
        innerGroupRef.current.rotation.z = TV_CONFIG.initialRotation.z + 
          Math.sin(time) * (TV_CONFIG.oscillation.angleZ * Math.PI / 180);
      }
    }
  });

  const finalScale = isMobile ? TV_CONFIG.mobile.scale : TV_CONFIG.scale;

  return (
    <group 
      ref={outerGroupRef}
      position={[TV_CONFIG.position.x, TV_CONFIG.position.y, TV_CONFIG.position.z]}
      visible={isVisible}
    >
      <animated.group ref={innerGroupRef} scale={springScale.to(s => s * finalScale)}>
        <Center>
          <primitive
            object={clonedScene}
            onPointerOver={(e: any) => {
              e.stopPropagation();
              setIsHovered(true);
            }}
            onPointerOut={(e: any) => {
              e.stopPropagation();
              setIsHovered(false);
            }}
          />
        </Center>
      </animated.group>
    </group>
  );
};

useGLTF.preload("/retro_tv.glb");

