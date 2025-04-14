
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Eye } from "lucide-react";
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { ViewDoctorDialog } from "./ViewDoctorDialog";

interface Doctor {
  id: string;
  fullName: string;
  specialties: string[];
  telegramId: string | null;
  schedule: Record<string, string>;
  services: string[];
  status: "active" | "inactive";
}

interface DoctorsTabProps {
  doctors?: Doctor[];
  isSuperAdmin?: boolean;
}

export function DoctorsTab({ doctors = [], isSuperAdmin = false }: DoctorsTabProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [viewDoctorOpen, setViewDoctorOpen] = useState(false);
  
  const formatSpecialties = (specialties: string[]) => {
    return specialties.join(", ");
  };
  
  const formatSchedule = (schedule: Record<string, string>) => {
    const days = Object.keys(schedule).filter(day => !!schedule[day]);
    if (days.length === 0) return "—";
    
    const firstDay = days[0];
    const lastDay = days[days.length - 1];
    
    return `${firstDay}–${lastDay} ${schedule[firstDay]}`;
  };
  
  const handleViewDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setViewDoctorOpen(true);
  };
  
  return (
    <>
      <Card className="bg-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Врачи</CardTitle>
            {!isSuperAdmin && (
              <Button size="sm">Добавить врача</Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Специальность(и)</TableHead>
                  <TableHead>Telegram ID</TableHead>
                  <TableHead>Расписание</TableHead>
                  <TableHead className="text-center">Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      Врачи не найдены
                    </TableCell>
                  </TableRow>
                ) : (
                  doctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell>{doctor.fullName}</TableCell>
                      <TableCell className="text-sm">{formatSpecialties(doctor.specialties)}</TableCell>
                      <TableCell className="text-sm">{doctor.telegramId || "—"}</TableCell>
                      <TableCell className="text-sm">{formatSchedule(doctor.schedule)}</TableCell>
                      <TableCell className="text-sm text-center">
                        {doctor.status === "active" && (
                          <Check className="mx-auto h-4 w-4 text-green-500" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleViewDoctor(doctor)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Просмотр
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <ViewDoctorDialog
        open={viewDoctorOpen}
        onOpenChange={setViewDoctorOpen}
        doctor={selectedDoctor}
      />
    </>
  );
}
