

import {
	Calendar,
	Clock,
	DollarSign,
	CheckCircle,
	XCircle,
  } from "lucide-react";
  import { LessonStatus, type Lesson } from "./types/types";
  
  interface LessonCardProps {
	lesson: Lesson;
  }
  
  export const LessonCard = ({ lesson }: LessonCardProps) => {
	const getStatusColor = (status: LessonStatus): string => {
	  const colors = {
		[LessonStatus.AVAILABLE]: "bg-[#20B2AA]/10 text-[#20B2AA] border-[#20B2AA]/30",
		[LessonStatus.BOOKED]: "bg-[#ff9933]/10 text-[#ff9933] border-[#ff9933]/30",
		[LessonStatus.COMPLETED]: "bg-emerald-50 text-emerald-700 border-emerald-200",
		[LessonStatus.CANCELLED]: "bg-red-50 text-red-700 border-red-200",
	  };
	  return colors[status] || "bg-slate-100 text-slate-700 border-slate-200";
	};
  
	const getStatusIcon = (status: LessonStatus) => {
	  switch (status) {
		case LessonStatus.COMPLETED:
		  return <CheckCircle className="w-4 h-4" />;
		case LessonStatus.CANCELLED:
		  return <XCircle className="w-4 h-4" />;
		default:
		  return null;
	  }
	};
  
	const formatDateTime = (dateString: string): string => {
	  const date = new Date(dateString);
	  return new Intl.DateTimeFormat("uz-UZ", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	  }).format(date);
	};
  
	const formatTime = (dateString: string): string => {
	  const date = new Date(dateString);
	  return new Intl.DateTimeFormat("uz-UZ", {
		hour: "2-digit",
		minute: "2-digit",
	  }).format(date);
	};
  
	const formatPrice = (price: number): string => {
	  return new Intl.NumberFormat("uz-UZ").format(price);
	};
  
	const getDuration = (): string => {
	  const start = new Date(lesson.startTime);
	  const end = new Date(lesson.endTime);
	  const diffMs = end.getTime() - start.getTime();
	  const diffMins = Math.round(diffMs / 60000);
	  return `${diffMins} min`;
	};
  
	return (
    <div className="bg-linear-to-br from-white via-white to-orange-50/20 border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-[#20B2AA]/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-[#ff9933] mb-1.5 line-clamp-1">
            {lesson.name}
          </h3>
          {lesson.student && (
            <p className="text-sm text-slate-600">
              Student: {lesson.student.firstName} {lesson.student.lastName}
            </p>
          )}
        </div>
        <span
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ml-2 border flex items-center gap-1.5 ${getStatusColor(
            lesson.status
          )}`}
        >
          {getStatusIcon(lesson.status)}
          {lesson.status}
        </span>
      </div>

      <div className="space-y-2.5 mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5 text-sm text-slate-700">
          <Calendar className="w-4 h-4 text-[#20B2AA]/70 shrink-0" />
          <span>{formatDateTime(lesson.startTime)}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-700">
          <Clock className="w-4 h-4 text-[#20B2AA]/70 shrink-0" />
          <span>
            {formatTime(lesson.startTime)} - {formatTime(lesson.endTime)} (
            {getDuration()})
          </span>
        </div>
      </div>

      {lesson.googleMeetUrl && (
        <div className="mb-4">
          <a
            href={lesson.googleMeetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#ff9933]/10 to-orange-100/50 text-[#ff9933] text-sm font-medium rounded-lg hover:from-[#ff9933]/20 hover:to-orange-100 transition-all border border-[#ff9933]/30"
          >
            <span>📹</span>
            <span>Join Google Meet</span>
          </a>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#20B2AA]" />
          <span className="text-sm font-semibold text-slate-900">
            {formatPrice(lesson.price)} so'm
          </span>
        </div>
        <div className="flex items-center gap-2">
          {lesson.isPaid ? (
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200">
              Paid
            </span>
          ) : (
            <span className="px-3 py-1 bg-[#ff9933]/10 text-[#ff9933] text-xs font-semibold rounded-lg border border-[#ff9933]/30">
              Unpaid
            </span>
          )}
        </div>
      </div>

      {lesson.bookedAt && lesson.status === LessonStatus.BOOKED && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Booked: {formatDateTime(lesson.bookedAt)}
          </p>
        </div>
      )}
      {lesson.completedAt && lesson.status === LessonStatus.COMPLETED && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Completed: {formatDateTime(lesson.completedAt)}
          </p>
        </div>
      )}
    </div>
  );
  };