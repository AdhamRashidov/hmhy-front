import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  loginFormSchema,
  type LoginFormValues,
} from "@/features/auth/login/schema.login";

import { Button } from "@/custom/button";
import { Input } from "@/custom/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogin } from "@/features/auth/login/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import Cookies from "js-cookie";
import { toast } from "sonner";
import type { AxiosErrorResponse } from "@/types/types";
import { useState } from "react";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const watchUsername = form.watch("username");
  const watchPassword = form.watch("password");
  const isValid = form.formState.isValid;

  const onSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: (res) => {
        const username = data.username;
        const role = res.data.role;
        Cookies.set("token", res.data.accessToken);
        localStorage.setItem("role", role);
        login(res.data.accessToken, role as any, username);
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
  <>
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-4 md:p-6 selection:bg-primary/10">
      <div className="w-full max-w-md space-y-8 shadow-2xl bg-white border border-slate-100 py-10 px-8 md:px-10 rounded-[2rem] animate-in fade-in zoom-in duration-500">
        {/* Sarlavha qismi */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Admin Panel
          </h1>
          <p className="font-medium text-slate-500 text-base">
            Tizim boshqaruvi uchun kirish
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-2.5">
                  <FormLabel
                    className={`text-[14px] font-bold text-slate-700 ml-1 inline-block transition-all ${
                      watchUsername ? "animate-none" : "animate-bounce"
                    }`}
                  >
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12.5 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 font-medium"
                      placeholder="Foydalanuvchi nomini kiriting..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-semibold ml-1" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2.5">
                  <FormLabel
                    className={`text-[14px] font-bold text-slate-700 ml-1 inline-block transition-all ${
                      watchPassword ? "animate-none" : "animate-bounce"
                    }`}
                  >
                    Parol
                  </FormLabel>
                  <div className="relative group">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="h-12.5 pr-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 font-medium"
                        placeholder="Parolingizni kiriting..."
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary active:scale-90 transition-all focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage className="text-xs font-semibold ml-1" />
                </FormItem>
              )}
            />

            {/* Tugma qismi */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12.5 rounded-xl text-[16px] font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all flex justify-center items-center gap-3"
                size={"lg"}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Tizimga kirish
                    {isValid && (
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75"></span>
                        <span className="relative inline-flex size-2.5 rounded-full bg-white"></span>
                      </span>
                    )}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>

        {/* Footer qismi */}
        <div className="text-center pt-2">
          <p className="font-semibold text-slate-400 text-[13px] leading-relaxed max-w-62.5 mx-auto">
            Admin panel - Faqat ruxsat etilgan foydalanuvchilar uchun
          </p>
        </div>
      </div>
    </div>
  </>
);
};
