
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Building2, 
  Users, 
  User, 
  Settings, 
  FileText, 
  Link2
} from "lucide-react";

const navItems = [
  { icon: <BarChart3 className="mr-2 h-4 w-4" />, label: "Дэшборд", href: "/super-admin" },
  { icon: <Building2 className="mr-2 h-4 w-4" />, label: "Клиники", href: "/super-admin/clinics" },
  { icon: <User className="mr-2 h-4 w-4" />, label: "Врачи", href: "/super-admin/doctors" },
  { icon: <Users className="mr-2 h-4 w-4" />, label: "Пациенты", href: "/super-admin/patients" },
  { icon: <Link2 className="mr-2 h-4 w-4" />, label: "Интеграции", href: "/super-admin/integrations" },
  { icon: <Settings className="mr-2 h-4 w-4" />, label: "Настройки", href: "/super-admin/settings" },
  { icon: <FileText className="mr-2 h-4 w-4" />, label: "Логи и ошибки", href: "/super-admin/logs" },
];

export function SuperAdminSidebar() {
  const location = useLocation();
  
  return (
    <div className="flex flex-col h-full py-4">
      <div className="px-4 py-4 mb-4 text-center">
        <h1 className="text-xl font-bold text-sidebar-foreground">Медицинская CRM</h1>
        <p className="text-xs text-sidebar-foreground/80">Панель Супер Админа</p>
      </div>
      
      <nav className="space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto px-4 py-4">
        <div className="rounded-md bg-medical-light-blue p-3">
          <p className="text-xs font-medium text-sidebar-foreground">Лицензия активна</p>
          <p className="text-xs text-sidebar-foreground/80">Корпоративный тариф</p>
        </div>
      </div>
    </div>
  );
}
