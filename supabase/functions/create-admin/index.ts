import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Create admin user
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: "borgesmariano92@gmail.com",
      password: "123456",
      email_confirm: true,
    });

    if (userError && !userError.message.includes("already been registered")) {
      throw userError;
    }

    let userId = userData?.user?.id;

    // If user already exists, get the id
    if (!userId) {
      const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
      const existing = users?.find((u: any) => u.email === "borgesmariano92@gmail.com");
      userId = existing?.id;
    }

    if (!userId) throw new Error("Could not find or create admin user");

    // Assign admin role
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

    if (roleError) throw roleError;

    // Seed categories
    const categoriesData = [
      { name: "Alimentos Básicos", slug: "alimentos-basicos", image: "🍚", description: "Arroz, feijão, óleo e mais" },
      { name: "Bebidas", slug: "bebidas", image: "🥤", description: "Água, sumos e refrigerantes" },
      { name: "Higiene Pessoal", slug: "higiene-pessoal", image: "🧴", description: "Sabonete, pasta de dentes e mais" },
      { name: "Limpeza", slug: "limpeza", image: "🧹", description: "Sabão, detergente e papel higiénico" },
      { name: "Bebé", slug: "bebe", image: "👶", description: "Fraldas e produtos infantis" },
    ];

    const { data: categories, error: catError } = await supabaseAdmin
      .from("categories")
      .upsert(categoriesData, { onConflict: "slug" })
      .select();

    if (catError) throw catError;

    const catMap: Record<string, string> = {};
    for (const c of categories!) {
      catMap[c.slug] = c.id;
    }

    // Seed products
    const productsData = [
      { slug: "arroz-5kg", name: "Arroz 5kg", price: 2500, category_id: catMap["alimentos-basicos"], image: "/placeholder.svg", description: "Arroz de alta qualidade, grão longo, perfeito para o dia a dia da sua família.", benefits: ["Grão longo premium","Cozimento uniforme","Alto rendimento","Ideal para toda a família"], available: true, featured: true, delivery: "Entrega em 24-48h" },
      { slug: "feijao-1kg", name: "Feijão Vermelho 1kg", price: 800, category_id: catMap["alimentos-basicos"], image: "/placeholder.svg", description: "Feijão vermelho selecionado, rico em proteínas e fibras.", benefits: ["Rico em proteínas","Rico em fibras","Grãos selecionados","Cozimento rápido"], available: true, featured: true, delivery: "Entrega em 24-48h" },
      { slug: "oleo-vegetal-1l", name: "Óleo Vegetal 1L", price: 600, category_id: catMap["alimentos-basicos"], image: "/placeholder.svg", description: "Óleo vegetal de qualidade para cozinhar.", benefits: ["Sem colesterol","Ideal para frituras","Sabor neutro","Qualidade garantida"], available: true, featured: false, delivery: "Entrega em 24-48h" },
      { slug: "acucar-1kg", name: "Açúcar 1kg", price: 400, category_id: catMap["alimentos-basicos"], image: "/placeholder.svg", description: "Açúcar branco refinado de alta qualidade.", benefits: ["Refinado","Dissolve facilmente","Embalagem prática","Qualidade superior"], available: true, featured: false, delivery: "Entrega em 24-48h" },
      { slug: "farinha-trigo-1kg", name: "Farinha de Trigo 1kg", price: 500, category_id: catMap["alimentos-basicos"], image: "/placeholder.svg", description: "Farinha de trigo versátil para pães, bolos e receitas diversas.", benefits: ["Textura fina","Multiuso","Ideal para panificação","Qualidade premium"], available: true, featured: false, delivery: "Entrega em 24-48h" },
      { slug: "agua-mineral-1-5l", name: "Água Mineral 1.5L", price: 200, category_id: catMap["bebidas"], image: "/placeholder.svg", description: "Água mineral natural, pura e refrescante.", benefits: ["100% natural","Fonte pura","Embalagem prática","Hidratação essencial"], available: true, featured: false, delivery: "Entrega em 24-48h" },
      { slug: "sumo-laranja-1l", name: "Sumo de Laranja 1L", price: 450, category_id: catMap["bebidas"], image: "/placeholder.svg", description: "Sumo de laranja natural, rico em vitamina C.", benefits: ["Rico em Vitamina C","Sabor natural","Sem conservantes","Refrescante"], available: true, featured: true, delivery: "Entrega em 24-48h" },
      { slug: "refrigerante-cola-2l", name: "Refrigerante Cola 2L", price: 350, category_id: catMap["bebidas"], image: "/placeholder.svg", description: "Refrigerante de cola refrescante.", benefits: ["Refrescante","Embalagem familiar","Sabor clássico","Ideal para festas"], available: true, featured: false, delivery: "Entrega em 24-48h" },
      { slug: "sabonete-pack-3", name: "Sabonete Pack 3 unidades", price: 350, category_id: catMap["higiene-pessoal"], image: "/placeholder.svg", description: "Pack de 3 sabonetes com fragrância suave.", benefits: ["Fragrância suave","Hidratante","Proteção antibacteriana","Pack económico"], available: true, featured: false, delivery: "Entrega em 24-48h" },
      { slug: "pasta-dentes-100ml", name: "Pasta de Dentes 100ml", price: 300, category_id: catMap["higiene-pessoal"], image: "/placeholder.svg", description: "Pasta de dentes com flúor para proteção completa.", benefits: ["Proteção com flúor","Hálito fresco","Branqueamento suave","Uso diário"], available: true, featured: false, delivery: "Entrega em 24-48h" },
      { slug: "champo-400ml", name: "Champô 400ml", price: 550, category_id: catMap["higiene-pessoal"], image: "/placeholder.svg", description: "Champô nutritivo para cabelos saudáveis e brilhantes.", benefits: ["Nutrição profunda","Cabelos brilhantes","Para todos os tipos","Fragrância agradável"], available: true, featured: true, delivery: "Entrega em 24-48h" },
      { slug: "sabao-po-1kg", name: "Sabão em Pó 1kg", price: 700, category_id: catMap["limpeza"], image: "/placeholder.svg", description: "Sabão em pó de alta performance.", benefits: ["Remove manchas difíceis","Perfume duradouro","Protege as cores","Alto rendimento"], available: true, featured: true, delivery: "Entrega em 24-48h" },
      { slug: "detergente-loica-500ml", name: "Detergente para Loiça 500ml", price: 250, category_id: catMap["limpeza"], image: "/placeholder.svg", description: "Detergente concentrado que remove gordura.", benefits: ["Concentrado","Remove gordura","Suave para as mãos","Rendimento extra"], available: true, featured: false, delivery: "Entrega em 24-48h" },
      { slug: "papel-higienico-pack-4", name: "Papel Higiénico Pack 4 rolos", price: 400, category_id: catMap["limpeza"], image: "/placeholder.svg", description: "Papel higiénico suave e resistente, folha dupla.", benefits: ["Folha dupla","Extra suave","Resistente","Pack económico"], available: true, featured: false, delivery: "Entrega em 24-48h" },
      { slug: "lixivia-1l", name: "Lixívia 1L", price: 300, category_id: catMap["limpeza"], image: "/placeholder.svg", description: "Lixívia multiuso para desinfeção e limpeza profunda.", benefits: ["Desinfetante","Multiuso","Elimina bactérias","Limpeza profunda"], available: true, featured: false, delivery: "Entrega em 24-48h" },
      { slug: "fraldas-pack-30", name: "Fraldas Pack 30 unidades", price: 3500, category_id: catMap["bebe"], image: "/placeholder.svg", description: "Fraldas ultra absorventes.", benefits: ["Ultra absorventes","12h de proteção","Suaves para a pele","Sistema anti-vazamento"], available: true, featured: true, delivery: "Entrega em 24-48h" },
      { slug: "toalhitas-bebe-pack-80", name: "Toalhitas Bebé Pack 80", price: 500, category_id: catMap["bebe"], image: "/placeholder.svg", description: "Toalhitas suaves e hipoalergénicas.", benefits: ["Hipoalergénicas","Sem álcool","Extra suaves","Fragrância suave"], available: true, featured: false, delivery: "Entrega em 24-48h" },
      { slug: "leite-infantil-400g", name: "Leite Infantil 400g", price: 2800, category_id: catMap["bebe"], image: "/placeholder.svg", description: "Leite infantil enriquecido com vitaminas e minerais.", benefits: ["Rico em vitaminas","Fácil digestão","Crescimento saudável","Fórmula equilibrada"], available: true, featured: false, delivery: "Entrega em 24-48h" },
    ];

    const { error: prodError } = await supabaseAdmin
      .from("products")
      .upsert(productsData, { onConflict: "slug" });

    if (prodError) throw prodError;

    return new Response(
      JSON.stringify({ success: true, message: "Admin user created and data seeded" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
