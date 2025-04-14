
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ExpiringSubscription {
  id: number;
  clinic: string;
  expiresIn: string;
  expiryDate: string;
}

interface SubscriptionAlertProps {
  subscriptions: ExpiringSubscription[];
}

export function SubscriptionAlert({ subscriptions }: SubscriptionAlertProps) {
  if (!subscriptions.length) return null;
  
  return (
    <Alert className="mb-6 sm:mb-8 bg-amber-50 border-amber-200">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-700">Внимание: Заканчивающиеся подписки</AlertTitle>
      <AlertDescription className="text-amber-600">
        У клиники "{subscriptions[0].clinic}" подписка заканчивается через {subscriptions[0].expiresIn} ({subscriptions[0].expiryDate})
        <div className="mt-2">
          <Button variant="outline" size="sm">Посмотреть список</Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
