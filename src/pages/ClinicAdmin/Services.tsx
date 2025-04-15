
import React, { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { ClinicAdminSidebar } from "@/components/sidebars/ClinicAdminSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useServicesData } from "@/hooks/useServicesData";
import { Service } from "@/hooks/doctors/types";
import { ServicesList } from "@/components/services/ServicesList";
import { ServicesByCategory } from "@/components/services/ServicesByCategory";
import { ServiceForm } from "@/components/services/ServiceForm";
import { DeleteServiceDialog } from "@/components/services/DeleteServiceDialog";
import { EditServiceDialog } from "@/components/services/EditServiceDialog";
import { Toaster } from "sonner";

// Mock doctors for the demo
const mockDoctors = [
  { id: 'doctor1', fullName: 'Ортиков Шерзод Одилбекович' },
  { id: 'doctor2', fullName: 'Рахимжонова Сайёра Файзуллаевна' },
  { id: 'doctor3', fullName: 'Каримова Дилором Эргашевна' },
  { id: 'doctor4', fullName: 'Закирова Гульноза Алишеровна' },
];

export function ClinicAdminServices() {
  const { 
    services, 
    categories, 
    addService, 
    updateService, 
    deleteService,
    getServicesByCategory
  } = useServicesData();

  const [searchQuery, setSearchQuery] = useState("");
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Filter services based on search query
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle service edit
  const handleEditService = (service: Service) => {
    setServiceToEdit(service);
    setIsEditDialogOpen(true);
  };

  // Handle service delete
  const handleDeleteService = (service: Service) => {
    setServiceToDelete(service);
    setIsDeleteDialogOpen(true);
  };

  // Confirm service deletion
  const confirmDeleteService = async () => {
    if (serviceToDelete) {
      await deleteService(serviceToDelete.id);
      setIsDeleteDialogOpen(false);
    }
  };

  // Format services by category for the category view
  const servicesByCategory = getServicesByCategory();
  
  return (
    <SidebarLayout sidebar={<ClinicAdminSidebar />}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Услуги</h1>
        </div>
        
        <Tabs defaultValue="list" className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="list">Список услуг</TabsTrigger>
              <TabsTrigger value="categories">По категориям</TabsTrigger>
              <TabsTrigger value="add">Добавить услугу</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск услуг..."
                className="pl-8 w-full sm:w-[260px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="list" className="m-0">
            <Card className="bg-white">
              <CardContent className="p-0">
                <ServicesList 
                  services={filteredServices}
                  onEdit={handleEditService}
                  onDelete={(serviceId) => {
                    const service = services.find(s => s.id === serviceId);
                    if (service) handleDeleteService(service);
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="m-0">
            <ServicesByCategory serviceGroups={servicesByCategory} />
          </TabsContent>
          
          <TabsContent value="add" className="m-0">
            <ServiceForm 
              categories={categories}
              doctors={mockDoctors}
              onSubmit={addService}
            />
          </TabsContent>
        </Tabs>

        {/* Edit Service Dialog */}
        <EditServiceDialog
          service={serviceToEdit}
          categories={categories}
          doctors={mockDoctors}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={updateService}
        />

        {/* Delete Service Dialog */}
        <DeleteServiceDialog
          service={serviceToDelete}
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={confirmDeleteService}
        />
      </div>
      <Toaster />
    </SidebarLayout>
  );
}

export default ClinicAdminServices;
