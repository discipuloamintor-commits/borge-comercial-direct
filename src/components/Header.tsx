import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ArrowRight, ChevronDown } from "lucide-react";
import { categories } from "@/data/products";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [logoClicks, setLogoClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastClickTime > 2000) {
      setLogoClicks(1);
    } else {
      const newClicks = logoClicks + 1;
      if (newClicks >= 5) {
        setLogoClicks(0);
        navigate("/admin");
      } else {
        setLogoClicks(newClicks);
      }
    }
    setLastClickTime(now);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "glass shadow-premium border-b border-white/20 py-2"
        : "bg-background/95 backdrop-blur-md border-b border-border/50 py-4"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="flex items-center cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
          title="Borge Comercial"
        >
          <img src="/borgecomerciallogo.pnj.png" alt="Borge Comercial" className="h-10 md:h-12 w-auto object-contain" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          <Link to="/" className="relative px-5 py-2.5 text-sm font-semibold tracking-wide text-foreground/80 hover:text-primary transition-colors rounded-xl hover:bg-primary/5">
            Início
          </Link>
          <Link to="/produtos" className="relative px-5 py-2.5 text-sm font-semibold tracking-wide text-foreground/80 hover:text-primary transition-colors rounded-xl hover:bg-primary/5">
            Produtos
          </Link>

          <div className="relative group">
            <button className="px-5 py-2.5 text-sm font-semibold tracking-wide text-foreground/80 hover:text-primary transition-colors rounded-xl hover:bg-primary/5 flex items-center gap-1.5 cursor-pointer">
              Categorias <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-56 z-50">
              <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-premium-lg p-3 flex flex-col gap-1.5">
                {categories.map(cat => (
                  <Link
                    key={cat.slug}
                    to={`/produtos?categoria=${cat.slug}`}
                    className="px-4 py-2.5 text-sm font-medium tracking-wide text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors rounded-xl flex items-center gap-3"
                  >
                    <span className="text-xl">{cat.image}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/encomendar" className="relative px-5 py-2.5 text-sm font-bold tracking-wide text-primary hover:text-primary/80 transition-colors rounded-xl bg-primary/10 hover:bg-primary/20 flex items-center gap-2">
            Formulário de Grosso
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 rounded-xl hover:bg-primary/5 transition-colors"
            aria-label="Pesquisar"
          >
            <Search className="h-5 w-5 text-foreground/70" />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-primary/5 transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 border-t border-border/50 bg-background/98 backdrop-blur-xl px-4 py-6 shadow-premium-lg animate-fade-in-up origin-top" style={{ animationDuration: "0.4s" }}>
          <form
            onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/produtos?q=${encodeURIComponent(searchQuery)}`; }}
            className="container mx-auto flex gap-3 max-w-3xl"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="O que você está procurando?"
                className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-primary/20 bg-background text-base shadow-inner placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                autoFocus
              />
            </div>
            <button type="submit" className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground text-base font-bold shadow-premium hover:shadow-premium-lg hover:-translate-y-1 transition-all">
              Buscar
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 border-b border-border bg-background px-5 pb-8 pt-4 shadow-2xl flex flex-col gap-3 animate-fade-in-up origin-top" style={{ animationDuration: "0.3s" }}>

          <div className="flex flex-col gap-1 pb-4 border-b border-border/60">
            <Link to="/" onClick={() => setMenuOpen(false)} className="py-3 px-4 rounded-xl text-base font-semibold hover:bg-primary/5 hover:text-primary transition-all flex items-center gap-3">
              Início
            </Link>
            <Link to="/produtos" onClick={() => setMenuOpen(false)} className="py-3 px-4 rounded-xl text-base font-semibold hover:bg-primary/5 hover:text-primary transition-all flex items-center gap-3">
              Todos os Produtos
            </Link>
            <Link to="/encomendar" onClick={() => setMenuOpen(false)} className="mt-2 py-3 px-4 rounded-xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-between shadow-premium">
              Formulário de Grosso <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="pt-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Categorias</p>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/produtos?categoria=${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-4 rounded-xl border border-border/50 bg-secondary/30 text-base font-medium text-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all flex items-center gap-3"
                >
                  <span className="text-2xl">{cat.image}</span> {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
