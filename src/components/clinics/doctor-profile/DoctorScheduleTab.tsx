
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  fullName: string;
  schedule: Record<string, string>;
}

interface DoctorScheduleTabProps {
  doctor: Doctor;
}

export function DoctorScheduleTab({ doctor }: DoctorScheduleTabProps) {
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);
  
  const handleSyncCalendar = () => {
    setIsSyncing(true);
    
    // In a real app, this would make an API call to sync with Google Calendar
    setTimeout(() => {
      setIsSyncing(false);
      toast({
        title: "Синхронизация с Google Calendar",
        description: "Расписание успешно синхронизировано"
      });
    }, 1500);
  };
  
  // Format the schedule for display in a weekly calendar view
  const daysOfWeek = [
    "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">Расписание врача</CardTitle>
          <Button variant="outline" size="sm" onClick={handleSyncCalendar} disabled={isSyncing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Синхронизация...' : 'Синхронизировать с Google Calendar'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-2 min-w-[700px]">
              {/* Day headers */}
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center font-medium p-2 border-b">
                  {day}
                </div>
              ))}
              
              {/* Time slots */}
              {daysOfWeek.map((day) => (
                <div key={day} className="min-h-[100px] p-2 border text-center">
                  {doctor.schedule[day] ? (
                    <div className="bg-green-50 p-2 rounded border border-green-200 text-sm">
                      {doctor.schedule[day]}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm">Выходной</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Инструкция по интеграции с Google Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Для автоматической синхронизации расписания следуйте шагам:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Создайте сервисный аккаунт в Google Cloud Console</li>
            <li>Предоставьте доступ к календарю для этого сервисного аккаунта</li>
            <li>Скопируйте ключ сервисного аккаунта в формате JSON</li>
            <li>Загрузите ключ в настройках интеграций клиники</li>
          </ol>
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              Подробная инструкция
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
