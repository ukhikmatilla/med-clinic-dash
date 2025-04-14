
import { useState, useEffect } from 'react';
import { 
  ReportData, 
  ReportType, 
  SubscriptionTrend,
  RevenueData,
  ClinicActivity,
  IntegrationData
} from '@/types/subscription';

// Mock data for reports
const generateMockRevenueData = (): RevenueData[] => {
  const months = ["Январь", "Февраль", "Март", "Апрель"];
  return months.map(month => ({
    month,
    crmRevenue: Math.floor(Math.random() * 1000000) + 500000,
    crmTelegramRevenue: Math.floor(Math.random() * 1500000) + 800000,
    total: 0, // Will be calculated
  })).map(item => ({
    ...item,
    total: item.crmRevenue + item.crmTelegramRevenue
  }));
};

const generateMockSubscriptionTrends = (): SubscriptionTrend[] => {
  const months = ["Январь", "Февраль", "Март", "Апрель"];
  return months.map(month => ({
    month,
    activeSubscriptions: Math.floor(Math.random() * 20) + 30,
    newSubscriptions: Math.floor(Math.random() * 10) + 5,
    cancelledSubscriptions: Math.floor(Math.random() * 5),
  }));
};

const generateMockClinicActivity = (): ClinicActivity[] => {
  return [
    {
      clinicName: "Najot Shifo",
      appointments: 156,
      patients: 98,
      doctors: 10,
      lastActive: "2025-04-14T10:23:00"
    }
  ];
};

const generateMockIntegrationData = (): IntegrationData[] => {
  const months = ["Январь", "Февраль", "Март", "Апрель"];
  return months.map(month => ({
    month,
    googleCalendar: Math.floor(Math.random() * 10) + 5,
    telegram: Math.floor(Math.random() * 15) + 10,
  }));
};

const mockReports: ReportData[] = [
  {
    id: "report_1",
    title: "Финансовый отчёт",
    description: "Доход по месяцам и типам тарифов",
    generatedAt: "2025-04-14T08:30:00",
    type: "financial",
    data: {
      revenue: generateMockRevenueData(),
      paymentSources: [
        { source: "Бот", percentage: 45 },
        { source: "Админка", percentage: 40 },
        { source: "Вручную", percentage: 15 }
      ]
    }
  },
  {
    id: "report_2",
    title: "Подписки и продления",
    description: "Статистика активных подписок и автопродлений",
    generatedAt: "2025-04-14T09:15:00",
    type: "subscriptions",
    data: {
      activeSubscriptions: 42,
      autoRenewal: 28,
      expiringSubscriptions: [
        { clinicName: "Najot Shifo", expiryDate: "2025-05-15", daysLeft: 30 }
      ],
      trends: generateMockSubscriptionTrends()
    }
  },
  {
    id: "report_3",
    title: "Активность платформы",
    description: "Новые клиники и общая активность на платформе",
    generatedAt: "2025-04-14T10:00:00",
    type: "activity",
    data: {
      newClinics: 3,
      newDoctors: 12,
      newPatients: 87,
      totalAppointments: 156,
      clinics: generateMockClinicActivity()
    }
  },
  {
    id: "report_4",
    title: "Ошибки интеграций",
    description: "Отчёт по ошибкам интеграций за последний месяц",
    generatedAt: "2025-04-14T11:30:00",
    type: "errors",
    data: {
      totalErrors: 4,
      byType: [
        { type: "Google Calendar", count: 1 },
        { type: "Telegram", count: 3 }
      ],
      affectedClinics: ["Najot Shifo"]
    }
  }
];

export const useReportsData = (period: 'week' | 'month' | 'quarter' | 'year' = 'month') => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Analytics data
  const [subscriptionTrends, setSubscriptionTrends] = useState<SubscriptionTrend[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [integrationData, setIntegrationData] = useState<IntegrationData[]>([]);
  
  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call with the period as a parameter
        // For mock data, we'll just add a delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setReports(mockReports);
        setSubscriptionTrends(generateMockSubscriptionTrends());
        setRevenueData(generateMockRevenueData());
        setIntegrationData(generateMockIntegrationData());
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReports();
  }, [period]);
  
  const refreshReport = async (reportId: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would refresh a specific report
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Find and refresh the specific report
      const updatedReports = reports.map(report => {
        if (report.id === reportId) {
          return {
            ...report,
            generatedAt: new Date().toISOString()
          };
        }
        return report;
      });
      
      setReports(updatedReports);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to refresh report'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    reports,
    isLoading,
    error,
    refreshReport,
    analytics: {
      subscriptionTrends,
      revenueData,
      integrationData
    }
  };
};
