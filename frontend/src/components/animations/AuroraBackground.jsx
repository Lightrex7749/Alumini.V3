import { motion } from 'framer-motion';

const AuroraBackground = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Aurora Gradient Layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
        
        {/* Aurora Layer 1 - Blue/Cyan */}
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-cyan-500/40 via-blue-500/20 to-transparent rounded-full blur-3xl" />
        </motion.div>
        
        {/* Aurora Layer 2 - Purple/Pink */}
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-purple-500/40 via-pink-500/20 to-transparent rounded-full blur-3xl" />
        </motion.div>
        
        {/* Aurora Layer 3 - Green/Teal */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-full h-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-emerald-500/30 via-teal-500/15 to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Light version for non-dark sections
const AuroraBackgroundLight = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50" />
        
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-blue-400/20 via-cyan-300/10 to-transparent rounded-full blur-3xl" />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-purple-400/20 via-pink-300/10 to-transparent rounded-full blur-3xl" />
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export { AuroraBackground, AuroraBackgroundLight };
export default AuroraBackground;
