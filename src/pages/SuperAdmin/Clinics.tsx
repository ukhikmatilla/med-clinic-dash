
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, XCircle, Search, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SuperAdminClinics() {
  // This would come from your API in a real application
  const clinics = [
    { id: 1, name: "Najot Shifo", admin: "@najot", doctors: 10, patients: 800, subscription: "01.06.2025", hasGCalendar: true },
    { id: 2, name: "MediPlus", admin: "@mediplus", doctors: 8, patients: 620, subscription: "15.05.2025", hasGCalendar: false },
    { id: 3, name: "Здоровье+", admin: "@zdorovie", doctors: 12, patients: 950, subscription: "07.03.2025", hasGCalendar: true },
    { id: 4, name: "Клиника Доктора Иванова", admin: "@ivanov", doctors: 5, patients: 420, subscription: "23.04.2025", hasGCalendar: true },
    { id: 5, name: "МедЦентр", admin: "@medcenter", doctors: 15, patients: 1200, subscription: "10.06.2025", hasGCalendar: true },
    { id: 6, name: "Центр Диагностики", admin: "@diagnostika", doctors: 7, patients: 560, subscription: "30.05.2025", hasGCalendar: false },
    { id: 7, name: "ДокторПлюс", admin: "@doctorplus", doctors: 9, patients: 780, subscription: "12.07.2025", hasGCalendar: true },
  ];
  
  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="p-2 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
          <h1 className="text-xl sm:text-2xl font-bold">Клиники</h1>
          <Button>Добавить клинику</Button>
        </div>
        
        <div className="mb-4 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск клиник..."
              className="pl-8"
            />
          </div>
        </div>
        
        {/* Desktop table view */}
        <div className="hidden md:block">
          <Card className="bg-white">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left py-3 px-4 font-medium text-sm">Название клиники</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Админ (Telegram ID)</th>
                      <th className="text-center py-3 px-4 font-medium text-sm">Врачей</th>
                      <th className="text-center py-3 px-4 font-medium text-sm">Пациентов</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Подписка</th>
                      <th className="text-center py-3 px-4 font-medium text-sm">GCalendar</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clinics.map(clinic => (
                      <tr key={clinic.id} className="border-t hover:bg-muted/20">
                        <td className="py-3 px-4">{clinic.name}</td>
                        <td className="py-3 px-4 text-sm">{clinic.admin}</td>
                        <td className="py-3 px-4 text-sm text-center">{clinic.doctors}</td>
                        <td className="py-3 px-4 text-sm text-center">{clinic.patients}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="flex items-center">
                            <Check className="mr-1 h-3 w-3 text-green-500" /> 
                            Оплачено до {clinic.subscription}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-center">
                          {clinic.hasGCalendar ? 
                            <Check className="mx-auto h-4 w-4 text-green-500" /> : 
                            <XCircle className="mx-auto h-4 w-4 text-red-500" />}
                        </td>
                        <td className="py-3 px-4 text-sm text-right space-x-2">
                          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-primary hover:bg-accent hover:text-accent-foreground">
                            <Search className="h-4 w-4" />
                          </button>
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
        <div className="md:hidden space-y-4">
          {clinics.map(clinic => (
            <Card key={clinic.id} className="bg-white">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{clinic.name}</h3>
                  <div className="flex space-x-1">
                    <button className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background p-0 text-xs font-medium text-primary">
                      <Search className="h-3 w-3" />
                    </button>
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
                    <span className="text-muted-foreground">Админ:</span>
                    <div>{clinic.admin}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Врачей:</span>
                    <div>{clinic.doctors}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Пациентов:</span>
                    <div>{clinic.patients}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">GCalendar:</span>
                    <div>
                      {clinic.hasGCalendar ? 
                        <Check className="h-4 w-4 text-green-500" /> : 
                        <XCircle className="h-4 w-4 text-red-500" />}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Подписка:</span>
                    <div className="flex items-center">
                      <Check className="mr-1 h-3 w-3 text-green-500" /> 
                      Оплачено до {clinic.subscription}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}

export default SuperAdminClinics;
