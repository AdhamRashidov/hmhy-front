import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  CheckCircle,
  XCircle,
  Star,
  Loader2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import API from "@/config/request";

export const Dashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const { data } = await API.get("/admin/stats");
      return data; 
    },
  });

  const username = localStorage.getItem("userName") || "Admin";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 p-6 animate-in fade-in duration-500">
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center">
            <Loader2
              className="w-12 h-12 animate-spin text-[#20B2AA] relative z-10"
              strokeWidth={2.5}
            />
            <div className="absolute inset-0 w-12 h-12 border-4 border-[#20B2AA]/20 rounded-full"></div>
            <div className="absolute inset-0 w-12 h-12 border-t-4 border-transparent rounded-full animate-pulse"></div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-base sm:text-lg font-bold text-slate-700 tracking-tight animate-pulse">
              Platforma yuklanmoqda
            </p>
            <div className="flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#20B2AA] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-[#20B2AA] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-[#20B2AA] rounded-full animate-bounce"></span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
          Xavfsiz ulanish o'rnatilmoqda
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] p-4 sm:p-6 animate-in fade-in zoom-in duration-300">
        <Card className="max-w-md w-full border-none shadow-2xl shadow-red-100 rounded-[2.5rem] bg-white/90 backdrop-blur-sm">
          <CardContent className="pt-10 pb-10 px-6 sm:px-8 text-center space-y-5">
            <div className="relative inline-flex">
              <XCircle className="w-16 h-16 text-red-500 mx-auto relative z-10 animate-bounce" />
              <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                Xatolik yuz berdi
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
                Ma'lumotlarni olishda muammo paydo bo'ldi. Iltimos, internet
                aloqasini tekshiring.
              </p>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-10 h-12 bg-[#20B2AA] hover:bg-[#1a9b94] text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.95] flex items-center justify-center gap-2 mx-auto"
              >
                Qayta urinish
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = data.data;

  const statsCards = [
    {
      title: "Jami Ustozlar",
      value: stats.totalTeachers,
      icon: Users,
    },
    {
      title: "Jami Talabalar",
      value: stats.totalStudents,
      icon: GraduationCap,
    },
    {
      title: "Faol Darslar",
      value: stats.totalLessons,
      icon: BookOpen,
    },
    {
      title: "Umumiy Tushum",
      value: stats.totalRevenue.toLocaleString("uz-UZ") + " UZS",
      icon: DollarSign,
    },
  ];

return (
  <div className="px-3 sm:px-6 min-h-screen bg-gray-50 space-y-4 md:space-y-6 pb-10">
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-emerald-50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="flex flex-wrap gap-2 items-center text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Xush kelibsiz ,{" "}
            <span className="text-[#20B2AA] truncate max-w-37.5 sm:max-w-none">
              {username}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Platformangizning umumiy ko'rinishi
          </p>
        </div>
        <Badge className="cursor-pointer bg-[#20B2AA] hover:bg-[#1a9b94] text-white text-sm sm:text-lg px-3 sm:px-5 py-1 rounded-full shadow-lg shadow-emerald-200 animate-pulse shrink-0">
          Live
        </Badge>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statsCards.map((stat) => (
        <Card
          key={stat.title}
          className="border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl"
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl font-bold mt-1 text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className="p-3 bg-[#20B2AA]/10 rounded-xl shrink-0">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#20B2AA]" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Students */}
      <Card className="rounded-2xl border-none shadow-sm">
        <CardHeader className="pb-3 px-5 pt-5">
          <CardTitle className="text-base font-bold text-gray-800">
            Talabalar
          </CardTitle>
          <CardDescription className="text-xs">
            O'sish dinamikasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 px-5 pb-5">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                Faol foydalanuvchilar
              </span>
            </div>
            <span className="font-bold text-gray-900">
              {stats.totalStudents}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                Bloklanganlar
              </span>
            </div>
            <span className="font-bold text-gray-900">0</span>
          </div>
        </CardContent>
      </Card>

      {/* Teachers */}
      <Card className="rounded-2xl border-none shadow-sm">
        <CardHeader className="pb-3 px-5 pt-5">
          <CardTitle className="text-base font-bold text-gray-800">
            Ustozlar
          </CardTitle>
          <CardDescription className="text-xs">
            Reyting ko'rsatkichlari
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 px-5 pb-5">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#20B2AA] shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                Jami mutaxassislar
              </span>
            </div>
            <span className="font-bold text-gray-900">
              {stats.totalTeachers}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                O'rtacha sifat
              </span>
            </div>
            <span className="font-bold text-gray-900">4.7</span>
          </div>
        </CardContent>
      </Card>

      {/* Finance */}
      <Card className="rounded-2xl border-none shadow-sm md:col-span-2 lg:col-span-1">
        <CardHeader className="pb-3 px-5 pt-5">
          <CardTitle className="text-base font-bold text-gray-800">
            Moliya & Ta'lim
          </CardTitle>
          <CardDescription className="text-xs">
            Moliyaviy hisobot
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-5 pb-5">
          <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#20B2AA] shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                Sof foyda
              </span>
            </div>
            <span className="font-bold text-gray-900">
              {(stats.totalRevenue / 1000).toFixed(1)}K
            </span>
          </div>

          <Button
            variant="outline"
            className="w-full h-11 rounded-xl border-[#20B2AA] text-[#20B2AA] hover:bg-[#20B2AA] hover:text-white font-bold transition-all active:scale-[0.98] group"
            asChild
          >
            <Link to="/app/SUPERADMIN/earnings">
              <span className="text-xs sm:text-sm">
                Barcha to'lovlarni ko'rish
              </span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>

    <Card className="rounded-2xl border-none shadow-sm">
      <CardHeader className="px-5 pt-5">
        <CardTitle className="text-base font-bold text-gray-800">
          Tezkor Harakatlar
        </CardTitle>
        <CardDescription className="text-xs">
          Bo'limlarga tezkor o'tish tugmalari
        </CardDescription>
      </CardHeader>
      <CardContent className="px-5 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              title: "Ustozlar",
              icon: Users,
              link: "/app/SUPERADMIN/teachers",
            },
            {
              title: "Talabalar",
              icon: GraduationCap,
              link: "/app/SUPERADMIN/students",
            },
            {
              title: "Darslar",
              icon: BookOpen,
              link: "/app/SUPERADMIN/lessons",
            },
            {
              title: "To'lovlar",
              icon: DollarSign,
              link: "/app/SUPERADMIN/payments",
            },
          ].map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-slate-100 hover:border-[#20B2AA] hover:bg-emerald-50/30 transition-all active:scale-[0.95] group"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-none transition-all">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#20B2AA]" />
              </div>
              <span className="text-[11px] sm:text-sm font-bold text-gray-700 tracking-tight">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
};
