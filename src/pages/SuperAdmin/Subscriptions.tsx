
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Package, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuperAdminSubscriptions() {
  const subscriptionPlans = [
    {
      name: "Базовый",
      price: "10,000₽",
      period: "в месяц",
      features: [
        { name: "До 5 клиник", available: true },
        { name: "До 20 врачей", available: true },
        { name: "Базовая аналитика", available: true },
        { name: "Email поддержка", available: true },
        { name: "API интеграции", available: false },
        { name: "Расширенная отчётность", available: false },
      ],
      current: false,
    },
    {
      name: "Корпоративный",
      price: "25,000₽",
      period: "в месяц",
      features: [
        { name: "Неограниченное число клиник", available: true },
        { name: "Неограниченное число врачей", available: true },
        { name: "Расширенная аналитика", available: true },
        { name: "Приоритетная поддержка 24/7", available: true },
        { name: "API интеграции", available: true },
        { name: "Расширенная отчётность", available: true },
      ],
      current: true,
    },
  ];

  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Управление подписками</h1>
          <p className="text-muted-foreground">
            Просмотр и управление подписками для всех клиник в системе
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>Тарифный план</CardDescription>
                  </div>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="mt-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center">
                        {feature.available ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <XCircle className="h-4 w-4 text-muted-foreground mr-2" />
                        )}
                        <span className={feature.available ? "" : "text-muted-foreground"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.current ? "default" : "outline"}>
                    {plan.current ? "Текущий план" : "Выбрать план"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>История платежей</CardTitle>
              <CardDescription>
                Последние транзакции по всем подпискам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">Клиника Здоровье+</p>
                    <p className="text-sm text-muted-foreground">Корпоративный тариф - Апрель 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">25,000₽</p>
                    <p className="text-sm text-muted-foreground">10.04.2025</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">Медицинский центр "Забота"</p>
                    <p className="text-sm text-muted-foreground">Базовый тариф - Апрель 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">10,000₽</p>
                    <p className="text-sm text-muted-foreground">05.04.2025</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Клиника "Семейная"</p>
                    <p className="text-sm text-muted-foreground">Корпоративный тариф - Апрель 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">25,000₽</p>
                    <p className="text-sm text-muted-foreground">02.04.2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
}
