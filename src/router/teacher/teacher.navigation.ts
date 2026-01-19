import { BookOpen, GraduationCap, Home, User2 } from "lucide-react";
import { TeacherPaths } from "./teacher.paths";

export const TeacherNavigation = [
	{
		id: "dashboard",
		label: "Dashboard",
		path: TeacherPaths.DASHBOARD,
		icon: Home,
	},
	{
		id: "students",
		label: "Students",
		path: TeacherPaths.STUDENTS,
		icon: GraduationCap,
	},
	{
		id: "lessons",
		label: "Lessons",
		path: TeacherPaths.LESSONS,
		icon: BookOpen,
	},
	{
		id: "profile",
		label: "Profile",
		path: TeacherPaths.PROFILE,
		icon: User2,
	}
]