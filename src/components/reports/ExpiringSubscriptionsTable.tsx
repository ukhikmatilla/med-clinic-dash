
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle } from "lucide-react";

interface ExpiringSubscription {
  clinicName: string;
  expiryDate: string;
  daysLeft: number;
}

interface ExpiringSubscriptionsTableProps {
  subscriptions: ExpiringSubscription[];
}

export function ExpiringSubscriptionsTable({ subscriptions }: ExpiringSubscriptionsTableProps) {
  if (!subscriptions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Истекающие подписки</CardTitle>
          <CardDescription>Подписки, которые скоро истекут</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8 text-muted-foreground">
            Нет подписок, которые скоро истекут
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Истекающие подписки</CardTitle>
        <CardDescription>Подписки, которые скоро истекут</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Клиника</TableHead>
              <TableHead>Дата истечения</TableHead>
              <TableHead>Осталось дней</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((subscription, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{subscription.clinicName}</TableCell>
                <TableCell>{subscription.expiryDate}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {subscription.daysLeft <= 7 ? (
                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                    ) : (
                      <Clock className="h-4 w-4 text-blue-500 mr-2" />
                    )}
                    {subscription.daysLeft} дней
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Продлить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
