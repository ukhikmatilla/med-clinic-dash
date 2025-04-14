
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, XCircle } from "lucide-react";

interface IntegrationsProps {
  googleCalendar: boolean;
  telegramBots: {
    patient: {
      connected: boolean;
      id: string;
    };
    doctor: {
      connected: boolean;
      id: string;
    };
  };
}

export function IntegrationsTab({ googleCalendar, telegramBots }: IntegrationsProps) {
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
                <Button variant="outline" size="sm">⚙️ Настроить</Button>
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
                <Button variant="outline" size="sm">🔗 Проверить ID</Button>
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
                <Button variant="outline" size="sm">🔗 Проверить ID</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
