
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface UseDashboardRefreshReturn {
  lastUpdated: string;
  isRefreshing: boolean;
  handleRefresh: () => void;
}

export function useDashboardRefresh(): UseDashboardRefreshReturn {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState("14.04.2025 10:22");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      
      setLastUpdated(`${day}.${month}.${year} ${hours}:${minutes}`);
      setIsRefreshing(false);
      
      toast({
        title: "Обновлено",
        description: "Данные дэшборда обновлены",
      });
    }, 1000);
  };
  
  return {
    lastUpdated,
    isRefreshing,
    handleRefresh
  };
}
