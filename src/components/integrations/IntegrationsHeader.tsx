
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export function IntegrationsHeader() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate a refresh - in a real app this would call an API
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Обновлено", {
        description: "Статусы интеграций успешно обновлены"
      });
    }, 800);
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2 p-0 h-auto" 
          onClick={() => navigate("/super-admin")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
        </Button>
        <h1 className="text-2xl font-bold">Интеграции</h1>
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleRefresh}
        disabled={isRefreshing}
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
        {isRefreshing ? 'Обновление...' : 'Обновить статусы'}
      </Button>
    </div>
  );
}
