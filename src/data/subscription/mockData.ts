
import { 
  Subscription, 
  PaymentHistory, 
  SubscriptionExtensionRequest,
  PlanChangeRequest 
} from '@/types/subscription';

// Мок-данные для подписки Najot Shifo
export const mockSubscription: Subscription = {
  id: "sub_1",
  clinicId: "clinic_najot",
  clinicName: "Najot Shifo",
  planName: "CRM + Telegram",
  expiryDate: "2025-05-15", // Дата близкая к истечению (15 дней)
  autoRenewal: true,
  doctorsUsed: 10,
  doctorsLimit: 20,
  trialActive: false,
  status: 'active'
};

// Мок-данные для истории платежей
export const mockPayments: PaymentHistory[] = [
  {
    id: "pay_1",
    date: "2025-04-01",
    amount: "250,000 сум",
    planName: "CRM + Telegram",
    status: "success",
    clinicId: "clinic_najot",
    clinicName: "Najot Shifo",
    source: "payme"
  },
  {
    id: "pay_2",
    date: "2025-03-01",
    amount: "250,000 сум",
    planName: "CRM + Telegram",
    status: "success",
    clinicId: "clinic_najot",
    clinicName: "Najot Shifo",
    source: "bot"
  },
  {
    id: "pay_3",
    date: "2025-02-01",
    amount: "250,000 сум",
    planName: "CRM + Telegram",
    status: "success",
    clinicId: "clinic_najot",
    clinicName: "Najot Shifo",
    source: "payme"
  }
];

// Мок-данные для запросов на продление подписки
export const mockExtensionRequests: SubscriptionExtensionRequest[] = [
  {
    id: "req_1",
    clinicId: "clinic_najot",
    clinicName: "Najot Shifo",
    requestedMonths: 3,
    requestedAt: "2025-04-15T10:30:00Z",
    status: 'pending'
  }
];

// Мок-данные для запросов на смену тарифа
export const mockPlanChangeRequests: PlanChangeRequest[] = [
  {
    id: "pcr_1",
    clinicId: "clinic_najot",
    clinicName: "Najot Shifo",
    currentPlan: "CRM + Telegram",
    requestedPlan: "CRM Premium (20 врачей)",
    requestedAt: "2025-04-15T09:15:00Z",
    status: 'pending'
  }
];
