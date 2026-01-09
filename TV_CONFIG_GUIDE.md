# 🎮 Guía de Configuración del TV Retro 3D

## 📍 Ubicación del archivo
`src/components/RetroTV.tsx`

## ⚙️ Configuración disponible

### 1. **Escala (Tamaño)**
```typescript
scale: 2.5,  // 1 = tamaño original, 2 = doble, 0.5 = mitad
```

### 2. **Posición [X, Y, Z]**
```typescript
position: {
  x: 0,  // Izquierda (-) / Derecha (+)
  y: 0,  // Abajo (-) / Arriba (+)
  z: 0,  // Lejos (-) / Cerca (+)
}
```

**Ejemplos:**
- Mover a la derecha: `x: 2`
- Mover arriba: `y: 1`
- Acercar a la cámara: `z: 2`

### 3. **Oscilación (Balanceo tipo péndulo)** ⚡ NUEVO
```typescript
oscillation: {
  enabled: true,        // true = balanceo ON, false = balanceo OFF
  angleX: 0,            // Balanceo adelante/atrás (en grados)
  angleY: 15,           // Balanceo izquierda/derecha (en grados) ← PRINCIPAL
  angleZ: 0,            // Balanceo lateral (en grados)
  speed: 0.8,           // Velocidad del balanceo
}
```

**Valores recomendados para angleY (izquierda/derecha):**
- `0` = Sin balanceo
- `5` = Balanceo muy sutil
- `10` = Balanceo suave
- `15` = Balanceo normal (actual) ✓
- `25` = Balanceo pronunciado
- `45` = Balanceo exagerado

**Velocidad del balanceo (speed):**
- `0.3` = Muy lento (relajado)
- `0.5` = Lento
- `0.8` = Normal (actual) ✓
- `1.2` = Rápido
- `2.0` = Muy rápido

**Combinaciones interesantes:**
- Solo Y: `angleX: 0, angleY: 15, angleZ: 0` → Balanceo izq/der
- Solo X: `angleX: 10, angleY: 0, angleZ: 0` → Balanceo adelante/atrás
- Combinado: `angleX: 8, angleY: 12, angleZ: 0` → Balanceo complejo
- Lateral: `angleX: 0, angleY: 0, angleZ: 10` → Balanceo lateral

### 4. **Animación de entrada (solo fade-in)** ⚡
```typescript
entryAnimation: {
  enabled: true,         // true = con animación, false = aparece directo
  duration: 0.8,         // Duración en segundos
  delay: 0,             // Delay antes de empezar
  initialOpacity: 0,    // Opacity inicial (0 = invisible)
}
```

**Animación simple y limpia:**
- Fade-in real (opacity 0 → 1)
- Sin movimiento, solo aparición gradual
- Easing suave (ease-out cubic)
- Sin cambio de escala (mantiene rotación correcta)

**Valores recomendados para duration:**
- `0.5` = Muy rápido
- `0.8` = Normal (actual) ✓
- `1.0` = Suave
- `1.5` = Lento
- `2.0` = Muy lento

**initialOpacity (transparencia inicial):**
- `0` = Completamente invisible (actual) ✓
- `0.3` = Empieza ligeramente visible
- `0.5` = Empieza semi-transparente
- `1` = Sin fade-in (aparece instantáneamente)

### 5. **Animación de flotación**
```typescript
floatSpeed: 0.8,     // Velocidad del sube/baja (mayor = más rápido)
floatAmount: 0.2,    // Amplitud del movimiento (mayor = más alto/bajo)
```

**Ejemplos:**
- Sin flotación: `floatAmount: 0`
- Flotación sutil: `floatAmount: 0.1`
- Flotación normal: `floatAmount: 0.2` (actual)
- Flotación pronunciada: `floatAmount: 0.5`

### 5. **Inclinación inicial (radianes)**
```typescript
initialRotation: {
  x: 0,  // Inclinación frontal/trasera
  y: 0,  // Giro izquierda/derecha
  z: 0,  // Inclinación lateral
}
```

**Conversión grados → radianes:**
- 45° = `Math.PI / 4` ≈ `0.785`
- 90° = `Math.PI / 2` ≈ `1.57`
- 180° = `Math.PI` ≈ `3.14`

**Ejemplos:**
- Inclinar ligeramente: `x: 0.2`
- Girar 45°: `y: 0.785`

## 🎯 Ejemplos de configuraciones

