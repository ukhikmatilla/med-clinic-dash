
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Save } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

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

interface NotificationSettingsProps {
  settings: NotificationSettings;
  onUpdate: (settings: Partial<NotificationSettings>) => void;
}

export function NotificationSettings({ settings, onUpdate }: NotificationSettingsProps) {
  const [emailEnabled, setEmailEnabled] = useState(settings.emailEnabled);
  const [defaultRecipient, setDefaultRecipient] = useState(settings.defaultRecipient);
  const [notifications, setNotifications] = useState(settings.notifications);
  const [saving, setSaving] = useState(false);

  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id 
          ? { ...notif, enabled: !notif.enabled } 
          : notif
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real app this would call an API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onUpdate({
        emailEnabled,
        defaultRecipient,
        notifications
      });
      
      toast.success("Настройки уведомлений сохранены");
    } catch (error) {
      toast.error("Ошибка при сохранении настроек");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Уведомления
        </CardTitle>
        <CardDescription>
          Настройка email и системных уведомлений
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
            <span>Email уведомления</span>
            <span className="font-normal text-xs text-muted-foreground">
              Включить отправку уведомлений на email
            </span>
          </Label>
          <Switch
            id="email-notifications"
            checked={emailEnabled}
            onCheckedChange={setEmailEnabled}
          />
        </div>
        
        {emailEnabled && (
          <div className="space-y-2">
            <Label htmlFor="default-recipient">Email получателя по умолчанию</Label>
            <Input
              id="default-recipient"
              type="email"
              value={defaultRecipient}
              onChange={e => setDefaultRecipient(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
        )}
        
        <div className="space-y-4">
          <Label>Параметры уведомлений</Label>
          <div className="space-y-2">
            {notifications.map(notification => (
              <div key={notification.id} className="flex items-start space-x-2 py-2">
                <Checkbox
                  id={notification.id}
                  checked={notification.enabled}
                  onCheckedChange={() => toggleNotification(notification.id)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor={notification.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {notification.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full mt-2"
        >
          {saving ? (
            <>Сохранение...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Сохранить настройки
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
