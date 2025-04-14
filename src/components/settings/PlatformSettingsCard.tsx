
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
import { Globe, Save } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlatformSettings {
  platformName: string;
  licenseStatus: "active" | "expired" | "trial";
  licenseExpiry?: string;
  defaultTimezone: string;
  webhookBaseUrl: string;
}

interface PlatformSettingsCardProps {
  settings: PlatformSettings;
  onUpdate: (settings: Partial<PlatformSettings>) => void;
}

export function PlatformSettingsCard({ settings, onUpdate }: PlatformSettingsCardProps) {
  const [platformName, setPlatformName] = useState(settings.platformName);
  const [webhookBaseUrl, setWebhookBaseUrl] = useState(settings.webhookBaseUrl);
  const [defaultTimezone, setDefaultTimezone] = useState(settings.defaultTimezone);
  const [saving, setSaving] = useState(false);

  const timezones = [
    { value: "Asia/Tashkent", label: "Ташкент (UTC+5)" },
    { value: "Europe/Moscow", label: "Москва (UTC+3)" },
    { value: "Asia/Almaty", label: "Алматы (UTC+6)" },
    { value: "Asia/Baku", label: "Баку (UTC+4)" },
  ];

  const licenseStatusText = {
    active: "Активна",
    expired: "Истекла",
    trial: "Пробная"
  };

  const licenseStatusColor = {
    active: "text-green-600",
    expired: "text-red-600",
    trial: "text-amber-600"
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real app this would call an API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onUpdate({
        platformName,
        webhookBaseUrl,
        defaultTimezone
      });
      
      toast.success("Настройки платформы сохранены");
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
          <Globe className="h-5 w-5" />
          Настройки платформы
        </CardTitle>
        <CardDescription>
          Базовые параметры работы системы
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="platformName">Название платформы</Label>
          <Input
            id="platformName"
            value={platformName}
            onChange={e => setPlatformName(e.target.value)}
            placeholder="Название вашей платформы"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Статус лицензии</Label>
          <div className="flex items-center gap-2">
            <span className={`font-medium ${licenseStatusColor[settings.licenseStatus]}`}>
              {licenseStatusText[settings.licenseStatus]}
            </span>
            {settings.licenseExpiry && (
              <span className="text-sm text-muted-foreground">
                до {formatDate(settings.licenseExpiry)}
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="defaultTimezone">Часовой пояс по умолчанию</Label>
          <Select value={defaultTimezone} onValueChange={setDefaultTimezone}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите часовой пояс" />
            </SelectTrigger>
            <SelectContent>
              {timezones.map(tz => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="webhookBaseUrl">URL для WebHook'ов</Label>
          <Input
            id="webhookBaseUrl"
            value={webhookBaseUrl}
            onChange={e => setWebhookBaseUrl(e.target.value)}
            placeholder="https://api.example.com/webhooks"
          />
          <p className="text-xs text-muted-foreground">
            Base URL для интеграций с внешними сервисами
          </p>
        </div>
        
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full mt-4"
        >
          {saving ? (
            <>Сохранение...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Сохранить изменения
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
