import API from "@/config/request";
import type { AxiosErrorResponse } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { TeacherFilters } from "./types";
import type { LessonFilters, LessonsResponse } from "../lessons/types/types";

const TEACHER_KEYS = {
	list: ["teacherList"],
	deleted: ["teachers", "deleted"],
};

// 1. O'chirilganlar ro'yxatini olish (GET /api/v1/teacher/deleted)
export const useDeletedTeachers = (search: string) => {
	return useQuery({
		queryKey: [...TEACHER_KEYS.deleted, search],
		queryFn: () =>
			API.get("/teacher/deleted", {
				params: { search: search || undefined },
			}).then((res) => res.data),
	});
};

// 2. Qayta tiklash (PATCH /api/v1/teacher/restore/{id})
export const useRestoreTeacher = () => {
	const queryClient = useQueryClient();

	return useMutation<any, AxiosErrorResponse, string>({
		mutationFn: (id: string) => API.patch(`/teacher/restore/${id}`),
		onSuccess: () => {
			// Ikkala ro'yxatni ham yangilash (Arxivdan ketadi, asosiy ro'yxatga keladi)
			queryClient.invalidateQueries({ queryKey: TEACHER_KEYS.deleted });
			queryClient.invalidateQueries({ queryKey: TEACHER_KEYS.list });
			toast.success("Ustoz muvaffaqiyatli qayta tiklandi");
		},
		onError: (error: AxiosErrorResponse) => {
			toast.error(error.response?.data?.message || "Qayta tiklashda xatolik yuz berdi");
		},
	});
};

// 3. Batamom o'chirib yuborish (DELETE /api/v1/teacher/hard-delete/{id})
export const useHardDeleteTeacher = () => {
	const queryClient = useQueryClient();

	return useMutation<any, AxiosErrorResponse, string>({
		mutationFn: (id: string) => API.delete(`/teacher/hard-delete/${id}`),
		onSuccess: () => {
			// Faqat o'chirilganlar ro'yxatini yangilash yetarli
			queryClient.invalidateQueries({ queryKey: TEACHER_KEYS.deleted });
			toast.success("Ustoz tizimdan butunlay o'chirildi");
		},
		onError: (error: AxiosErrorResponse) => {
			toast.error(error.response?.data?.message || "Butunlay o'chirishda xatolik yuz berdi");
		},
	});
};

// 4. Soft delete - Arxivga (qabristonga) jo'natish (PATCH /api/v1/teacher/soft-delete/{id})
export const useDeleteTeacher = () => {
	const queryClient = useQueryClient();

	return useMutation<any, AxiosErrorResponse, { id: string; reason: string }>({
		mutationFn: ({ id, reason }) =>
			API.patch(`/teacher/soft-delete/${id}`, { reason }),
		onSuccess: () => {
			// Asosiy ro'yxatdan o'chadi va arxiv ro'yxatida paydo bo'ladi
			queryClient.invalidateQueries({ queryKey: TEACHER_KEYS.list });
			queryClient.invalidateQueries({ queryKey: TEACHER_KEYS.deleted });
			toast.success("Ustoz arxivga muvaffaqiyatli yuborildi");
		},
		onError: (error: AxiosErrorResponse) => {
			toast.error(error.response?.data?.message || "O'chirishda xatolik yuz berdi");
		},
	});
};

// 5. GET all teachers 
export const useTeacherList = (filters?: TeacherFilters) => {
	return useQuery({
		queryKey: ["teacherList", filters],
		queryFn: () => API.get("/teacher", {
			params: filters
		}).then((res) => res.data),
	});
};

// 6. GET teacher by id
export const useTeacher = (id: string) => {
	return useQuery({
		queryKey: ["teacher", id],
		queryFn: () => API.get(`/teacher/${id}`).then((res) => res.data),
	});
};

// 7. PATCH teacher update
export const useEditTeacher = () => {
	return useMutation<any, AxiosErrorResponse, { id: string; data: any }>({
		mutationFn: ({ id, data }: { id: string; data: any }) =>
			API.patch(`/teacher/${id}`, data),
	});
};

// 8. PATCH teacher activate
export const useChangeTeacherStatus = () => {
	const queryClient = useQueryClient()

	return useMutation<any, AxiosErrorResponse, string>({
		mutationFn: (id: string) =>
			API.patch(`/teacher/activate/${id}`).then(res => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [TEACHER_KEYS.list] })
		},
	})
}

export const useTeacherLessons = (
	teacherId: string,
	filters?: LessonFilters,
	enabled: boolean = true
) => {
	return useQuery({
		queryKey: ['teacher-lessons', teacherId, filters],
		queryFn: () =>
			API
				.get<LessonsResponse>(`/lessons/${teacherId}/lessons`, { params: filters })
				.then((res) => res.data),
		enabled: enabled && !!teacherId,
		placeholderData: (prev) => prev,
	});
};