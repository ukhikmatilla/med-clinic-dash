
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
  BarChart3, 
  Building2, 
  FileText, 
  Link2,
  CreditCard,
  LogOut,
  Stethoscope
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: <BarChart3 className="mr-2 h-4 w-4" />, label: "Дэшборд", href: "/super-admin" },
  { icon: <Building2 className="mr-2 h-4 w-4" />, label: "Клиники", href: "/super-admin/clinics" },
  { icon: <Link2 className="mr-2 h-4 w-4" />, label: "Интеграции", href: "/super-admin/integrations" },
  { icon: <CreditCard className="mr-2 h-4 w-4" />, label: "Подписки", href: "/super-admin/subscriptions" },
  { icon: <FileText className="mr-2 h-4 w-4" />, label: "Отчёты", href: "/super-admin/reports" },
];

export function SuperAdminSidebar() {
  const location = useLocation();
  
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Stethoscope className="h-6 w-6 text-medical-light-blue mr-2" />
          <h1 className="text-xl font-bold text-sidebar-foreground">Медицинская CRM</h1>
        </div>
        <p className="text-xs text-sidebar-foreground/80">Панель Супер Админа</p>
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
            <SidebarMenuButton asChild tooltip="Выйти">
              <a href="/login" className={cn("flex items-center text-red-500")}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Выйти</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
      
      <SidebarFooter>
        <div className="p-2">
          <div className="rounded-md bg-medical-light-blue p-3">
            <p className="text-xs font-medium text-sidebar-foreground">Лицензия: активна</p>
            <p className="text-xs text-sidebar-foreground/80">Корпоративный тариф</p>
          </div>
        </div>
      </SidebarFooter>
    </div>
  );
}
