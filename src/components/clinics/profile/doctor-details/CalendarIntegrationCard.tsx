
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export function CalendarIntegrationCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Google Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Статус подключения</p>
            <div className="flex items-center mt-1">
              <X className="h-4 w-4 text-red-500 mr-2" />
              <span>Не подключен</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Подключить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
