
import { Doctor, Service } from "@/hooks/doctors/types";

// Mock services data
export const mockServices: Service[] = [
  { id: "service1", name: "Консультация", price: 50000, durationMin: 15 },
  { id: "service2", name: "УЗИ щитовидной железы", price: 90000, durationMin: 30 },
  { id: "service3", name: "Анализ крови", price: 50000, durationMin: 10 },
  { id: "service4", name: "ЭКГ", price: 168000, durationMin: 20 },
  { id: "service5", name: "Вакцинация", price: 120000, durationMin: 15 },
  { id: "service6", name: "Физиотерапия", price: 85000, durationMin: 40 },
  { id: "service7", name: "Массаж", price: 100000, durationMin: 60 },
  { id: "service8", name: "Кардиограмма", price: 200000, durationMin: 30 },
];

// Mock doctors data
export const mockDoctors: Doctor[] = [
  {
    id: "doc1",
    fullName: "Ортиков Шерзод Одилбекович",
    specialties: ["Дерматолог", "Косметолог"],
    telegramId: null,
    schedule: {
      "Понедельник": "14:00–17:00",
      "Вторник": "14:00–17:00",
      "Среда": "14:00–17:00",
      "Четверг": "14:00–17:00",
      "Пятница": "14:00–17:00",
      "Суббота": "14:00–17:00"
    },
    services: ["service1", "service6"],
    status: "active",
    experience: "23 г.",
    category: "Третья категория",
    initialConsultation: "По запросу",
    followupConsultation: "По запросу"
  },
  {
    id: "doc2",
    fullName: "Рахимжонова Сайёра Файзуллаевна",
    specialties: ["УЗИ-специалист"],
    telegramId: "@sayyora_uzist",
    schedule: {
      "Понедельник": "09:30–16:00",
      "Вторник": "09:30–16:00",
      "Среда": "09:30–16:00",
      "Четверг": "09:30–16:00",
      "Пятница": "09:30–16:00",
      "Суббота": "09:30–16:00"
    },
    services: ["service1", "service2"],
    status: "active",
    experience: "25 л.",
    category: "Высшая категория",
    initialConsultation: "35 000 сум",
    followupConsultation: "По запросу"
  },
  {
    id: "doc3",
    fullName: "Каримова Дилором Эргашевна",
    specialties: ["Акушер", "Гинеколог"],
    telegramId: null,
    schedule: {
      "Понедельник": "09:00–14:00",
      "Вторник": "09:00–14:00",
      "Среда": "09:00–14:00",
      "Четверг": "09:00–14:00",
      "Пятница": "09:00–14:00"
    },
    services: ["service1", "service3"],
    status: "active",
    experience: "37 л.",
    category: "Высшая категория",
    initialConsultation: "По запросу",
    followupConsultation: "По запросу"
  },
  {
    id: "doc4",
    fullName: "Закирова Гульноза Алишеровна",
    specialties: ["Кардиолог", "Терапевт"],
    telegramId: null,
    schedule: {},
    services: ["service1", "service4", "service8"],
    status: "active",
    experience: "13 л.",
    category: "—",
    initialConsultation: "По запросу",
    followupConsultation: "По запросу"
  },
  {
    id: "doc5",
    fullName: "Алимов Рустам Рахимович",
    specialties: ["УЗИ-специалист"],
    telegramId: null,
    schedule: {},
    services: ["service1", "service2"],
    status: "active",
    experience: "34 г.",
    category: "—",
    initialConsultation: "По запросу",
    followupConsultation: "По запросу"
  },
  {
    id: "doc6",
    fullName: "Эронов Мирзокул Мардонович",
    specialties: ["Терапевт", "Кардиохирург"],
    telegramId: null,
    schedule: {
      "Понедельник": "09:00–14:00",
      "Вторник": "09:00–14:00",
      "Среда": "09:00–14:00",
      "Четверг": "09:00–14:00",
      "Пятница": "09:00–14:00",
      "Суббота": "09:00–14:00"
    },
    services: ["service1", "service4", "service8"],
    status: "active",
    experience: "40 л.",
    category: "Высшая категория",
    initialConsultation: "По запросу",
    followupConsultation: "По запросу"
  },
  {
    id: "doc7",
    fullName: "Раджапов Фаррух Кувондикович",
    specialties: ["Андролог", "Уролог"],
    telegramId: null,
    schedule: {
      "Понедельник": "09:00–15:00",
      "Вторник": "09:00–15:00",
      "Среда": "09:00–15:00",
      "Четверг": "09:00–15:00",
      "Пятница": "09:00–15:00"
    },
    services: ["service1", "service3"],
    status: "active",
    experience: "—",
    category: "—",
    initialConsultation: "По запросу",
    followupConsultation: "По запросу"
  },
  {
    id: "doc8",
    fullName: "Каршиев Ойбек Абсаломович",
    specialties: ["Невролог", "Нейрофизиолог"],
    telegramId: null,
    schedule: {
      "Понедельник": "09:00–15:00",
      "Вторник": "09:00–15:00",
      "Среда": "09:00–15:00",
      "Четверг": "09:00–15:00",
      "Пятница": "09:00–15:00",
      "Суббота": "09:00–15:00"
    },
    services: ["service1"],
    status: "active",
    experience: "8 л.",
    category: "Вторая категория",
    initialConsultation: "По запросу",
    followupConsultation: "По запросу"
  },
  {
    id: "doc9",
    fullName: "Тураханова Дилорам",
    specialties: ["Массажист"],
    telegramId: null,
    schedule: {},
    services: ["service7"],
    status: "active",
    experience: "9 л.",
    category: "Вторая категория",
    initialConsultation: "По запросу",
    followupConsultation: "По запросу"
  }
];
