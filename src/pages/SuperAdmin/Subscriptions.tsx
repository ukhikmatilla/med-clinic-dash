
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SubscriptionCard } from "@/components/subscription/SubscriptionCard";
import { PaymentsTable } from "@/components/subscription/PaymentsTable";
import { SubscriptionAlert } from "@/components/subscription/SubscriptionAlert";
import { useSubscriptionData } from "@/hooks/useSubscriptionData";
import { useToast } from "@/hooks/use-toast";

export default function SuperAdminSubscriptions() {
  const { 
    subscription, 
    payments, 
    daysRemaining, 
    isLoading,
    extendSubscription,
    changePlan,
    toggleAutoRenewal
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

  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Управление подписками</h1>
          <p className="text-muted-foreground">
            Управление подпиской клиники {subscription.clinicName}
          </p>
        </div>

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
        />

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>История платежей</CardTitle>
              <CardDescription>
                Последние транзакции по подписке клиники {subscription.clinicName}
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
