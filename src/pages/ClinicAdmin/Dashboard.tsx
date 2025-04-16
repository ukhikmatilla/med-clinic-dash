
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { ClinicAdminSidebar } from "@/components/sidebars/ClinicAdminSidebar";
import { useClinicDashboardData } from "@/hooks/useClinicDashboardData";
import { useSubscriptionActions } from "@/hooks/useSubscriptionActions";
import { AddAppointmentModal } from "@/components/dashboard/AddAppointmentModal";
import { AppointmentDetailsModal } from "@/components/dashboard/AppointmentDetailsModal";
import { useToast } from "@/hooks/use-toast";
import { StatCards } from "@/components/dashboard/StatCards";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { SubscriptionInfoCard } from "@/components/dashboard/SubscriptionInfoCard";

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
    pendingPlanChange,
    isLoading: isLoadingSubscription,
    extendSubscription,
    changePlan,
    toggleAutoRenewal 
  } = useSubscriptionActions();
  
  // Modal states
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false);
  const [isAppointmentDetailsModalOpen, setIsAppointmentDetailsModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);
  
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
        <DashboardHeader 
          clinicName="Najot Shifo"
          lastUpdated={lastUpdated}
          onAddAppointment={() => setIsAddAppointmentModalOpen(true)}
          onRefresh={refresh}
          isLoading={isLoading}
        />
        
        {/* Stats Cards */}
        <StatCards 
          doctors={stats.doctors} 
          patients={stats.patients} 
          appointments={stats.appointments} 
          services={stats.services} 
        />
        
        {/* Upcoming Appointments and Subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <UpcomingAppointments 
            appointments={upcomingAppointments}
            onViewDetails={handleViewAppointmentDetails}
          />
          
          <SubscriptionInfoCard 
            subscriptionInfo={subscriptionInfo}
            pendingPlanChange={pendingPlanChange}
            isLoading={isLoadingSubscription}
            extendSubscription={extendSubscription}
            changePlan={changePlan}
            handleDisableAutoRenewal={handleDisableAutoRenewal}
          />
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
    </SidebarLayout>
  );
}

export default ClinicAdminDashboard;
