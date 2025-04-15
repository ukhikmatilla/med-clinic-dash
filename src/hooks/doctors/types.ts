
import { DoctorFormValues } from "@/components/clinics/doctors/DoctorForm";

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
  category: string;
  category_id?: string; 
  price: number;  // Ensuring this is consistently a number
  durationMin: number;
  doctors?: string[]; // Array of doctor IDs
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
}

export interface Bot {
  id: string;
  name: string;
}

export interface UseDoctorsDataOptions {
  maxDoctors?: number;
}

export interface DoctorsDataActions {
  doctors: Doctor[];
  loading: boolean;
  addDoctor: (values: DoctorFormValues) => Promise<Doctor>;
  updateDoctor: (doctorId: string, values: DoctorFormValues) => Promise<Doctor>;
  deleteDoctor: (doctorId: string) => Promise<void>;
  verifyTelegramId: (telegramId: string) => Promise<boolean>;
  getAvailableBots: () => Promise<Bot[]>;
  hasReachedLimit: boolean;
  maxDoctors?: number;
}

export interface ServiceManagementActions {
  services: Service[];
  categories: ServiceCategory[];
  addService: (service: Omit<Service, 'id'>) => Promise<Service>;
  updateService: (serviceId: string, updatedService: Partial<Service>) => Promise<Service>;
  deleteService: (serviceId: string) => Promise<void>;
  addCategory: (category: Omit<ServiceCategory, 'id'>) => Promise<ServiceCategory>;
}
