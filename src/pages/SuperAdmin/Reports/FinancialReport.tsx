
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PeriodFilter } from "@/components/reports/PeriodFilter";
import { useReportsData } from "@/hooks/useReportsData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { DateRange } from "@/types/subscription";
import { generateAndDownloadReport } from "@/utils/reportGenerator";
import { ReportFormatSelector } from "@/components/reports/ReportFormatSelector";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

export default function SuperAdminFinancialReport() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [customDateRange, setCustomDateRange] = useState<DateRange | null>(null);
  const { analytics } = useReportsData(period);
  const [isExporting, setIsExporting] = useState(false);
  
  const handlePeriodChange = (value: string) => {
    setPeriod(value as 'week' | 'month' | 'quarter' | 'year');
  };
  
  const handleCustomDateChange = (range: DateRange) => {
    setCustomDateRange(range);
    // In a real app, we would fetch data for the custom date range here
  };
  
  // Mock payment data for the table
  const paymentData = [
    { date: '01.04.2025', clinic: 'Najot Shifo', tariff: 'CRM + Telegram', amount: '250,000 сум', status: 'Успешно', method: 'Payme (бот)' },
    { date: '01.03.2025', clinic: 'Najot Shifo', tariff: 'CRM + Telegram', amount: '250,000 сум', status: 'Успешно', method: 'Payme (бот)' },
    { date: '01.02.2025', clinic: 'Medlife', tariff: 'CRM', amount: '150,000 сум', status: 'Успешно', method: 'Наличные' },
    { date: '15.01.2025', clinic: 'Health Plus', tariff: 'CRM + Telegram', amount: '250,000 сум', status: 'Успешно', method: 'Click' },
  ];
  
  // Prepare data for pie chart
  const tariffData = [
    { name: 'CRM', value: 350000 },
    { name: 'CRM + Telegram', value: 750000 },
  ];

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
        {
          revenueData: analytics.revenueData,
          paymentData: paymentData
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
            <h1 className="text-3xl font-bold tracking-tight">Финансовый отчёт</h1>
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
                        data={tariffData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {tariffData.map((entry, index) => (
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
                        data={[
                          { name: 'Бот', value: 45 },
                          { name: 'Админка', value: 40 },
                          { name: 'Вручную', value: 15 }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {tariffData.map((entry, index) => (
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
                  {paymentData.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.clinic}</TableCell>
                      <TableCell>{payment.tariff}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {payment.status}
                        </span>
                      </TableCell>
                      <TableCell>{payment.method}</TableCell>
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
            label="Скачать полный отчет"
          />
        </div>
      </div>
    </SidebarLayout>
  );
}
