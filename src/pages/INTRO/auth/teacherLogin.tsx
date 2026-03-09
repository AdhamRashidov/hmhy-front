import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Users2,
  Mail,
  Lock,
  AlertCircle,
  EyeOff,
  Eye,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { GoogleIcon } from "@/assets/icon/googleIcon";
import { useAuth } from "@/hooks/use-auth"; // AuthContext'ingiz bor deb hisoblaymiz
// import API from "@/config/request";
import type { AxiosErrorResponse } from "@/types/types";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchemaTeacher,
  type LoginFormValuesTeacher,
} from "@/features/auth/login/schemaTeacher.login";
import { useLoginTeacher } from "@/features/auth/login/useLogin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function TeacherLogin() {
  const navigate = useNavigate();
  // const { login: setAuth } = useAuth(); // Context orqali userni saqlash
  const { login } = useAuth();
  const { mutate } = useLoginTeacher();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("Adham123!");
  const [error] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formTeacher = useForm<LoginFormValuesTeacher>({
    resolver: zodResolver(loginFormSchemaTeacher),
    defaultValues: {
      email: "",
      password: "Adham123!",
    },
    mode: "onChange",
  });


  // --- 1. Google Login Mantiig'i ---
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setIsLoading(true);
      const googleToken = tokenResponse.access_token;
      const role = "TEACHER";

      const backendUrl = `${
        import.meta.env.VITE_BASE_URL
      }/teacher/google?token=${googleToken}&role=${role}`;
      window.location.href = backendUrl;
    },
    onError: () => {
      toast.error("Google login jarayoni bekor qilindi");
    },
  });

  // --- 2. Email/Password Login Mantiig'i ---
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!email || !password) {
  //       setError("Email va parolni kiriting");
  //       return;
  //     }

  //     setError("");
  //     setIsLoading(true);

  //     try {
  //       const response = await API.post("/signin/teacher", {
  //         email,
  //         password,
  //       });
  //       const { token, user } = response.data;
  //       //   setAuth(user, token);
  //       toast.success("Tizimga muvaffaqiyatli kirdingiz");
  //       navigate("/app/TEACHER/dashboard");
  //     } catch (err: any) {
  //       const message =
  //         err.response?.data?.message || "Email yoki parol noto'g'ri";
  //       setError(message);
  //       toast.error(message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const onSubmitTeacher = (data: LoginFormValuesTeacher) => {
    mutate(data, {
      onSuccess: (res) => {
        const email = data.email;
        const role = res.data.role;
        Cookies.set("token", res.data.accessToken);
        localStorage.setItem("role", role);
        login(res.data.accessToken, role as any, email);
        toast.success(res.message.uz, {
          position: "top-center",
          style: {
            color: "green",
          },
        });

        if (role === "ADMIN" || role === "SUPERADMIN") {
          navigate(`/app/${role}`, { replace: true });
        } else {
          navigate(`/app`);
        }
      },

      onError: (error: AxiosErrorResponse) => {
        const errorMessage = error.response.data.message || "Xatolik yuz berdi";

        toast.error(errorMessage, {
          position: "top-center",
          style: {
            color: "red",
          },
        });
      },
    });
  };


return (
  <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-slate-50 relative overflow-hidden selection:bg-blue-100">
    <div className="absolute inset-0 z-0 opacity-40 [radial-gradient(#cbd5e1_1px,transparent_1px)] [bg-size:24px_24px]"></div>

    <div className="w-full max-w-110 z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-[28px] mb-6 shadow-2xl shadow-blue-200 group transition-all duration-500 hover:rotate-12 hover:scale-110">
          <Users2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Teacher Portal
        </h1>
      </div>

      <Card className="shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-none rounded-[2.5rem] bg-white/90 backdrop-blur-2xl">
        <CardHeader className="pt-10 pb-2 text-center">
          <CardTitle className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Xush kelibsiz
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 px-6 md:px-10 pb-10">
          {/* Google Tugmasi */}
          <Button
            type="button"
            onClick={() => loginWithGoogle()}
            disabled={isLoading}
            className="w-full h-13 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-100 text-slate-700 font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-3 group shadow-sm"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            ) : (
              <>
                <GoogleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[15px]">Google orqali tezkor kirish</span>
              </>
            )}
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black text-slate-400">
              <span className="bg-white px-4 rounded-full">
                yoki email bilan
              </span>
            </div>
          </div>

          <Form {...formTeacher}>
            <form
              onSubmit={formTeacher.handleSubmit(onSubmitTeacher)}
              className="space-y-6"
            >
              {/* EMAIL */}
              <FormField
                control={formTeacher.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[14px] font-bold text-slate-700 ml-1">
                      Elektron pochta
                    </FormLabel>

                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />

                        <Input
                          type="email"
                          placeholder="name@university.com"
                          className="pl-12 h-13 rounded-2xl border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-2 font-medium"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage className="text-xs font-bold ml-1 text-red-500" />
                  </FormItem>
                )}
              />

              {/* PASSWORD */}
              <FormField
                control={formTeacher.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <FormLabel className="text-[14px] font-bold text-slate-700">
                        Maxfiy parol
                      </FormLabel>

                      <button
                        type="button"
                        className="text-[11px] md:text-xs text-blue-600 font-bold hover:text-blue-700 hover:underline transition-all"
                      >
                        Unutdingizmi?
                      </button>
                    </div>

                    <FormControl>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />

                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-12 pr-12 h-13 rounded-2xl border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-2 font-medium"
                          disabled={isLoading}
                          {...field}
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-all active:scale-90"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage className="text-xs font-bold ml-1 text-red-500" />
                  </FormItem>
                )}
              />

              {/* SERVER ERROR */}
              {error && (
                <Alert
                  variant="destructive"
                  className="rounded-2xl py-3 border-red-100 bg-red-50/50 text-red-600 animate-in fade-in zoom-in duration-300 flex items-center gap-3"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <AlertDescription className="text-[12px] font-bold leading-tight">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* SUBMIT */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 group relative overflow-hidden"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Kirish{" "}
                      <Users2 className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <p className="mt-8 text-center text-[12px] font-bold text-slate-400 px-6">
        Faqat ro'yxatdan o'tgan o'qituvchilar uchun maxsus portal
      </p>
    </div>
  </div>
);
	
}
// function mutate(
//   data: { email: string; password: string },
//   arg1: {
//     onSuccess: (res: any) => void;
//     onError: (error: AxiosErrorResponse) => void;
//   }
// ) {
//   throw new Error("Function not implemented.");
// }
