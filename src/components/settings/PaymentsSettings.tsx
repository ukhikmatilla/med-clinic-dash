
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Eye, EyeOff, Save } from "lucide-react";
import { toast } from "sonner";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

interface PaymentProviderSettings {
  name: string;
  enabled: boolean;
  merchantId: string;
  apiKey: string;
  additionalFields?: Record<string, string>;
}

interface PaymentsSettings {
  providers: PaymentProviderSettings[];
}

interface PaymentsSettingsProps {
  settings: PaymentsSettings;
  onUpdate: (settings: PaymentsSettings) => void;
}

export function PaymentsSettings({ settings, onUpdate }: PaymentsSettingsProps) {
  const [providers, setProviders] = useState(settings.providers);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  const updateProvider = (index: number, data: Partial<PaymentProviderSettings>) => {
    const newProviders = [...providers];
    newProviders[index] = { ...newProviders[index], ...data };
    setProviders(newProviders);
  };

  const toggleShowSecret = (providerId: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [providerId]: !prev[providerId]
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real app this would call an API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onUpdate({ providers });
      
      toast.success("Настройки платежных систем сохранены");
    } catch (error) {
      toast.error("Ошибка при сохранении настроек");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Платежные системы
        </CardTitle>
        <CardDescription>
          Настройка платежных шлюзов и ключей API
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {providers.map((provider, index) => (
            <AccordionItem key={index} value={`provider-${index}`}>
              <AccordionTrigger className="text-base">
                {provider.name}
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`merchant-${index}`}>Merchant ID</Label>
                  </div>
                  <Input
                    id={`merchant-${index}`}
                    value={provider.merchantId}
                    onChange={e => updateProvider(index, { merchantId: e.target.value })}
                    placeholder={`${provider.name} Merchant ID`}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`apikey-${index}`}>API Key</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleShowSecret(`apikey-${index}`)}
                      type="button"
                    >
                      {showSecrets[`apikey-${index}`] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Input
                    id={`apikey-${index}`}
                    type={showSecrets[`apikey-${index}`] ? "text" : "password"}
                    value={provider.apiKey}
                    onChange={e => updateProvider(index, { apiKey: e.target.value })}
                    placeholder={`${provider.name} API Key`}
                  />
                </div>
                
                {provider.additionalFields && Object.entries(provider.additionalFields).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${key}-${index}`}>{key}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleShowSecret(`${key}-${index}`)}
                        type="button"
                      >
                        {showSecrets[`${key}-${index}`] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Input
                      id={`${key}-${index}`}
                      type={showSecrets[`${key}-${index}`] ? "text" : "password"}
                      value={value}
                      onChange={e => {
                        const newAdditionalFields = {
                          ...provider.additionalFields,
                          [key]: e.target.value
                        };
                        updateProvider(index, { additionalFields: newAdditionalFields });
                      }}
                      placeholder={key}
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full"
        >
          {saving ? (
            <>Сохранение...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Сохранить ключи
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
