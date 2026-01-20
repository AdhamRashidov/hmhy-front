import { MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/custom/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const LessonCard = ({ lesson }: { lesson: any }) => {
  const statusStyles: Record<string, string> = {
    AVAILABLE:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50",
    BOOKED:
      "bg-[#004f98]/10 text-[#004f98] border border-[#004f98]/20 hover:bg-[#004f98]/10",
    CANCELLED: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-50",
  };

  return (
    <div className="group relative bg-white border border-slate-200 rounded-lg p-5 hover:shadow-lg hover:border-[#004f98]/30 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Badge
            variant="secondary"
            className={statusStyles[lesson.status] || ""}
          >
            {lesson.status}
          </Badge>
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#004f98] transition-colors">
            {lesson.name}
          </h3>
        </div>
        <div className="text-right bg-slate-50 px-3 py-2 rounded-md border border-slate-200">
          <p className="text-base font-bold text-slate-900">
            {Number(lesson.price).toLocaleString()} UZS
          </p>
          <p className="text-[10px] text-slate-500 uppercase font-medium tracking-wide mt-0.5">
            Narxi
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex items-center text-sm text-slate-700 bg-slate-50 px-3 py-2.5 rounded-md border border-slate-200">
          <Clock className="w-4 h-4 mr-2 text-[#004f98]" />
          <span className="font-medium">
            {format(new Date(lesson.startTime), "HH:mm")} -{" "}
            {format(new Date(lesson.endTime), "HH:mm")}
          </span>
          <span className="mx-2 text-slate-300">•</span>
          <span className="text-xs text-slate-600">
            {format(new Date(lesson.startTime), "dd-MMMM, yyyy")}
          </span>
        </div>

        {lesson.googleMeetUrl && (
          <div className="flex items-center text-sm text-[#004f98] bg-linear-to-r from-[#004f98]/5 to-blue-50 p-3 rounded-md border border-[#004f98]/20">
            <MapPin className="w-4 h-4 mr-2 shrink-0" />
            <a
              href={lesson.googleMeetUrl}
              target="_blank"
              rel="noreferrer"
              className="truncate hover:underline font-medium flex-1"
            >
              Google Meet Link
            </a>
            <ExternalLink className="w-3.5 h-3.5 ml-1 shrink-0" />
          </div>
        )}
      </div>

      <Button
        variant="outline"
        className="w-full h-11 border-2 border-[#004f98] text-[#004f98] hover:bg-[#004f98] hover:text-white font-medium transition-all rounded-md"
        asChild
      >
        <a href={lesson.googleMeetUrl} target="_blank" rel="noreferrer">
          Darsga qo'shilish
        </a>
      </Button>
    </div>
  );
};