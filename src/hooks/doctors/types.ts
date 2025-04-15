
export interface Service {
  id: string;
  name: string;
  price: number;  // Ensure price is consistently a number
  category?: string;
  category_id?: string;
  durationMin?: number;
  doctors?: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon?: string;
}

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
  addDoctor: (values: any) => Promise<Doctor>;
  updateDoctor: (doctorId: string, values: any) => Promise<Doctor>;
  deleteDoctor: (doctorId: string) => Promise<void>;
  verifyTelegramId: (telegramId: string) => Promise<boolean>;
  getAvailableBots: () => Promise<Bot[]>;
  hasReachedLimit: boolean;
  maxDoctors?: number;
}
