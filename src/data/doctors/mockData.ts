
import { Doctor, Service } from "@/hooks/useDoctorsData";

// Mock services data
export const mockServices: Service[] = [
  { id: "service1", name: "Консультация", price: "50 000 сум" },
  { id: "service2", name: "УЗИ щитовидной железы", price: "90 000 сум" },
  { id: "service3", name: "Анализ крови", price: "50 000 сум" },
  { id: "service4", name: "ЭКГ", price: "168 000 сум" },
  { id: "service5", name: "Вакцинация", price: "120 000 сум" },
  { id: "service6", name: "Физиотерапия", price: "85 000 сум" },
  { id: "service7", name: "Массаж", price: "100 000 сум" },
  { id: "service8", name: "Кардиограмма", price: "200 000 сум" },
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
    status: "active"
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
    status: "active"
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
    status: "active"
  },
  {
    id: "doc4",
    fullName: "Закирова Гульноза Алишеровна",
    specialties: ["Кардиолог", "Терапевт"],
    telegramId: null,
    schedule: {},
    services: ["service1", "service4", "service8"],
    status: "active"
  },
  {
    id: "doc5",
    fullName: "Алимов Рустам Рахимович",
    specialties: ["УЗИ-специалист"],
    telegramId: null,
    schedule: {},
    services: ["service1", "service2"],
    status: "active"
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
    status: "active"
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
    status: "active"
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
    status: "active"
  },
  {
    id: "doc9",
    fullName: "Тураханова Дилорам",
    specialties: ["Массажист"],
    telegramId: null,
    schedule: {},
    services: ["service7"],
    status: "active"
  }
];
