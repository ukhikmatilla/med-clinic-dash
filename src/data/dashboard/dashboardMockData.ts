
// Mock data for dashboard components

export const dashboardStats = {
  clinics: 1,
  doctors: 10,
  doctorsChange: "+1 за 7 дней",
  doctorsTrend: "up" as const,
  patients: 800,
  patientsChange: "+12 за 7 дней",
  patientsTrend: "up" as const,
  appointments: 27,
  appointmentsChange: "-12% от прошлой недели",
  appointmentsTrend: "down" as const
};

export const mockClinics = [
  { 
    id: 1, 
    name: "Najot Shifo", 
    admin: "@najot", 
    email: "admin@najotshifo.uz",
    doctors: 10, 
    patients: 800, 
    subscription: "01.06.2025", 
    subscriptionActive: true,
    hasGCalendar: true,
    plan: "CRM + Telegram",
    doctorsLimit: 20,
    telegramBotPatient: "@najot_med_bot",
    telegramBotDoctor: "@najot_doctor_bot",
    timezone: "Ташкент (UTC+5)"
  },
];

export const mockIntegrationErrors = [
  { id: 1, clinic: "Najot Shifo", type: "Google Calendar", error: "Ошибка авторизации", date: "14.04.2025" },
];

export const mockActivityFeed = [
  { id: 1, type: "subscription" as const, message: "Клиника Najot Shifo продлила подписку", date: "14.04.2025", time: "09:45" },
  { id: 2, type: "doctor" as const, message: "Добавлен врач: Ортиков Ш.О.", date: "13.04.2025", time: "15:30" },
  { id: 3, type: "error" as const, message: "Ошибка интеграции Google Calendar", date: "13.04.2025", time: "11:20" },
  { id: 4, type: "patient" as const, message: "Зарегистрирован новый пациент", date: "12.04.2025", time: "14:15" },
  { id: 5, type: "appointment" as const, message: "Отменен прием №245", date: "12.04.2025", time: "10:05" },
];

export const mockExpiringSubscriptions = [
  { id: 1, clinic: "Najot Shifo", expiresIn: "65 дней", expiryDate: "01.06.2025" }
];

export const mockLicenseInfo = {
  status: "Активна",
  type: "Корпоративный",
  clinics: { current: 1, max: "∞" },
  doctors: { current: 10, max: 1000 }
};
