
import { FC } from "react";
import { User } from "lucide-react";

interface PatientInfoProps {
  name: string;
  phone: string;
  email: string;
  medicalCardNumber: string;
}

export const PatientInfo: FC<PatientInfoProps> = ({
  name,
  phone,
  email,
  medicalCardNumber
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium flex items-center">
        <User className="h-4 w-4 mr-2" />
        Информация о пациенте
      </h3>
      <div className="mt-2 space-y-1 text-sm">
        <div className="flex">
          <span className="w-1/3 text-muted-foreground">ФИО:</span>
          <span className="w-2/3 font-medium">{name}</span>
        </div>
        <div className="flex">
          <span className="w-1/3 text-muted-foreground">Телефон:</span>
          <span className="w-2/3">{phone}</span>
        </div>
        <div className="flex">
          <span className="w-1/3 text-muted-foreground">Email:</span>
          <span className="w-2/3">{email}</span>
        </div>
        <div className="flex">
          <span className="w-1/3 text-muted-foreground">Мед. карта:</span>
          <span className="w-2/3">{medicalCardNumber}</span>
        </div>
      </div>
    </div>
  );
};
