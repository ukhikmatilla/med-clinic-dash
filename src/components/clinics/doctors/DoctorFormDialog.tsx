
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DoctorForm, DoctorFormValues } from "./DoctorForm";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  name: string;
  price: string;
}

interface Bot {
  id: string;
  name: string;
}

interface Doctor {
  id: string;
  fullName: string;
  specialties: string[];
  telegramId: string | null;
  telegramBot?: string;
  schedule: Record<string, string>;
  services: string[];
  status: "active" | "inactive";
}

interface DoctorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor?: Doctor | null;
  services: Service[];
  availableBots?: Bot[];
  subscriptionHasDoctorLimit?: boolean;
  currentDoctorCount?: number;
  maxDoctorsAllowed?: number;
  onSave: (doctor: DoctorFormValues, isEditing: boolean) => Promise<void>;
}

export function DoctorFormDialog({
  open,
  onOpenChange,
  doctor,
  services,
  availableBots = [{ id: "doctor_bot", name: "@najot_doctor_bot" }],
  subscriptionHasDoctorLimit = false,
  currentDoctorCount = 0,
  maxDoctorsAllowed = 10,
  onSave,
}: DoctorFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const isEditing = !!doctor;
  const reachedDoctorLimit = !isEditing && subscriptionHasDoctorLimit && currentDoctorCount >= maxDoctorsAllowed;
  
  // Convert doctor to form values format if editing
  const initialValues = doctor ? {
    fullName: doctor.fullName,
    telegramId: doctor.telegramId || "",
    telegramBot: doctor.telegramBot || availableBots[0]?.id || "",
    specialties: doctor.specialties.join(", "),
    experience: doctor.experience || "",
    category: doctor.category || "",
    schedule: Object.entries(doctor.schedule)
      .map(([day, time]) => `${day} ${time}`)
      .join(", "),
    isActive: doctor.status === "active",
    services: doctor.services,
  } : undefined;
  
  const handleSubmit = async (values: DoctorFormValues) => {
    if (reachedDoctorLimit) {
      toast({
        title: "Ограничение по подписке",
        description: `Ваш тариф позволяет добавить максимум ${maxDoctorsAllowed} врачей. Перейдите на расширенный тариф для добавления большего числа врачей.`,
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSave(values, isEditing);
      
      toast({
        title: `Врач успешно ${isEditing ? "обновлен" : "добавлен"}`,
        description: `${values.fullName} ${isEditing ? "обновлен" : "добавлен"} в систему.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: `Не удалось ${isEditing ? "обновить" : "добавить"} врача. Попробуйте еще раз.`,
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleTelegramCheck = async (username: string): Promise<boolean> => {
    // In a real app, this would be an API call to check if the Telegram username exists
    console.log("Checking Telegram username:", username);
    // Simulate API check
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, let's say only usernames starting with '@doctor' are valid
        resolve(username.startsWith('@doctor'));
      }, 1000);
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Редактировать врача" : "Добавить нового врача"}</DialogTitle>
        </DialogHeader>
        
        {reachedDoctorLimit ? (
          <div className="py-6 text-center">
            <p className="text-destructive font-medium mb-2">
              Достигнут лимит врачей по вашему тарифу
            </p>
            <p className="text-muted-foreground mb-4">
              Ваш текущий тариф позволяет добавить максимум {maxDoctorsAllowed} врачей.
              Для добавления большего количества врачей, пожалуйста, обновите ваш тариф.
            </p>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Закрыть
            </Button>
            <Button className="ml-2" onClick={() => console.log("Navigate to subscription page")}>
              Обновить тариф
            </Button>
          </div>
        ) : (
          <DoctorForm
            initialData={initialValues}
            services={services}
            availableBots={availableBots}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onTelegramCheck={handleTelegramCheck}
          />
        )}
        
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
