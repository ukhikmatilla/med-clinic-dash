
import { FC } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

interface AppointmentDateTimeProps {
  date: string;
  time: string;
  duration: string;
  location: string;
  price: string;
}

export const AppointmentDateTime: FC<AppointmentDateTimeProps> = ({
  date,
  time,
  duration,
  location,
  price
}) => {
  return (
    <div className="flex items-start space-x-6">
      <div className="min-w-0 flex-1">
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
          <span className="text-muted-foreground">Дата:</span>
          <span className="ml-2 font-medium">{date}</span>
        </div>
        <div className="mt-1 flex items-center text-sm">
          <Clock className="h-4 w-4 text-muted-foreground mr-2" />
          <span className="text-muted-foreground">Время:</span>
          <span className="ml-2 font-medium">{time} ({duration})</span>
        </div>
        <div className="mt-1 flex items-center text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
          <span className="text-muted-foreground">Место:</span>
          <span className="ml-2 font-medium">{location}</span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <div className="rounded-md bg-blue-50 p-3 text-center">
          <p className="text-xs font-medium text-blue-700">{price}</p>
          <p className="text-xs text-blue-500">Стоимость приёма</p>
        </div>
      </div>
    </div>
  );
};
