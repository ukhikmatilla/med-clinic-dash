
import { FC } from "react";

interface PaymentInfoCardProps {
  appointmentId: number;
  patientName: string;
  serviceName: string;
  servicePrice: string;
}

export const PaymentInfoCard: FC<PaymentInfoCardProps> = ({
  appointmentId,
  patientName,
  serviceName,
  servicePrice
}) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium">Информация о счете</h3>
          <p className="text-sm text-muted-foreground">Приём #{appointmentId}</p>
        </div>
        <div className="text-right">
          <div className="font-medium">{servicePrice}</div>
          <div className="text-sm text-muted-foreground">К оплате</div>
        </div>
      </div>
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Услуга:</span>
          <span className="text-right max-w-[200px] break-words">{serviceName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Пациент:</span>
          <span className="text-right max-w-[200px] break-words">{patientName}</span>
        </div>
      </div>
    </div>
  );
};
