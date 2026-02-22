import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";

export default function AdminProfile() {
  const { user } = useAdmin();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({ title: "Erro", description: "A senha deve ter pelo menos 6 caracteres.", variant: "destructive" });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Senha alterada com sucesso" });
      setPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Perfil</h1>
      <div className="max-w-md">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Informações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Email: {user?.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alterar Senha</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label>Nova Senha</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              </div>
              <div className="space-y-2">
                <Label>Confirmar Senha</Label>
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "A guardar..." : "Alterar Senha"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
