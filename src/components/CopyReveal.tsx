import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CopyRevealProps {
  before: string;
  after: string;
  className?: string;
}

const CopyReveal = ({ before, after, className }: CopyRevealProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative cursor-pointer select-none",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="before"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-4"
          >
            <span className="text-muted-foreground line-through decoration-2">
              {before}
            </span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground/50">
              hover
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="after"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-primary font-semibold"
          >
            {after}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CopyReveal;
