import { useLocation } from "react-router-dom";
import { 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard,
  ClipboardList, 
  FileSpreadsheet,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

// Simplified navigation items - keeping only Dashboard, Doctors and Services
const navItems = [
  { icon: <LayoutDashboard className="mr-2 h-4 w-4" />, label: "Дашборд", href: "/clinic-admin" },
  { icon: <ClipboardList className="mr-2 h-4 w-4" />, label: "Врачи", href: "/clinic-admin/doctors" },
  { icon: <FileSpreadsheet className="mr-2 h-4 w-4" />, label: "Услуги", href: "/clinic-admin/services" },
];

type ClinicAdminSidebarProps = {
  clinicName: string;
};

export function ClinicAdminSidebar({ clinicName }: ClinicAdminSidebarProps) {
  const location = useLocation();
  
  const handleLogout = () => {
    // In a real app, this would call authentication service logout
    console.log("Logging out...");
    // Redirect to login page
    window.location.href = "/login";
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 text-center">
        <h1 className="text-xl font-bold text-sidebar-foreground">{clinicName}</h1>
        <p className="text-xs text-sidebar-foreground/80">Панель Клиники</p>
      </div>
      
      <SidebarGroup>
        <SidebarGroupLabel>Управление</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive}
                    tooltip={item.label}
                  >
                    <a href={item.href} className={cn("flex items-center")}>
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <div className="mt-auto">
        <SidebarSeparator className="my-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              tooltip="Выйти" 
              onClick={handleLogout}
            >
              <div className="flex items-center text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Выйти</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
      
      <SidebarFooter>
        <div className="p-2">
          <div className="rounded-md bg-medical-light-blue p-3">
            <p className="text-xs font-medium text-sidebar-foreground">Подписка: Активна</p>
            <p className="text-xs text-sidebar-foreground/80">до 01.06.2025</p>
          </div>
        </div>
      </SidebarFooter>
    </div>
  );
}
