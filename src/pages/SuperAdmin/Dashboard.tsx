
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { LicenseAndActivitySection } from "@/components/dashboard/LicenseAndActivitySection";
import { SubscriptionAlert } from "@/components/dashboard/SubscriptionAlert";
import { SubscriptionRequestsAlert } from "@/components/dashboard/SubscriptionRequestsAlert";
import { ClinicsSection } from "@/components/dashboard/ClinicsSection";
import { ErrorsSection } from "@/components/dashboard/ErrorsSection";
import { useDashboardData } from "@/hooks/dashboard/useDashboardData";
import { useSubscriptionData } from "@/hooks/useSubscriptionData";

export function SuperAdminDashboard() {
  const {
    lastUpdated,
    isRefreshing,
    handleRefresh,
    stats,
    allClinics,
    integrationErrors,
    activityFeed,
    expiringSubscriptions,
    licenseInfo
  } = useDashboardData();
  
  const { extensionRequests } = useSubscriptionData();
  
  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="p-2 sm:p-6">
        {/* Header with refresh */}
        <DashboardHeader 
          clinicName="Super Admin Dashboard"
          lastUpdated={lastUpdated}
          onRefresh={handleRefresh}
          isLoading={isRefreshing}
        />
        
        {/* Stats Cards */}
        <StatsSection stats={stats} />
        
        {/* License Usage Card and Activity Feed */}
        <LicenseAndActivitySection 
          licenseInfo={licenseInfo} 
          activities={activityFeed} 
        />
        
        {/* Pending Subscription Requests Alert */}
        <SubscriptionRequestsAlert requests={extensionRequests} />
        
        {/* Expiring Subscriptions Alert */}
        <SubscriptionAlert subscriptions={expiringSubscriptions} />
        
        {/* Recent Clinics Section with Search */}
        <ClinicsSection clinics={allClinics} />
        
        {/* Integration Errors */}
        <ErrorsSection errors={integrationErrors} />
      </div>
    </SidebarLayout>
  );
}

export default SuperAdminDashboard;
