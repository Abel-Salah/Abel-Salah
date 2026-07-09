import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

declare global {
  interface Window {
    __openCalendly?: () => void;
  }
}

const CalendlyPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.__openCalendly = () => setIsOpen(true);
    return () => {
      delete window.__openCalendly;
    };
  }, []);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 md:px-5 md:py-3 rounded-lg font-semibold uppercase tracking-wider text-xs md:text-sm shadow-lg hover:opacity-90 transition-opacity"
      >
        <Calendar className="w-5 h-5" />
        Prendre RDV
      </motion.button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[650px] w-[95vw] h-[80vh] p-0 overflow-hidden">
          <DialogTitle className="sr-only">Prendre rendez-vous</DialogTitle>
          <iframe
            src="https://calendly.com/abel_salah/rdv-abel"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Calendly - Prendre RDV"
            className="w-full h-full"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendlyPopup;
