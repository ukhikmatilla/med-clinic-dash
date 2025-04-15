
import { Tag } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

// Updated Service interface to match the one in hooks/doctors/types.ts
interface Service {
  id: string;
  name: string;
  price: number;
  durationMin: number;
  category: string;
}

interface DoctorServicesCardProps {
  services: Service[];
}

export function DoctorServicesCard({ services }: DoctorServicesCardProps) {
  // Format price helper function
  const formatPrice = (price: number): string => {
    return `${price.toLocaleString()} сум`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center">
          <Tag className="h-4 w-4 mr-2" />
          Услуги
        </CardTitle>
      </CardHeader>
      <CardContent>
        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {services.map((service) => (
              <div key={service.id} className="flex justify-between">
                <span>{service.name}</span>
                <span className="text-muted-foreground">{formatPrice(service.price)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Услуги не указаны</p>
        )}
      </CardContent>
    </Card>
  );
}
