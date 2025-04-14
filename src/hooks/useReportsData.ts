
import { useState, useEffect } from 'react';
import { 
  ReportData, 
  ReportType, 
  SubscriptionTrend,
  RevenueData,
  ClinicActivity,
  IntegrationData,
  ReportFilters,
  FinancialReportData,
  SubscriptionReportData,
  ActivityReportData,
  PaymentHistory,
  DateRange  // Add this import from the types file
} from '@/types/subscription';

// Mock data for reports - this would be replaced with actual API calls
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
      clinicId: "clinic_najot",
      appointments: 156,
      patients: 98,
      doctors: 10,
      lastActive: "2025-04-14T10:23:00",
      integrations: ["Google Calendar", "Telegram"]
    },
    {
      clinicName: "Medlife",
      clinicId: "clinic_medlife",
      appointments: 120,
      patients: 65,
      doctors: 8,
      lastActive: "2025-04-13T15:45:00",
      integrations: ["Telegram"]
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

const generateMockPaymentHistory = (): PaymentHistory[] => {
  return [
    { 
      id: "pay_1", 
      date: "2025-04-01", 
      amount: "250,000 сум", 
      planName: "CRM + Telegram", 
      status: "success",
      clinicId: "clinic_najot",
      clinicName: "Najot Shifo",
      source: "payme"
    },
    { 
      id: "pay_2", 
      date: "2025-03-01", 
      amount: "250,000 сум", 
      planName: "CRM + Telegram", 
      status: "success",
      clinicId: "clinic_najot",
      clinicName: "Najot Shifo",
      source: "bot"
    },
    { 
      id: "pay_3", 
      date: "2025-02-01", 
      amount: "250,000 сум", 
      planName: "CRM + Telegram", 
      status: "success",
      clinicId: "clinic_najot",
      clinicName: "Najot Shifo",
      source: "payme"
    },
    { 
      id: "pay_4", 
      date: "2025-03-15", 
      amount: "150,000 сум", 
      planName: "CRM", 
      status: "success",
      clinicId: "clinic_medlife",
      clinicName: "Medlife",
      source: "manual"
    }
  ];
};

// Generate the financial report data
const generateFinancialReport = (): FinancialReportData => {
  const revenueData = generateMockRevenueData();
  const paymentData = generateMockPaymentHistory();
  
  // Calculate tariff distribution
  const tariffDistribution = [
    { name: 'CRM', value: 350000 },
    { name: 'CRM + Telegram', value: 750000 }
  ];
  
  // Calculate payment sources
  const paymentSources = [
    { source: 'Бот', percentage: 45 },
    { source: 'Админка', percentage: 40 },
    { source: 'Вручную', percentage: 15 }
  ];
  
  return {
    revenueData,
    paymentData,
    tariffDistribution,
    paymentSources
  };
};

// Generate the subscriptions report data
const generateSubscriptionsReport = (): SubscriptionReportData => {
  const activeSubscriptions = 42;
  const autoRenewal = 28;
  
  return {
    subscriptionData: [
      { clinic: 'Najot Shifo', clinicId: 'clinic_najot', expiry: '15.05.2025', autoRenewal: true, status: 'Активна', tariff: 'CRM + Telegram' },
      { clinic: 'Medlife', clinicId: 'clinic_medlife', expiry: '05.05.2025', autoRenewal: false, status: 'Активна', tariff: 'CRM' },
    ],
    stats: {
      activeSubscriptions,
      autoRenewal,
      activePercentage: Math.round((autoRenewal / activeSubscriptions) * 100),
      expiringCount: 2
    },
    expiringSubscriptions: [
      { clinicName: 'Najot Shifo', clinicId: 'clinic_najot', expiryDate: '2025-05-15', daysLeft: 30 },
      { clinicName: 'Medlife', clinicId: 'clinic_medlife', expiryDate: '2025-05-05', daysLeft: 20 }
    ],
    trends: generateMockSubscriptionTrends()
  };
};

// Generate the activity report data
const generateActivityReport = (): ActivityReportData => {
  return {
    clinicActivityData: generateMockClinicActivity(),
    stats: {
      newClinics: 3,
      newDoctors: 12,
      newPatients: 87,
      totalAppointments: 156
    },
    integrationLogs: [
      {
        id: "log_1",
        clinicId: "clinic_najot",
        integrationType: "google_calendar",
        event: "sync",
        status: "success",
        message: "Successfully synced appointments",
        timestamp: "2025-04-14T10:23:00"
      },
      {
        id: "log_2",
        clinicId: "clinic_najot",
        integrationType: "telegram",
        event: "notification",
        status: "success",
        message: "Notification sent to patient",
        timestamp: "2025-04-14T11:15:00"
      }
    ]
  };
};

const mockReports: ReportData[] = [
  {
    id: "report_1",
    title: "Финансовый отчёт",
    description: "Доход по месяцам и типам тарифов",
    generatedAt: "2025-04-14T08:30:00",
    type: "financial",
    data: generateFinancialReport()
  },
  {
    id: "report_2",
    title: "Подписки и продления",
    description: "Статистика активных подписок и автопродлений",
    generatedAt: "2025-04-14T09:15:00",
    type: "subscriptions",
    data: generateSubscriptionsReport()
  },
  {
    id: "report_3",
    title: "Активность платформы",
    description: "Новые клиники и общая активность на платформе",
    generatedAt: "2025-04-14T10:00:00",
    type: "activity",
    data: generateActivityReport()
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

export const useReportsData = (period: 'week' | 'month' | 'quarter' | 'year' = 'month', customDateRange?: DateRange) => {
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
        // For example:
        // const response = await fetch(`/api/reports?period=${period}`);
        // const data = await response.json();
        
        // For mock data, we'll just add a delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // This would be replaced with actual API data
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
  }, [period, customDateRange]);
  
  const refreshReport = async (reportId: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would refresh a specific report from the API
      // const response = await fetch(`/api/reports/${reportId}/refresh`, { method: 'POST' });
      // const data = await response.json();
      
      // For mock data, we'll just add a delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Find and refresh the specific report
      const updatedReports = reports.map(report => {
        if (report.id === reportId) {
          let updatedData;
          
          // Regenerate the appropriate report data based on type
          switch (report.type) {
            case 'financial':
              updatedData = generateFinancialReport();
              break;
            case 'subscriptions':
              updatedData = generateSubscriptionsReport();
              break;
            case 'activity':
              updatedData = generateActivityReport();
              break;
            default:
              updatedData = report.data;
          }
          
          return {
            ...report,
            generatedAt: new Date().toISOString(),
            data: updatedData
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

  // Function to get a specific report by type
  const getReportByType = (type: ReportType): ReportData | undefined => {
    return reports.find(report => report.type === type);
  };
  
  return {
    reports,
    isLoading,
    error,
    refreshReport,
    getReportByType,
    analytics: {
      subscriptionTrends,
      revenueData,
      integrationData
    }
  };
};
