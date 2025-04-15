
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SubscriptionCard } from "@/components/subscription/SubscriptionCard";
import { PaymentsTable } from "@/components/subscription/PaymentsTable";
import { SubscriptionAlert } from "@/components/subscription/SubscriptionAlert";
import { PendingExtensionRequests } from "@/components/subscription/PendingExtensionRequests";
import { PlanChangeRequests } from "@/components/subscription/PlanChangeRequests";
import { useSubscriptionData } from "@/hooks/useSubscriptionData";
import { useToast } from "@/hooks/use-toast";

export default function SuperAdminSubscriptions() {
  const { 
    subscription, 
    payments, 
    extensionRequests,
    planChangeRequests,
    daysRemaining, 
    isLoading,
    extendSubscription,
    changePlan,
    toggleAutoRenewal,
    generateInvoice,
    handleExtensionRequest,
    handlePlanChangeRequest
  } = useSubscriptionData();
  const { toast } = useToast();
  
  // Обработчик продления подписки
  const handleExtendSubscription = async (months: number) => {
    try {
      await extendSubscription(months);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось продлить подписку",
        variant: "destructive"
      });
    }
  };
  
  // Обработчик изменения тарифа
  const handleChangePlan = async (plan: string) => {
    try {
      await changePlan(plan);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить тариф",
        variant: "destructive"
      });
    }
  };
  
  // Обработчик переключения автопродления
  const handleToggleAutoRenewal = async () => {
    try {
      await toggleAutoRenewal();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить статус автопродления",
        variant: "destructive"
      });
    }
  };
  
  // Обработчик генерации счета
  const handleGenerateInvoice = async (invoiceData) => {
    try {
      await generateInvoice(invoiceData);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать счёт",
        variant: "destructive"
      });
    }
  };

  // Обработчик подтверждения запроса на продление
  const handleApproveRequest = async (requestId: string) => {
    try {
      await handleExtensionRequest(requestId, true);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось подтвердить запрос",
        variant: "destructive"
      });
    }
  };

  // Обработчик отклонения запроса на продление
  const handleRejectRequest = async (requestId: string, comment?: string) => {
    try {
      await handleExtensionRequest(requestId, false, comment);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отклонить запрос",
        variant: "destructive"
      });
    }
  };
  
  // Обработчик подтверждения запроса на смену тарифа
  const handleApprovePlanChange = async (requestId: string) => {
    try {
      await handlePlanChangeRequest(requestId, true);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось подтвердить запрос на смену тарифа",
        variant: "destructive"
      });
    }
  };
  
  // Обработчик отклонения запроса на смену тарифа
  const handleRejectPlanChange = async (requestId: string, comment?: string) => {
    try {
      await handlePlanChangeRequest(requestId, false, comment);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отклонить запрос на смену тарифа",
        variant: "destructive"
      });
    }
  };

  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Управление подписками</h1>
          <p className="text-muted-foreground">
            Управление подпиской клиники {subscription.clinicName}
          </p>
        </div>

        {/* Запросы на смену тарифа */}
        <PlanChangeRequests 
          requests={planChangeRequests}
          onApprove={handleApprovePlanChange}
          onReject={handleRejectPlanChange}
          isLoading={isLoading}
        />

        {/* Запросы на продление подписки */}
        <PendingExtensionRequests 
          requests={extensionRequests}
          onApprove={handleApproveRequest}
          onReject={handleRejectRequest}
          isLoading={isLoading}
        />

        {/* Уведомление о скором окончании подписки */}
        <SubscriptionAlert 
          daysRemaining={daysRemaining} 
          clinicName={subscription.clinicName}
          expiryDate={subscription.expiryDate}
        />

        {/* Карточка с информацией о подписке */}
        <SubscriptionCard
          subscription={subscription}
          daysRemaining={daysRemaining}
          isLoading={isLoading}
          onExtend={handleExtendSubscription}
          onChangePlan={handleChangePlan}
          onToggleAutoRenewal={handleToggleAutoRenewal}
          onGenerateInvoice={handleGenerateInvoice}
        />

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>История платежей и счетов</CardTitle>
              <CardDescription>
                Последние транзакции и выставленные счета для клиники {subscription.clinicName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentsTable payments={payments} />
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
}
