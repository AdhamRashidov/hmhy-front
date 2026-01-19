import type { RouteObject } from "react-router-dom";

import { Dashboard } from "@/pages/super-admin/home/dashboard";
import { Admins } from "@/pages/super-admin/admins/admins";
import { Teachers } from "@/pages/super-admin/teachers/teachers";
import { Students } from "@/pages/super-admin/students/students";
import { Lessons } from "@/pages/super-admin/lessons/lessons";
import { Payments } from "@/pages/super-admin/payments/payments";
import { Earnings } from "@/pages/super-admin/earnings/earnings";
import { Profile } from "@/pages/super-admin/profile/profile";

export const superAdminRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "admins",
    element: <Admins />,
  },
  {
    path: "teachers",
    element: <Teachers />,
  },
  {
    path: "students",
    element: <Students />,
  },
  {
    path: "lessons",
    element: <Lessons />,
  },
  {
    path: "payments",
    element: <Payments />,
  },
  {
    path: "earnings",
    element: <Earnings />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
];
