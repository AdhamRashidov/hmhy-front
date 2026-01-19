import React, { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth.tsx";
import type { TUserRole } from "@/types/types";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: TUserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  if (isLoading) {
    return <div>Yuklanmoqda...</div>;
  }

  //   if (!isAuthenticated) {
  //     return <Navigate to="/" replace />;
  //   }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  //   let isRoleAllowed = false;

  //   if (allowedRoles.length === 0) {
  //     isRoleAllowed = true;
  //   } else if (userRole) {
  //     isRoleAllowed = allowedRoles.includes(userRole as TUserRole);
  //   }
  const isRoleAllowed = useMemo(() => {
    if (allowedRoles.length === 0) return true;
    return userRole ? allowedRoles.includes(userRole as TUserRole) : false;
  }, [allowedRoles, userRole]);

  if (!isRoleAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
