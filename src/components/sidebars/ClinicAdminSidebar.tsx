
import { Sidebar, SidebarFooter, SidebarHeader, SidebarContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  UserRound, 
  Stethoscope, 
  CalendarDays, 
  Settings, 
  ChevronLeft,
  MessagesSquare,
  Plug
} from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { useUserProfile } from "@/hooks/useUserProfile";

interface ClinicAdminSidebarProps {
  clinicName?: string;
}

export function ClinicAdminSidebar({ clinicName }: ClinicAdminSidebarProps) {
  const location = useLocation();
  const { profile } = useUserProfile();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  // Use provided clinicName or fall back to profile.clinic_name
  const displayName = clinicName || profile?.clinic_name || "Медицинская CRM";
  
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="pb-0">
        <div className="px-4 py-5">
          <div className="flex items-center">
            <div className="bg-primary h-8 w-8 flex items-center justify-center rounded text-white font-semibold mr-3">
              MC
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="text-lg font-semibold text-foreground truncate">
                {displayName}
              </h3>
              <p className="text-xs text-muted-foreground">
                Панель администратора
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <nav className="flex flex-col gap-0.5 px-2">
          <Button 
            variant={isActive("/clinic-admin") ? "default" : "ghost"} 
            className="justify-start"
            asChild
          >
            <Link to="/clinic-admin">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Дашборд
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/clinic-admin/doctors") ? "default" : "ghost"} 
            className="justify-start"
            asChild
          >
            <Link to="/clinic-admin/doctors">
              <UserRound className="h-4 w-4 mr-2" />
              Врачи
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/clinic-admin/services") ? "default" : "ghost"} 
            className="justify-start"
            asChild
          >
            <Link to="/clinic-admin/services">
              <Stethoscope className="h-4 w-4 mr-2" />
              Услуги
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/clinic-admin/schedule") ? "default" : "ghost"} 
            className="justify-start"
            asChild
          >
            <Link to="/clinic-admin/schedule">
              <CalendarDays className="h-4 w-4 mr-2" />
              Расписание
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/clinic-admin/chat") ? "default" : "ghost"} 
            className="justify-start"
            asChild
          >
            <span className="flex items-center text-muted-foreground">
              <MessagesSquare className="h-4 w-4 mr-2" />
              Чат
              <span className="ml-auto bg-background text-muted-foreground text-xs py-0.5 px-1.5 rounded-sm">Скоро</span>
            </span>
          </Button>
          
          <Button 
            variant={isActive("/clinic-admin/integrations") ? "default" : "ghost"} 
            className="justify-start"
            asChild
          >
            <Link to="/clinic-admin/integrations">
              <Plug className="h-4 w-4 mr-2" />
              Интеграции
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/clinic-admin/settings") ? "default" : "ghost"} 
            className="justify-start"
            asChild
          >
            <Link to="/clinic-admin/settings">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </Link>
          </Button>
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 pb-4">
          <LogoutButton 
            variant="outline" 
            className="w-full justify-start"
          />
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <Link to="/">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
