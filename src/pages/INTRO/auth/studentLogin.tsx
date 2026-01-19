
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-none">
          <CardContent className="pt-6">
            {/* Logo va Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-50 rounded-full mb-6">
                <GraduationCap
                  className="w-12 h-12 text-orange-600"
                  strokeWidth={2.5}
                />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Talaba</h1>
              <p className="text-gray-500 text-lg">
                Bilim olish va natijalarni kuzatish
              </p>
            </div>

            {/* Login Form */}
            <div className="space-y-5 mt-12">
              {/* InitData Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="initData"
                  className="text-sm font-medium text-gray-700"
                >
                  Telegram ma'lumotlari
                </Label>
                <Input
                  id="initData"
                  type="text"
                  placeholder="Telegram bot orqali olingan ma'lumotlarni kiriting"
                  value={initData}
                  onChange={(e) => setInitData(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12 border-gray-300 focus:border-orange-600 focus:ring-orange-600"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Telegram botdan olingan initData qatorini kiriting
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-50 border-red-200"
                >
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-600">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-base mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Yuklanmoqda...
                  </div>
                ) : (
                  "Kirish"
                )}
              </Button>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-sm text-orange-800">
                  <span className="font-semibold">Eslatma:</span> Platformaga
                  kirish uchun avval Telegram botimizdan ro'yxatdan o'tishingiz
                  kerak.
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Telegram bot
                  </span>
                </div>
              </div>

              {/* Telegram Bot Link */}
              <div className="text-center">
                <p className="text-gray-600 mb-3">
                  Hali ro'yxatdan o'tmaganmisiz?
                </p>
                <Button
                  variant="outline"
                  className="w-full h-12 border-orange-600 text-orange-600 hover:bg-orange-50 hover:text-orange-700 font-semibold"
                  onClick={() => alert("Telegram botga o'tish")}
                >
                  Telegram botga o'tish
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        {/* <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Talaba Platform. Barcha huquqlar himoyalangan.
          </p>
        </div> */}
      </div>
    </div>
  );
}
