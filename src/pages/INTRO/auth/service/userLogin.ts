
import API from "@/config/request";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import type { ILoginResponse, ILoginType } from "@/features/auth/login/types";
import { ADMIN_API } from "@/features/auth/login/api.login";
import type { AxiosErrorResponse } from "@/types/types";

export const UserLogin = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	return useMutation<ILoginResponse, AxiosErrorResponse, ILoginType>({
		mutationFn: (data: ILoginType) =>
			API.post<ILoginResponse>(ADMIN_API.LOGIN, data)
				.then((res) => res.data),

		onSuccess: (res) => {
			login(res.data.accessToken, res.data.role);

			navigate("/app");
		},
	})
};