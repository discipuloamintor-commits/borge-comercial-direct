import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const { data: featured = [] } = useQuery({
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
  });

  if (featured.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Produtos em Destaque</h2>
          <Link to="/produtos" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link to="/produtos" className="sm:hidden mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Ver todos os produtos <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
