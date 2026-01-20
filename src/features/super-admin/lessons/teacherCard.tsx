import { Star, ChevronRight, User, Award } from "lucide-react";
import type { Teacher, TeacherSpecification } from "../teachers/types";
import { useNavigate } from "react-router-dom";

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  const navigate = useNavigate();

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string): string => {
    const colors = [
      "bg-gradient-to-br from-[#20B2AA] to-teal-600",
      "bg-gradient-to-br from-cyan-500 to-blue-500",
      "bg-gradient-to-br from-teal-500 to-emerald-500",
      "bg-gradient-to-br from-blue-500 to-indigo-500",
      "bg-gradient-to-br from-emerald-500 to-green-500",
      "bg-gradient-to-br from-indigo-500 to-purple-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("uz-UZ").format(price);
  };

  const getSpecificationLabel = (spec?: TeacherSpecification): string => {
    const labels: Partial<Record<TeacherSpecification, string>> = {
      ENGLISH: "ENGLISH",
      RUSSIAN: "RUSSIAN",
      DEUTSCH: "DEUTSCH",
      SPANISH: "SPANISH",
      FRENCH: "FRENCH",
      ITALIAN: "ITALIAN",
      JAPANESE: "JAPANESE",
      CHINESE: "CHINESE",
      ARABIC: "ARABIC",
      KOREAN: "KOREAN",
    };

    return spec ? labels[spec] || spec : "General";
  };

  const role = localStorage.getItem("userRole");

  const handleViewLessons = () => {
    navigate(`/app/${role}/teacher/${teacher.id}/lessons`);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-5 border border-slate-200 hover:border-[#20B2AA]/30">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          {teacher.imageUrl ? (
            <img
              src={teacher.imageUrl}
              alt={teacher.fullName}
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-[#20B2AA]/20 transition-all"
            />
          ) : (
            <div
              className={`w-16 h-16 rounded-xl ${getAvatarColor(
                teacher.fullName
              )} flex items-center justify-center text-white text-lg font-bold shadow-md`}
            >
              {getInitials(teacher.fullName)}
            </div>
          )}
          {teacher.isActive && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
          )}
          {!teacher.isActive && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-400 rounded-full border-2 border-white shadow-sm"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-slate-900 mb-1.5 truncate hover:text-[#20B2AA] cursor-pointer transition-colors"
            onClick={handleViewLessons}
          >
            {teacher.fullName}
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
            <User className="w-4 h-4 shrink-0 text-[#20B2AA]/70" />
            <span>{teacher.level || "Not specified"}</span>
          </div>
          {teacher.specification && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Award className="w-4 h-4 shrink-0 text-[#20B2AA]/70" />
              <span>{getSpecificationLabel(teacher.specification)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="font-semibold text-slate-900">{teacher.rating}</span>
          {teacher.lessonsCount !== undefined && (
            <span className="text-xs text-slate-500">
              ({teacher.lessonsCount} lessons)
            </span>
          )}
        </div>
        {teacher.hourPrice && (
          <div className="text-right">
            <div className="text-sm font-bold text-[#20B2AA]">
              {formatPrice(teacher.hourPrice)}
            </div>
            <div className="text-xs text-slate-500">so'm/h</div>
          </div>
        )}
      </div>

      <div className="space-y-1.5 mb-4 text-xs text-slate-600">
        {teacher.email && (
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md">
            <span>📧</span>
            <span className="truncate">{teacher.email}</span>
          </div>
        )}
        {teacher.phoneNumber && (
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md">
            <span>📱</span>
            <span>{teacher.phoneNumber}</span>
          </div>
        )}
      </div>

      {teacher.experience && (
        <p className="text-sm text-slate-600 mb-3 bg-slate-50 px-3 py-2 rounded-md">
          {teacher.experience} experience
        </p>
      )}

      {teacher.description && (
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {teacher.description}
        </p>
      )}

      <button
        onClick={handleViewLessons}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#20B2AA] hover:bg-teal-600 rounded-lg transition-all text-white font-medium shadow-sm hover:shadow-md"
      >
        View Lessons
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TeacherCard;