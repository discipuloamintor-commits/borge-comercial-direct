import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import BrandsSection from "@/components/BrandsSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import DifferentialsSection from "@/components/DifferentialsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const canonicalUrl = "https://www.borgescomercial.com/";

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Borge Comercial — Produtos Alimentares, Higiene e Limpeza em Maputo</title>
        <meta name="description" content="A sua loja de confiança para compra de alimentos básicos, higiene e limpeza a grosso. Encomende pelo WhatsApp com entrega rápida e segura." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Borge Comercial — Produtos Alimentares, Higiene e Limpeza em Maputo" />
        <meta property="og:description" content="A sua loja de confiança para compra de alimentos básicos a grosso. Encomende pelo WhatsApp com entrega rápida em Moçambique." />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <BrandsSection />
        <FeaturedProducts />
        <DifferentialsSection />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;

