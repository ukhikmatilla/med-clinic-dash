
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ToggleLeft, ToggleRight } from "lucide-react";

interface SubscriptionInfoProps {
  status: string;
  expiryDate: string;
  plan: string;
  autoRenewal: boolean;
}

export function SubscriptionInfo({ status, expiryDate, plan, autoRenewal }: SubscriptionInfoProps) {
  return (
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
        </div>
        
        <div className="flex flex-col gap-2">
          <Button>Продлить</Button>
          <Button variant="outline">Изменить тариф</Button>
          <Button variant="outline" className="text-destructive hover:text-destructive">Отключить</Button>
        </div>
      </CardContent>
    </Card>
  );
}
