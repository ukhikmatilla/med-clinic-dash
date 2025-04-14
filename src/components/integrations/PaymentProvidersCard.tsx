
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentProviderCard, PaymentProviderConfig } from "./PaymentProviderCard";

// Initial mock data for payment providers
const initialPaymentProviders: PaymentProviderConfig[] = [
  {
    id: "payme",
    is_active: true,
    merchant_id: "merchant_payme_5678",
    api_key: "seckey_payme_12345",
    webhook_url: "https://api.yourapp.com/webhooks/payme",
    last_payment_at: "2025-04-10T14:23:00",
    last_error: null,
    updated_at: "2025-04-01T10:15:00"
  },
  {
    id: "click",
    is_active: false,
    merchant_id: "merchant_click_1234",
    api_key: "seckey_click_5678",
    webhook_url: "https://api.yourapp.com/webhooks/click",
    last_payment_at: null,
    last_error: "API connection timeout",
    updated_at: "2025-04-02T09:30:00"
  }
];

export function PaymentProvidersCard() {
  const [paymentProviders, setPaymentProviders] = useState<PaymentProviderConfig[]>(initialPaymentProviders);
  
  const handleUpdateProvider = (updatedProvider: PaymentProviderConfig) => {
    setPaymentProviders(prev => 
      prev.map(provider => 
        provider.id === updatedProvider.id ? updatedProvider : provider
      )
    );
  };
  
  return (
    <Card className="bg-white mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">💳 Платёжные системы</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentProviders.map(provider => (
            <PaymentProviderCard 
              key={provider.id}
              provider={provider}
              onUpdate={handleUpdateProvider}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
