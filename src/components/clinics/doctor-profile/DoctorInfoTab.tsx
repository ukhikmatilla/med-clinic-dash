
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Clock } from "lucide-react";
import { DoctorStatusDisplay } from "@/components/clinics/profile/doctor-details/DoctorStatusDisplay";

interface Doctor {
  id: string;
  fullName: string;
  specialties: string[];
  telegramId: string | null;
  schedule: Record<string, string>;
  status: "active" | "inactive";
  experience?: string;
  category?: string;
  initialConsultation?: string;
  followupConsultation?: string;
}

interface DoctorInfoTabProps {
  doctor: Doctor;
}

export function DoctorInfoTab({ doctor }: DoctorInfoTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Основная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                <Clock className="h-4 w-4 inline mr-1" /> Стаж
              </h3>
              <p>{doctor.experience || "—"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                <Award className="h-4 w-4 inline mr-1" /> Категория
              </h3>
              <p>{doctor.category || "—"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Первичная консультация</h3>
              <p>{doctor.initialConsultation || "—"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Повторная консультация</h3>
              <p>{doctor.followupConsultation || "—"}</p>
            </div>
            
            <DoctorStatusDisplay status={doctor.status} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Расписание</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(doctor.schedule).length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(doctor.schedule).map(([day, time]) => (
                <div key={day} className="flex justify-between">
                  <span className="font-medium">{day}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Расписание не задано</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
