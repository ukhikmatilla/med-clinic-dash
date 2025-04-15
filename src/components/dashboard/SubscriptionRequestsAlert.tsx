
import { SubscriptionExtensionRequest } from "@/types/subscription";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SubscriptionRequestsAlertProps {
  requests: SubscriptionExtensionRequest[];
}

export function SubscriptionRequestsAlert({ requests }: SubscriptionRequestsAlertProps) {
  const navigate = useNavigate();
  const pendingRequests = requests.filter(req => req.status === 'pending');
  
  if (pendingRequests.length === 0) return null;
  
  const getMonthWord = (months: number): string => {
    if (months === 1) return "месяц";
    if (months >= 2 && months <= 4) return "месяца";
    return "месяцев";
  };
  
  return (
    <Alert className="mb-6 sm:mb-8 bg-blue-50 border-blue-200">
      <Bell className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-700">Новые запросы на продление подписки</AlertTitle>
      <AlertDescription className="text-blue-600">
        {pendingRequests.length === 1 ? (
          <span>
            Клиника {pendingRequests[0].clinicName} запросила продление на {pendingRequests[0].requestedMonths} {getMonthWord(pendingRequests[0].requestedMonths)}
          </span>
        ) : (
          <span>
            Имеется {pendingRequests.length} новых запросов на продление подписки от клиник
          </span>
        )}
        <div className="mt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/super-admin/subscriptions')}
          >
            Перейти к управлению
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
