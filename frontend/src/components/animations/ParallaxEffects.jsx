import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

// Parallax Container - wraps content for scroll-based movement
const ParallaxSection = ({ 
  children, 
  className = "",
  speed = 0.5, // 0 = no effect, 1 = moves with scroll
  direction = "up" // up, down
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [100 * speed * multiplier, -100 * speed * multiplier]
  );

  return (
    <motion.div 
      ref={ref} 
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

// Parallax Image/Element with scaling
const ParallaxScale = ({ 
  children, 
  className = "",
  scaleRange = [0.8, 1.2]
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], 1, scaleRange[1]]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      ref={ref} 
      className={className}
      style={{ scale: smoothScale }}
    >
      {children}
    </motion.div>
  );
};

// Fade and slide on scroll
const ScrollReveal = ({ 
  children, 
  className = "",
  direction = "up", // up, down, left, right
  delay = 0,
  duration = 0.8,
  distance = 50
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"]
  });

  const directions = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [directions[direction].x, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [directions[direction].y, 0]);

  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30, delay: delay * 1000 });
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      ref={ref} 
      className={className}
      style={{ opacity: smoothOpacity, x: smoothX, y: smoothY }}
    >
      {children}
    </motion.div>
  );
};

// Horizontal scroll progress indicator
const ScrollProgressBar = ({ 
  className = "",
  color = "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className={`fixed top-0 left-0 right-0 h-1 ${color} origin-left z-50 ${className}`}
      style={{ scaleX }}
    />
  );
};

// Scroll-triggered counter animation
const CountUp = ({ 
  to = 100,
  className = "",
  duration = 2,
  suffix = "",
  prefix = ""
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"]
  });

  const count = useTransform(scrollYProgress, [0, 1], [0, to]);
  const smoothCount = useSpring(count, { stiffness: 50, damping: 30 });

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      <motion.span>
        {smoothCount.get().toFixed(0)}
      </motion.span>
      {suffix}
    </motion.span>
  );
};

// Rotating element on scroll
const ScrollRotate = ({ 
  children, 
  className = "",
  degrees = 360
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, degrees]);
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      ref={ref} 
      className={className}
      style={{ rotate: smoothRotate }}
    >
      {children}
    </motion.div>
  );
};

// Sticky section with fade
const StickyReveal = ({ 
  children, 
  className = "",
  stickyHeight = "200vh"
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <div ref={ref} className="relative" style={{ height: stickyHeight }}>
      <motion.div 
        className={`sticky top-1/4 ${className}`}
        style={{ opacity, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export { 
  ParallaxSection, 
  ParallaxScale, 
  ScrollReveal, 
  ScrollProgressBar, 
  CountUp,
  ScrollRotate,
  StickyReveal
};
