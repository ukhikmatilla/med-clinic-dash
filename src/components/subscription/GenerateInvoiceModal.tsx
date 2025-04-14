
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, FilePlus, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InvoiceFormData, SubscriptionPlan } from "@/types/subscription";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface GenerateInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: string;
  clinicId: string;
  onGenerateInvoice: (data: InvoiceFormData) => Promise<void>;
}

export function GenerateInvoiceModal({ 
  open, 
  onOpenChange, 
  currentPlan,
  clinicId,
  onGenerateInvoice
}: GenerateInvoiceModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Устанавливаем значения по умолчанию для формы
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  
  const [fromDate, setFromDate] = useState<Date>(today);
  const [toDate, setToDate] = useState<Date>(nextMonth);
  const [price, setPrice] = useState(250000);
  const [tariff, setTariff] = useState<SubscriptionPlan>(currentPlan as SubscriptionPlan);
  const [sendToTelegram, setSendToTelegram] = useState(true);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const invoiceData: InvoiceFormData = {
        period: {
          from: fromDate,
          to: toDate
        },
        tariff: tariff,
        price: price,
        expiryDate: toDate,
        sendToTelegram: sendToTelegram
      };
      
      await onGenerateInvoice(invoiceData);
      
      toast({
        title: "Счёт успешно создан",
        description: sendToTelegram 
          ? "Счёт создан и отправлен в Telegram администратору клиники" 
          : "Счёт успешно создан"
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать счёт",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Сгенерировать счёт</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label>Период</Label>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={(date) => date && setFromDate(date)}
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
              
              <span>–</span>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={(date) => date && setToDate(date)}
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tariff">Тариф</Label>
            <Input 
              id="tariff" 
              value={tariff} 
              disabled 
              className="bg-gray-100"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Стоимость (сум)</Label>
            <Input 
              id="price" 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="telegram"
              checked={sendToTelegram}
              onCheckedChange={setSendToTelegram}
            />
            <Label htmlFor="telegram">Отправить уведомление в Telegram</Label>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              Счёт будет создан для клиники и отправлен администратору.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Создание счёта...</>
            ) : (
              <>
                <FilePlus className="mr-2 h-4 w-4" />
                Создать счёт
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
