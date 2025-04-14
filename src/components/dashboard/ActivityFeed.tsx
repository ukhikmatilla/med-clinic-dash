
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Bell, Check, UserRound, CircleAlert, Users, CalendarClock } from "lucide-react";
import { ReactNode } from "react";

interface ActivityItem {
  id: number;
  type: "subscription" | "doctor" | "error" | "patient" | "appointment";
  message: string;
  date: string;
  time: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  // Activity icon mapping
  const getActivityIcon = (type: string): ReactNode => {
    switch(type) {
      case "subscription": return <Check className="h-4 w-4 text-green-500" />;
      case "doctor": return <UserRound className="h-4 w-4 text-blue-500" />;
      case "error": return <CircleAlert className="h-4 w-4 text-red-500" />;
      case "patient": return <Users className="h-4 w-4 text-purple-500" />;
      case "appointment": return <CalendarClock className="h-4 w-4 text-orange-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-white lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center">
          <FileText className="h-5 w-5 mr-2 text-medical-dark" />
          Последние действия
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 max-h-[270px] overflow-y-auto">
        <div className="divide-y">
          {activities.map((activity) => (
            <div key={activity.id} className="p-3 flex items-start">
              <div className="mr-3 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.date} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
