
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { ClinicAdminSidebar } from "@/components/sidebars/ClinicAdminSidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CalendarClock, Users, UserRound, Stethoscope, Bell, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClinicDashboardData } from "@/hooks/useClinicDashboardData";
import { useSubscriptionActions } from "@/hooks/useSubscriptionActions";
import { AddAppointmentModal } from "@/components/dashboard/AddAppointmentModal";
import { AppointmentDetailsModal } from "@/components/dashboard/AppointmentDetailsModal";
import { ExtendSubscriptionModal } from "@/components/subscription/ExtendSubscriptionModal";
import { ChangePlanModal } from "@/components/subscription/ChangePlanModal";
import { useToast } from "@/hooks/use-toast";

export function ClinicAdminDashboard() {
  const { toast } = useToast();
  const { 
    stats, 
    upcomingAppointments, 
    isLoading, 
    lastUpdated, 
    refresh 
  } = useClinicDashboardData();
  
  const { 
    subscriptionInfo, 
    isLoading: isLoadingSubscription,
    extendSubscription,
    changePlan,
    toggleAutoRenewal 
  } = useSubscriptionActions();
  
  // Modal states
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false);
  const [isAppointmentDetailsModalOpen, setIsAppointmentDetailsModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [isChangePlanModalOpen, setIsChangePlanModalOpen] = useState(false);
  
  const handleViewAppointmentDetails = (appointmentId: number) => {
    setSelectedAppointmentId(appointmentId);
    setIsAppointmentDetailsModalOpen(true);
  };
  
  const handleDisableAutoRenewal = async () => {
    try {
      const success = await toggleAutoRenewal();
      if (success) {
        toast({
          title: "Автопродление отключено",
          description: "Автопродление подписки успешно отключено"
        });
      }
    } catch (error) {
      console.error("Error disabling auto renewal:", error);
    }
  };
  
  return (
    <SidebarLayout sidebar={<ClinicAdminSidebar clinicName="Najot Shifo" />}>
      <div className="p-2 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Najot Shifo</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Центр высококачественной медицины | 
              <span className="ml-1">Последнее обновление: {lastUpdated}</span>
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex items-center text-xs sm:text-sm" onClick={() => setIsAddAppointmentModalOpen(true)}>
              <PlusCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="whitespace-nowrap">Добавить приём</span>
            </Button>
            <Button 
              variant="outline" 
              className="relative"
              onClick={refresh}
              disabled={isLoading}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                2
              </span>
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Врачей</CardTitle>
              <UserRound className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.doctors}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Пациентов</CardTitle>
              <Users className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.patients}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Приёмов сегодня</CardTitle>
              <CalendarClock className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.appointments}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Услуг</CardTitle>
              <Stethoscope className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.services}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Appointments and Subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Upcoming Appointments - Desktop View */}
          <Card className="bg-white lg:col-span-2 hidden sm:block">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Ближайшие приёмы</CardTitle>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-primary font-normal"
                  onClick={() => window.location.href = "/clinic-admin/schedule"}
                >
                  Смотреть все
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-sm">Время</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Пациент</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Врач</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Услуга</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingAppointments.map(appointment => (
                      <tr key={appointment.id} className="border-b">
                        <td className="py-3 px-4 text-sm font-medium">{appointment.time}</td>
                        <td className="py-3 px-4 text-sm">{appointment.patient}</td>
                        <td className="py-3 px-4 text-sm">{appointment.doctor}</td>
                        <td className="py-3 px-4 text-sm">{appointment.service}</td>
                        <td className="py-3 px-4 text-sm text-right">
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="h-auto p-0 text-primary"
                            onClick={() => handleViewAppointmentDetails(appointment.id)}
                          >
                            Детали
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Appointments - Mobile View */}
          <Card className="bg-white lg:col-span-2 sm:hidden">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Ближайшие приёмы</CardTitle>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-primary font-normal text-xs p-0 h-auto"
                  onClick={() => window.location.href = "/clinic-admin/schedule"}
                >
                  Смотреть все
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-3">
                {upcomingAppointments.map(appointment => (
                  <Card key={appointment.id} className="p-3 border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">{appointment.time}</span>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="h-auto p-0 text-primary text-xs"
                        onClick={() => handleViewAppointmentDetails(appointment.id)}
                      >
                        Детали
                      </Button>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Пациент:</span>
                        <span>{appointment.patient}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Врач:</span>
                        <span>{appointment.doctor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Услуга:</span>
                        <span>{appointment.service}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Subscription Status */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Статус подписки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-medical-light-blue p-3 sm:p-4 rounded-md">
                <h3 className="font-medium text-sm sm:text-base">✅ {subscriptionInfo.isActive ? "Активна" : "Неактивна"}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">до {subscriptionInfo.expiryDate}</p>
              </div>
              
              <div>
                <h3 className="text-xs sm:text-sm font-medium mb-1">Тариф</h3>
                <p className="text-xs sm:text-sm">{subscriptionInfo.planName}</p>
              </div>
              
              <div>
                <h3 className="text-xs sm:text-sm font-medium mb-1">Автопродление</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {subscriptionInfo.autoRenewal ? "Включено" : "Отключено"}
                </p>
              </div>
              
              <div className="pt-2 flex flex-col gap-2">
                <Button 
                  className="text-xs sm:text-sm"
                  onClick={() => setIsExtendModalOpen(true)}
                  disabled={isLoadingSubscription}
                >
                  📥 Продлить подписку
                </Button>
                <Button 
                  variant="outline" 
                  className="text-xs sm:text-sm"
                  onClick={() => setIsChangePlanModalOpen(true)}
                  disabled={isLoadingSubscription}
                >
                  🧩 Изменить тариф
                </Button>
                {subscriptionInfo.autoRenewal && (
                  <Button 
                    variant="outline" 
                    className="text-muted-foreground text-xs sm:text-sm"
                    onClick={handleDisableAutoRenewal}
                    disabled={isLoadingSubscription}
                  >
                    🛑 Отключить автопродление
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Modals */}
      <AddAppointmentModal
        open={isAddAppointmentModalOpen}
        onOpenChange={setIsAddAppointmentModalOpen}
        onSuccess={refresh}
      />
      
      <AppointmentDetailsModal
        open={isAppointmentDetailsModalOpen}
        onOpenChange={setIsAppointmentDetailsModalOpen}
        appointmentId={selectedAppointmentId}
      />
      
      <ExtendSubscriptionModal
        open={isExtendModalOpen}
        onOpenChange={setIsExtendModalOpen}
        onExtend={extendSubscription}
      />
      
      <ChangePlanModal
        open={isChangePlanModalOpen}
        onOpenChange={setIsChangePlanModalOpen}
        currentPlan={subscriptionInfo.planName}
        onChangePlan={changePlan}
      />
    </SidebarLayout>
  );
}

export default ClinicAdminDashboard;
