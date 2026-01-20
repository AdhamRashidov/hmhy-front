import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { superAdminNavigation } from "@/router/super-admin/super-admin.navigation";
import { AdminNavigation } from "@/router/admin/admin.navigation";
import { Logo } from "@/assets/logo/logo";
import type { TUserRole } from "@/types/types";
import { TeacherNavigation } from "@/router/teacher/teacher.navigation";

export const navigationMap: Partial<Record<TUserRole, any[]>> = {
  SUPERADMIN: superAdminNavigation,
  ADMIN: AdminNavigation,
  TEACHER: TeacherNavigation,
};

export const AppSidebar = ({ role }: { role: TUserRole }) => {
  const location = useLocation();

  const navigation = navigationMap[role] || [];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* 1. Sidebar Tepasi (Logo) */}
      <SidebarHeader className="bg-[#253529] flex items-center justify-center py-3 border-b border-[#999000]">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
      </SidebarHeader>

      {/* 2. Asosiy Menyular qismi */}
      <SidebarContent className="bg-[#253529] pt-3">
        <SidebarGroup className="">
          <SidebarGroupContent className="">
            <SidebarMenu className="">
              {navigation.map((item) => {
                const isActive =
                  location.pathname.toLowerCase() === item.path.toLowerCase();

                return (
                  <SidebarMenuItem key={item.id} className=" text-white">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={`
          h-10 w-full transition-all duration-200
          hover:bg-white/10! hover:text-white!
          data-[active=true]:bg-white/10! data-[active=true]:border-l-5 border-[#20B2AA]
          data-[active=true]:text-white!
        `}
                    >
                      <Link className="gap-3" to={item.path}>
                        {/* Ikonkani komponent sifatida ishlatamiz */}
                        <item.icon
                          className={`h-5! w-5! transition-all ${
                            isActive ? "text-white" : "text-white"
                          }`}
                          strokeWidth={2.5}
                        />
                        <span className="font-medium text-lg font-stretch-110%">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
