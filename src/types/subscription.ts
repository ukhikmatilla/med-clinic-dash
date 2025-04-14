
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
  status: 'success' | 'pending' | 'failed';
}

export type SubscriptionPlan = 'CRM' | 'CRM + Telegram';
