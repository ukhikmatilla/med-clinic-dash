
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Doctor, Service, Bot, UseDoctorsDataOptions, DoctorsDataActions } from "@/hooks/doctors/types";
import { DoctorFormValues } from "@/components/clinics/doctors/DoctorForm";
import { formValuesToDoctorData } from "@/hooks/doctors/utils";

// Re-export types for backward compatibility
export type { Doctor, Service, Bot, UseDoctorsDataOptions };

export function useDoctorsData(initialDoctors: Doctor[] = [], options: UseDoctorsDataOptions = {}): DoctorsDataActions {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { maxDoctors } = options;
  const hasReachedLimit = maxDoctors ? doctors.length >= maxDoctors : false;

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
