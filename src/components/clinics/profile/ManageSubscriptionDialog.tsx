
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
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ManageSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "extend" | "change" | "disable";
  clinicName: string;
  currentPlan?: string;
  onConfirm: (data: any) => void;
}

export function ManageSubscriptionDialog({ 
  open, 
  onOpenChange,
  mode,
  clinicName,
  currentPlan,
  onConfirm
}: ManageSubscriptionDialogProps) {
  const { toast } = useToast();
  const [duration, setDuration] = useState("1");
  const [plan, setPlan] = useState(currentPlan || "CRM");
  
  const getTitle = () => {
    switch(mode) {
      case "extend": return "Продление подписки";
      case "change": return "Изменение тарифа";
      case "disable": return "Отключение подписки";
    }
  };
  
  const getDescription = () => {
    switch(mode) {
      case "extend": return `Продление подписки для клиники "${clinicName}"`;
      case "change": return `Изменение тарифа для клиники "${clinicName}"`;
      case "disable": return `Вы уверены, что хотите отключить подписку для клиники "${clinicName}"?`;
    }
  };
  
  const handleConfirm = () => {
    let data;
    
    switch(mode) {
      case "extend":
        data = { duration: parseInt(duration, 10) };
        toast({
          title: "Подписка продлена",
          description: `Подписка продлена на ${duration} ${getDurationText()}`
        });
        break;
      case "change":
        data = { plan };
        toast({
          title: "Тариф изменен",
          description: `Тариф изменен на "${plan}"`
        });
        break;
      case "disable":
        data = { active: false };
        toast({
          title: "Подписка отключена",
          description: "Подписка успешно отключена"
        });
        break;
    }
    
    onConfirm(data);
    onOpenChange(false);
  };
  
  const getDurationText = () => {
    const months = parseInt(duration, 10);
    if (months === 1) return "месяц";
    if (months > 1 && months < 5) return "месяца";
    return "месяцев";
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {mode === "extend" && (
            <div className="space-y-2">
              <Label htmlFor="duration">Выберите срок продления</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Выберите срок" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 месяц</SelectItem>
                  <SelectItem value="3">3 месяца</SelectItem>
                  <SelectItem value="6">6 месяцев</SelectItem>
                  <SelectItem value="12">1 год</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {mode === "change" && (
            <div className="space-y-2">
              <Label htmlFor="plan">Выберите тариф</Label>
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Выберите тариф" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CRM">CRM</SelectItem>
                  <SelectItem value="CRM + Telegram">CRM + Telegram</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {mode === "disable" && (
            <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
              <p className="text-amber-700">
                Внимание! Отключение подписки приведет к приостановке доступа клиники к системе.
                Эту операцию можно отменить позже.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button 
            onClick={handleConfirm}
            variant={mode === "disable" ? "destructive" : "default"}
          >
            {mode === "disable" ? "Отключить" : "Подтвердить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
