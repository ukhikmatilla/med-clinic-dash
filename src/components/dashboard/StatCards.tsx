
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Users, UserRound, Stethoscope } from "lucide-react";

interface StatsProps {
  doctors: number;
  patients: number;
  appointments: number;
  services: number;
}

export function StatCards({ doctors, patients, appointments, services }: StatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Врачей</CardTitle>
          <UserRound className="h-4 w-4 text-medical-dark" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{doctors}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Пациентов</CardTitle>
          <Users className="h-4 w-4 text-medical-dark" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{patients}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Приёмов сегодня</CardTitle>
          <CalendarClock className="h-4 w-4 text-medical-dark" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{appointments}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Услуг</CardTitle>
          <Stethoscope className="h-4 w-4 text-medical-dark" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{services}</div>
        </CardContent>
      </Card>
    </div>
  );
}
