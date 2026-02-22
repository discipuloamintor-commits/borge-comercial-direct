import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FolderOpen, Star } from "lucide-react";

export default function AdminDashboard() {
  const { data: products } = useQuery({
    queryKey: ["admin-products-count"],
    queryFn: async () => {
      const { count } = await supabase.from("products").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["admin-categories-count"],
    queryFn: async () => {
      const { count } = await supabase.from("categories").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: featured } = useQuery({
    queryKey: ["admin-featured-count"],
    queryFn: async () => {
      const { count } = await supabase.from("products").select("*", { count: "exact", head: true }).eq("featured", true);
      return count ?? 0;
    },
  });

  const stats = [
    { label: "Total Produtos", value: products ?? 0, icon: Package },
    { label: "Categorias", value: categories ?? 0, icon: FolderOpen },
    { label: "Em Destaque", value: featured ?? 0, icon: Star },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
