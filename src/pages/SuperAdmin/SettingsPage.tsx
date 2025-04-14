
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Card } from "@/components/ui/card";
import { PlatformSettingsCard } from "@/components/settings/PlatformSettingsCard";
import { PaymentsSettings } from "@/components/settings/PaymentsSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { useSettingsData } from "@/hooks/useSettingsData";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsPage() {
  const { settings, isLoading, updateSettings } = useSettingsData();

  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Системные настройки</h1>
        <p className="text-muted-foreground">
          Управление поведением системы, платформенными ключами, параметрами подписок и email/бот-уведомлениями.
        </p>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <div className="space-y-6">
            {isLoading ? (
              <Skeleton className="h-[250px] w-full" />
            ) : (
              <PlatformSettingsCard 
                settings={settings.platform} 
                onUpdate={(data) => updateSettings('platform', data)} 
              />
            )}
            
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <NotificationSettings 
                settings={settings.notifications} 
                onUpdate={(data) => updateSettings('notifications', data)} 
              />
            )}
          </div>
          
          <div>
            {isLoading ? (
              <Skeleton className="h-[350px] w-full" />
            ) : (
              <PaymentsSettings 
                settings={settings.payments} 
                onUpdate={(data) => updateSettings('payments', data)} 
              />
            )}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
