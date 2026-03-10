import { Input } from "@/custom/input";
import { Button } from "@/custom/button";
import { ArrowLeft, Search, Trash2 } from "lucide-react";
import { CreateAdminModal } from "@/features/super-admin/admins/createAdmin-modal";
import { useSearchParams, useLocation } from "react-router-dom";
import { useDebounceCallback } from "usehooks-ts";

interface PageHeaderProps {
  label: string;
  path: string;
}

export const Header = ({ label }: PageHeaderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Agat URL-da ?view=deleted bo'lsa, demak biz arxivdamiz
  const isArchived = searchParams.get("view") === "deleted";

  // 2. Sahifa turini aniqlash (Path orqali)
  const currentPath = location.pathname;
  const isTeacherPage = currentPath.includes("teachers");
  const isAdminPage = currentPath.includes("admins");
  const pageType = currentPath.split("/").filter(Boolean).pop();

  const currentSearch = searchParams.get("search") || "";

  // 3. Search funksiyasi
  const handleSearch = useDebounceCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  }, 300);

  // 4. Tiriklar va Arxiv o'rtasida o'tish funksiyasi
  const toggleArchiveView = () => {
    const params = new URLSearchParams(searchParams);
    if (isArchived) {
      params.delete("view"); // Arxivdan chiqish
    } else {
      params.set("view", "deleted"); // Arxivga o'tish
    }
    setSearchParams(params);
  };

return (
  <div className="flex flex-col lg:flex-row items-start lg:items-center px-4 sm:px-6 py-4 bg-background w-full gap-4 lg:gap-10 hover:bg-[#20B2AA]/5 transition-all border-b border-slate-100">
    {/* 1. Sarlavha - Mobil uchun o'lchamlari kichraytirildi */}
    <div className="flex-none w-full lg:w-auto">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight whitespace-nowrap text-slate-900">
        {isArchived ? "O'chirilgan Teacherlar" : label}
      </h1>
      {pageType === "students" && (
        <p className="text-[12px] sm:text-[14px] text-chart-3 font-medium opacity-80">
          Manage student accounts and permissions
        </p>
      )}
    </div>

    {/* 2. Qidiruv paneli - Mobil qurilmalarda to'liq kenglikda */}
    <div className="grow w-full items-center">
      {(isAdminPage || isTeacherPage) && (
        <div className="relative w-full group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#20B2AA] transition-colors"
            size={18}
          />
          <Input
            key={pageType}
            defaultValue={currentSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-card pl-10 w-full h-11 rounded-xl border-slate-200 focus-visible:ring-[#20B2AA] focus:border-[#20B2AA] shadow-sm transition-all text-sm sm:text-base"
            placeholder={
              isTeacherPage ? "O'qituvchi qidirish..." : "Admin qidirish..."
            }
          />
        </div>
      )}
    </div>

    {/* 3. Tugmalar - Mobil uchun alohida qator va scroll-safe */}
    <div className="flex-none flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
      {isAdminPage && (
        <div className="shrink-0 w-full lg:w-auto">
          <CreateAdminModal />
        </div>
      )}

      {isTeacherPage && (
        <Button
          variant={isArchived ? "default" : "outline"}
          onClick={toggleArchiveView}
          className={`flex-1 lg:flex-none gap-2 h-11 rounded-xl transition-all active:scale-95 text-xs sm:text-sm font-bold shadow-sm ${
            isArchived
              ? "bg-black text-white hover:bg-gray-800"
              : "border-[#20B2AA] text-[#20B2AA] hover:bg-[#20B2AA] hover:text-white"
          }`}
        >
          {isArchived ? (
            <>
              <ArrowLeft size={18} className="shrink-0" />
              <span className="truncate">Ro'yxatga qaytish</span>
            </>
          ) : (
            <>
              <Trash2 size={18} className="shrink-0" />
              <span className="truncate">O'chirilganlar</span>
            </>
          )}
        </Button>
      )}
    </div>
  </div>
);
};