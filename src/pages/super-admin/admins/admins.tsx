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
import {
  Trash2,
  Info,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AdminDetailsContent } from "./admin-detail";
import { EditAdminModal } from "@/features/super-admin/admins/editAdmin-modal";
import { CopyButton } from "@/utils/copyButton";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

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
    startIndex + itemsPerPage,
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
    <div className="p-4 md:p-6 space-y-6 max-w-400 mx-auto">
      {/* HEADER & SORT - Responsive grid */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#20B2AA]/10 rounded-lg">
            <SlidersHorizontal size={20} className="text-[#20B2AA]" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Adminlar boshqaruvi
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
            Saralash:
          </span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-50 border-[#20B2AA]/30 focus:ring-[#20B2AA] rounded-lg h-10">
              <SelectValue placeholder="Saralash" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
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
      </div>

      {/* JADVAL QISMI */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden">
          <Table>
            <TableHeader className="bg-gray-50/80">
              <TableRow>
                {/* No - faqat desktop */}
                <TableHead className="hidden md:table-cell w-15 text-center font-bold text-[#20B2AA]">
                  No
                </TableHead>

                <TableHead className="font-bold text-[#20B2AA]">
                  Foydalanuvchi
                </TableHead>

                {/* Aloqa - faqat desktop */}
                <TableHead className="hidden md:table-cell font-bold text-[#20B2AA]">
                  Aloqa
                </TableHead>

                <TableHead className="text-center font-bold text-[#20B2AA]">
                  Rol
                </TableHead>

                <TableHead className="text-right font-bold text-[#20B2AA] pr-6">
                  Amallar
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedAdmins.length > 0 ? (
                paginatedAdmins.map((admin, index) => (
                  <TableRow
                    key={admin.id}
                    className="group hover:bg-[#20B2AA]/5 transition-colors"
                  >
                    {/* No - faqat desktop */}
                    <TableCell className="hidden md:table-cell text-center font-medium text-gray-500">
                      {startIndex + index + 1}
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">
                          {admin.username}
                        </span>
                      </div>
                    </TableCell>

                    {/* Aloqa cell - faqat desktop */}
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-600">
                          {admin.phoneNumber}
                        </span>
                        <CopyButton text={admin.phoneNumber} />
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge
                        variant="secondary"
                        className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold shadow-sm border ${
                          admin.role === "SUPERADMIN"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        {admin.role}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right pr-4">
                      {/* Desktop: oddiy buttonlar */}
                      <div className="hidden md:flex justify-end items-center gap-1">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                            >
                              <Info size={18} />
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="sm:max-w-md">
                            <SheetHeader className="border-b pb-4 mb-4">
                              <SheetTitle className="text-[#20B2AA] text-2xl font-bold flex items-center gap-2">
                                Admin Profili
                              </SheetTitle>
                              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg mt-2">
                                <span className="text-[10px] text-gray-400 font-mono truncate">
                                  ID: {admin.id}
                                </span>
                                <CopyButton text={admin.id} />
                              </div>
                            </SheetHeader>
                            <AdminDetailsContent adminId={admin.id} />
                          </SheetContent>
                        </Sheet>

                        <EditAdminModal admin={admin} />

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:bg-red-50"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-2xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-xl font-bold text-gray-800">
                                O'chirishni tasdiqlaysizmi?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-500">
                                <span className="font-bold text-red-600 italic">
                                  "{admin.username}"
                                </span>{" "}
                                o'chirilgach, uning tizimga kirish huquqi
                                butunlay yo'qoladi.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="gap-3 mt-4">
                              <AlertDialogCancel className="rounded-xl border-gray-200">
                                Bekor qilish
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700 rounded-xl px-6"
                                onClick={() => deleteMutation.mutate(admin.id)}
                              >
                                {deleteMutation.isPending
                                  ? "O'chirilmoqda..."
                                  : "Tasdiqlayman"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      {/* Mobile: dropdown menu */}
                      <div className="flex md:hidden justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-500 hover:bg-gray-100"
                            >
                              <MoreVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-fit rounded-xl shadow-lg p-1"
                          >
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                                >
                                  <Info size={18} />
                                </Button>
                              </SheetTrigger>
                              <SheetContent className="sm:max-w-md">
                                <SheetHeader className="border-b pb-4 mb-4">
                                  <SheetTitle className="text-[#20B2AA] text-2xl font-bold flex items-center gap-2">
                                    Admin Profili
                                  </SheetTitle>
                                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg mt-2">
                                    <span className="text-[10px] text-gray-400 font-mono truncate">
                                      ID: {admin.id}
                                    </span>
                                    <CopyButton text={admin.id} />
                                  </div>
                                </SheetHeader>
                                <AdminDetailsContent adminId={admin.id} />
                              </SheetContent>
                            </Sheet>

                            <EditAdminModal admin={admin} />

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 size={18} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="rounded-2xl">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-xl font-bold text-gray-800">
                                    O'chirishni tasdiqlaysizmi?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-500">
                                    <span className="font-bold text-red-600 italic">
                                      "{admin.username}"
                                    </span>{" "}
                                    o'chirilgach, uning tizimga kirish huquqi
                                    butunlay yo'qoladi.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="gap-3 mt-4">
                                  <AlertDialogCancel className="rounded-xl border-gray-200">
                                    Bekor qilish
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-red-600 hover:bg-red-700 rounded-xl px-6"
                                    onClick={() =>
                                      deleteMutation.mutate(admin.id)
                                    }
                                  >
                                    {deleteMutation.isPending
                                      ? "O'chirilmoqda..."
                                      : "Tasdiqlayman"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                      <div className="p-3 bg-gray-50 rounded-full italic">
                        Ma'lumot topilmadi
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* PAGINATSIYA - Responsive layout */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 px-3 py-4 bg-gray-50/50 rounded-xl border border-dashed mt-6">
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 order-2 lg:order-1 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-gray-100">
            <span className="text-[12px] sm:text-sm text-gray-500 font-medium tracking-tight">
              Qatorda:
            </span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(val) => setItemsPerPage(Number(val))}
            >
              <SelectTrigger className="w-19 h-8 sm:h-9 rounded-md border-gray-200 focus:ring-[#20B2AA]">
                <SelectValue className="text-xs sm:text-sm" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50, 100].map((v) => (
                  <SelectItem
                    key={v}
                    value={v.toString()}
                    className="text-xs sm:text-sm"
                  >
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-[12px] sm:text-sm font-bold text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm whitespace-nowrap">
            Jami: <span className="text-[#20B2AA]">{sortedAdmins.length}</span>{" "}
            <span className="hidden xs:inline">tadan</span>
            <span className="ml-1 text-gray-400 italic font-normal text-[11px] sm:text-[13px]">
              ({startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, sortedAdmins.length)})
            </span>
          </p>
        </div>

        {/* 2. Tugmalar qismi - Mobil qurilmalarda tepada turadi (order-1) */}
        <div className="flex items-center justify-center gap-1 order-1 lg:order-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg h-8 w-8 sm:h-9 sm:w-9 border-gray-200 shrink-0 active:scale-90 transition-transform"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} className="sm:w-4.5 sm:h-4.5" />
          </Button>

          <div className="flex items-center gap-1 mx-1 sm:mx-2">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "ghost"}
                size="sm"
                className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg font-black text-[12px] sm:text-sm shrink-0 transition-all ${
                  currentPage === i + 1
                    ? "bg-[#20B2AA] text-white hover:bg-[#1a8e88] shadow-md shadow-emerald-100 scale-105"
                    : "text-gray-500 hover:bg-[#20B2AA]/10"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-lg h-8 w-8 sm:h-9 sm:w-9 border-gray-200 shrink-0 active:scale-90 transition-transform"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight size={16} className="sm:w-4.5 sm:h-4.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
