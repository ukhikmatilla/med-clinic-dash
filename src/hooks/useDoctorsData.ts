
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DoctorFormValues } from "@/components/clinics/doctors/DoctorForm";

// Type definitions
export interface Doctor {
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

export interface Service {
  id: string;
  name: string;
  price: string;
}

export interface Bot {
  id: string;
  name: string;
}

export interface UseDoctorsDataOptions {
  maxDoctors?: number;
}

export function useDoctorsData(initialDoctors: Doctor[] = [], options: UseDoctorsDataOptions = {}) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { maxDoctors } = options;
  const hasReachedLimit = maxDoctors ? doctors.length >= maxDoctors : false;

  // Parse schedule string to Record format
  const parseSchedule = (scheduleStr: string): Record<string, string> => {
    const schedule: Record<string, string> = {};
    if (!scheduleStr) return schedule;

    const parts = scheduleStr.split(", ");
    parts.forEach(part => {
      const match = part.match(/([А-Яа-я]+)[-–]?([А-Яа-я]+)?\s+(.+)/);
      if (match) {
        const [_, startDay, endDay, time] = match;
        
        if (startDay && endDay) {
          // Convert days range to individual days
          const daysMap: Record<string, string> = {
            'Пн': 'Понедельник',
            'Вт': 'Вторник',
            'Ср': 'Среда',
            'Чт': 'Четверг',
            'Пт': 'Пятница',
            'Сб': 'Суббота',
            'Вс': 'Воскресенье'
          };
          
          const fullDays = Object.keys(daysMap);
          const startIdx = fullDays.indexOf(startDay);
          const endIdx = fullDays.indexOf(endDay);
          
          if (startIdx !== -1 && endIdx !== -1) {
            for (let i = startIdx; i <= endIdx; i++) {
              schedule[fullDays[i]] = time;
            }
          } else {
            // If we can't parse the range, just add the original days
            schedule[startDay] = time;
            if (endDay) schedule[endDay] = time;
          }
        } else {
          schedule[startDay] = time;
        }
      }
    });
    
    return schedule;
  };

  // Convert form values to Doctor format
  const formValuesToDoctorData = (values: DoctorFormValues, doctorId?: string): Doctor => {
    return {
      id: doctorId || `doctor_${Date.now()}`,
      fullName: values.fullName,
      specialties: values.specialties.split(',').map(s => s.trim()),
      telegramId: values.telegramId || null,
      telegramBot: values.telegramBot,
      schedule: parseSchedule(values.schedule || ""),
      services: values.services || [],
      status: values.isActive ? "active" : "inactive",
      experience: values.experience,
      category: values.category
    };
  };

  // Get available bots
  const getAvailableBots = async (): Promise<Bot[]> => {
    // In a real app, this would be an API call
    // For now, we'll return a static list
    return [
      { id: "doctor_bot", name: "@najot_doctor_bot" }
    ];
  };

  // Add a new doctor
  const addDoctor = async (values: DoctorFormValues) => {
    if (maxDoctors && doctors.length >= maxDoctors) {
      toast({
        title: "Ограничение по подписке",
        description: `Ваш тариф позволяет добавить максимум ${maxDoctors} врачей. Перейдите на расширенный тариф для добавления большего числа врачей.`,
        variant: "destructive",
      });
      throw new Error("Doctor limit reached");
    }
    
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll just update the local state
      const newDoctor = formValuesToDoctorData(values);
      setDoctors(prev => [...prev, newDoctor]);
      
      return newDoctor;
    } catch (error) {
      console.error("Error adding doctor:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing doctor
  const updateDoctor = async (doctorId: string, values: DoctorFormValues) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const updatedDoctor = formValuesToDoctorData(values, doctorId);
      
      setDoctors(prev => 
        prev.map(doc => doc.id === doctorId ? updatedDoctor : doc)
      );
      
      return updatedDoctor;
    } catch (error) {
      console.error("Error updating doctor:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a doctor
  const deleteDoctor = async (doctorId: string) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      setDoctors(prev => prev.filter(doc => doc.id !== doctorId));
      
      toast({
        title: "Врач удален",
        description: "Врач был успешно удален из системы.",
      });
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить врача. Попробуйте еще раз.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Verify Telegram ID
  const verifyTelegramId = async (telegramId: string): Promise<boolean> => {
    // In a real app, this would be an API call
    // For demo purposes, let's say only IDs starting with '@doctor' are valid
    return telegramId.startsWith('@doctor');
  };

  return {
    doctors,
    loading,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    verifyTelegramId,
    getAvailableBots,
    hasReachedLimit,
    maxDoctors
  };
}
