
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctorName?: string;
  onConfirm: () => void;
}

export function DeleteDoctorDialog({
  open,
  onOpenChange,
  doctorName,
  onConfirm
}: DeleteDoctorDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удаление врача</AlertDialogTitle>
          <AlertDialogDescription>
            Вы уверены, что хотите удалить врача "{doctorName}"?
            Это действие нельзя будет отменить.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
