
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ViewServiceDialog } from "./ViewServiceDialog";

interface ServiceDoctor {
  id: string;
  name: string;
}

interface Service {
  id: string;
  title: string;
  category: string;
  price: number;
  durationMin: number;
  doctors: ServiceDoctor[];
}

interface ServicesGroup {
  category: string;
  items: Service[];
}

interface ServicesTabProps {
  services?: ServicesGroup[];
  isSuperAdmin?: boolean;
}

export function ServicesTab({ services = [], isSuperAdmin = false }: ServicesTabProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [viewServiceOpen, setViewServiceOpen] = useState(false);
  
  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setViewServiceOpen(true);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };
  
  return (
    <>
      <Card className="bg-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Услуги</CardTitle>
            {!isSuperAdmin && (
              <Button size="sm">Добавить услугу</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {services.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Услуги не найдены
              </div>
            ) : (
              services.map((group, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    {getCategoryIcon(group.category)}
                    {group.category}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((service) => (
                      <li key={service.id} className="flex justify-between items-center">
                        <div className="flex items-center flex-1">
                          <span>{service.title}</span>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="ml-2"
                            onClick={() => handleViewService(service)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <span className="font-medium">{formatPrice(service.price)} сум</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      
      <ViewServiceDialog
        open={viewServiceOpen}
        onOpenChange={setViewServiceOpen}
        service={selectedService}
      />
    </>
  );
}

// Helper function to get icon for category
function getCategoryIcon(category: string) {
  let emoji = "";
  
  switch(category.toLowerCase()) {
    case "анализы":
      emoji = "🧬 ";
      break;
    case "узи":
      emoji = "🦴 ";
      break;
    case "консультации":
      emoji = "👨‍⚕️ ";
      break;
    case "гормоны":
      emoji = "⚗️ ";
      break;
    case "мрт":
      emoji = "🔍 ";
      break;
    default:
      emoji = "🏥 ";
  }
  
  return emoji;
}
