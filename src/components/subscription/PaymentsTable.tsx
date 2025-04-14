
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PaymentHistory } from "@/types/subscription";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface PaymentsTableProps {
  payments: PaymentHistory[];
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  // Форматирование даты в локальный формат
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Рендер статуса платежа с иконкой
  const renderStatus = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Успешно</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-amber-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>В обработке</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center text-red-500">
            <XCircle className="h-4 w-4 mr-1" />
            <span>Ошибка</span>
          </div>
        );
      default:
        return status;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Дата</TableHead>
            <TableHead>Сумма</TableHead>
            <TableHead>Тариф</TableHead>
            <TableHead>Статус</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{formatDate(payment.date)}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{payment.planName}</TableCell>
              <TableCell>{renderStatus(payment.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
