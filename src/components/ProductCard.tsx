import { Link } from "react-router-dom";
import { MessageCircle, CheckCircle, Eye } from "lucide-react";
import { formatPrice, getWhatsAppLink } from "@/data/products";
import PriceTag from "./PriceTag";

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    price: number;
    image: string | null;
    available: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group rounded-2xl border border-border/40 bg-card overflow-hidden hover-lift transition-all flex flex-col h-full shadow-sm hover:shadow-premium">
      <Link to={`/produto/${product.slug}`} className="relative block overflow-hidden bg-secondary/30">
        <div className="aspect-square flex items-center justify-center relative bg-white">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </div>

        {/* Hover overlay with Add action */}
        <div className="absolute inset-0 bg-black/5 md:bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center pb-6 opacity-100 md:opacity-0 md:group-hover:opacity-100">
          <span className="transform translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-foreground text-sm font-semibold px-6 py-3 rounded-full shadow-premium hover:bg-white">
            <Eye className="h-4 w-4" /> Detalhes
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex-1">
          <Link to={`/produto/${product.slug}`}>
            <h3 className="font-semibold text-foreground/90 text-[15px] leading-snug hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Wholesale badging */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {product.available && (
              <div className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-green-700 bg-green-500/10 px-2 py-0.5 rounded-full">
                <CheckCircle className="h-3 w-3" />
                <span>Em Estoque</span>
              </div>
            )}
            <div className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded-full">
              <span>Grosso</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-border/70 flex flex-col gap-2">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">A partir de</span>
            <div className="mt-1">
              <PriceTag price={product.price} size="md" />
            </div>
          </div>

          <Link
            to={`/encomendar?produto=${product.slug}`}
            className="w-full flex items-center justify-center h-11 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all group/btn font-bold text-sm"
            title="Adicionar à Encomenda"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            <span>Encomendar (Grosso)</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
