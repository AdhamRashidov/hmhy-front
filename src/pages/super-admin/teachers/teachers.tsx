import { useState } from "react";
import {
  useTeacherList,
  useChangeTeacherStatus,
} from "@/features/super-admin/teachers/useTeacherActions";
import { Mail, Phone, Star, Award, ArrowUpDown, ArrowDown } from "lucide-react";
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

  /**
   * FOCUS: URL-dan holatni o'qish.
   * Agar Header orqali ?view=deleted bo'lsa, Arxiv sahifasi ochiladi.
   */
  const isArchived = searchParams.get("view") === "deleted";
  const searchQuery = searchParams.get("search") || "";

  // React Query: Faqat "tiriklar" ro'yxati uchun
  const { data, isPending } = useTeacherList(searchQuery);

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

  // Frontend filter (Backend qidiruvi bilan parallel ishlaydi)
  const filteredTeachers = teachers.filter((t) =>
    (t.fullName || t.name || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* FOCUS: Header bu yerda yo'q, u MainLayout ichida turibdi. 
         Header URL-dagi 'view' va 'search' parametrlarini boshqaradi.
      */}

      {isArchived ? (
        // Qabriston (Arxiv) sahifasi
        <DeletedTeachersPage />
      ) : isPending ? (
        // Yuklanish holati (Skeleton)
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
          {/* Filtrlar va Sortlash qismi */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-20 h-8 bg-gray-50/50">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-8 text-[13px] font-medium text-gray-700 px-2 py-2 pt-4">
            <span className="text-gray-400">Sort by:</span>
            <div className="flex items-center gap-2 cursor-default min-w-20">
              Name <ArrowDown className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2 cursor-default min-w-20">
              Email <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2 cursor-default min-w-20">
              Rating <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2 cursor-default min-w-20">
              Price <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2 cursor-default min-w-20">
              Lessons <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2 cursor-default min-w-20">
              Created Date <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Asosiy Teacherlar Ro'yxati */}
          <div className="space-y-4">
            {filteredTeachers.length === 0 ? (
              <Card className="p-12 text-center text-gray-500">
                No teachers found
              </Card>
            ) : (
              filteredTeachers.map((teacher) => (
                <Card
                  key={teacher.id}
                  className="pl-4 pr-12 py-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 w-[35%] min-w-[320px] shrink-0">
                      <Avatar className="h-14 w-14 rounded-full border border-gray-100">
                        <AvatarImage
                          src={teacher.imageUrl}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gray-50 text-gray-500 font-bold">
                          {getInitials(teacher.fullName || teacher.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1 overflow-hidden">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 text-lg truncate">
                            {teacher.fullName || teacher.name}
                          </h3>
                          <Badge
                            className={`text-[10px] px-2 py-0.5 rounded-full border-none font-bold uppercase ${
                              teacher.isActive
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : "bg-gray-100 text-red-500 hover:bg-gray-100"
                            }`}
                          >
                            {teacher.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="text-blue-600 font-medium">
                            🌐 {teacher.specification || "❌"}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Award className="w-4 h-4 text-orange-500" />{" "}
                            {teacher.level || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-1.5 w-[30%] px-6 border-l border-gray-100 shrink-0">
                      <div
                        className="flex items-center gap-3 text-sm text-gray-600 font-medium truncate cursor-pointer hover:text-blue-600"
                        onClick={() => {
                          navigator.clipboard.writeText(teacher.email);
                          toast.success("Email copied!");
                        }}
                      >
                        <Mail className="w-4 h-4 text-gray-400 shrink-0" />{" "}
                        <span className="truncate">{teacher.email}</span>
                      </div>
                      <div
                        className="flex items-center gap-3 text-sm text-gray-600 font-medium cursor-pointer hover:text-blue-600"
                        onClick={() => {
                          navigator.clipboard.writeText(teacher.phoneNumber);
                          toast.success("Phone number copied!");
                        }}
                      >
                        <Phone className="w-4 h-4 text-gray-400 shrink-0" />{" "}
                        <span>{teacher.phoneNumber}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center w-[10%] shrink-0">
                      <div className="flex items-center gap-1 text-yellow-500 font-bold">
                        <Star className="w-5 h-5 fill-yellow-500" />{" "}
                        {Number(teacher.rating).toFixed(1)}
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium uppercase">
                        Rating
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-2 flex-1 border-l border-gray-100">
                      <Button
                        variant="outline"
                        className="h-9 px-4 text-xs font-semibold"
                        onClick={() => handleOpenDetails(teacher.id)}
                      >
                        More
                      </Button>
                      <Button
                        variant={teacher.isActive ? "outline" : "default"}
                        className={`h-9 px-4 text-xs font-semibold ${
                          !teacher.isActive && "bg-black text-white"
                        }`}
                        onClick={() => handleStatusToggle(teacher.id)}
                        disabled={isStatusPending}
                      >
                        {teacher.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="outline"
                        className="h-9 px-4 text-xs font-semibold"
                        onClick={() => handleEditClick(teacher)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="h-9 px-4 text-xs font-semibold bg-red-600 hover:bg-red-700"
                        onClick={() => handleDeleteClick(teacher)}
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

      {/* Umumiy Modallar */}
      {selectedTeacherId && (
        <TeacherDetailsModal
          id={selectedTeacherId}
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