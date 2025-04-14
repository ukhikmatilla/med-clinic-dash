
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Tag } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface DoctorDetails {
  id: string;
  fullName: string;
  specialties: string[];
  telegramId: string | null;
  schedule: Record<string, string>;
  services: string[];
  status: "active" | "inactive";
}

interface ViewDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: DoctorDetails | null;
}

export function ViewDoctorDialog({ 
  open, 
  onOpenChange,
  doctor
}: ViewDoctorDialogProps) {
  if (!doctor) return null;
  
  const scheduleEntries = Object.entries(doctor.schedule);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Информация о враче</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">ФИО</h3>
              <p className="font-medium">{doctor.fullName}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Telegram ID</h3>
              <p>{doctor.telegramId || "—"}</p>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Специальность(и)</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.specialties.map((specialty, index) => (
                  <span key={index} className="bg-muted rounded-md px-2 py-1 text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Расписание
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {scheduleEntries.map(([day, time]) => (
                  <div key={day} className="flex justify-between">
                    <span className="font-medium">{day}</span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Привязанные услуги
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {doctor.services.map((service, index) => (
                  <span key={index} className="bg-muted rounded-md px-2 py-1 text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Статус</h3>
            <div className="flex items-center">
              {doctor.status === "active" ? (
                <>
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Активен</span>
                </>
              ) : (
                <span className="text-muted-foreground">Неактивен</span>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
