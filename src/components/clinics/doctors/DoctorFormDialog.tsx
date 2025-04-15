
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

interface Doctor {
  id: string;
  fullName: string;
  specialties: string[];
  telegramId: string | null;
  schedule: Record<string, string>;
  services: string[];
  status: "active" | "inactive";
}

interface DoctorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor?: Doctor | null;
  services: Service[];
  onSave: (doctor: DoctorFormValues, isEditing: boolean) => Promise<void>;
}

export function DoctorFormDialog({
  open,
  onOpenChange,
  doctor,
  services,
  onSave,
}: DoctorFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const isEditing = !!doctor;
  
  // Convert doctor to form values format if editing
  const initialValues = doctor ? {
    fullName: doctor.fullName,
    telegramId: doctor.telegramId || "",
    specialties: doctor.specialties.join(", "),
    schedule: Object.entries(doctor.schedule)
      .map(([day, time]) => `${day} ${time}`)
      .join(", "),
    isActive: doctor.status === "active",
    services: doctor.services,
  } : undefined;
  
  const handleSubmit = async (values: DoctorFormValues) => {
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
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Редактировать врача" : "Добавить нового врача"}</DialogTitle>
        </DialogHeader>
        
        <DoctorForm
          initialData={initialValues}
          services={services}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
        
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
