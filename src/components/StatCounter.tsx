import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/* Compte de 0 à la valeur cible au premier passage dans le viewport.
   La valeur arrive sous forme affichée ("16+", "95%") : on anime la
   partie numérique et on conserve le suffixe tel quel. */
const StatCounter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  const [display, setDisplay] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, prefersReducedMotion, target]);

  return (
    <span ref={ref}>
      {match ? display : ""}
      {suffix}
    </span>
  );
};

export default StatCounter;
