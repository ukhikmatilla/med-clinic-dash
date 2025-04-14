
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { EditPaymentModal } from "./EditPaymentModal";

export interface PaymentProviderConfig {
  id: "payme" | "click";
  is_active: boolean;
  merchant_id: string;
  api_key: string;
  webhook_url: string;
  last_payment_at: string | null;
  last_error: string | null;
  updated_at: string;
}

interface PaymentProviderCardProps {
  provider: PaymentProviderConfig;
  onUpdate: (provider: PaymentProviderConfig) => void;
}

export function PaymentProviderCard({ provider, onUpdate }: PaymentProviderCardProps) {
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const providerName = provider.id === "payme" ? "Payme" : "Click";
  const providerIconClass = provider.id === "payme" ? "bg-blue-100 text-blue-500" : "bg-yellow-100 text-yellow-500";
  
  // Determine status components
  let statusIcon = null;
  let statusText = "";
  let statusClass = "";
  
  if (provider.last_error) {
    statusIcon = <AlertTriangle className="h-4 w-4 text-amber-500" />;
    statusText = "Ошибка";
    statusClass = "text-amber-500";
  } else if (provider.is_active) {
    statusIcon = <Check className="h-4 w-4 text-green-500" />;
    statusText = "Подключено";
    statusClass = "text-green-500";
  } else {
    statusIcon = <X className="h-4 w-4 text-red-500" />;
    statusText = "Не подключено";
    statusClass = "text-red-500";
  }
  
  const handleCheck = async () => {
    setIsChecking(true);
    
    try {
      // In a real app, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate a successful check
      const updatedProvider: PaymentProviderConfig = {
        ...provider,
        is_active: true,
        last_error: null,
        updated_at: new Date().toISOString()
      };
      
      onUpdate(updatedProvider);
      
      toast({
        title: "Проверка успешна",
        description: `${providerName} работает корректно`
      });
    } catch (error) {
      toast({
        title: "Ошибка проверки",
        description: `Не удалось проверить ${providerName}`,
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };
  
  const handleSaveConfig = (data: { merchant_id: string; api_key: string; webhook_url: string }) => {
    const updatedProvider: PaymentProviderConfig = {
      ...provider,
      merchant_id: data.merchant_id,
      api_key: data.api_key,
      webhook_url: data.webhook_url,
      updated_at: new Date().toISOString()
    };
    
    onUpdate(updatedProvider);
  };
  
  return (
    <>
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="flex items-center mb-2 sm:mb-0">
              <div className={`w-8 h-8 rounded-md flex items-center justify-center mr-3 ${providerIconClass}`}>
                {provider.id === "payme" ? "P" : "C"}
              </div>
              <h3 className="text-lg font-medium">{providerName}</h3>
            </div>
            
            <div className="flex items-center">
              {statusIcon}
              <span className={`ml-1 ${statusClass}`}>{statusText}</span>
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-sm text-gray-500">Merchant ID:</span>
              <span className="text-sm font-medium">
                {provider.merchant_id || "Не указан"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <span className="text-sm text-gray-500">Последний платёж:</span>
              <span className="text-sm">
                {provider.last_payment_at ? formatDate(provider.last_payment_at) : "Нет данных"}
              </span>
            </div>
            
            {provider.last_error && (
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm text-gray-500">Ошибка:</span>
                <span className="text-sm text-red-500">{provider.last_error}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCheck}
              disabled={isChecking}
            >
              {isChecking ? "Проверка..." : "Проверить"}
            </Button>
            
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowEditModal(true)}
            >
              Изменить ключи
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <EditPaymentModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        provider={provider.id}
        currentConfig={{
          merchant_id: provider.merchant_id,
          api_key: provider.api_key,
          webhook_url: provider.webhook_url
        }}
        onSave={handleSaveConfig}
      />
    </>
  );
}
