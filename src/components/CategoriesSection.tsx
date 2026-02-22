import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CategoriesSection = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Categorias</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/produtos?categoria=${cat.slug}`}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg border border-border bg-card hover:border-primary hover:shadow-md transition-all text-center group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{cat.image}</span>
              <span className="font-semibold text-sm text-card-foreground">{cat.name}</span>
              <span className="text-xs text-muted-foreground">{cat.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
