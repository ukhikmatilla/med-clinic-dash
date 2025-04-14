
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, XCircle, ToggleLeft, ToggleRight } from "lucide-react";

export function SuperAdminClinicProfile() {
  // This would come from your API in a real application
  const clinic = {
    id: 1,
    name: "Najot Shifo",
    description: "Центр высококачественной медицины с опытом более 12 лет. Современные технологии и квалифицированные врачи.",
    admin: "@najot",
    doctors: 10,
    patients: 800,
    subscription: {
      status: "active",
      expiryDate: "01.06.2025",
      plan: "CRM + Telegram",
      autoRenewal: true
    },
    integrations: {
      googleCalendar: true,
      telegramBot: {
        connected: true,
        id: "@najot_med_bot"
      }
    }
  };
  
  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{clinic.name}</h1>
          <div className="space-x-2">
            <Button variant="outline">Назад</Button>
            <Button variant="outline">Редактировать</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Clinic Info */}
          <Card className="bg-white md:col-span-2">
            <CardHeader>
              <CardTitle>Информация о клинике</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Описание</h3>
                <p>{clinic.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Админ</h3>
                  <p>{clinic.admin}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Количество врачей</h3>
                  <p>{clinic.doctors}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Количество пациентов</h3>
                  <p>{clinic.patients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Subscription Info */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Подписка</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-medical-light-blue p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Статус:</span>
                  <span className="flex items-center font-medium">
                    <Check className="mr-1 h-3 w-3 text-green-500" /> 
                    Активна
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Тип тарифа</h3>
                <p>{clinic.subscription.plan}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Действует до</h3>
                <p>{clinic.subscription.expiryDate}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Автопродление</h3>
                <div className="flex items-center">
                  {clinic.subscription.autoRenewal ? (
                    <>
                      <ToggleRight className="mr-2 h-5 w-5 text-primary" />
                      <span>ВКЛ</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>ВЫКЛ</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button>Продлить</Button>
                <Button variant="outline">Изменить тариф</Button>
                <Button variant="outline" className="text-destructive hover:text-destructive">Отключить</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="doctors">
          <TabsList className="mb-4">
            <TabsTrigger value="doctors">Врачи</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          </TabsList>
          
          <TabsContent value="doctors">
            <Card className="bg-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Врачи</CardTitle>
                  <Button size="sm">Добавить врача</Button>
                </div>
              </CardHeader>
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="py-3 px-4">Ортиков Шерзод Одилбекович</td>
                        <td className="py-3 px-4 text-sm">Дерматолог, Косметолог</td>
                        <td className="py-3 px-4 text-sm">—</td>
                        <td className="py-3 px-4 text-sm">Пн–Сб 14:00–17:00</td>
                        <td className="py-3 px-4 text-sm text-center">
                          <Check className="mx-auto h-4 w-4 text-green-500" />
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-3 px-4">Рахимжонова Сайёра Файзуллаевна</td>
                        <td className="py-3 px-4 text-sm">УЗИ-специалист</td>
                        <td className="py-3 px-4 text-sm">—</td>
                        <td className="py-3 px-4 text-sm">Пн–Сб 09:30–16:00</td>
                        <td className="py-3 px-4 text-sm text-center">
                          <Check className="mx-auto h-4 w-4 text-green-500" />
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-3 px-4">Каримова Дилором Эргашевна</td>
                        <td className="py-3 px-4 text-sm">Акушер, Гинеколог</td>
                        <td className="py-3 px-4 text-sm">—</td>
                        <td className="py-3 px-4 text-sm">Пн–Пт 09:00–14:00</td>
                        <td className="py-3 px-4 text-sm text-center">
                          <Check className="mx-auto h-4 w-4 text-green-500" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="services">
            <Card className="bg-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Услуги</CardTitle>
                  <Button size="sm">Добавить услугу</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">🧬 Анализы</h3>
                    <ul className="space-y-1">
                      <li className="flex justify-between">
                        <span>Общий анализ крови + СОЭ</span>
                        <span className="font-medium">50 000 сум</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Концентрация гемоглобина (HGB)</span>
                        <span className="font-medium">28 000 сум</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Глюкоза натощак</span>
                        <span className="font-medium">34 000 сум</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">🦴 УЗИ</h3>
                    <ul className="space-y-1">
                      <li className="flex justify-between">
                        <span>УЗИ щитовидной железы</span>
                        <span className="font-medium">90 000 сум</span>
                      </li>
                      <li className="flex justify-between">
                        <span>УЗИ для беременных</span>
                        <span className="font-medium">106 000–202 000 сум</span>
                      </li>
                      <li className="flex justify-between">
                        <span>УЗИ сердца</span>
                        <span className="font-medium">168 000 сум</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Интеграции</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 font-medium">Интеграция</th>
                      <th className="text-left py-3 font-medium">Статус</th>
                      <th className="text-right py-3 font-medium">Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4">Google Calendar</td>
                      <td className="py-4">
                        {clinic.integrations.googleCalendar ? (
                          <div className="flex items-center">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            <span>Подключено</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <XCircle className="mr-2 h-4 w-4 text-red-500" />
                            <span>Не подключено</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        <Button variant="outline" size="sm">⚙️ Настроить</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4">Telegram Bot</td>
                      <td className="py-4">
                        {clinic.integrations.telegramBot.connected ? (
                          <div className="flex items-center">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            <span>Подключен {clinic.integrations.telegramBot.id}</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <XCircle className="mr-2 h-4 w-4 text-red-500" />
                            <span>Не подключен</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        <Button variant="outline" size="sm">🔗 Проверить ID</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
}

export default SuperAdminClinicProfile;
