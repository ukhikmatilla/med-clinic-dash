import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  CalendarClock, 
  Check, 
  Users, 
  Building2, 
  UserRound, 
  XCircle, 
  RefreshCw, 
  Search, 
  AlertTriangle, 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  FileText, 
  CircleAlert,
  Edit,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { LicenseInfoCard } from "@/components/dashboard/LicenseInfoCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { SubscriptionAlert } from "@/components/dashboard/SubscriptionAlert";
import { ClinicsSection } from "@/components/dashboard/ClinicsSection";
import { IntegrationErrorsTable } from "@/components/dashboard/IntegrationErrorsTable";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export function SuperAdminDashboard() {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState("14.04.2025 10:22");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Simplified stats to reflect only Najot Shifo
  const stats = {
    clinics: 1,
    doctors: 10,
    doctorsChange: "+1 за 7 дней",
    doctorsTrend: "up",
    patients: 800,
    patientsChange: "+12 за 7 дней",
    patientsTrend: "up",
    appointments: 27,
    appointmentsChange: "-12% от прошлой недели",
    appointmentsTrend: "down"
  };
  
  // Keep only Najot Shifo
  const allClinics = [
    { id: 1, name: "Najot Shifo", admin: "@najot", doctors: 10, patients: 800, subscription: "01.06.2025", hasGCalendar: true },
  ];
  
  // Integration errors
  const integrationErrors = [
    { id: 1, clinic: "Najot Shifo", type: "Google Calendar", error: "Ошибка авторизации", date: "14.04.2025" },
  ];
  
  // Recent activity feed
  const activityFeed = [
    { id: 1, type: "subscription", message: "Клиника Najot Shifo продлила подписку", date: "14.04.2025", time: "09:45" },
    { id: 2, type: "doctor", message: "Добавлен врач: Ортиков Ш.О.", date: "13.04.2025", time: "15:30" },
    { id: 3, type: "error", message: "Ошибка интеграции Google Calendar", date: "13.04.2025", time: "11:20" },
    { id: 4, type: "patient", message: "Зарегистрирован новый пациент", date: "12.04.2025", time: "14:15" },
    { id: 5, type: "appointment", message: "Отменен прием №245", date: "12.04.2025", time: "10:05" },
  ];
  
  // Subscriptions ending soon
  const expiringSubscriptions = [
    { id: 1, clinic: "Najot Shifo", expiresIn: "65 дней", expiryDate: "01.06.2025" }
  ];
  
  // License usage
  const licenseInfo = {
    status: "Активна",
    type: "Корпоративный",
    clinics: { current: 1, max: "∞" },
    doctors: { current: 10, max: 1000 }
  };
  
  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      
      setLastUpdated(`${day}.${month}.${year} ${hours}:${minutes}`);
      setIsRefreshing(false);
      
      toast({
        title: "Обновлено",
        description: "Данные дэшборда обновлены",
      });
    }, 1000);
  };
  
  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Activity icon mapping
  const getActivityIcon = (type) => {
    switch(type) {
      case "subscription": return <Check className="h-4 w-4 text-green-500" />;
      case "doctor": return <UserRound className="h-4 w-4 text-blue-500" />;
      case "error": return <CircleAlert className="h-4 w-4 text-red-500" />;
      case "patient": return <Users className="h-4 w-4 text-purple-500" />;
      case "appointment": return <CalendarClock className="h-4 w-4 text-orange-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };
  
  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="p-2 sm:p-6">
        {/* Header with refresh */}
        <DashboardHeader 
          lastUpdated={lastUpdated}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatisticsCard
            title="Всего клиник"
            value={stats.clinics}
            icon={<Building2 />}
          />
          
          <StatisticsCard
            title="Всего врачей"
            value={stats.doctors}
            icon={<UserRound />}
            change={stats.doctorsChange}
            trend={stats.doctorsTrend as "up" | "down"}
          />
          
          <StatisticsCard
            title="Всего пациентов"
            value={stats.patients}
            icon={<Users />}
            change={stats.patientsChange}
            trend={stats.patientsTrend as "up" | "down"}
          />
          
          <StatisticsCard
            title="Приёмов сегодня"
            value={stats.appointments}
            icon={<CalendarClock />}
            change={stats.appointmentsChange}
            trend={stats.appointmentsTrend as "up" | "down"}
          />
        </div>
        
        {/* License Usage Card and Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <LicenseInfoCard {...licenseInfo} />
          <ActivityFeed activities={activityFeed} />
        </div>
        
        {/* Expiring Subscriptions Alert */}
        <SubscriptionAlert subscriptions={expiringSubscriptions} />
        
        {/* Recent Clinics Section with Search */}
        <ClinicsSection clinics={allClinics} />
        
        {/* Integration Errors */}
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Ошибки интеграций</h2>
        <IntegrationErrorsTable errors={integrationErrors} />
      </div>
    </SidebarLayout>
  );
}

export default SuperAdminDashboard;
