import { BookOpen, GraduationCap, Home, User, Users2, WalletCardsIcon, WalletIcon } from "lucide-react";
import { AdminPaths } from "./admin.paths";

export const AdminNavigation = [
	{
		id: "dashboard",
		label: "Dashboard",
		path: AdminPaths.DASHBOARD,
		icon: Home,
	},
	{
		id: "teachers",
		label: "Teachers",
		path: AdminPaths.TEACHERS,
		icon: Users2,
	},
	{
		id: "students",
		label: "Students",
		path: AdminPaths.STUDENTS,
		icon: GraduationCap,
	},
	{
		id: "lessons",
		label: "Lessons",
		path: AdminPaths.LESSONS,
		icon: BookOpen,
	},
	{
		id: "payments",
		label: "Payments",
		path: AdminPaths.PAYMENTS,
		icon: WalletCardsIcon,
	},
	{
		id: "earnings",
		label: "Earnings",
		path: AdminPaths.EARNINGS,
		icon: WalletIcon,
	},
	{
		id: "profile",
		label: "Profile",
		path: AdminPaths.PROFILE,
		icon: User,
	},
]