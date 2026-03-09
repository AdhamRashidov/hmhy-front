import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import type { TUserRole } from "@/types/types";

export const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const hasLoggedIn = useRef(false); // ← ikki marta ishlamasligi uchun

  // 1-useEffect: login() ni chaqirish
  useEffect(() => {
    if (hasLoggedIn.current) return; // ← StrictMode da ikki marta chaqirilishini oldini olish

    const token = searchParams.get("accessToken");
    const role = searchParams.get("role") as TUserRole;

    console.log("Token:", token);
    console.log("Role:", role);

    if (token && role) {
      hasLoggedIn.current = true;
      console.log("Login funksiyasi chaqirilyapti...");
      login(token, role);
    } else {
      console.log("Ma'lumotlar topilmadi, login sahifasiga qaytish...");
      navigate("/teacher-login", { replace: true });
    }
  }, [searchParams]); // ← faqat searchParams, login stable ref

  // 2-useEffect: isAuthenticated o'zgargandan KEYIN navigate
  // Bu setState async bo'lgani uchun state yangilanganini kutamiz
  useEffect(() => {
    if (isAuthenticated && userRole) {
      console.log("State yangilandi, navigatsiya boshlandi:", userRole);

      if (userRole === "TEACHER")
        navigate("/app/TEACHER/dashboard", { replace: true });
      else if (userRole === "ADMIN")
        navigate("/app/ADMIN/dashboard", { replace: true });
      else if (userRole === "SUPERADMIN")
        navigate("/app/SUPERADMIN/dashboard", { replace: true });
      else navigate("/app", { replace: true });
    }
  }, [isAuthenticated, userRole]); // ← state yangilanishi kutiladi

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Kirish amalga oshirilmoqda...</p>
      </div>
    </div>
  );
};