import { TDashboard } from "@/pages/teacher/home/dashboard";
import { TLessons } from "@/pages/teacher/lessons/lessons";
import { TProfile } from "@/pages/teacher/profile/profile";
import { TStudents } from "@/pages/teacher/students/students";
import type { RouteObject } from "react-router-dom";

export const TeacherRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <TDashboard />,
  },
  {
    path: "students",
    element: <TStudents />,
  },
  {
    path: "lessons",
    element: <TLessons />,
  },
  {
    path: "profile",
    element: <TProfile />,
  },
];
