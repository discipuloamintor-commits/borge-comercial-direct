import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get("categoria") || "";
  const query = searchParams.get("q") || "";
  const sort = searchParams.get("ordem") || "";

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*, categories(name, slug)").order("name");
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const filtered = useMemo(() => {
    let result = [...products];
    if (categorySlug) result = result.filter((p: any) => p.categories?.slug === categorySlug);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((p: any) => p.name.toLowerCase().includes(q) || (p.categories?.name ?? "").toLowerCase().includes(q));
    }
    if (sort === "preco-asc") result.sort((a, b) => Number(a.price) - Number(b.price));
    else if (sort === "preco-desc") result.sort((a, b) => Number(b.price) - Number(a.price));
    else if (sort === "nome") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [categorySlug, query, sort, products]);

  const activeCategory = categories.find((c: any) => c.slug === categorySlug);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const canonicalUrl = categorySlug 
    ? `https://www.borgescomercial.com/produtos?categoria=${categorySlug}` 
    : `https://www.borgescomercial.com/produtos`;

  const pageTitle = activeCategory 
    ? `${activeCategory.name} — Borge Comercial`
    : `Todos os Produtos em Grosso — Borge Comercial`;
    
  const pageDescription = activeCategory 
    ? `Compre ${activeCategory.name.toLowerCase()} a grosso de forma rápida e segura na África do Sul com grandes preços.`
    : `Visualize o nosso catálogo de produtos alimentares, de higiene e limpeza. Compre a grosso via WhatsApp em Maputo.`;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Início</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className={activeCategory ? "hover:text-primary" : "text-foreground font-medium"}>
              {activeCategory ? <Link to="/produtos" className="hover:text-primary transition-colors">Produtos</Link> : "Produtos"}
            </span>
            {activeCategory && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-foreground font-medium">{activeCategory.name}</span>
              </>
            )}
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            {activeCategory ? activeCategory.name : query ? `Resultados para "${query}"` : "Todos os Produtos"}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setParam("categoria", "")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${!categorySlug ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
            >
              Todos
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat.slug}
                onClick={() => setParam("categoria", cat.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${categorySlug === cat.slug ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
              >
                {cat.image} {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Ordenar:</span>
            <select
              value={sort}
              onChange={e => setParam("ordem", e.target.value)}
              className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Relevância</option>
              <option value="preco-asc">Preço: menor → maior</option>
              <option value="preco-desc">Preço: maior → menor</option>
              <option value="nome">Nome A-Z</option>
            </select>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border/40 bg-card overflow-hidden h-[360px] md:h-[400px] flex flex-col p-5 animate-pulse">
                  <div className="w-full aspect-[4/5] bg-secondary/60 rounded-xl mb-4" />
                  <div className="w-3/4 h-4 bg-secondary/80 rounded-full mb-3" />
                  <div className="w-1/2 h-4 bg-secondary/80 rounded-full mb-auto" />
                  <div className="w-1/3 h-6 bg-secondary/80 rounded-full mt-4" />
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-secondary/30 rounded-3xl border border-border/50">
              <p className="text-lg md:text-xl font-medium text-muted-foreground mb-4">Nenhum produto em grosso encontrado nesta categoria.</p>
              <Link to="/produtos" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm">Ver todo o catálogo</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Products;
