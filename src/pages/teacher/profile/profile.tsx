import { useEffect, useState } from "react";
import {
  Edit3,
  Lock,
  RefreshCw,
  Trash2,
  Loader2,
  Mail,
  ShieldCheck,
  User as UserIcon,
  CameraIcon,
} from "lucide-react";
import { Button } from "@/custom/button";
import { Input } from "@/custom/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useProfile } from "@/features/teachers/teacher-base.service";
import {
  useChangePassword,
  useEditProfile,
} from "@/features/teachers/teacher-base.service";
import { ProfileSkeleton } from "@/features/teachers/profile/profile-skeleton";
import { ProfileDetails } from "@/features/teachers/profile/profile-details";
import { TEACHER_SPECIFICATIONS } from "@/features/super-admin/teachers/types";
// import { cn } from "@/lib/utils";

type SpecificationType = keyof typeof TEACHER_SPECIFICATIONS;

export const TProfile = () => {
  const { data, isLoading, error, refetch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [editedData, setEditedData] = useState({
    fullName: "",
    phoneNumber: "",
    experience: "",
    level: "",
    hourPrice: "",
    cardNumber: "",
    specification: "" as SpecificationType | "",
    description: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const profile = data?.data;
  const { mutate: updateProfile, isPending: isUpdating } = useEditProfile();
  const { mutate: changePassword, isPending: isChangingPass } =
    useChangePassword();

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  if (isLoading) return <ProfileSkeleton />;
  if (error || !profile)
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Ma'lumotlarni yuklashda xatolik...
      </div>
    );

  const handleEditClick = () => {
    setEditedData({
      fullName: profile.fullName || "",
      phoneNumber: profile.phoneNumber || "",
      experience: profile.experience || "",
      level: profile.level || "",
      hourPrice: profile.hourPrice?.toString() || "",
      cardNumber: profile.cardNumber || "",
      specification: (profile.specification as SpecificationType) || "",
      description: profile.description || "",
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsChangingPassword(false);
    setAvatarFile(null);
    setAvatarPreview("");
  };

  const handleSaveProfile = () => {
    const payload: any = {
      ...editedData,
      hourPrice: editedData.hourPrice
        ? Number(editedData.hourPrice)
        : undefined,
    };
    const hasAvatar = Boolean(avatarFile);
    const requestData = hasAvatar ? new FormData() : payload;

    if (hasAvatar && avatarFile) {
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined) requestData.append(key, String(value));
      });
      requestData.append("image", avatarFile);
    }

    updateProfile(requestData, {
      onSuccess: () => {
        toast.success("Profil muvaffaqiyatli yangilandi");
        setIsEditing(false);
        setAvatarFile(null);
        setAvatarPreview("");
        refetch();
      },
    });
  };

return (
  <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50/20 to-slate-50 p-4 md:p-10 transition-colors duration-800">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Shaxsiy Kabinet</h1>
          <p className="text-slate-600 mt-2">
            Profilingizni boshqaring va ma'lumotlarni yangilang.
          </p>
        </div>
        {!isEditing && !isChangingPassword && (
          <div className="flex items-center gap-3">
            <Button
              onClick={handleEditClick}
              className="bg-[#20B2AA] hover:bg-teal-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Edit3 className="mr-2 h-4 w-4" /> Tahrirlash
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsChangingPassword(true)}
              className="border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-[#ff9933]/30 transition-all"
            >
              <Lock className="mr-2 h-4 w-4" /> Parol
            </Button>
          </div>
        )}
      </div>

      <Card className="relative overflow-hidden border border-slate-200 shadow-lg bg-white rounded-2xl mb-8">
        <div className="absolute top-0 left-0 h-32 w-full bg-linear-to-r from-[#20B2AA] via-teal-500 to-cyan-500" />

        <div className="relative px-8 pt-16 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="relative group">
              <div className="relative h-32 w-32 rounded-2xl p-1 bg-white shadow-xl ring-4 ring-white">
                <Avatar className="h-full w-full rounded-xl border-2 border-slate-100">
                  <AvatarImage
                    src={avatarPreview || profile?.imageUrl}
                    className="object-cover rounded-xl"
                  />
                  <AvatarFallback className="bg-linear-to-br from-[#20B2AA] to-teal-600 text-white text-3xl font-bold rounded-xl">
                    {profile?.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
                >
                  <CameraIcon className="text-white h-8 w-8" />
                </label>
              </div>

              <div className="absolute -bottom-2 -right-2 flex gap-2">
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (!isEditing) handleEditClick();
                      setAvatarFile(file);
                      setAvatarPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-9 w-9 rounded-xl shadow-md bg-white hover:bg-[#20B2AA] hover:text-white border border-slate-200 transition-all"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => {
                    setAvatarFile(null);
                    setAvatarPreview("");
                  }}
                  className="h-9 w-9 rounded-xl shadow-md bg-red-500 hover:bg-red-600 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <h2 className="text-3xl font-bold text-slate-900">
                  {profile?.fullName}
                </h2>
                <div className="p-1 bg-[#20B2AA]/10 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-[#20B2AA]" />
                </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-600">
                <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                  <Mail className="h-4 w-4 text-[#20B2AA]" /> {profile?.email}
                </span>
                <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                  <UserIcon className="h-4 w-4 text-[#20B2AA]" /> O'qituvchi
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-8 transition-all duration-500">
        {isChangingPassword ? (
          <Card className="border border-slate-200 shadow-lg p-8 bg-white rounded-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200">
              <div className="p-3 bg-linear-to-br from-[#ff9933]/10 to-orange-100/50 rounded-xl border border-[#ff9933]/20">
                <Lock className="h-6 w-6 text-[#ff9933]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Xavfsizlik
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Parolni muntazam yangilab turish xavfsizlikni ta'minlaydi.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold text-sm">
                    Joriy parol
                  </Label>
                  <Input
                    type="password"
                    className="bg-slate-50 border-slate-300 focus:ring-2 focus:ring-[#20B2AA]/30 focus:border-[#20B2AA] transition-all h-11 rounded-lg"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold text-sm">
                    Yangi parol
                  </Label>
                  <Input
                    type="password"
                    className="bg-slate-50 border-slate-300 focus:ring-2 focus:ring-[#20B2AA]/30 focus:border-[#20B2AA] transition-all h-11 rounded-lg"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold text-sm">
                    Parolni tasdiqlang
                  </Label>
                  <Input
                    type="password"
                    className="bg-slate-50 border-slate-300 focus:ring-2 focus:ring-[#20B2AA]/30 focus:border-[#20B2AA] transition-all h-11 rounded-lg"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isChangingPass}
                    className="bg-[#20B2AA] hover:bg-teal-600 text-white w-full md:w-auto h-11 rounded-lg font-medium shadow-sm"
                  >
                    {isChangingPass && (
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    )}{" "}
                    Yangilash
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleCancel}
                    className="h-11 rounded-lg hover:bg-slate-100"
                  >
                    Bekor qilish
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center bg-linear-to-br from-[#20B2AA]/5 to-teal-50/50 rounded-2xl p-8 border border-[#20B2AA]/10">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <ShieldCheck className="h-10 w-10 text-[#20B2AA]" />
                  </div>
                  <p className="text-slate-600 text-sm font-medium max-w-xs">
                    Parol kamida 8 ta belgidan iborat bo'lishi tavsiya etiladi.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="border border-slate-200 shadow-lg bg-white rounded-2xl overflow-hidden animate-in fade-in duration-500">
            <ProfileDetails
              isEditing={isEditing}
              profile={profile}
              editedData={editedData}
              setEditedData={setEditedData}
              isUpdating={isUpdating}
              onSave={handleSaveProfile}
              onCancel={handleCancel}
            />
          </Card>
        )}
      </div>
    </div>
  </div>
);
	
};
