import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useDeletedTeachers,
  useRestoreTeacher,
  useHardDeleteTeacher,
} from "@/features/super-admin/teachers/useTeacherActions";
import { Button } from "@/components/ui/button"; // Button yo'lini tekshiring
import { Card } from "@/components/ui/card";
import { RotateCcw, UserX, AlertCircle, Loader2 } from "lucide-react";
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
import { TeacherDetailsModal } from "./teacherDetail";

export const DeletedTeachersPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // 1. Hooklar
  const { data: teachersData, isLoading } = useDeletedTeachers(search);
  const { mutate: restoreTeacher, isPending: isRestoring } =
    useRestoreTeacher();
  const { mutate: hardDelete, isPending: isDeleting } = useHardDeleteTeacher();

  // Data massiv ekanligini aniqlashtiramiz (res.data.data yoki res.data)
  const teachers = teachersData?.data || teachersData || [];

	const handleViewClick = (teacher: any) => {
	  console.log("Tanlangan ustoz ma'lumotlari:", teacher);
    setSelectedTeacher(teacher);
    setIsViewModalOpen(true);
  };

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 animate-pulse">
//         <Loader2 className="w-10 h-10 text-red-400 animate-spin mb-4" />
//         <p className="text-gray-500 font-medium">Qabriston yuklanmoqda...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 pt-0 space-y-6">
//       {teachers.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
//           <UserX size={48} className="text-gray-300 mb-4" />
//           <p className="text-gray-500 font-medium text-lg">
//             Hozircha qabriston bo'sh...
//           </p>
//           <p className="text-gray-400 text-sm">
//             O'chirilgan ustozlar bu yerda ko'rinadi
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {teachers.map((teacher: any) => (
//             <Card
//               key={teacher.id}
//               className="p-5 border-l-4 border-l-red-500 hover:shadow-lg transition-all bg-white relative overflow-hidden group"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div className="space-y-1">
//                   <h3 className="font-bold text-gray-900 text-lg leading-tight">
//                     {teacher.fullName}
//                   </h3>
//                   <p className="text-sm font-medium text-gray-500">
//                     {teacher.phoneNumber}
//                   </p>
//                 </div>
//                 <div
//                   onClick={() => handleViewClick(teacher)}
//                   className="bg-red-50 text-red-600 p-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
//                 >
//                   <AlertCircle size={20} />
//                 </div>
//               </div>

//               {/* O'chirish sababi */}
//               <div className="bg-red-50/30 p-4 rounded-xl mb-6 border border-red-50/50">
//                 <p className="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-2">
//                   O'chirish sababi:
//                 </p>
//                 <p className="text-[13px] text-gray-700 leading-relaxed italic line-clamp-3">
//                   {teacher.reasonDelete || "Sabab ko'rsatilmagan"}
//                 </p>
//                 <div className="mt-3 pt-3 border-t border-red-100/50 flex justify-between items-center text-[10px] text-gray-400 font-medium">
//                   <span>Admin: {teacher.deletedBy || "Tizim"}</span>
//                   <span className="bg-white px-2 py-0.5 rounded border">
//                     ID: {teacher.id.slice(0, 8)}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="flex-1 h-10 gap-2 border-green-200 text-green-600 hover:bg-green-600 hover:text-white transition-all font-semibold"
//                   onClick={() => restoreTeacher(teacher.id)}
//                   disabled={isRestoring}
//                 >
//                   <RotateCcw
//                     size={16}
//                     className={isRestoring ? "animate-spin" : ""}
//                   />
//                   Tiklash
//                 </Button>

//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="flex-1 h-10 gap-2 border-red-100 text-red-500 hover:bg-red-600 hover:text-white transition-all font-semibold"
//                   onClick={() => setDeleteId(teacher.id)}
//                   disabled={isDeleting}
//                 >
//                   <UserX size={16} /> Butunlay o'chirish
//                 </Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Batamom o'chirish uchun tasdiqlash dialogi */}
//       <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
//         <AlertDialogContent className="max-w-md rounded-2xl">
//           <AlertDialogHeader>
//             <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
//               <AlertCircle className="text-red-600" size={24} />
//             </div>
//             <AlertDialogTitle className="text-center text-xl">
//               Batamom o'chirishga ishonchingiz komilmi?
//             </AlertDialogTitle>
//             <AlertDialogDescription className="text-center">
//               Bu amal o'qituvchini ma'lumotlar bazasidan{" "}
//               <strong className="text-red-600">butunlay yo'q qiladi</strong>.
//               Keyinchalik uni tiklash imkoniyati bo'lmaydi.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter className="sm:justify-center gap-2 mt-4">
//             <AlertDialogCancel className="rounded-xl flex-1 border-slate-200">
//               Bekor qilish
//             </AlertDialogCancel>
//             <AlertDialogAction
//               onClick={() => deleteId && hardDelete(deleteId)}
//               className="bg-red-600 hover:bg-red-700 rounded-xl flex-1"
//             >
//               {isDeleting ? "O'chirilmoqda..." : "Ha, o'chirilsin"}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       {/* Detail Modal: O'qituvchi ma'lumotlarini ko'rish */}
//       <TeacherDetailsModal
//         id={selectedTeacher?.id} // teacher={selectedTeacher} emas, id yuboramiz
//         open={isViewModalOpen}
//         onOpenChange={setIsViewModalOpen}
//       />
//     </div>
	//   );
	
	if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <Loader2 className="w-10 h-10 text-red-400 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Qabriston yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 pt-0 space-y-6">
      {teachers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <UserX size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium text-lg">
            Hozircha qabriston bo'sh...
          </p>
          <p className="text-gray-400 text-sm">
            O'chirilgan ustozlar bu yerda ko'rinadi
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {teachers.map((teacher: any) => (
            <Card
              key={teacher.id}
              className="p-4 sm:p-5 border-l-4 border-l-red-500 hover:shadow-lg transition-all bg-white relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1 min-w-0 pr-2">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight truncate">
                    {teacher.fullName}
                  </h3>
                  <p className="text-sm font-medium text-gray-500">
                    {teacher.phoneNumber}
                  </p>
                </div>
                <div
                  onClick={() => handleViewClick(teacher)}
                  className="bg-red-50 text-red-600 p-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <AlertCircle size={20} />
                </div>
              </div>

              {/* O'chirish sababi */}
              <div className="bg-red-50/30 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 border border-red-50/50">
                <p className="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-2">
                  O'chirish sababi:
                </p>
                <p className="text-[13px] text-gray-700 leading-relaxed italic line-clamp-3">
                  {teacher.reasonDelete || "Sabab ko'rsatilmagan"}
                </p>
                <div className="mt-3 pt-3 border-t border-red-100/50 flex justify-between items-center text-[10px] text-gray-400 font-medium">
                  <span className="truncate mr-2">
                    Admin: {teacher.deletedBy || "Tizim"}
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded border shrink-0">
                    ID: {teacher.id.slice(0, 8)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-9 sm:h-10 gap-1 sm:gap-2 border-green-200 text-green-600 hover:bg-green-600 hover:text-white transition-all font-semibold text-[11px] sm:text-sm"
                  onClick={() => restoreTeacher(teacher.id)}
                  disabled={isRestoring}
                >
                  <RotateCcw
                    size={15}
                    className={isRestoring ? "animate-spin" : ""}
                  />
                  Tiklash
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-9 sm:h-10 gap-1 sm:gap-2 border-red-100 text-red-500 hover:bg-red-600 hover:text-white transition-all font-semibold text-[11px] sm:text-sm"
                  onClick={() => setDeleteId(teacher.id)}
                  disabled={isDeleting}
                >
                  <UserX size={15} /> O'chirish
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Batamom o'chirish uchun tasdiqlash dialogi */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl">
          <AlertDialogHeader>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <AlertDialogTitle className="text-center text-xl">
              Batamom o'chirishga ishonchingiz komilmi?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Bu amal o'qituvchini ma'lumotlar bazasidan{" "}
              <strong className="text-red-600">butunlay yo'q qiladi</strong>.
              Keyinchalik uni tiklash imkoniyati bo'lmaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-2 mt-4">
            <AlertDialogCancel className="rounded-xl flex-1 border-slate-200">
              Bekor qilish
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && hardDelete(deleteId)}
              className="bg-red-600 hover:bg-red-700 rounded-xl flex-1"
            >
              {isDeleting ? "O'chirilmoqda..." : "Ha, o'chirilsin"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Detail Modal */}
      <TeacherDetailsModal
        id={selectedTeacher?.id}
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
      />
    </div>
  );
};
