import { BookOpen, GraduationCap, Home, Shield, User, Users2, WalletCardsIcon, WalletIcon } from "lucide-react";
import { SuperAdminPaths } from "./super-admin.paths";

export const superAdminNavigation = [
	{
		id: "dashboard",
		label: "Dashboard",
		path: SuperAdminPaths.DASHBOARD,
		icon: Home,
	},
	{
		id: "admins",
		label: "Admins",
		path: SuperAdminPaths.ADMINS,
		icon: Shield,
	},
	{
		id: "teachers",
		label: "Teachers",
		path: SuperAdminPaths.TEACHERS,
		icon: Users2,
	},
	{
		id: "students",
		label: "Students",
		path: SuperAdminPaths.STUDENTS,
		icon: GraduationCap,
	},
	{
		id: "lessons",
		label: "Lessons",
		path: SuperAdminPaths.LESSONS,
		icon: BookOpen,
	},
	{
		id: "payments",
		label: "Payments",
		path: SuperAdminPaths.PAYMENTS,
		icon: WalletCardsIcon,
	},
	{
		id: "earnings",
		label: "Earnings",
		path: SuperAdminPaths.EARNINGS,
		icon: WalletIcon,
	},
	{
		id: "profile",
		label: "Profile",
		path: SuperAdminPaths.PROFILE,
		icon: User,
	},
]