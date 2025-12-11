import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Text Reveal - Letters appear one by one
const TextReveal = ({ 
  text,
  children, 
  className = "", 
  delay = 0,
  duration = 0.05,
  tag: Tag = "span" 
}) => {
  // Support both text prop and children
  const content = text || (typeof children === 'string' ? children : '');
  const letters = content.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: duration,
        delayChildren: delay,
      },
    },
  };
  
  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Typewriter Effect
const TypewriterText = ({ 
  text, 
  className = "", 
  speed = 50,
  delay = 0,
  cursor = true 
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial="hidden"
      animate={controls}
    >
      <motion.span
        variants={{
          hidden: { width: 0 },
          visible: {
            width: "auto",
            transition: {
              duration: text.length * (speed / 1000),
              delay: delay,
              ease: "linear",
            },
          },
        }}
        className="inline-block overflow-hidden whitespace-nowrap"
      >
        {text}
      </motion.span>
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-[1em] bg-current ml-0.5 align-middle"
        />
      )}
    </motion.span>
  );
};

// Gradient Text Animation
const GradientText = ({ 
  text, 
  className = "", 
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#3b82f6"],
  animationDuration = 3
}) => {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
        backgroundSize: "200% auto",
      }}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
};

// Flip Text - 3D Flip effect on hover
const FlipText = ({ text, className = "" }) => {
  return (
    <span className={`inline-block group ${className}`}>
      <span className="inline-block transition-transform duration-500 group-hover:[transform:rotateX(90deg)]">
        {text}
      </span>
      <span 
        className="absolute left-0 top-0 inline-block transition-transform duration-500 [transform:rotateX(-90deg)] group-hover:[transform:rotateX(0deg)]"
        style={{ transformOrigin: "bottom" }}
      >
        {text}
      </span>
    </span>
  );
};

// Glitch Text Effect
const GlitchText = ({ text, className = "" }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glitch layers */}
      <span 
        className="absolute top-0 left-0 text-cyan-500 animate-glitch-1 opacity-70"
        aria-hidden="true"
      >
        {text}
      </span>
      <span 
        className="absolute top-0 left-0 text-pink-500 animate-glitch-2 opacity-70"
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
};

// Word by Word Reveal
const WordReveal = ({ 
  text, 
  className = "", 
  delay = 0,
  wordDelay = 0.1 
}) => {
  const words = text.split(" ");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: wordDelay,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 30, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-2"
          style={{ transformStyle: "preserve-3d" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Blur In Text
const BlurInText = ({ text, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial={{ filter: "blur(20px)", opacity: 0, y: 20 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {text}
    </motion.span>
  );
};

export { 
  TextReveal, 
  TypewriterText, 
  GradientText, 
  FlipText, 
  GlitchText,
  WordReveal,
  BlurInText
};
export default TextReveal;
