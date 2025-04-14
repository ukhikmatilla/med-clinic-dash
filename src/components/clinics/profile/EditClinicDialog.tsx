
import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClinicFormFields } from "../form/ClinicFormFields";
import { useClinicForm, type Clinic } from "../form/useClinicForm";
import { toast } from "sonner";

interface EditClinicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clinic: Clinic;
  onSave: (updatedClinic: Clinic) => void;
}

export function EditClinicDialog({ 
  open, 
  onOpenChange, 
  clinic,
  onSave
}: EditClinicDialogProps) {
  const { formData, errors, validateForm, handleChange } = useClinicForm(clinic);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Ошибка валидации", {
        description: "Пожалуйста, проверьте правильность заполнения полей"
      });
      return;
    }
    
    const doctorsLimitNumber = parseInt(formData.doctorsLimit, 10);
    
    const updatedClinic = {
      ...clinic,
      name: formData.name,
      admin: formData.admin,
      email: formData.email,
      subscription: formData.subscription,
      plan: formData.plan,
      doctorsLimit: isNaN(doctorsLimitNumber) ? undefined : doctorsLimitNumber,
      telegramBotPatient: formData.telegramBotPatient,
      telegramBotDoctor: formData.telegramBotDoctor,
      timezone: formData.timezone,
      hasGCalendar: formData.hasGCalendar
    };
    
    onSave(updatedClinic);
    onOpenChange(false);
    
    toast.success("Успешно сохранено", {
      description: "Информация о клинике обновлена"
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Редактировать информацию о клинике</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <ClinicFormFields 
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit">
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
