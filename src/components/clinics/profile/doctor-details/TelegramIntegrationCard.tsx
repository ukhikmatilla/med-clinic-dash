
import { useState } from "react";
import { MessageSquare, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface TelegramIntegrationCardProps {
  telegramId: string | null;
  telegramBot?: string;
  isConnected: boolean;
}

export function TelegramIntegrationCard({ 
  telegramId, 
  telegramBot = "@najot_doctor_bot",
  isConnected 
}: TelegramIntegrationCardProps) {
  const { toast } = useToast();
  const [checkingTelegram, setCheckingTelegram] = useState(false);
  
  const handleCheckTelegram = () => {
    setCheckingTelegram(true);
    
    // Simulate API call to check Telegram connection
    setTimeout(() => {
      setCheckingTelegram(false);
      
      if (isConnected) {
        toast({
          title: "Telegram проверка",
          description: "Аккаунт врача успешно подключен к боту."
        });
      } else {
        toast({
          title: "Telegram проверка",
          description: "Аккаунт врача не подключен к боту.",
          variant: "destructive"
        });
      }
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Telegram Bot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Статус подключения</p>
              <div className="flex items-center mt-1">
                {isConnected ? (
                  <>
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Подключен</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-500 mr-2" />
                    <span>Не подключен</span>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {telegramBot}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCheckTelegram} 
              disabled={checkingTelegram}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              {checkingTelegram ? 'Проверка...' : 'Проверить подключение'}
            </Button>
          </div>
          
          {!isConnected && (
            <div className="text-sm">
              <p className="font-medium text-destructive">Необходимо действие</p>
              <p className="mt-1">
                Врач не подключен к боту. Пригласите врача добавить Telegram бота
                и идентифицировать себя через него.
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Отправить приглашение
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
