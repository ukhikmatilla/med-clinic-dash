
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

interface ChangePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: string;
  onChangePlan: (plan: string) => Promise<void>;
}

export function ChangePlanModal({ 
  open, 
  onOpenChange, 
  currentPlan,
  onChangePlan
}: ChangePlanModalProps) {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plans = [
    {
      id: "CRM",
      name: "CRM",
      description: "Базовая функциональность CRM системы",
      price: "150,000 сум / месяц",
      features: [
        "Управление пациентами",
        "Расписание врачей",
        "Отчеты и статистика",
        "До 10 врачей"
      ]
    },
    {
      id: "CRM + Telegram",
      name: "CRM + Telegram",
      description: "Расширенная CRM + Telegram бот для клиентов",
      price: "250,000 сум / месяц",
      features: [
        "Все функции базового тарифа",
        "Интеграция с Telegram",
        "Онлайн-запись через бота",
        "Уведомления пациентам",
        "До 20 врачей"
      ]
    }
  ];

  const handleSubmit = async () => {
    if (selectedPlan === currentPlan) {
      onOpenChange(false);
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onChangePlan(selectedPlan);
      
      toast({
        title: "Тариф изменен",
        description: `Тариф успешно изменен на "${selectedPlan}"`
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить тариф",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Изменение тарифного плана</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <p className="text-sm text-muted-foreground mb-2">
            Выберите новый тарифный план:
          </p>
          
          <div className="space-y-4">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer
                  ${selectedPlan === plan.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  {selectedPlan === plan.id && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                
                <p className="text-sm font-medium mt-2">{plan.price}</p>
                
                <ul className="mt-2 space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit} 
            disabled={isSubmitting || selectedPlan === currentPlan}
          >
            {isSubmitting ? "Обновление..." : "Изменить тариф"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
