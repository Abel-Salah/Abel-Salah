import { Calendar } from "lucide-react";
import type { ReactNode } from "react";
import { TIDYCAL_BOOKING_URL } from "@/lib/booking";
import { trackConversionEvent } from "@/lib/conversion";
import { cn } from "@/lib/utils";

interface BookingCTAProps {
  source: string;
  offer?: string;
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "link";
}

const BookingCTA = ({
  source,
  offer,
  children = "Prendre rendez-vous",
  className,
  variant = "primary",
}: BookingCTAProps) => {
  const handleClick = () => {
    trackConversionEvent(offer ? "offer_cta_click" : "book_call_click", {
      source,
      offer,
    });
  };

  return (
    <a
      href={TIDYCAL_BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        variant === "primary"
          ? "inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          : "inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors story-link",
        className
      )}
    >
      {variant === "primary" && <Calendar className="w-4 h-4" />}
      {children}
    </a>
  );
};

export default BookingCTA;
