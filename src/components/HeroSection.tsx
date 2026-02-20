import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

const HeroSection = () => {
  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(123_56%_30%)_0%,_transparent_70%)] opacity-60" />
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
            Tudo o que a sua família precisa, num só lugar.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80">
            Produtos alimentares, higiene e limpeza com entrega rápida e atendimento personalizado via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/produtos"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-background text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
            >
              Ver Produtos <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
