import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { categories, WHATSAPP_NUMBER } from "@/data/products";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Logo-colored top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <img src="/borgecomerciallogo.pnj.png" alt="Borge Comercial" className="h-14 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A sua loja de confiança para produtos alimentares, higiene e limpeza. Encomende pelo WhatsApp!
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-5 text-sm uppercase tracking-widest text-gray-300">Categorias</h3>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link
                    to={`/produtos?categoria=${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-yellow-400 transition-colors" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-5 text-sm uppercase tracking-widest text-gray-300">Links Úteis</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-yellow-400 transition-colors" />
                  Início
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-yellow-400 transition-colors" />
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-yellow-400 transition-colors" />
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-yellow-400 transition-colors" />
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-5 text-sm uppercase tracking-widest text-gray-300">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-yellow-400" />
                </div>
                +{WHATSAPP_NUMBER}
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-yellow-400" />
                </div>
                borgesmariano92@gmail.com
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                </div>
                Maputo - Praca dos combatentes - Mercado xiquelene
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Borge Comercial. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gray-500 text-center md:text-right">
            Desenvolvido por <a href="http://www.lgtecserv.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium">LG TecServ</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
