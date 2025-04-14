
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicInfo } from "@/components/clinics/profile/ClinicInfo";
import { SubscriptionInfo } from "@/components/clinics/profile/SubscriptionInfo";
import { DoctorsTab } from "@/components/clinics/profile/DoctorsTab";
import { ServicesTab } from "@/components/clinics/profile/ServicesTab";
import { IntegrationsTab } from "@/components/clinics/profile/IntegrationsTab";

export function SuperAdminClinicProfile() {
  // This would come from your API in a real application
  const clinic = {
    id: 1,
    name: "Najot Shifo",
    description: "Центр высококачественной медицины с опытом более 12 лет. Современные технологии и квалифицированные врачи.",
    admin: "@najot",
    doctors: 10,
    patients: 800,
    subscription: {
      status: "active",
      expiryDate: "01.06.2025",
      plan: "CRM + Telegram",
      autoRenewal: true
    },
    integrations: {
      googleCalendar: true,
      telegramBots: {
        patient: {
          connected: true,
          id: "@najot_med_bot"
        },
        doctor: {
          connected: true,
          id: "@najot_doctor_bot"
        }
      }
    }
  };
  
  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{clinic.name}</h1>
          <div className="space-x-2">
            <Button variant="outline">Назад</Button>
            <Button variant="outline">Редактировать</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <ClinicInfo 
            name={clinic.name}
            description={clinic.description}
            admin={clinic.admin}
            doctors={clinic.doctors}
            patients={clinic.patients}
          />
          
          <SubscriptionInfo 
            status={clinic.subscription.status}
            expiryDate={clinic.subscription.expiryDate}
            plan={clinic.subscription.plan}
            autoRenewal={clinic.subscription.autoRenewal}
          />
        </div>
        
        <Tabs defaultValue="doctors">
          <TabsList className="mb-4">
            <TabsTrigger value="doctors">Врачи</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          </TabsList>
          
          <TabsContent value="doctors">
            <DoctorsTab />
          </TabsContent>
          
          <TabsContent value="services">
            <ServicesTab />
          </TabsContent>
          
          <TabsContent value="integrations">
            <IntegrationsTab 
              googleCalendar={clinic.integrations.googleCalendar}
              telegramBots={clinic.integrations.telegramBots}
            />
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
}

export default SuperAdminClinicProfile;
