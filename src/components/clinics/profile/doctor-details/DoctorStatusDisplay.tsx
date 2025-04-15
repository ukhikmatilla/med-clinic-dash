
import { Check, X } from "lucide-react";

interface DoctorStatusDisplayProps {
  status: "active" | "inactive";
}

export function DoctorStatusDisplay({ status }: DoctorStatusDisplayProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">Статус</h3>
      <div className="flex items-center">
        {status === "active" ? (
          <>
            <Check className="h-4 w-4 text-green-500 mr-2" />
            <span>Активен</span>
          </>
        ) : (
          <>
            <X className="h-4 w-4 text-red-500 mr-2" />
            <span>Неактивен</span>
          </>
        )}
      </div>
    </div>
  );
}
