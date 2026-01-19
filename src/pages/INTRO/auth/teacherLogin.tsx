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
    <div className="min-h-screen flex items-center justify-center p-4  relative overflow-hidden">
      {/* Orqa fondagi bezak nuqtalar */}
      <div className="absolute inset-0 z-0 opacity-40 [radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size:[24px_24px]"></div>

      <div className="w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-[24px] mb-5 shadow-2xl shadow-blue-200 group transition-transform hover:rotate-6">
            <Users2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Teacher Portal
          </h1>
        </div>

        <Card className="shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-0 rounded-[32px] bg-white/80 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Xush kelibsiz</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-4">
            {/* Google Tugmasi */}
            <Button
              type="button"
              onClick={() => loginWithGoogle()}
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-blue-50/50 hover:bg-blue-50 border border-blue-100 text-blue-700 font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              ) : (
                <>
                  <GoogleIcon />
                  <span>Google orqali tezkor kirish</span>
                </>
              )}
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-500"></span>
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-widest font-bold text-slate-400">
                <span className="bg-white px-4">yoki email bilan</span>
              </div>
            </div>

            {/* <Form {...form}>
              <form
                onSubmit={formTeacher.handleSubmit(onSubmitTeacher)}
                className="space-y-7"
              >
                <div className="space-y-2.5">
                  <Label className="text-sm font-bold text-slate-700 ml-1">
                    Elektron pochta
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      type="email"
                      placeholder="name@university.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-13 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-2"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-center px-1">
                    <Label className="text-sm font-bold text-slate-700">
                      Maxfiy parol
                    </Label>
                    <button
                      type="button"
                      className="text-xs text-blue-600 font-bold hover:text-blue-700 transition-colors"
                    >
                      Unutdingizmi?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-13 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-2"
                      disabled={isLoading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert
                    variant="destructive"
                    className="rounded-2xl py-3 border-red-100 bg-red-50 text-red-600 animate-in zoom-in duration-300"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs font-bold tracking-tight">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="b w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      Kirish <Users2 className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Form> */}
            <Form {...formTeacher}>
              <form
                onSubmit={formTeacher.handleSubmit(onSubmitTeacher)}
                className="space-y-7"
              >
                {/* EMAIL */}
                <FormField
                  control={formTeacher.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2.5">
                      <FormLabel className="text-sm font-bold text-slate-700 ml-1">
                        Elektron pochta
                      </FormLabel>

                      <FormControl>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />

                          <Input
                            type="email"
                            placeholder="name@university.com"
                            className="pl-12 h-13 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-2"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* PASSWORD */}
                <FormField
                  control={formTeacher.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2.5">
                      <div className="flex justify-between items-center px-1">
                        <FormLabel className="text-sm font-bold text-slate-700">
                          Maxfiy parol
                        </FormLabel>

                        <button
                          type="button"
                          className="text-xs text-blue-600 font-bold hover:text-blue-700 transition-colors"
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
                            className="pl-12 pr-12 h-13 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-2"
                            disabled={isLoading}
                            {...field}
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SERVER ERROR */}
                {error && (
                  <Alert
                    variant="destructive"
                    className="rounded-2xl py-3 border-red-100 bg-red-50 text-red-600 animate-in zoom-in duration-300"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs font-bold tracking-tight">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {/* SUBMIT */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 group"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      Kirish <Users2 className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
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
