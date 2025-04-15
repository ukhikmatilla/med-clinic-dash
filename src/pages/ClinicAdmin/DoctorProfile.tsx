
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { ClinicAdminSidebar } from "@/components/sidebars/ClinicAdminSidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CalendarIcon, MessageSquare, Tag, User, History } from "lucide-react";
import { DoctorProfileHeader } from "@/components/clinics/doctor-profile/DoctorProfileHeader";
import { DoctorInfoTab } from "@/components/clinics/doctor-profile/DoctorInfoTab";
import { DoctorIntegrationsTab } from "@/components/clinics/doctor-profile/DoctorIntegrationsTab";
import { DoctorServicesTab } from "@/components/clinics/doctor-profile/DoctorServicesTab";
import { DoctorScheduleTab } from "@/components/clinics/doctor-profile/DoctorScheduleTab";
import { DoctorAppointmentsTab } from "@/components/clinics/doctor-profile/DoctorAppointmentsTab";
import { useDoctorProfileData } from "@/hooks/useDoctorProfileData";

export function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("info");
  const { doctor, services, isLoading } = useDoctorProfileData(id);
  
  // Handle back navigation
  const handleBack = () => {
    window.history.back();
  };
  
  if (isLoading) {
    return (
      <SidebarLayout sidebar={<ClinicAdminSidebar clinicName="Клиника №1" />}>
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </SidebarLayout>
    );
  }
  
  if (!doctor) {
    return (
      <SidebarLayout sidebar={<ClinicAdminSidebar clinicName="Клиника №1" />}>
        <div className="p-4">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
          <div className="text-center py-10">
            <h2 className="text-xl font-medium">Врач не найден</h2>
            <p className="text-muted-foreground mt-2">
              Врач с ID {id} не найден в системе
            </p>
            <Button className="mt-4" onClick={handleBack}>
              Вернуться к списку врачей
            </Button>
          </div>
        </div>
      </SidebarLayout>
    );
  }
  
  return (
    <SidebarLayout sidebar={<ClinicAdminSidebar clinicName="Клиника №1" />}>
      <div className="p-4 sm:p-6">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к списку врачей
        </Button>
        
        <DoctorProfileHeader doctor={doctor} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="info" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Информация</span>
              <span className="md:hidden">Инфо</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Интеграции</span>
              <span className="md:hidden">Интегр.</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Услуги</span>
              <span className="md:hidden">Услуги</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Расписание</span>
              <span className="md:hidden">Распис.</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center">
              <History className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Приёмы</span>
              <span className="md:hidden">Приёмы</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="info">
              <DoctorInfoTab doctor={doctor} />
            </TabsContent>
            
            <TabsContent value="integrations">
              <DoctorIntegrationsTab doctor={doctor} />
            </TabsContent>
            
            <TabsContent value="services">
              <DoctorServicesTab doctor={doctor} services={services} />
            </TabsContent>
            
            <TabsContent value="schedule">
              <DoctorScheduleTab doctor={doctor} />
            </TabsContent>
            
            <TabsContent value="appointments">
              <DoctorAppointmentsTab doctor={doctor} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </SidebarLayout>
  );
}

export default DoctorProfile;
