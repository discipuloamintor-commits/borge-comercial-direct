import { useParams, Link } from "react-router-dom";
import { ChevronRight, MessageCircle, CheckCircle, Truck, Shield, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { getProductBySlug, getProductsByCategory, formatPrice, getWhatsAppLink } from "@/data/products";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Produto não encontrado</h1>
            <Link to="/produtos" className="text-primary hover:underline">Ver todos os produtos</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = getProductsByCategory(product.categorySlug).filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Início</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/produtos" className="hover:text-primary transition-colors">Produtos</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={`/produtos?categoria=${product.categorySlug}`} className="hover:text-primary transition-colors">{product.category}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="aspect-square rounded-lg bg-secondary flex items-center justify-center overflow-hidden border border-border">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                    <CheckCircle className="h-4 w-4" /> Disponível
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" /> {product.delivery}
                  </span>
                </div>
              </div>

              <p className="text-3xl font-extrabold text-foreground">{formatPrice(product.price)}</p>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Benefits */}
              <div>
                <h2 className="font-semibold text-foreground mb-3">Vantagens</h2>
                <ul className="space-y-2">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-3.5 w-3.5 text-primary flex-shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guarantee */}
              <div className="flex items-center gap-2 p-3 rounded-md bg-secondary text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                Compra segura com atendimento personalizado. Satisfação garantida.
              </div>

              {/* CTA */}
              <a
                href={getWhatsAppLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-14 rounded-lg bg-primary text-primary-foreground font-bold text-base hover:bg-accent transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Encomendar pelo WhatsApp
              </a>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6">Produtos Relacionados</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;
