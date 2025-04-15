
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Edit, Award, Clock } from "lucide-react";

interface Doctor {
  id: string;
  fullName: string;
  specialties: string[];
  telegramId: string | null;
  status: "active" | "inactive";
  experience?: string;
  category?: string;
}

interface DoctorProfileHeaderProps {
  doctor: Doctor;
  onEditClick?: () => void;
}

export function DoctorProfileHeader({ doctor, onEditClick }: DoctorProfileHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold">{doctor.fullName}</h1>
              <Badge variant={doctor.status === "active" ? "success" : "destructive"}>
                {doctor.status === "active" ? (
                  <Check className="h-3 w-3 mr-1" />
                ) : (
                  <X className="h-3 w-3 mr-1" />
                )}
                {doctor.status === "active" ? "Активен" : "Неактивен"}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {doctor.specialties && doctor.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline">
                  {specialty}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 mt-2">
              {doctor.experience && (
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground mr-1">Стаж:</span>
                  {doctor.experience}
                </div>
              )}
              
              {doctor.category && (
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground mr-1">Категория:</span>
                  {doctor.category}
                </div>
              )}
            </div>
            
            <div className="mt-2 text-sm">
              <span className="text-muted-foreground">Telegram: </span>
              {doctor.telegramId ? (
                <span>{doctor.telegramId}</span>
              ) : (
                <span className="text-muted-foreground italic">Не указан</span>
              )}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={onEditClick}>
              <Edit className="h-4 w-4 mr-2" />
              Редактировать
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
