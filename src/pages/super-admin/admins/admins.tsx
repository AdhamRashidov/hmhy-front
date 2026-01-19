import { useAdmins } from "@/features/super-admin/admins/useAdmins";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/custom/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Info, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AdminDetailsContent } from "./admin-detail";
import { EditAdminModal } from "@/features/super-admin/admins/editAdmin-modal";
import { CopyButton } from "@/utils/copyButton";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SORT_OPTIONS = {
  USERNAME: "username",
  CREATED_AT: "createdAt",
  UPDATED_AT: "updatedAt",
};

export const Admins = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState(SORT_OPTIONS.USERNAME);
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, itemsPerPage]);

  //  Ma'lumotlarni fetching qilish
  const { admins, isLoading, isError, deleteAdmin } = useAdmins();
  const deleteMutation = deleteAdmin();

  const sortedAdmins = useMemo(() => {
    if (!admins) return [];

    return [...admins].sort((a, b) => {
      if (sortBy === SORT_OPTIONS.USERNAME) {
        return (a.username ?? "").localeCompare(b.username ?? "");
      }

      if (sortBy === SORT_OPTIONS.CREATED_AT) {
        const timeA = new Date(a.createdAt || 0).getTime();
        const timeB = new Date(b.createdAt || 0).getTime();
        return timeB - timeA;
      }

      if (sortBy === SORT_OPTIONS.UPDATED_AT) {
        const timeA = new Date(a.updatedAt || 0).getTime();
        const timeB = new Date(b.updatedAt || 0).getTime();
        return timeB - timeA;
      }

      return 0;
    });
  }, [admins, sortBy]);

  const totalPages = Math.ceil(sortedAdmins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAdmins = sortedAdmins.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading)
    return (
      <div className="p-10 text-center text-[#20B2AA] font-bold">
        Yuklanmoqda...
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Ma'lumotlarni yuklashda xatolik yuz berdi!
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* SORT QISMI */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 text-[#555] font-medium font-stretch-105% rounded-[14px] bg-[#20B2AA]/20 border border-[#20B2AA]/30">
          <span>Sort by:</span>
          <SlidersHorizontal size={16} />
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-50 border-[#20B2AA]/30 focus:ring-[#20B2AA]">
            <SelectValue placeholder="Saralash" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Mezonlar</SelectLabel>
              <SelectItem value={SORT_OPTIONS.USERNAME}>
                Username (A-Z)
              </SelectItem>
              <SelectItem value={SORT_OPTIONS.CREATED_AT}>
                Yaratilgan vaqti
              </SelectItem>
              <SelectItem value={SORT_OPTIONS.UPDATED_AT}>
                Oxirgi tahrirlash
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50 hover:shadow-md">
            <TableRow>
              <TableHead className="text-center font-extrabold text-lg font-stretch-110% text-[#20B2AA]">
                No
              </TableHead>
              <TableHead className="text-center font-extrabold text-lg font-stretch-110% text-[#20B2AA]">
                Username
              </TableHead>
              <TableHead className="text-center font-extrabold text-lg font-stretch-110% text-[#20B2AA]">
                Telefon raqami
              </TableHead>
              <TableHead className="text-center font-extrabold text-lg font-stretch-110% text-[#20B2AA]">
                Rol
              </TableHead>
              <TableHead className="text-center font-extrabold text-lg font-stretch-110% text-[#20B2AA]">
                Amallar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-center font-bold">
            {paginatedAdmins.length > 0 ? (
              paginatedAdmins.map((admin, index) => {
                return (
                  <TableRow
                    key={admin.id}
                    className="hover:bg-gray-50/50 transition-colors hover:shadow-sm"
                  >
                    <TableCell className="text-[#20B2AA] font-bold">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-gray-900 font-bold">
                      {admin.username}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {admin.phoneNumber}
                      <CopyButton text={admin.phoneNumber} />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          admin.role === "SUPERADMIN"
                            ? "bg-purple-100 text-purple-700 border-purple-200 font-bold"
                            : "bg-blue-100 text-blue-700 border-blue-200 font-bold"
                        }
                      >
                        {admin.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="">
                      <div className="flex justify-center items-center gap-1">
                        {/* details */}
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              className="text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                            >
                              <Info size={16} />
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="sm:max-w-md">
                            {" "}
                            <SheetHeader>
                              <SheetTitle className="text-[#20B2AA] text-xl font-bold">
                                Admin Ma'lumotlari
                              </SheetTitle>
                              <div className="flex items-center">
                                <SheetDescription className="font-mono text-xs">
                                  ID: {admin.id}
                                </SheetDescription>
                                <CopyButton text={admin?.id} />
                              </div>
                            </SheetHeader>
                            <AdminDetailsContent adminId={admin.id} />
                          </SheetContent>
                        </Sheet>

                        {/* edite */}
                        <EditAdminModal admin={admin} />

                        {/* delete */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Haqiqatdan ham o'chirmoqchimisiz?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Admin "{admin.username}" tizimdan butunlay
                                o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                Bekor qilish
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => deleteMutation.mutate(admin.id)}
                              >
                                {deleteMutation.isPending
                                  ? "O'chirilmoqda..."
                                  : "O'chirish"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-32 text-center text-gray-400 italic"
                >
                  Qidiruv bo'yicha admin topilmadi...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginatsiya */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-gray-500">
          Jami {sortedAdmins.length} tadan {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, sortedAdmins.length)} tasi
          ko'rsatilmoqda
        </p>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500 whitespace-nowrap">
              Ko'rsatish:
            </p>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(val) => setItemsPerPage(Number(val))}
            >
              <SelectTrigger className="w-20 h-8 border-gray-200 focus:ring-[#20B2AA]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Oldingi
            </Button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  className={
                    currentPage === i + 1
                      ? "bg-[#20B2AA] hover:bg-[#1a8e88]"
                      : ""
                  }
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Keyingi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
