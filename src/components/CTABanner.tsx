import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getWhatsAppLink } from "@/data/products";
import { useEffect, useRef, useState } from "react";

const CTABanner = () => {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="py-16 md:py-20">
            <div className="container mx-auto px-4">
                <div
                    className={`relative rounded-[2.5rem] overflow-hidden ${visible ? "animate-fade-in-up" : "opacity-0"} shadow-premium-lg`}
                    style={{ opacity: visible ? undefined : 0 }}
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-slate-900" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-slate-900 to-slate-900 opacity-90" />
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent opacity-60" />

                    <div className="relative z-10 p-12 md:p-20 lg:p-24 flex flex-col items-center text-center">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Grosso & Revenda</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight max-w-3xl">
                            Abasteça o seu negócio com <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">preços imbatíveis</span>
                        </h2>
                        <p className="text-slate-300 md:text-lg mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                            A Borge Comercial é o seu distribuidor de confiança. Entre em contacto pelo WhatsApp para cotações de caixas e fardos com entrega rápida.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
                            <Link
                                to="/encomendar"
                                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-slate-900 font-bold text-base px-10 py-4 rounded-2xl hover:bg-slate-50 transition-all hover:-translate-y-1 shadow-premium group"
                            >
                                <MessageCircle className="h-5 w-5 text-whatsapp" />
                                <span>Formulário de Grosso</span>
                            </Link>
                            <Link
                                to="/produtos"
                                className="w-full sm:w-auto flex items-center justify-center gap-3 text-white font-semibold border-2 border-white/20 px-10 py-4 rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all group"
                            >
                                <span>Explorar Catálogo</span>
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTABanner;
