import type { TUserRole } from "@/types/types";

export interface ILoginType {
	username: string;
	password: string;
	role?: string;
}

export interface ILoginResponse {
	statusCode: number;
	message: {
		uz: string;
		en: string;
		ru: string;
	},
	data: {
		accessToken: string;
		role: TUserRole;
	}
}

export interface ILoginTypeTeacher {
	email: string;
	password: string;
	role?: string;
}

// export interface IErrorResponse {
// 	statusCode: number,
// 	message: string,
// 	timestamp: string,
// 	path: string,
// 	method: string,
// }
