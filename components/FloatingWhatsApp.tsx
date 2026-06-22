import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

type FloatingWhatsAppProps = { whatsappUrl?: string };

export function FloatingWhatsApp({ whatsappUrl = site.whatsappUrl }: FloatingWhatsAppProps) {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consult via WhatsApp"
    >
      <WhatsAppIcon className="whatsapp-icon-floating" />
    </a>
  );
}
