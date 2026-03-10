import { useState } from "react";
import {
  useTeacherList,
  useChangeTeacherStatus,
} from "@/features/super-admin/teachers/useTeacherActions";
import { Mail, Phone, Star, Award, ArrowUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import type { Teacher } from "@/features/super-admin/teachers/types";
import { TeacherDetailsModal } from "./teacherDetail";
import { toast } from "sonner";
import { TeacherEditModal } from "./teacherEdit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { TeacherDeleteModal } from "./teacherDelete";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosErrorResponse } from "@/types/types";
import { DeletedTeachersPage } from "./deletedTeachers";

export const Teachers = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const [viewMode, setViewMode] = useState<"active" | "pending">("active");

  const isArchived = searchParams.get("view") === "deleted";
  const searchQuery = searchParams.get("search") || "";

  // React Query: Faqat "tiriklar" ro'yxati uchun
  const { data, isPending } = useTeacherList({ search: searchQuery });

  // Modal states
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTeacher, setEditTeacher] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteTeacher, setDeleteTeacher] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Statusni o'zgartirish mutatsiyasi
  const { mutate: changeStatus, isPending: isStatusPending } =
    useChangeTeacherStatus();

  // Handlerlar
  const handleEditClick = (teacher: any) => {
    setEditTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (teacher: any) => {
    setDeleteTeacher(teacher);
    setIsDeleteModalOpen(true);
  };

  const handleOpenDetails = (id: string) => {
    setSelectedTeacherId(id);
    setIsModalOpen(true);
  };

  const getInitials = (name: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleStatusToggle = (id: string) => {
    changeStatus(id, {
      onSuccess: () => {
        toast.success("Status muvaffaqiyatli o'zgartirildi!");
        queryClient.invalidateQueries({ queryKey: ["teacherList"] });
      },
      onError: (error: AxiosErrorResponse) => {
        toast.error(error.response?.data?.message || "Xatolik yuz berdi");
      },
    });
  };

  const teachers: Teacher[] = data?.data || [];

  const pendingTeachers = teachers.filter((t) => !t.isActive);
  const activeTeachers = teachers.filter((t) => t.isActive);

  const currentList = viewMode === "active" ? activeTeachers : pendingTeachers;

  // Frontend filter (Backend qidiruvi bilan parallel ishlaydi)
  const filteredTeachers = currentList.filter((t) =>
    (t.fullName || t.name || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

//   return (
//     <div className="p-6 space-y-6">
//       {isArchived ? (
//         <DeletedTeachersPage />
//       ) : isPending ? (
//         <div className="space-y-4">
//           <div className="flex items-center justify-between px-2">
//             <Skeleton className="h-9 w-32" />
//             <Skeleton className="h-10 w-48 rounded-md" />
//           </div>
//           {[1, 2, 3].map((i) => (
//             <Card key={i} className="p-4">
//               <Skeleton className="h-24 w-full" />
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <>
//           {/* 1. Yuqori Navigatsiya va Filtrlar */}
//           <div className="flex flex-col gap-6 border-b pb-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Button
//                   variant={viewMode === "active" ? "default" : "outline"}
//                   onClick={() => setViewMode("active")}
//                   className="rounded-full px-6 transition-all"
//                 >
//                   Tasdiqlanganlar
//                 </Button>
//                 <Button
//                   variant={viewMode === "pending" ? "default" : "outline"}
//                   onClick={() => setViewMode("pending")}
//                   className="relative rounded-full px-6 border-orange-200 text-orange-700 hover:bg-orange-50 transition-all"
//                 >
//                   Arizalar
//                   {pendingTeachers.length > 0 && (
//                     <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white animate-bounce shadow-lg font-bold">
//                       {pendingTeachers.length}
//                     </span>
//                   )}
//                 </Button>
//               </div>

//               <div className="flex items-center gap-4 text-sm text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <span>Status:</span>
//                   <Select defaultValue="all">
//                     <SelectTrigger className="w-24 h-9 bg-gray-50/50">
//                       <SelectValue placeholder="All" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>

//             {/* 2. Sortlash sarlavhalari */}
//             <div className="flex items-center gap-8 text-[13px] font-medium text-gray-700 px-4">
//               <span className="text-gray-400 w-[35%] min-w-[320px]">
//                 O'qituvchi ma'lumotlari
//               </span>
//               <div className="flex items-center gap-8 flex-1">
//                 <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 min-w-37.5">
//                   Email/Tel <ArrowUpDown className="w-3.5 h-3.5" />
//                 </div>
//                 <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 min-w-20">
//                   Reyting <ArrowUpDown className="w-3.5 h-3.5" />
//                 </div>
//                 <div className="flex-1"></div> {/* Bo'sh joy */}
//               </div>
//             </div>
//           </div>

//           {/* 3. Asosiy Teacherlar Ro'yxati */}
//           <div className="space-y-4">
//             {filteredTeachers.length === 0 ? (
//               <Card className="p-16 text-center text-gray-500 border-dashed bg-gray-50/50">
//                 <div className="flex flex-col items-center gap-2">
//                   <p className="text-lg font-medium">
//                     Hech qanday ma'lumot topilmadi
//                   </p>
//                   <p className="text-sm opacity-70">
//                     Siz qidirayotgan o'qituvchi hali mavjud emas yoki
//                     tasdiqlanmagan.
//                   </p>
//                 </div>
//               </Card>
//             ) : (
//               filteredTeachers.map((teacher) => (
//                 <Card
//                   key={teacher.id}
//                   className={`pl-4 pr-6 py-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
//                     !teacher.isActive
//                       ? "border-l-4 border-l-orange-500 bg-orange-50/10"
//                       : "border-gray-100 bg-white"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     {/* Profil qismi */}
//                     <div className="flex items-center gap-4 w-[35%] min-w-[320px] shrink-0">
//                       <Avatar className="h-14 w-14 rounded-full border-2 border-white shadow-sm">
//                         <AvatarImage
//                           src={teacher.imageUrl}
//                           className="object-cover"
//                         />
//                         <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-lg">
//                           {getInitials(teacher.fullName || teacher.name)}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="flex flex-col gap-1 overflow-hidden">
//                         <div className="flex items-center gap-2">
//                           <h3 className="font-bold text-gray-900 text-base truncate">
//                             {teacher.fullName || teacher.name}
//                           </h3>
//                           <Badge
//                             className={`text-[9px] px-2 py-0 rounded-full border-none font-bold uppercase shadow-none ${
//                               teacher.isActive
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-orange-100 text-orange-700"
//                             }`}
//                           >
//                             {teacher.isActive ? "Active" : "Pending"}
//                           </Badge>
//                         </div>
//                         <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
//                           <span className="text-blue-600">
//                             {teacher.specification || "Yo'nalish yo'q"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Award className="w-3.5 h-3.5 text-orange-500" />
//                             {teacher.level || 0} level
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Kontakt qismi */}
//                     <div className="flex flex-col justify-center gap-1.5 w-50 px-6 border-l border-gray-100 shrink-0">
//                       <div
//                         className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 cursor-pointer"
//                         onClick={() => {
//                           navigator.clipboard.writeText(teacher.email);
//                           toast.success("Email nusxalandi!");
//                         }}
//                       >
//                         <Mail className="w-3.5 h-3.5 text-gray-400" />
//                         <span className="truncate">{teacher.email}</span>
//                       </div>
//                       <div
//                         className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 cursor-pointer"
//                         onClick={() => {
//                           navigator.clipboard.writeText(teacher.phoneNumber);
//                           toast.success("Tel nusxalandi!");
//                         }}
//                       >
//                         <Phone className="w-3.5 h-3.5 text-gray-400" />
//                         <span>{teacher.phoneNumber}</span>
//                       </div>
//                     </div>

//                     {/* Reyting qismi */}
//                     <div className="flex flex-col items-center justify-center w-20 shrink-0 border-l border-gray-100">
//                       <div className="flex items-center gap-1 text-yellow-500 font-bold text-base">
//                         <Star className="w-4 h-4 fill-yellow-500" />
//                         {Number(teacher.rating || 0).toFixed(1)}
//                       </div>
//                       <span className="text-[10px] text-gray-400 font-medium uppercase">
//                         Rating
//                       </span>
//                     </div>

//                     {/* Action tugmalari */}
//                     <div className="flex items-center justify-end gap-5 flex-1 border-l border-gray-100 pl-4">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="h-8 text-[11px] font-bold"
//                         onClick={() => handleOpenDetails(teacher.id)}
//                       >
//                         More
//                       </Button>
//                       <Button
//                         variant={teacher.isActive ? "outline" : "default"}
//                         size="sm"
//                         className={`h-8 text-[11px] font-bold ${
//                           !teacher.isActive &&
//                           "bg-blue-600 hover:bg-blue-700 text-white"
//                         }`}
//                         onClick={() => handleStatusToggle(teacher.id)}
//                         disabled={isStatusPending}
//                       >
//                         {teacher.isActive ? "Deactivate" : "Activate"}
//                       </Button>
//                       {/* <Button
//                         variant="outline"
//                         size="sm"
//                         className="b h-8 text-[11px] font-bold"
//                         onClick={() => handleEditClick(teacher)}
//                       >
//                         Edit
//                       </Button> */}
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         className="h-8 text-[11px] font-bold bg-red-600 hover:bg-red-700"
//                         onClick={() => {
//                           setDeleteTeacher(teacher);
//                           setIsDeleteModalOpen(true);
//                         }}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </div>
//                 </Card>
//               ))
//             )}
//           </div>
//         </>
//       )}

//       {/* Modallar */}
//       {selectedTeacherId && (
//         <TeacherDetailsModal
//           id={selectedTeacherId as string}
//           open={isModalOpen}
//           onOpenChange={setIsModalOpen}
//         />
//       )}
//       <TeacherEditModal
//         teacher={editTeacher}
//         open={isEditModalOpen}
//         onOpenChange={setIsEditModalOpen}
//       />
//       <TeacherDeleteModal
//         teacher={deleteTeacher}
//         open={isDeleteModalOpen}
//         onOpenChange={setIsDeleteModalOpen}
//       />
//     </div>
//   );

	
return (
  <div className="p-3 sm:p-6 space-y-6">
    {isArchived ? (
      <DeletedTeachersPage />
    ) : isPending ? (
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-10 w-48 rounded-md" />
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-24 w-full" />
          </Card>
        ))}
      </div>
    ) : (
      <>
        {/* 1. Yuqori Navigatsiya va Filtrlar */}
        <div className="flex flex-col gap-4 border-b pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "active" ? "default" : "outline"}
                onClick={() => setViewMode("active")}
                className="rounded-full px-4 sm:px-6 text-xs sm:text-sm transition-all"
              >
                Tasdiqlanganlar
              </Button>
              <Button
                variant={viewMode === "pending" ? "default" : "outline"}
                onClick={() => setViewMode("pending")}
                className="relative rounded-full px-4 sm:px-6 text-xs sm:text-sm border-orange-200 text-orange-700 hover:bg-orange-50 transition-all"
              >
                Arizalar
                {pendingTeachers.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white animate-bounce shadow-lg font-bold">
                    {pendingTeachers.length}
                  </span>
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Status:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-24 h-9 bg-gray-50/50">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sortlash sarlavhalari - faqat desktop */}
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-gray-700 px-4">
            <span className="text-gray-400 w-[35%] min-w-[320px]">
              O'qituvchi ma'lumotlari
            </span>
            <div className="flex items-center gap-8 flex-1">
              <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 min-w-37.5">
                Email/Tel <ArrowUpDown className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 min-w-20">
                Reyting <ArrowUpDown className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1"></div>
            </div>
          </div>
        </div>

        {/* 3. Asosiy Teacherlar Ro'yxati */}
        <div className="space-y-3">
          {filteredTeachers.length === 0 ? (
            <Card className="p-16 text-center text-gray-500 border-dashed bg-gray-50/50">
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg font-medium">
                  Hech qanday ma'lumot topilmadi
                </p>
                <p className="text-sm opacity-70">
                  Siz qidirayotgan o'qituvchi hali mavjud emas yoki
                  tasdiqlanmagan.
                </p>
              </div>
            </Card>
          ) : (
            filteredTeachers.map((teacher) => (
              <Card
                key={teacher.id}
                className={`pl-3 sm:pl-4 pr-3 sm:pr-6 py-3 sm:py-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  !teacher.isActive
                    ? "border-l-4 border-l-orange-500 bg-orange-50/10"
                    : "border-gray-100 bg-white"
                }`}
              >
                {/* Mobile layout */}
                <div className="flex flex-col gap-3 md:hidden">
                  {/* Yuqori qator: avatar + ism + badge + amallar */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-10 w-10 rounded-full border-2 border-white shadow-sm shrink-0">
                        <AvatarImage
                          src={teacher.imageUrl}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">
                          {getInitials(teacher.fullName || teacher.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-gray-900 text-sm truncate">
                            {teacher.fullName || teacher.name}
                          </h3>
                          <Badge
                            className={`text-[9px] px-2 py-0 rounded-full border-none font-bold uppercase shadow-none shrink-0 ${
                              teacher.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {teacher.isActive ? "Active" : "Pending"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="text-blue-600 truncate">
                            {teacher.specification || "Yo'nalish yo'q"}
                          </span>
                          <span className="flex items-center gap-1 shrink-0">
                            <Award className="w-3 h-3 text-orange-500" />
                            {teacher.level || 0} level
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Reyting - mobile */}
                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm shrink-0">
                      <Star className="w-3.5 h-3.5 fill-yellow-500" />
                      {Number(teacher.rating || 0).toFixed(1)}
                    </div>
                  </div>

                  {/* Action tugmalari - mobile */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-[11px] font-bold flex-1"
                      onClick={() => handleOpenDetails(teacher.id)}
                    >
                      More
                    </Button>
                    <Button
                      variant={teacher.isActive ? "outline" : "default"}
                      size="sm"
                      className={`h-7 text-[11px] font-bold flex-1 ${
                        !teacher.isActive &&
                        "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                      onClick={() => handleStatusToggle(teacher.id)}
                      disabled={isStatusPending}
                    >
                      {teacher.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-7 text-[11px] font-bold bg-red-600 hover:bg-red-700 flex-1"
                      onClick={() => {
                        setDeleteTeacher(teacher);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Desktop layout - o'zgarishsiz */}
                <div className="hidden md:flex items-center gap-4">
                  {/* Profil qismi */}
                  <div className="flex items-center gap-4 w-[35%] min-w-[320px] shrink-0">
                    <Avatar className="h-14 w-14 rounded-full border-2 border-white shadow-sm">
                      <AvatarImage
                        src={teacher.imageUrl}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-lg">
                        {getInitials(teacher.fullName || teacher.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-base truncate">
                          {teacher.fullName || teacher.name}
                        </h3>
                        <Badge
                          className={`text-[9px] px-2 py-0 rounded-full border-none font-bold uppercase shadow-none ${
                            teacher.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {teacher.isActive ? "Active" : "Pending"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                        <span className="text-blue-600">
                          {teacher.specification || "Yo'nalish yo'q"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-orange-500" />
                          {teacher.level || 0} level
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Kontakt qismi */}
                  <div className="flex flex-col justify-center gap-1.5 w-50 px-6 border-l border-gray-100 shrink-0">
                    <div
                      className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(teacher.email);
                        toast.success("Email nusxalandi!");
                      }}
                    >
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate">{teacher.email}</span>
                    </div>
                    <div
                      className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(teacher.phoneNumber);
                        toast.success("Tel nusxalandi!");
                      }}
                    >
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{teacher.phoneNumber}</span>
                    </div>
                  </div>

                  {/* Reyting qismi */}
                  <div className="flex flex-col items-center justify-center w-20 shrink-0 border-l border-gray-100">
                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-base">
                      <Star className="w-4 h-4 fill-yellow-500" />
                      {Number(teacher.rating || 0).toFixed(1)}
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium uppercase">
                      Rating
                    </span>
                  </div>

                  {/* Action tugmalari */}
                  <div className="flex items-center justify-end gap-5 flex-1 border-l border-gray-100 pl-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-[11px] font-bold"
                      onClick={() => handleOpenDetails(teacher.id)}
                    >
                      More
                    </Button>
                    <Button
                      variant={teacher.isActive ? "outline" : "default"}
                      size="sm"
                      className={`h-8 text-[11px] font-bold ${
                        !teacher.isActive &&
                        "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                      onClick={() => handleStatusToggle(teacher.id)}
                      disabled={isStatusPending}
                    >
                      {teacher.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8 text-[11px] font-bold bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        setDeleteTeacher(teacher);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </>
    )}

    {/* Modallar - o'zgarishsiz */}
    {selectedTeacherId && (
      <TeacherDetailsModal
        id={selectedTeacherId as string}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    )}
    <TeacherEditModal
      teacher={editTeacher}
      open={isEditModalOpen}
      onOpenChange={setIsEditModalOpen}
    />
    <TeacherDeleteModal
      teacher={deleteTeacher}
      open={isDeleteModalOpen}
      onOpenChange={setIsDeleteModalOpen}
    />
  </div>
);
};
