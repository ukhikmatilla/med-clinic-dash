
import { useState } from 'react';
import { Subscription } from '@/types/subscription';
import { useToast } from '@/hooks/use-toast';
import { getDoctorsLimitByPlan } from '@/utils/subscriptionUtils';
import { 
  formatPlanChangeApprovedMessage,
  sendTelegramNotification 
} from '@/utils/notificationUtils';

export function useSubscriptionManagement(initialSubscription: Subscription) {
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription>(initialSubscription);
  const [isLoading, setIsLoading] = useState(false);

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

  // Функция для продления подписки админом
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
    setIsLoading(false);
    
    toast({
      title: "Подписка продлена",
      description: `Подписка для ${subscription.clinicName} продлена на ${months} месяцев`
    });
    
    return updatedSubscription;
  };

  // Функция для изменения тарифного плана для суперадмина (мгновенное изменение)
  const changePlan = async (newPlan: string): Promise<Subscription> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Определяем изменение лимита врачей в зависимости от нового тарифа
    const newDoctorsLimit = getDoctorsLimitByPlan(newPlan);
    
    const updatedSubscription = {
      ...subscription,
      planName: newPlan,
      doctorsLimit: newDoctorsLimit
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
    isLoading,
    updateSubscription,
    extendSubscription,
    changePlan,
    toggleAutoRenewal
  };
}
