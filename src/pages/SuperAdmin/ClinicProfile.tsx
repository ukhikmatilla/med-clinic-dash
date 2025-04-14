import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicInfo } from "@/components/clinics/profile/ClinicInfo";
import { SubscriptionInfo } from "@/components/clinics/profile/SubscriptionInfo";
import { DoctorsTab } from "@/components/clinics/profile/DoctorsTab";
import { ServicesTab } from "@/components/clinics/profile/ServicesTab";
import { IntegrationsTab } from "@/components/clinics/profile/IntegrationsTab";
import { EditClinicDialog } from "@/components/clinics/profile/EditClinicDialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";

// Mock API calls - in a real app, these would be replaced with actual API calls
const fetchClinicData = async (id: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: 1,
    name: "Najot Shifo",
    description: "Центр высококачественной медицины с опытом более 12 лет. Современные технологии и квалифицированные врачи.",
    admin: "@najot",
    email: "info@najotshifo.uz",
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
};

const fetchDoctors = async (clinicId: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return [
    {
      id: "d1",
      fullName: "Ортиков Шерзод Одилбекович",
      specialties: ["Дерматолог", "Косметолог"],
      telegramId: null,
      schedule: {
        "Пн": "14:00–17:00",
        "Вт": "14:00–17:00",
        "Ср": "14:00–17:00",
        "Чт": "14:00–17:00",
        "Пт": "14:00–17:00",
        "Сб": "14:00–17:00",
        "Вс": ""
      },
      services: ["Консультация дерматолога", "Удаление бородавок", "Лечение акне"],
      status: "active"
    },
    {
      id: "d2",
      fullName: "Рахимжонова Сайёра Файзуллаевна",
      specialties: ["УЗИ-специалист"],
      telegramId: null,
      schedule: {
        "Пн": "09:30–16:00",
        "Вт": "09:30–16:00",
        "Ср": "09:30–16:00",
        "Чт": "09:30–16:00",
        "Пт": "09:30–16:00",
        "Сб": "09:30–16:00",
        "Вс": ""
      },
      services: ["УЗИ щитовидной железы", "УЗИ для беременных", "УЗИ сердца"],
      status: "active"
    },
    {
      id: "d3",
      fullName: "Каримова Дилором Эргашевна",
      specialties: ["Акушер", "Гинеколог"],
      telegramId: null,
      schedule: {
        "Пн": "09:00–14:00",
        "Вт": "09:00–14:00",
        "Ср": "09:00–14:00",
        "Чт": "09:00–14:00",
        "Пт": "09:00–14:00",
        "Сб": "",
        "Вс": ""
      },
      services: ["Консультация гинеколога", "ПАП-тест", "Кольпоскопия"],
      status: "active"
    }
  ];
};

const fetchServices = async (clinicId: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      category: "Анализы",
      items: [
        {
          id: "s1",
          title: "Общий анализ крови + СОЭ",
          price: 50000,
          durationMin: 15,
          category: "Анализы",
          doctors: [
            { id: "d1", name: "Ортиков Шерзод Одилбекович" }
          ]
        },
        {
          id: "s2",
          title: "Концентрация гемоглобина (HGB)",
          price: 28000,
          durationMin: 10,
          category: "Анализы",
          doctors: [
            { id: "d1", name: "Ортиков Шерзод Одилбекович" }
          ]
        },
        {
          id: "s3",
          title: "Глюкоза натощак",
          price: 34000,
          durationMin: 15,
          category: "Анализы",
          doctors: [
            { id: "d1", name: "Ортиков Шерзод Одилбекович" }
          ]
        }
      ]
    },
    {
      category: "УЗИ",
      items: [
        {
          id: "s4",
          title: "УЗИ щитовидной железы",
          price: 90000,
          durationMin: 20,
          category: "УЗИ",
          doctors: [
            { id: "d2", name: "Рахимжонова Сайёра Файзуллаевна" }
          ]
        },
        {
          id: "s5",
          title: "УЗИ для беременных",
          price: 106000,
          durationMin: 30,
          category: "УЗИ",
          doctors: [
            { id: "d2", name: "Рахимжонова Сайёра Файзуллаевна" }
          ]
        },
        {
          id: "s6",
          title: "УЗИ сердца",
          price: 168000,
          durationMin: 25,
          category: "УЗИ",
          doctors: [
            { id: "d2", name: "Рахимжонова Сайёра Файзуллаевна" }
          ]
        }
      ]
    },
    {
      category: "Консультации",
      items: [
        {
          id: "s7",
          title: "Консультация гинеколога",
          price: 120000,
          durationMin: 30,
          category: "Консультации",
          doctors: [
            { id: "d3", name: "Каримова Дилором Эргашевна" }
          ]
        },
        {
          id: "s8",
          title: "Консультация дерматолога",
          price: 100000,
          durationMin: 30,
          category: "Консультации",
          doctors: [
            { id: "d1", name: "Ортиков Шерзод Одилбекович" }
          ]
        }
      ]
    }
  ];
};

