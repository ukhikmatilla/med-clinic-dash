
import { useState, useEffect } from "react";
import { Service } from "@/hooks/doctors/types";
import { mockDoctors, mockServices } from "@/data/doctors/mockData";

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

    // Find the doctor from mockDoctors based on doctorId
    setTimeout(() => {
      // Find the doctor in our mockData
      const foundDoctor = mockDoctors.find(doc => doc.id === doctorId);
      
      if (foundDoctor) {
        // Use the found doctor data
        const doctorData: DoctorProfile = {
          ...foundDoctor,
          telegramBot: "@najot_doctor_bot"
        };
        
        // Get services for this doctor
        const doctorServices = mockServices.filter(service => 
          foundDoctor.services.includes(service.id)
        );

        setDoctor(doctorData);
        setServices(doctorServices);
      } else {
        // Fallback to mock data if doctor not found
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

        // Mock services data with number prices
        const mockServicesList: Service[] = [
          {
            id: "service1",
            name: "Первичная консультация",
            price: 150000,
            durationMin: 30,
            category: "Консультации"
          },
          {
            id: "service2",
            name: "Повторная консультация",
            price: 100000,
            durationMin: 30,
            category: "Консультации"
          },
          {
            id: "service3",
            name: "ЭКГ с расшифровкой",
            price: 80000,
            durationMin: 45,
            category: "Кардиология"
          }
        ];

        setDoctor(mockDoctor);
        setServices(mockServicesList);
      }
      
      setLoading(false);
    }, 1000);
  }, [doctorId]);

  return { doctor, services, isLoading: loading };
}
