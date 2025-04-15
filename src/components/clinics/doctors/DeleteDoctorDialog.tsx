
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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface DeleteDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctorName?: string;
  loading?: boolean;
  onConfirm: () => void;
}

export function DeleteDoctorDialog({
  open,
  onOpenChange,
  doctorName,
  loading = false,
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
          <AlertDialogCancel disabled={loading}>Отмена</AlertDialogCancel>
          {loading ? (
            <Button disabled className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Удаление...
            </Button>
          ) : (
            <AlertDialogAction
              onClick={onConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
