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
      <div className="bg-background h-screen flex justify-center items-center">
        <div className="w-125 space-y-7 shadow-lg bg-card py-8 px-8 rounded-2xl">
          <div className="text-center">
            <h1 className="text-[33px] font-bold text-primary mb-1">
              Admin Panel
            </h1>
            <p className="font-stretch-105% text-[#555555] ">
              Tizim boshqaruvi uchun kirish
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel
                      className={`font-stretch-110% text-[#555555] inline-block transition-all ${
                        watchUsername ? "animate-none" : "animate-bounce"
                      }`}
                    >
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-12.5"
                        placeholder="Foydalanuvchi nomini kiriting..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel
                      className={`font-stretch-110% text-[#555555] inline-block transition-all ${
                        watchPassword ? "animate-none" : "animate-bounce"
                      }`}
                    >
                      Parol
                    </FormLabel>
                    <div className="relative">
                      {" "}
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="h-12.5 pr-12"
                          placeholder="Parolingizni kiriting..."
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mb-7">
                <Button
                  type="submit"
                  className="w-full active:bg-primary/80 flex justify-center items-center gap-2"
                  size={"lg"}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Tizimga kirish
                      {/* Faqat forma valid bo'lganda ko'k nuqta chiqadi */}
                      {isValid && (
                        <span className="relative flex size-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                        </span>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="text-center">
            <p className="font-light text-[#555555] text-[13px]">
              Admin panel - Faqat ruxsat etilgan foydalanuvchilar uchun
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
