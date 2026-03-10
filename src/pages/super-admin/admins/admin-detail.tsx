import { Badge } from "@/components/ui/badge";
import { useAdmins } from "@/features/super-admin/admins/useAdmins";
import { CopyButton } from "@/utils/copyButton";
import { formatDate } from "@/utils/time-format";

export const AdminDetailsContent = ({ adminId }: { adminId: string }) => {
  const { getAdminById } = useAdmins();
  const { data, isLoading, isError } = getAdminById(adminId);

  if (isLoading)
    return (
      <div className="py-10 text-center text-sm text-gray-500">
        Yuklanmoqda...
      </div>
    );
  if (isError)
    return (
      <div className="py-10 text-center text-sm text-red-500">
        Ma'lumot topilmadi.
      </div>
    );

  const admin = (data as any)?.data; // Backenddan kelayotgan admin obyekti

  if (!admin || !admin.username) {
    return (
      <div className="py-10 text-center">
        Ma'lumot topilmadi (Struktura xato)
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 text-sm">
      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="text-chart-3 text-[15px] font-bold font-stretch-105%">
            Username:
          </span>
          <div className="flex items-center">
            <span className="text-[15px] font-bold font-stretch-105%">
              {admin?.username}
            </span>
            <CopyButton text={admin?.username} />
          </div>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-chart-3 text-[15px] font-bold font-stretch-105%">
            Telefon:
          </span>
          <div className="flex items-center">
            <span className="text-[15px] font-bold font-stretch-105%">
              {admin?.phoneNumber}
            </span>
            <CopyButton text={admin?.phoneNumber} />
          </div>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-chart-3 text-[15px] font-bold font-stretch-105%">
            Roli:
          </span>
          <Badge className="font-bold font-stretch-105% text-md px-2">
            {admin?.role}
          </Badge>
        </div>
      </div>

      <div className="pt-4 space-y-4 bg-gray-50 p-4 rounded-lg border border-dashed shadow-md">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-400 uppercase">
            Yaratilgan vaqti:
          </span>
          <span className="font-semibold text-gray-700">
            {formatDate(admin?.createdAt)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-400 uppercase">
            Oxirgi tahrirlash:
          </span>
          <span className="font-semibold text-gray-700">
            {formatDate(admin?.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};