// New mock function for toggling auto-renewal
const toggleAutoRenewal = async (clinicId: string, value: boolean): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulating a 90% success rate
  if (Math.random() > 0.1) {
    return value;
  } else {
    throw new Error("Failed to update auto-renewal status");
  }
};

export function SuperAdminClinicProfile() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [clinic, setClinic] = useState<any>(null);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [clinicData, doctorsData, servicesData] = await Promise.all([
          fetchClinicData(id || ""),
          fetchDoctors(id || ""),
          fetchServices(id || "")
        ]);
        
        setClinic(clinicData);
        setDoctors(doctorsData);
        setServices(servicesData);
      } catch (error) {
        toast({
          title: "Ошибка загрузки данных",
          description: "Не удалось загрузить данные клиники",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);
  
  const handleEditClinic = (updatedClinic: any) => {
    setClinic(updatedClinic);
    toast({
      title: "Клиника обновлена",
      description: "Информация о клинике успешно обновлена"
    });
  };
  
  const handleExtendSubscription = (data: { duration: number }) => {
    const months = data.duration;
    const currentDate = new Date(clinic.subscription.expiryDate.split('.').reverse().join('-'));
    currentDate.setMonth(currentDate.getMonth() + months);
    
    // Format the new date as DD.MM.YYYY
    const newExpiryDate = `${String(currentDate.getDate()).padStart(2, '0')}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${currentDate.getFullYear()}`;
    
    setClinic({
      ...clinic,
      subscription: {
        ...clinic.subscription,
        expiryDate: newExpiryDate
      }
    });
  };
  
  const handleChangePlan = (data: { plan: string }) => {
    setClinic({
      ...clinic,
      subscription: {
        ...clinic.subscription,
        plan: data.plan
      }
    });
  };
  
  const handleDisableSubscription = () => {
    setClinic({
      ...clinic,
      subscription: {
        ...clinic.subscription,
        status: "inactive"
      }
    });
  };
  
  const handleToggleAutoRenewal = async (value: boolean) => {
    try {
      const result = await toggleAutoRenewal(id || "", value);
      
      setClinic({
        ...clinic,
        subscription: {
          ...clinic.subscription,
          autoRenewal: result
        }
      });
      
      toast({
        title: "Автопродление обновлено",
        description: `Автопродление ${result ? "включено" : "отключено"}`
      });
      
      return result;
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус автопродления",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  // Handle back button click
  const handleBack = () => {
    window.history.back();
  };
  
  if (loading) {
    return (
      <SidebarLayout sidebar={<SuperAdminSidebar />}>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Загрузка данных клиники...</p>
          </div>
        </div>
      </SidebarLayout>
    );
  }
  
  if (!clinic) {
    return (
      <SidebarLayout sidebar={<SuperAdminSidebar />}>
        <div className="p-6">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
          
          <div className="flex justify-center mt-16">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Клиника не найдена</h2>
              <p className="text-muted-foreground">
                Клиника с указанным ID не найдена или была удалена
              </p>
            </div>
          </div>
        </div>
      </SidebarLayout>
    );
  }
  
  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{clinic.name}</h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
            <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
              Редактировать
            </Button>
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
            clinicName={clinic.name}
            clinicId={id}
            isSuperAdmin={true}
            onExtend={handleExtendSubscription}
            onChangePlan={handleChangePlan}
            onDisable={handleDisableSubscription}
            onToggleAutoRenewal={handleToggleAutoRenewal}
          />
        </div>
        
        <Tabs defaultValue="doctors">
          <TabsList className="mb-4">
            <TabsTrigger value="doctors">Врачи</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          </TabsList>
          
          <TabsContent value="doctors">
            <DoctorsTab doctors={doctors} isSuperAdmin={true} />
          </TabsContent>
          
          <TabsContent value="services">
            <ServicesTab services={services} isSuperAdmin={true} />
          </TabsContent>
          
          <TabsContent value="integrations">
            <IntegrationsTab 
              googleCalendar={clinic.integrations.googleCalendar}
              telegramBots={clinic.integrations.telegramBots}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <EditClinicDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        clinic={clinic}
        onSave={handleEditClinic}
      />
    </SidebarLayout>
  );
}

export default SuperAdminClinicProfile;
