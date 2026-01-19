import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/custom/input";
import { Button } from "@/custom/button";
import { Eye, EyeOff, Plus } from "lucide-react";
import { useAdmins } from "./useAdmins";
import { useState } from "react";
import * as z from "zod";

const phoneRegex = /^\+998\d{9}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const adminSchema = z.object({
  username: z
    .string()
    .min(3, "Username kamida 3 ta belgidan iborat bo'lishi kerak")
    .max(20, "Username juda uzun"),
  password: z
    .string()
    .min(8, "Parol kamida 8 ta belgi bo'lishi kerak")
    .regex(
      passwordRegex,
      "Parolda kamida bitta katta harf, raqam va maxsus belgi bo'lishi shart"
    ),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Telefon raqami +998XXXXXXXXX formatida bo'lishi kerak"),
});

export const CreateAdminModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const { createAdmins } = useAdmins();
  const mutation = createAdmins();

  const form = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: { username: "", password: "", phoneNumber: "" },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setOpen(false); // Modalni yopish
        form.reset(); // Formani tozalash
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-[#20B2AA] hover:bg-[#1a928c]">
          <Plus size={18} /> Yangi admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-xl">Yangi admin qo'shish</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="admin123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Telefon raqami</FormLabel>
                  <FormControl>
                    <Input placeholder="+998901234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Parol</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"} // Holatga qarab type o'zgaradi
                        placeholder="******"
                        className="pr-10 focus-visible:ring-[#20B2AA]" // Ikonka uchun o'ngdan joy (padding)
                        {...field}
                      />
                      <Button
                        variant={"link"}
                        type="button" // Submit bo'lib ketmasligi uchun type="button" shart
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#20B2AA] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#20B2AA]"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
