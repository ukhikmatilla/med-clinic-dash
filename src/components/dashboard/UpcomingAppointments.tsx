
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  service: string;
  time: string;
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  onViewDetails: (appointmentId: number) => void;
}

export function UpcomingAppointments({ 
  appointments, 
  onViewDetails 
}: UpcomingAppointmentsProps) {
  return (
    <>
      {/* Desktop View */}
      <Card className="bg-white lg:col-span-2 hidden sm:block">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Ближайшие приёмы</CardTitle>
            <Button 
              variant="link" 
              size="sm" 
              className="text-primary font-normal"
              onClick={() => window.location.href = "/clinic-admin/schedule"}
            >
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
                {appointments.map(appointment => (
                  <tr key={appointment.id} className="border-b">
                    <td className="py-3 px-4 text-sm font-medium">{appointment.time}</td>
                    <td className="py-3 px-4 text-sm">{appointment.patient}</td>
                    <td className="py-3 px-4 text-sm">{appointment.doctor}</td>
                    <td className="py-3 px-4 text-sm">{appointment.service}</td>
                    <td className="py-3 px-4 text-sm text-right">
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="h-auto p-0 text-primary"
                        onClick={() => onViewDetails(appointment.id)}
                      >
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
      
      {/* Mobile View */}
      <Card className="bg-white lg:col-span-2 sm:hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Ближайшие приёмы</CardTitle>
            <Button 
              variant="link" 
              size="sm" 
              className="text-primary font-normal text-xs p-0 h-auto"
              onClick={() => window.location.href = "/clinic-admin/schedule"}
            >
              Смотреть все
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <div className="space-y-3">
            {appointments.map(appointment => (
              <Card key={appointment.id} className="p-3 border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{appointment.time}</span>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="h-auto p-0 text-primary text-xs"
                    onClick={() => onViewDetails(appointment.id)}
                  >
                    Детали
                  </Button>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Пациент:</span>
                    <span>{appointment.patient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Врач:</span>
                    <span>{appointment.doctor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Услуга:</span>
                    <span>{appointment.service}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
