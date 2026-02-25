import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface ProductForm {
  name: string;
  slug: string;
  price: number;
  category_id: string;
  image: string;
  description: string;
  benefits: string;
  available: boolean;
  featured: boolean;
  delivery: string;
  sales_type: string;
}

const emptyForm: ProductForm = {
  name: "", slug: "", price: 0, category_id: "", image: "/placeholder.svg",
  description: "", benefits: "", available: true, featured: false, delivery: "Entrega em 24-48h",
  sales_type: "grosso",
};

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const { data: categories = [] } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*, categories(name)").order("name");
      if (error) throw error;
      return data;
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = form.image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload = {
        name: form.name,
        slug: form.slug,
        price: form.price,
        category_id: form.category_id || null,
        image: imageUrl,
        description: form.description,
        benefits: form.benefits.split("\n").map((b) => b.trim()).filter(Boolean),
        available: form.available,
        featured: form.featured,
        delivery: form.delivery,
        sales_type: form.sales_type,
      };

      if (editId) {
        const { error } = await supabase.from("products").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products-count"] });
      queryClient.invalidateQueries({ queryKey: ["admin-featured-count"] });
      toast({ title: editId ? "Produto actualizado" : "Produto criado" });
      setOpen(false);
      setForm(emptyForm);
      setEditId(null);
      setImageFile(null);
    },
    onError: (e: any) => toast({ title: "Erro", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast({ title: "Produto eliminado" });
    },
    onError: (e: any) => toast({ title: "Erro", description: e.message, variant: "destructive" }),
  });

  const openEdit = (p: any) => {
    setEditId(p.id);
    setForm({
      name: p.name, slug: p.slug, price: p.price,
      category_id: p.category_id ?? "", image: p.image ?? "/placeholder.svg",
      description: p.description ?? "", benefits: (p.benefits ?? []).join("\n"),
      available: p.available, featured: p.featured, delivery: p.delivery ?? "",
      sales_type: p.sales_type ?? "grosso",
    });
    setImageFile(null);
    setOpen(true);
  };

  const openNew = () => {
    setEditId(null);
    setForm(emptyForm);
    setImageFile(null);
    setOpen(true);
  };

  const generateSlug = (name: string) =>
    name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const filtered = filterCategory === "all"
    ? products
    : products.filter((p: any) => p.category_id === filterCategory);

  const formatPrice = (price: number) => price.toLocaleString("pt-MZ") + " MT";

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <div className="flex gap-3">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((c: any) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Novo Produto</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto max-w-lg">
              <DialogHeader>
                <DialogTitle>{editId ? "Editar Produto" : "Novo Produto"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editId ? form.slug : generateSlug(e.target.value) })} required maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required maxLength={100} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preço (Kz)</Label>
                    <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required min={0} />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select value={form.category_id} onValueChange={(v) => setForm({ ...form, category_id: v })}>
                      <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((c: any) => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Venda</Label>
                    <Select value={form.sales_type} onValueChange={(v) => setForm({ ...form, sales_type: v })}>
                      <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grosso">Grosso</SelectItem>
                        <SelectItem value="unidade">Unidade</SelectItem>
                        <SelectItem value="ambos">Ambos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Imagem do produto</Label>
                    <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
                    {form.image && form.image !== "/placeholder.svg" && (
                      <p className="text-xs text-muted-foreground truncate">Actual: {form.image}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} maxLength={500} />
                </div>
                <div className="space-y-2">
                  <Label>Benefícios (um por linha)</Label>
                  <Textarea value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} placeholder={"Benefício 1\nBenefício 2"} />
                </div>
                <div className="space-y-2">
                  <Label>Prazo de entrega</Label>
                  <Input value={form.delivery} onChange={(e) => setForm({ ...form, delivery: e.target.value })} maxLength={100} />
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Switch checked={form.available} onCheckedChange={(v) => setForm({ ...form, available: v })} />
                    <Label>Disponível</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                    <Label>Destaque</Label>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "A guardar..." : "Guardar"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">A carregar...</p>
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Tipo de Venda</TableHead>
                <TableHead>Destaque</TableHead>
                <TableHead>Disponível</TableHead>
                <TableHead className="text-right">Acções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p: any) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{(p as any).categories?.name ?? "—"}</TableCell>
                  <TableCell>{formatPrice(p.price)}</TableCell>
                  <TableCell className="capitalize">{p.sales_type || "Grosso"}</TableCell>
                  <TableCell>{p.featured ? "⭐" : "—"}</TableCell>
                  <TableCell>{p.available ? "✅" : "❌"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEdit(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => deleteMutation.mutate(p.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
}
