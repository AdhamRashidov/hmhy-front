import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, AlertCircle, Filter, Search } from "lucide-react";
import {
  LessonStatus,
  type Lesson,
  type LessonFilters,
} from "@/features/super-admin/lessons/types/types";
import { LessonCard } from "@/features/super-admin/lessons/lessonCard";
import { useTeacher } from "@/features/super-admin/teachers/useTeacherActions";
import { useTeacherLessons } from "@/features/super-admin/teachers/useTeacherActions";

export const TeacherLessonsPage = () => {
  const { id } = useParams();
  if (!id) return null;
  const teacherId = id;
  const navigate = useNavigate();
  console.log(teacherId);

  const [lessonFilters, setLessonFilters] = useState<LessonFilters>({
    status: "",
    sortBy: "startTime",
    sortOrder: "DESC",
    page: 1,
    limit: 20,
  });

  const cleanFilters = {
    ...lessonFilters,
    status: lessonFilters.status || undefined,
  };

  const [searchQuery, setSearchQuery] = useState("");

  const { data: teacherData, isLoading: teacherLoading } =
    useTeacher(teacherId);
  console.log(teacherData);

  const {
    data: lessonsData,
    isLoading: lessonsLoading,
    error: lessonsError,
  } = useTeacherLessons(teacherId, cleanFilters);
  console.log(lessonsData);

  const teacher = teacherData?.data?.teacher;
  const lessons = lessonsData?.data || [];

  const pagination = lessonsData
    ? {
        currentPage: lessonsData.currentPage,
        totalPages: lessonsData.totalPages,
        totalElements: lessonsData.totalElements,
        pageSize: lessonsData.pageSize,
        from: lessonsData.from,
        to: lessonsData.to,
      }
    : null;

  console.log(lessons);
  console.log(pagination);

  const handleStatusFilter = (status: LessonStatus | "") => {
    setLessonFilters((prev: LessonFilters) => ({ ...prev, status, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setLessonFilters((prev: LessonFilters) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStatusColor = (status: LessonStatus | ""): string => {
    const colors: Record<LessonStatus | "", string> = {
      "": "bg-gray-500",
      [LessonStatus.AVAILABLE]: "bg-blue-500",
      [LessonStatus.BOOKED]: "bg-yellow-500",
      [LessonStatus.COMPLETED]: "bg-green-500",
      [LessonStatus.CANCELLED]: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const getStatusLabel = (status: LessonStatus | ""): string => {
    if (!status) return "All";
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  const filteredLessons = lessons.filter(
    (lesson: Lesson) =>
      lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.student?.firstName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      lesson.student?.lastName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  //   if (teacherLoading) {
  //     return (
  //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //         <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="min-h-screen bg-gray-50 p-6">
  //       <div className="max-w-7xl mx-auto">
  //         <button
  //           onClick={() => navigate(-1)}
  //           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
  //         >
  //           <ArrowLeft className="w-5 h-5" />
  //           <span className="font-medium">Back to Teachers</span>
  //         </button>

  //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
  //           <div className="flex items-center justify-between">
  //             <div>
  //               <h1 className="text-3xl font-bold text-gray-900 mb-2">
  //                 {teacher?.fullName || "Teacher"}'s Lessons
  //               </h1>
  //               <p className="text-gray-600">
  //                 Manage and view all lessons for this teacher
  //               </p>
  //             </div>
  //             {teacher && (
  //               <div className="text-right">
  //                 <div className="flex items-center gap-2 mb-2">
  //                   <span className="text-sm text-gray-600">Level:</span>
  //                   <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
  //                     {teacher.level || "N/A"}
  //                   </span>
  //                 </div>
  //                 {teacher.hourPrice && (
  //                   <p className="text-lg font-semibold text-gray-900">
  //                     {new Intl.NumberFormat("uz-UZ").format(teacher.hourPrice)}{" "}
  //                     so'm/h
  //                   </p>
  //                 )}
  //               </div>
  //             )}
  //           </div>
  //         </div>

  //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
  //           <div className="flex items-center gap-2 mb-4">
  //             <Filter className="w-5 h-5 text-gray-600" />
  //             <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
  //           </div>

  //           <div className="flex flex-col md:flex-row gap-4">
  //             <div className="relative flex-1">
  //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
  //               <input
  //                 type="text"
  //                 placeholder="Search by lesson name or student..."
  //                 value={searchQuery}
  //                 onChange={(e) => setSearchQuery(e.target.value)}
  //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
  //               />
  //             </div>

  //             <div className="flex flex-wrap gap-2">
  //               {[
  //                 "",
  //                 LessonStatus.AVAILABLE,
  //                 LessonStatus.BOOKED,
  //                 LessonStatus.COMPLETED,
  //                 LessonStatus.CANCELLED,
  //               ].map((status) => (
  //                 <button
  //                   key={status}
  //                   onClick={() =>
  //                     handleStatusFilter(status as LessonStatus | "")
  //                   }
  //                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
  //                     lessonFilters.status === status
  //                       ? "bg-blue-500 text-white"
  //                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  //                   }`}
  //                 >
  //                   <span
  //                     className={`w-2 h-2 rounded-full ${getStatusColor(
  //                       status as LessonStatus | ""
  //                     )}`}
  //                   ></span>
  //                   {getStatusLabel(status as LessonStatus | "")}
  //                 </button>
  //               ))}
  //             </div>
  //           </div>
  //         </div>

  //         {lessonsLoading && (
  //           <div className="flex items-center justify-center py-12">
  //             <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
  //           </div>
  //         )}

  //         {lessonsError && (
  //           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
  //             <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
  //             <div>
  //               <h3 className="text-red-800 font-semibold">Error</h3>
  //               <p className="text-red-700 text-sm">{lessonsError.message}</p>
  //             </div>
  //           </div>
  //         )}

  //         {!lessonsLoading && !lessonsError && filteredLessons.length > 0 && (
  //           <>
  //             <div className="mb-4 flex items-center justify-between">
  //               <span className="text-sm text-gray-600">
  //                 Showing {filteredLessons.length} of{" "}
  //                 {pagination?.totalElements || 1} lessons
  //               </span>
  //               {pagination && pagination.totalPages > 1 && (
  //                 <span className="text-sm text-gray-600">
  //                   Page {pagination.currentPage} of {pagination.totalPages}
  //                 </span>
  //               )}
  //             </div>

  //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
  //               {filteredLessons.map((lesson: Lesson) => (
  //                 <LessonCard key={lesson.id} lesson={lesson} />
  //               ))}
  //             </div>

  //             {pagination && pagination.totalPages > 1 && (
  //               <div className="flex justify-center gap-2">
  //                 <button
  //                   onClick={() => handlePageChange(pagination.currentPage - 1)}
  //                   disabled={pagination.currentPage === 1}
  //                   className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  //                 >
  //                   Previous
  //                 </button>
  //                 {Array.from(
  //                   { length: Math.min(5, pagination.totalPages) },
  //                   (_, i) => {
  //                     const page = i + 1;
  //                     return (
  //                       <button
  //                         key={page}
  //                         onClick={() => handlePageChange(page)}
  //                         className={`px-4 py-2 border rounded-lg transition-all ${
  //                           page === pagination.currentPage
  //                             ? "bg-blue-500 text-white border-blue-500"
  //                             : "border-gray-300 hover:bg-gray-50"
  //                         }`}
  //                       >
  //                         {page}
  //                       </button>
  //                     );
  //                   }
  //                 )}
  //                 <button
  //                   onClick={() => handlePageChange(pagination.currentPage + 1)}
  //                   disabled={pagination.currentPage === pagination.totalPages}
  //                   className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  //                 >
  //                   Next
  //                 </button>
  //               </div>
  //             )}
  //           </>
  //         )}

  //         {!lessonsLoading && !lessonsError && filteredLessons.length === 0 && (
  //           <div className="text-center py-12 bg-white rounded-lg">
  //             <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
  //             <h3 className="text-xl font-semibold text-gray-900 mb-2">
  //               No lessons found
  //             </h3>
  //             <p className="text-gray-600">
  //               {searchQuery || lessonFilters.status
  //                 ? "Try adjusting your filters or search query"
  //                 : "This teacher has no lessons yet"}
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  if (teacherLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-3 border-slate-200 border-t-[#20B2AA] rounded-full animate-spin mb-3"></div>
          <p className="text-slate-600 text-sm">Loading teacher...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-[#20B2AA] mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Teachers</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {teacher?.fullName || "Teacher"}'s Lessons
              </h1>
              <p className="text-slate-600">
                Manage and view all lessons for this teacher
              </p>
            </div>
            {teacher && (
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-slate-600">Level:</span>
                  <span className="px-3 py-1.5 bg-linear-to-r from-[#20B2AA]/10 to-teal-100/50 text-[#20B2AA] text-sm font-semibold rounded-lg border border-[#20B2AA]/20">
                    {teacher.level || "N/A"}
                  </span>
                </div>
                {teacher.hourPrice && (
                  <div>
                    <div className="text-lg font-bold text-[#20B2AA]">
                      {new Intl.NumberFormat("uz-UZ").format(teacher.hourPrice)}
                    </div>
                    <div className="text-xs text-slate-500">so'm/h</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-5">
            <Filter className="w-5 h-5 text-[#20B2AA]" />
            <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by lesson name or student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA]/30 focus:border-[#20B2AA] outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "",
                LessonStatus.AVAILABLE,
                LessonStatus.BOOKED,
                LessonStatus.COMPLETED,
                LessonStatus.CANCELLED,
              ].map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    handleStatusFilter(status as LessonStatus | "")
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    lessonFilters.status === status
                      ? "bg-[#20B2AA] text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${getStatusColor(
                      status as LessonStatus | ""
                    )}`}
                  ></span>
                  {getStatusLabel(status as LessonStatus | "")}
                </button>
              ))}
            </div>
          </div>
        </div>

        {lessonsLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="inline-block w-12 h-12 border-3 border-slate-200 border-t-[#20B2AA] rounded-full animate-spin mb-3"></div>
            <p className="text-slate-600 text-sm">Loading lessons...</p>
          </div>
        )}

        {lessonsError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-semibold">Error</h3>
              <p className="text-red-700 text-sm">{lessonsError.message}</p>
            </div>
          </div>
        )}

        {!lessonsLoading && !lessonsError && filteredLessons.length > 0 && (
          <>
            <div className="mb-4 px-1 flex items-center justify-between text-sm text-slate-600">
              <span>
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {filteredLessons.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-900">
                  {pagination?.totalElements || 1}
                </span>{" "}
                lessons
              </span>
              {pagination && pagination.totalPages > 1 && (
                <span>
                  Page{" "}
                  <span className="font-semibold text-slate-900">
                    {pagination.currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-900">
                    {pagination.totalPages}
                  </span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {filteredLessons.map((lesson: Lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:hover:bg-slate-100"
                >
                  Previous
                </button>
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          page === pagination.currentPage
                            ? "bg-[#20B2AA] text-white shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                )}
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:hover:bg-slate-100"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {!lessonsLoading && !lessonsError && filteredLessons.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <div className="w-20 h-20 bg-linear-to-br from-[#20B2AA]/10 to-teal-100/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#20B2AA]/20">
              <Calendar className="w-10 h-10 text-[#20B2AA]/60" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No lessons found
            </h3>
            <p className="text-slate-600">
              {searchQuery || lessonFilters.status
                ? "Try adjusting your filters or search query"
                : "This teacher has no lessons yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
