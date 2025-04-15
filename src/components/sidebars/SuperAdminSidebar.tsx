
import { Sidebar, SidebarFooter, SidebarHeader, SidebarContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building2, 
  FileBarChart, 
  Plug, 
  CreditCard, 
  ChevronLeft
} from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";

export function SuperAdminSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
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
                Медицинская CRM
              </h3>
              <p className="text-xs text-muted-foreground">
                Панель супер администратора
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <nav className="flex flex-col gap-0.5 px-2">
          <Button 
            variant={isActive("/super-admin") ? "default" : "ghost"} 
            className="justify-start"
            asChild
          >
            <Link to="/super-admin">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Дашборд
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/super-admin/clinics") ? "default" : "ghost"} 
            className="justify-start"
            asChild
          >
            <Link to="/super-admin/clinics">
              <Building2 className="h-4 w-4 mr-2" />
              Клиники
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/super-admin/subscriptions") ? "default" : "ghost"} 
            className="justify-start"
            asChild
          >
            <Link to="/super-admin/subscriptions">
              <CreditCard className="h-4 w-4 mr-2" />
              Подписки
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/super-admin/integrations") ? "default" : "ghost"} 
            className="justify-start"
            asChild
          >
            <Link to="/super-admin/integrations">
              <Plug className="h-4 w-4 mr-2" />
              Интеграции
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/super-admin/reports") ? "default" : "ghost"} 
            className="justify-start"
            asChild
          >
            <Link to="/super-admin/reports">
              <FileBarChart className="h-4 w-4 mr-2" />
              Отчеты
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
