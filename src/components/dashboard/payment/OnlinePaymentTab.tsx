
import { FC } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface OnlinePaymentTabProps {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
}

export const OnlinePaymentTab: FC<OnlinePaymentTabProps> = ({
  paymentMethod,
  setPaymentMethod
}) => {
  return (
    <div className="space-y-4">
      <RadioGroup 
        value={paymentMethod} 
        onValueChange={setPaymentMethod}
        className="grid grid-cols-2 gap-4"
      >
        <Label 
          htmlFor="payme" 
          className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${paymentMethod === "payme" ? "border-primary bg-muted/50" : ""}`}
        >
          <div className="font-bold text-blue-500 mb-2">Payme</div>
          <RadioGroupItem value="payme" id="payme" className="sr-only" />
        </Label>
        
        <Label 
          htmlFor="click" 
          className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${paymentMethod === "click" ? "border-primary bg-muted/50" : ""}`}
        >
          <div className="font-bold text-green-600 mb-2">Click</div>
          <RadioGroupItem value="click" id="click" className="sr-only" />
        </Label>
      </RadioGroup>
      
      <div className="text-sm text-muted-foreground max-w-[420px] break-words leading-relaxed">
        Нажав кнопку, вы создадите счет и отправите ссылку на оплату пациенту в Telegram. 
        Оплата будет учтена автоматически после подтверждения платёжной системы.
      </div>
    </div>
  );
};
