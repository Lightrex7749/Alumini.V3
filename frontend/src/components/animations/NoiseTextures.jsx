import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Noise/Grain Texture Overlay
const NoiseOverlay = ({ 
  className = "",
  opacity = 0.05,
  blendMode = "overlay"
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 256;
    const height = canvas.height = 256;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 255;
      data[i] = noise;     // R
      data[i + 1] = noise; // G
      data[i + 2] = noise; // B
      data[i + 3] = 255;   // A
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-[9999] ${className}`}
      style={{
        opacity,
        mixBlendMode: blendMode,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }}
    />
  );
};

// CSS-based noise (lighter weight)
const CSSNoiseOverlay = ({ 
  className = "",
  opacity = 0.03,
  animate = true
}) => {
  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-[9999] ${className}`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
        backgroundRepeat: 'repeat',
      }}
    >
      {animate && (
        <motion.div 
          className="w-full h-full"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      )}
    </div>
  );
};

// Gradient Noise Mesh
const GradientNoiseMesh = ({ 
  className = "",
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"]
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, ${colors[0]}40 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, ${colors[1]}40 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, ${colors[2]}40 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, ${colors[3]}40 0%, transparent 50%)
          `,
        }}
      />
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
};

// Film Grain Effect
const FilmGrain = ({ className = "", opacity = 0.04 }) => {
  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-[9999] ${className}`}
      style={{ opacity }}
    >
      <svg className="w-full h-full">
        <filter id="filmGrain">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="4" 
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect 
          width="100%" 
          height="100%" 
          filter="url(#filmGrain)" 
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

// Animated grain that changes
const AnimatedGrain = ({ className = "", opacity = 0.05 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 256;
    const height = canvas.height = 256;

    let animationId;

    const renderNoise = () => {
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(renderNoise);
    };

    // Throttle animation to ~15fps for performance
    const throttledRender = () => {
      renderNoise();
      setTimeout(() => {
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(throttledRender);
      }, 66); // ~15fps
    };

    throttledRender();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-[9999] ${className}`}
      style={{
        opacity,
        mixBlendMode: 'overlay',
      }}
    />
  );
};

// Scanlines Effect (Retro/CRT style)
const Scanlines = ({ className = "", opacity = 0.05 }) => {
  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-[9998] ${className}`}
      style={{
        opacity,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 1px,
          rgba(0, 0, 0, 0.3) 1px,
          rgba(0, 0, 0, 0.3) 2px
        )`,
      }}
    />
  );
};

// Vignette Effect
const Vignette = ({ 
  className = "",
  intensity = 0.4,
  color = "rgba(0,0,0,0.6)"
}) => {
  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-[9997] ${className}`}
      style={{
        background: `radial-gradient(ellipse at center, transparent 0%, ${color} 100%)`,
        opacity: intensity,
      }}
    />
  );
};

export { 
  NoiseOverlay, 
  CSSNoiseOverlay, 
  GradientNoiseMesh,
  FilmGrain,
  AnimatedGrain,
  Scanlines,
  Vignette
};
