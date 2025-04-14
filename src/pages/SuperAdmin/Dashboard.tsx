
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CalendarClock, Check, Users, Building2, UserRound, XCircle } from "lucide-react";

export function SuperAdminDashboard() {
  // This would come from your API in a real application
  const stats = {
    clinics: 12,
    doctors: 145,
    patients: 3628,
    appointments: 87
  };
  
  const recentClinics = [
    { id: 1, name: "Najot Shifo", admin: "@najot", doctors: 10, patients: 800, subscription: "01.06.2025", hasGCalendar: true },
    { id: 2, name: "MediPlus", admin: "@mediplus", doctors: 8, patients: 620, subscription: "15.05.2025", hasGCalendar: false },
    { id: 3, name: "Здоровье+", admin: "@zdorovie", doctors: 12, patients: 950, subscription: "07.03.2025", hasGCalendar: true },
  ];
  
  const integrationErrors = [
    { id: 1, clinic: "Центр Диагностики", type: "Google Calendar", error: "Ошибка авторизации", date: "14.04.2025" },
    { id: 2, clinic: "MediPlus", type: "Telegram Bot", error: "Бот не отвечает", date: "13.04.2025" },
  ];
  
  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="p-2 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Дэшборд</h1>
        
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
              <div className="text-xl sm:text-2xl font-bold">{stats.doctors}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Всего пациентов</CardTitle>
              <Users className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.patients}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Приёмов сегодня</CardTitle>
              <CalendarClock className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.appointments}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Clinics */}
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Последние клиники</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {recentClinics.map(clinic => (
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
                  <button className="text-primary hover:underline">🔍</button>
                  <button className="text-primary hover:underline">✏️</button>
                  <button className="text-destructive hover:underline">❌</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Integration Errors */}
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Ошибки интеграций</h2>
        <Card className="bg-white mb-6 sm:mb-8">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm">Клиника</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm">Тип</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm">Ошибка</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm">Дата</th>
                    <th className="text-right py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {integrationErrors.map(error => (
                    <tr key={error.id} className="border-t">
                      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">{error.clinic}</td>
                      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">{error.type}</td>
                      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-red-500">{error.error}</td>
                      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">{error.date}</td>
                      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-right">
                        <button className="text-primary hover:underline text-xs sm:text-sm">Исправить</button>
                      </td>
                    </tr>
                  ))}
                  {integrationErrors.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-muted-foreground text-xs sm:text-sm">
                        Нет ошибок интеграций
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}

export default SuperAdminDashboard;
