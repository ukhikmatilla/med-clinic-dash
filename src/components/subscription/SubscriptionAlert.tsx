
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionAlertProps {
  daysRemaining: number;
  clinicName: string;
  expiryDate: string;
}

export function SubscriptionAlert({ daysRemaining, clinicName, expiryDate }: SubscriptionAlertProps) {
  const { toast } = useToast();
  
  // Форматирование даты в локальный формат
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Определяем, показывать ли уведомление
  if (daysRemaining > 15) return null;
  
  // Отправить уведомление администратору
  const sendNotification = () => {
    toast({
      title: "Уведомление отправлено",
      description: `Администратор клиники ${clinicName} получил уведомление о подписке`
    });
  };
  
  // Определяем цвет и текст сообщения в зависимости от срочности
  const getAlertStyle = () => {
    if (daysRemaining <= 5) {
      return {
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-700",
        descriptionColor: "text-red-600"
      };
    } else {
      return {
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        textColor: "text-amber-700",
        descriptionColor: "text-amber-600"
      };
    }
  };
  
  const alertStyle = getAlertStyle();
  
  return (
    <Alert className={`mb-6 sm:mb-8 ${alertStyle.bgColor} ${alertStyle.borderColor}`}>
      <AlertTriangle className={`h-4 w-4 ${daysRemaining <= 5 ? 'text-red-500' : 'text-amber-500'}`} />
      <AlertTitle className={alertStyle.textColor}>
        {daysRemaining <= 5 
          ? "Внимание: Критический срок подписки!" 
          : "Внимание: Заканчивающаяся подписка"}
      </AlertTitle>
      <AlertDescription className={alertStyle.descriptionColor}>
        У клиники "{clinicName}" подписка заканчивается через {daysRemaining} дней ({formatDate(expiryDate)})
        <div className="mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={sendNotification}
            className={daysRemaining <= 5 ? "border-red-200 hover:bg-red-100" : ""}
          >
            <Send className="h-4 w-4 mr-2" />
            Отправить уведомление администратору
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
