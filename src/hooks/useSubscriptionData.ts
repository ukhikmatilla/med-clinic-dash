
import { useState } from 'react';
import { Subscription, PaymentHistory } from '@/types/subscription';

// Мок-данные для подписки Najot Shifo
const mockSubscription: Subscription = {
  id: "sub_1",
  clinicId: "clinic_najot",
  clinicName: "Najot Shifo",
  planName: "CRM + Telegram",
  expiryDate: "2025-05-15", // Дата близкая к истечению (15 дней)
  autoRenewal: true,
  doctorsUsed: 10,
  doctorsLimit: 20,
  trialActive: false
};

// Мок-данные для истории платежей
const mockPayments: PaymentHistory[] = [
  {
    id: "pay_1",
    date: "2025-04-01",
    amount: "250,000 сум",
    planName: "CRM + Telegram",
    status: "success"
  },
  {
    id: "pay_2",
    date: "2025-03-01",
    amount: "250,000 сум",
    planName: "CRM + Telegram",
    status: "success"
  },
  {
    id: "pay_3",
    date: "2025-02-01",
    amount: "250,000 сум",
    planName: "CRM + Telegram",
    status: "success"
  }
];

export function useSubscriptionData() {
  const [subscription, setSubscription] = useState<Subscription>(mockSubscription);
  const [payments, setPayments] = useState<PaymentHistory[]>(mockPayments);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для расчета оставшихся дней
  const calculateDaysRemaining = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Дни до истечения подписки
  const daysRemaining = calculateDaysRemaining(subscription.expiryDate);

  // Мок функции для обновления подписки
  const updateSubscription = async (newData: Partial<Subscription>): Promise<Subscription> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedSubscription = {
      ...subscription,
      ...newData
    };
    
    setSubscription(updatedSubscription);
    setIsLoading(false);
    return updatedSubscription;
  };

  // Функция для продления подписки
  const extendSubscription = async (months: number): Promise<Subscription> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const currentExpiry = new Date(subscription.expiryDate);
    currentExpiry.setMonth(currentExpiry.getMonth() + months);
    
    const updatedSubscription = {
      ...subscription,
      expiryDate: currentExpiry.toISOString().split('T')[0]
    };
    
    setSubscription(updatedSubscription);
    
    // Добавляем новую оплату в историю
    const newPayment: PaymentHistory = {
      id: `pay_${payments.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      amount: "250,000 сум",
      planName: subscription.planName,
      status: "success"
    };
    
    setPayments([newPayment, ...payments]);
    setIsLoading(false);
    
    return updatedSubscription;
  };

  // Функция для изменения тарифного плана
  const changePlan = async (newPlan: string): Promise<Subscription> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedSubscription = {
      ...subscription,
      planName: newPlan
    };
    
    setSubscription(updatedSubscription);
    setIsLoading(false);
    
    return updatedSubscription;
  };

  // Функция для переключения автопродления
  const toggleAutoRenewal = async (): Promise<Subscription> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedSubscription = {
      ...subscription,
      autoRenewal: !subscription.autoRenewal
    };
    
    setSubscription(updatedSubscription);
    setIsLoading(false);
    
    return updatedSubscription;
  };

  return {
    subscription,
    payments,
    isLoading,
    daysRemaining,
    updateSubscription,
    extendSubscription,
    changePlan,
    toggleAutoRenewal
  };
}
