import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmins } from "@/features/super-admin/admins/useAdmins";
import { CopyButton } from "@/utils/copyButton";
import { formatDate } from "@/utils/time-format";
import { User, Phone, Pencil, X, Check, Clock, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const Profile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const { getMe, updateAdmin } = useAdmins();
  const { isPending, mutate: handleUpdate } = updateAdmin();
  const { data, isLoading } = getMe();
  const admin = data?.data;

  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        username: admin.username || "",
        phoneNumber: admin.phoneNumber || "",
      });
    }
  }, [admin]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    if (admin?.id) {
      handleUpdate(
        { id: admin.id, data: formData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "me"] });
            setIsEditing(false);
          },
          onError: (err) => {
            console.error("Yangilashda xato:", err);
            alert("Xatolik yuz berdi. Qayta urinib ko'ring.");
          },
        },
      );
    }
  };

  if (isLoading) return <div className="p-10 text-center">Yuklanmoqda...</div>;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Mening profilim
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Shaxsiy ma'lumotlaringizni boshqaring
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                disabled={isPending}
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    username: admin?.username ?? "",
                    phoneNumber: admin?.phoneNumber ?? "",
                  });
                }}
                className="hover:bg-red-50 text-red-600 font-medium"
              >
                <X className="w-4 h-4 mr-2" /> Bekor qilish
              </Button>
              <Button
                onClick={onSave}
                disabled={isPending}
                className="bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all active:scale-95"
              >
                {isPending ? (
                  <span className="flex items-center gap-2 italic">
                    Saqlanmoqda...
                  </span>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" /> Saqlash
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm transition-all"
            >
              <Pencil className="w-4 h-4 mr-2 text-slate-500" /> Tahrirlash
            </Button>
          )}
        </div>
      </div>

      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-2xl pt-0">
        {/* CARD HEADER - PREMIUM LOOK */}
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 py-8">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#ff8f00] to-[#ffc107] rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative p-1 bg-white rounded-full border border-slate-100">
                <div className="p-4 bg-slate-50 rounded-full">
                  <User
                    className="w-10 h-10 text-[#ff8f00]"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              {isEditing && (
                <div className="absolute bottom-0 right-0 p-1.5 bg-white shadow-md rounded-full border border-slate-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight">
                {admin?.username}
              </CardTitle>
              <div className="flex items-center gap-2 ">
                {/* <Badge
                variant="outline"
                className="bg-blue-50/50 text-blue-700 border-blue-100 px-3 py-0.5 rounded-full text-xs font-semibold"
              >
                {admin?.role}
              </Badge> */}

                <Badge
                  variant="outline"
                  className="bg-cyan-50/30 backdrop-blur-md border-cyan-200/50 text-cyan-700 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(34,211,238,0.1)] flex items-center gap-2 group hover:border-cyan-400 transition-all duration-300"
                >
                  <span className="flex h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:scale-110 transition-transform"></span>
                  {admin?.role}
                </Badge>

                <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                <span className="text-xs text-slate-400 font-medium itali flex items-center">
                  ID: {admin?.id?.slice(-5) || "Admin"}
                  <CopyButton text={admin?.id ?? ""} />
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Username qismi */}
            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                Foydalanuvchi nomi
              </Label>
              {isEditing ? (
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username kiriting"
                  className="h-12 border-slate-200 focus:ring-2 focus:ring-[#ff8f00]/20 focus:border-[#ff8f00] rounded-xl transition-all"
                />
              ) : (
                <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100 group hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">
                      {admin?.username}
                    </span>
                  </div>
                  <CopyButton text={admin?.username ?? ""} />
                </div>
              )}
            </div>

            {/* Telefon qismi */}
            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                Bog'lanish raqami
              </Label>
              {isEditing ? (
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Telefon raqamini kiriting"
                  className="h-12 border-slate-200 focus:ring-2 focus:ring-[#ff8f00]/20 focus:border-[#ff8f00] rounded-xl transition-all"
                />
              ) : (
                <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100 group hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">
                      {admin?.phoneNumber}
                    </span>
                  </div>
                  <CopyButton text={admin?.phoneNumber ?? ""} />
                </div>
              )}
            </div>
          </div>

          {/* Tizimli ma'lumotlar - Minimalist Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/30 border border-slate-100/50">
              <div className="p-2 bg-white shadow-sm rounded-lg">
                <Calendar className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-[10px] uppercase text-slate-400 font-bold tracking-tight">
                  A'zolik sanasi
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {formatDate(admin?.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/30 border border-slate-100/50">
              <div className="p-2 bg-white shadow-sm rounded-lg">
                <Clock className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="text-[10px] uppercase text-slate-400 font-bold tracking-tight">
                  Oxirgi yangilanish
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {formatDate(admin?.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
