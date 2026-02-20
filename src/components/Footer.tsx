import { Link } from "react-router-dom";
import { ShoppingBag, Phone, Mail, MapPin } from "lucide-react";
import { categories, WHATSAPP_NUMBER } from "@/data/products";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-6 w-6" />
              <span className="text-lg font-bold">Borge Comercial</span>
            </div>
            <p className="text-sm opacity-70">
              A sua loja de confiança para produtos alimentares, higiene e limpeza. Encomende pelo WhatsApp!
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Categorias</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link to={`/produtos?categoria=${cat.slug}`} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Links Úteis</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Início</Link></li>
              <li><Link to="/produtos" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Produtos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm opacity-70">
                <Phone className="h-4 w-4" /> +{WHATSAPP_NUMBER}
              </li>
              <li className="flex items-center gap-2 text-sm opacity-70">
                <Mail className="h-4 w-4" /> info@borgecomercial.com
              </li>
              <li className="flex items-center gap-2 text-sm opacity-70">
                <MapPin className="h-4 w-4" /> Luanda, Angola
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-10 pt-6 text-center">
          <p className="text-sm opacity-50">© {new Date().getFullYear()} Borge Comercial. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