### Configuración actual (fade-in simple)
```typescript
const TV_CONFIG = {
  scale: 2.5,
  position: { x: 0, y: 0, z: 0 },
  oscillation: {
    enabled: true,
    angleX: 0,
    angleY: 15,
    angleZ: 0,
    speed: 0.8,
  },
  floatSpeed: 0.8,
  floatAmount: 0.2,
  initialRotation: { x: 0, y: 0, z: 0 },
  entryAnimation: {
    enabled: true,
    duration: 0.8,
    delay: 0,
    initialOpacity: 0,   // Fade-in completo
  }
};
```

### Entrada rápida
```typescript
const TV_CONFIG = {
  scale: 2.5,
  position: { x: 0, y: 0, z: 0 },
  oscillation: {
    enabled: true,
    angleX: 0,
    angleY: 12,
    angleZ: 0,
    speed: 0.8,
  },
  floatSpeed: 0.8,
  floatAmount: 0.2,
  initialRotation: { x: 0, y: 0, z: 0 },
  entryAnimation: {
    enabled: true,
    duration: 0.5,       // Muy rápido
    delay: 0,
    initialOpacity: 0,
  }
};
```

### Entrada lenta y sutil
```typescript
const TV_CONFIG = {
  scale: 2.5,
  position: { x: 0, y: 0, z: 0 },
  oscillation: {
    enabled: true,
    angleX: 0,
    angleY: 10,
    angleZ: 0,
    speed: 0.6,
  },
  floatSpeed: 0.6,
  floatAmount: 0.15,
  initialRotation: { x: 0, y: 0, z: 0 },
  entryAnimation: {
    enabled: true,
    duration: 1.5,       // Lento y suave
    delay: 0.3,
    initialOpacity: 0.3, // Empieza un poco visible
  }
};
```

### Aparición inmediata (sin fade-in)
```typescript
const TV_CONFIG = {
  scale: 2.5,
  position: { x: 0, y: 0, z: 0 },
  oscillation: {
    enabled: true,
    angleX: 0,
    angleY: 15,
    angleZ: 0,
    speed: 0.8,
  },
  floatSpeed: 0.8,
  floatAmount: 0.2,
  initialRotation: { x: 0, y: 0, z: 0 },
  entryAnimation: {
    enabled: true,
    duration: 0,
    delay: 0,
    initialOpacity: 1,   // Visible desde el inicio
  }
};
```

### TV estático (sin animaciones - aparece instantáneamente)
```typescript
const TV_CONFIG = {
  scale: 2.5,
  position: { x: 0, y: 0, z: 0 },
  oscillation: {
    enabled: false,  // Sin balanceo
    angleX: 0,
    angleY: 0,
    angleZ: 0,
    speed: 0,
  },
  floatSpeed: 0,
  floatAmount: 0,    // Sin flotación
  initialRotation: { x: 0, y: 0, z: 0 },
  entryAnimation: {
    enabled: false,    // Sin animación de entrada
    duration: 0,
    delay: 0,
    initialOpacity: 1, // Visible desde el inicio
  }
};
```

## 🎥 Configuración de la cámara

Si necesitas ajustar la cámara, edita `src/components/Hero3D.tsx`:

```typescript
camera={{ 
  position: [0, 0, 8],  // Posición de la cámara [X, Y, Z]
  fov: 45,              // Campo de visión (menor = más zoom)
  near: 0.1,
  far: 1000
}}
```

## 🕹️ Controles del usuario

- **Click y arrastrar**: Rotar la vista del modelo
- **Zoom desactivado**: No se puede hacer zoom con el scroll del mouse
- **Sin auto-reset**: La cámara permanece donde la dejes
- El TV balancea automáticamente según configuración de `oscillation`

## 💡 Tips

1. **Después de cambiar TV_CONFIG**: Guarda el archivo, el hot-reload actualizará automáticamente
2. **Si el objeto no se ve**: Prueba mover la cámara más lejos: `position: [0, 0, 12]`
3. **Si rota muy rápido**: Reduce `rotationSpeed` a `0.2` o `0.3`
4. **Para centrar mejor**: Usa `position.y` positivo o negativo según necesites

## 🐛 Solución de problemas

**El TV no aparece:**
- Verifica que `retro_tv.glb` esté en `/public/`
- Aumenta la distancia de la cámara: `position: [0, 0, 10]`
- Reduce `scale` a `1.5`

**El TV rota de forma extraña:**
- El componente `<Center>` asegura que rote sobre su propio centro
- Verifica que `rotationSpeed` no sea demasiado alto

**El TV está cortado:**
- Aumenta el `fov` de la cámara a `60` o `75`
- Aleja la cámara: `position: [0, 0, 10]`

