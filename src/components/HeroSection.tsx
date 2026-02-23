import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Truck, ShieldCheck, Clock, Star } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Rich gradient background — matches logo red */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-800 via-red-700 to-red-900 bg-animated-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,200,0,0.12)_0%,_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,0,0,0.2)_0%,_transparent_55%)]" />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Floating decorations */}
      <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full bg-yellow-400/8 blur-3xl" style={{ animation: 'float 6s ease-in-out infinite' }} />
      <div className="absolute bottom-10 left-[10%] w-48 h-48 rounded-full bg-red-400/10 blur-3xl" style={{ animation: 'float 8s ease-in-out infinite 1s' }} />

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Text */}
          <div className="space-y-8 max-w-2xl">
            {/* Delivery badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2.5 bg-black/20 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-sm text-white/95 font-medium shadow-premium">
              <Star className="h-4 w-4 text-accent fill-accent" />
              <span className="tracking-wide">Preço Baixo Todos os Dias!</span>
            </div>

            <h1 className="animate-fade-in-up delay-100 text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight" style={{ opacity: 0 }}>
              O parceiro ideal para abastecer o{" "}
              <span className="text-accent underline decoration-accent/30 underline-offset-8">seu negócio.</span>
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-white/80 max-w-lg leading-relaxed font-medium" style={{ opacity: 0 }}>
              Comercialização por grosso de produtos alimentares, higiene e limpeza. Preços imbatíveis para revenda e entrega rápida.
            </p>

            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 pt-4" style={{ opacity: 0 }}>
              <Link
                to="/produtos"
                className="inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-2xl bg-white text-slate-900 font-bold text-[15px] hover:bg-slate-50 hover:shadow-premium-lg hover:-translate-y-1 transition-all shadow-premium group w-full sm:w-auto"
              >
                Explorar Produtos <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-2xl border-2 border-white/30 text-white font-semibold text-[15px] hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm w-full sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* Stats / trust signals */}
          <div className="hidden lg:grid grid-cols-2 gap-5 animate-fade-in-right delay-300" style={{ opacity: 0 }}>
            {[
              { icon: Truck, label: "Entrega Rápida", value: "24–48h", color: "from-white/10 to-white/5" },
              { icon: ShieldCheck, label: "Qualidade", value: "Garantida", color: "from-white/10 to-white/5" },
              { icon: MessageCircle, label: "WhatsApp", value: "Directo", color: "from-white/10 to-white/5" },
              { icon: Clock, label: "Atendimento", value: "Personalizado", color: "from-white/10 to-white/5" },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${item.color} backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-white/30 hover:bg-white/10 transition-all shadow-premium`}
              >
                <item.icon className="h-8 w-8 text-yellow-400 mb-3" />
                <p className="text-2xl font-bold text-white mb-0.5">{item.value}</p>
                <p className="text-sm text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
