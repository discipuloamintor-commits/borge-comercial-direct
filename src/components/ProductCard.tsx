import { Link } from "react-router-dom";
import { MessageCircle, CheckCircle } from "lucide-react";
import { Product, formatPrice, getWhatsAppLink } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group rounded-lg border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/produto/${product.slug}`}>
        <div className="aspect-square bg-secondary flex items-center justify-center overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-semibold text-card-foreground text-sm leading-tight hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-primary">
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Disponível</span>
        </div>
        <p className="text-lg font-bold text-foreground">{formatPrice(product.price)}</p>
        <a
          href={getWhatsAppLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-accent transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Encomendar
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
