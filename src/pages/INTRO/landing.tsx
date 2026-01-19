

import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, GraduationCap, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AUTH_PATH } from "@/features/auth/path.auth";

export const Landing = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Admin Panel",
      desc: "Tizimni boshqarish va monitoring",
      icon: ShieldCheck,
      path: AUTH_PATH.LOGIN, // "/login"
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "O'qituvchi",
      desc: "Darslar va o'quvchilar bilan ishlash",
      icon: Users,
      path: "/teacher-login",
      color: "text-[#20B2AA]",
      bg: "bg-[#20B2AA]/10",
    },
    {
      title: "Talaba",
      desc: "Bilim olish va natijalarni kuzatish",
      icon: GraduationCap,
      path: "/student-login",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            O'quv platformasiga xush kelibsiz
          </h1>
          <p className="text-gray-500 text-lg">
            Davom etish uchun o'z rolingizni tanlang
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((item) => (
            <Card
              key={item.title}
              className="group border-none shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => navigate(item.path)}
            >
              <CardContent className="p-10 flex flex-col items-center space-y-6">
                <div
                  className={`${item.bg} p-6 rounded-full group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className={`w-12 h-12 ${item.color}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-2 font-semibold ${item.color} opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity animate-pulse`}
                >
                  Kirish <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
