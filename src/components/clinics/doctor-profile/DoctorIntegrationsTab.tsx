
import { TelegramIntegrationCard } from "@/components/clinics/profile/doctor-details/TelegramIntegrationCard";
import { CalendarIntegrationCard } from "@/components/clinics/profile/doctor-details/CalendarIntegrationCard";

interface Doctor {
  id: string;
  fullName: string;
  telegramId: string | null;
  telegramBot?: string;
}

interface DoctorIntegrationsTabProps {
  doctor: Doctor;
}

export function DoctorIntegrationsTab({ doctor }: DoctorIntegrationsTabProps) {
  // Determine if Telegram is connected (in a real app, this would come from the API)
  const isTelegramConnected = doctor.telegramId?.startsWith('@doctor') ?? false;
  
  return (
    <div className="space-y-6">
      <TelegramIntegrationCard 
        telegramId={doctor.telegramId} 
        telegramBot={doctor.telegramBot || "@najot_doctor_bot"}
        isConnected={isTelegramConnected} 
      />
      
      <CalendarIntegrationCard />
    </div>
  );
}
