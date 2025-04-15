
import { useState, useEffect } from "react";
import { Service } from "@/hooks/doctors/types";
import { supabase } from "@/integrations/supabase/client";

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

    async function fetchDoctorData() {
      setLoading(true);
      
      try {
        // Fetch doctor data from Supabase
        const { data: doctorData, error: doctorError } = await supabase
          .from('doctors')
          .select('*')
          .eq('id', doctorId)
          .single();
        
        if (doctorError) {
          console.error("Error fetching doctor:", doctorError);
          setDoctor(null);
          setLoading(false);
          return;
        }
        
        if (doctorData) {
          // Transform doctor data to match our frontend model
          const transformedDoctor: DoctorProfile = {
            id: doctorData.id,
            fullName: doctorData.full_name,
            specialties: doctorData.specialties || [],
            telegramId: doctorData.telegram_id,
            telegramBot: doctorData.telegram_bot || "@najot_doctor_bot",
            schedule: doctorData.schedule || {},
            services: [], // Will be filled later
            status: doctorData.status || "active",
            experience: doctorData.experience || "",
            category: doctorData.category || "",
            initialConsultation: doctorData.initial_consultation || "",
            followupConsultation: doctorData.followup_consultation || ""
          };
          
          // Fetch services for this doctor
          const { data: doctorServicesData, error: doctorServicesError } = await supabase
            .from('doctor_services')
            .select('service_id')
            .eq('doctor_id', doctorId);
            
          if (doctorServicesError) {
            console.error("Error fetching doctor services:", doctorServicesError);
          } else {
            // Extract service IDs
            const serviceIds = doctorServicesData.map(item => item.service_id);
            transformedDoctor.services = serviceIds;
            
            // Fetch the actual service data
            if (serviceIds.length > 0) {
              const { data: servicesData, error: servicesError } = await supabase
                .from('services')
                .select(`
                  *,
                  service_categories:category_id(name, icon)
                `)
                .in('id', serviceIds);
                
              if (servicesError) {
                console.error("Error fetching services:", servicesError);
              } else {
                // Transform service data to match our frontend model
                const transformedServices: Service[] = servicesData.map(service => ({
                  id: service.id,
                  name: service.name,
                  category: service.service_categories ? service.service_categories.name : "",
                  category_id: service.category_id,
                  price: service.price,
                  durationMin: service.duration_min
                }));
                
                setServices(transformedServices);
              }
            }
          }
          
          setDoctor(transformedDoctor);
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
            services: [],
            status: "active",
            experience: "15 лет",
            category: "Высшая",
            initialConsultation: "150 000 сум",
            followupConsultation: "100 000 сум"
          };

          // Mock services data
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
              durationMin: 20,
              category: "Консультации"
            },
            {
              id: "service3",
              name: "ЭКГ с расшифровкой",
              price: 80000,
              durationMin: 15,
              category: "Диагностика"
            }
          ];

          setDoctor(mockDoctor);
          setServices(mockServicesList);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctorData();
  }, [doctorId]);

  return { doctor, services, isLoading: loading };
}
