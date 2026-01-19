import type { RouteObject } from "react-router-dom";

import { ADashboard } from "@/pages/admin/home/dashboard";
import { ATeaches } from "@/pages/admin/teachers/teaches";
import { AStudents } from "@/pages/admin/students/students";
import { ALessons } from "@/pages/admin/lessons/lessons";
import { APayments } from "@/pages/admin/payments/payments";
import { AEarnings } from "@/pages/admin/earnings/earnings";
import { AProfile } from "@/pages/admin/profile/profile";

export const AdminRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <ADashboard />,
  },
  {
    path: "teachers",
    element: <ATeaches />,
  },
  {
    path: "students",
    element: <AStudents />,
  },
  {
    path: "lessons",
    element: <ALessons />,
  },
  {
    path: "payments",
    element: <APayments />,
  },
  {
    path: "earnings",
    element: <AEarnings />,
  },
  {
    path: "profile",
    element: <AProfile />,
  },
];
