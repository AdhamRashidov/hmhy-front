// import type { ReactNode, ComponentType, SVGProps } from "react";
//. hozircha kerak emas lekin kerak bo'lib qolishi munkin
// export type TIconType = ComponentType<SVGProps<SVGSVGElement>> | ComponentType<any>;

export type TUserRole = "SUPERADMIN" | "ADMIN" | "TEACHER" | "STUDENT"

export interface AxiosErrorResponse {
	code: string;
	config: object;
	message: string;
	name: string;
	request: object;
	response: {
		config: object;
		data: {
			statusCode: number;
			message: string;
			timestamp: string;
			path: string;
			method: string;
		},
		headers: object;
		request: object;
		status: number;
		statusText: string;
	},
	status: number;
	stack: string;
} 