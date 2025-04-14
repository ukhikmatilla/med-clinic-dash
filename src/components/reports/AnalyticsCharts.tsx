
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, Tooltip, XAxis, YAxis, Bar, Line, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { SubscriptionTrend, RevenueData, IntegrationData } from "@/types/subscription";

interface AnalyticsChartsProps {
  subscriptionTrends: SubscriptionTrend[];
  revenueData: RevenueData[];
  integrationData: IntegrationData[];
}

export function AnalyticsCharts({ subscriptionTrends, revenueData, integrationData }: AnalyticsChartsProps) {
  // Format revenue for better display
  const formattedRevenueData = revenueData.map(item => ({
    ...item,
    crmRevenue: item.crmRevenue / 1000, // Convert to thousands
    crmTelegramRevenue: item.crmTelegramRevenue / 1000,
    total: item.total / 1000
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Финансовая аналитика</CardTitle>
          <CardDescription>Доход по месяцам и типам тарифов (тыс. сум)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formattedRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="crmRevenue" name="CRM" fill="#8884d8" />
                <Bar dataKey="crmTelegramRevenue" name="CRM + Telegram" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Тренд подписок</CardTitle>
          <CardDescription>Активные, новые и отмененные подписки</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={subscriptionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="activeSubscriptions" 
                  name="Активные" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="newSubscriptions" 
                  name="Новые" 
                  stroke="#82ca9d" 
                />
                <Line 
                  type="monotone" 
                  dataKey="cancelledSubscriptions" 
                  name="Отмененные" 
                  stroke="#ff7300" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Динамика интеграций</CardTitle>
          <CardDescription>Подключения к Google Calendar и Telegram</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={integrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="googleCalendar" 
                  name="Google Calendar" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="telegram" 
                  name="Telegram" 
                  stroke="#82ca9d" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
