type WhatsAppIconProps = {
  className?: string;
};

export function WhatsAppIcon({ className = "" }: WhatsAppIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`whatsapp-icon ${className}`.trim()}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L4 20.2l1.1-3.8A8.5 8.5 0 1 1 20.5 11.6Z" />
      <path d="m8.2 7.8 2 2.8-1.1 1.3a8.2 8.2 0 0 0 3.2 3.2l1.3-1.1 2.8 2" />
    </svg>
  );
}
