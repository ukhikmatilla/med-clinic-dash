
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

// Define the schema for doctor form validation
const doctorFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "ФИО должно содержать минимум 2 символа",
  }),
  telegramId: z.string().optional()
    .refine(val => !val || val.startsWith('@'), {
      message: "Telegram ID должен начинаться с @",
    }),
  specialties: z.string().min(2, {
    message: "Укажите минимум одну специальность",
  }),
  schedule: z.string().optional(),
  isActive: z.boolean().default(true),
  services: z.array(z.string()).optional(),
});

export type DoctorFormValues = z.infer<typeof doctorFormSchema>;

interface Service {
  id: string;
  name: string;
  price: string;
}

interface DoctorFormProps {
  initialData?: Partial<DoctorFormValues>;
  services: Service[];
  isSubmitting?: boolean;
  onSubmit: (values: DoctorFormValues) => void;
}

export function DoctorForm({
  initialData,
  services,
  isSubmitting = false,
  onSubmit,
}: DoctorFormProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialData?.services || []
  );

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      telegramId: initialData?.telegramId || "",
      specialties: initialData?.specialties || "",
      schedule: initialData?.schedule || "",
      isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
      services: initialData?.services || [],
    },
  });

  const handleServicesChange = (serviceId: string, checked: boolean) => {
    setSelectedServices(prev => {
      const newServices = checked
        ? [...prev, serviceId]
        : prev.filter(id => id !== serviceId);
        
      form.setValue("services", newServices);
      return newServices;
    });
  };

  const handleSubmit = (values: DoctorFormValues) => {
    values.services = selectedServices;
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ФИО</FormLabel>
                <FormControl>
                  <Input placeholder="Введите полное имя" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="telegramId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telegram ID</FormLabel>
                <FormControl>
                  <Input placeholder="Например: @doctor_name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="specialties"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Специальность</FormLabel>
                <FormControl>
                  <Input placeholder="Например: Кардиолог, Терапевт" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="schedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Расписание</FormLabel>
                <FormControl>
                  <Input placeholder="Например: Пн-Пт 09:00-17:00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Активен</FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <FormLabel>Услуги</FormLabel>
          <div className="border rounded-md p-3 sm:p-4 h-36 overflow-y-auto">
            <div className="space-y-2">
              {services.map((service) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`service-${service.id}`}
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={(checked) => 
                      handleServicesChange(service.id, checked === true)
                    }
                  />
                  <label 
                    htmlFor={`service-${service.id}`}
                    className="text-sm"
                  >
                    {service.name} ({service.price})
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Сохранить
          </Button>
        </div>
      </form>
    </Form>
  );
}
