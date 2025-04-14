
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, Save, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PeriodFilter } from "@/components/reports/PeriodFilter";
import { useReportsData } from "@/hooks/useReportsData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { DateRange } from "@/types/subscription";
import { toast } from "sonner";
import { generateAndDownloadReport } from "@/utils/reportGenerator";
import { ReportFormatSelector } from "@/components/reports/ReportFormatSelector";

export default function SuperAdminSubscriptionsReport() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [customDateRange, setCustomDateRange] = useState<DateRange | null>(null);
  const { analytics, reports } = useReportsData(period);
  const [isExporting, setIsExporting] = useState(false);
  
  const handlePeriodChange = (value: string) => {
    setPeriod(value as 'week' | 'month' | 'quarter' | 'year');
  };
  
  const handleCustomDateChange = (range: DateRange) => {
    setCustomDateRange(range);
    // In a real app, we would fetch data for the custom date range here
  };
  
  const handleExtendSubscription = (clinicName: string) => {
    toast.info(`Начало процесса продления подписки для ${clinicName}...`);
    setTimeout(() => {
      toast.success(`Подписка для ${clinicName} успешно продлена`);
    }, 1000);
  };
  
  // Find the subscriptions report
  const subscriptionsReport = reports.find(report => report.type === 'subscriptions');
  
  // Mock subscription data for the table
  const subscriptionData = [
    { clinic: 'Najot Shifo', expiry: '15.05.2025', autoRenewal: true, status: 'Активна', tariff: 'CRM + Telegram' },
    { clinic: 'Medlife', expiry: '05.05.2025', autoRenewal: false, status: 'Активна', tariff: 'CRM' },
    { clinic: 'Health Plus', expiry: '01.05.2025', autoRenewal: true, status: 'Истекает', tariff: 'CRM + Telegram' },
    { clinic: 'SmartMed', expiry: '25.04.2025', autoRenewal: false, status: 'Истекает', tariff: 'CRM + Telegram' },
  ];
  
  // Stats from the report
  const stats = {
    activeSubscriptions: subscriptionsReport?.data?.activeSubscriptions || 42,
    autoRenewal: subscriptionsReport?.data?.autoRenewal || 28,
    activePercentage: subscriptionsReport ? Math.round((subscriptionsReport.data.autoRenewal / subscriptionsReport.data.activeSubscriptions) * 100) : 66,
    expiringCount: subscriptionsReport?.data?.expiringSubscriptions?.length || 2
  };

  // Handle export
  const handleExport = async (format: "pdf" | "excel" | "csv") => {
    setIsExporting(true);
    try {
      const periodLabel = customDateRange 
        ? `${new Date(customDateRange.from).toLocaleDateString()} - ${new Date(customDateRange.to).toLocaleDateString()}`
        : period === 'week' ? 'Неделя' 
        : period === 'month' ? 'Месяц'
        : period === 'quarter' ? 'Квартал' : 'Год';
        
      await generateAndDownloadReport(
        "subscriptions",
        format,
        {
          subscriptionData: subscriptionData,
          stats: stats
        },
        periodLabel
      );
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Ошибка при экспорте отчета");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/super-admin/reports')}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Подписки и продления</h1>
          </div>
          <div className="flex items-center gap-2">
            <PeriodFilter 
              onPeriodChange={handlePeriodChange} 
              onCustomDateChange={handleCustomDateChange} 
              defaultValue={period}
            />
            <ReportFormatSelector 
              onExport={handleExport}
              disabled={isExporting}
            />
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Активные подписки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeSubscriptions}</div>
              <p className="text-sm text-muted-foreground">клиник с активной подпиской</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Автопродление</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.autoRenewal} ({stats.activePercentage}%)</div>
              <p className="text-sm text-muted-foreground">клиник с автопродлением</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Истекающие</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.expiringCount}</div>
              <p className="text-sm text-muted-foreground">подписки истекают в ближайшие 30 дней</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Тренд подписок</CardTitle>
            <CardDescription>Динамика активных, новых и отмененных подписок</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.subscriptionTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="activeSubscriptions" 
                    name="Активные" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="newSubscriptions" 
                    name="Новые" 
                    stroke="#82ca9d" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cancelledSubscriptions" 
                    name="Отмененные" 
                    stroke="#ff7300" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Таблица подписок</CardTitle>
              <CardDescription>Статус подписок по клиникам</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleExport("excel")}
                disabled={isExporting}
              >
                <FileText className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleExport("csv")}
                disabled={isExporting}
              >
                <Save className="h-4 w-4 mr-2" />
                CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Клиника</TableHead>
                  <TableHead>Подписка до</TableHead>
                  <TableHead>Автопродление</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Тариф</TableHead>
                  <TableHead>Действие</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptionData.map((sub, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{sub.clinic}</TableCell>
                    <TableCell>{sub.expiry}</TableCell>
                    <TableCell>
                      <Switch checked={sub.autoRenewal} />
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sub.status === 'Активна' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {sub.status}
                      </span>
                    </TableCell>
                    <TableCell>{sub.tariff}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleExtendSubscription(sub.clinic)}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Продлить
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/super-admin/reports')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <ReportFormatSelector 
            onExport={handleExport}
            disabled={isExporting}
            label="Скачать полный отчет"
          />
        </div>
      </div>
    </SidebarLayout>
  );
}
