
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface DoctorsHeaderProps {
  totalDoctors: number;
  maxDoctors?: number;
  onAddDoctor: () => void;
  hasReachedLimit: boolean;
}

export function DoctorsHeader({ 
  totalDoctors = 0, 
  maxDoctors, 
  onAddDoctor,
  hasReachedLimit
}: DoctorsHeaderProps) {
  const showDoctorsLimit = !!maxDoctors;
  
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Врачи</h1>
        {showDoctorsLimit && (
          <p className="text-xs text-muted-foreground mt-1">
            {totalDoctors} из {maxDoctors} врачей по вашему тарифу
          </p>
        )}
      </div>
      <Button 
        className="flex sm:hidden items-center" 
        onClick={onAddDoctor} 
        disabled={hasReachedLimit}
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Добавить врача
      </Button>
    </div>
  );
}
