import API from "@/config/request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLessonsList = (status: string, date?: string) => {
	return useQuery({
		queryKey: ["lessonsList", status, date],
		queryFn: () =>
			API
				.get("/lessons/for-teacher", {
					params: {
						status:
							status === "all" ? undefined : status.toUpperCase(),
						date: date || undefined,
					},
				})
				.then((res) => res.data),
	});
};

export const useCreateLesson = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: any) => API.post("/lessons", data),

		onSuccess: () => {
			toast.success("Dars muvaffaqiyatli yaratildi!", {
				position: "top-right",
			});
			queryClient.invalidateQueries({ queryKey: ["lessonsList"] });
		},

		onError: (error: any) => {
			const errorMessage = error?.response?.data?.message;

			if (errorMessage?.includes("oauth2.googleapis.com")) {
				toast.error("Google tizimi bilan bog'lanishda xatolik!", {
					description:
						"Iltimos, qaytadan urinib ko'ring yoki Google hisobingizni tekshiring.",
					duration: 5000,
					position: "top-right",
				});
			} else if (errorMessage) {
				toast.error(errorMessage, { position: "top-right" });
			} else {
				toast.error(
					"Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
					{ position: "top-right" }
				);
			}
		},
	});
};

export const useProfile = () => {
	return useQuery({
		queryKey: ["me"],
		queryFn: () => API.get("/teacher/me").then((res) => res.data),
	});
};

export const useEditProfile = () => {
	return useMutation({
		mutationFn: (data: any) => API.patch("/teacher/update", data),
	});
};

export const useChangePassword = () => {
	return useMutation({
		mutationFn: (data: any) =>
			API.patch("/teacher/changePassword", data),
	});
};

export const useLessonsStats = () => {
	return useQuery({
		queryKey: ["stats"],
		queryFn: () => API.get("/lessons/stats").then((res) => res.data),
	});
};