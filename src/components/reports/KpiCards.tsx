
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, LineChart, Stethoscope } from "lucide-react";

interface KpiCardsProps {
  data: {
    activeSubscriptions: number;
    autoRenewal: number;
    newClinics: number;
    newDoctors: number;
    newPatients: number;
    totalAppointments: number;
    averageDoctorsPerClinic?: number;
  };
}

export function KpiCards({ data }: KpiCardsProps) {
  // Calculate average doctors per clinic if not provided
  const avgDoctors = data.averageDoctorsPerClinic || 
    (data.newClinics > 0 ? Math.round((data.newDoctors / data.newClinics) * 10) / 10 : 0);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Активные подписки</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.activeSubscriptions}</div>
          <p className="text-xs text-muted-foreground">
            {data.autoRenewal} на автопродлении
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Новые клиники</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.newClinics}</div>
          <p className="text-xs text-muted-foreground">
            За последний месяц
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Новые врачи</CardTitle>
          <Stethoscope className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.newDoctors}</div>
          <p className="text-xs text-muted-foreground">
            В среднем {avgDoctors} на клинику
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Всего приёмов</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalAppointments}</div>
          <p className="text-xs text-muted-foreground">
            {data.newPatients} новых пациентов
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
