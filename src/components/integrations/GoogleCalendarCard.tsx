
import { Button } from "@/components/ui/button";
import { Check, X, RefreshCw, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";

interface GoogleCalendarCardProps {
  status: "connected" | "error" | "disconnected";
  email: string;
  lastSync: string;
}

export function GoogleCalendarCard({ status, email, lastSync }: GoogleCalendarCardProps) {
  const { toast } = useToast();
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  
  const handleCheckStatus = () => {
    setCheckingStatus(true);
    
    // Simulate API call
    setTimeout(() => {
      setCheckingStatus(false);
      
      toast({
        title: "Google Calendar",
        description: status === "connected" 
          ? "Интеграция работает корректно" 
          : "Обнаружены проблемы с интеграцией",
        variant: status === "connected" ? "default" : "destructive"
      });
    }, 1000);
  };
  
  const handleReconnect = () => {
    setReconnecting(true);
    
    // Simulate API call
    setTimeout(() => {
      setReconnecting(false);
      
      toast({
        title: "Google Calendar",
        description: "Соединение успешно переустановлено"
      });
    }, 1500);
  };
  
  return (
    <div className="border rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Google Calendar</h3>
          {status === "connected" ? (
            <div className="flex items-center text-green-600 text-sm font-medium">
              <Check className="h-4 w-4 mr-1" />
              Подключено
            </div>
          ) : status === "error" ? (
            <div className="flex items-center text-red-500 text-sm font-medium">
              <X className="h-4 w-4 mr-1" />
              Ошибка
            </div>
          ) : (
            <div className="flex items-center text-gray-500 text-sm font-medium">
              <X className="h-4 w-4 mr-1" />
              Отключено
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="text-sm">
          <span className="text-gray-500">Сервисный аккаунт:</span> {email}
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Последняя синхронизация:</span> {formatDate(lastSync)}
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleReconnect}
          disabled={reconnecting}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${reconnecting ? 'animate-spin' : ''}`} />
          {reconnecting ? 'Переподключение...' : 'Переподключить'}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCheckStatus}
          disabled={checkingStatus}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          {checkingStatus ? 'Проверка...' : 'Проверить статус'}
        </Button>
      </div>
    </div>
  );
}
