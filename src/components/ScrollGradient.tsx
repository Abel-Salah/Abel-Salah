import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const ScrollGradient = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const springY = useSpring(0, { stiffness: 30, damping: 20 });
  const springX = useSpring(0, { stiffness: 30, damping: 20 });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
          setScrollProgress(progress);

          const yPos = progress * 80 - 20;
          const xPos = Math.sin(progress * Math.PI * 2) * 15;

          springY.set(yPos);
          springX.set(xPos);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [springY, springX]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        x: springX.get() ? springX : 0,
        y: springY.get() ? springY : 0,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="absolute w-[700px] h-[700px] left-1/2 top-1/2"
        style={{
          background: "radial-gradient(circle, hsl(225 100% 50% / 0.06), transparent 70%)",
          filter: "blur(40px)",
          x: springX,
          y: springY,
        }}
      />
    </motion.div>
  );
};

export default ScrollGradient;
