import { Navigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
}
