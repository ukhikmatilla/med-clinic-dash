
export interface Doctor {
  id: string;
  fullName: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  patientName: string;
  patientId: string;
  service: string;
  paymentStatus: "paid" | "unpaid" | "partial" | "refunded";
  status: "completed" | "upcoming" | "cancelled" | "missed";
}

export const getMockAppointments = (): Appointment[] => [
  {
    id: "appt1",
    date: "15.04.2025",
    time: "14:30",
    patientName: "Azimov Bobur",
    patientId: "patient1",
    service: "Первичная консультация",
    paymentStatus: "paid",
    status: "completed"
  },
  {
    id: "appt2",
    date: "15.04.2025",
    time: "15:45",
    patientName: "Karimova Dilnoza",
    patientId: "patient2",
    service: "УЗИ щитовидной железы",
    paymentStatus: "unpaid",
    status: "upcoming"
  },
  {
    id: "appt3",
    date: "16.04.2025",
    time: "14:15",
    patientName: "Rahimov Jahongir",
    patientId: "patient3",
    service: "Повторная консультация",
    paymentStatus: "partial",
    status: "upcoming"
  },
  {
    id: "appt4",
    date: "14.04.2025",
    time: "16:30",
    patientName: "Nuriddinova Madina",
    patientId: "patient4",
    service: "ЭКГ",
    paymentStatus: "paid",
    status: "missed"
  },
  {
    id: "appt5",
    date: "13.04.2025",
    time: "15:00",
    patientName: "Yusupov Alisher",
    patientId: "patient5",
    service: "Консультация",
    paymentStatus: "refunded",
    status: "cancelled"
  },
];
