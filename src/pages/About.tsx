import { ShieldCheck, Truck, MessageCircle, Users, Target, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Helmet } from "react-helmet-async";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { getWhatsAppLink } from "@/data/products";

const values = [
    { icon: ShieldCheck, title: "Qualidade Garantida", description: "Selecionamos criteriosamente cada produto, trabalhando apenas com marcas reconhecidas e de confiança." },
    { icon: Truck, title: "Entrega Rápida", description: "Entregamos em 24 a 48 horas para que nunca fique sem o essencial em casa." },
    { icon: Heart, title: "Atendimento Humano", description: "Cada cliente é tratado com atenção e cuidado. Estamos aqui para ajudar, pelo WhatsApp ou presencialmente." },
    { icon: Target, title: "Preços Justos", description: "Preço baixo todos os dias. Queremos que cada família tenha acesso a produtos de qualidade." },
];

const About = () => {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
    const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation();
    const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
    const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

    const canonicalUrl = "https://www.borgescomercial.com/sobre";

    return (
        <div className="min-h-screen flex flex-col">
            <Helmet>
                <title>Sobre Nós — Borge Comercial</title>
                <meta name="description" content="A Borge Comercial nasceu com uma missão simples: levar produtos essenciais de qualidade às famílias moçambicanas, com preços justos e excelente atendimento." />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content="Sobre Nós — Borge Comercial" />
                <meta property="og:description" content="Missão de levar produtos essenciais de qualidade às famílias moçambicanas." />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content="https://www.borgescomercial.com/borgecomerciallogo.pnj.png" />
            </Helmet>
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="bg-primary py-16 md:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(123_56%_30%)_0%,_transparent_70%)] opacity-60" />
                    <div
                        ref={heroRef}
                        className={`container mx-auto px-4 relative z-10 text-center animate-hidden ${heroVisible ? "animate-visible" : ""}`}
                    >
                        <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">Sobre Nós</h1>
                        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                            Conheça a Borge Comercial — a sua loja de confiança em Maputo.
                        </p>
                    </div>
                </section>

                {/* Story */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4">
                        <div
                            ref={storyRef}
                            className={`max-w-3xl mx-auto space-y-6 animate-hidden ${storyVisible ? "animate-visible" : ""}`}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground">A Nossa História</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                A <strong className="text-foreground">Borge Comercial</strong> nasceu com uma missão simples: levar produtos essenciais de qualidade às famílias moçambicanas, com preços justos e um atendimento que faz a diferença.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Sabemos o quanto é importante ter em casa alimentos, produtos de higiene e limpeza de confiança. Por isso, selecionamos cuidadosamente cada artigo do nosso catálogo, garantindo que só oferecemos o melhor.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Com entrega rápida e atendimento personalizado via WhatsApp, tornamos a compra fácil e conveniente. Basta escolher, encomendar e receber — sem complicações.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                <div className="text-center p-4 rounded-lg bg-secondary">
                                    <p className="text-2xl font-extrabold text-primary">500+</p>
                                    <p className="text-xs text-muted-foreground mt-1">Clientes Satisfeitos</p>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-secondary">
                                    <p className="text-2xl font-extrabold text-primary">18+</p>
                                    <p className="text-xs text-muted-foreground mt-1">Produtos Disponíveis</p>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-secondary">
                                    <p className="text-2xl font-extrabold text-primary">24h</p>
                                    <p className="text-xs text-muted-foreground mt-1">Entrega Rápida</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-12 md:py-16 bg-secondary">
                    <div className="container mx-auto px-4">
                        <h2
                            className={`text-2xl md:text-3xl font-bold text-foreground mb-10 text-center animate-hidden ${valuesVisible ? "animate-visible" : ""}`}
                        >
                            Os Nossos Valores
                        </h2>
                        <div
                            ref={valuesRef}
                            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto stagger-children ${valuesVisible ? "animate-visible" : ""}`}
                        >
                            {values.map((v, i) => (
                                <div key={i} className="flex gap-4 p-6 rounded-lg bg-card border border-border">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <v.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-card-foreground mb-1">{v.title}</h3>
                                        <p className="text-sm text-muted-foreground">{v.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4">
                        <div
                            ref={ctaRef}
                            className={`text-center max-w-xl mx-auto space-y-4 animate-hidden ${ctaVisible ? "animate-visible" : ""}`}
                        >
                            <Users className="h-10 w-10 text-primary mx-auto" />
                            <h2 className="text-2xl font-bold text-foreground">Junte-se aos nossos clientes</h2>
                            <p className="text-muted-foreground">
                                Faça a sua primeira encomenda hoje e descubra porquê centenas de famílias confiam na Borge Comercial.
                            </p>
                            <a
                                href={getWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-accent transition-colors"
                            >
                                <MessageCircle className="h-4 w-4" /> Falar Connosco
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default About;
