
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function DoctorsTab() {
  return (
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
  );
}
