import { Star } from "lucide-react";

const testimonials = [
  { name: "Maria S.", text: "Entrega super rápida e produtos de qualidade. Recomendo!", stars: 5 },
  { name: "João P.", text: "Atendimento excelente pelo WhatsApp. Muito prático!", stars: 5 },
  { name: "Ana M.", text: "Preços justos e tudo sempre disponível. A minha loja favorita.", stars: 4 },
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">O que dizem os nossos clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 rounded-lg bg-card border border-border">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < t.stars ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />
                ))}
              </div>
              <p className="text-sm text-card-foreground mb-3">"{t.text}"</p>
              <p className="text-xs font-semibold text-muted-foreground">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
