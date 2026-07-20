import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const ScrollGradient = () => {
  const springY = useSpring(0, { stiffness: 30, damping: 20 });
  const springX = useSpring(0, { stiffness: 30, damping: 20 });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

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
    /* Le centrage (-50%) doit s'appliquer au cercle lui-même, pas au
       conteneur plein écran : appliqué au parent, il décalait tout le
       calque hors cadre et provoquait un débordement horizontal sur mobile
       (le cercle de 700px se retrouvait plaqué à gauche au lieu d'être
       centré). overflow-hidden en garde-fou supplémentaire. */
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 print:hidden">
      <motion.div
        className="absolute w-[700px] h-[700px] left-1/2 top-1/2"
        style={{
          background: "radial-gradient(circle, hsl(225 100% 50% / 0.06), transparent 70%)",
          filter: "blur(40px)",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
};

export default ScrollGradient;
