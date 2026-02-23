import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

const WhatsAppButton = () => {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-premium-lg hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:-translate-y-1 hover:scale-[1.05] transition-all duration-300"
      aria-label="Falar no WhatsApp"
    >
      <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30" style={{ animationDuration: "3s" }}></div>
      <MessageCircle className="h-7 w-7 relative z-10" />
    </a>
  );
};

export default WhatsAppButton;
