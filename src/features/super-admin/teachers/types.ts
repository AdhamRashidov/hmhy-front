export interface Teacher {
	id: string;
	name: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	imageUrl: string;
	isActive: boolean;
	status: string;
	language: string;
	specification: TeacherSpecification | null;
	level: TeacherLevel | null;
	description: string | null;
	hourPrice: number | null;
	price: number;
	rating: string;
	experience: string | null;
	portfolioLink: string | null;
	lessonsCount: number;
	createdAt: string;
	updatedAt: string;
}

export const TEACHER_SPECIFICATIONS = {
	ENGLISH: "ENGLISH",
	RUSSIAN: "RUSSIAN",
	DEUTSCH: "DEUTSCH",
	SPANISH: "SPANISH",
	FRENCH: "FRENCH",
	ITALIAN: "ITALIAN",
	JAPANESE: "JAPANESE",
	CHINESE: "CHINESE",
	ARABIC: "ARABIC",
	KOREAN: "KOREAN",
} as const;

export type TeacherSpecification = keyof typeof TEACHER_SPECIFICATIONS;
export const TEACHER_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type TeacherLevel = (typeof TEACHER_LEVELS)[number];

export type SortField = 'fullName' | 'rating' | 'createdAt' | 'hourPrice';
export type SortOrder = 'ASC' | 'DESC';

export interface TeacherFilters {
	search?: string;
	specification?: TeacherSpecification | '';
	level?: string;
	minRating?: number;
	maxRating?: number;
	minPrice?: number;
	maxPrice?: number;
	isActive?: boolean;
	sortBy?: SortField;
	sortOrder?: SortOrder;
	page?: number;
	limit?: number;
}