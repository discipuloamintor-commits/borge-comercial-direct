import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import { categories } from "@/data/products";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag className="h-7 w-7 text-primary" />
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            Borge<span className="text-primary"> Comercial</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Início</Link>
          <Link to="/produtos" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Produtos</Link>
          {categories.map(cat => (
            <Link key={cat.slug} to={`/produtos?categoria=${cat.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-md hover:bg-secondary transition-colors" aria-label="Pesquisar">
            <Search className="h-5 w-5 text-foreground" />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-md hover:bg-secondary transition-colors" aria-label="Menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t border-border bg-background px-4 py-3">
          <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/produtos?q=${encodeURIComponent(searchQuery)}`; }} className="container mx-auto flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Pesquisar produtos..."
              className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
            <button type="submit" className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-accent transition-colors">
              Pesquisar
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2 space-y-1">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 px-3 rounded-md text-sm font-medium hover:bg-secondary transition-colors">Início</Link>
          <Link to="/produtos" onClick={() => setMenuOpen(false)} className="block py-2 px-3 rounded-md text-sm font-medium hover:bg-secondary transition-colors">Todos os Produtos</Link>
          {categories.map(cat => (
            <Link key={cat.slug} to={`/produtos?categoria=${cat.slug}`} onClick={() => setMenuOpen(false)} className="block py-2 px-3 rounded-md text-sm text-muted-foreground hover:bg-secondary transition-colors">
              {cat.image} {cat.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
