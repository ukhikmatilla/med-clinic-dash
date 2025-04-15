
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Service } from "@/hooks/doctors/types";
import { DoctorBasicInfo } from "./doctor-details/DoctorBasicInfo";
import { DoctorScheduleCard } from "./doctor-details/DoctorScheduleCard";
import { DoctorServicesCard } from "./doctor-details/DoctorServicesCard";
import { DoctorStatusDisplay } from "./doctor-details/DoctorStatusDisplay";
import { TelegramIntegrationCard } from "./doctor-details/TelegramIntegrationCard";
import { CalendarIntegrationCard } from "./doctor-details/CalendarIntegrationCard";

interface DoctorDetails {
  id: string;
  fullName: string;
  specialties: string[];
  telegramId: string | null;
  telegramBot?: string;
  schedule: Record<string, string>;
  services: string[];
  status: "active" | "inactive";
  experience?: string;
  category?: string;
  initialConsultation?: string;
  followupConsultation?: string;
}

interface ViewDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: DoctorDetails | null;
  services: Service[];
}

export function ViewDoctorDialog({ 
  open, 
  onOpenChange,
  doctor,
  services = []
}: ViewDoctorDialogProps) {
  const [activeTab, setActiveTab] = useState("info");

  if (!doctor) return null;
  
  const doctorServices = services.filter(service => 
    doctor.services.includes(service.id)
  );
  
  const isTelegramConnected = doctor.telegramId?.startsWith('@doctor') ?? false;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Информация о враче</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="info" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Основная информация</TabsTrigger>
            <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4 py-4">
            <DoctorBasicInfo 
              fullName={doctor.fullName}
              telegramId={doctor.telegramId}
              specialties={doctor.specialties}
              experience={doctor.experience}
              category={doctor.category}
              initialConsultation={doctor.initialConsultation}
              followupConsultation={doctor.followupConsultation}
              telegramConnected={isTelegramConnected}
            />
            
            <DoctorScheduleCard schedule={doctor.schedule} />
            
            <DoctorServicesCard services={doctorServices} />
            
            <DoctorStatusDisplay status={doctor.status} />
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4 py-4">
            <TelegramIntegrationCard 
              telegramId={doctor.telegramId}
              telegramBot={doctor.telegramBot}
              isConnected={isTelegramConnected}
            />
            
            <CalendarIntegrationCard />
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
