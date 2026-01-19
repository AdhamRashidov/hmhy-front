import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminService } from "./admin.service";
import type { CreateAdmin, getMe } from "./types";
import { toast } from "sonner";
import type { AxiosErrorResponse } from "@/types/types";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export const useAdmins = () => {
	const [searchParams] = useSearchParams();
	const search = searchParams.get("search")?.toLowerCase() || "";
	const queryClient = useQueryClient();

	const adminQuery = useQuery({
		queryKey: ["admins"],
		queryFn: () => AdminService.getAdmins(),
	});

	// Filterlash search uchun
	const filteredAdmins = useMemo(() => {
		const allAdmins = adminQuery.data?.data || [];

		if (!search) return allAdmins;

		return allAdmins.filter((admin) => {
			return (
				admin.username.toLowerCase().includes(search) ||
				admin.phoneNumber.includes(search)
			);
		});
	}, [adminQuery.data, search])

	const toastStyles = {
		success: {
			position: 'top-center' as const,
			style: { color: 'green' }
		},
		error: {
			position: 'top-center' as const,
			style: { color: 'red' }
		}
	};

	// Adminlarni Id bo'yicha olish GET
	const getAdminById = (id: string) => {
		return useQuery({
			queryKey: ["admin", id],
			queryFn: () => AdminService.getAdminById(id),
			enabled: !!id,
			staleTime: 5 * 60 * 1000,
		});
	}

	// Yangi admin qo'shish POST
	const createAdmins = () =>
		useMutation({
			mutationFn: (data: CreateAdmin) => AdminService.createAdmin(data),
			onSuccess: (res) => {
				// admin qo'shilgandan keyin jadvalni yangilash
				queryClient.invalidateQueries({ queryKey: ["admins"] });
				toast.success(res.message.uz, toastStyles.success);
			},
			onError: (error: AxiosErrorResponse) => {
				toast.error(error.response.data.message || "Admin qo'shishda xatolik yuz berdi!", toastStyles.error);
			}
		});

	// Adminni o'chirish DELETE
	const deleteAdmin = () =>
		useMutation({
			mutationFn: (id: string) => AdminService.deleteAdmin(id),
			onSuccess: (res) => {
				queryClient.invalidateQueries({ queryKey: ["admins"] });
				toast.success(res.message.uz, toastStyles.success);
			},
			onError: (error: AxiosErrorResponse) => {
				toast.error(error.response.data.message || "O'chirishda xatolik yuz berdi", toastStyles.error);
			}
		});

	// Adminni tahrirlash PATCH
	const updateAdmin = () =>
		useMutation({
			mutationFn: ({ id, data }: { id: string; data: any }) =>
				AdminService.updateAdmin(id, data),
			onSuccess: (res) => {
				queryClient.invalidateQueries({ queryKey: ["admins"] });
				toast.success(res.message.uz || "Ma'lumotlar yangilandi", toastStyles.success);
			},
			onError: (err: AxiosErrorResponse) => {
				const errorMsg = err.response?.data?.message || "Yangilashda xatolik";
				toast.error(errorMsg, toastStyles.error);
			}
		});

	const getMe = () => {
		return useQuery<getMe>({
			queryKey: ["admin", "me"],
			queryFn: () => AdminService.getMe(),
			staleTime: 1000 * 60 * 5, // 5 daqiqa davomida ma'lumotni "yangi" deb hisoblaydi
		});
	};


	return {
		admins: filteredAdmins,
		isLoading: adminQuery.isLoading,
		isError: adminQuery.isError,
		refetch: adminQuery.refetch,
		getAdminById,
		createAdmins,
		deleteAdmin,
		updateAdmin,
		getMe,
	}
}