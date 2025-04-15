
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface UseAppointmentActionsProps {
  patientPhone: string;
  patientName: string;
}

export const useAppointmentActions = ({
  patientPhone,
  patientName
}: UseAppointmentActionsProps) => {
  const { toast } = useToast();
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const handleCallPatient = () => {
    // Check if we're on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Open phone dialer with the patient's phone number
      window.location.href = `tel:${patientPhone.replace(/\s+/g, '')}`;
    } else {
      // On desktop, show a toast notification
      toast({
        title: "Функция звонка",
        description: "Звонок доступен только на мобильных устройствах",
      });
    }
  };
  
  const handleSendSms = () => {
    setIsSmsModalOpen(true);
  };
  
  const handlePayment = () => {
    setIsPaymentModalOpen(true);
  };

  return {
    isSmsModalOpen,
    setIsSmsModalOpen,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    handleCallPatient,
    handleSendSms,
    handlePayment
  };
};
