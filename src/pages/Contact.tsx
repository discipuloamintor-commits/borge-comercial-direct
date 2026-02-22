import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { WHATSAPP_NUMBER, getWhatsAppLink } from "@/data/products";

const Contact = () => {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
    const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation();
    const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="bg-primary py-16 md:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(123_56%_30%)_0%,_transparent_70%)] opacity-60" />
                    <div
                        ref={heroRef}
                        className={`container mx-auto px-4 relative z-10 text-center animate-hidden ${heroVisible ? "animate-visible" : ""}`}
                    >
                        <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">Contacto</h1>
                        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                            Estamos aqui para ajudar. Entre em contacto connosco!
                        </p>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4">
                        <div
                            ref={infoRef}
                            className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-hidden ${infoVisible ? "animate-visible" : ""}`}
                        >
                            {/* Contact Cards */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-foreground mb-6">Fale Connosco</h2>

                                <a
                                    href={getWhatsAppLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card hover:border-primary hover:shadow-md transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-whatsapp/10 flex items-center justify-center flex-shrink-0 group-hover:bg-whatsapp/20 transition-colors">
                                        <MessageCircle className="h-6 w-6 text-whatsapp" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-card-foreground mb-1">WhatsApp</h3>
                                        <p className="text-sm text-muted-foreground">Método preferido — resposta rápida</p>
                                        <p className="text-sm font-medium text-primary mt-1">+{WHATSAPP_NUMBER}</p>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-card-foreground mb-1">Telefone</h3>
                                        <p className="text-sm text-muted-foreground">Ligue-nos diretamente</p>
                                        <p className="text-sm font-medium text-foreground mt-1">+{WHATSAPP_NUMBER}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-card-foreground mb-1">Email</h3>
                                        <p className="text-sm text-muted-foreground">Para assuntos formais</p>
                                        <p className="text-sm font-medium text-foreground mt-1">borgesmariano92@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Info Side */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-foreground mb-6">Informações</h2>

                                <div className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-card-foreground mb-1">Localização</h3>
                                        <p className="text-sm text-muted-foreground">Praça dos Combatentes</p>
                                        <p className="text-sm text-muted-foreground">Mercado Xiquelene, Maputo</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-card-foreground mb-1">Horário de Atendimento</h3>
                                        <p className="text-sm text-muted-foreground">Segunda a Sábado: 08:00 — 18:00</p>
                                        <p className="text-sm text-muted-foreground">Domingo: Encerrado</p>
                                    </div>
                                </div>

                                <div
                                    ref={mapRef}
                                    className={`p-5 rounded-lg border border-border bg-secondary text-center animate-hidden ${mapVisible ? "animate-visible" : ""}`}
                                >
                                    <p className="text-muted-foreground text-sm mb-3">
                                        Entregamos na zona de Maputo. Confirme a disponibilidade de entrega na sua área pelo WhatsApp.
                                    </p>
                                    <a
                                        href={getWhatsAppLink()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-accent transition-colors"
                                    >
                                        <MessageCircle className="h-4 w-4" /> Confirmar Entrega
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default Contact;
