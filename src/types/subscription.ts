
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
  status: 'active' | 'expired';
}

export interface PaymentHistory {
  id: string;
  date: string;
  amount: string;
  planName: string;
  status: 'success' | 'pending' | 'failed' | 'awaiting';
  invoiceGenerated?: boolean;
  clinicId: string;
  clinicName: string;
  source: 'payme' | 'click' | 'manual' | 'bot';
}

export type SubscriptionPlan = 'CRM' | 'CRM + Telegram';

export interface DateRange {
  from: Date;
  to: Date;
}

export interface InvoiceFormData {
  period: DateRange;
  tariff: SubscriptionPlan;
  price: number;
  expiryDate: Date;
  sendToTelegram: boolean;
}

export interface Invoice {
  id: string;
  clinicId: string;
  tariff: SubscriptionPlan;
  price: number;
  periodStart: Date;
  periodEnd: Date;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: Date;
  createdBy: string;
  telegramSent: boolean;
  emailSent?: boolean;
}

// Report types
export interface ReportData {
  id: string;
  title: string;
  description: string;
  generatedAt: string;
  type: ReportType;
  data: any;
}

export type ReportType = 'financial' | 'subscriptions' | 'activity' | 'errors';

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

export interface ClinicActivity {
  clinicName: string;
  clinicId: string;
  appointments: number;
  patients: number;
  doctors: number;
  lastActive: string;
  integrations: string[];
}

export interface IntegrationData {
  month: string;
  googleCalendar: number;
  telegram: number;
}

export interface IntegrationLog {
  id: string;
  clinicId: string;
  integrationType: 'google_calendar' | 'telegram';
  event: string;
  status: 'success' | 'error';
  message: string;
  timestamp: string;
}

export interface ReportFilters {
  period: 'week' | 'month' | 'quarter' | 'year';
  customDateRange?: DateRange;
}

export interface FinancialReportData {
  revenueData: RevenueData[];
  paymentData: PaymentHistory[];
  tariffDistribution: {
    name: string;
    value: number;
  }[];
  paymentSources: {
    source: string;
    percentage: number;
  }[];
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
  integrationLogs: IntegrationLog[];
}
