
import { useState, useEffect } from "react";
import { Service } from "@/hooks/useDoctorsData";

// Define doctor interface
export interface DoctorProfile {
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

export function useDoctorProfileData(doctorId?: string) {
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!doctorId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // In a real application, this would make API calls
    // For now, we'll use mock data
    setTimeout(() => {
      // Mock doctor data
      const mockDoctor: DoctorProfile = {
        id: doctorId,
        fullName: "Иванов Иван Петрович",
        specialties: ["Терапевт", "Кардиолог"],
        telegramId: "@doctor_ivanov",
        telegramBot: "@najot_doctor_bot",
        schedule: {
          "Понедельник": "09:00 - 17:00",
          "Вторник": "09:00 - 17:00",
          "Среда": "09:00 - 17:00",
          "Четверг": "09:00 - 17:00",
          "Пятница": "09:00 - 15:00"
        },
        services: ["service1", "service2", "service3"],
        status: "active",
        experience: "15 лет",
        category: "Высшая",
        initialConsultation: "150 000 сум",
        followupConsultation: "100 000 сум"
      };

      // Mock services data
      const mockServices: Service[] = [
        {
          id: "service1",
          name: "Первичная консультация",
          price: "150 000 сум"
        },
        {
          id: "service2",
          name: "Повторная консультация",
          price: "100 000 сум"
        },
        {
          id: "service3",
          name: "ЭКГ с расшифровкой",
          price: "80 000 сум"
        }
      ];

      setDoctor(mockDoctor);
      setServices(mockServices);
      setLoading(false);
    }, 1000);
  }, [doctorId]);

  return { doctor, services, isLoading: loading };
}
