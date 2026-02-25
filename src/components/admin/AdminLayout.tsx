import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderOpen, Package, User, LogOut, Menu } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";


const navItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Categorias", url: "/admin/categorias", icon: FolderOpen },
  { title: "Produtos", url: "/admin/produtos", icon: Package },
  { title: "Perfil", url: "/admin/perfil", icon: User },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <div className="flex min-h-screen bg-muted/30 flex-col md:flex-row">
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border">
        <h1 className="text-lg font-bold text-primary">Borge Admin</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6 border-b border-border">
              <h1 className="text-lg font-bold text-primary">Borge Admin</h1>
            </div>
            <nav className="flex flex-col flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                    location.pathname === item.url
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="p-4 mt-auto border-t border-border">
              <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden md:flex w-64 bg-card border-r border-border flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-lg font-bold text-primary">Borge Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                location.pathname === item.url
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
    </div>
  );
}
