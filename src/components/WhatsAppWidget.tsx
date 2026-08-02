import { MessageCircle } from "lucide-react";
import "./whatsapp-widget.css";

const WhatsAppWidget = () => (
  <a
    className="whatsapp-widget"
    href="https://wa.me/33652858955?text=Bonjour%20Abel%2C%20je%20souhaite%20%C3%A9changer%20sur%20un%20besoin%20pour%20mon%20entreprise."
    target="_blank"
    rel="noreferrer"
    aria-label="Contacter Abel sur WhatsApp"
  >
    <MessageCircle aria-hidden="true" />
    <span>Me contacter sur WhatsApp</span>
  </a>
);

export default WhatsAppWidget;
