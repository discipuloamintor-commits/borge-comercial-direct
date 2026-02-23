import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";
import { useEffect, useRef, useState } from "react";

const FeaturedProducts = () => {
  const { data: featured = [], isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .eq("available", true)
        .order("name");
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (!isLoading && featured.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Destaques</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Os Favoritos</h2>
          </div>
          <Link
            to="/produtos"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent px-5 py-3 rounded-xl hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/10"
          >
            Ver todos <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border/40 bg-card overflow-hidden h-[360px] md:h-[400px] flex flex-col p-5 animate-pulse">
                <div className="w-full aspect-[4/5] bg-secondary/60 rounded-xl mb-4" />
                <div className="w-3/4 h-4 bg-secondary/80 rounded-full mb-3" />
                <div className="w-1/2 h-4 bg-secondary/80 rounded-full mb-auto" />
                <div className="w-1/3 h-6 bg-secondary/80 rounded-full mt-4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {featured.map((product, i) => (
              <div
                key={product.id}
                className={visible ? "animate-fade-in-up" : "opacity-0"}
                style={{ animationDelay: `${i * 80}ms`, opacity: visible ? undefined : 0 }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <Link
          to="/produtos"
          className="sm:hidden mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors group"
        >
          Ver todos os produtos <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
