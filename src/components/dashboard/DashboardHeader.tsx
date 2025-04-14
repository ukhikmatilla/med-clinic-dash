
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  lastUpdated: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function DashboardHeader({ 
  lastUpdated, 
  isRefreshing, 
  onRefresh 
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
      <h1 className="text-xl sm:text-2xl font-bold">Дэшборд</h1>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Последнее обновление: {lastUpdated}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh} 
          disabled={isRefreshing}
          className="flex items-center"
        >
          <RefreshCw className={`h-3.5 w-3.5 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
          Обновить
        </Button>
      </div>
    </div>
  );
}
