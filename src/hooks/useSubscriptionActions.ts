
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
  const [pendingPlanChange, setPendingPlanChange] = useState<{ requestedPlan: string } | null>(null);

  const extendSubscription = async (months: number): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // В реальном приложении здесь был бы запрос на продление,
      // а не мгновенное продление
      toast({
        title: "Запрос отправлен",
        description: `Запрос на продление подписки на ${months} месяцев отправлен`
      });
      
      return true;
    } catch (error) {
      console.error("Error sending subscription extension request:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить запрос на продление подписки",
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
      
      // В реальном приложении здесь был бы запрос на смену тарифа
      // вместо мгновенного изменения
      setPendingPlanChange({ requestedPlan: newPlanName });
      
      toast({
        title: "Запрос отправлен",
        description: `Запрос на смену тарифа на "${newPlanName}" отправлен администратору`
      });
      
      return true;
    } catch (error) {
      console.error("Error requesting plan change:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить запрос на смену тарифа",
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
    pendingPlanChange,
    isLoading,
    extendSubscription,
    changePlan,
    toggleAutoRenewal
  };
}
