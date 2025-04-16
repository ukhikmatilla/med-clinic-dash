import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Check, Clock, Ban, Search, Calendar, Filter, Eye } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PatientDetailsDialog } from "@/components/clinics/doctor-profile/PatientDetailsDialog";

interface Doctor {
  id: string;
  fullName: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  patientName: string;
  patientId: string;
  service: string;
  paymentStatus: "paid" | "unpaid" | "partial" | "refunded";
  status: "completed" | "upcoming" | "cancelled" | "missed";
}

interface DoctorAppointmentsTabProps {
  doctor: Doctor;
}

export function DoctorAppointmentsTab({ doctor }: DoctorAppointmentsTabProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [patientDetailsOpen, setPatientDetailsOpen] = useState(false);
  
  // Updated appointments data with Uzbek names
  const appointments: Appointment[] = [
    {
      id: "appt1",
      date: "15.04.2025",
      time: "14:30",
      patientName: "Azimov Bobur",
      patientId: "patient1",
      service: "Первичная консультация",
      paymentStatus: "paid",
      status: "completed"
    },
    {
      id: "appt2",
      date: "15.04.2025",
      time: "15:45",
      patientName: "Karimova Dilnoza",
      patientId: "patient2",
      service: "УЗИ щитовидной железы",
      paymentStatus: "unpaid",
      status: "upcoming"
    },
    {
      id: "appt3",
      date: "16.04.2025",
      time: "14:15",
      patientName: "Rahimov Jahongir",
      patientId: "patient3",
      service: "Повторная консультация",
      paymentStatus: "partial",
      status: "upcoming"
    },
    {
      id: "appt4",
      date: "14.04.2025",
      time: "16:30",
      patientName: "Nuriddinova Madina",
      patientId: "patient4",
      service: "ЭКГ",
      paymentStatus: "paid",
      status: "missed"
    },
    {
      id: "appt5",
      date: "13.04.2025",
      time: "15:00",
      patientName: "Yusupov Alisher",
      patientId: "patient5",
      service: "Консультация",
      paymentStatus: "refunded",
      status: "cancelled"
    },
  ];
  
  const handleViewPatient = (patientId: string) => {
    setSelectedPatient(patientId);
    setPatientDetailsOpen(true);
  };
  
  // Get appointment status badge
  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="success" className="min-w-24 justify-center">
            <Check className="h-3 w-3 mr-1" />
            Завершен
          </Badge>
        );
      case "upcoming":
        return (
          <Badge variant="outline" className="min-w-24 justify-center">
            <Clock className="h-3 w-3 mr-1" />
            Предстоит
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive" className="min-w-24 justify-center">
            <Ban className="h-3 w-3 mr-1" />
            Отменен
          </Badge>
        );
      case "missed":
        return (
          <Badge variant="warning" className="min-w-24 justify-center">
            <Clock className="h-3 w-3 mr-1" />
            Пропущен
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Get payment status badge
  const getPaymentBadge = (status: Appointment['paymentStatus']) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Оплачено</Badge>;
      case "unpaid":
        return <Badge variant="destructive">Не оплачено</Badge>;
      case "partial":
        return <Badge variant="warning">Частично</Badge>;
      case "refunded":
        return <Badge variant="outline">Возврат</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">История приёмов</CardTitle>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Filter className="h-4 w-4 mr-2" />
              Фильтры
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Календарь
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="mb-4">
            <CollapsibleContent className="bg-muted/50 p-4 rounded-md space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Дата</label>
                  <input 
                    type="date" 
                    className="w-full rounded-md border px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Статус</label>
                  <select className="w-full rounded-md border px-3 py-2 text-sm">
                    <option value="">Все статусы</option>
                    <option value="completed">Завершенные</option>
                    <option value="upcoming">Предстоящие</option>
                    <option value="cancelled">Отмененные</option>
                    <option value="missed">Пропущенные</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Услуга</label>
                  <select className="w-full rounded-md border px-3 py-2 text-sm">
                    <option value="">Все услуги</option>
                    <option value="consultation">Консультация</option>
                    <option value="procedure">Процедура</option>
                    <option value="test">Анализы</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">Сбросить</Button>
                <Button size="sm">Применить</Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="search" 
              placeholder="Поиск по имени пациента..." 
              className="w-full rounded-md border pl-9 pr-4 py-2 text-sm"
            />
          </div>
          
          {appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Время</TableHead>
                    <TableHead>Пациент</TableHead>
                    <TableHead>Услуга</TableHead>
                    <TableHead>Оплата</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>{getPaymentBadge(appointment.paymentStatus)}</TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewPatient(appointment.patientId)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              У врача нет записей на приём
            </div>
          )}
        </CardContent>
      </Card>
      
      <PatientDetailsDialog
        open={patientDetailsOpen}
        onOpenChange={setPatientDetailsOpen}
        patientId={selectedPatient}
      />
    </>
  );
}
