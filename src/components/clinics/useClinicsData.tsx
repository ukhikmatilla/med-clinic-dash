
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Clinic {
  id: number;
  name: string;
  admin: string;
  email?: string;
  doctors: number;
  patients: number;
  subscription: string;
  subscriptionActive: boolean;
  hasGCalendar: boolean;
  plan?: string;
  doctorsLimit?: number;
  telegramBotPatient?: string;
  telegramBotDoctor?: string;
  timezone?: string;
}

export function useClinicsData() {
  const { toast } = useToast();
  const [clinics, setClinics] = useState<Clinic[]>([
    { 
      id: 1, 
      name: "Najot Shifo", 
      admin: "@najot", 
      email: "admin@najotshifo.uz",
      doctors: 10, 
      patients: 800, 
      subscription: "01.06.2025", 
      subscriptionActive: true,
      hasGCalendar: true,
      plan: "CRM + Telegram",
      doctorsLimit: 20,
      telegramBotPatient: "@najot_med_bot",
      telegramBotDoctor: "@najot_doctor_bot", 
      timezone: "Ташкент (UTC+5)"
    },
  ]);
  
  // Function to handle clinic deletion
  const handleDeleteClinic = (id: number) => {
    setClinics(clinics.filter(clinic => clinic.id !== id));
    toast({
      title: "Клиника удалена",
      description: "Клиника была успешно удалена из системы",
    });
  };

  // Function to handle adding a new clinic
  const handleAddClinic = (clinic: Omit<Clinic, "id">) => {
    const newClinic = {
      ...clinic,
      id: clinics.length > 0 ? Math.max(...clinics.map(c => c.id)) + 1 : 1
    };
    setClinics([...clinics, newClinic]);
    toast({
      title: "Клиника добавлена",
      description: "Новая клиника была успешно добавлена в систему",
    });
  };

  // Function to handle editing a clinic
  const handleEditClinic = (updatedClinic: Clinic) => {
    setClinics(clinics.map(clinic => 
      clinic.id === updatedClinic.id ? updatedClinic : clinic
    ));
    toast({
      title: "Клиника обновлена",
      description: "Данные клиники были успешно обновлены",
    });
  };
  
  return {
    clinics,
    handleDeleteClinic,
    handleAddClinic,
    handleEditClinic
  };
}
