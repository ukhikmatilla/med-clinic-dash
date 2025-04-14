
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface ClinicInfoProps {
  name: string;
  description: string;
  admin: string;
  doctors: number;
  patients: number;
}

export function ClinicInfo({ name, description, admin, doctors, patients }: ClinicInfoProps) {
  return (
    <Card className="bg-white md:col-span-2">
      <CardHeader>
        <CardTitle>Информация о клинике</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Описание</h3>
          <p>{description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Админ</h3>
            <p>{admin}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Количество врачей</h3>
            <p>{doctors}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Количество пациентов</h3>
            <p>{patients}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
