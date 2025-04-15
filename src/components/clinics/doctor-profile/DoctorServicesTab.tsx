
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Edit, Plus } from "lucide-react";
import { EditServiceDialog } from "@/components/clinics/doctor-profile/EditServiceDialog";
import { useToast } from "@/hooks/use-toast";
import { Service } from "@/hooks/doctors/types";

interface Doctor {
  id: string;
}

interface DoctorServicesTabProps {
  doctor: Doctor;
  services: Service[];
}

export function DoctorServicesTab({ doctor, services }: DoctorServicesTabProps) {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{ id: string; name: string; price: number } | null>(null);
  
  const handleEditService = (service: Service) => {
    setSelectedService({
      id: service.id,
      name: service.name,
      price: service.price,
    });
    setIsEditDialogOpen(true);
  };
  
  const handleAddService = () => {
    setSelectedService(null);
    setIsEditDialogOpen(true);
  };
  
  const handleSaveService = (serviceData: { id: string; name: string; price: number }) => {
    // In a real application, this would make an API call
    toast({
      title: "Услуга сохранена",
      description: `Услуга "${serviceData.name}" была успешно ${selectedService ? 'обновлена' : 'добавлена'}.`
    });
    setIsEditDialogOpen(false);
  };

  // Helper function to format price
  const formatPrice = (price: number): string => {
    return `${price.toLocaleString()} сум`;
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">Услуги врача</CardTitle>
          <Button size="sm" onClick={handleAddService}>
            <Plus className="mr-2 h-4 w-4" />
            Добавить услугу
          </Button>
        </CardHeader>
        <CardContent>
          {services.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название услуги</TableHead>
                  <TableHead className="text-right">Цена</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell className="text-right">{formatPrice(service.price)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              У врача нет назначенных услуг. Нажмите "Добавить услугу", чтобы добавить услугу.
            </div>
          )}
        </CardContent>
      </Card>
      
      <EditServiceDialog 
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        service={selectedService}
        onSave={handleSaveService}
      />
    </>
  );
}
