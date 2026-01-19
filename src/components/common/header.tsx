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
    <div className="flex items-center px-6 py-4 bg-background w-full gap-10 hover:bg-[#20B2AA]/5 transition-all">
      {/* 1. Sarlavha */}
      <div className="flex-none">
        <h1 className="text-3xl font-bold font-stretch-110% tracking-tight whitespace-nowrap">
          {isArchived ? "O'chirilgan Teacherlar" : label}
        </h1>
        {pageType === "students" && (
          <p className="text-[14px] text-chart-3">
            Manage student accounts and permissions
          </p>
        )}
      </div>

      {/* 2. Qidiruv paneli */}
      <div className="grow items-center">
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
              className="bg-card pl-10 w-full focus-visible:ring-[#20B2AA] shadow-sm"
              placeholder={
                isTeacherPage
                  ? "O'qituvchi ismi yoki mutaxassisligi bo'yicha qidirish..."
                  : "Admin username yoki telfon raqami bo'yicha qidirish..."
              }
            />
          </div>
        )}
      </div>

      {/* 3. Tugmalar */}
      <div className="flex-none flex items-center gap-3">
        {isAdminPage && <CreateAdminModal />}

        {isTeacherPage && (
          <Button
            variant={isArchived ? "default" : "outline"}
            onClick={toggleArchiveView}
            className={`gap-2 transition-all active:scale-95 ${
              isArchived
                ? "bg-black text-white hover:bg-gray-800"
                : "border-[#20B2AA] text-[#20B2AA] hover:bg-[#20B2AA] hover:text-white"
            }`}
          >
            {isArchived ? (
              <>
                <ArrowLeft size={18} /> Ro'yxatga qaytish
              </>
            ) : (
              <>
                <Trash2 size={18} /> O'chirilgan Teacherlar
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};