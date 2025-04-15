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
