
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Хук для управления данными дашборда
export function useDashboardData() {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState("14.04.2025 10:22");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Simplified stats to reflect only Najot Shifo
  const stats = {
    clinics: 1,
    doctors: 10,
    doctorsChange: "+1 за 7 дней",
    doctorsTrend: "up" as const,
    patients: 800,
    patientsChange: "+12 за 7 дней",
    patientsTrend: "up" as const,
    appointments: 27,
    appointmentsChange: "-12% от прошлой недели",
    appointmentsTrend: "down" as const
  };
  
  // Keep only Najot Shifo
  const allClinics = [
    { 
      id: 1, 
      name: "Najot Shifo", 
      admin: "@najot", 
      email: "admin@najotshifo.uz",
      doctors: 10, 
      patients: 800, 
      subscription: "01.06.2025", 
      subscriptionActive: true, // Added the missing property
      hasGCalendar: true,
      plan: "CRM + Telegram",
      doctorsLimit: 20,
      telegramBotId: "@najot_shifo_bot",
      timezone: "Ташкент (UTC+5)"
    },
  ];
  
  // Integration errors
  const integrationErrors = [
    { id: 1, clinic: "Najot Shifo", type: "Google Calendar", error: "Ошибка авторизации", date: "14.04.2025" },
  ];
  
  // Recent activity feed
  const activityFeed = [
    { id: 1, type: "subscription" as const, message: "Клиника Najot Shifo продлила подписку", date: "14.04.2025", time: "09:45" },
    { id: 2, type: "doctor" as const, message: "Добавлен врач: Ортиков Ш.О.", date: "13.04.2025", time: "15:30" },
    { id: 3, type: "error" as const, message: "Ошибка интеграции Google Calendar", date: "13.04.2025", time: "11:20" },
    { id: 4, type: "patient" as const, message: "Зарегистрирован новый пациент", date: "12.04.2025", time: "14:15" },
    { id: 5, type: "appointment" as const, message: "Отменен прием №245", date: "12.04.2025", time: "10:05" },
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

  return {
    lastUpdated,
    isRefreshing,
    handleRefresh,
    stats,
    allClinics,
    integrationErrors,
    activityFeed,
    expiringSubscriptions,
    licenseInfo
  };
}
