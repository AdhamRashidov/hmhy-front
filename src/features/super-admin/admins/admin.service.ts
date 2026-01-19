import type { CreateAdmin, CreateAdminResponse, DeleteAdminResponse, GetAdminResponse, getMe, IAdmin, UpdateAdminResponse } from "./types";
import { API_ADMINS } from "./api.admins";
import API from "@/config/request";

export const AdminService = {
	// barcha adminlarni olish 
	getAdmins: async (search?: string): Promise<GetAdminResponse> => {
		const res = await API.get<GetAdminResponse>(API_ADMINS.ADMINS, {
			params: { search: search || undefined }
		});
		return res.data
	},

	// Yangi admin qo'shish
	createAdmin: async (data: CreateAdmin): Promise<CreateAdminResponse> => {
		const res = await API.post<CreateAdminResponse>(API_ADMINS.ADMINS, data);
		return res.data;
	},

	// Adminni o'chirish
	deleteAdmin: async (id: string): Promise<DeleteAdminResponse> => {
		const res = await API.delete(API_ADMINS.ADMIN_BY_ID(id));
		return res.data;
	},

	// Admin by id (details)
	getAdminById: async (id: string): Promise<IAdmin> => {
		const res = await API.get(API_ADMINS.ADMIN_BY_ID(id));
		return res.data;
	},

	// 2. Admin update
	updateAdmin: async (id: string, data: Partial<CreateAdmin>): Promise<UpdateAdminResponse> => {
		const res = await API.patch(API_ADMINS.ADMIN_BY_ID(id), data);
		return res.data;
	},

	// Joriy admin ma'lumotlarini olish (Profile uchun)
	getMe: async (): Promise<getMe> => {
		const res = await API.get<getMe>(API_ADMINS.ME); 
		return res.data;
	},
}