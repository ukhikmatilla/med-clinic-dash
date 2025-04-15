
import { Link } from "react-router-dom";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Doctor } from "@/hooks/useDoctorsData";
import { MoreHorizontal, Eye, Edit, Trash2, Check, X, Clock, Award } from "lucide-react";

interface DoctorsListProps {
  doctors: Doctor[];
  onViewDoctor: (doctorId: string) => void;
  onEditDoctor: (doctorId: string) => void;
  onDeleteDoctor: (doctorId: string) => void;
}

export function DoctorsList({ 
  doctors,
  onViewDoctor,
  onEditDoctor,
  onDeleteDoctor
}: DoctorsListProps) {
  if (doctors.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground border rounded-md">
        Нет добавленных врачей
      </div>
    );
  }
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">ФИО</TableHead>
            <TableHead>Специальности</TableHead>
            <TableHead>Стаж</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Telegram ID</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell className="font-medium">
                <Link to={`/clinic-admin/doctor/${doctor.id}`} className="hover:underline">
                  {doctor.fullName}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {doctor.specialties && doctor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="mr-1">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                {doctor.experience ? (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>{doctor.experience}</span>
                  </div>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell>
                {doctor.category ? (
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>{doctor.category}</span>
                  </div>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell>{doctor.telegramId || "—"}</TableCell>
              <TableCell>
                {doctor.status === "active" ? (
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-1" />
                    <span>Активен</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <X className="h-4 w-4 text-red-500 mr-1" />
                    <span>Неактивен</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Открыть меню</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onViewDoctor(doctor.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Просмотр
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditDoctor(doctor.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDeleteDoctor(doctor.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
