
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExtendSubscriptionModal } from "@/components/subscription/ExtendSubscriptionModal";
import { ChangePlanModal } from "@/components/subscription/ChangePlanModal";

interface SubscriptionInfoCardProps {
  subscriptionInfo: {
    isActive: boolean;
    expiryDate: string;
    planName: string;
    autoRenewal: boolean;
  };
  isLoading: boolean;
  extendSubscription: (months: number) => Promise<boolean>;
  changePlan: (planName: string) => Promise<boolean>;
  handleDisableAutoRenewal: () => Promise<void>;
}

export function SubscriptionInfoCard({
  subscriptionInfo,
  isLoading,
  extendSubscription,
  changePlan,
  handleDisableAutoRenewal
}: SubscriptionInfoCardProps) {
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [isChangePlanModalOpen, setIsChangePlanModalOpen] = useState(false);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Статус подписки</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-medical-light-blue p-3 sm:p-4 rounded-md">
          <h3 className="font-medium text-sm sm:text-base">✅ {subscriptionInfo.isActive ? "Активна" : "Неактивна"}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">до {subscriptionInfo.expiryDate}</p>
        </div>
        
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-1">Тариф</h3>
          <p className="text-xs sm:text-sm">{subscriptionInfo.planName}</p>
        </div>
        
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-1">Автопродление</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {subscriptionInfo.autoRenewal ? "Включено" : "Отключено"}
          </p>
        </div>
        
        <div className="pt-2 flex flex-col gap-2">
          <Button 
            className="text-xs sm:text-sm"
            onClick={() => setIsExtendModalOpen(true)}
            disabled={isLoading}
          >
            📥 Продлить подписку
          </Button>
          <Button 
            variant="outline" 
            className="text-xs sm:text-sm"
            onClick={() => setIsChangePlanModalOpen(true)}
            disabled={isLoading}
          >
            🧩 Изменить тариф
          </Button>
          {subscriptionInfo.autoRenewal && (
            <Button 
              variant="outline" 
              className="text-muted-foreground text-xs sm:text-sm"
              onClick={handleDisableAutoRenewal}
              disabled={isLoading}
            >
              🛑 Отключить автопродление
            </Button>
          )}
        </div>
      </CardContent>
      
      <ExtendSubscriptionModal
        open={isExtendModalOpen}
        onOpenChange={setIsExtendModalOpen}
        onExtend={extendSubscription}
      />
      
      <ChangePlanModal
        open={isChangePlanModalOpen}
        onOpenChange={setIsChangePlanModalOpen}
        currentPlan={subscriptionInfo.planName}
        onChangePlan={changePlan}
      />
    </Card>
  );
}
