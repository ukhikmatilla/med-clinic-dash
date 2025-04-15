
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Phone,
  Mail,
  CreditCard,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SendSmsModal } from "../SendSmsModal";
import { PaymentModal } from "../payment/PaymentModal";
import { useState } from "react";
import { AppointmentStatusBadge } from "./AppointmentStatusBadge";
import { AppointmentDateTime } from "./AppointmentDateTime";
import { PatientInfo } from "./PatientInfo";
import { DoctorServiceInfo } from "./DoctorServiceInfo";
import { useAppointmentActions } from "./useAppointmentActions";

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

  const {
    isSmsModalOpen,
    setIsSmsModalOpen,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    handleCallPatient,
    handleSendSms,
    handlePayment
  } = useAppointmentActions({
    patientPhone: appointmentDetails.patient.phone,
    patientName: appointmentDetails.patient.name
  });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Информация о приёме #{appointmentId}</span>
              <AppointmentStatusBadge status={appointmentDetails.status} />
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Date and Time */}
            <AppointmentDateTime
              date={appointmentDetails.date}
              time={appointmentDetails.time}
              duration={appointmentDetails.duration}
              location={appointmentDetails.location}
              price={appointmentDetails.service.price}
            />
            
            <Separator />
            
            {/* Patient Info */}
            <PatientInfo
              name={appointmentDetails.patient.name}
              phone={appointmentDetails.patient.phone}
              email={appointmentDetails.patient.email}
              medicalCardNumber={appointmentDetails.patient.medicalCardNumber}
            />
            
            <Separator />
            
            {/* Doctor and Service */}
            <DoctorServiceInfo
              doctorName={appointmentDetails.doctor.name}
              doctorSpecialty={appointmentDetails.doctor.specialty}
              serviceName={appointmentDetails.service.name}
              servicePrice={appointmentDetails.service.price}
            />
            
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
