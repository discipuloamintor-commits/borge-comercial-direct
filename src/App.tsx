import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminRoute from "./components/admin/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produto/:slug" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/categorias" element={<AdminRoute><AdminCategories /></AdminRoute>} />
          <Route path="/admin/produtos" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/perfil" element={<AdminRoute><AdminProfile /></AdminRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
