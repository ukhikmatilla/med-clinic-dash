
import { Appointment } from "@/components/clinics/doctor-profile/types/appointment";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Ban } from "lucide-react";

// Get appointment status badge
export const getStatusBadge = (status: Appointment['status']) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="success" className="min-w-24 justify-center">
          <Check className="h-3 w-3 mr-1" />
          Завершен
        </Badge>
      );
    case "upcoming":
      return (
        <Badge variant="outline" className="min-w-24 justify-center">
          <Clock className="h-3 w-3 mr-1" />
          Предстоит
        </Badge>
      );
    case "cancelled":
      return (
        <Badge variant="destructive" className="min-w-24 justify-center">
          <Ban className="h-3 w-3 mr-1" />
          Отменен
        </Badge>
      );
    case "missed":
      return (
        <Badge variant="warning" className="min-w-24 justify-center">
          <Clock className="h-3 w-3 mr-1" />
          Пропущен
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// Get payment status badge
export const getPaymentBadge = (status: Appointment['paymentStatus']) => {
  switch (status) {
    case "paid":
      return <Badge className="bg-green-500">Оплачено</Badge>;
    case "unpaid":
      return <Badge variant="destructive">Не оплачено</Badge>;
    case "partial":
      return <Badge variant="warning">Частично</Badge>;
    case "refunded":
      return <Badge variant="outline">Возврат</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
