import { Link } from "react-router-dom";
import { Tag, ArrowRight, Zap } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const PromotionsSection = () => {
    const discounted = products.filter(p => p.originalPrice);
    const { ref, isVisible } = useScrollAnimation();

    if (discounted.length === 0) return null;

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
                <div
                    ref={ref}
                    className={`rounded-3xl overflow-hidden relative animate-hidden ${isVisible ? "animate-visible" : ""}`}
                >
                    {/* Rich gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 bg-animated-gradient" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />

                    {/* Dot pattern */}
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                    <div className="relative z-10 p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <Zap className="h-5 w-5 text-yellow-200" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Promoções da Semana</h2>
                        </div>
                        <p className="text-white/75 mb-8 max-w-xl text-sm md:text-base">
                            Aproveite os nossos descontos especiais! Produtos essenciais a preços imbatíveis, por tempo limitado.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                            {discounted.map(p => (
                                <Link
                                    key={p.id}
                                    to={`/produto/${p.slug}`}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/10 hover:scale-[1.03] group"
                                >
                                    <p className="font-bold text-sm text-white truncate mb-2 group-hover:text-yellow-200 transition-colors">{p.name}</p>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="font-extrabold text-lg text-white">{formatPrice(p.price)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/50 line-through">{formatPrice(p.originalPrice!)}</span>
                                        <span className="text-[11px] font-bold bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-full">
                                            -{Math.round((1 - p.price / p.originalPrice!) * 100)}%
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <Link
                            to="/produtos"
                            className="inline-flex items-center gap-2.5 bg-white text-red-600 font-bold text-sm px-7 py-3.5 rounded-2xl hover:bg-white/90 transition-all hover:scale-[1.02] shadow-premium group"
                        >
                            Ver Todos os Produtos <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromotionsSection;
