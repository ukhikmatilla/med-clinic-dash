import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Clinic {
  id: number;
  name: string;
  admin: string;
  email?: string;
  doctors: number;
  patients: number;
  subscription: string;
  subscriptionActive: boolean;
  hasGCalendar: boolean;
  plan?: string;
  doctorsLimit?: number;
  telegramBotPatient?: string; // New field for patient bot
  telegramBotDoctor?: string;  // New field for doctor bot
  timezone?: string;
}

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
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: clinic?.name || "",
    admin: clinic?.admin || "",
    email: clinic?.email || "",
    plan: clinic?.plan || "CRM",
    doctorsLimit: clinic?.doctorsLimit?.toString() || "10",
    subscription: clinic?.subscription || "",
    telegramBotPatient: clinic?.telegramBotPatient || "",
    telegramBotDoctor: clinic?.telegramBotDoctor || "",
    timezone: clinic?.timezone || "Ташкент (UTC+5)",
    hasGCalendar: clinic?.hasGCalendar || false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Название клиники обязательно";
    }
    
    if (!formData.admin.trim()) {
      newErrors.admin = "Telegram ID администратора обязателен";
    } else if (!formData.admin.startsWith("@")) {
      newErrors.admin = "Telegram ID должен начинаться с @";
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }
    
    if (!formData.subscription.trim()) {
      newErrors.subscription = "Срок подписки обязателен";
    }
    
    // Telegram Bot ID validation - should start with @ if provided
    if (formData.telegramBotPatient && !formData.telegramBotPatient.startsWith("@")) {
      newErrors.telegramBotPatient = "Telegram Bot ID должен начинаться с @";
    }

    if (formData.telegramBotDoctor && !formData.telegramBotDoctor.startsWith("@")) {
      newErrors.telegramBotDoctor = "Telegram Bot ID должен начинаться с @";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
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
  
  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Редактировать" : "Добавить"} клинику</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Название клиники *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="admin">Telegram ID администратора *</Label>
              <Input
                id="admin"
                value={formData.admin}
                onChange={(e) => handleChange("admin", e.target.value)}
                placeholder="@username"
                className={errors.admin ? "border-red-500" : ""}
              />
              {errors.admin && <p className="text-xs text-red-500">{errors.admin}</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="plan">Тариф *</Label>
              <Select
                value={formData.plan}
                onValueChange={(value) => handleChange("plan", value)}
              >
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Выбрать тариф" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CRM">CRM</SelectItem>
                  <SelectItem value="CRM + Telegram">CRM + Telegram</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="doctorsLimit">Лимит врачей</Label>
              <Input
                id="doctorsLimit"
                type="number"
                min="1"
                value={formData.doctorsLimit}
                onChange={(e) => handleChange("doctorsLimit", e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="subscription">Срок подписки *</Label>
              <Input
                id="subscription"
                type="text"
                placeholder="ДД.ММ.ГГГГ"
                value={formData.subscription}
                onChange={(e) => handleChange("subscription", e.target.value)}
                className={errors.subscription ? "border-red-500" : ""}
              />
              {errors.subscription && <p className="text-xs text-red-500">{errors.subscription}</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="telegramBotPatient">Telegram Bot (пациенты)</Label>
              <Input
                id="telegramBotPatient"
                value={formData.telegramBotPatient}
                onChange={(e) => handleChange("telegramBotPatient", e.target.value)}
                placeholder="@bot_name"
                className={errors.telegramBotPatient ? "border-red-500" : ""}
              />
              {errors.telegramBotPatient && <p className="text-xs text-red-500">{errors.telegramBotPatient}</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="telegramBotDoctor">Telegram Bot (врачи)</Label>
              <Input
                id="telegramBotDoctor"
                value={formData.telegramBotDoctor}
                onChange={(e) => handleChange("telegramBotDoctor", e.target.value)}
                placeholder="@bot_name"
                className={errors.telegramBotDoctor ? "border-red-500" : ""}
              />
              {errors.telegramBotDoctor && <p className="text-xs text-red-500">{errors.telegramBotDoctor}</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="timezone">Часовой пояс</Label>
              <Select
                value={formData.timezone}
                onValueChange={(value) => handleChange("timezone", value)}
              >
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Выбрать часовой пояс" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ташкент (UTC+5)">Ташкент (UTC+5)</SelectItem>
                  <SelectItem value="Москва (UTC+3)">Москва (UTC+3)</SelectItem>
                  <SelectItem value="Душанбе (UTC+5)">Душанбе (UTC+5)</SelectItem>
                  <SelectItem value="Бишкек (UTC+6)">Бишкек (UTC+6)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasGCalendar"
                checked={formData.hasGCalendar}
                onChange={(e) => handleChange("hasGCalendar", e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="hasGCalendar">Интеграция с Google Calendar</Label>
            </div>
          </div>
          
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
