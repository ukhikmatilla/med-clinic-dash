import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  CalendarClock, 
  Check, 
  Users, 
  Building2, 
  UserRound, 
  XCircle, 
  RefreshCw, 
  Search, 
  AlertTriangle, 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  FileText, 
  CircleAlert,
  Edit,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function SuperAdminDashboard() {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState("14.04.2025 10:22");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Simplified stats to reflect only Najot Shifo
  const stats = {
    clinics: 1,
    doctors: 10,
    doctorsChange: "+1 за 7 дней",
    doctorsTrend: "up",
    patients: 800,
    patientsChange: "+12 за 7 дней",
    patientsTrend: "up",
    appointments: 27,
    appointmentsChange: "-12% от прошлой недели",
    appointmentsTrend: "down"
  };
  
  // Keep only Najot Shifo
  const allClinics = [
    { id: 1, name: "Najot Shifo", admin: "@najot", doctors: 10, patients: 800, subscription: "01.06.2025", hasGCalendar: true },
  ];
  
  // Filter clinics based on search query
  const recentClinics = allClinics.filter(clinic => 
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    clinic.admin.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Integration errors
  const integrationErrors = [
    { id: 1, clinic: "Najot Shifo", type: "Google Calendar", error: "Ошибка авторизации", date: "14.04.2025" },
  ];
  
  // Recent activity feed
  const activityFeed = [
    { id: 1, type: "subscription", message: "Клиника Najot Shifo продлила подписку", date: "14.04.2025", time: "09:45" },
    { id: 2, type: "doctor", message: "Добавлен врач: Ортиков Ш.О.", date: "13.04.2025", time: "15:30" },
    { id: 3, type: "error", message: "Ошибка интеграции Google Calendar", date: "13.04.2025", time: "11:20" },
    { id: 4, type: "patient", message: "Зарегистрирован новый пациент", date: "12.04.2025", time: "14:15" },
    { id: 5, type: "appointment", message: "Отменен прием №245", date: "12.04.2025", time: "10:05" },
  ];
  
  // Subscriptions ending soon
  const expiringSubscriptions = [
    { id: 1, clinic: "Najot Shifo", expiresIn: "65 дней", expiryDate: "01.06.2025" }
  ];
  
  // License usage
  const licenseInfo = {
    status: "Активна",
    type: "Корпоративный",
    clinics: { current: 1, max: "∞" },
    doctors: { current: 10, max: 1000 }
  };
  
  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      
      setLastUpdated(`${day}.${month}.${year} ${hours}:${minutes}`);
      setIsRefreshing(false);
      
      toast({
        title: "Обновлено",
        description: "Данные дэшборда обновлены",
      });
    }, 1000);
  };
  
  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Activity icon mapping
  const getActivityIcon = (type) => {
    switch(type) {
      case "subscription": return <Check className="h-4 w-4 text-green-500" />;
      case "doctor": return <UserRound className="h-4 w-4 text-blue-500" />;
      case "error": return <CircleAlert className="h-4 w-4 text-red-500" />;
      case "patient": return <Users className="h-4 w-4 text-purple-500" />;
      case "appointment": return <CalendarClock className="h-4 w-4 text-orange-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };
  
  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="p-2 sm:p-6">
        {/* Header with refresh */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
          <h1 className="text-xl sm:text-2xl font-bold">Дэшборд</h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Последнее обновление: {lastUpdated}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh} 
              disabled={isRefreshing}
              className="flex items-center"
            >
              <RefreshCw className={`h-3.5 w-3.5 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Обновить
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Всего клиник</CardTitle>
              <Building2 className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.clinics}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Всего врачей</CardTitle>
              <UserRound className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="text-xl sm:text-2xl font-bold">{stats.doctors}</div>
                <div className="flex items-center text-xs font-medium">
                  {stats.doctorsTrend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stats.doctorsTrend === "up" ? "text-green-500" : "text-red-500"}>
                    {stats.doctorsChange}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Всего пациентов</CardTitle>
              <Users className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="text-xl sm:text-2xl font-bold">{stats.patients}</div>
                <div className="flex items-center text-xs font-medium">
                  {stats.patientsTrend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stats.patientsTrend === "up" ? "text-green-500" : "text-red-500"}>
                    {stats.patientsChange}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Приёмов сегодня</CardTitle>
              <CalendarClock className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="text-xl sm:text-2xl font-bold">{stats.appointments}</div>
                <div className="flex items-center text-xs font-medium">
                  {stats.appointmentsTrend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stats.appointmentsTrend === "up" ? "text-green-500" : "text-red-500"}>
                    {stats.appointmentsChange}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* License Usage Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <Package className="h-5 w-5 mr-2 text-medical-dark" />
                Лицензии и использование
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 text-sm">
                <span className="text-muted-foreground">Лицензия:</span>
                <span className="font-medium text-green-600 flex items-center">
                  <Check className="h-3.5 w-3.5 mr-1" />
                  {licenseInfo.status}
                </span>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <span className="text-muted-foreground">Тип:</span>
                <span className="font-medium">{licenseInfo.type}</span>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <span className="text-muted-foreground">Клиник:</span>
                <span className="font-medium">{licenseInfo.clinics.current} / {licenseInfo.clinics.max}</span>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <span className="text-muted-foreground">Врачей:</span>
                <span className="font-medium">{licenseInfo.doctors.current} / {licenseInfo.doctors.max}</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Activity Feed */}
          <Card className="bg-white lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium flex items-center">
                <FileText className="h-5 w-5 mr-2 text-medical-dark" />
                Последние действия
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 max-h-[270px] overflow-y-auto">
              <div className="divide-y">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="p-3 flex items-start">
                    <div className="mr-3 mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.date} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Expiring Subscriptions Alert */}
        {expiringSubscriptions.length > 0 && (
          <Alert className="mb-6 sm:mb-8 bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertTitle className="text-amber-700">Внимание: Заканчивающиеся подписки</AlertTitle>
            <AlertDescription className="text-amber-600">
              У клиники "{expiringSubscriptions[0].clinic}" подписка заканчивается через {expiringSubscriptions[0].expiresIn} ({expiringSubscriptions[0].expiryDate})
              <div className="mt-2">
                <Button variant="outline" size="sm">Посмотреть список</Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Recent Clinics Section with Search */}
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
            <h2 className="text-lg sm:text-xl font-semibold">Последние клиники</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск клиник..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {recentClinics.length > 0 ? (
              recentClinics.map(clinic => (
                <Card key={clinic.id} className="bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg">{clinic.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Админ:</span>
                      <span>{clinic.admin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Врачей:</span>
                      <span>{clinic.doctors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Пациентов:</span>
                      <span>{clinic.patients}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Подписка:</span>
                      <span className="flex items-center">
                        <Check className="mr-1 h-3 w-3 text-green-500" /> 
                        Оплачено до {clinic.subscription}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GCalendar:</span>
                      <span>
                        {clinic.hasGCalendar ? 
                          <Check className="h-4 w-4 text-green-500" /> : 
                          <XCircle className="h-4 w-4 text-red-500" />}
                      </span>
                    </div>
                    <div className="pt-2 flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                Не найдено клиник, соответствующих запросу
              </div>
            )}
          </div>
        </div>
        
        {/* Integration Errors */}
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Ошибки интеграций</h2>
        <Card className="bg-white mb-6 sm:mb-8">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Клиника</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Ошибка</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrationErrors.length > 0 ? (
                    integrationErrors.map(error => (
                      <TableRow key={error.id}>
                        <TableCell className="font-medium">{error.clinic}</TableCell>
                        <TableCell>{error.type}</TableCell>
                        <TableCell className="text-red-500">{error.error}</TableCell>
                        <TableCell>{error.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="link" size="sm">Исправить</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Нет ошибок интеграций
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}

export default SuperAdminDashboard;
