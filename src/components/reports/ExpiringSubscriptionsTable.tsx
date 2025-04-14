
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExpiringSubscription {
  clinicName: string;
  clinicId: string;
  expiryDate: string;
  daysLeft: number;
}

interface ExpiringSubscriptionsTableProps {
  subscriptions: ExpiringSubscription[];
}

export function ExpiringSubscriptionsTable({ subscriptions }: ExpiringSubscriptionsTableProps) {
  const navigate = useNavigate();
  
  if (!subscriptions.length) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Истекающие подписки</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Клиника</TableHead>
              <TableHead>Дата истечения</TableHead>
              <TableHead>Дней осталось</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.clinicId}>
                <TableCell className="font-medium">{subscription.clinicName}</TableCell>
                <TableCell>
                  {new Date(subscription.expiryDate).toLocaleDateString("ru-RU")}
                </TableCell>
                <TableCell>
                  <span className={
                    subscription.daysLeft <= 7 
                    ? "text-red-500 font-semibold" 
                    : subscription.daysLeft <= 14 
                    ? "text-amber-500 font-medium" 
                    : "text-emerald-600"
                  }>
                    {subscription.daysLeft} {getWordForm(subscription.daysLeft)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/super-admin/clinic/${subscription.clinicId}`)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Открыть
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

// Helper function to get the correct form of "day" in Russian
function getWordForm(days: number): string {
  if (days % 100 >= 11 && days % 100 <= 19) {
    return "дней";
  }
  
  switch (days % 10) {
    case 1:
      return "день";
    case 2:
    case 3:
    case 4:
      return "дня";
    default:
      return "дней";
  }
}
