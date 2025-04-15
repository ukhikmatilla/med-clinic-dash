
import { useState } from "react";
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

// Form schema
const serviceFormSchema = z.object({
  name: z.string().min(2, "Название услуги должно содержать не менее 2 символов"),
  price: z.string().min(1, "Укажите цену услуги")
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

interface EditServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: { id: string; name: string; price: string } | null;
  onSave: (data: { id: string; name: string; price: string }) => void;
}

export function EditServiceDialog({ 
  open, 
  onOpenChange,
  service,
  onSave
}: EditServiceDialogProps) {
  const isEditing = !!service;
  const [loading, setLoading] = useState(false);
  
  // Set up form
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: service?.name || "",
      price: service?.price || ""
    }
  });
  
  // Reset form when dialog opens/closes or service changes
  useState(() => {
    if (open) {
      form.reset({
        name: service?.name || "",
        price: service?.price || ""
      });
    }
  });
  
  const handleSubmit = async (values: ServiceFormValues) => {
    setLoading(true);
    try {
      // In a real application, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      onSave({
        id: service?.id || `new-service-${Date.now()}`,
        name: values.name,
        price: values.price
      });
    } finally {
      setLoading(false);
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
