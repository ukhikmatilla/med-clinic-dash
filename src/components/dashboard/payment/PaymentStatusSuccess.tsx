
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentStatusSuccessProps {
  serviceName: string;
  onClose: () => void;
}

export function PaymentStatusSuccess({ serviceName, onClose }: PaymentStatusSuccessProps) {
  return (
    <div className="py-8 flex flex-col items-center justify-center text-center">
      <div className="bg-green-100 p-3 rounded-full mb-4">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <h3 className="text-lg font-medium mb-1">Счет успешно создан</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-[320px] mx-auto">
        Ссылка на оплату услуги "{serviceName}" отправлена пациенту в Telegram
      </p>
      <Button onClick={onClose}>Закрыть</Button>
    </div>
  );
}
