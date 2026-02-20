import { Truck, MessageCircle, PackageCheck, HeadphonesIcon } from "lucide-react";

const differentials = [
  { icon: Truck, title: "Entrega Rápida", description: "Receba os seus produtos em 24 a 48 horas." },
  { icon: MessageCircle, title: "Atendimento WhatsApp", description: "Encomende e tire dúvidas pelo WhatsApp." },
  { icon: PackageCheck, title: "Produtos Selecionados", description: "Só trabalhamos com marcas de qualidade." },
  { icon: HeadphonesIcon, title: "Suporte Personalizado", description: "Acompanhamento dedicado ao seu pedido." },
];

const DifferentialsSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Porquê escolher-nos?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {differentials.map((d, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <d.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
