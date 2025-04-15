
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
  price: string;
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
