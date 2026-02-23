import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useRef, useState } from "react";

const CategoriesSection = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

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

  const bgColors = [
    "bg-red-50 group-hover:bg-red-100",
    "bg-amber-50 group-hover:bg-amber-100",
    "bg-orange-50 group-hover:bg-orange-100",
    "bg-yellow-50 group-hover:bg-yellow-100",
    "bg-rose-50 group-hover:bg-rose-100",
    "bg-red-50 group-hover:bg-red-100",
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Explore</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">As Nossas Categorias</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              to={`/produtos?categoria=${cat.slug}`}
              className={`group flex flex-col items-center justify-center gap-3 p-6 md:p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover-lift transition-all text-center ${visible ? "animate-fade-in-up" : "opacity-0"
                }`}
              style={{ animationDelay: `${i * 80}ms`, opacity: visible ? undefined : 0 }}
            >
              <div className={`w-16 h-16 rounded-2xl ${bgColors[i % bgColors.length]} flex items-center justify-center transition-colors`}>
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.image}</span>
              </div>
              <span className="font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
