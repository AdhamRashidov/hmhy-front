import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmins } from "@/features/super-admin/admins/useAdmins";
import { CopyButton } from "@/utils/copyButton";
import { formatDate } from "@/utils/time-format";
import { User, Phone, Pencil, X, Check } from "lucide-react";
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
        }
      );
    }
  };

  if (isLoading) return <div className="p-10 text-center">Yuklanmoqda...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Mening profilim</h1>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              {/* SAQLASH TUGMASI */}
              <Button
                onClick={onSave}
                disabled={isPending}
                className="bg-[#20B2AA] hover:bg-[#1a928c] text-white"
              >
                {isPending ? (
                  "Saqlanmoqda..."
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" /> Saqlash
                  </>
                )}
              </Button>

              {/* BEKOR QILISH TUGMASI */}
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
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4 mr-2" /> Bekor qilish
              </Button>
            </>
          ) : (
            /* TAHRIRLASH TUGMASI */
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="border-[#20B2AA] text-[#20B2AA] hover:bg-[#20B2AA] hover:text-white transition-colors"
            >
              <Pencil className="w-4 h-4 mr-2" /> Tahrirlash
            </Button>
          )}
        </div>
      </div>

      <Card className="border-none shadow-md bg-white overflow-hidden">
        <CardHeader className="border-b bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#ff8f00]/20 rounded-full">
              <User className="w-8 h-8 text-[#ff8f00]" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold font-serif text-[#ff8f00]/70">
                {admin?.username}
              </CardTitle>
              <Badge
                variant="secondary"
                className="mt-1 font-bold text-[#006db0] text-sm"
              >
                {admin?.role}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Username qismi */}
          <div className="grid gap-2">
            <Label className="text-gray-500 flex items-center gap-2">
              <User className="w-4 h-4" /> Username
            </Label>
            {isEditing ? (
              <Input
                name="username" // Name xususiyati handleChange ishlashi uchun shart
                value={formData.username} // Admin emas, formData'dan olamiz
                onChange={handleChange}
                placeholder="Username kiriting"
                className="h-11 border-[#20B2AA] focus-visible:ring-[#20B2AA]"
              />
            ) : (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border group">
                <span className="font-semibold">{admin?.username}</span>
                <CopyButton text={admin?.username ?? ""} />
              </div>
            )}
          </div>

          {/* Telefon qismi */}
          <div className="grid gap-2">
            <Label className="text-gray-500 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Telefon raqami
            </Label>
            {isEditing ? (
              <Input
                name="phoneNumber" // Name xususiyati handleChange ishlashi uchun shart
                value={formData.phoneNumber} // Admin emas, formData'dan olamiz
                onChange={handleChange}
                placeholder="Telefon raqamini kiriting"
                className="h-11 border-[#20B2AA] focus-visible:ring-[#20B2AA]"
              />
            ) : (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border group">
                <span className="font-semibold">{admin?.phoneNumber}</span>
                <CopyButton text={admin?.phoneNumber ?? ""} />
              </div>
            )}
          </div>

          {/* Tizimli ma'lumotlar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100 flex flex-col">
              <span className="text-[10px] uppercase text-blue-400 font-bold mb-1">
                Ro'yxatdan o'tgan
              </span>
              <span className="text-sm font-semibold text-blue-900">
                {formatDate(admin?.createdAt)}
              </span>
            </div>
            <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-100 flex flex-col">
              <span className="text-[10px] uppercase text-orange-400 font-bold mb-1">
                Oxirgi yangilanish
              </span>
              <span className="text-sm font-semibold text-orange-900">
                {formatDate(admin?.updatedAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
