
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute = ({ 
  children,
  requiredRole
}: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a required role is specified, check if the user has the required role
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'super-admin') {
      return <Navigate to="/super-admin" replace />;
    } else {
      return <Navigate to="/clinic-admin" replace />;
    }
  }

  return <>{children}</>;
};
