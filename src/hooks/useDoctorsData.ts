
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Doctor, Service, Bot, UseDoctorsDataOptions, DoctorsDataActions } from "@/hooks/doctors/types";
import { DoctorFormValues } from "@/components/clinics/doctors/DoctorForm";
import { formValuesToDoctorData } from "@/hooks/doctors/utils";
import { supabase } from "@/integrations/supabase/client";

// Re-export types for backward compatibility
export type { Doctor, Service, Bot, UseDoctorsDataOptions };

export function useDoctorsData(initialDoctors: Doctor[] = [], options: UseDoctorsDataOptions = {}): DoctorsDataActions {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const { maxDoctors } = options;
  const hasReachedLimit = maxDoctors ? doctors.length >= maxDoctors : false;

  // Fetch doctors from Supabase on component mount
  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('doctors')
          .select(`
            *,
            doctor_services(service_id)
          `);
        
        if (error) {
          console.error("Error fetching doctors:", error);
          setLoading(false);
          return;
        }
        
        // Transform data to match our frontend model
        const transformedDoctors: Doctor[] = data.map(doctor => ({
          id: doctor.id,
          fullName: doctor.full_name,
          specialties: doctor.specialties || [],
          telegramId: doctor.telegram_id,
          telegramBot: doctor.telegram_bot,
          schedule: typeof doctor.schedule === 'object' ? doctor.schedule as Record<string, string> : {},
          services: doctor.doctor_services ? doctor.doctor_services.map((ds: any) => ds.service_id) : [],
          status: (doctor.status === 'active' || doctor.status === 'inactive') 
            ? doctor.status as "active" | "inactive" 
            : "active",
          experience: doctor.experience || "",
          category: doctor.category || "",
          initialConsultation: doctor.initial_consultation || "",
          followupConsultation: doctor.followup_consultation || ""
        }));
        
        setDoctors(transformedDoctors);
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    }
    
    // Only fetch if we don't have initial doctors
    if (initialDoctors.length === 0) {
      fetchDoctors();
    } else {
      setLoading(false);
    }
  }, [initialDoctors]);

  // Get available bots
  const getAvailableBots = async (): Promise<Bot[]> => {
    // For now, return a static list
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
      // Prepare doctor data for Supabase
      const doctorData = {
        full_name: values.fullName,
        telegram_id: values.telegramId || null,
        telegram_bot: values.telegramBot || "@najot_doctor_bot",
        specialties: values.specialties ? values.specialties.split(',').map(s => s.trim()) : [],
        experience: values.experience || "",
        category: values.category || "",
        schedule: parseSchedule(values.schedule),
        status: values.isActive ? "active" : "inactive",
        initial_consultation: "",
        followup_consultation: ""
      };
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('doctors')
        .insert(doctorData)
        .select('*')
        .single();
      
      if (error) {
        throw error;
      }
      
      // If services are specified, link them to the doctor
      if (values.services && values.services.length > 0 && data) {
        const doctorServiceEntries = values.services.map(serviceId => ({
          doctor_id: data.id,
          service_id: serviceId
        }));
        
        const { error: linkError } = await supabase
          .from('doctor_services')
          .insert(doctorServiceEntries);
        
        if (linkError) {
          console.error("Error linking services to doctor:", linkError);
        }
      }
      
      // Create doctor object for frontend
      const newDoctor: Doctor = {
        id: data.id,
        fullName: data.full_name,
        specialties: data.specialties || [],
        telegramId: data.telegram_id,
        telegramBot: data.telegram_bot,
        schedule: typeof data.schedule === 'object' ? data.schedule as Record<string, string> : {},
        services: values.services || [],
        status: (data.status === 'active' || data.status === 'inactive') 
          ? data.status as "active" | "inactive" 
          : "active",
        experience: data.experience || "",
        category: data.category || "",
        initialConsultation: data.initial_consultation || "",
        followupConsultation: data.followup_consultation || ""
      };
      
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
      // Prepare doctor data for Supabase
      const doctorData = {
        full_name: values.fullName,
        telegram_id: values.telegramId || null,
        telegram_bot: values.telegramBot || "@najot_doctor_bot",
        specialties: values.specialties ? values.specialties.split(',').map(s => s.trim()) : [],
        experience: values.experience || "",
        category: values.category || "",
        schedule: parseSchedule(values.schedule),
        status: values.isActive ? "active" : "inactive"
      };
      
      // Update in Supabase
      const { data, error } = await supabase
        .from('doctors')
        .update(doctorData)
        .eq('id', doctorId)
        .select('*')
        .single();
      
      if (error) {
        throw error;
      }
      
      // If services are specified, update the doctor_services table
      if (values.services !== undefined) {
        // First, delete existing relationships
        const { error: deleteError } = await supabase
          .from('doctor_services')
          .delete()
          .eq('doctor_id', doctorId);
        
        if (deleteError) {
          console.error("Error removing existing doctor-service links:", deleteError);
        }
        
        // Then, add new relationships
        if (values.services.length > 0) {
          const doctorServiceEntries = values.services.map(serviceId => ({
            doctor_id: doctorId,
            service_id: serviceId
          }));
          
          const { error: insertError } = await supabase
            .from('doctor_services')
            .insert(doctorServiceEntries);
          
          if (insertError) {
            console.error("Error linking services to doctor:", insertError);
          }
        }
      }
      
      // Create updated doctor object for frontend
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
      // Delete from Supabase (doctor_services entries will be deleted due to ON DELETE CASCADE)
      const { error } = await supabase
        .from('doctors')
        .delete()
        .eq('id', doctorId);
      
      if (error) {
        throw error;
      }
      
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

  // Helper function to parse schedule string to object
  function parseSchedule(scheduleStr: string): Record<string, string> {
    if (!scheduleStr) return {};
    
    const schedule: Record<string, string> = {};
    const entries = scheduleStr.split(',').map(s => s.trim());
    
    entries.forEach(entry => {
      const parts = entry.split(' ');
      if (parts.length >= 2) {
        const day = parts[0];
        const time = parts.slice(1).join(' ');
        schedule[day] = time;
      }
    });
    
    return schedule;
  }

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
