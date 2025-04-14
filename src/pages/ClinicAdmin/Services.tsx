
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { ClinicAdminSidebar } from "@/components/sidebars/ClinicAdminSidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ClinicAdminServices() {
  // This would come from your API in a real application
  const serviceCategories = [
    { 
      id: 1, 
      name: "🧬 Анализы", 
      services: [
        { id: 1, name: "Общий анализ крови + СОЭ", duration: 15, price: 50000 },
        { id: 2, name: "Концентрация гемоглобина (HGB)", duration: 10, price: 28000 },
        { id: 3, name: "Глюкоза натощак", duration: 10, price: 34000 },
        { id: 4, name: "Иммуноглобулин (IgE)", duration: 20, price: 78000 },
      ]
    },
    { 
      id: 2, 
      name: "🧪 Гормоны / Онкомаркеры", 
      services: [
        { id: 5, name: "ТТГ", duration: 30, price: 90000 },
        { id: 6, name: "Т3", duration: 30, price: 92000 },
        { id: 7, name: "Т4", duration: 30, price: 95000 },
        { id: 8, name: "Пролактин", duration: 30, price: 90000 },
        { id: 9, name: "ЛГ", duration: 30, price: 95000 },
        { id: 10, name: "Эстрадиол", duration: 30, price: 174000 },
        { id: 11, name: "ПСА общий", duration: 30, price: 123000 },
        { id: 12, name: "CA-125", duration: 30, price: 84000 },
      ]
    },
    { 
      id: 3, 
      name: "🦴 УЗИ", 
      services: [
        { id: 13, name: "УЗИ щитовидной железы", duration: 30, price: 90000 },
        { id: 14, name: "УЗИ для беременных", duration: 45, price: 106000 },
        { id: 15, name: "УЗИ сердца", duration: 40, price: 168000 },
        { id: 16, name: "УЗИ брюшной полости", duration: 30, price: 56000 },
      ]
    },
  ];
  
  return (
    <SidebarLayout sidebar={<ClinicAdminSidebar clinicName="Najot Shifo" />}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Услуги</h1>
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Добавить услугу
          </Button>
        </div>
        
        <Tabs defaultValue="list" className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="list">Список услуг</TabsTrigger>
              <TabsTrigger value="categories">По категориям</TabsTrigger>
              <TabsTrigger value="add">Добавить услугу</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск услуг..."
                className="pl-8 w-full sm:w-[260px]"
              />
            </div>
          </div>
          
          <TabsContent value="list" className="m-0">
            <Card className="bg-white">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left py-3 px-4 font-medium text-sm">Название услуги</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Категория</th>
                        <th className="text-center py-3 px-4 font-medium text-sm">Длительность (мин)</th>
                        <th className="text-right py-3 px-4 font-medium text-sm">Цена (сум)</th>
                        <th className="text-right py-3 px-4 font-medium text-sm">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceCategories.flatMap(category => 
                        category.services.map(service => (
                          <tr key={service.id} className="border-t hover:bg-muted/20">
                            <td className="py-3 px-4">{service.name}</td>
                            <td className="py-3 px-4 text-sm">{category.name}</td>
                            <td className="py-3 px-4 text-sm text-center">{service.duration}</td>
                            <td className="py-3 px-4 text-sm text-right">{service.price.toLocaleString()} сум</td>
                            <td className="py-3 px-4 text-sm text-right space-x-1">
                              <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-primary hover:bg-accent hover:text-accent-foreground">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-destructive hover:bg-destructive hover:text-destructive-foreground">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="m-0">
            <div className="space-y-6">
              {serviceCategories.map(category => (
                <Card key={category.id} className="bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle>{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium text-sm">Название</th>
                          <th className="text-center py-2 font-medium text-sm">Длительность</th>
                          <th className="text-right py-2 font-medium text-sm">Цена</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.services.map(service => (
                          <tr key={service.id} className="border-b last:border-0">
                            <td className="py-2 text-sm">{service.name}</td>
                            <td className="py-2 text-sm text-center">{service.duration} мин</td>
                            <td className="py-2 text-sm text-right">{service.price.toLocaleString()} сум</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="add" className="m-0">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Добавить новую услугу</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceName">Название услуги</Label>
                      <Input id="serviceName" placeholder="Введите название услуги" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="serviceCategory">Категория</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceCategories.map(category => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="new">+ Создать новую категорию</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="serviceDuration">Длительность (в минутах)</Label>
                      <Input 
                        id="serviceDuration" 
                        type="number" 
                        placeholder="Например: 30" 
                        min={5} 
                        step={5} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="servicePrice">Цена (в сумах)</Label>
                      <Input 
                        id="servicePrice" 
                        type="number" 
                        placeholder="Например: 50000" 
                        min={0} 
                        step={1000} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Назначить врачам</Label>
                    <div className="border rounded-md p-4 h-36 overflow-y-auto">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="doctor1" className="rounded text-primary focus:ring-primary" />
                          <label htmlFor="doctor1" className="text-sm">Ортиков Шерзод Одилбекович</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="doctor2" className="rounded text-primary focus:ring-primary" />
                          <label htmlFor="doctor2" className="text-sm">Рахимжонова Сайёра Файзуллаевна</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="doctor3" className="rounded text-primary focus:ring-primary" />
                          <label htmlFor="doctor3" className="text-sm">Каримова Дилором Эргашевна</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="doctor4" className="rounded text-primary focus:ring-primary" />
                          <label htmlFor="doctor4" className="text-sm">Закирова Гульноза Алишеровна</label>
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
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
}

export default ClinicAdminServices;
