
export interface Subscription {
  id: string;
  clinicId: string;
  clinicName: string;
  planName: string;
  expiryDate: string;
  autoRenewal: boolean;
  doctorsUsed: number;
  doctorsLimit: number;
  trialActive: boolean;
  status: 'active' | 'inactive' | 'pending' | 'expired';
}

export interface PaymentHistory {
  id: string;
  date: string;
  amount: string;
  planName: string;
  status: 'success' | 'failed' | 'pending' | 'awaiting';
  clinicId: string;
  clinicName: string;
  source: 'payme' | 'bot' | 'manual';
  invoiceGenerated?: boolean;
}

export interface SubscriptionExtensionRequest {
  id: string;
  clinicId: string;
  clinicName: string;
  requestedMonths: number;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  adminComment?: string;
}

export interface InvoiceFormData {
  tariff: string;
  price: number;
  period: {
    from: Date;
    to: Date;
  };
  sendToTelegram: boolean;
}

export interface DateRange {
  from: Date;
  to: Date;
}

// Report-related types
export type ReportType = 'financial' | 'subscriptions' | 'activity' | 'errors';

export interface ReportData {
  id: string;
  title: string;
  description: string;
  generatedAt: string;
  type: ReportType;
  data: FinancialReportData | SubscriptionReportData | ActivityReportData | any;
}

export interface ReportFilters {
  dateRange?: DateRange;
  period?: 'week' | 'month' | 'quarter' | 'year';
  clinicId?: string;
}

export interface SubscriptionTrend {
  month: string;
  activeSubscriptions: number;
  newSubscriptions: number;
  cancelledSubscriptions: number;
}

export interface RevenueData {
  month: string;
  crmRevenue: number;
  crmTelegramRevenue: number;
  total: number;
}

export interface IntegrationData {
  month: string;
  googleCalendar: number;
  telegram: number;
}

export interface ClinicActivity {
  clinicName: string;
  clinicId: string;
  appointments: number;
  patients: number;
  doctors: number;
  lastActive: string;
  integrations: string[];
}

export interface FinancialReportData {
  revenueData: RevenueData[];
  paymentData: PaymentHistory[];
  tariffDistribution: { name: string; value: number }[];
  paymentSources: { source: string; percentage: number }[];
}

export interface SubscriptionReportData {
  subscriptionData: {
    clinic: string;
    clinicId: string;
    expiry: string;
    autoRenewal: boolean;
    status: string;
    tariff: string;
  }[];
  stats: {
    activeSubscriptions: number;
    autoRenewal: number;
    activePercentage: number;
    expiringCount: number;
  };
  expiringSubscriptions: {
    clinicName: string;
    clinicId: string;
    expiryDate: string;
    daysLeft: number;
  }[];
  trends: SubscriptionTrend[];
}

export interface ActivityReportData {
  clinicActivityData: ClinicActivity[];
  stats: {
    newClinics: number;
    newDoctors: number;
    newPatients: number;
    totalAppointments: number;
  };
  integrationLogs: {
    id: string;
    clinicId: string;
    integrationType: string;
    event: string;
    status: string;
    message: string;
    timestamp: string;
  }[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}
