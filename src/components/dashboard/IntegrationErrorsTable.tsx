
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface IntegrationError {
  id: number;
  clinic: string;
  type: string;
  error: string;
  date: string;
}

interface IntegrationErrorsTableProps {
  errors: IntegrationError[];
}

export function IntegrationErrorsTable({ errors }: IntegrationErrorsTableProps) {
  return (
    <Card className="bg-white mb-6 sm:mb-8">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Клиника</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Ошибка</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {errors.length > 0 ? (
                errors.map(error => (
                  <TableRow key={error.id}>
                    <TableCell className="font-medium">{error.clinic}</TableCell>
                    <TableCell>{error.type}</TableCell>
                    <TableCell className="text-red-500">{error.error}</TableCell>
                    <TableCell>{error.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="link" size="sm">Исправить</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Нет ошибок интеграций
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
