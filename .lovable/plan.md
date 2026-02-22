
# Painel Administrativo — Borge Comercial

## Resumo
Criar um painel administrativo completo com autenticação, acessível apenas pelo administrador (borgesmariano92@gmail.com), para gerir categorias, produtos e configurações da loja. Os produtos e categorias passarão de dados estáticos para a base de dados.

---

## 1. Base de Dados (Migrações SQL)

Criar as seguintes tabelas e estruturas:

- **Enum `app_role`** com valor `admin`
- **Tabela `user_roles`** — associa utilizadores a roles (admin), com RLS e função `has_role()` para verificação segura
- **Tabela `categories`** — id, name, slug, image (emoji ou URL), description, created_at
- **Tabela `products`** — id, slug, name, price, category_id (FK para categories), image, description, benefits (array text), available, featured, delivery, created_at, updated_at

Politicas RLS:
- Leitura pública (SELECT) para categorias e produtos (loja pública)
- INSERT/UPDATE/DELETE apenas para admin (via `has_role()`)

Depois da migração, inserir:
- O utilizador borgesmariano92@gmail.com via `supabase.auth.admin.createUser` (edge function)
- A role `admin` na tabela `user_roles`
- As 5 categorias e 18 produtos existentes migrados para as novas tabelas

---

## 2. Edge Function — Criar Utilizador Admin

Uma edge function `create-admin` será criada para:
- Criar o utilizador com email borgesmariano92@gmail.com e senha provisória 123456
- Inserir a role admin na tabela `user_roles`
- Será executada uma única vez para configuração inicial

---

## 3. Páginas do Painel Admin

### Login (`/admin`)
- Formulário simples de email + senha
- Redireciona para `/admin/dashboard` após login
- Verifica se o utilizador tem role `admin`

### Dashboard (`/admin/dashboard`)
- Visão geral: total de produtos, categorias, produtos em destaque
- Links rápidos para gestão

### Gestão de Categorias (`/admin/categorias`)
- Lista de categorias com opções de editar/eliminar
- Formulário para criar/editar categoria (nome, slug, imagem, descrição)

### Gestão de Produtos (`/admin/produtos`)
- Tabela com todos os produtos, filtro por categoria
- Formulário para criar/editar produto com todos os campos
- Upload de imagem do produto (usando storage)

### Alterar Senha (`/admin/perfil`)
- Formulário para alterar a senha actual

---

## 4. Actualização da Loja Pública

- Os componentes da loja (ProductCard, FeaturedProducts, Products, ProductDetail, CategoriesSection) serão actualizados para buscar dados da base de dados em vez dos dados estáticos
- Usar React Query para cache e carregamento eficiente
- O ficheiro `src/data/products.ts` será mantido apenas como fallback/referência

---

## 5. Storage

- Criar bucket `product-images` para armazenar imagens dos produtos
- Política pública de leitura, escrita apenas para admin

---

## Detalhes Técnicos

### Estrutura de rotas
```text
/admin          -> Login
/admin/dashboard -> Dashboard (protegida)
/admin/categorias -> Gestão de categorias (protegida)
/admin/produtos   -> Gestão de produtos (protegida)
/admin/perfil     -> Alterar senha (protegida)
```

### Componentes a criar
```text
src/pages/admin/AdminLogin.tsx
src/pages/admin/AdminDashboard.tsx
src/pages/admin/AdminCategories.tsx
src/pages/admin/AdminProducts.tsx
src/pages/admin/AdminProfile.tsx
src/components/admin/AdminLayout.tsx      (sidebar + header)
src/components/admin/AdminRoute.tsx       (protecção de rota)
src/components/admin/CategoryForm.tsx
src/components/admin/ProductForm.tsx
src/hooks/useAdmin.tsx                    (verificação de role)
```

### Sequência de implementação
1. Migração SQL (tabelas, RLS, função has_role)
2. Edge function para criar admin + seed de dados
3. Storage bucket para imagens
4. Componentes admin (login, layout, dashboard, CRUD)
5. Actualizar loja pública para ler da base de dados
