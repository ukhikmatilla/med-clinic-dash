
import { Button } from "@/components/ui/button";
import { Bell, PlusCircle } from "lucide-react";

interface DashboardHeaderProps {
  clinicName: string;
  lastUpdated: string;
  onAddAppointment?: () => void;
  onRefresh: () => void;
  isLoading?: boolean;
  isRefreshing?: boolean; // Added this prop
}

export function DashboardHeader({
  clinicName,
  lastUpdated,
  onAddAppointment,
  onRefresh,
  isLoading,
  isRefreshing
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">{clinicName}</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Центр высококачественной медицины | 
          <span className="ml-1">Последнее обновление: {lastUpdated}</span>
        </p>
      </div>
      
      <div className="flex gap-2">
        {onAddAppointment && (
          <Button className="flex items-center text-xs sm:text-sm" onClick={onAddAppointment}>
            <PlusCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="whitespace-nowrap">Добавить приём</span>
          </Button>
        )}
        <Button 
          variant="outline" 
          className="relative"
          onClick={onRefresh}
          disabled={isLoading || isRefreshing}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            2
          </span>
        </Button>
      </div>
    </div>
  );
}
