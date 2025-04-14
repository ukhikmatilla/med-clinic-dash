
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { ManageSubscriptionDialog } from "./ManageSubscriptionDialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionInfoProps {
  status: string;
  expiryDate: string;
  plan: string;
  autoRenewal: boolean;
  clinicName: string;
  clinicId?: string;
  isSuperAdmin?: boolean;
  onExtend?: (data: { duration: number }) => void;
  onChangePlan?: (data: { plan: string }) => void;
  onDisable?: (data: { active: boolean }) => void;
  onToggleAutoRenewal?: (value: boolean) => void;
}

export function SubscriptionInfo({ 
  status, 
  expiryDate, 
  plan, 
  autoRenewal,
  clinicName,
  clinicId,
  isSuperAdmin = false,
  onExtend,
  onChangePlan,
  onDisable,
  onToggleAutoRenewal
}: SubscriptionInfoProps) {
  const [dialogMode, setDialogMode] = useState<"extend" | "change" | "disable" | null>(null);
  const [isToggling, setIsToggling] = useState(false);
  const { toast } = useToast();
  
  const handleExtend = () => {
    setDialogMode("extend");
  };
  
  const handleChangePlan = () => {
    setDialogMode("change");
  };
  
  const handleDisable = () => {
    setDialogMode("disable");
  };
  
  const handleConfirmAction = (data: any) => {
    switch(dialogMode) {
      case "extend":
        onExtend && onExtend(data);
        break;
      case "change":
        onChangePlan && onChangePlan(data);
        break;
      case "disable":
        onDisable && onDisable(data);
        break;
    }
  };
  
  const handleToggleAutoRenewal = async (checked: boolean) => {
    if (!isSuperAdmin || !onToggleAutoRenewal) return;
    
    setIsToggling(true);
    try {
      await onToggleAutoRenewal(checked);
    } catch (error) {
      toast({
        title: "Ошибка при обновлении",
        description: "Не удалось обновить статус автопродления",
        variant: "destructive"
      });
    } finally {
      setIsToggling(false);
    }
  };
  
  return (
    <>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Подписка</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-medical-light-blue p-3 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm">Статус:</span>
              <span className="flex items-center font-medium">
                <Check className="mr-1 h-3 w-3 text-green-500" /> 
                Активна
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Тип тарифа</h3>
            <p>{plan}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Действует до</h3>
            <p>{expiryDate}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Автопродление</h3>
            {isSuperAdmin ? (
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm">{autoRenewal ? "ВКЛ" : "ВЫКЛ"}</span>
                <div className="flex items-center relative">
                  {isToggling && (
                    <Loader2 className="absolute right-10 w-4 h-4 animate-spin text-primary" />
                  )}
                  <Switch
                    checked={autoRenewal}
                    onCheckedChange={handleToggleAutoRenewal}
                    disabled={isToggling}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                {autoRenewal ? (
                  <>
                    <ToggleRight className="mr-2 h-5 w-5 text-primary" />
                    <span>ВКЛ</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span>ВЫКЛ</span>
                  </>
                )}
              </div>
            )}
          </div>
          
          {isSuperAdmin && (
            <div className="flex flex-col gap-2">
              <Button onClick={handleExtend}>Продлить</Button>
              <Button variant="outline" onClick={handleChangePlan}>Изменить тариф</Button>
              <Button 
                variant="outline" 
                className="text-destructive hover:text-destructive"
                onClick={handleDisable}
              >
                Отключить
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {dialogMode && (
        <ManageSubscriptionDialog
          open={!!dialogMode}
          onOpenChange={(open) => !open && setDialogMode(null)}
          mode={dialogMode}
          clinicName={clinicName}
          currentPlan={plan}
          onConfirm={handleConfirmAction}
        />
      )}
    </>
  );
}
