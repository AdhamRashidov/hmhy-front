import type { TUserRole } from "@/types/types";
import type { SortOrder, TeacherSpecification } from "../../teachers/types";

export const LessonStatus = {
	AVAILABLE: 'AVAILABLE',
	BOOKED: 'BOOKED',
	COMPLETED: 'COMPLETED',
	CANCELLED: 'CANCELLED',
} as const;

export type LessonStatus = typeof LessonStatus[keyof typeof LessonStatus];

export const AuthProvider = {
	LOCAL: 'LOCAL',
	GOOGLE: 'GOOGLE',
} as const;

export type AuthProvider = typeof AuthProvider[keyof typeof AuthProvider];

export interface Lesson {
	id: string;
	name: string;
	startTime: string;
	endTime: string;
	teacherId: string;
	studentId?: string;
	googleMeetUrl?: string;
	status: LessonStatus;
	googleEventId?: string;
	price: number;
	isPaid: boolean;
	bookedAt?: string;
	completedAt?: string;
	createdAt: string;
	updatedAt: string;
	teacher?: Teacher;
	student?: Student;
}

export interface LessonFilters {
	teacherId?: string;
	studentId?: string;
	status?: LessonStatus | '';
	dateFrom?: string;
	dateTo?: string;
	isPaid?: boolean;
	sortBy?: 'startTime' | 'price' | 'createdAt';
	sortOrder?: SortOrder;
	page?: number;
	limit?: number;
}

export interface Student {
	id: string;
	lastName: string;
	firstName: string;
	phoneNumber?: string;
	role: TUserRole;
	tgId?: string;
	tgUsername?: string;
	isBlocked: boolean;
	blockedAt?: Date;
	blockedReason?: string;
	email?: string;
	createdAt: string;
	updatedAt: string;
}

export interface Teacher {
	id: string;
	email: string;
	phoneNumber: string;
	fullName: string;
	cardNumber?: string;
	isActive?: boolean;
	authProvider?: AuthProvider;
	isDelete?: boolean;
	isComplete?: boolean;
	role?: TUserRole;
	specification?: TeacherSpecification;
	level?: string;
	description?: string;
	hourPrice?: number;
	portfolioLink?: string;
	imageUrl?: string;
	rating: number;
	experience?: string;
	createdAt?: string;
	updatedAt?: string;
	lessonsCount?: number;
}

export interface LessonsResponse {
	data: Lesson[];
	currentPage: number;
	totalPages: number;
	totalElements: number;
	pageSize: number;
	from: number;
	to: number;
}