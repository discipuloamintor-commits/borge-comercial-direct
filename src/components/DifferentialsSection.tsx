import { Truck, MessageCircle, PackageCheck, HeadphonesIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const differentials = [
  { icon: Truck, title: "Entrega Rápida", description: "Receba os seus produtos em 24 a 48 horas.", accent: "from-red-600 to-red-500" },
  { icon: MessageCircle, title: "Atendimento WhatsApp", description: "Encomende e tire dúvidas pelo WhatsApp.", accent: "from-amber-500 to-yellow-400" },
  { icon: PackageCheck, title: "Produtos Selecionados", description: "Só trabalhamos com marcas de qualidade.", accent: "from-orange-500 to-amber-500" },
  { icon: HeadphonesIcon, title: "Suporte Personalizado", description: "Acompanhamento dedicado ao seu pedido.", accent: "from-red-500 to-orange-500" },
];

const DifferentialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Vantagens</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Porquê escolher-nos?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {differentials.map((d, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-center text-center p-7 rounded-2xl bg-card border border-border/50 overflow-hidden hover-lift transition-all ${visible ? "animate-fade-in-up" : "opacity-0"
                }`}
              style={{ animationDelay: `${i * 100}ms`, opacity: visible ? undefined : 0 }}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${d.accent}`} />

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${d.accent} flex items-center justify-center mb-5 shadow-lg`}>
                <d.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-card-foreground mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
