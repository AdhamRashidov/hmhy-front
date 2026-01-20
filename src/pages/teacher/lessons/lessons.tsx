import { useState } from "react";
import { BookOpen, CalendarDays, Layers, Filter } from "lucide-react";
import { useLessonsList } from "@/features/teachers/teacher-base.service";
import { StatsCard } from "@/features/teachers/lessons/statsCard";

import { LessonsSkeleton } from "@/features/teachers/lessons/lesson-skeleton";
import { useLessonsStats } from "@/features/teachers/teacher-base.service";
import { LessonCard } from "@/features/super-admin/lessons/lessonCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TLessons = () => {
  const [filter, setFilter] = useState("all");

  const { data: lessonsData, isPending: lessonsPending } =
    useLessonsList(filter);
  const { data: statsData, isPending: statsPending } = useLessonsStats();

  if (lessonsPending || statsPending) return <LessonsSkeleton />;
  console.log(statsData);

  const stats = statsData?.data ||
    statsData || {
      totalLessons: 0,
      bookedLessons: 0,
      totalPages: 0,
      currentPage: 1,
    };

  const lessons = lessonsData?.data || [];

//   return (
//     <div className="min-h-screen p-4 space-y-6 md:p-8">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
//             <BookOpen className="w-6 h-6" /> Mening Darslarim
//           </h1>
//           <p className="text-sm text-slate-500">
//             O'quvchilar tomonidan band qilingan darslar ro'yxati
//           </p>
//         </div>

//         <div className="flex items-center gap-2 text-black">
//           <Filter className="w-4 h-4 text-slate-400" />
//           <Select value={filter} onValueChange={setFilter}>
//             <SelectTrigger className="w-35 bg-white">
//               <SelectValue placeholder="Saralash" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Barchasi</SelectItem>
//               <SelectItem value="booked">Band</SelectItem>
//               <SelectItem value="available">Bo'sh</SelectItem>
//               <SelectItem value="completed">Tugagan</SelectItem>
//               <SelectItem value="canceled">Bekor qilingan</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-3">
//         <StatsCard
//           label="Jami Darslar"
//           value={stats.totalLessons}
//           icon={BookOpen}
//           labelColor="text-blue-600"
//           iconColor="bg-blue-50 text-blue-600"
//         />
//         <StatsCard
//           label="Band Darslar"
//           value={stats.bookedLessons}
//           icon={CalendarDays}
//           labelColor="text-green-600"
//           iconColor="bg-green-50 text-green-600"
//         />
//         <StatsCard
//           label="Sahifa"
//           value={`${stats.currentPage || 1} / ${stats.totalPages || 0}`}
//           icon={Layers}
//           labelColor="text-purple-600"
//           iconColor="bg-purple-50 text-purple-600"
//         />
//       </div>

//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-slate-900">
//             Darslar jadvali
//           </h2>
//           <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border">
//             Jami: {lessons.length} ta dars
//           </span>
//         </div>

//         {lessons.length > 0 ? (
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {lessons.map((lesson: any) => (
//               <LessonCard key={lesson.id} lesson={lesson} />
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center min-h-75 bg-white border border-dashed rounded-xl">
//             <div className="p-4 mb-4 rounded-full bg-slate-50">
//               <BookOpen className="w-12 h-12 text-slate-300" />
//             </div>
//             <h3 className="text-lg font-semibold text-slate-900">
//               Darslar topilmadi
//             </h3>
//           </div>
//         )}
//       </div>
//     </div>
//   );
	
return (
  <div className="min-h-screen p-6 space-y-8 md:p-10 bg-[#F8FAFC]">
    {/* Header qismi */}
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-[#20B2AA]/10">
            <BookOpen className="w-6 h-6 text-[#20B2AA]" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Mening Darslarim
          </h1>
        </div>
        <p className="text-slate-500 font-medium ml-1">
          O'quvchilar tomonidan band qilingan darslar va jadvallarni boshqarish
        </p>
      </div>

      <div className="flex items-center gap-3 group">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm group-hover:border-[#20B2AA]/30 transition-all">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-600">Holat:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32 border-none bg-transparent focus:ring-0 h-auto p-0 text-slate-900 font-bold">
              <SelectValue placeholder="Saralash" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 shadow-xl">
              <SelectItem
                value="all"
                className="focus:bg-[#20B2AA]/10 focus:text-[#20B2AA] font-medium"
              >
                Barchasi
              </SelectItem>
              <SelectItem
                value="booked"
                className="focus:bg-[#20B2AA]/10 focus:text-[#20B2AA] font-medium"
              >
                Band
              </SelectItem>
              <SelectItem
                value="available"
                className="focus:bg-[#20B2AA]/10 focus:text-[#20B2AA] font-medium"
              >
                Bo'sh
              </SelectItem>
              <SelectItem
                value="completed"
                className="focus:bg-[#20B2AA]/10 focus:text-[#20B2AA] font-medium"
              >
                Tugagan
              </SelectItem>
              <SelectItem
                value="canceled"
                className="focus:bg-[#20B2AA]/10 focus:text-[#20B2AA] font-medium"
              >
                Bekor qilingan
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    {/* Statistika kartochkalari */}
    <div className="grid gap-6 md:grid-cols-3">
      <StatsCard
        label="Jami Darslar"
        value={stats.totalLessons}
        icon={BookOpen}
        labelColor="text-slate-600"
        iconColor="bg-teal-50 text-[#20B2AA] ring-4 ring-teal-50/50"
      />
      <StatsCard
        label="Band Darslar"
        value={stats.bookedLessons}
        icon={CalendarDays}
        labelColor="text-slate-600"
        iconColor="bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50/50"
      />
      <StatsCard
        label="Sahifa"
        value={`${stats.currentPage || 1} / ${stats.totalPages || 0}`}
        icon={Layers}
        labelColor="text-slate-600"
        iconColor="bg-sky-50 text-sky-600 ring-4 ring-sky-50/50"
      />
    </div>

    {/* Darslar ro'yxati */}
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-[#20B2AA] rounded-full" />
          <h2 className="text-xl font-bold text-slate-800">Darslar jadvali</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            Jami: {lessons.length} ta dars
          </span>
        </div>
      </div>

      {lessons.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in duration-700">
          {lessons.map((lesson: any) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-100 bg-white border-2 border-dashed border-slate-200 rounded-3xl transition-colors hover:border-[#20B2AA]/30">
          <div className="p-6 mb-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner">
            <BookOpen className="w-16 h-16 text-slate-200" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Darslar topilmadi
          </h3>
          <p className="text-slate-500 mt-2 max-w-62.5 text-center">
            Hozircha hech qanday dars mavjud emas. Filtrlarni tekshirib ko'ring.
          </p>
        </div>
      )}
    </div>
  </div>
);
};
