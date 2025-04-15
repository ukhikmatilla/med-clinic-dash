
import { Badge } from "@/components/ui/badge";
import { Clock, Award } from "lucide-react";

interface DoctorBasicInfoProps {
  fullName: string;
  telegramId: string | null;
  specialties: string[];
  experience?: string;
  category?: string;
  initialConsultation?: string;
  followupConsultation?: string;
  telegramConnected?: boolean;
}

export function DoctorBasicInfo({
  fullName,
  telegramId,
  specialties,
  experience,
  category,
  initialConsultation,
  followupConsultation,
  telegramConnected
}: DoctorBasicInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">ФИО</h3>
        <p className="font-medium">{fullName}</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">Telegram ID</h3>
        <div className="flex items-center">
          <p>{telegramId || "—"}</p>
          {telegramId && telegramConnected !== undefined && (
            <Badge className="ml-2" variant={telegramConnected ? "success" : "destructive"}>
              {telegramConnected ? "Подключен" : "Не подключен"}
            </Badge>
          )}
        </div>
      </div>
      
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">Специальность(и)</h3>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <Badge key={index} variant="outline">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">
          <Clock className="h-4 w-4 inline mr-1" /> Стаж
        </h3>
        <p>{experience || "—"}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">
          <Award className="h-4 w-4 inline mr-1" /> Категория
        </h3>
        <p>{category || "—"}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">Первичная консультация</h3>
        <p>{initialConsultation || "—"}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">Повторная консультация</h3>
        <p>{followupConsultation || "—"}</p>
      </div>
    </div>
  );
}
