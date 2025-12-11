import { motion } from 'framer-motion';

// Animated Morphing Blob
const MorphingBlob = ({ 
  className = "", 
  color1 = "#3b82f6",
  color2 = "#8b5cf6",
  size = 400,
  duration = 8,
  blur = 60
}) => {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color1}, ${color2})`,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Multiple Floating Blobs
const FloatingBlobs = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <MorphingBlob 
        className="top-[-10%] left-[-10%] opacity-40"
        color1="#3b82f6"
        color2="#06b6d4"
        size={500}
        duration={10}
      />
      <MorphingBlob 
        className="top-[20%] right-[-15%] opacity-30"
        color1="#8b5cf6"
        color2="#ec4899"
        size={400}
        duration={12}
      />
      <MorphingBlob 
        className="bottom-[-20%] left-[20%] opacity-30"
        color1="#10b981"
        color2="#06b6d4"
        size={450}
        duration={15}
      />
    </div>
  );
};

// Gradient Orbs (Static with subtle animation)
const GradientOrb = ({ 
  className = "",
  color = "blue",
  size = "lg"
}) => {
  const colors = {
    blue: "from-blue-500/40 to-cyan-500/40",
    purple: "from-purple-500/40 to-pink-500/40",
    green: "from-green-500/40 to-emerald-500/40",
    orange: "from-orange-500/40 to-red-500/40",
    pink: "from-pink-500/40 to-rose-500/40",
  };

  const sizes = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
    xl: "w-96 h-96",
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br ${colors[color]} blur-3xl pointer-events-none ${sizes[size]} ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Animated SVG Blob
const SVGBlob = ({ 
  className = "",
  fill = "url(#gradient)",
  animated = true 
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`absolute pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <motion.path
        fill={fill}
        animate={animated ? {
          d: [
            "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.7,-0.8C87.4,14.7,82.1,29.4,74.5,43.1C66.8,56.8,56.7,69.5,43.4,77.3C30.1,85.2,13.6,88.2,-2.4,91.9C-18.3,95.6,-36.7,100,-51.2,93.9C-65.8,87.8,-76.5,71.3,-83.4,53.7C-90.3,36.1,-93.3,18.1,-91.7,0.9C-90.1,-16.2,-83.8,-32.5,-74.7,-46.5C-65.6,-60.5,-53.6,-72.3,-39.7,-79.6C-25.9,-87,-12.9,-89.9,1.2,-91.9C15.4,-94,30.7,-95.2,44.7,-76.4Z",
            "M39.5,-67.4C52.5,-60.6,65.4,-52.5,73.9,-40.6C82.4,-28.8,86.4,-14.4,85.9,-0.3C85.4,13.8,80.3,27.6,72.5,40.1C64.7,52.6,54.1,63.8,41.3,71.5C28.5,79.2,13.6,83.4,-0.8,84.8C-15.2,86.2,-30.4,84.8,-43.4,78.1C-56.4,71.4,-67.2,59.4,-75.4,45.5C-83.6,31.7,-89.2,15.8,-89.3,-0.1C-89.4,-15.9,-84,-31.9,-74.9,-44.9C-65.8,-58,-53,-68.2,-39.1,-74.5C-25.2,-80.9,-12.6,-83.4,0.7,-84.6C14,-85.8,28,-86.7,39.5,-67.4Z",
            "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.7,-0.8C87.4,14.7,82.1,29.4,74.5,43.1C66.8,56.8,56.7,69.5,43.4,77.3C30.1,85.2,13.6,88.2,-2.4,91.9C-18.3,95.6,-36.7,100,-51.2,93.9C-65.8,87.8,-76.5,71.3,-83.4,53.7C-90.3,36.1,-93.3,18.1,-91.7,0.9C-90.1,-16.2,-83.8,-32.5,-74.7,-46.5C-65.6,-60.5,-53.6,-72.3,-39.7,-79.6C-25.9,-87,-12.9,-89.9,1.2,-91.9C15.4,-94,30.7,-95.2,44.7,-76.4Z",
          ],
        } : {}}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        transform="translate(100 100)"
      />
    </svg>
  );
};

// Particles Background
const Particles = ({ count = 50, className = "" }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export { 
  MorphingBlob, 
  FloatingBlobs, 
  GradientOrb, 
  SVGBlob,
  Particles
};
export default MorphingBlob;
