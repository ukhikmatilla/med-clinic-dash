
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { Send } from "lucide-react";
import { OnlinePaymentTab } from "./OnlinePaymentTab";
import { CashPaymentTab } from "./CashPaymentTab";
import { PaymentInfoCard } from "./PaymentInfoCard";
import { PaymentStatusSuccess } from "./PaymentStatusSuccess";
import { usePaymentInvoice } from "./usePaymentInvoice";

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
  const {
    paymentMethod,
    setPaymentMethod,
    isProcessing,
    invoiceStatus,
    handleGenerateInvoice
  } = usePaymentInvoice({ patientName });
  
  const handleClose = () => {
    onOpenChange(false);
  };
  
  const renderPaymentContent = () => {
    if (invoiceStatus === "success") {
      return <PaymentStatusSuccess serviceName={serviceName} onClose={handleClose} />;
    }
    
    return (
      <>
        <div className="space-y-4 py-4 overflow-y-auto max-h-[60vh]">
          <PaymentInfoCard 
            appointmentId={appointmentId}
            patientName={patientName}
            serviceName={serviceName}
            servicePrice={servicePrice}
          />
          
          <Tabs defaultValue="online">
            <TabsList className="grid grid-cols-2 mb-4 w-full">
              <TabsTrigger value="online">Онлайн оплата</TabsTrigger>
              <TabsTrigger value="cash">Наличные</TabsTrigger>
            </TabsList>
            
            <TabsContent value="online">
              <OnlinePaymentTab 
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </TabsContent>
            
            <TabsContent value="cash">
              <CashPaymentTab />
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
