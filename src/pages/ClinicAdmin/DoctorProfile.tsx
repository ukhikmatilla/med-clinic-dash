
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { ClinicAdminSidebar } from "@/components/sidebars/ClinicAdminSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoctorProfileHeader } from "@/components/clinics/doctor-profile/DoctorProfileHeader";
import { DoctorInfoTab } from "@/components/clinics/doctor-profile/DoctorInfoTab";
import { DoctorIntegrationsTab } from "@/components/clinics/doctor-profile/DoctorIntegrationsTab";
import { DoctorServicesTab } from "@/components/clinics/doctor-profile/DoctorServicesTab";
import { DoctorScheduleTab } from "@/components/clinics/doctor-profile/DoctorScheduleTab";
import { DoctorAppointmentsTab } from "@/components/clinics/doctor-profile/DoctorAppointmentsTab";
import { DoctorFormDialog } from "@/components/clinics/doctors/DoctorFormDialog";
import { useDoctorProfileData } from "@/hooks/useDoctorProfileData";
import { mockServices } from "@/data/doctors/mockData";
import { Loader2 } from "lucide-react";

export function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const { doctor, services, isLoading } = useDoctorProfileData(id);
  const [activeTab, setActiveTab] = useState("info");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  if (isLoading) {
    return (
      <SidebarLayout sidebar={<ClinicAdminSidebar clinicName="Najot Shifo" />}>
        <div className="p-6 flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </SidebarLayout>
    );
  }
  
  if (!doctor) {
    return (
      <SidebarLayout sidebar={<ClinicAdminSidebar clinicName="Najot Shifo" />}>
        <div className="p-6">
          <div className="text-center py-8 text-muted-foreground">
            Врач не найден
          </div>
        </div>
      </SidebarLayout>
    );
  }
  
  return (
    <SidebarLayout sidebar={<ClinicAdminSidebar clinicName="Najot Shifo" />}>
      <div className="p-2 sm:p-6 space-y-6">
        <DoctorProfileHeader 
          doctor={doctor}
          onEditClick={() => setEditDialogOpen(true)}
        />
        
        <Tabs 
          defaultValue="info" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="info" className="py-2">Информация</TabsTrigger>
            <TabsTrigger value="integrations" className="py-2">Интеграции</TabsTrigger>
            <TabsTrigger value="services" className="py-2">Услуги</TabsTrigger>
            <TabsTrigger value="schedule" className="py-2">Расписание</TabsTrigger>
            <TabsTrigger value="appointments" className="py-2">Приёмы</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="mt-6">
            <DoctorInfoTab doctor={doctor} />
          </TabsContent>
          
          <TabsContent value="integrations" className="mt-6">
            <DoctorIntegrationsTab doctor={doctor} />
          </TabsContent>
          
          <TabsContent value="services" className="mt-6">
            <DoctorServicesTab doctor={doctor} services={services} />
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-6">
            <DoctorScheduleTab doctor={doctor} />
          </TabsContent>
          
          <TabsContent value="appointments" className="mt-6">
            <DoctorAppointmentsTab doctor={doctor} />
          </TabsContent>
        </Tabs>
        
        {/* Edit Doctor Dialog */}
        <DoctorFormDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          doctor={doctor}
          services={mockServices}
          onSave={async (values, isEditing) => {
            // In a real app, this would update the doctor data
            console.log("Updating doctor:", values);
            // You would make an API call here to update the doctor
          }}
        />
      </div>
    </SidebarLayout>
  );
}

export default DoctorProfile;
