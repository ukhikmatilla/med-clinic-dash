
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

export interface Patient {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  service: string;
  time: string;
}

export interface ClinicStats {
  doctors: number;
  patients: number;
  appointments: number;
  services: number;
}

export function useClinicDashboardData() {
  const { toast } = useToast();
  const [stats, setStats] = useState<ClinicStats>({
    doctors: 10,
    patients: 800,
    appointments: 27,
    services: 45
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([
    { id: 1, patient: "Ахмедов Рустам", doctor: "Закирова Г.А.", service: "Консультация кардиолога", time: "10:30" },
    { id: 2, patient: "Исмаилова Нигора", doctor: "Каримова Д.Э.", service: "УЗИ щитовидной железы", time: "11:15" },
    { id: 3, patient: "Сулейманов Фаррух", doctor: "Эронов М.М.", service: "ЭКГ + консультация", time: "12:00" },
    { id: 4, patient: "Рахимова Зарина", doctor: "Ортиков Ш.О.", service: "Консультация дерматолога", time: "13:30" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  });

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // In a real app, fetch data from Supabase
      // For now, using mock data but structured as if from API
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      // Update last updated timestamp
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      
      setLastUpdated(`${day}.${month}.${year} ${hours}:${minutes}`);
      
      toast({
        title: "Данные обновлены",
        description: "Информация на дашборде обновлена"
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    upcomingAppointments,
    isLoading,
    lastUpdated,
    refresh: fetchDashboardData
  };
}
