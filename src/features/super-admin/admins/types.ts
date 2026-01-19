import type { TUserRole } from "@/types/types"

export interface IAdmin {
	id: string;
	username: string;
	phoneNumber: string;
	role: TUserRole;
	createdAt: string;
	updatedAt: string;
}

export interface CreateAdmin {
	username: string,
	password: string,
	phoneNumber: string
}

export interface CreateAdminResponse {
	statusCode: 201,
	message: {
		uz: string,
		en: string,
		ru: string
	},
	data: {
		id: string,
		createdAt?: string,
		updatedAt?: string,
		username: string,
		password: string,
		phoneNumber: string,
		role: TUserRole
	}
}

export interface GetAdminResponse {
	statusCode: number,
	message: {
		uz: string,
		en: string,
		ru: string
	},
	data: IAdmin[],
}

export interface UpdateAdminResponse {
	statusCode: number,
	message: {
		uz: string,
		en: string,
		ru: string
	},
	data: {
		generatedMaps: [],
		raw: [],
		affected: number
	}
}

export interface DeleteAdminResponse {
	statusCode: number,
	message: {
		uz: string,
		en: string,
		ru: string
	},
	data: {}
}

export interface getMe {
	statusCode: number,
	message: {
		uz: string,
		en: string,
		ru: string
	},
	data: {
		id: string,
		username: string,
		phoneNumber: string,
		role: TUserRole,
		createdAt: string,
		updatedAt: string,
	}
}