
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClinicFormFields } from "./form/ClinicFormFields";
import { useClinicForm, type Clinic } from "./form/useClinicForm";

interface AddEditClinicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (clinic: Clinic | Omit<Clinic, "id">) => void;
  clinic?: Clinic;
}

export function AddEditClinicDialog({
  open,
  onOpenChange,
  onSubmit,
  clinic
}: AddEditClinicDialogProps) {
  const isEditing = !!clinic;
  const { formData, errors, validateForm, handleChange, toast } = useClinicForm(clinic);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, проверьте правильность заполнения полей",
        variant: "destructive"
      });
      return;
    }
    
    const doctorsLimitNumber = parseInt(formData.doctorsLimit, 10);
    
    const submitData = {
      ...(clinic && { id: clinic.id }),
      name: formData.name,
      admin: formData.admin,
      email: formData.email,
      doctors: clinic?.doctors || 0,
      patients: clinic?.patients || 0,
      subscription: formData.subscription,
      subscriptionActive: true,
      hasGCalendar: formData.hasGCalendar,
      plan: formData.plan,
      doctorsLimit: isNaN(doctorsLimitNumber) ? undefined : doctorsLimitNumber,
      telegramBotPatient: formData.telegramBotPatient,
      telegramBotDoctor: formData.telegramBotDoctor,
      timezone: formData.timezone
    };
    
    onSubmit(submitData);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Редактировать" : "Добавить"} клинику</DialogTitle>
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
              {isEditing ? "Сохранить" : "Создать"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
