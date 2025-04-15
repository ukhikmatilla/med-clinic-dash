
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Tag, Users } from "lucide-react";
import { Service } from "@/hooks/doctors/types";

interface ServiceDetails {
  id: string;
  title: string;
  category: string;
  price: number;
  durationMin: number;
  doctors: {
    id: string;
    name: string;
  }[];
}

interface ViewServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: ServiceDetails | null;
}

export function ViewServiceDialog({ 
  open, 
  onOpenChange,
  service
}: ViewServiceDialogProps) {
  if (!service) return null;
  
  // Format price with spaces for thousands
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(service.price);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Информация об услуге</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Название</h3>
            <p className="font-medium">{service.title}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Категория</h3>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{service.category}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Стоимость</h3>
              <p className="font-medium">{formattedPrice} сум</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Длительность</h3>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{service.durationMin} минут</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Прикреплено к врачам
            </h3>
            {service.doctors.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {service.doctors.map((doctor) => (
                  <li key={doctor.id}>{doctor.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Не прикреплено к врачам</p>
            )}
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
