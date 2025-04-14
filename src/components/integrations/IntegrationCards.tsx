
import { Card, CardContent } from "@/components/ui/card";
import { GoogleCalendarCard } from "./GoogleCalendarCard";
import { TelegramBotCard } from "./TelegramBotCard";
import { IntegrationsData } from "@/hooks/useIntegrationsData";
import { Skeleton } from "@/components/ui/skeleton";

interface IntegrationCardsProps {
  integrations: IntegrationsData | null;
  isLoading: boolean;
}

export function IntegrationCards({ integrations, isLoading }: IntegrationCardsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-32" />
          </div>
        </Card>
        <Card className="p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-32" />
          </div>
        </Card>
      </div>
    );
  }

  if (!integrations) {
    return (
      <div className="text-center p-6 text-gray-500">
        Данные интеграций недоступны
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <GoogleCalendarCard 
        status={integrations.google_calendar.status}
        email={integrations.google_calendar.email}
        lastSync={integrations.google_calendar.last_sync}
      />
      
      <TelegramBotCard 
        type="patient"
        username={integrations.telegram_patient.username}
        status={integrations.telegram_patient.status}
      />
      
      <TelegramBotCard 
        type="doctor"
        username={integrations.telegram_doctor.username}
        status={integrations.telegram_doctor.status}
      />
    </div>
  );
}
