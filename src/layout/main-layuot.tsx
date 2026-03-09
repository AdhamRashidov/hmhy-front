import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar, navigationMap } from "./sidebar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LogoutButton } from "@/custom/logOut-button";
import { User2 } from "lucide-react";
import type { TUserRole } from "@/types/types";
import { getPageLabel } from "@/utils/get-page-label";
import { Header } from "@/components/common/header";
import { useProfile } from "@/features/teachers/teacher-base.service";

export const MainLayuot = () => {
  const location = useLocation();
  const role = localStorage.getItem("userRole") as TUserRole;
  const username = localStorage.getItem("userName");

  const navigation = navigationMap[role] || [];
  const currentLabel = getPageLabel(navigation, location.pathname);

  const { data } = useProfile();

//   return (
//     <>
//       <SidebarProvider>
//         <div className="flex h-screen w-full">
//           <AppSidebar role={role as any} />
//           <main className="flex-1 overflow-y-auto">
//             <div className="flex justify-between items-center bg-[#1a1110] text-white h-16 px-5 ">
//               <div className="flex items-center gap-5 text-xl font-bold font-stretch-110%">
//                 <SidebarTrigger size={"lg"} />
//                 <h1>
//                   {role === "TEACHER"
//                     ? "Teacher Panel"
//                     : role === "STUDENT"
//                       ? "Student Panel"
//                       : "Admin Panel"}
//                 </h1>
//               </div>

//               <div className="flex items-center justify-between gap-5">
//                 <Link to={`/app/${role}/profile`}>
//                   <div className="flex items-center justify-between gap-2 hover:bg-white/20 px-3 py-2 rounded-md hover:cursor-pointer transition-all duration-200">
//                     <span>
//                       <User2 size={17} color="#fff000" />
//                     </span>

//                     {role === "TEACHER" ? (
//                       <h1 className="text-white/80 font-semibold">
//                         {data?.data?.fullName || "Teacher profile sozlanmagan..."}
//                       </h1>
//                     ) : (
//                       <h1 className="text-white/80 font-semibold">
//                         {username}
//                       </h1>
//                     )}

//                     <h2 className="py-1 px-3 bg-[#20B2AA] rounded-sm text-sm">
//                       {role}
//                     </h2>
//                   </div>
//                 </Link>
//                 <div className="active:animate-spin transform-3d transition-all hover:rotate-180">
//                   <LogoutButton />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <Header label={currentLabel} path={location.pathname} />
//             </div>

//             <div>
//               <Outlet />
//             </div>
//           </main>
//         </div>
//       </SidebarProvider>
//     </>
//   );
	
return (
  <>
    <SidebarProvider>
      <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
        <AppSidebar role={role as any} />

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="flex items-center justify-between bg-[#1a1110] text-white h-16 px-3 sm:px-5 shrink-0 z-20 shadow-md">
            <div className="flex items-center gap-2 sm:gap-5 min-w-0">
              <div className="hover:bg-white/20 p-1 rounded-lg transition-colors shrink-0">
                <SidebarTrigger className="h-8 w-8 sm:h-9 sm:w-9" />
              </div>
              <h1 className="text-base sm:text-xl font-bold truncate">
                {role === "TEACHER"
                  ? "Teacher Panel"
                  : role === "STUDENT"
                    ? "Student Panel"
                    : "Admin Panel"}
              </h1>
            </div>

            {/* O'ng qism: Profil va Logout */}
            <div className="flex items-center gap-2 sm:gap-5 shrink-0">
              <Link to={`/app/${role}/profile`} className="block min-w-0">
                <div className="flex items-center gap-2 hover:bg-white/20 px-2 sm:px-3 py-2 rounded-md hover:cursor-pointer transition-all duration-200 group">
                  <div className="shrink-0">
                    <User2
                      size={17}
                      className="text-[#fff000] group-hover:scale-110 transition-transform"
                    />
                  </div>

                  <div className="hidden min-[380px]:block">
                    {role === "TEACHER" ? (
                      <h1 className="text-white/80 font-semibold truncate max-w-25 sm:max-w-37.5">
                        {data?.data?.fullName ||
                          "Teacher profile sozlanmagan..."}
                      </h1>
                    ) : (
                      <h1 className="text-white/80 font-semibold truncate max-w-25 sm:max-w-37.5">
                        {username}
                      </h1>
                    )}
                  </div>

                  <h2 className="py-1 px-2 sm:px-3 bg-[#20B2AA] rounded-sm text-[10px] sm:text-sm font-bold shrink-0">
                    {role}
                  </h2>
                </div>
              </Link>

              <div className="active:animate-spin transform-3d transition-all hover:rotate-180 shrink-0">
                <LogoutButton />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
            <div className="sticky top-0 z-10">
              <Header label={currentLabel} path={location.pathname} />
            </div>

            {/* Asosiy Content */}
            <div className="p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  </>
);
};
