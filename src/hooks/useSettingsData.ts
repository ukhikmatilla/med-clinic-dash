
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Platform settings types
interface PlatformSettings {
  platformName: string;
  licenseStatus: "active" | "expired" | "trial";
  licenseExpiry?: string;
  defaultTimezone: string;
  webhookBaseUrl: string;
}

// Payment provider settings types
interface PaymentProviderSettings {
  name: string;
  enabled: boolean;
  merchantId: string;
  apiKey: string;
  additionalFields?: Record<string, string>;
}

interface PaymentsSettings {
  providers: PaymentProviderSettings[];
}

// Notification settings types
interface NotificationSetting {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
}

interface NotificationSettings {
  emailEnabled: boolean;
  defaultRecipient: string;
  notifications: NotificationSetting[];
}

// Combined settings data
interface SettingsData {
  platform: PlatformSettings;
  payments: PaymentsSettings;
  notifications: NotificationSettings;
}

// Mock data generator for settings
const generateMockSettingsData = (): SettingsData => {
  // Platform settings
  const platformSettings: PlatformSettings = {
    platformName: "Медицинская CRM",
    licenseStatus: "active",
    licenseExpiry: "2026-04-15",
    defaultTimezone: "Asia/Tashkent",
    webhookBaseUrl: "https://api.medcrm.uz/webhooks"
  };

  // Payments settings
  const paymentsSettings: PaymentsSettings = {
    providers: [
      {
        name: "Payme",
        enabled: true,
        merchantId: "merchant_12345",
        apiKey: "payme_api_key_secret",
        additionalFields: {
          "Callback Secret": "payme_callback_secret"
        }
      },
      {
        name: "Click",
        enabled: true,
        merchantId: "click_merchant_id",
        apiKey: "click_api_key_secret",
        additionalFields: {
          "Service ID": "click_service_id",
          "Secret Key": "click_secret_key"
        }
      }
    ]
  };

  // Notification settings
  const notificationSettings: NotificationSettings = {
    emailEnabled: true,
    defaultRecipient: "admin@medcrm.uz",
    notifications: [
      {
        id: "notif_subscription_ending",
        name: "Подписка заканчивается",
        enabled: true,
        description: "Уведомления о заканчивающихся подписках (за 5 дней)"
      },
      {
        id: "notif_payment_failed",
        name: "Платеж не прошел",
        enabled: true,
        description: "Уведомления о неудачных платежах"
      },
      {
        id: "notif_integration_error",
        name: "Ошибка интеграции",
        enabled: true,
        description: "Уведомления о проблемах с интеграцией сервисов"
      },
      {
        id: "notif_new_clinic",
        name: "Новая клиника",
        enabled: false,
        description: "Уведомления о регистрации новых клиник"
      }
    ]
  };

  return {
    platform: platformSettings,
    payments: paymentsSettings,
    notifications: notificationSettings
  };
};

export const useSettingsData = () => {
  const [settings, setSettings] = useState<SettingsData>({
    platform: {} as PlatformSettings,
    payments: { providers: [] },
    notifications: { emailEnabled: false, defaultRecipient: '', notifications: [] }
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For mock data, we'll just add a delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // This would be replaced with actual API data
        setSettings(generateMockSettingsData());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Ошибка загрузки настроек'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const updateSettings = async (
    section: 'platform' | 'payments' | 'notifications', 
    data: Partial<PlatformSettings | PaymentsSettings | NotificationSettings>
  ) => {
    try {
      // In a real app, this would be an API call
      // For mock data, we'll just add a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the settings in state
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          ...data
        }
      }));
      
      return true;
    } catch (err) {
      const errorMessage = 'Ошибка обновления настроек';
      toast.error(errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));
      return false;
    }
  };

  return {
    settings,
    isLoading,
    error,
    updateSettings
  };
};
