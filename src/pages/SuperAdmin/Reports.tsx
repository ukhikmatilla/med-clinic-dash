
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, BarChart, PieChart, LineChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SuperAdminReports() {
  const reportsList = [
    {
      name: "Активность клиник",
      description: "Посещаемость и загруженность за последний месяц",
      date: "14.04.2025",
      icon: <BarChart className="h-8 w-8 text-primary" />,
    },
    {
      name: "Финансовый отчёт",
      description: "Доходы и расходы по всем клиникам",
      date: "10.04.2025",
      icon: <LineChart className="h-8 w-8 text-primary" />,
    },
    {
      name: "Статистика врачей",
      description: "Эффективность и загруженность врачей",
      date: "05.04.2025",
      icon: <PieChart className="h-8 w-8 text-primary" />,
    },
    {
      name: "Демографический анализ",
      description: "Анализ пациентов по возрасту и полу",
      date: "01.04.2025",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Отчёты</h1>
            <p className="text-muted-foreground">
              Аналитика и отчёты по всем клиникам в системе
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Период" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">За неделю</SelectItem>
                <SelectItem value="month">За месяц</SelectItem>
                <SelectItem value="quarter">За квартал</SelectItem>
                <SelectItem value="year">За год</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Создать отчёт
            </Button>
          </div>
        </div>

        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="recent">Недавние отчёты</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="custom">Настраиваемые отчёты</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {reportsList.map((report) => (
                <Card key={report.name}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    {report.icon}
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Скачать отчёт</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <CardTitle>{report.name}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                      <p className="text-xs text-muted-foreground mt-2">
                        Создан: {report.date}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Аналитика по всей системе</CardTitle>
                <CardDescription>
                  Сводная статистика и ключевые показатели
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-12">
                  Графики аналитики будут отображены здесь
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="custom" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Настраиваемые отчёты</CardTitle>
                <CardDescription>
                  Создайте и настройте собственные отчёты
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-12">
                  Мастер создания отчётов будет здесь
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
}
