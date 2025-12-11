import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Neon Glow Text
const NeonText = ({ 
  children, 
  className = "",
  color = "blue", // blue, purple, pink, green, orange
  pulse = true,
  flickerIntensity = 0 // 0-1, 0 = no flicker
}) => {
  const colors = {
    blue: {
      text: "#60a5fa",
      glow: "#3b82f6",
    },
    purple: {
      text: "#a78bfa",
      glow: "#8b5cf6",
    },
    pink: {
      text: "#f472b6",
      glow: "#ec4899",
    },
    green: {
      text: "#4ade80",
      glow: "#22c55e",
    },
    orange: {
      text: "#fb923c",
      glow: "#f97316",
    },
    cyan: {
      text: "#22d3ee",
      glow: "#06b6d4",
    },
  };

  const selected = colors[color] || colors.blue;

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={{
        color: selected.text,
        textShadow: `
          0 0 7px ${selected.glow},
          0 0 10px ${selected.glow},
          0 0 21px ${selected.glow},
          0 0 42px ${selected.glow}
        `,
      }}
      animate={pulse ? {
        textShadow: [
          `0 0 7px ${selected.glow}, 0 0 10px ${selected.glow}, 0 0 21px ${selected.glow}, 0 0 42px ${selected.glow}`,
          `0 0 4px ${selected.glow}, 0 0 7px ${selected.glow}, 0 0 15px ${selected.glow}, 0 0 30px ${selected.glow}`,
          `0 0 7px ${selected.glow}, 0 0 10px ${selected.glow}, 0 0 21px ${selected.glow}, 0 0 42px ${selected.glow}`,
        ],
        opacity: flickerIntensity > 0 ? [1, 1 - flickerIntensity, 1, 1 - flickerIntensity * 0.5, 1] : 1,
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
};

// Neon Box/Container
const NeonBox = ({ 
  children, 
  className = "",
  color = "blue",
  borderWidth = 2,
  animated = true
}) => {
  const glowColors = {
    blue: "#3b82f6",
    purple: "#8b5cf6",
    pink: "#ec4899",
    green: "#22c55e",
    cyan: "#06b6d4",
    orange: "#f97316",
  };

  const glowColor = glowColors[color] || glowColors.blue;

  return (
    <motion.div
      className={`relative rounded-lg ${className}`}
      style={{
        border: `${borderWidth}px solid ${glowColor}`,
        boxShadow: `
          0 0 5px ${glowColor},
          0 0 10px ${glowColor},
          0 0 20px ${glowColor},
          inset 0 0 10px ${glowColor}40
        `,
      }}
      animate={animated ? {
        boxShadow: [
          `0 0 5px ${glowColor}, 0 0 10px ${glowColor}, 0 0 20px ${glowColor}, inset 0 0 10px ${glowColor}40`,
          `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 30px ${glowColor}, inset 0 0 15px ${glowColor}40`,
          `0 0 5px ${glowColor}, 0 0 10px ${glowColor}, 0 0 20px ${glowColor}, inset 0 0 10px ${glowColor}40`,
        ],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Neon Button
const NeonButton = ({ 
  children, 
  className = "",
  color = "blue",
  onClick,
  ...props
}) => {
  const glowColors = {
    blue: { base: "#3b82f6", hover: "#60a5fa" },
    purple: { base: "#8b5cf6", hover: "#a78bfa" },
    pink: { base: "#ec4899", hover: "#f472b6" },
    green: { base: "#22c55e", hover: "#4ade80" },
    cyan: { base: "#06b6d4", hover: "#22d3ee" },
  };

  const colors = glowColors[color] || glowColors.blue;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative px-8 py-4 rounded-lg font-bold text-white overflow-hidden ${className}`}
      style={{
        background: 'transparent',
        border: `2px solid ${colors.base}`,
        color: colors.base,
        boxShadow: `
          0 0 5px ${colors.base},
          0 0 10px ${colors.base}
        `,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      animate={{
        boxShadow: isHovered 
          ? `0 0 10px ${colors.hover}, 0 0 20px ${colors.hover}, 0 0 30px ${colors.hover}, 0 0 40px ${colors.hover}`
          : `0 0 5px ${colors.base}, 0 0 10px ${colors.base}`,
        backgroundColor: isHovered ? colors.base : 'transparent',
        color: isHovered ? '#fff' : colors.base,
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Neon Line/Divider
const NeonLine = ({ 
  className = "",
  color = "blue",
  direction = "horizontal", // horizontal, vertical
  animated = true
}) => {
  const glowColor = {
    blue: "#3b82f6",
    purple: "#8b5cf6",
    pink: "#ec4899",
    cyan: "#06b6d4",
  }[color] || "#3b82f6";

  const isHorizontal = direction === "horizontal";

  return (
    <motion.div
      className={`${isHorizontal ? 'h-[2px] w-full' : 'w-[2px] h-full'} ${className}`}
      style={{
        background: glowColor,
        boxShadow: `
          0 0 5px ${glowColor},
          0 0 10px ${glowColor},
          0 0 15px ${glowColor}
        `,
      }}
      animate={animated ? {
        opacity: [0.7, 1, 0.7],
        boxShadow: [
          `0 0 5px ${glowColor}, 0 0 10px ${glowColor}, 0 0 15px ${glowColor}`,
          `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 30px ${glowColor}`,
          `0 0 5px ${glowColor}, 0 0 10px ${glowColor}, 0 0 15px ${glowColor}`,
        ],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Electric/Lightning Text Effect
const ElectricText = ({ 
  children, 
  className = "",
  color = "#60a5fa"
}) => {
  const [flicker, setFlicker] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random flicker effect
      if (Math.random() > 0.9) {
        setFlicker(0.3);
        setTimeout(() => setFlicker(1), 50);
        setTimeout(() => {
          if (Math.random() > 0.5) {
            setFlicker(0.5);
            setTimeout(() => setFlicker(1), 50);
          }
        }, 100);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={{
        color,
        textShadow: `
          0 0 4px ${color},
          0 0 8px ${color},
          0 0 12px ${color}
        `,
        opacity: flicker,
      }}
    >
      {children}
    </motion.span>
  );
};

// Glowing Icon
const GlowingIcon = ({ 
  children, 
  className = "",
  color = "#3b82f6",
  size = 48
}) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        color,
        filter: `drop-shadow(0 0 5px ${color}) drop-shadow(0 0 10px ${color})`,
      }}
      animate={{
        filter: [
          `drop-shadow(0 0 5px ${color}) drop-shadow(0 0 10px ${color})`,
          `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`,
          `drop-shadow(0 0 5px ${color}) drop-shadow(0 0 10px ${color})`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export { 
  NeonText, 
  NeonBox, 
  NeonButton, 
  NeonLine,
  ElectricText,
  GlowingIcon
};
