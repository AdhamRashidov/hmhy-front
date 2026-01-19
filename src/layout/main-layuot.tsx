import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar, navigationMap } from "./sidebar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LogoutButton } from "@/custom/logOut-button";
import { User2 } from "lucide-react";
import type { TUserRole } from "@/types/types";
import { getPageLabel } from "@/utils/get-page-label";
import { Header } from "@/components/common/header";

export const MainLayuot = () => {
  const location = useLocation();
  const role = localStorage.getItem("userRole") as TUserRole;
  const username = localStorage.getItem("userName");

  const navigation = navigationMap[role] || [];
  const currentLabel = getPageLabel(navigation, location.pathname);

  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar role={role as any} />
          <main className="flex-1 overflow-y-auto">
            <div className="flex justify-between items-center bg-[#1a1110] text-white h-16 px-5 ">
              <div className="flex items-center gap-5 text-xl font-bold font-stretch-110%">
                <SidebarTrigger size={"lg"} />
                <h1>
                  {role === "TEACHER"
                    ? "Teacher Panel"
                    : role === "STUDENT"
                    ? "Student Panel"
                    : "Admin Panel"}
                </h1>
              </div>

              <div className="flex items-center justify-between gap-5">
                <Link to={`/app/${role}/profile`}>
                  <div className="flex items-center justify-between gap-2 hover:bg-white/20 px-3 py-2 rounded-md hover:cursor-pointer transition-all duration-200">
                    <span>
                      <User2 size={17} color="#fff000" />
                    </span>
                    <h1 className="text-white/80 font-semibold">{username}</h1>
                    <h2 className="py-1 px-3 bg-[#20B2AA] rounded-sm text-sm">
                      {role}
                    </h2>
                  </div>
                </Link>
                <div className="active:animate-spin transform-3d transition-all hover:rotate-180">
                  <LogoutButton />
                </div>
              </div>
            </div>

            <div>
              <Header label={currentLabel} path={location.pathname} />
            </div>

            <div>
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};
