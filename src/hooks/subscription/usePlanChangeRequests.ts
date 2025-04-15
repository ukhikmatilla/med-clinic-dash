
import { useState } from 'react';
import { PlanChangeRequest } from '@/types/subscription';
import { useToast } from '@/hooks/use-toast';
import { 
  formatPlanChangeRequestMessage, 
  formatPlanChangeApprovedMessage,
  formatPlanChangeRejectedMessage,
  sendTelegramNotification 
} from '@/utils/notificationUtils';
import { getDoctorsLimitByPlan } from '@/utils/subscriptionUtils';

export function usePlanChangeRequests(initialRequests: PlanChangeRequest[]) {
  const { toast } = useToast();
  const [planChangeRequests, setPlanChangeRequests] = useState<PlanChangeRequest[]>(initialRequests);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для создания запроса на смену тарифа
  const requestChangePlan = async (
    newPlan: string,
    clinicInfo: { clinicId: string, clinicName: string, currentPlan: string }
  ): Promise<boolean> => {
    setIsLoading(true);
    
    // Проверяем, что нет уже существующего ожидающего запроса
    const existingRequest = planChangeRequests.find(
      req => req.clinicId === clinicInfo.clinicId && req.status === 'pending'
    );
    
    if (existingRequest) {
      toast({
        title: "Запрос уже существует",
        description: "У вас уже есть ожидающий подтверждения запрос на смену тарифа",
        variant: "destructive"
      });
      setIsLoading(false);
      return false;
    }
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Создаем новый запрос на смену тарифа
    const newRequest: PlanChangeRequest = {
      id: `pcr_${planChangeRequests.length + 1}`,
      clinicId: clinicInfo.clinicId,
      clinicName: clinicInfo.clinicName,
      currentPlan: clinicInfo.currentPlan,
      requestedPlan: newPlan,
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    setPlanChangeRequests([newRequest, ...planChangeRequests]);
    
    // Отправляем уведомление в Telegram суперадмину
    try {
      const message = formatPlanChangeRequestMessage(clinicInfo.clinicName, clinicInfo.currentPlan, newPlan);
      await sendTelegramNotification(message);
    } catch (error) {
      console.error("Error sending Telegram notification:", error);
    }
    
    toast({
      title: "Запрос отправлен",
      description: "Запрос на смену тарифа отправлен администратору системы"
    });
    
    setIsLoading(false);
    
    return true;
  };

  // Функция для обработки запроса на смену тарифа (подтверждение/отклонение)
  const handlePlanChangeRequest = async (
    requestId: string, 
    approve: boolean, 
    comment?: string,
    onApprove?: (request: PlanChangeRequest, newDoctorsLimit: number) => Promise<void>
  ): Promise<void> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Находим запрос по ID
    const request = planChangeRequests.find(req => req.id === requestId);
    
    if (!request) {
      setIsLoading(false);
      throw new Error("Запрос не найден");
    }
    
    // Обновляем статус запроса
    const updatedRequests = planChangeRequests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: approve ? 'approved' as const : 'rejected' as const,
          adminComment: comment
        };
      }
      return req;
    });
    
    setPlanChangeRequests(updatedRequests);
    
    // Определяем изменение лимита врачей в зависимости от нового тарифа
    const newDoctorsLimit = getDoctorsLimitByPlan(request.requestedPlan);
    
    // Если запрос одобрен, вызываем коллбэк
    if (approve && onApprove) {
      await onApprove(request, newDoctorsLimit);
      
      // Отправляем уведомление в Telegram клинике
      try {
        const message = formatPlanChangeApprovedMessage(request.clinicName, request.requestedPlan);
        await sendTelegramNotification(message, request.clinicId);
      } catch (error) {
        console.error("Error sending Telegram notification:", error);
      }
    } else if (!approve) {
      // Отправляем уведомление в Telegram клинике об отказе
      try {
        const message = formatPlanChangeRejectedMessage(
          request.clinicName, 
          request.requestedPlan, 
          comment
        );
        await sendTelegramNotification(message, request.clinicId);
      } catch (error) {
        console.error("Error sending Telegram notification:", error);
      }
    }
    
    toast({
      title: approve ? "Запрос одобрен" : "Запрос отклонен",
      description: approve 
        ? `Тариф для клиники ${request.clinicName} изменен на ${request.requestedPlan}`
        : `Запрос на смену тарифа от клиники ${request.clinicName} отклонен`
    });
    
    setIsLoading(false);
  };

  return {
    planChangeRequests,
    isLoading,
    requestChangePlan,
    handlePlanChangeRequest
  };
}
