
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Updated form schema with proper price transformation
const serviceFormSchema = z.object({
  name: z.string().min(2, "Название услуги должно содержать не менее 2 символов"),
  price: z.string().min(1, "Укажите цену услуги")
    .transform((val) => {
      // Convert string price to number by removing non-numeric characters
      const numericValue = val.replace(/[^\d]/g, '');
      return numericValue ? parseInt(numericValue, 10) : 0;
    })
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

interface EditServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: { id: string; name: string; price: number } | null;
  onSave: (data: { id: string; name: string; price: number }) => void;
}

export function EditServiceDialog({ 
  open, 
  onOpenChange,
  service,
  onSave
}: EditServiceDialogProps) {
  const isEditing = !!service;
  const [loading, setLoading] = useState(false);
  
  // Format price for display in the form
  const formatPriceForDisplay = (price: number): string => {
    return price ? new Intl.NumberFormat('ru-RU').format(price) + ' сум' : '';
  };
  
  // Set up form
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: service?.name || "",
      price: service?.price ? formatPriceForDisplay(service.price) : ""
    }
  });
  
  // Reset form when dialog opens/closes or service changes
  useEffect(() => {
    if (open) {
      form.reset({
        name: service?.name || "",
        price: service?.price ? formatPriceForDisplay(service.price) : ""
      });
    }
  }, [open, service, form]);
  
  const handleSubmit = async (values: ServiceFormValues) => {
    setLoading(true);
    try {
      // Here values.price is now a number thanks to the zod transformation
      onSave({
        id: service?.id || `new-service-${Date.now()}`,
        name: values.name,
        price: values.price  // This is now guaranteed to be a number
      });
    } finally {
      setLoading(false);
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Редактировать услугу" : "Добавить услугу"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название услуги</FormLabel>
                  <FormControl>
                    <Input placeholder="Например: Консультация терапевта" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input placeholder="Например: 150 000 сум" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Сохранение..." : "Сохранить"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
