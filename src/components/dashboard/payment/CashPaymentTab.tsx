
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export const CashPaymentTab: FC = () => {
  return (
    <div className="p-4 bg-muted rounded-lg">
      <h4 className="font-medium mb-2">Оплата наличными</h4>
      <p className="text-sm text-muted-foreground mb-2 max-w-[420px] break-words leading-relaxed">
        Отметьте приём как оплаченный наличными и распечатайте чек для пациента.
      </p>
      <Button className="w-full sm:w-auto px-4 py-2">
        <CheckCircle className="mr-2 h-4 w-4" />
        Отметить как оплаченный
      </Button>
    </div>
  );
};
