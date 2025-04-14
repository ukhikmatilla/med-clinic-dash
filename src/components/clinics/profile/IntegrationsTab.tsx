
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, XCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TelegramBot {
  connected: boolean;
  id: string;
}

interface IntegrationsProps {
  googleCalendar: boolean;
  telegramBots: {
    patient: TelegramBot;
    doctor: TelegramBot;
  };
}

export function IntegrationsTab({ googleCalendar, telegramBots }: IntegrationsProps) {
  const { toast } = useToast();
  const [checking, setChecking] = useState<string | null>(null);
  
  const handleConfigureGoogleCalendar = () => {
    toast({
      title: "Google Calendar",
      description: "Открываем настройки интеграции с Google Calendar"
    });
    // In a real application, this would open a configuration modal or redirect to the configuration page
  };
  
  const handleCheckTelegramBot = (type: "patient" | "doctor") => {
    setChecking(type);
    
    // Simulate API call
    setTimeout(() => {
      setChecking(null);
      
      if (telegramBots[type].connected) {
        toast({
          title: "Telegram Bot",
          description: `Бот ${telegramBots[type].id} активен и работает`
        });
      } else {
        toast({
          title: "Telegram Bot",
          description: "Бот не отвечает или не настроен",
          variant: "destructive"
        });
      }
    }, 1500);
  };
  
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Интеграции</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 font-medium">Интеграция</th>
              <th className="text-left py-3 font-medium">Статус</th>
              <th className="text-right py-3 font-medium">Действие</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4">Google Calendar</td>
              <td className="py-4">
                {googleCalendar ? (
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Подключено</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                    <span>Не подключено</span>
                  </div>
                )}
              </td>
              <td className="py-4 text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleConfigureGoogleCalendar}
                >
                  ⚙️ Настроить
                </Button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-4">Telegram Bot (пациенты)</td>
              <td className="py-4">
                {telegramBots.patient.connected ? (
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Подключен {telegramBots.patient.id}</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                    <span>Не подключен</span>
                  </div>
                )}
              </td>
              <td className="py-4 text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCheckTelegramBot("patient")}
                  disabled={checking === "patient"}
                >
                  {checking === "patient" ? (
                    <>
                      <AlertTriangle className="h-4 w-4 mr-1 animate-pulse" />
                      Проверка...
                    </>
                  ) : (
                    <>🔗 Проверить ID</>
                  )}
                </Button>
              </td>
            </tr>
            <tr>
              <td className="py-4">Telegram Bot (врачи)</td>
              <td className="py-4">
                {telegramBots.doctor.connected ? (
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Подключен {telegramBots.doctor.id}</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                    <span>Не подключен</span>
                  </div>
                )}
              </td>
              <td className="py-4 text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCheckTelegramBot("doctor")}
                  disabled={checking === "doctor"}
                >
                  {checking === "doctor" ? (
                    <>
                      <AlertTriangle className="h-4 w-4 mr-1 animate-pulse" />
                      Проверка...
                    </>
                  ) : (
                    <>🔗 Проверить ID</>
                  )}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
