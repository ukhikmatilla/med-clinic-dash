
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Appointment } from "../types/appointment";
import { getPaymentBadge, getStatusBadge } from "../utils/appointment-utils";

interface AppointmentsTableProps {
  appointments: Appointment[];
  onViewPatient: (patientId: string) => void;
}

export function AppointmentsTable({ appointments, onViewPatient }: AppointmentsTableProps) {
  return (
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
                  onClick={() => onViewPatient(appointment.patientId)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
