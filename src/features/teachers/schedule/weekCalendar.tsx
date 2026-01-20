import { format, addDays, startOfToday } from "date-fns";
import { uz } from "date-fns/locale";
import { cn } from "../../../lib/utils";

interface WeekCalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const WeekCalendar = ({
  selectedDate,
  onDateChange,
}: WeekCalendarProps) => {
  const today = startOfToday();

  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(today, i));

  return (
    <div className="grid grid-cols-7 gap-2 md:gap-3">
      {weekDays.map((day) => {
        const dateStr = format(day, "yyyy-MM-dd");
        const isActive = selectedDate === dateStr;

        return (
          <button
            key={dateStr}
            onClick={() => onDateChange(dateStr)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-lg border transition-all h-24 bg-white hover:shadow-md",
              isActive
                ? "border-[#004f98] bg-linear-to-b from-[#004f98]/5 to-[#004f98]/10 shadow-sm"
                : "border-slate-200 hover:border-[#004f98]/40"
            )}
          >
            <span
              className={cn(
                "text-[10px] uppercase font-semibold tracking-wide mb-1",
                isActive ? "text-[#004f98]" : "text-slate-500"
              )}
            >
              {format(day, "eee", { locale: uz })}
            </span>
            <span
              className={cn(
                "text-2xl font-bold",
                isActive ? "text-[#004f98]" : "text-slate-700"
              )}
            >
              {format(day, "dd")}
            </span>
            <span
              className={cn(
                "text-[10px] font-medium",
                isActive ? "text-[#004f98]/70" : "text-slate-500"
              )}
            >
              {format(day, "MMM", { locale: uz })}
            </span>
          </button>
        );
      })}
    </div>
  );
};