
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface SendSmsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientPhone: string;
  patientName: string;
}

export function SendSmsModal({
  open,
  onOpenChange,
  patientPhone,
  patientName
}: SendSmsModalProps) {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  // Pre-defined templates
  const messageTemplates = [
    "Напоминаем о приёме завтра. Ждем вас!",
    "Просим подтвердить ваш приём. Спасибо!",
    "Ваш приём перенесен, новое время указано выше.",
    "Просьба прийти за 15 минут до приёма для оформления документов."
  ];
  
  const handleSendSms = async () => {
    if (!message.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите текст сообщения",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      // In a real app, this would call an API to send the SMS through Telegram bot
      // For now, we'll just simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Успешно",
        description: `Сообщение отправлено пациенту ${patientName}`,
      });
      
      setMessage("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const selectTemplate = (template: string) => {
    setMessage(template);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Отправить SMS</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Отправить сообщение пациенту {patientName} ({patientPhone})
            </p>
            
            <Textarea
              placeholder="Введите текст сообщения..."
              className="min-h-[100px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Шаблоны сообщений:</p>
            <div className="flex flex-wrap gap-2">
              {messageTemplates.map((template, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                  onClick={() => selectTemplate(template)}
                >
                  {template.length > 30 ? template.substring(0, 30) + "..." : template}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button 
            onClick={handleSendSms} 
            disabled={isSending}
          >
            <Send className="mr-2 h-4 w-4" />
            {isSending ? "Отправка..." : "Отправить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
