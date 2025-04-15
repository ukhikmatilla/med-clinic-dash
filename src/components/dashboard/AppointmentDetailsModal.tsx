
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  User, 
  UserRound, 
  FileText, 
  MapPin,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { SendSmsModal } from "./SendSmsModal";
import { PaymentModal } from "./PaymentModal";
import { useToast } from "@/hooks/use-toast";

interface AppointmentDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentId: number | null;
}

export function AppointmentDetailsModal({ 
  open, 
  onOpenChange,
  appointmentId
}: AppointmentDetailsModalProps) {
  const { toast } = useToast();
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  if (!appointmentId) return null;
  
  // In a real app, fetch appointment details based on appointmentId
  // Here we'll use mock data
  const appointmentDetails = {
    id: appointmentId,
    status: "scheduled", // scheduled, completed, cancelled
    date: "15.04.2025",
    time: "10:30",
    duration: "45 минут",
    patient: {
      name: "Ахмедов Рустам",
      phone: "+998 90 123 45 67",
      email: "rustam@example.com",
      medicalCardNumber: "MC-2023-12345"
    },
    doctor: {
      name: "Закирова Г.А.",
      specialty: "Кардиолог"
    },
    service: {
      name: "Консультация кардиолога",
      price: "250,000 сум"
    },
    location: "Кабинет 103, 1 этаж",
    comment: "Первичный приём. Пациент жалуется на боли в груди при физической нагрузке."
  };

  const getStatusBadge = () => {
    switch (appointmentDetails.status) {
      case "scheduled":
        return (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Запланирован
          </div>
        );
      case "completed":
        return (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Завершен
          </div>
        );
      case "cancelled":
        return (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Отменен
          </div>
        );
      default:
        return null;
    }
  };
  
  const handleCallPatient = () => {
    // Check if we're on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Open phone dialer with the patient's phone number
      window.location.href = `tel:${appointmentDetails.patient.phone.replace(/\s+/g, '')}`;
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

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Информация о приёме #{appointmentId}</span>
              {getStatusBadge()}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Date and Time */}
            <div className="flex items-start space-x-6">
              <div className="min-w-0 flex-1">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">Дата:</span>
                  <span className="ml-2 font-medium">{appointmentDetails.date}</span>
                </div>
                <div className="mt-1 flex items-center text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">Время:</span>
                  <span className="ml-2 font-medium">{appointmentDetails.time} ({appointmentDetails.duration})</span>
                </div>
                <div className="mt-1 flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">Место:</span>
                  <span className="ml-2 font-medium">{appointmentDetails.location}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="rounded-md bg-blue-50 p-3 text-center">
                  <p className="text-xs font-medium text-blue-700">{appointmentDetails.service.price}</p>
                  <p className="text-xs text-blue-500">Стоимость приёма</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Patient Info */}
            <div>
              <h3 className="text-sm font-medium flex items-center">
                <User className="h-4 w-4 mr-2" />
                Информация о пациенте
              </h3>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex">
                  <span className="w-1/3 text-muted-foreground">ФИО:</span>
                  <span className="w-2/3 font-medium">{appointmentDetails.patient.name}</span>
                </div>
                <div className="flex">
                  <span className="w-1/3 text-muted-foreground">Телефон:</span>
                  <span className="w-2/3">{appointmentDetails.patient.phone}</span>
                </div>
                <div className="flex">
                  <span className="w-1/3 text-muted-foreground">Email:</span>
                  <span className="w-2/3">{appointmentDetails.patient.email}</span>
                </div>
                <div className="flex">
                  <span className="w-1/3 text-muted-foreground">Мед. карта:</span>
                  <span className="w-2/3">{appointmentDetails.patient.medicalCardNumber}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Doctor and Service */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium flex items-center">
                  <UserRound className="h-4 w-4 mr-2" />
                  Врач
                </h3>
                <div className="mt-1 text-sm">
                  <div>{appointmentDetails.doctor.name}</div>
                  <div className="text-muted-foreground">{appointmentDetails.doctor.specialty}</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Услуга
                </h3>
                <div className="mt-1 text-sm">
                  <div>{appointmentDetails.service.name}</div>
                  <div className="text-muted-foreground">{appointmentDetails.service.price}</div>
                </div>
              </div>
            </div>
            
            {/* Comment */}
            {appointmentDetails.comment && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium">Комментарий</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {appointmentDetails.comment}
                  </p>
                </div>
              </>
            )}
          </div>
          
          <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 mt-4">
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" onClick={handleCallPatient}>
                <Phone className="h-3.5 w-3.5 mr-1" />
                Позвонить
              </Button>
              <Button variant="outline" size="sm" onClick={handleSendSms}>
                <Mail className="h-3.5 w-3.5 mr-1" />
                Отправить SMS
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button variant="secondary" size="sm" onClick={handlePayment}>
                <CreditCard className="h-3.5 w-3.5 mr-1" />
                Оплата
              </Button>
              <Button size="sm" onClick={() => onOpenChange(false)}>Закрыть</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* SMS Modal */}
      <SendSmsModal 
        open={isSmsModalOpen}
        onOpenChange={setIsSmsModalOpen}
        patientPhone={appointmentDetails.patient.phone}
        patientName={appointmentDetails.patient.name}
      />
      
      {/* Payment Modal */}
      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        appointmentId={appointmentId}
        patientName={appointmentDetails.patient.name}
        serviceName={appointmentDetails.service.name}
        servicePrice={appointmentDetails.service.price}
      />
    </>
  );
}
