
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Package } from "lucide-react";

interface LicenseInfoProps {
  status: string;
  type: string;
  clinics: { current: number; max: string | number };
  doctors: { current: number; max: string | number };
}

export function LicenseInfoCard({ status, type, clinics, doctors }: LicenseInfoProps) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Package className="h-5 w-5 mr-2 text-medical-dark" />
          Лицензии и использование
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 text-sm">
          <span className="text-muted-foreground">Лицензия:</span>
          <span className="font-medium text-green-600 flex items-center">
            <Check className="h-3.5 w-3.5 mr-1" />
            {status}
          </span>
        </div>
        <div className="grid grid-cols-2 text-sm">
          <span className="text-muted-foreground">Тип:</span>
          <span className="font-medium">{type}</span>
        </div>
        <div className="grid grid-cols-2 text-sm">
          <span className="text-muted-foreground">Клиник:</span>
          <span className="font-medium">{clinics.current} / {clinics.max}</span>
        </div>
        <div className="grid grid-cols-2 text-sm">
          <span className="text-muted-foreground">Врачей:</span>
          <span className="font-medium">{doctors.current} / {doctors.max}</span>
        </div>
      </CardContent>
    </Card>
  );
}
