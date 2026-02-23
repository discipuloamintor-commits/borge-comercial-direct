export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  categorySlug: string;
  image: string;
  description: string;
  benefits: string[];
  available: boolean;
  featured: boolean;
  delivery: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const WHATSAPP_NUMBER = "258844357612";

export const categories: Category[] = [
  { name: "Alimentos Básicos", slug: "alimentos-basicos", image: "🍚", description: "Arroz, feijão, óleo e mais" },
  { name: "Bebidas", slug: "bebidas", image: "🥤", description: "Água, sumos e refrigerantes" },
  { name: "Higiene Pessoal", slug: "higiene-pessoal", image: "🧴", description: "Sabonete, pasta de dentes e mais" },
  { name: "Limpeza", slug: "limpeza", image: "🧹", description: "Sabão, detergente e papel higiénico" },
  { name: "Bebé", slug: "bebe", image: "👶", description: "Fraldas e produtos infantis" },
];

export const products: Product[] = [
  // Alimentos Básicos
  {
    id: "1", slug: "arroz-5kg", name: "Arroz 5kg", price: 2500, category: "Alimentos Básicos", categorySlug: "alimentos-basicos",
    image: "/placeholder.svg", description: "Arroz de alta qualidade, grão longo, perfeito para o dia a dia da sua família. Rende mais e tem cozimento uniforme.",
    benefits: ["Grão longo premium", "Cozimento uniforme", "Alto rendimento", "Ideal para toda a família"],
    available: true, featured: true, delivery: "Entrega em 24-48h"
  },
  {
    id: "2", slug: "feijao-1kg", name: "Feijão Vermelho 1kg", price: 800, category: "Alimentos Básicos", categorySlug: "alimentos-basicos",
    image: "/placeholder.svg", description: "Feijão vermelho selecionado, rico em proteínas e fibras. Ideal para acompanhar o arroz.",
    benefits: ["Rico em proteínas", "Rico em fibras", "Grãos selecionados", "Cozimento rápido"],
    available: true, featured: true, delivery: "Entrega em 24-48h"
  },
  {
    id: "3", slug: "oleo-vegetal-1l", name: "Óleo Vegetal 1L", price: 600, category: "Alimentos Básicos", categorySlug: "alimentos-basicos",
    image: "/placeholder.svg", description: "Óleo vegetal de qualidade para cozinhar os seus pratos favoritos com sabor e saúde.",
    benefits: ["Sem colesterol", "Ideal para frituras", "Sabor neutro", "Qualidade garantida"],
    available: true, featured: false, delivery: "Entrega em 24-48h"
  },
  {
    id: "4", slug: "acucar-1kg", name: "Açúcar 1kg", price: 400, category: "Alimentos Básicos", categorySlug: "alimentos-basicos",
    image: "/placeholder.svg", description: "Açúcar branco refinado de alta qualidade para adoçar o seu dia.",
    benefits: ["Refinado", "Dissolve facilmente", "Embalagem prática", "Qualidade superior"],
    available: true, featured: false, delivery: "Entrega em 24-48h"
  },
  {
    id: "5", slug: "farinha-trigo-1kg", name: "Farinha de Trigo 1kg", price: 500, category: "Alimentos Básicos", categorySlug: "alimentos-basicos",
    image: "/placeholder.svg", description: "Farinha de trigo versátil para pães, bolos e receitas diversas.",
    benefits: ["Textura fina", "Multiuso", "Ideal para panificação", "Qualidade premium"],
    available: true, featured: false, delivery: "Entrega em 24-48h"
  },
  // Bebidas
  {
    id: "6", slug: "agua-mineral-1-5l", name: "Água Mineral 1.5L", price: 200, category: "Bebidas", categorySlug: "bebidas",
    image: "/placeholder.svg", description: "Água mineral natural, pura e refrescante para toda a família.",
    benefits: ["100% natural", "Fonte pura", "Embalagem prática", "Hidratação essencial"],
    available: true, featured: false, delivery: "Entrega em 24-48h"
  },
  {
    id: "7", slug: "sumo-laranja-1l", name: "Sumo de Laranja 1L", price: 450, category: "Bebidas", categorySlug: "bebidas",
    image: "/placeholder.svg", description: "Sumo de laranja natural, rico em vitamina C para começar bem o dia.",
    benefits: ["Rico em Vitamina C", "Sabor natural", "Sem conservantes", "Refrescante"],
    available: true, featured: true, delivery: "Entrega em 24-48h"
  },
  {
    id: "8", slug: "refrigerante-cola-2l", name: "Refrigerante Cola 2L", price: 350, category: "Bebidas", categorySlug: "bebidas",
    image: "/placeholder.svg", description: "Refrigerante de cola refrescante para os momentos de lazer.",
    benefits: ["Refrescante", "Embalagem familiar", "Sabor clássico", "Ideal para festas"],
    available: true, featured: false, delivery: "Entrega em 24-48h"
  },
  // Higiene Pessoal
  {
    id: "9", slug: "sabonete-pack-3", name: "Sabonete Pack 3 unidades", price: 350, category: "Higiene Pessoal", categorySlug: "higiene-pessoal",
    image: "/placeholder.svg", description: "Pack de 3 sabonetes com fragrância suave, cuidam e protegem a sua pele.",
    benefits: ["Fragrância suave", "Hidratante", "Proteção antibacteriana", "Pack económico"],
    available: true, featured: false, delivery: "Entrega em 24-48h"
  },
  {
    id: "10", slug: "pasta-dentes-100ml", name: "Pasta de Dentes 100ml", price: 300, category: "Higiene Pessoal", categorySlug: "higiene-pessoal",
    image: "/placeholder.svg", description: "Pasta de dentes com flúor para uma proteção completa dos seus dentes.",
    benefits: ["Proteção com flúor", "Hálito fresco", "Branqueamento suave", "Uso diário"],
    available: true, featured: false, delivery: "Entrega em 24-48h"
  },
  {
    id: "11", slug: "champô-400ml", name: "Champô 400ml", price: 550, category: "Higiene Pessoal", categorySlug: "higiene-pessoal",
    image: "/placeholder.svg", description: "Champô nutritivo para cabelos saudáveis e brilhantes.",
    benefits: ["Nutrição profunda", "Cabelos brilhantes", "Para todos os tipos", "Fragrância agradável"],
    available: true, featured: true, delivery: "Entrega em 24-48h"
  },
  // Limpeza
  {
    id: "12", slug: "sabao-po-1kg", name: "Sabão em Pó 1kg", price: 700, category: "Limpeza", categorySlug: "limpeza",
    image: "/placeholder.svg", description: "Sabão em pó de alta performance para roupas mais limpas e perfumadas.",
    benefits: ["Remove manchas difíceis", "Perfume duradouro", "Protege as cores", "Alto rendimento"],
    available: true, featured: true, delivery: "Entrega em 24-48h"
  },
  {
    id: "13", slug: "detergente-loica-500ml", name: "Detergente para Loiça 500ml", price: 250, category: "Limpeza", categorySlug: "limpeza",
    image: "/placeholder.svg", description: "Detergente concentrado que remove gordura facilmente.",
    benefits: ["Concentrado", "Remove gordura", "Suave para as mãos", "Rendimento extra"],
    available: true, featured: false, delivery: "Entrega em 24-48h"
  },
  {
    id: "14", slug: "papel-higienico-pack-4", name: "Papel Higiénico Pack 4 rolos", price: 400, category: "Limpeza", categorySlug: "limpeza",
    image: "/placeholder.svg", description: "Papel higiénico suave e resistente, folha dupla.",
    benefits: ["Folha dupla", "Extra suave", "Resistente", "Pack económico"],
    available: true, featured: false, delivery: "Entrega em 24-48h"
  },
  {
    id: "15", slug: "lixivia-1l", name: "Lixívia 1L", price: 300, category: "Limpeza", categorySlug: "limpeza",
    image: "/placeholder.svg", description: "Lixívia multiuso para desinfeção e limpeza profunda.",
    benefits: ["Desinfetante", "Multiuso", "Elimina bactérias", "Limpeza profunda"],
    available: true, featured: false, delivery: "Entrega em 24-48h"
  },
  // Bebé
  {
    id: "16", slug: "fraldas-pack-30", name: "Fraldas Pack 30 unidades", price: 3500, category: "Bebé", categorySlug: "bebe",
    image: "/placeholder.svg", description: "Fraldas ultra absorventes que mantêm o bebé seco e confortável durante mais tempo.",
    benefits: ["Ultra absorventes", "12h de proteção", "Suaves para a pele", "Sistema anti-vazamento"],
    available: true, featured: true, delivery: "Entrega em 24-48h"
  },
  {
    id: "17", slug: "toalhitas-bebe-pack-80", name: "Toalhitas Bebé Pack 80", price: 500, category: "Bebé", categorySlug: "bebe",
    image: "/placeholder.svg", description: "Toalhitas suaves e hipoalergénicas para a pele delicada do bebé.",
    benefits: ["Hipoalergénicas", "Sem álcool", "Extra suaves", "Fragrância suave"],
    available: true, featured: false, delivery: "Entrega em 24-48h"
  },
  {
    id: "18", slug: "leite-infantil-400g", name: "Leite Infantil 400g", price: 2800, category: "Bebé", categorySlug: "bebe",
    image: "/placeholder.svg", description: "Leite infantil enriquecido com vitaminas e minerais essenciais para o crescimento saudável.",
    benefits: ["Rico em vitaminas", "Fácil digestão", "Crescimento saudável", "Fórmula equilibrada"],
    available: true, featured: false, delivery: "Entrega em 24-48h"
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("pt-MZ") + " MT";
}

export function getWhatsAppLink(productName?: string): string {
  const message = productName
    ? `Olá Borge Comercial, gostaria de encomendar o produto ${productName}. Pode confirmar disponibilidade e prazo de entrega?`
    : "Olá Borge Comercial, gostaria de saber mais sobre os vossos produtos.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
