
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, AlertCircle } from "lucide-react";
import { useState } from "react";

export const StudentLogin = () => {
  const [initData, setInitData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setError("");
    setIsLoading(true);

    if (!initData || initData.trim() === "") {
      setError("Iltimos, Telegram ma'lumotlarini kiriting");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      alert("Tizimga muvaffaqiyatli kirdingiz!");
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

return (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden selection:bg-orange-100">
    <div className="absolute top-0 left-0 w-full h-full z-0 opacity-30 [radial-gradient(#ed8936_1px,transparent_1px)] [bg-size:32px_32px]"></div>

    <div className="w-full max-w-112.5 z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <Card className="border-none shadow-[0_40px_80px_-15px_rgba(237,137,54,0.15)] rounded-[2.5rem] bg-white/90 backdrop-blur-xl overflow-hidden">
        <CardContent className="p-8 md:p-12">
          {/* Logo va Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-50 rounded-[2rem] mb-6 shadow-inner group transition-all duration-500 hover:rotate-6 hover:scale-110">
              <GraduationCap
                className="w-12 h-12 text-orange-600"
                strokeWidth={2.5}
              />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Talaba
            </h1>
            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
              Bilim olish va natijalarni kuzatish
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6 mt-8">
            {/* InitData Input */}
            <div className="space-y-2.5">
              <Label
                htmlFor="initData"
                className="text-[14px] font-bold text-slate-700 ml-1"
              >
                Telegram ma'lumotlari
              </Label>
              <div className="relative">
                <Input
                  id="initData"
                  type="text"
                  placeholder="Telegram bot orqali olingan ma'lumotlarni kiriting"
                  value={initData}
                  onChange={(e) => setInitData(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-14 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium placeholder:text-slate-400"
                  disabled={isLoading}
                />
              </div>
              <p className="text-[11px] text-slate-400 font-semibold mt-1 ml-1 uppercase tracking-wider">
                Telegram botdan olingan initData qatorini kiriting
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-50 border-red-100 rounded-2xl py-3 animate-in zoom-in duration-300"
              >
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-600 text-xs font-bold tracking-tight">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-bold text-[16px] rounded-2xl shadow-xl shadow-orange-200 transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Yuklanmoqda...</span>
                </div>
              ) : (
                "Kirish"
              )}
            </Button>

            {/* Info Box */}
            <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 mt-6 animate-pulse">
              <p className="text-xs md:text-sm text-orange-800 font-medium leading-relaxed">
                <span className="font-bold uppercase tracking-tight mr-1">
                  Eslatma:
                </span>
                Platformaga kirish uchun avval Telegram botimizdan ro'yxatdan
                o'tishingiz kerak.
              </p>
            </div>

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                <span className="bg-white px-4 rounded-full">Telegram bot</span>
              </div>
            </div>

            {/* Telegram Bot Link */}
            <div className="text-center space-y-4">
              <p className="text-slate-500 text-sm font-semibold">
                Hali ro'yxatdan o'tmaganmisiz?
              </p>
              <Button
                variant="outline"
                className="w-full h-13 rounded-2xl border-2 border-orange-600 text-orange-600 hover:bg-orange-50 hover:text-orange-700 font-bold transition-all active:scale-[0.97]"
                onClick={() => alert("Telegram botga o'tish")}
              >
                Telegram botga o'tish
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-10 text-center">
        <p className="text-[12px] font-bold text-slate-400 tracking-wide uppercase">
          Talaba Platform. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  </div>
);
}
