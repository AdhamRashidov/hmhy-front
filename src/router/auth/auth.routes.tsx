import type { RouteObject } from "react-router-dom";
import { Login } from "@/pages/INTRO/auth/login";
import { AuthPaths } from "./auth.paths";
import { TeacherLogin } from "@/pages/INTRO/auth/teacherLogin";
import { StudentLogin } from "@/pages/INTRO/auth/studentLogin";

export const authRoutes: RouteObject[] = [
  {
    path: AuthPaths.LOGIN,
    element: <Login />,
  },
  {
    path: AuthPaths.TEACHER_LOGIN,
    element: <TeacherLogin />,
  },
  {
    path: AuthPaths.STUDENT_LOGIN,
    element: <StudentLogin />,
  },
];
