
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, BarChart, PieChart, LineChart, Users, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useReportsData } from "@/hooks/useReportsData";
import { ReportCard } from "@/components/reports/ReportCard";
import { AnalyticsCharts } from "@/components/reports/AnalyticsCharts";
import { KpiCards } from "@/components/reports/KpiCards";
import { ExpiringSubscriptionsTable } from "@/components/reports/ExpiringSubscriptionsTable";
import { toast } from "sonner";
import { ErrorsSection } from "@/components/dashboard/ErrorsSection";
import { useIntegrationsData } from "@/hooks/useIntegrationsData";
import { CreateReportDialog } from "@/components/reports/CreateReportDialog";

export default function SuperAdminReports() {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const { reports, isLoading, refreshReport, analytics } = useReportsData(period);
  const { errors } = useIntegrationsData();
  const [createReportOpen, setCreateReportOpen] = useState(false);
  
  const handlePeriodChange = (value: string) => {
    setPeriod(value as 'week' | 'month' | 'quarter' | 'year');
  };
  
  const handleCreateReport = () => {
    setCreateReportOpen(true);
  };
  
  // Find the activity report to extract KPI data
  const activityReport = reports.find(report => report.type === 'activity');
  const subscriptionsReport = reports.find(report => report.type === 'subscriptions');
  
  // Extract KPI data
  const kpiData = {
    activeSubscriptions: subscriptionsReport?.data?.activeSubscriptions || 0,
    autoRenewal: subscriptionsReport?.data?.autoRenewal || 0,
    newClinics: activityReport?.data?.newClinics || 0,
    newDoctors: activityReport?.data?.newDoctors || 0,
    newPatients: activityReport?.data?.newPatients || 0,
    totalAppointments: activityReport?.data?.totalAppointments || 0,
  };

  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Отчёты</h1>
            <p className="text-muted-foreground">
              Аналитика и отчёты по всем клиникам в системе
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue={period} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Период" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">За неделю</SelectItem>
                <SelectItem value="month">За месяц</SelectItem>
                <SelectItem value="quarter">За квартал</SelectItem>
                <SelectItem value="year">За год</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleCreateReport}>
              <FileText className="mr-2 h-4 w-4" />
              Создать отчёт
            </Button>
          </div>
        </div>

        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="recent">Недавние отчёты</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="custom">Настраиваемые отчёты</TabsTrigger>
          </TabsList>
          
          {/* Recent Reports Tab */}
          <TabsContent value="recent" className="mt-4 space-y-6">
            <KpiCards data={kpiData} />
            
            <div className="grid gap-4 md:grid-cols-2">
              {reports
                .filter(report => report.type !== "errors") // We'll display errors separately
                .map((report) => (
                  <ReportCard 
                    key={report.id} 
                    report={report} 
                    onRefresh={refreshReport}
                    isLoading={isLoading} 
                  />
                ))
              }
            </div>
            
            {/* Display the expiring subscriptions from the report */}
            {subscriptionsReport && (
              <ExpiringSubscriptionsTable 
                subscriptions={subscriptionsReport.data.expiringSubscriptions || []} 
              />
            )}
            
            {/* Integration Errors Section */}
            <div className="mt-6">
              <ErrorsSection errors={errors} />
            </div>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-4 space-y-6">
            <KpiCards data={kpiData} />
            
            <AnalyticsCharts 
              subscriptionTrends={analytics.subscriptionTrends}
              revenueData={analytics.revenueData}
              integrationData={analytics.integrationData}
            />
          </TabsContent>
          
          {/* Custom Reports Tab */}
          <TabsContent value="custom" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Настраиваемые отчёты</CardTitle>
                <CardDescription>
                  Создайте и настройте собственные отчёты
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Создайте свой отчёт</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Выберите параметры, метрики и фильтры для создания персонализированного отчёта
                  </p>
                  <Button onClick={handleCreateReport}>
                    <FileText className="mr-2 h-4 w-4" />
                    Создать отчёт
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Report History Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>История созданных отчётов</CardTitle>
                <CardDescription>
                  Ваши ранее созданные отчёты
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4 text-left">Название отчёта</th>
                        <th className="py-2 px-4 text-left">Дата создания</th>
                        <th className="py-2 px-4 text-left">Автор</th>
                        <th className="py-2 px-4 text-left">Тип</th>
                        <th className="py-2 px-4 text-left">Формат</th>
                        <th className="py-2 px-4 text-left">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-2 px-4">Финансовый / март</td>
                        <td className="py-2 px-4">01.04.2025</td>
                        <td className="py-2 px-4">SuperAdmin</td>
                        <td className="py-2 px-4">Финансовый</td>
                        <td className="py-2 px-4">XLSX</td>
                        <td className="py-2 px-4">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Скачать
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-2 px-4">Активность / февраль</td>
                        <td className="py-2 px-4">01.03.2025</td>
                        <td className="py-2 px-4">SuperAdmin</td>
                        <td className="py-2 px-4">Активность</td>
                        <td className="py-2 px-4">PDF</td>
                        <td className="py-2 px-4">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Скачать
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Create Report Dialog */}
      <CreateReportDialog 
        open={createReportOpen}
        onOpenChange={setCreateReportOpen}
      />
    </SidebarLayout>
  );
}
