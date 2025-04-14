
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { ClinicAdminSidebar } from "@/components/sidebars/ClinicAdminSidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Search, Edit, Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ClinicAdminDoctors() {
  // This would come from your API in a real application
  const doctors = [
    { id: 1, name: "Ортиков Шерзод Одилбекович", specialties: ["Дерматолог", "Косметолог"], telegramId: "", schedule: "Пн–Сб 14:00–17:00", isActive: true },
    { id: 2, name: "Рахимжонова Сайёра Файзуллаевна", specialties: ["УЗИ-специалист"], telegramId: "", schedule: "Пн–Сб 09:30–16:00", isActive: true },
    { id: 3, name: "Каримова Дилором Эргашевна", specialties: ["Акушер", "Гинеколог"], telegramId: "", schedule: "Пн–Пт 09:00–14:00", isActive: true },
    { id: 4, name: "Закирова Гульноза Алишеровна", specialties: ["Кардиолог", "Терапевт"], telegramId: "", schedule: "Не указано", isActive: true },
    { id: 5, name: "Алимов Рустам Рахимович", specialties: ["УЗИ-специалист"], telegramId: "", schedule: "Не указано", isActive: true },
    { id: 6, name: "Эронов Мирзокул Мардонович", specialties: ["Терапевт", "Кардиохирург"], telegramId: "", schedule: "Пн–Сб 09:00–14:00", isActive: true },
    { id: 7, name: "Раджапов Фаррух Кувондикович", specialties: ["Андролог", "Уролог"], telegramId: "", schedule: "Пн–Пт 09:00–15:00", isActive: true },
    { id: 8, name: "Каршиев Ойбек Абсаломович", specialties: ["Невролог", "Нейрофизиолог"], telegramId: "", schedule: "Пн–Сб 09:00–15:00", isActive: true },
    { id: 9, name: "Тураханова Дилорам", specialties: ["Массажист"], telegramId: "", schedule: "Не указано", isActive: true },
  ];
  
  return (
    <SidebarLayout sidebar={<ClinicAdminSidebar clinicName="Najot Shifo" />}>
      <div className="p-2 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
          <h1 className="text-xl sm:text-2xl font-bold">Врачи</h1>
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Добавить врача
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <TabsList className="mb-0">
              <TabsTrigger value="all" className="text-xs sm:text-sm">Все врачи</TabsTrigger>
              <TabsTrigger value="active" className="text-xs sm:text-sm">Активные</TabsTrigger>
              <TabsTrigger value="inactive" className="text-xs sm:text-sm">Неактивные</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск врачей..."
                className="pl-8 w-full sm:w-[260px]"
              />
            </div>
          </div>
          
          <TabsContent value="all" className="m-0">
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
                          <th className="text-left py-3 px-4 font-medium text-sm">Telegram ID</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Расписание</th>
                          <th className="text-center py-3 px-4 font-medium text-sm">Статус</th>
                          <th className="text-right py-3 px-4 font-medium text-sm">Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctors.map(doctor => (
                          <tr key={doctor.id} className="border-t hover:bg-muted/20">
                            <td className="py-3 px-4">{doctor.name}</td>
                            <td className="py-3 px-4 text-sm">{doctor.specialties.join(", ")}</td>
                            <td className="py-3 px-4 text-sm">{doctor.telegramId || "—"}</td>
                            <td className="py-3 px-4 text-sm">{doctor.schedule}</td>
                            <td className="py-3 px-4 text-sm text-center">
                              {doctor.isActive ? (
                                <Check className="mx-auto h-4 w-4 text-green-500" />
                              ) : (
                                <span className="inline-flex mx-auto h-2 w-2 rounded-full bg-red-500" />
                              )}
                            </td>
                            <td className="py-3 px-4 text-sm text-right space-x-1">
                              <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-primary hover:bg-accent hover:text-accent-foreground">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-destructive hover:bg-destructive hover:text-destructive-foreground">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Mobile card view */}
            <div className="md:hidden space-y-3">
              {doctors.map(doctor => (
                <Card key={doctor.id} className="bg-white">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-sm">{doctor.name}</h3>
                        <p className="text-xs text-muted-foreground">{doctor.specialties.join(", ")}</p>
                      </div>
                      <div className="flex space-x-1">
                        <button className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background p-0 text-xs font-medium text-primary">
                          <Edit className="h-3 w-3" />
                        </button>
                        <button className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background p-0 text-xs font-medium text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Telegram ID:</span>
                        <div>{doctor.telegramId || "—"}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Статус:</span>
                        <div className="flex items-center">
                          {doctor.isActive ? (
                            <><Check className="h-3 w-3 text-green-500 mr-1" /> Активен</>
                          ) : (
                            <><span className="inline-flex h-2 w-2 rounded-full bg-red-500 mr-1" /> Неактивен</>
                          )}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Расписание:</span>
                        <div>{doctor.schedule}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="m-0">
            <Card className="bg-white">
              <CardContent className="p-4 sm:p-6 text-center text-muted-foreground text-xs sm:text-sm">
                Отображены только активные врачи
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive" className="m-0">
            <Card className="bg-white">
              <CardContent className="p-4 sm:p-6 text-center text-muted-foreground text-xs sm:text-sm">
                Отображены только неактивные врачи
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Doctor Form Card */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Добавить нового врача</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-xs sm:text-sm font-medium">
                    ФИО
                  </label>
                  <Input id="fullName" placeholder="Введите полное имя" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="telegramId" className="text-xs sm:text-sm font-medium">
                    Telegram ID
                  </label>
                  <Input id="telegramId" placeholder="Например: @doctor_name" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="specialties" className="text-xs sm:text-sm font-medium">
                    Специальность
                  </label>
                  <Input id="specialties" placeholder="Например: Кардиолог, Терапевт" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="schedule" className="text-xs sm:text-sm font-medium">
                    Расписание
                  </label>
                  <Input id="schedule" placeholder="Например: Пн-Пт 09:00-17:00" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium">Статус</label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="status" className="rounded text-primary focus:ring-primary" defaultChecked />
                  <label htmlFor="status" className="text-xs sm:text-sm">Активен</label>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium">Услуги</label>
                <div className="border rounded-md p-3 sm:p-4 h-36 overflow-y-auto">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="service1" className="rounded text-primary focus:ring-primary" />
                      <label htmlFor="service1" className="text-xs sm:text-sm">Консультация (50 000 сум)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="service2" className="rounded text-primary focus:ring-primary" />
                      <label htmlFor="service2" className="text-xs sm:text-sm">УЗИ щитовидной железы (90 000 сум)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="service3" className="rounded text-primary focus:ring-primary" />
                      <label htmlFor="service3" className="text-xs sm:text-sm">Анализ крови (50 000 сум)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="service4" className="rounded text-primary focus:ring-primary" />
                      <label htmlFor="service4" className="text-xs sm:text-sm">ЭКГ (168 000 сум)</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">Сохранить</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}

export default ClinicAdminDoctors;
