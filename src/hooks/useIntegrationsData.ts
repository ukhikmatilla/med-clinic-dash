
import { useState, useEffect } from 'react';

export interface IntegrationsData {
  clinic_id: string;
  google_calendar: {
    status: "connected" | "error" | "disconnected";
    email: string;
    last_sync: string;
  };
  telegram_patient: {
    username: string;
    status: "ok" | "error";
  };
  telegram_doctor: {
    username: string;
    status: "ok" | "error";
  };
}

interface IntegrationError {
  id: number;
  clinic: string;
  type: string;
  error: string;
  date: string;
}

export function useIntegrationsData() {
  const [data, setData] = useState<IntegrationsData | null>(null);
  const [errors, setErrors] = useState<IntegrationError[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setData({
          clinic_id: "najot-shifo",
          google_calendar: {
            status: "connected",
            email: "cliniccalendar@project.iam.gserviceaccount.com",
            last_sync: "2025-04-14T17:03:00"
          },
          telegram_patient: {
            username: "@najot_med_bot",
            status: "ok"
          },
          telegram_doctor: {
            username: "@najot_doctor_bot",
            status: "error"
          }
        });
        
        setErrors([
          {
            id: 1,
            clinic: "Najot Shifo",
            type: "Telegram Bot (врачи)",
            error: "Webhook URL недоступен",
            date: "2025-04-14T12:30:00"
          }
        ]);
      } catch (error) {
        console.error("Failed to fetch integrations data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, errors, isLoading };
}
