import { site } from "@/data/site";

export function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consult via WhatsApp"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 3.4a8.5 8.5 0 0 0-7.3 12.8L3.8 20l3.9-1A8.5 8.5 0 1 0 12 3.4Z" />
        <path d="M9.3 8.2c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.3 2 3.1 4.9 4.2 2.4.9 2.9.7 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4l-1.8-.9c-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6l-.7-1.7Z" />
      </svg>
    </a>
  );
}
