// import { Card } from "@/components/ui/card";
// import type { StatsCardProps } from "../types/types";

// export const StatsCard = ({
//   label,
//   value,
//   icon: Icon,
//   iconColor,
//   labelColor,
// }: StatsCardProps) => (
//   <Card className="flex items-center justify-between p-6 bg-white border-none shadow-sm">
//     <div className="space-y-1">
//       <p className={`text-xs font-semibold uppercase ${labelColor}`}>{label}</p>
//       <p className="text-2xl font-bold text-slate-900">{value}</p>
//     </div>
//     <div className={`p-2 rounded-lg ${iconColor}`}>
//       <Icon className="w-6 h-6" />
//     </div>
//   </Card>
// );




import { Card } from "@/components/ui/card";
import type { StatsCardProps } from "../types/types";

export const StatsCard = ({
  label,
  value,
  icon: Icon,
  iconColor, 
}: StatsCardProps) => (
  <Card className="group flex items-center gap-5 p-5 bg-white border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] rounded-2xl transition-all duration-300 hover:shadow-md hover:border-slate-200">
    <div
      className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-300 ${iconColor} bg-opacity-[0.08] group-hover:bg-opacity-[0.12]`}
    >
      <Icon className="w-5 h-5 stroke-2" />
    </div>

    {/* Matn qismi */}
    <div className="flex flex-col gap-0.5">
      <p className="text-[13px] font-medium text-slate-500 tracking-tight">
        {label}
      </p>
      <div className="flex items-baseline justify-center gap-1">
        <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
          {value}
        </h4>

      </div>
    </div>
    <div className="absolute right-0 top-0 h-full w-1 bg-linear-to-b from-transparent via-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </Card>
);