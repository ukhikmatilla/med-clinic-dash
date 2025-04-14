
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ExtendSubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExtend: (months: number) => Promise<void>;
}

export function ExtendSubscriptionModal({ 
  open, 
  onOpenChange, 
  onExtend 
}: ExtendSubscriptionModalProps) {
  const { toast } = useToast();
  const [selectedMonths, setSelectedMonths] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const months = parseInt(selectedMonths);
      await onExtend(months);
      
      toast({
        title: "Подписка продлена",
        description: `Подписка успешно продлена на ${months} ${getMonthWord(months)}`
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось продлить подписку",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Функция для склонения слова "месяц"
  const getMonthWord = (months: number): string => {
    if (months === 1) return "месяц";
    if (months >= 2 && months <= 4) return "месяца";
    return "месяцев";
  };

  const monthOptions = [
    { value: "1", label: "1 месяц" },
    { value: "3", label: "3 месяца" },
    { value: "6", label: "6 месяцев" },
    { value: "12", label: "12 месяцев" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Продление подписки</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Выберите период, на который хотите продлить подписку:
          </p>
          
          <ToggleGroup 
            type="single" 
            value={selectedMonths} 
            onValueChange={(value) => value && setSelectedMonths(value)}
            className="justify-start"
          >
            {monthOptions.map(option => (
              <ToggleGroupItem 
                key={option.value} 
                value={option.value}
                className="px-4"
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              Стоимость: <strong>250,000 сум × {selectedMonths} = {250000 * parseInt(selectedMonths)} сум</strong>
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {isSubmitting ? "Продление..." : "Продлить подписку"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
