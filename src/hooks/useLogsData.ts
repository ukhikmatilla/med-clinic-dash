
import { useState, useEffect } from 'react';

// Types for error logs
interface ErrorLog {
  id: string;
  timestamp: string;
  service: "telegram" | "gcal" | "payme" | "click" | "system";
  clinic: {
    id: string;
    name: string;
  };
  errorType: string;
  message: string;
  status: "new" | "fixed" | "ignored";
  canRetry: boolean;
}

// Types for webhook logs
interface WebhookLog {
  id: string;
  timestamp: string;
  service: "telegram" | "gcal" | "payme" | "click";
  clinic: {
    id: string;
    name: string;
  };
  direction: "incoming" | "outgoing";
  url?: string;
  status: "success" | "error";
  statusCode?: number;
  requestBody?: string;
  responseBody?: string;
}

// Types for system events
interface SystemEvent {
  id: string;
  timestamp: string;
  type: "info" | "warning" | "error" | "success";
  message: string;
  action: "add" | "delete" | "update" | "payment" | "login" | "integration" | "other";
  subject?: string;
  actor?: {
    id: string;
    name: string;
    role: "admin" | "doctor" | "clinic" | "system";
  };
  clinic?: {
    id: string;
    name: string;
  };
}

// Combined logs data
interface LogsData {
  errors: ErrorLog[];
  webhooks: WebhookLog[];
  events: SystemEvent[];
}

// Mock data for logs
const generateMockLogsData = (): LogsData => {
  // Mock error logs
  const errorLogs: ErrorLog[] = [
    {
      id: "err_1",
      timestamp: "2025-04-14T10:15:00",
      service: "telegram",
      clinic: { id: "clinic_1", name: "Najot Shifo" },
      errorType: "connection_error",
      message: "Webhook timeout: No response from Telegram API",
      status: "new",
      canRetry: true
    },
    {
      id: "err_2",
      timestamp: "2025-04-13T15:30:00",
      service: "gcal",
      clinic: { id: "clinic_2", name: "Medlife" },
      errorType: "auth_error",
      message: "Google Calendar authorization failed: Token expired",
      status: "fixed",
      canRetry: false
    },
    {
      id: "err_3",
      timestamp: "2025-04-12T09:45:00",
      service: "payme",
      clinic: { id: "clinic_1", name: "Najot Shifo" },
      errorType: "payment_error",
      message: "Payment processing failed: Invalid merchant ID",
      status: "new",
      canRetry: true
    }
  ];

  // Mock webhook logs
  const webhookLogs: WebhookLog[] = [
    {
      id: "wh_1",
      timestamp: "2025-04-14T10:20:00",
      service: "telegram",
      clinic: { id: "clinic_1", name: "Najot Shifo" },
      direction: "incoming",
      url: "https://api.example.com/webhooks/telegram",
      status: "success",
      statusCode: 200,
      requestBody: JSON.stringify({ update_id: 123456, message: { text: "Hello" } }),
      responseBody: JSON.stringify({ ok: true })
    },
    {
      id: "wh_2",
      timestamp: "2025-04-14T09:15:00",
      service: "gcal",
      clinic: { id: "clinic_2", name: "Medlife" },
      direction: "outgoing",
      url: "https://www.googleapis.com/calendar/v3/events",
      status: "error",
      statusCode: 401,
      requestBody: JSON.stringify({ summary: "Doctor Appointment", start: { dateTime: "2025-04-15T10:00:00" } }),
      responseBody: JSON.stringify({ error: { code: 401, message: "Invalid Credentials" } })
    },
    {
      id: "wh_3",
      timestamp: "2025-04-13T14:30:00",
      service: "payme",
      clinic: { id: "clinic_1", name: "Najot Shifo" },
      direction: "incoming",
      url: "https://api.example.com/webhooks/payme",
      status: "success",
      statusCode: 200,
      requestBody: JSON.stringify({ transaction_id: "tx_123", amount: 100000 }),
      responseBody: JSON.stringify({ status: "accepted" })
    }
  ];

  // Mock system events
  const systemEvents: SystemEvent[] = [
    {
      id: "ev_1",
      timestamp: "2025-04-14T11:00:00",
      type: "success",
      message: "Клиника обновила подписку",
      action: "update",
      subject: "subscription",
      actor: { id: "admin_1", name: "Admin User", role: "admin" },
      clinic: { id: "clinic_1", name: "Najot Shifo" }
    },
    {
      id: "ev_2",
      timestamp: "2025-04-14T10:30:00",
      type: "error",
      message: "Ошибка авторизации в Payme",
      action: "integration",
      subject: "payme",
      clinic: { id: "clinic_1", name: "Najot Shifo" }
    },
    {
      id: "ev_3",
      timestamp: "2025-04-14T09:45:00",
      type: "info",
      message: "Врач добавлен в систему",
      action: "add",
      subject: "doctor",
      actor: { id: "clinic_admin_1", name: "Clinic Admin", role: "admin" },
      clinic: { id: "clinic_2", name: "Medlife" }
    },
    {
      id: "ev_4",
      timestamp: "2025-04-13T16:20:00",
      type: "warning",
      message: "Срок подписки истекает через 5 дней",
      action: "other",
      subject: "subscription",
      clinic: { id: "clinic_2", name: "Medlife" }
    }
  ];

  return {
    errors: errorLogs,
    webhooks: webhookLogs,
    events: systemEvents
  };
};

export const useLogsData = () => {
  const [logs, setLogs] = useState<LogsData>({ errors: [], webhooks: [], events: [] });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For mock data, we'll just add a delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // This would be replaced with actual API data
        setLogs(generateMockLogsData());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLogs();
  }, []);

  const refreshLogs = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would refresh logs from the API
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Refresh with new mock data
      setLogs(generateMockLogsData());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to refresh logs'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logs,
    isLoading,
    error,
    refreshLogs
  };
};
