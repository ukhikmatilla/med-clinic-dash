import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, Eye, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PeriodFilter } from "@/components/reports/PeriodFilter";
import { useReportsData } from "@/hooks/useReportsData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { DateRange, FinancialReportData } from "@/types/subscription";
import { generateAndDownloadReport } from "@/utils/reportGenerator";
import { ReportFormatSelector } from "@/components/reports/ReportFormatSelector";
import { ReportPreviewDialog } from "@/components/reports/ReportPreviewDialog";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

export default function SuperAdminFinancialReport() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [customDateRange, setCustomDateRange] = useState<DateRange | null>(null);
  const { analytics, getReportByType } = useReportsData(period, customDateRange?.from && customDateRange?.to ? customDateRange : undefined);
  const [isExporting, setIsExporting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  // Get the financial report data
  const financialReport = getReportByType("financial");
  const financialData = financialReport?.data as FinancialReportData || {
    revenueData: [],
    paymentData: [],
    tariffDistribution: [],
    paymentSources: []
  };
  
  const handlePeriodChange = (value: string) => {
    setPeriod(value as 'week' | 'month' | 'quarter' | 'year');
  };
  
  const handleCustomDateChange = (range: DateRange) => {
    setCustomDateRange(range);
    // In a real app, we would fetch data for the custom date range here
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
        "financial",
        format,
        financialData,
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
            <h1 className="text-3xl font-bold tracking-tight">Финансовый отчёт</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewOpen(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Предпросмотр
            </Button>
            <PeriodFilter 
              onPeriodChange={handlePeriodChange} 
              onCustomDateChange={handleCustomDateChange} 
              defaultValue={period}
            />
            <ReportFormatSelector 
              onExport={handleExport}
              disabled={isExporting}
              reportType="financial"
              reportData={financialData}
              period={period === 'week' ? 'Неделя' : period === 'month' ? 'Месяц' : period === 'quarter' ? 'Квартал' : 'Год'}
              reportTitle="Финансовый отчет"
            />
          </div>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Доход по месяцам</CardTitle>
              <CardDescription>Сравнение дохода по разным тарифам</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${new Intl.NumberFormat('ru-RU').format(value as number)} сум`} />
                    <Legend />
                    <Bar dataKey="crmRevenue" name="CRM" fill="#8884d8" />
                    <Bar dataKey="crmTelegramRevenue" name="CRM + Telegram" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Доход по тарифам</CardTitle>
                <CardDescription>Распределение дохода по типам тарифов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={financialData.tariffDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {financialData.tariffDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${new Intl.NumberFormat('ru-RU').format(value as number)} сум`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Источники платежей</CardTitle>
                <CardDescription>Каналы поступления платежей</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={financialData.paymentSources}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ source, percentage }) => `${source}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                        nameKey="source"
                      >
                        {financialData.paymentSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Таблица платежей</CardTitle>
                <CardDescription>История платежей за выбранный период</CardDescription>
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
                    <TableHead>Дата</TableHead>
                    <TableHead>Клиника</TableHead>
                    <TableHead>Тариф</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Способ оплаты</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialData.paymentData.map((payment, index) => (
                    <TableRow key={payment.id || index}>
                      <TableCell>{new Date(payment.date).toLocaleDateString('ru-RU')}</TableCell>
                      <TableCell>{payment.clinicName}</TableCell>
                      <TableCell>{payment.planName}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {payment.status === 'success' ? 'Успешно' : 
                           payment.status === 'pending' ? 'В обработке' : 
                           payment.status === 'awaiting' ? 'Ожидает оплаты' : 'Ошибка'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {payment.source === 'payme' ? 'Payme' : 
                         payment.source === 'bot' ? 'Payme (бот)' : 
                         payment.source === 'manual' ? 'Вручную' : 'Другой способ'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/super-admin/reports')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <ReportFormatSelector 
            onExport={handleExport}
            disabled={isExporting}
            reportType="financial"
            reportData={financialData}
            period={period === 'week' ? 'Неделя' : period === 'month' ? 'Месяц' : period === 'quarter' ? 'Квартал' : 'Год'}
            reportTitle="Финансовый отчет"
            label="Скачать полный отчет"
          />
        </div>
      </div>
      
      {/* Preview Dialog */}
      <ReportPreviewDialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        reportType="financial"
        reportData={financialData}
        period={period === 'week' ? 'Неделя' : period === 'month' ? 'Месяц' : period === 'quarter' ? 'Квартал' : 'Год'}
        title="Финансовый отчет"
      />
    </SidebarLayout>
  );
}
