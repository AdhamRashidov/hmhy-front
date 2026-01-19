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
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#20B2AA]" />
          <p className="text-sm text-gray-500">Platforma yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-screen p-6">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Xatolik yuz berdi</h2>
            <p className="text-gray-600 text-sm mb-4">
              Ma'lumotlarni olishda muammo paydo bo'ldi.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-[#20B2AA] hover:bg-[#1a9b94]"
            >
              Qayta urinish
            </Button>
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
    <div className="px-6 min-h-screen bg-gray-50 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-md shadow-emerald-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex gap-5 items-center text-2xl font-semibold text-gray-900">
              Xush kelibsiz ,{" "}
              <p className="text-[#20B2AA] font-bold font-stretch-110%">
                {username}
              </p>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Platformangizning umumiy ko'rinishi
            </p>
          </div>
          <Badge className="cursor-pointer bg-[#20B2AA] hover:bg-[#1a9b94] text-white text-xl px-4 shadow-2xl animate-pulse">
            Live
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-[#20B2AA]/10 rounded-lg">
                  <stat.icon className="w-6 h-6 text-[#20B2AA]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Students */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Talabalar</CardTitle>
            <CardDescription>O'sish dinamikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Faol foydalanuvchilar</span>
              </div>
              <span className="font-semibold">{stats.totalStudents}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm">Bloklanganlar</span>
              </div>
              <span className="font-semibold">0</span>
            </div>
          </CardContent>
        </Card>

        {/* Teachers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ustozlar</CardTitle>
            <CardDescription>Reyting ko'rsatkichlari</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#20B2AA]" />
                <span className="text-sm">Jami mutaxassislar</span>
              </div>
              <span className="font-semibold">{stats.totalTeachers}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm">O'rtacha sifat</span>
              </div>
              <span className="font-semibold">4.7</span>
            </div>
          </CardContent>
        </Card>

        {/* Finance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Moliya & Ta'lim</CardTitle>
            <CardDescription>Moliyaviy hisobot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#20B2AA]/5 rounded-lg border border-[#20B2AA]/20">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#20B2AA]" />
                <span className="text-sm">Sof foyda</span>
              </div>
              <span className="font-semibold">
                {(stats.totalRevenue / 1000).toFixed(1)}K
              </span>
            </div>

              <Button variant="outline" className="w-full" asChild>
                <Link to="/app/SUPERADMIN/earnings">
                  Barcha to'lovlarni ko'rish
                  <ArrowRight className="animate-ping w-4 h-4 ml-2" />
                </Link>
              </Button>

          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tezkor Harakatlar</CardTitle>
          <CardDescription>Bo'limlarga tezkor o'tish tugmalari</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Ustozlar", icon: Users, link: "/app/SUPERADMIN/teachers" },
              {
                title: "Talabalar",
                icon: GraduationCap,
                link: "/app/SUPERADMIN/students",
              },
              { title: "Darslar", icon: BookOpen, link: "/app/SUPERADMIN/lessons" },
              {
                title: "To'lovlar",
                icon: DollarSign,
                link: "/app/SUPERADMIN/payments",
              },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.link}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:border-[#20B2AA] hover:bg-[#20B2AA]/5 transition-colors"
              >
                <item.icon className="w-6 h-6 text-[#20B2AA]" />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
