
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ClipboardList, 
  FileSpreadsheet, 
  Calendar, 
  Settings, 
  Link2,
  CreditCard
} from "lucide-react";

const navItems = [
  { icon: <ClipboardList className="mr-2 h-4 w-4" />, label: "Врачи", href: "/clinic-admin/doctors" },
  { icon: <FileSpreadsheet className="mr-2 h-4 w-4" />, label: "Услуги", href: "/clinic-admin/services" },
  { icon: <Calendar className="mr-2 h-4 w-4" />, label: "Расписание", href: "/clinic-admin/schedule" },
  { icon: <Settings className="mr-2 h-4 w-4" />, label: "Настройки клиники", href: "/clinic-admin/settings" },
  { icon: <Link2 className="mr-2 h-4 w-4" />, label: "Интеграции", href: "/clinic-admin/integrations" },
  { icon: <CreditCard className="mr-2 h-4 w-4" />, label: "Подписка", href: "/clinic-admin/subscription" },
];

type ClinicAdminSidebarProps = {
  clinicName: string;
};

export function ClinicAdminSidebar({ clinicName }: ClinicAdminSidebarProps) {
  const location = useLocation();
  
  return (
    <div className="flex flex-col h-full py-4">
      <div className="px-4 py-4 mb-4 text-center">
        <h1 className="text-xl font-bold text-sidebar-foreground">{clinicName}</h1>
        <p className="text-xs text-sidebar-foreground/80">Панель Клиники</p>
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
          <p className="text-xs font-medium text-sidebar-foreground">Подписка: Активна</p>
          <p className="text-xs text-sidebar-foreground/80">до 01.06.2025</p>
        </div>
      </div>
    </div>
  );
}
