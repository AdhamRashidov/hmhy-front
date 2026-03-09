import React, { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth.tsx";
import type { TUserRole } from "@/types/types";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: TUserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const hasToken = Cookies.get("token");

  const isRoleAllowed = useMemo(() => {
    if (allowedRoles.length === 0) return true;
    if (!userRole && hasToken) return true;
    return userRole ? allowedRoles.includes(userRole as TUserRole) : false;
  }, [allowedRoles, userRole, hasToken]);

  // ✅ Token bor, lekin state hali yuklanmagan → kutamiz
  if (isLoading || (!isAuthenticated && hasToken)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  // ✅ Token ham yo'q, authenticated ham emas → login
  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/" replace />;
  }

  // ✅ Role ruxsat berilmagan
  if (!isRoleAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};