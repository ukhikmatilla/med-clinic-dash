
import { useState } from "react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Eye, Pencil, Trash2, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Doctor {
  id: string;
  fullName: string;
  specialties: string[];
  status: "active" | "inactive";
  schedule: Record<string, string>;
  experience?: string;
  category?: string;
}

interface DoctorsListProps {
  doctors: Doctor[];
  onViewDoctor: (doctor: Doctor) => void;
  onEditDoctor: (doctor: Doctor) => void;
  onDeleteDoctor: (doctor: Doctor) => void;
}

export function DoctorsList({ 
  doctors, 
  onViewDoctor, 
  onEditDoctor, 
  onDeleteDoctor 
}: DoctorsListProps) {
  return (
    <>
      {/* Desktop table view */}
      <div className="hidden md:block">
        <Card className="bg-white">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-3 px-4 font-medium text-sm">ФИО</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Специальность(и)</th>
                    <th className="text-left py-3 px-4 font-medium text-sm whitespace-nowrap">
                      <Clock className="h-3.5 w-3.5 inline mr-1" /> Стаж
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm whitespace-nowrap">
                      <Award className="h-3.5 w-3.5 inline mr-1" /> Категория
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Расписание</th>
                    <th className="text-center py-3 px-4 font-medium text-sm">Статус</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-muted-foreground">
                        Врачи не найдены
                      </td>
                    </tr>
                  ) : (
                    doctors.map((doctor) => {
                      const scheduleString = Object.keys(doctor.schedule).length > 0
                        ? `${Object.keys(doctor.schedule)[0]}-${Object.keys(doctor.schedule)[Object.keys(doctor.schedule).length - 1]} ${Object.values(doctor.schedule)[0]}`
                        : "Не указано";
                        
                      return (
                        <tr key={doctor.id} className="border-t hover:bg-muted/20">
                          <td className="py-3 px-4">{doctor.fullName}</td>
                          <td className="py-3 px-4 text-sm">{doctor.specialties.join(", ")}</td>
                          <td className="py-3 px-4 text-sm">{doctor.experience || "—"}</td>
                          <td className="py-3 px-4 text-sm">{doctor.category || "—"}</td>
                          <td className="py-3 px-4 text-sm">{scheduleString}</td>
                          <td className="py-3 px-4 text-sm text-center">
                            {doctor.status === "active" ? (
                              <Badge variant="success">
                                Активен
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                Неактивен
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm text-right space-x-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => onViewDoctor(doctor)}
                              title="Просмотр"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => onEditDoctor(doctor)}
                              title="Редактировать"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => onDeleteDoctor(doctor)}
                              title="Удалить"
                              className="text-destructive hover:text-destructive/80"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {doctors.length === 0 ? (
          <Card className="bg-white">
            <CardContent className="p-4 text-center text-muted-foreground">
              Врачи не найдены
            </CardContent>
          </Card>
        ) : (
          doctors.map((doctor) => {
            const scheduleString = Object.keys(doctor.schedule).length > 0
              ? `${Object.keys(doctor.schedule)[0]}-${Object.keys(doctor.schedule)[Object.keys(doctor.schedule).length - 1]} ${Object.values(doctor.schedule)[0]}`
              : "Не указано";
              
            return (
              <Card key={doctor.id} className="bg-white">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-sm">{doctor.fullName}</h3>
                      <p className="text-xs text-muted-foreground">{doctor.specialties.join(", ")}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2"
                        onClick={() => onViewDoctor(doctor)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2"
                        onClick={() => onEditDoctor(doctor)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-destructive hover:text-destructive/80"
                        onClick={() => onDeleteDoctor(doctor)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-0.5" /> Стаж:
                      </span>
                      <div>{doctor.experience || "—"}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        <Award className="h-3 w-3 inline mr-0.5" /> Категория:
                      </span>
                      <div>{doctor.category || "—"}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Статус:</span>
                      <div className="flex items-center mt-0.5">
                        {doctor.status === "active" ? (
                          <Badge variant="success" className="text-[10px] px-1">
                            Активен
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="text-[10px] px-1">
                            Неактивен
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Расписание:</span>
                      <div>{scheduleString}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </>
  );
}
