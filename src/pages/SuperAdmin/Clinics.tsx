
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, XCircle, Search, Edit, Trash2, Eye, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ClinicCard } from "@/components/dashboard/ClinicCard";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { AddEditClinicDialog } from "@/components/clinics/AddEditClinicDialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

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

export function SuperAdminClinics() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>([
    { 
      id: 1, 
      name: "Najot Shifo", 
      admin: "@najot", 
      email: "admin@najotshifo.uz",
      doctors: 10, 
      patients: 800, 
      subscription: "01.06.2025", 
      subscriptionActive: true,
      hasGCalendar: true,
      plan: "CRM + Telegram",
      doctorsLimit: 20,
      telegramBotPatient: "@najot_med_bot",
      telegramBotDoctor: "@najot_doctor_bot", 
      timezone: "Ташкент (UTC+5)"
    },
  ]);
  
  // Filter clinics based on search query
  const filteredClinics = clinics.filter(clinic => 
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    clinic.admin.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Function to handle clinic deletion
  const handleDeleteClinic = (id: number) => {
    setClinics(clinics.filter(clinic => clinic.id !== id));
    toast({
      title: "Клиника удалена",
      description: "Клиника была успешно удалена из системы",
    });
  };

  // Function to handle adding a new clinic
  const handleAddClinic = (clinic: Omit<Clinic, "id">) => {
    const newClinic = {
      ...clinic,
      id: clinics.length > 0 ? Math.max(...clinics.map(c => c.id)) + 1 : 1
    };
    setClinics([...clinics, newClinic]);
    setIsAddDialogOpen(false);
    toast({
      title: "Клиника добавлена",
      description: "Новая клиника была успешно добавлена в систему",
    });
  };

  // Function to handle editing a clinic
  const handleEditClinic = (updatedClinic: Clinic) => {
    setClinics(clinics.map(clinic => 
      clinic.id === updatedClinic.id ? updatedClinic : clinic
    ));
    setEditingClinic(null);
    toast({
      title: "Клиника обновлена",
      description: "Данные клиники были успешно обновлены",
    });
  };
  
  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="p-2 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
          <h1 className="text-xl sm:text-2xl font-bold">Клиники</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Добавить клинику
          </Button>
        </div>
        
        <div className="mb-4 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск клиник по названию или ID администратора..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Показываем сообщение, если клиники не найдены */}
        {filteredClinics.length === 0 && (
          <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-md">
            <p>Клиники не найдены</p>
            <p className="text-sm">Попробуйте изменить параметры поиска</p>
          </div>
        )}
        
        {filteredClinics.length > 0 && (
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
                        {filteredClinics.map(clinic => (
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
                            <TableCell className="text-sm text-right space-x-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                                <a href={`/super-admin/clinic/${clinic.id}`}>
                                  <Eye className="h-4 w-4" />
                                </a>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => setEditingClinic(clinic)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Удалить клинику?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Вы действительно хотите удалить клинику "{clinic.name}"? Это действие невозможно отменить.
                                      Все данные клиники будут безвозвратно удалены.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteClinic(clinic.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Удалить
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
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
              {filteredClinics.map(clinic => (
                <ClinicCard
                  key={clinic.id}
                  id={clinic.id}
                  name={clinic.name}
                  admin={clinic.admin}
                  doctors={clinic.doctors}
                  patients={clinic.patients}
                  subscription={clinic.subscription}
                  hasGCalendar={clinic.hasGCalendar}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Add Clinic Dialog */}
      <AddEditClinicDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddClinic}
      />
      
      {/* Edit Clinic Dialog */}
      {editingClinic && (
        <AddEditClinicDialog
          open={!!editingClinic}
          onOpenChange={(open) => !open && setEditingClinic(null)}
          onSubmit={handleEditClinic}
          clinic={editingClinic}
        />
      )}
    </SidebarLayout>
  );
}

export default SuperAdminClinics;
