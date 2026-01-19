import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useDeletedTeachers,
  useRestoreTeacher,
  useHardDeleteTeacher,
} from "@/features/super-admin/teachers/useTeacherActions";
import { Button } from "@/custom/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, UserX, AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const DeletedTeachersPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  // 1. Hooklar
  const { data: teachers, isLoading } = useDeletedTeachers(search);
  const { mutate: restoreTeacher, isPending: isRestoring } =
    useRestoreTeacher();
  const { mutate: hardDelete, isPending: isDeleting } = useHardDeleteTeacher();

  // Hard delete uchun confirm state
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (isLoading) return <div className="p-10 text-center">Yuklanmoqda...</div>;

  return (
    <div className="p-6 pt-0 space-y-6">
      {teachers?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed">
          <UserX size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500">Hozircha qabriston bo'sh...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers?.map((teacher: any) => (
            <Card
              key={teacher.id}
              className="p-5 border-l-4 border-l-red-400 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{teacher.fullName}</h3>
                  <p className="text-sm text-gray-500">{teacher.phoneNumber}</p>
                </div>
                <div className="bg-red-50 text-red-600 p-2 rounded-lg">
                  <AlertCircle size={18} />
                </div>
              </div>

              {/* O'chirish sababi */}
              <div className="bg-slate-50 p-3 rounded-xl mb-5 border border-slate-100">
                <p className="text-[12px] font-semibold text-gray-400 uppercase mb-1">
                  O'chirish sababi:
                </p>
                <p className="text-sm text-gray-700 italic">
                  "{teacher.reasonDelete || "Sabab ko'rsatilmagan"}"
                </p>
                <p className="text-[10px] text-gray-400 mt-2 text-right">
                  Admin ID: {teacher.deletedBy || "Noma'lum"}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 border-green-500 text-green-600 hover:bg-green-50"
                  onClick={() => restoreTeacher(teacher.id)}
                  disabled={isRestoring}
                >
                  <RotateCcw size={16} /> Tiklash
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 border-red-200 text-red-500 hover:bg-red-50"
                  onClick={() => setDeleteId(teacher.id)}
                  disabled={isDeleting}
                >
                  <UserX size={16} /> Butunlay o'chirish
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Batamom o'chirish uchun tasdiqlash dialogi */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Batamom o'chirishga ishonchingiz komilmi?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ushbu amalni ortga qaytarib bo'lmaydi. Ustoz ma'lumotlari bazadan
              butunlay o'chib ketadi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">
              Bekor qilish
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && hardDelete(deleteId)}
              className="bg-red-600 hover:bg-red-700 rounded-xl"
            >
              Ha, butunlay o'chirilsin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
