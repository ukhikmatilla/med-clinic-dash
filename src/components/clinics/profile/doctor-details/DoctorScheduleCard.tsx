
import { Calendar } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface DoctorScheduleCardProps {
  schedule: Record<string, string>;
}

export function DoctorScheduleCard({ schedule }: DoctorScheduleCardProps) {
  const scheduleEntries = Object.entries(schedule);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          Расписание
        </CardTitle>
      </CardHeader>
      <CardContent>
        {scheduleEntries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {scheduleEntries.map(([day, time]) => (
              <div key={day} className="flex justify-between">
                <span className="font-medium">{day}</span>
                <span>{time}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Расписание не указано</p>
        )}
      </CardContent>
    </Card>
  );
}
