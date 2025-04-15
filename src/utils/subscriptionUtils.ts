
import { PlanChangeRequest, Subscription } from "@/types/subscription";

// Функция для расчета оставшихся дней
export const calculateDaysRemaining = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

// Функция для проверки наличия ожидающего запроса на смену тарифа
export const getPendingPlanChangeRequest = (
  requests: PlanChangeRequest[], 
  clinicId: string
): { requestedPlan: string, status: 'pending' } | null => {
  const pendingRequest = requests.find(
    req => req.clinicId === clinicId && req.status === 'pending'
  );
  
  if (pendingRequest) {
    return {
      requestedPlan: pendingRequest.requestedPlan,
      status: 'pending'
    };
  }
  
  return null;
};

// Определение лимита врачей в зависимости от тарифа
export const getDoctorsLimitByPlan = (planName: string): number => {
  if (planName.includes("Basic")) {
    return 5;
  } else if (planName.includes("Telegram")) {
    return 10;
  } else if (planName.includes("Premium")) {
    return 20;
  }
  return 10; // Default limit
};

// Получение формы слова "месяц" в зависимости от числа
export const getMonthWord = (months: number): string => {
  if (months === 1) return "месяц";
  if (months >= 2 && months <= 4) return "месяца";
  return "месяцев";
};
