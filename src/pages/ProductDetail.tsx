import { useParams, Link } from "react-router-dom";
import { ChevronRight, MessageCircle, CheckCircle, Truck, Shield, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { formatPrice, getWhatsAppLink } from "@/data/products";
import PriceTag from "@/components/PriceTag";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name, slug)")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: related = [] } = useQuery({
    queryKey: ["related-products", product?.category_id, product?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", product!.category_id!)
        .neq("id", product!.id)
        .limit(4);
      if (error) throw error;
      return data;
    },
    enabled: !!product?.category_id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </main>
        <Footer />
      </div>
    );
  }

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

  const categoryName = (product as any).categories?.name ?? "";
  const categorySlug = (product as any).categories?.slug ?? "";

  const canonicalUrl = `https://www.borgescomercial.com/produto/${product.slug}`;
  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : product.image
      ? `https://www.borgescomercial.com${product.image}`
      : `https://www.borgescomercial.com/placeholder.svg`;

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [imageUrl],
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Borges Comercial"
    },
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "MZN",
      "price": product.price,
      "availability": product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Borges Comercial"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{product.name} — Borge Comercial</title>
        <meta name="description" content={product.description?.substring(0, 160)} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={`${product.name} — Borge Comercial`} />
        <meta property="og:description" content={product.description?.substring(0, 160)} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />

        <meta name="twitter:title" content={`${product.name} — Borge Comercial`} />
        <meta name="twitter:description" content={product.description?.substring(0, 160)} />
        <meta name="twitter:image" content={imageUrl} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Início</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/produtos" className="hover:text-primary transition-colors">Produtos</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={`/produtos?categoria=${categorySlug}`} className="hover:text-primary transition-colors">{categoryName}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="aspect-square rounded-lg bg-secondary flex items-center justify-center overflow-hidden border border-border">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  {product.available && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                      <CheckCircle className="h-4 w-4" /> Disponível
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" /> {product.delivery}
                  </span>
                </div>
              </div>

              <div className="my-2">
                <PriceTag price={Number(product.price)} size="xl" />
              </div>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {product.benefits && product.benefits.length > 0 && (
                <div>
                  <h2 className="font-semibold text-foreground mb-3">Vantagens</h2>
                  <ul className="space-y-2">
                    {product.benefits.map((b: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-3.5 w-3.5 text-primary flex-shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-2 p-3 rounded-md bg-secondary text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                Compra segura com atendimento personalizado. Satisfação garantida.
              </div>

              <Link
                to={`/encomendar?produto=${product.slug}`}
                className="flex items-center justify-center gap-2 w-full h-14 rounded-lg bg-primary text-primary-foreground font-bold text-base hover:bg-accent transition-colors shadow-premium"
              >
                <CheckCircle className="h-5 w-5" />
                {product.sales_type === 'unidade' ? 'Adicionar (Unidade)' : product.sales_type === 'ambos' ? 'Adicionar e Encomendar' : 'Adicionar (Grosso)'}
              </Link>
            </div>
          </div>

          {related.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6">Produtos Relacionados</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p: any) => (
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
