
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  ArrowUpRight, 
  CheckCircle,
  Send
} from "lucide-react";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentId: number;
  patientName: string;
  serviceName: string;
  servicePrice: string;
}

export function PaymentModal({
  open,
  onOpenChange,
  appointmentId,
  patientName,
  serviceName,
  servicePrice
}: PaymentModalProps) {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("payme");
  const [isProcessing, setIsProcessing] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState<"pending" | "success" | "failed">("pending");
  
  const handleGenerateInvoice = async () => {
    setIsProcessing(true);
    setInvoiceStatus("pending");
    
    try {
      // In a real app, this would:
      // 1. Call an Edge Function to create an invoice in the payments table
      // 2. Generate a payment link via Payme or Click
      // 3. Send a notification to the patient via Telegram bot
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setInvoiceStatus("success");
      
      toast({
        title: "Счет создан",
        description: `Ссылка на оплату отправлена пациенту ${patientName} в Telegram`,
      });
      
      // In a real app, we would update the appointment's payment status in the database
    } catch (error) {
      setInvoiceStatus("failed");
      
      toast({
        title: "Ошибка",
        description: "Не удалось создать счет",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleClose = () => {
    if (invoiceStatus === "success") {
      // If invoice was successful, we might want to refresh the appointment data
      // when closing the modal
    }
    onOpenChange(false);
  };
  
  const renderPaymentContent = () => {
    if (invoiceStatus === "success") {
      return (
        <div className="py-8 flex flex-col items-center justify-center text-center">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-lg font-medium mb-1">Счет успешно создан</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-[320px] mx-auto">
            Ссылка на оплату услуги "{serviceName}" отправлена пациенту в Telegram
          </p>
          <Button onClick={handleClose}>Закрыть</Button>
        </div>
      );
    }
    
    return (
      <>
        <div className="space-y-4 py-4 overflow-y-auto max-h-[60vh]">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium">Информация о счете</h3>
                <p className="text-sm text-muted-foreground">Приём #{appointmentId}</p>
              </div>
              <div className="text-right">
                <div className="font-medium">{servicePrice}</div>
                <div className="text-sm text-muted-foreground">К оплате</div>
              </div>
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Услуга:</span>
                <span className="text-right max-w-[200px] break-words">{serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Пациент:</span>
                <span className="text-right max-w-[200px] break-words">{patientName}</span>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="online">
            <TabsList className="grid grid-cols-2 mb-4 w-full">
              <TabsTrigger value="online">Онлайн оплата</TabsTrigger>
              <TabsTrigger value="cash">Наличные</TabsTrigger>
            </TabsList>
            
            <TabsContent value="online" className="space-y-4">
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="grid grid-cols-2 gap-4"
              >
                <Label 
                  htmlFor="payme" 
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${paymentMethod === "payme" ? "border-primary bg-muted/50" : ""}`}
                >
                  <div className="font-bold text-blue-500 mb-2">Payme</div>
                  <RadioGroupItem value="payme" id="payme" className="sr-only" />
                </Label>
                
                <Label 
                  htmlFor="click" 
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${paymentMethod === "click" ? "border-primary bg-muted/50" : ""}`}
                >
                  <div className="font-bold text-green-600 mb-2">Click</div>
                  <RadioGroupItem value="click" id="click" className="sr-only" />
                </Label>
              </RadioGroup>
              
              <div className="text-sm text-muted-foreground max-w-[420px] break-words leading-relaxed">
                Нажав кнопку, вы создадите счет и отправите ссылку на оплату пациенту в Telegram. 
                Оплата будет учтена автоматически после подтверждения платёжной системы.
              </div>
            </TabsContent>
            
            <TabsContent value="cash" className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Оплата наличными</h4>
                <p className="text-sm text-muted-foreground mb-2 max-w-[420px] break-words leading-relaxed">
                  Отметьте приём как оплаченный наличными и распечатайте чек для пациента.
                </p>
                <Button className="w-full sm:w-auto px-4 py-2">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Отметить как оплаченный
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="flex-col space-y-2 sm:space-y-0 sm:flex-row mt-4">
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
            Отмена
          </Button>
          <Button 
            onClick={handleGenerateInvoice} 
            disabled={isProcessing}
            className="w-full sm:w-auto px-6 py-2.5"
          >
            {isProcessing ? (
              <>Обработка...</>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Сгенерировать счет и отправить пациенту
              </>
            )}
          </Button>
        </DialogFooter>
      </>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Оплата услуги</DialogTitle>
        </DialogHeader>
        
        {renderPaymentContent()}
      </DialogContent>
    </Dialog>
  );
}
