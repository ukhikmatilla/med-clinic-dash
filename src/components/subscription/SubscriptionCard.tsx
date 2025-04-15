import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Subscription, InvoiceFormData } from "@/types/subscription";
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle,
  RefreshCw, 
  FileText, 
  Pencil
} from "lucide-react";
import { ExtendSubscriptionModal } from "./ExtendSubscriptionModal";
import { ChangePlanModal } from "./ChangePlanModal";
import { GenerateInvoiceModal } from "./GenerateInvoiceModal";

interface SubscriptionCardProps {
  subscription: Subscription;
  daysRemaining: number;
  isLoading: boolean;
  onExtend: (months: number) => Promise<boolean | void>;
  onChangePlan: (plan: string) => Promise<boolean | void>;
  onToggleAutoRenewal: () => Promise<void>;
  onGenerateInvoice: (data: InvoiceFormData) => Promise<void>;
}

export function SubscriptionCard({ 
  subscription, 
  daysRemaining, 
  isLoading,
  onExtend,
  onChangePlan,
  onToggleAutoRenewal,
  onGenerateInvoice
}: SubscriptionCardProps) {
  const { toast } = useToast();
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [isChangePlanModalOpen, setIsChangePlanModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // Форматирование даты в локальный формат
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Обработчик для переключения автопродления
  const handleToggleAutoRenewal = async () => {
    try {
      await onToggleAutoRenewal();
      toast({
        title: "Статус автопродления изменен",
        description: subscription.autoRenewal 
          ? "Автопродление отключено" 
          : "Автопродление включено"
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить статус автопродления",
        variant: "destructive"
      });
    }
  };

  // Расчет процента использования лимита врачей
  const doctorsPercentage = Math.round((subscription.doctorsUsed / subscription.doctorsLimit) * 100);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <span className="mr-1">Подписка клиники:</span>
          <span className="text-medical-light-blue font-bold">{subscription.clinicName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="font-medium">Текущий тариф:</span>
              <span className="ml-2 font-bold">{subscription.planName}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <span className="font-medium">Дата окончания:</span>
              <span className="ml-2">{formatDate(subscription.expiryDate)}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-500 mr-2" />
              <span className="font-medium">Осталось до окончания:</span>
              <span className="ml-2 font-semibold">{daysRemaining} дней</span>
            </div>
            
            <div className="flex items-center">
              <RefreshCw className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium">Автопродление:</span>
              <Switch 
                className="ml-2" 
                checked={subscription.autoRenewal}
                onCheckedChange={handleToggleAutoRenewal}
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-500">
                {subscription.autoRenewal ? "Включено" : "Отключено"}
              </span>
            </div>
            
            <div>
              <div className="flex items-center mb-1">
                <Users className="h-5 w-5 text-indigo-500 mr-2" />
                <span className="font-medium">Лимит врачей:</span>
                <span className="ml-2">
                  {subscription.doctorsUsed} из {subscription.doctorsLimit}
                </span>
              </div>
              <Progress 
                value={doctorsPercentage} 
                className="h-2"
                color={doctorsPercentage > 80 ? "bg-amber-500" : ""}
              />
            </div>
            
            <div className="flex items-center">
              {subscription.trialActive ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-gray-400 mr-2" />
              )}
              <span className="font-medium">Пробный период:</span>
              <span className="ml-2 text-gray-600">
                {subscription.trialActive ? "Активен" : "Не активен"}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3 justify-end">
            <Button 
              variant="default" 
              className="w-full" 
              onClick={() => setIsExtendModalOpen(true)}
              disabled={isLoading}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Продлить
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setIsChangePlanModalOpen(true)}
              disabled={isLoading}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Изменить тариф
            </Button>
            
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => setIsInvoiceModalOpen(true)}
              disabled={isLoading}
            >
              <FileText className="mr-2 h-4 w-4" />
              Сгенерировать счёт
            </Button>
          </div>
        </div>
      </CardContent>
      
      <ExtendSubscriptionModal
        open={isExtendModalOpen}
        onOpenChange={setIsExtendModalOpen}
        onExtend={onExtend}
      />
      
      <ChangePlanModal
        open={isChangePlanModalOpen}
        onOpenChange={setIsChangePlanModalOpen}
        currentPlan={subscription.planName}
        onChangePlan={onChangePlan}
      />
      
      <GenerateInvoiceModal
        open={isInvoiceModalOpen}
        onOpenChange={setIsInvoiceModalOpen}
        currentPlan={subscription.planName}
        clinicId={subscription.clinicId}
        onGenerateInvoice={onGenerateInvoice}
      />
    </Card>
  );
}
