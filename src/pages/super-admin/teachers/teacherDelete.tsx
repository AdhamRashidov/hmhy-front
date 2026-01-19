import { useState } from "react";
import { useDeleteTeacher } from "@/features/super-admin/teachers/useTeacherActions";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import { Textarea } from "../../../components/ui/textarea";
import type { Teacher } from "@/features/super-admin/teachers/types";
import { useQueryClient } from "@tanstack/react-query";

type TeacherDeleteModalProps = {
  teacher: Teacher;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const TeacherDeleteModal = ({
  teacher,
  open,
  onOpenChange,
}: TeacherDeleteModalProps) => {
  const [reason, setReason] = useState("");
  const { mutate, isPending } = useDeleteTeacher();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    if (reason.trim().length < 5) {
      toast.error("Iltimos, batafsilroq sabab ko'rsating (kamida 5 ta belgi)", {
        position: "top-center",
      });
      return;
    }

    mutate(
      { id: teacher.id, reason },
      {
        onSuccess: () => {
          toast.success("Ustoz 'Qabriston'ga muvaffaqiyatli ko'chirildi", {
            position: "top-center",
          });
          // Ma'lumotlarni yangilash
          queryClient.invalidateQueries({ queryKey: ["teacherList"] });
          queryClient.invalidateQueries({ queryKey: ["deleted-teachers"] });

          onOpenChange(false);
          setReason("");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Xatolik yuz berdi!");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-112.5 p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
        {/* Yuqori qizil ogohlantirish qismi */}
        <div className="bg-red-50 p-6 flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-2">
            <Trash2 size={24} />
          </div>
          <DialogTitle className="text-xl font-bold text-red-900">
            Arxivga yuborish
          </DialogTitle>
          <DialogDescription className="text-red-600/70 font-medium">
            Ustoz asosiy ro'yxatdan o'chiriladi va o'chirilganlar bo'limiga
            tushadi.
          </DialogDescription>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-start gap-3">
            <AlertTriangle
              className="text-amber-500 shrink-0 mt-0.5"
              size={18}
            />
            <p className="text-sm text-slate-600 leading-relaxed">
              Siz{" "}
              <span className="font-bold text-slate-900">
                {teacher?.fullName || teacher?.name}
              </span>
              ni o'chirmoqchisiz. Ushbu ustoz bilan bog'liq barcha ma'lumotlar
              arxivlanadi.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">
                O'chirish sababi <span className="text-red-500">*</span>
              </label>
              <span
                className={`text-[11px] font-medium ${
                  reason.length >= 5 ? "text-green-500" : "text-slate-400"
                }`}
              >
                {reason.length}/500
              </span>
            </div>

            <Textarea
              placeholder="Masalan: O'z xohishiga ko'ra ishdan bo'shadi..."
              className="min-h-30 bg-white border-slate-200 rounded-2xl resize-none focus-visible:ring-red-500/10 focus-visible:border-red-400 transition-all p-4 text-slate-700 shadow-sm"
              maxLength={500}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 rounded-2xl font-bold text-slate-500 border-slate-200 hover:bg-slate-50 active:scale-95 transition-all"
            >
              Bekor qilish
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isPending || reason.trim().length < 5}
              className="flex-[1.5] h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-200 active:scale-95 transition-all gap-2"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Ha, arxivga yuborilsin</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};