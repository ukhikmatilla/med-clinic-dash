
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, XCircle, Search, Edit, Trash2 } from "lucide-react";

interface ClinicCardProps {
  id: number;
  name: string;
  admin: string;
  doctors: number;
  patients: number;
  subscription: string;
  hasGCalendar: boolean;
}

export function ClinicCard({ 
  id, 
  name, 
  admin, 
  doctors, 
  patients, 
  subscription, 
  hasGCalendar 
}: ClinicCardProps) {
  return (
    <Card key={id} className="bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Админ:</span>
          <span>{admin}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Врачей:</span>
          <span>{doctors}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Пациентов:</span>
          <span>{patients}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Подписка:</span>
          <span className="flex items-center">
            <Check className="mr-1 h-3 w-3 text-green-500" /> 
            Оплачено до {subscription}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">GCalendar:</span>
          <span>
            {hasGCalendar ? 
              <Check className="h-4 w-4 text-green-500" /> : 
              <XCircle className="h-4 w-4 text-red-500" />}
          </span>
        </div>
        <div className="pt-2 flex justify-end space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
