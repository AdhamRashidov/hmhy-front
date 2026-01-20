import { useState } from "react";
import { Clock, Banknote, CalendarCheck, Check } from "lucide-react";
import { Button } from "@/custom/button";
import { Input } from "@/custom/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import { useCreateLesson } from "../teacher-base.service";

export const CreateLessonForm = ({
  selectedDate,
  onCancel,
}: {
  selectedDate: string;
  onCancel: () => void;
}) => {
  const { mutate, isPending } = useCreateLesson();

  const [startH, setStartH] = useState("09");
  const [startM, setStartM] = useState("00");
  const [endH, setEndH] = useState("10");
  const [endM, setEndM] = useState("00");
  const [price, setPrice] = useState(50000);
  const [name, setName] = useState("English");

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = ["00", "15", "30", "45"];

  const handleSubmit = () => {
    const start = new Date(`${selectedDate}T${startH}:${startH}:00`);
    const end = new Date(`${selectedDate}T${endH}:${endM}:00`);

    const offset = 5 * 60 * 60 * 1000;

    const startTimeAdjusted = new Date(start.getTime() + offset).toISOString();
    const endTimeAdjusted = new Date(end.getTime() + offset).toISOString();

    mutate(
      {
        name,
        startTime: startTimeAdjusted,
        endTime: endTimeAdjusted,
        price: Number(price),
      },
      { onSuccess: onCancel }
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="p-2 bg-[#004f98] rounded-md">
          <CalendarCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-lg">
            Yangi dars yaratish
          </h3>
          <p className="text-sm text-slate-500">
            {format(new Date(selectedDate), "EEEE, MMMM d, yyyy", {
              locale: uz,
            })}
          </p>
        </div>
      </div>

      <div className="bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-md text-sm flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <Check className="w-4 h-4" />
        </div>
        <span className="font-medium">
          Google Calendar ulangan. Dars avtomatik qo'shiladi.
        </span>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Dars nomi
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 border-slate-300 focus:border-[#004f98] focus:ring-[#004f98] rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Narxi (UZS)
            </label>
            <div className="relative">
              <Banknote className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="pl-10 h-11 border-slate-300 focus:border-[#004f98] focus:ring-[#004f98] rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#004f98]" />
            Boshlanish vaqti
          </label>
          <div className="flex items-center gap-2">
            <Select value={startH} onValueChange={setStartH}>
              <SelectTrigger className="w-full h-11 border-slate-300 focus:border-[#004f98] focus:ring-[#004f98] rounded-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {hours.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="font-semibold text-slate-400">:</span>
            <Select value={startM} onValueChange={setStartM}>
              <SelectTrigger className="w-full h-11 border-slate-300 focus:border-[#004f98] focus:ring-[#004f98] rounded-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {minutes.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#004f98]" />
            Tugash vaqti
          </label>
          <div className="flex items-center gap-2">
            <Select value={endH} onValueChange={setEndH}>
              <SelectTrigger className="w-full h-11 border-slate-300 focus:border-[#004f98] focus:ring-[#004f98] rounded-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {hours.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="font-semibold text-slate-400">:</span>
            <Select value={endM} onValueChange={setEndM}>
              <SelectTrigger className="w-full h-11 border-slate-300 focus:border-[#004f98] focus:ring-[#004f98] rounded-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {minutes.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-slate-100">
        <div className="px-3 py-1.5 bg-slate-100 rounded-md">
          <span className="text-sm text-slate-600">
            Davomiyligi:{" "}
            <span className="font-semibold text-slate-900">1 soat</span>
          </span>
        </div>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isPending}
            className="h-11 px-6 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-md font-medium"
          >
            Bekor qilish
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="h-11 px-8 bg-[#004f98] hover:bg-[#003d7a] text-white rounded-md font-medium shadow-sm hover:shadow transition-all"
          >
            {isPending ? "Yaratilmoqda..." : "Dars yaratish"}
          </Button>
        </div>
      </div>
    </div>
  );
};
