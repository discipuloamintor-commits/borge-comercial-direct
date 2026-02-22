import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { Navigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, loading: adminLoading } = useAdmin();

  if (adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (user && isAdmin) return <Navigate to="/admin/dashboard" replace />;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({ title: "Erro no login", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    // Check admin role
    const { data: { user: loggedUser } } = await supabase.auth.getUser();
    if (!loggedUser) {
      toast({ title: "Erro", description: "Não foi possível verificar o utilizador.", variant: "destructive" });
      setLoading(false);
      return;
    }

    const { data: hasRole } = await supabase.rpc("has_role", { _user_id: loggedUser.id, _role: "admin" });

    if (!hasRole) {
      await supabase.auth.signOut();
      toast({ title: "Acesso negado", description: "Apenas administradores podem aceder.", variant: "destructive" });
      setLoading(false);
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">Borge Admin</CardTitle>
          <p className="text-muted-foreground text-sm">Aceda ao painel administrativo</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "A entrar..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
