
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
import { format } from "date-fns";
import { FilePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InvoiceFormData } from "@/types/subscription";
import { ru } from "date-fns/locale";
import { DateRangePicker } from "./DateRangePicker";

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
  const [tariffName, setTariffName] = useState<string>(currentPlan);
  const [sendToTelegram, setSendToTelegram] = useState(true);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const invoiceData: InvoiceFormData = {
        period: {
          from: fromDate,
          to: toDate
        },
        tariff: tariffName,
        price: price,
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
            <DateRangePicker 
              fromDate={fromDate}
              toDate={toDate}
              onFromDateChange={setFromDate}
              onToDateChange={setToDate}
            />
          </div>
          
          <TariffInput value={tariffName} onChange={setTariffName} />
          <PriceInput value={price} onChange={setPrice} />
          <TelegramOption checked={sendToTelegram} onChange={setSendToTelegram} />
          
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
          <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Компоненты формы
function TariffInput({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="tariff">Тариф</Label>
      <Input 
        id="tariff" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-100"
      />
    </div>
  );
}

function PriceInput({ value, onChange }: { value: number, onChange: (value: number) => void }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="price">Стоимость (сум)</Label>
      <Input 
        id="price" 
        type="number" 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function TelegramOption({ checked, onChange }: { checked: boolean, onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="telegram"
        checked={checked}
        onCheckedChange={onChange}
      />
      <Label htmlFor="telegram">Отправить уведомление в Telegram</Label>
    </div>
  );
}

function SubmitButton({ isSubmitting, onClick }: { isSubmitting: boolean, onClick: () => void }) {
  return (
    <Button 
      type="button" 
      onClick={onClick} 
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
  );
}
