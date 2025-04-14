
import { useEffect } from "react";
import { useDashboardRefresh } from "./useDashboardRefresh";
import { 
  dashboardStats, 
  mockClinics, 
  mockIntegrationErrors, 
  mockActivityFeed, 
  mockExpiringSubscriptions, 
  mockLicenseInfo 
} from "@/data/dashboard/dashboardMockData";

export function useDashboardData() {
  const { lastUpdated, isRefreshing, handleRefresh } = useDashboardRefresh();
  
  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    // Refresh data
    lastUpdated,
    isRefreshing,
    handleRefresh,
    
    // Dashboard data
    stats: dashboardStats,
    allClinics: mockClinics,
    integrationErrors: mockIntegrationErrors,
    activityFeed: mockActivityFeed,
    expiringSubscriptions: mockExpiringSubscriptions,
    licenseInfo: mockLicenseInfo
  };
}
