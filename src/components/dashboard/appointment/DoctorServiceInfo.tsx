
import { FC } from "react";
import { UserRound, FileText } from "lucide-react";

interface DoctorServiceInfoProps {
  doctorName: string;
  doctorSpecialty: string;
  serviceName: string;
  servicePrice: string;
}

export const DoctorServiceInfo: FC<DoctorServiceInfoProps> = ({
  doctorName,
  doctorSpecialty,
  serviceName,
  servicePrice
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium flex items-center">
          <UserRound className="h-4 w-4 mr-2" />
          Врач
        </h3>
        <div className="mt-1 text-sm">
          <div>{doctorName}</div>
          <div className="text-muted-foreground">{doctorSpecialty}</div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          Услуга
        </h3>
        <div className="mt-1 text-sm">
          <div>{serviceName}</div>
          <div className="text-muted-foreground">{servicePrice}</div>
        </div>
      </div>
    </div>
  );
};
