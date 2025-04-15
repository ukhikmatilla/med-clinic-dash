
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Check, CreditCard } from "lucide-react";

interface ChangePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: string;
  onChangePlan: (planName: string) => Promise<boolean>;
}

export function ChangePlanModal({ 
  open, 
  onOpenChange,
  currentPlan,
  onChangePlan
}: ChangePlanModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const plans = [
    {
      id: "basic",
      name: "Базовый",
      description: "CRM + Telegram (5 врачей)",
      price: "150,000",
      features: [
        "До 5 врачей",
        "Базовая CRM",
        "Telegram бот",
        "Базовая отчетность"
      ]
    },
    {
      id: "standard",
      name: "Стандарт",
      description: "CRM + Telegram (10 врачей)",
      price: "250,000",
      features: [
        "До 10 врачей",
        "Расширенная CRM",
        "Telegram бот",
        "Расширенная отчетность",
        "Интеграция с Google Calendar"
      ]
    },
    {
      id: "premium",
      name: "Премиум",
      description: "CRM + Telegram (без ограничений)",
      price: "400,000",
      features: [
        "Неограниченное число врачей",
        "Полная CRM",
        "Telegram бот",
        "Полная отчетность",
        "Интеграция с Google Calendar",
        "API для интеграций",
        "Приоритетная поддержка"
      ]
    }
  ];
  
  const handleSubmit = async () => {
    if (!selectedPlan) return;
    
    const planToChange = plans.find(p => p.id === selectedPlan);
    if (!planToChange) return;
    
    setIsSubmitting(true);
    try {
      const success = await onChangePlan(planToChange.description);
      
      if (success) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error changing plan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Изменить тариф</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Текущий тариф: <span className="font-medium">{currentPlan}</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map(plan => (
              <Card 
                key={plan.id} 
                className={`cursor-pointer transition-all ${selectedPlan === plan.id ? 'border-primary ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-2xl font-bold mb-2">{plan.price} <span className="text-sm font-normal">сум/мес</span></p>
                  <ul className="space-y-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-sm flex">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={selectedPlan === plan.id ? "default" : "outline"} 
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? "Выбрано" : "Выбрать"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedPlan || isSubmitting}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {isSubmitting ? "Изменение..." : "Изменить тариф"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
