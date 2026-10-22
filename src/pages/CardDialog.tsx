import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export default function CardDialog({ titleId, onClose, children, returnFocus }: { titleId: string; onClose: () => void; children: ReactNode; returnFocus?: HTMLElement | null }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (returnFocus?.isConnected) returnFocus.focus();
    };
  }, [returnFocus]);

  return <dialog ref={dialogRef} className="business-card-modal card-dialog" aria-labelledby={titleId} onClose={onClose} onClick={(event) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
  }}>
    <button type="button" className="business-card-modal-close" aria-label="Fermer" onClick={onClose}><X aria-hidden="true" /></button>
    {children}
  </dialog>;
}
