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
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-4 md:p-10">
      <div className="max-w-6xl w-full text-center space-y-12">
        {/* Sarlavha qismi */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-1000">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            O'quv platformasiga{" "}
            <span className="text-blue-600">xush kelibsiz</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium">
            Davom etish uchun o'z rolingizni tanlang
          </p>
        </div>

        {/* ShadcnUI Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((item) => (
            <Card
              key={item.title}
              className="group relative border-none shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white rounded-[2.5rem] overflow-hidden hover:-translate-y-3"
              onClick={() => navigate(item.path)}
            >
              <CardContent className="p-8 md:p-12 flex flex-col items-center space-y-8">
                {/* Ikonka konteyneri */}
                <div
                  className={`relative ${item.bg} p-6 rounded-[2rem] transition-transform duration-500 group-hover:rotate-15 group-hover:scale-110 shadow-sm`}
                >
                  <item.icon className={`w-12 h-12 ${item.color}`} />
                  {/* Orqa fondagi ping effekti */}
                  <span
                    className={`absolute inset-0 rounded-[2rem] ${item.bg} animate-ping opacity-0 group-hover:opacity-25`}
                  />
                </div>

                {/* Matnlar */}
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed px-2">
                    {item.desc}
                  </p>
                </div>

                {/* Kirish tugmasi - Dinamik va chiroyli */}
                <div className="flex items-center gap-3 font-bold text-base transition-all duration-300">
                  <span
                    className={`relative px-6 py-2 rounded-full ${item.bg} ${item.color} group-hover:shadow-lg transition-all`}
                  >
                    Kirish
                    {/* Siz aytgan o'sha aktiv nuqta */}
                    <span className="absolute -right-1 -top-1 flex h-3 w-3">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${item.bg} opacity-75`}
                      ></span>
                      <span
                        className={`relative inline-flex rounded-full h-3 w-3 ${item.bg} border-2 border-white`}
                      ></span>
                    </span>
                  </span>
                  <ArrowRight
                    className={`w-6 h-6 ${item.color} group-hover:translate-x-2 transition-transform duration-300`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
