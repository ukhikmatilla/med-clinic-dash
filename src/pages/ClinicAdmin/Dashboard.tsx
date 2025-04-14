
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { ClinicAdminSidebar } from "@/components/sidebars/ClinicAdminSidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CalendarClock, Users, UserRound, Stethoscope, Bell, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClinicAdminDashboard() {
  // This would come from your API in a real application
  const stats = {
    doctors: 10,
    patients: 800,
    appointments: 27,
    services: 45
  };
  
  const upcomingAppointments = [
    { id: 1, patient: "Ахмедов Рустам", doctor: "Закирова Г.А.", service: "Консультация кардиолога", time: "10:30" },
    { id: 2, patient: "Исмаилова Нигора", doctor: "Каримова Д.Э.", service: "УЗИ щитовидной железы", time: "11:15" },
    { id: 3, patient: "Сулейманов Фаррух", doctor: "Эронов М.М.", service: "ЭКГ + консультация", time: "12:00" },
    { id: 4, patient: "Рахимова Зарина", doctor: "Ортиков Ш.О.", service: "Консультация дерматолога", time: "13:30" },
  ];
  
  return (
    <SidebarLayout sidebar={<ClinicAdminSidebar clinicName="Najot Shifo" />}>
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Najot Shifo</h1>
            <p className="text-muted-foreground">Центр высококачественной медицины</p>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Добавить приём
            </Button>
            <Button variant="outline" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                2
              </span>
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Врачей</CardTitle>
              <UserRound className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.doctors}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Пациентов</CardTitle>
              <Users className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.patients}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Приёмов сегодня</CardTitle>
              <CalendarClock className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.appointments}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Услуг</CardTitle>
              <Stethoscope className="h-4 w-4 text-medical-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.services}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Ближайшие приёмы</CardTitle>
                <Button variant="link" size="sm" className="text-primary font-normal">
                  Смотреть все
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-sm">Время</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Пациент</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Врач</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Услуга</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingAppointments.map(appointment => (
                      <tr key={appointment.id} className="border-b">
                        <td className="py-3 px-4 text-sm font-medium">{appointment.time}</td>
                        <td className="py-3 px-4 text-sm">{appointment.patient}</td>
                        <td className="py-3 px-4 text-sm">{appointment.doctor}</td>
                        <td className="py-3 px-4 text-sm">{appointment.service}</td>
                        <td className="py-3 px-4 text-sm text-right">
                          <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                            Детали
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Subscription Status */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Статус подписки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-medical-light-blue p-4 rounded-md">
                <h3 className="font-medium">✅ Активна</h3>
                <p className="text-sm text-muted-foreground">до 01.06.2025</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Тариф</h3>
                <p>CRM + Telegram (10 врачей)</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Автопродление</h3>
                <p className="text-sm text-muted-foreground">Включено</p>
              </div>
              
              <div className="pt-2 flex flex-col gap-2">
                <Button>📥 Продлить подписку</Button>
                <Button variant="outline">🧩 Изменить тариф</Button>
                <Button variant="outline" className="text-muted-foreground">
                  🛑 Отключить автопродление
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
}

export default ClinicAdminDashboard;
