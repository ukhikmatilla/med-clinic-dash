
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClinicFormData {
  name: string;
  admin: string;
  email: string;
  plan: string;
  doctorsLimit: string;
  subscription: string;
  telegramBotPatient: string;
  telegramBotDoctor: string;
  timezone: string;
  hasGCalendar: boolean;
}

interface ClinicFormFieldsProps {
  formData: ClinicFormData;
  errors: Record<string, string>;
  handleChange: (field: string, value: string | boolean) => void;
}

export function ClinicFormFields({ formData, errors, handleChange }: ClinicFormFieldsProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Название клиники *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="admin">Telegram ID администратора *</Label>
        <Input
          id="admin"
          value={formData.admin}
          onChange={(e) => handleChange("admin", e.target.value)}
          placeholder="@username"
          className={errors.admin ? "border-red-500" : ""}
        />
        {errors.admin && <p className="text-xs text-red-500">{errors.admin}</p>}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="plan">Тариф *</Label>
        <Select
          value={formData.plan}
          onValueChange={(value) => handleChange("plan", value)}
        >
          <SelectTrigger id="plan">
            <SelectValue placeholder="Выбрать тариф" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CRM">CRM</SelectItem>
            <SelectItem value="CRM + Telegram">CRM + Telegram</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="doctorsLimit">Лимит врачей</Label>
        <Input
          id="doctorsLimit"
          type="number"
          min="1"
          value={formData.doctorsLimit}
          onChange={(e) => handleChange("doctorsLimit", e.target.value)}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="subscription">Срок подписки *</Label>
        <Input
          id="subscription"
          type="text"
          placeholder="ДД.ММ.ГГГГ"
          value={formData.subscription}
          onChange={(e) => handleChange("subscription", e.target.value)}
          className={errors.subscription ? "border-red-500" : ""}
        />
        {errors.subscription && <p className="text-xs text-red-500">{errors.subscription}</p>}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="telegramBotPatient">Telegram Bot (пациенты)</Label>
        <Input
          id="telegramBotPatient"
          value={formData.telegramBotPatient}
          onChange={(e) => handleChange("telegramBotPatient", e.target.value)}
          placeholder="@bot_name"
          className={errors.telegramBotPatient ? "border-red-500" : ""}
        />
        {errors.telegramBotPatient && <p className="text-xs text-red-500">{errors.telegramBotPatient}</p>}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="telegramBotDoctor">Telegram Bot (врачи)</Label>
        <Input
          id="telegramBotDoctor"
          value={formData.telegramBotDoctor}
          onChange={(e) => handleChange("telegramBotDoctor", e.target.value)}
          placeholder="@bot_name"
          className={errors.telegramBotDoctor ? "border-red-500" : ""}
        />
        {errors.telegramBotDoctor && <p className="text-xs text-red-500">{errors.telegramBotDoctor}</p>}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="timezone">Часовой пояс</Label>
        <Select
          value={formData.timezone}
          onValueChange={(value) => handleChange("timezone", value)}
        >
          <SelectTrigger id="timezone">
            <SelectValue placeholder="Выбрать часовой пояс" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ташкент (UTC+5)">Ташкент (UTC+5)</SelectItem>
            <SelectItem value="Москва (UTC+3)">Москва (UTC+3)</SelectItem>
            <SelectItem value="Душанбе (UTC+5)">Душанбе (UTC+5)</SelectItem>
            <SelectItem value="Бишкек (UTC+6)">Бишкек (UTC+6)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="hasGCalendar"
          checked={formData.hasGCalendar}
          onChange={(e) => handleChange("hasGCalendar", e.target.checked)}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="hasGCalendar">Интеграция с Google Calendar</Label>
      </div>
    </div>
  );
}
