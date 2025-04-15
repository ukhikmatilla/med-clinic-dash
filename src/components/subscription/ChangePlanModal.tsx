import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ChangePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: string;
  onChangePlan: (planName: string) => Promise<boolean | void>; // Updated type to handle void return
}

export function ChangePlanModal({ 
  open, 
  onOpenChange, 
  currentPlan,
  onChangePlan 
}: ChangePlanModalProps) {
  const [selectedPlan, setSelectedPlan] = useState("CRM + Telegram (10 врачей)");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (selectedPlan === currentPlan) {
      onOpenChange(false);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await onChangePlan(selectedPlan);
      
      // Only close the modal if success is explicitly false
      if (success !== false) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error changing plan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const plans = [
    {
      id: "crm-basic",
      name: "CRM Basic (5 врачей)",
      price: "150,000",
      features: ["Управление пациентами", "Календарь приёмов", "Базовая статистика"]
    },
    {
      id: "crm-telegram",
      name: "CRM + Telegram (10 врачей)",
      price: "250,000",
      features: ["Всё из CRM Basic", "Telegram бот для записи", "Уведомления пациентам", "Расширенная статистика"]
    },
    {
      id: "crm-premium",
      name: "CRM Premium (20 врачей)",
      price: "400,000",
      features: ["Всё из CRM + Telegram", "Интеграция с Google Calendar", "Финансовый учёт", "Техподдержка 24/7"]
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Изменение тарифа</DialogTitle>
          <DialogDescription>
            Выберите тариф, который подходит для вашей клиники
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`flex items-start space-x-3 space-y-0 rounded-md border p-3 ${
                  selectedPlan === plan.name ? "border-primary" : ""
                } ${plan.name === currentPlan ? "bg-muted" : ""}`}
              >
                <RadioGroupItem value={plan.name} id={plan.id} />
                <div className="flex flex-col">
                  <Label
                    htmlFor={plan.id}
                    className="font-medium text-sm flex items-center"
                  >
                    {plan.name}
                    {plan.name === currentPlan && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        Текущий
                      </span>
                    )}
                  </Label>
                  <p className="text-[13px] text-muted-foreground">
                    {plan.price} сум/месяц
                  </p>
                  <ul className="text-xs mt-1 space-y-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Отмена
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || selectedPlan === currentPlan}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {isSubmitting ? "Обновление..." : "Сменить тариф"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
