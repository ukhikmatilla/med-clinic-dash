
import { Button } from "@/components/ui/button";
import { Check, X, RefreshCw, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TelegramBotCardProps {
  type: "patient" | "doctor";
  username: string;
  status: "ok" | "error";
}

export function TelegramBotCard({ type, username, status }: TelegramBotCardProps) {
  const { toast } = useToast();
  const [checking, setChecking] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  
  const handleCheck = () => {
    setChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      setChecking(false);
      
      toast({
        title: `Telegram Bot (${type === "patient" ? 'пациенты' : 'врачи'})`,
        description: status === "ok" 
          ? "Webhook активен" 
          : "Ошибка: Webhook недоступен",
        variant: status === "ok" ? "default" : "destructive"
      });
    }, 1000);
  };
  
  const handleRegenerate = () => {
    setRegenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setRegenerating(false);
      
      toast({
        title: `Telegram Bot (${type === "patient" ? 'пациенты' : 'врачи'})`,
        description: "Webhook успешно перегенерирован"
      });
    }, 1500);
  };
  
  const title = type === "patient" ? "Telegram Bot (пациенты)" : "Telegram Bot (врачи)";
  
  return (
    <div className="border rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {status === "ok" ? (
            <div className="flex items-center text-green-600 text-sm font-medium">
              <Check className="h-4 w-4 mr-1" />
              OK
            </div>
          ) : (
            <div className="flex items-center text-red-500 text-sm font-medium">
              <X className="h-4 w-4 mr-1" />
              Ошибка
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="text-sm">
          <span className="text-gray-500">ID:</span> {username}
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Статус webhook:</span> {status === "ok" ? (
            <span className="text-green-600">Активен</span>
          ) : (
            <span className="text-red-500">Ошибка</span>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCheck}
          disabled={checking}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          {checking ? 'Проверка...' : 'Проверить'}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRegenerate}
          disabled={regenerating}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${regenerating ? 'animate-spin' : ''}`} />
          {regenerating ? 'Перегенерация...' : 'Перегенерировать webhook'}
        </Button>
      </div>
    </div>
  );
}
