
import { useState } from 'react';
import { SubscriptionExtensionRequest } from '@/types/subscription';
import { useToast } from '@/hooks/use-toast';
import { formatExtensionRequestMessage, sendTelegramNotification } from '@/utils/notificationUtils';

export function useExtensionRequests(initialRequests: SubscriptionExtensionRequest[]) {
  const { toast } = useToast();
  const [extensionRequests, setExtensionRequests] = useState<SubscriptionExtensionRequest[]>(initialRequests);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для создания запроса на продление подписки
  const requestExtendSubscription = async (
    months: number, 
    clinicInfo: { clinicId: string, clinicName: string }
  ): Promise<boolean> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Создаем новый запрос на продление
    const newRequest: SubscriptionExtensionRequest = {
      id: `req_${extensionRequests.length + 1}`,
      clinicId: clinicInfo.clinicId,
      clinicName: clinicInfo.clinicName,
      requestedMonths: months,
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    setExtensionRequests([newRequest, ...extensionRequests]);
    
    // Отправляем уведомление в Telegram суперадмину
    try {
      const message = formatExtensionRequestMessage(clinicInfo.clinicName, months);
      await sendTelegramNotification(message);
    } catch (error) {
      console.error("Error sending Telegram notification:", error);
    }
    
    setIsLoading(false);
    
    return true;
  };

  // Функция для обработки запроса на продление (подтверждение/отклонение)
  const handleExtensionRequest = async (
    requestId: string, 
    approve: boolean, 
    comment?: string,
    onApprove?: (request: SubscriptionExtensionRequest) => Promise<void>
  ): Promise<void> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Находим запрос по ID
    const request = extensionRequests.find(req => req.id === requestId);
    
    if (!request) {
      setIsLoading(false);
      throw new Error("Запрос не найден");
    }
    
    // Обновляем статус запроса
    const updatedRequests = extensionRequests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: approve ? 'approved' as const : 'rejected' as const,
          adminComment: comment
        };
      }
      return req;
    });
    
    setExtensionRequests(updatedRequests);
    
    // Если запрос одобрен, вызываем коллбэк
    if (approve && onApprove) {
      const updatedRequest = updatedRequests.find(req => req.id === requestId);
      if (updatedRequest) {
        await onApprove(updatedRequest);
      }
    }
    
    toast({
      title: approve ? "Запрос одобрен" : "Запрос отклонен",
      description: approve 
        ? `Подписка для ${request.clinicName} продлена на ${request.requestedMonths} месяцев`
        : `Запрос на продление от клиники ${request.clinicName} отклонен`
    });
    
    setIsLoading(false);
  };

  return {
    extensionRequests,
    isLoading,
    requestExtendSubscription,
    handleExtensionRequest
  };
}
