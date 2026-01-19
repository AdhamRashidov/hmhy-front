import API from "@/config/request";
import { useMutation } from "@tanstack/react-query";
import { ADMIN_API, TEACHER_API } from "./api.login";
import type { ILoginResponse, ILoginType, ILoginTypeTeacher } from "./types";
import { useAuth } from "@/hooks/use-auth";
import type { AxiosErrorResponse, TUserRole } from "@/types/types";

export const useLogin = () => {
	const { login } = useAuth();

	return useMutation<ILoginResponse, AxiosErrorResponse, ILoginType>({
		mutationFn: (data: ILoginType) =>
			API.post<ILoginResponse>(ADMIN_API.LOGIN, data).then((res) => res.data),
		onSuccess: (res) => {
			login(res.data.accessToken, res.data.role as TUserRole);
		},
		onError: (error) => {
			console.error("Login xatosi", error.response.data.message);
		}
	});
};

export const useLoginTeacher = () => {

	const { login } = useAuth();

	return useMutation<ILoginResponse, AxiosErrorResponse, ILoginTypeTeacher>({
		mutationFn: (data: ILoginTypeTeacher) =>
			API.post<ILoginResponse>(TEACHER_API.LOGIN, data).then((res) => res.data),
		onSuccess: (res) => {
			login(res.data.accessToken, res.data.role as TUserRole);
		},
		onError: (error) => {
			console.error("Login xatosi", error.response.data.message);
		}
	});
};