
import { FC } from "react";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

interface AppointmentStatusBadgeProps {
  status: string;
}

export const AppointmentStatusBadge: FC<AppointmentStatusBadgeProps> = ({ status }) => {
  switch (status) {
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
