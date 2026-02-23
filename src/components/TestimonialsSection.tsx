import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  { name: "Maria S.", text: "Entrega super rápida e produtos de qualidade. Recomendo!", stars: 5, initials: "MS", color: "bg-red-600" },
  { name: "João P.", text: "Atendimento excelente pelo WhatsApp. Muito prático!", stars: 5, initials: "JP", color: "bg-amber-500" },
  { name: "Ana M.", text: "Preços justos e tudo sempre disponível. A minha loja favorita.", stars: 4, initials: "AM", color: "bg-orange-500" },
];

const TestimonialsSection = () => {
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
    <section ref={sectionRef} className="py-16 md:py-20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, hsl(0 78% 42%) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Testemunhos</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">O que dizem os nossos clientes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`relative p-7 rounded-2xl bg-card border border-border/50 hover-lift transition-all ${visible ? "animate-fade-in-up" : "opacity-0"
                }`}
              style={{ animationDelay: `${i * 120}ms`, opacity: visible ? undefined : 0 }}
            >
              <Quote className="absolute top-5 right-5 h-8 w-8 text-primary/8" />

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-4.5 w-4.5 ${j < t.stars ? "text-amber-400 fill-amber-400" : "text-border"}`} />
                ))}
              </div>

              <p className="text-sm text-card-foreground mb-5 leading-relaxed italic">"{t.text}"</p>

              <div className="flex items-center gap-3 border-t border-border/50 pt-4">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {t.initials}
                </div>
                <span className="text-sm font-semibold text-foreground">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
