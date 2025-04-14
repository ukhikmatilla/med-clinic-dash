
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Check, XCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ClinicActions } from "./ClinicActions";
import { ClinicCard } from "@/components/dashboard/ClinicCard";

interface Clinic {
  id: number;
  name: string;
  admin: string;
  email?: string;
  doctors: number;
  patients: number;
  subscription: string;
  subscriptionActive: boolean;
  hasGCalendar: boolean;
  plan?: string;
  doctorsLimit?: number;
  telegramBotPatient?: string;
  telegramBotDoctor?: string;
  timezone?: string;
}

interface ClinicsTableProps {
  clinics: Clinic[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function ClinicsTable({ clinics, onEdit, onDelete }: ClinicsTableProps) {
  if (clinics.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-md">
        <p>Клиники не найдены</p>
        <p className="text-sm">Попробуйте изменить параметры поиска</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table view */}
      <div className="hidden md:block">
        <Card className="bg-white">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-medium text-sm">Название клиники</TableHead>
                    <TableHead className="font-medium text-sm">Админ (Telegram ID)</TableHead>
                    <TableHead className="text-center font-medium text-sm">Врачей</TableHead>
                    <TableHead className="text-center font-medium text-sm">Пациентов</TableHead>
                    <TableHead className="font-medium text-sm">Подписка</TableHead>
                    <TableHead className="text-center font-medium text-sm">GCalendar</TableHead>
                    <TableHead className="text-right font-medium text-sm">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clinics.map(clinic => (
                    <TableRow key={clinic.id} className="hover:bg-muted/20">
                      <TableCell>{clinic.name}</TableCell>
                      <TableCell className="text-sm">{clinic.admin}</TableCell>
                      <TableCell className="text-sm text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>{clinic.doctors}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Активных врачей: {clinic.doctors}</p>
                              <p>Лимит: {clinic.doctorsLimit || "∞"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-sm text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>{clinic.patients}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Всего пациентов: {clinic.patients}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-sm">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="flex items-center">
                                {clinic.subscriptionActive ? (
                                  <>
                                    <Check className="mr-1 h-3 w-3 text-green-500" /> 
                                    Оплачено до {clinic.subscription}
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="mr-1 h-3 w-3 text-red-500" />
                                    Не оплачено
                                  </>
                                )}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {clinic.subscriptionActive 
                                  ? `Подписка активна до ${clinic.subscription}` 
                                  : "Подписка не активна - доступ ограничен"}
                              </p>
                              {clinic.plan && <p>Тариф: {clinic.plan}</p>}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-sm text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              {clinic.hasGCalendar ? 
                                <Check className="mx-auto h-4 w-4 text-green-500" /> : 
                                <XCircle className="mx-auto h-4 w-4 text-red-500" />}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{clinic.hasGCalendar ? "Подключено" : "Не подключено"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <ClinicActions 
                          clinicId={clinic.id}
                          clinicName={clinic.name}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {clinics.map(clinic => (
          <ClinicCard
            key={clinic.id}
            id={clinic.id}
            name={clinic.name}
            admin={clinic.admin}
            doctors={clinic.doctors}
            patients={clinic.patients}
            subscription={clinic.subscription}
            hasGCalendar={clinic.hasGCalendar}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}
