
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
}

export interface PaymentHistory {
  id: string;
  date: string;
  amount: string;
  planName: string;
  status: 'success' | 'pending' | 'failed' | 'awaiting';
  invoiceGenerated?: boolean;
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
  appointments: number;
  patients: number;
  doctors: number;
  lastActive: string;
}

export interface IntegrationData {
  month: string;
  googleCalendar: number;
  telegram: number;
}
