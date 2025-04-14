
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, Save, Stethoscope, Users, Calendar, CalendarClock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PeriodFilter } from "@/components/reports/PeriodFilter";
import { useReportsData } from "@/hooks/useReportsData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DateRange } from "@/types/subscription";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default function SuperAdminActivityReport() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [customDateRange, setCustomDateRange] = useState<DateRange | null>(null);
  const { analytics, reports } = useReportsData(period);
  
  const handlePeriodChange = (value: string) => {
    setPeriod(value as 'week' | 'month' | 'quarter' | 'year');
  };
  
  const handleCustomDateChange = (range: DateRange) => {
    setCustomDateRange(range);
    // In a real app, we would fetch data for the custom date range here
  };
  
  const handleDownload = (format: 'excel' | 'csv' | 'pdf') => {
    toast.info(`Загрузка отчета в формате ${format.toUpperCase()}...`);
    setTimeout(() => {
      toast.success(`Отчет успешно скачан в формате ${format.toUpperCase()}`);
    }, 1000);
  };
  
  // Find the activity report
  const activityReport = reports.find(report => report.type === 'activity');
  
  // Stats from the report
  const stats = {
    newClinics: activityReport?.data?.newClinics || 3,
    newDoctors: activityReport?.data?.newDoctors || 12,
    newPatients: activityReport?.data?.newPatients || 87,
    totalAppointments: activityReport?.data?.totalAppointments || 156
  };
  
  // Mock clinic activity data
  const clinicActivityData = [
    { clinic: 'Najot Shifo', doctors: 10, patients: 800, appointments: 156, integrations: ['Google Calendar', 'Telegram'], lastActive: '2025-04-14T10:23:00' },
    { clinic: 'Medlife', doctors: 8, patients: 650, appointments: 120, integrations: ['Telegram'], lastActive: '2025-04-13T15:45:00' },
    { clinic: 'Health Plus', doctors: 15, patients: 920, appointments: 210, integrations: ['Google Calendar', 'Telegram'], lastActive: '2025-04-14T09:30:00' },
    { clinic: 'SmartMed', doctors: 6, patients: 420, appointments: 85, integrations: [], lastActive: '2025-04-12T14:10:00' },
  ];

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
            <h1 className="text-3xl font-bold tracking-tight">Активность платформы</h1>
          </div>
          <PeriodFilter 
            onPeriodChange={handlePeriodChange} 
            onCustomDateChange={handleCustomDateChange} 
            defaultValue={period}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                Новые клиники
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.newClinics}</div>
              <p className="text-sm text-muted-foreground">за выбранный период</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Stethoscope className="h-4 w-4 mr-2 text-muted-foreground" />
                Новые врачи
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.newDoctors}</div>
              <p className="text-sm text-muted-foreground">специалистов добавлено</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                Новые пациенты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.newPatients}</div>
              <p className="text-sm text-muted-foreground">пациентов зарегистрировано</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                Приёмы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalAppointments}</div>
              <p className="text-sm text-muted-foreground">всего приёмов проведено</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Динамика интеграций</CardTitle>
              <CardDescription>Подключения к Google Calendar и Telegram</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.integrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="googleCalendar" 
                      name="Google Calendar" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="telegram" 
                      name="Telegram" 
                      stroke="#82ca9d" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Загруженность платформы</CardTitle>
              <CardDescription>Количество активных клиник по дням</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={[
                      { day: 'Пн', activeUsers: 12 },
                      { day: 'Вт', activeUsers: 19 },
                      { day: 'Ср', activeUsers: 15 },
                      { day: 'Чт', activeUsers: 18 },
                      { day: 'Пт', activeUsers: 22 },
                      { day: 'Сб', activeUsers: 10 },
                      { day: 'Вс', activeUsers: 5 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="activeUsers" 
                      name="Активные клиники" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Активность клиник</CardTitle>
              <CardDescription>Детализация по клиникам</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleDownload('excel')}>
                <FileText className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload('csv')}>
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
                  <TableHead>Врачи</TableHead>
                  <TableHead>Пациенты</TableHead>
                  <TableHead>Приёмов</TableHead>
                  <TableHead>Интеграции</TableHead>
                  <TableHead>Последняя активность</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clinicActivityData.map((clinic, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{clinic.clinic}</TableCell>
                    <TableCell>{clinic.doctors}</TableCell>
                    <TableCell>{clinic.patients}</TableCell>
                    <TableCell>{clinic.appointments}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {clinic.integrations.length > 0 ? (
                          clinic.integrations.map((integration, i) => (
                            <Badge key={i} variant="outline" className="bg-green-50">
                              {integration}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline" className="bg-red-50">
                            Нет интеграций
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                        {formatDate(clinic.lastActive)}
                      </div>
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
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleDownload('excel')}>
              <Download className="h-4 w-4 mr-2" />
              Скачать Excel
            </Button>
            <Button variant="outline" onClick={() => handleDownload('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Скачать PDF
            </Button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
