import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get("categoria") || "";
  const query = searchParams.get("q") || "";
  const sort = searchParams.get("ordem") || "";

  const filtered = useMemo(() => {
    let result = [...products];
    if (categorySlug) result = result.filter(p => p.categorySlug === categorySlug);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sort === "preco-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "preco-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "nome") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [categorySlug, query, sort]);

  const activeCategory = categories.find(c => c.slug === categorySlug);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumbs */}
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

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setParam("categoria", "")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${!categorySlug ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
            >
              Todos
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setParam("categoria", cat.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${categorySlug === cat.slug ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
              >
                {cat.image} {cat.name}
              </button>
            ))}
          </div>

          {/* Sort */}
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

          {/* Products Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Nenhum produto encontrado.</p>
              <Link to="/produtos" className="text-primary hover:underline text-sm mt-2 inline-block">Ver todos os produtos</Link>
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
