
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ErrorLogsTable } from "@/components/logs/ErrorLogsTable";
import { WebhookLogsTable } from "@/components/logs/WebhookLogsTable";
import { SystemEventsTimeline } from "@/components/logs/SystemEventsTimeline";
import { useLogsData } from "@/hooks/useLogsData";
import { Skeleton } from "@/components/ui/skeleton";

export default function LogsPage() {
  const { logs, isLoading } = useLogsData();

  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Логи и ошибки</h1>
        <p className="text-muted-foreground">
          Мониторинг технических событий и ошибок всей платформы: интеграции, платежи, webhooks, внутренние сбои.
        </p>

        <Tabs defaultValue="errors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="errors">Ошибки интеграций</TabsTrigger>
            <TabsTrigger value="webhooks">Webhook-логи</TabsTrigger>
            <TabsTrigger value="system">Системная активность</TabsTrigger>
          </TabsList>

          <TabsContent value="errors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ошибки интеграций</CardTitle>
                <CardDescription>
                  Ошибки API и интеграционные проблемы сервисов
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                  <ErrorLogsTable errors={logs.errors} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Webhook-логи</CardTitle>
                <CardDescription>
                  Запросы и ответы от Telegram / Google Calendar / Click / Payme
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                  <WebhookLogsTable webhooks={logs.webhooks} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Системная активность</CardTitle>
                <CardDescription>
                  Основные события системы и пользовательские действия
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : (
                  <SystemEventsTimeline events={logs.events} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
}
