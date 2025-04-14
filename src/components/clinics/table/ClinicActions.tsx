
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface ClinicActionsProps {
  clinicId: number;
  clinicName: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function ClinicActions({ clinicId, clinicName, onEdit, onDelete }: ClinicActionsProps) {
  return (
    <div className="text-sm text-right space-x-2">
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
        <a href={`/super-admin/clinic/${clinicId}`}>
          <Eye className="h-4 w-4" />
        </a>
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0"
        onClick={() => onEdit(clinicId)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить клинику?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы действительно хотите удалить клинику "{clinicName}"? Это действие невозможно отменить.
              Все данные клиники будут безвозвратно удалены.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => onDelete(clinicId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
