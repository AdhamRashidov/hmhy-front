import { useState } from "react";
import { useTeacherList } from "@/features/super-admin/teachers/useTeacherActions";
import type {
  SortField,
  TeacherFilters,
} from "@/features/super-admin/teachers/types";
import TeacherCard from "@/features/super-admin/lessons/teacherCard";
import { Search, Users } from "lucide-react";

export const Lessons = () => {
  const [filters, setFilters] = useState<TeacherFilters>({
    search: "",
    level: "",
    minRating: undefined,
    maxRating: undefined,
    sortBy: "fullName",
    sortOrder: "ASC",
    page: 1,
    limit: 12,
  });

  const { data, isLoading } = useTeacherList(filters);
  console.log(data);

  const teachers = data?.data ?? [];
  const pagination = data;

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const handleSort = (sortBy: SortField) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortOrder === "ASC" ? "DESC" : "ASC",
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-6 h-6 text-[#20B2AA]" />
            <h1 className="text-2xl font-bold text-slate-900">Teachers</h1>
          </div>
          <p className="text-slate-600 text-sm">View and manage all teachers</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-slate-200">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by teacher name..."
                value={filters.search || ""}
                onChange={(e) => handleSearch(e.target.value)}
                className="border border-slate-300 focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] rounded-lg px-4 pl-10 py-2 w-full transition-all outline-none"
              />
            </div>

            <select
              className="border border-slate-300 focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] rounded-lg px-4 py-2 bg-white transition-all outline-none"
              value={filters.level || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  level: e.target.value,
                  page: 1,
                }))
              }
            >
              <option value="">All Levels</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
            </select>

            <select
              className="border border-slate-300 focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA] rounded-lg px-4 py-2 bg-white transition-all outline-none"
              value={filters.minRating ?? ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minRating: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                  page: 1,
                }))
              }
            >
              <option value="">All Ratings</option>
              <option value="4">4+ ⭐</option>
              <option value="3">3+ ⭐</option>
              <option value="2">2+ ⭐</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4 border-t border-slate-100">
            <button
              onClick={() => handleSort("fullName")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.sortBy === "fullName"
                  ? "bg-[#20B2AA] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Name{" "}
              {filters.sortBy === "fullName" &&
                (filters.sortOrder === "ASC" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSort("rating")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.sortBy === "rating"
                  ? "bg-[#20B2AA] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Rating{" "}
              {filters.sortBy === "rating" &&
                (filters.sortOrder === "ASC" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSort("createdAt")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.sortBy === "createdAt"
                  ? "bg-[#20B2AA] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Date{" "}
              {filters.sortBy === "createdAt" &&
                (filters.sortOrder === "ASC" ? "↑" : "↓")}
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 border-3 border-slate-200 border-t-[#20B2AA] rounded-full animate-spin"></div>
            <p className="mt-3 text-slate-600 text-sm">Loading...</p>
          </div>
        )}

        {!isLoading && teachers.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              {teachers.map((teacher: any) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:hover:bg-slate-100"
                >
                  Previous
                </button>

                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      page === pagination.currentPage
                        ? "bg-[#20B2AA] text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}

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

        {!isLoading && teachers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-dashed border-slate-300">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              No teachers found
            </h3>
            <p className="text-slate-600 text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};