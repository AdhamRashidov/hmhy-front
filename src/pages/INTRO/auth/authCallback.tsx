import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import type { TUserRole } from "@/types/types";

export const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("accessToken");
    const role = searchParams.get("role") as TUserRole;

    if (token && role) {
      login(token, role as TUserRole);

      const timer = setTimeout(() => {
        navigate("/app/TEACHER/dashboard", { replace: true });
      }, 100);

      return () => clearTimeout(timer);
    } else {
      navigate("/teacher-login");
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Kirish amalga oshirilmoqda...</p>
      </div>
    </div>
  );
};
