
import { useState } from "react";
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
  telegramBotPatient?: string;
  telegramBotDoctor?: string;
  timezone?: string;
}

export function useClinicForm(clinic?: Clinic) {
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

  return {
    formData,
    errors,
    validateForm,
    handleChange,
    toast
  };
}

export type { Clinic };
