
import { useState } from 'react';
import { 
  Subscription, 
  PaymentHistory, 
  InvoiceFormData, 
  SubscriptionExtensionRequest,
  PlanChangeRequest
} from '@/types/subscription';
import { useToast } from '@/hooks/use-toast';
import { 
  formatExtensionRequestMessage, 
  formatPlanChangeRequestMessage,
  formatPlanChangeApprovedMessage,
  formatPlanChangeRejectedMessage,
  sendTelegramNotification 
} from '@/utils/notificationUtils';

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
  trialActive: false,
  status: 'active'
};

// Мок-данные для истории платежей
const mockPayments: PaymentHistory[] = [
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
const mockExtensionRequests: SubscriptionExtensionRequest[] = [
  {
    id: "req_1",
    clinicId: "clinic_najot",
    clinicName: "Najot Shifo",
    requestedMonths: 3,
    requestedAt: "2025-04-15T10:30:00Z",
    status: 'pending'
  },
  {
    id: "req_2",
    clinicId: "clinic_medlife",
    clinicName: "Medlife",
    requestedMonths: 6,
    requestedAt: "2025-04-14T14:22:00Z",
    status: 'pending'
  }
];

// Мок-данные для запросов на смену тарифа
const mockPlanChangeRequests: PlanChangeRequest[] = [
  {
    id: "pcr_1",
    clinicId: "clinic_najot",
    clinicName: "Najot Shifo",
    currentPlan: "CRM + Telegram",
    requestedPlan: "CRM Premium (20 врачей)",
    requestedAt: "2025-04-15T09:15:00Z",
    status: 'pending'
  },
  {
    id: "pcr_2",
    clinicId: "clinic_family",
    clinicName: "Family Med",
    currentPlan: "CRM Basic (5 врачей)",
    requestedPlan: "CRM + Telegram (10 врачей)",
    requestedAt: "2025-04-14T16:45:00Z",
    status: 'pending'
  }
];

export function useSubscriptionData() {
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription>(mockSubscription);
  const [payments, setPayments] = useState<PaymentHistory[]>(mockPayments);
  const [extensionRequests, setExtensionRequests] = useState<SubscriptionExtensionRequest[]>(mockExtensionRequests);
  const [planChangeRequests, setPlanChangeRequests] = useState<PlanChangeRequest[]>(mockPlanChangeRequests);
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

  // Функция для проверки наличия ожидающего запроса на смену тарифа
  const getPendingPlanChangeRequest = (clinicId: string): { requestedPlan: string, status: 'pending' } | null => {
    const pendingRequest = planChangeRequests.find(
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

  // Функция для создания запроса на продление подписки
  const requestExtendSubscription = async (months: number): Promise<boolean> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Создаем новый запрос на продление
    const newRequest: SubscriptionExtensionRequest = {
      id: `req_${extensionRequests.length + 1}`,
      clinicId: subscription.clinicId,
      clinicName: subscription.clinicName,
      requestedMonths: months,
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    setExtensionRequests([newRequest, ...extensionRequests]);
    
    // Отправляем уведомление в Telegram суперадмину
    try {
      const message = formatExtensionRequestMessage(subscription.clinicName, months);
      await sendTelegramNotification(message);
    } catch (error) {
      console.error("Error sending Telegram notification:", error);
    }
    
    setIsLoading(false);
    
    return true;
  };

  // Функция для создания запроса на смену тарифа
  const requestChangePlan = async (newPlan: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Проверяем, что нет уже существующего ожидающего запроса
    const existingRequest = planChangeRequests.find(
      req => req.clinicId === subscription.clinicId && req.status === 'pending'
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
      clinicId: subscription.clinicId,
      clinicName: subscription.clinicName,
      currentPlan: subscription.planName,
      requestedPlan: newPlan,
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    setPlanChangeRequests([newRequest, ...planChangeRequests]);
    
    // Отправляем уведомление в Telegram суперадмину
    try {
      const message = formatPlanChangeRequestMessage(subscription.clinicName, subscription.planName, newPlan);
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
    
    // Добавляем новую оплату в историю
    const newPayment: PaymentHistory = {
      id: `pay_${payments.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      amount: `${250000 * months} сум`,
      planName: subscription.planName,
      status: "success",
      clinicId: subscription.clinicId,
      clinicName: subscription.clinicName,
      source: "manual"
    };
    
    setPayments([newPayment, ...payments]);
    setIsLoading(false);
    
    toast({
      title: "Подписка продлена",
      description: `Подписка для ${subscription.clinicName} продлена на ${months} месяцев`
    });
    
    return updatedSubscription;
  };

  // Функция для обработки запроса на продление (подтверждение/отклонение)
  const handleExtensionRequest = async (requestId: string, approve: boolean, comment?: string): Promise<void> => {
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
    
    // Если запрос одобрен, продлеваем подписку
    if (approve) {
      await extendSubscription(request.requestedMonths);
    }
    
    toast({
      title: approve ? "Запрос одобрен" : "Запрос отклонен",
      description: approve 
        ? `Подписка для ${request.clinicName} продлена на ${request.requestedMonths} месяцев`
        : `Запрос на продление от клиники ${request.clinicName} отклонен`
    });
    
    setIsLoading(false);
  };

  // Функция для обработки запроса на смену тарифа (подтверждение/отклонение)
  const handlePlanChangeRequest = async (requestId: string, approve: boolean, comment?: string): Promise<void> => {
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
    let newDoctorsLimit = subscription.doctorsLimit;
    if (request.requestedPlan.includes("Basic")) {
      newDoctorsLimit = 5;
    } else if (request.requestedPlan.includes("Telegram")) {
      newDoctorsLimit = 10;
    } else if (request.requestedPlan.includes("Premium")) {
      newDoctorsLimit = 20;
    }
    
    // Если запрос одобрен, меняем тариф
    if (approve) {
      await updateSubscription({
        planName: request.requestedPlan,
        doctorsLimit: newDoctorsLimit
      });
      
      // Отправляем уведомление в Telegram клинике
      try {
        const message = formatPlanChangeApprovedMessage(request.clinicName, request.requestedPlan);
        await sendTelegramNotification(message, request.clinicId);
      } catch (error) {
        console.error("Error sending Telegram notification:", error);
      }
    } else {
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

  // Функция для изменения тарифного плана для суперадмина (мгновенное изменение)
  const changePlan = async (newPlan: string): Promise<Subscription> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Определяем изменение лимита врачей в зависимости от нового тарифа
    let newDoctorsLimit = subscription.doctorsLimit;
    if (newPlan.includes("Basic")) {
      newDoctorsLimit = 5;
    } else if (newPlan.includes("Telegram")) {
      newDoctorsLimit = 10;
    } else if (newPlan.includes("Premium")) {
      newDoctorsLimit = 20;
    }
    
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

  // Функция для генерации счета
  const generateInvoice = async (invoiceData: InvoiceFormData): Promise<void> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Форматирование суммы
    const formattedAmount = `${invoiceData.price.toLocaleString('ru-RU')} сум`;
    
    // Создаем новую запись в истории платежей для выставленного счета
    const newInvoice: PaymentHistory = {
      id: `inv_${payments.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      amount: formattedAmount,
      planName: invoiceData.tariff,
      status: "awaiting",
      invoiceGenerated: true,
      clinicId: subscription.clinicId,
      clinicName: subscription.clinicName,
      source: "manual"
    };
    
    setPayments([newInvoice, ...payments]);
    
    // Имитация отправки в Telegram
    if (invoiceData.sendToTelegram) {
      console.log("Отправка счета в Telegram администратору клиники", {
        clinicId: subscription.clinicId,
        amount: formattedAmount,
        period: `${invoiceData.period.from.toLocaleDateString('ru-RU')} - ${invoiceData.period.to.toLocaleDateString('ru-RU')}`,
        tariff: invoiceData.tariff
      });
    }
    
    setIsLoading(false);
  };

  return {
    subscription,
    payments,
    extensionRequests,
    planChangeRequests,
    isLoading,
    daysRemaining,
    updateSubscription,
    extendSubscription,
    requestExtendSubscription,
    requestChangePlan,
    changePlan,
    toggleAutoRenewal,
    generateInvoice,
    handleExtensionRequest,
    handlePlanChangeRequest,
    getPendingPlanChangeRequest
  };
}
