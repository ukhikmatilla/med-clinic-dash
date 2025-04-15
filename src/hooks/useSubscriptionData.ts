
import { useSubscriptionManagement } from './subscription/useSubscriptionManagement';
import { usePaymentHistory } from './subscription/usePaymentHistory';
import { useExtensionRequests } from './subscription/useExtensionRequests';
import { usePlanChangeRequests } from './subscription/usePlanChangeRequests';
import { calculateDaysRemaining, getPendingPlanChangeRequest } from '@/utils/subscriptionUtils';
import { 
  mockSubscription, 
  mockPayments, 
  mockExtensionRequests, 
  mockPlanChangeRequests 
} from '@/data/subscription/mockData';
import { InvoiceFormData } from '@/types/subscription';

export function useSubscriptionData() {
  const {
    subscription,
    isLoading: subscriptionLoading,
    updateSubscription,
    extendSubscription: extendSubscriptionBase,
    changePlan,
    toggleAutoRenewal
  } = useSubscriptionManagement(mockSubscription);

  const {
    payments,
    isLoading: paymentsLoading,
    addPayment,
    generateInvoice
  } = usePaymentHistory(mockPayments);

  const {
    extensionRequests,
    isLoading: extensionRequestsLoading,
    requestExtendSubscription,
    handleExtensionRequest: handleExtensionRequestBase
  } = useExtensionRequests(mockExtensionRequests);

  const {
    planChangeRequests,
    isLoading: planChangeRequestsLoading,
    requestChangePlan,
    handlePlanChangeRequest: handlePlanChangeRequestBase
  } = usePlanChangeRequests(mockPlanChangeRequests);

  // Дни до истечения подписки
  const daysRemaining = calculateDaysRemaining(subscription.expiryDate);

  // Расширенный метод продления подписки, который также добавляет запись в историю платежей
  const extendSubscription = async (months: number): Promise<ReturnType<typeof extendSubscriptionBase>> => {
    const updatedSubscription = await extendSubscriptionBase(months);
    
    // Добавляем новую оплату в историю
    const newPayment = {
      id: `pay_${payments.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      amount: `${250000 * months} сум`,
      planName: subscription.planName,
      status: "success" as const,
      clinicId: subscription.clinicId,
      clinicName: subscription.clinicName,
      source: "manual" as const
    };
    
    addPayment(newPayment);
    
    return updatedSubscription;
  };

  // Расширенный метод обработки запроса на продление
  const handleExtensionRequest = async (requestId: string, approve: boolean, comment?: string) => {
    await handleExtensionRequestBase(
      requestId, 
      approve, 
      comment,
      async (request) => {
        if (approve) {
          await extendSubscription(request.requestedMonths);
        }
      }
    );
  };

  // Расширенный метод обработки запроса на смену тарифа
  const handlePlanChangeRequest = async (requestId: string, approve: boolean, comment?: string) => {
    await handlePlanChangeRequestBase(
      requestId, 
      approve, 
      comment,
      async (request, newDoctorsLimit) => {
        if (approve) {
          await updateSubscription({
            planName: request.requestedPlan,
            doctorsLimit: newDoctorsLimit
          });
        }
      }
    );
  };

  // Обертка для создания запроса на смену тарифа
  const requestChangePlanWrapper = async (newPlan: string): Promise<boolean> => {
    return await requestChangePlan(newPlan, {
      clinicId: subscription.clinicId,
      clinicName: subscription.clinicName,
      currentPlan: subscription.planName
    });
  };

  // Обертка для создания запроса на продление подписки
  const requestExtendSubscriptionWrapper = async (months: number): Promise<boolean> => {
    return await requestExtendSubscription(months, {
      clinicId: subscription.clinicId,
      clinicName: subscription.clinicName
    });
  };

  // Обертка для генерации счета
  const generateInvoiceWrapper = async (invoiceData: InvoiceFormData): Promise<void> => {
    return await generateInvoice(invoiceData, {
      clinicId: subscription.clinicId,
      clinicName: subscription.clinicName
    });
  };

  // Общий статус загрузки
  const isLoading = 
    subscriptionLoading || 
    paymentsLoading || 
    extensionRequestsLoading || 
    planChangeRequestsLoading;

  return {
    subscription,
    payments,
    extensionRequests,
    planChangeRequests,
    isLoading,
    daysRemaining,
    updateSubscription,
    extendSubscription,
    requestExtendSubscription: requestExtendSubscriptionWrapper,
    requestChangePlan: requestChangePlanWrapper,
    changePlan,
    toggleAutoRenewal,
    generateInvoice: generateInvoiceWrapper,
    handleExtensionRequest,
    handlePlanChangeRequest,
    getPendingPlanChangeRequest: (clinicId: string) => 
      getPendingPlanChangeRequest(planChangeRequests, clinicId)
  };
}
