import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Edit } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
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
import { useAdmins } from "./useAdmins";
import type { IAdmin } from "./types";

const editSchema = z.object({
  username: z.string().min(3, "Username kamida 3 ta belgi bo'lishi kerak"),
  phoneNumber: z.string().min(9, "Telefon raqami noto'g'ri"),
  password: z.string().optional().or(z.literal("")), // Bo'sh bo'lishi mumkin
});

export const EditAdminModal = ({ admin }: { admin: IAdmin }) => {
  const [open, setOpen] = useState(false);
  const { updateAdmin } = useAdmins();
  const mutation = updateAdmin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      username: admin.username,
      phoneNumber: admin.phoneNumber,
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof editSchema>) => {
    // Faqat kerakli maydonlarni yuboramiz
    const payload: any = {
      username: values.username,
      phoneNumber: values.phoneNumber,
    };

    // Agar parol kiritilgan bo'lsa, uni ham qo'shamiz
    if (values.password && values.password.trim() !== "") {
      payload.password = values.password;
    }

    mutation.mutate(
      { id: admin.id, data: payload },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset({ ...values, password: "" });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-amber-600 hover:text-amber-700 hover:bg-amber-100/70"
        >
          <Edit size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#20B2AA]">
            Adminni tahrirlash
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon raqami</FormLabel>
                  <FormControl>
                    <Input placeholder="+998..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yangi Parol (ixtiyoriy)</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"} 
                        placeholder="********"
                        className="pr-10" 
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-[#20B2AA] hover:bg-[#1a8e88] w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Saqlanmoqda..." : "Yangilash"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
