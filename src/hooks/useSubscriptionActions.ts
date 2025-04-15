
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionInfo {
  isActive: boolean;
  expiryDate: string;
  planName: string;
  autoRenewal: boolean;
}

export function useSubscriptionActions() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>({
    isActive: true,
    expiryDate: "01.06.2025",
    planName: "CRM + Telegram (10 врачей)",
    autoRenewal: true
  });

  const extendSubscription = async (months: number): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update subscription info (in a real app this would be from API response)
      const currentExpiryDate = new Date(
        parseInt(subscriptionInfo.expiryDate.split('.')[2]),
        parseInt(subscriptionInfo.expiryDate.split('.')[1]) - 1,
        parseInt(subscriptionInfo.expiryDate.split('.')[0])
      );
      
      const newExpiryDate = new Date(currentExpiryDate);
      newExpiryDate.setMonth(newExpiryDate.getMonth() + months);
      
      const formattedNewDate = `${newExpiryDate.getDate().toString().padStart(2, '0')}.${(newExpiryDate.getMonth() + 1).toString().padStart(2, '0')}.${newExpiryDate.getFullYear()}`;
      
      setSubscriptionInfo(prev => ({
        ...prev,
        expiryDate: formattedNewDate
      }));
      
      toast({
        title: "Подписка продлена",
        description: `Подписка продлена до ${formattedNewDate}`
      });
      
      return true;
    } catch (error) {
      console.error("Error extending subscription:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось продлить подписку",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const changePlan = async (newPlanName: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update subscription info
      setSubscriptionInfo(prev => ({
        ...prev,
        planName: newPlanName
      }));
      
      toast({
        title: "Тариф изменен",
        description: `Новый тариф: ${newPlanName}`
      });
      
      return true;
    } catch (error) {
      console.error("Error changing subscription plan:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось изменить тариф",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAutoRenewal = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Toggle auto renewal
      const newAutoRenewalState = !subscriptionInfo.autoRenewal;
      
      setSubscriptionInfo(prev => ({
        ...prev,
        autoRenewal: newAutoRenewalState
      }));
      
      toast({
        title: "Автопродление изменено",
        description: newAutoRenewalState ? "Автопродление включено" : "Автопродление отключено"
      });
      
      return true;
    } catch (error) {
      console.error("Error toggling auto renewal:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось изменить настройки автопродления",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscriptionInfo,
    isLoading,
    extendSubscription,
    changePlan,
    toggleAutoRenewal
  };
}
