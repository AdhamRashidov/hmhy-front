import { useState } from "react";
import { Plus, Info } from "lucide-react";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import { Button } from "@/custom/button";
import { useLessonsList } from "@/features/teachers/teacher-base.service";
import { WeekCalendar } from "@/features/teachers/schedule/weekCalendar";
import { LessonCard } from "@/features/teachers/schedule/lesson-card";
import { LessonsSkeleton } from "@/features/teachers/schedule/lesson-skeleton";
import { CreateLessonForm } from "@/features/teachers/schedule/create-lessons";

export const TDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [isCreating, setIsCreating] = useState(false);

  const { data, isPending } = useLessonsList("all", selectedDate);
  const lessons = data?.data || [];

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setIsCreating(false);
  };

  return (
    <div className="p-6 py-3 min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 space-y-6">
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg shadow-[#004f98]/5">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-[#004f98] to-[#0066cc] bg-clip-text text-transparent">
            Mening Darslarim
          </h1>
          <p className="text-slate-600 text-sm mt-1.5">
            Dars jadvalingizni boshqaring
          </p>
        </div>
        {!isCreating && (
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-[#004f98] hover:bg-[#003d7a] text-white gap-2 h-11 px-6 rounded-xl font-medium shadow-lg shadow-[#004f98]/20 hover:shadow-xl hover:shadow-[#004f98]/30 transition-all"
          >
            <Plus className="w-4 h-4" /> Dars yaratish
          </Button>
        )}
      </div>

      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-lg shadow-[#004f98]/5">
        <WeekCalendar
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>

      {isCreating ? (
        <CreateLessonForm
          selectedDate={selectedDate}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <>
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-5 shadow-lg shadow-[#004f98]/5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold bg-linear-to-r from-[#004f98] to-[#0066cc] bg-clip-text text-transparent">
                  {format(new Date(selectedDate), "EEEE, d-MMMM, yyyy", {
                    locale: uz,
                  })}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {lessons.length > 0
                    ? `${lessons.length} ta dars rejalashtirilgan`
                    : "Darslar rejalashtirilmagan"}
                </p>
              </div>
            </div>
          </div>

          {isPending ? (
            <LessonsSkeleton />
          ) : lessons.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {lessons.map((lesson: any) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-75 bg-white/60 backdrop-blur-sm border-2 border-dashed border-[#004f98]/20 rounded-2xl p-12 text-center shadow-lg shadow-[#004f98]/5">
              <div className="w-20 h-20 bg-linear-to-br from-[#004f98]/10 to-blue-100/50 rounded-full flex items-center justify-center mb-5 border border-[#004f98]/20 shadow-inner">
                <Info className="w-9 h-9 text-[#004f98]/60" />
              </div>
              <h3 className="text-lg font-semibold text-[#004f98] mb-2">
                Ushbu kun uchun darslar mavjud emas
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Yangi dars qo'shib, jadvalingizni to'ldiring
              </p>
              <Button
                variant="outline"
                className="border-2 border-[#004f98] text-[#004f98] hover:bg-[#004f98] hover:text-white h-11 px-6 rounded-xl font-medium transition-all shadow-md shadow-[#004f98]/10 hover:shadow-lg hover:shadow-[#004f98]/20"
                onClick={() => setIsCreating(true)}
              >
                <Plus className="w-4 h-4 mr-2" /> Yangi dars qo'shish
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
