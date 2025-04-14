
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface EditPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider: "payme" | "click";
  currentConfig?: {
    merchant_id: string;
    api_key: string;
    webhook_url: string;
  };
  onSave: (data: {
    merchant_id: string;
    api_key: string;
    webhook_url: string;
  }) => void;
}

export function EditPaymentModal({
  open,
  onOpenChange,
  provider,
  currentConfig,
  onSave
}: EditPaymentModalProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const providerName = provider === "payme" ? "Payme" : "Click";
  
  const form = useForm({
    defaultValues: {
      merchant_id: currentConfig?.merchant_id || "",
      api_key: currentConfig?.api_key || "",
      webhook_url: currentConfig?.webhook_url || `https://api.yourapp.com/webhooks/${provider}`
    }
  });
  
  const handleSubmit = async (data: {
    merchant_id: string;
    api_key: string;
    webhook_url: string;
  }) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 800));
      onSave(data);
      
      toast({
        title: "Настройки обновлены",
        description: `Конфигурация ${providerName} успешно обновлена`
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить настройки",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Настройка {providerName}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="merchant_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merchant ID</FormLabel>
                  <FormControl>
                    <Input placeholder="merchant_12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="api_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="psk_..." type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="webhook_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webhook URL</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Сохранить"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
