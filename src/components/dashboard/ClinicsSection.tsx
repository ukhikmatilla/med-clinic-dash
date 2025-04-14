
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ClinicCard } from "./ClinicCard";
import { useState } from "react";

interface Clinic {
  id: number;
  name: string;
  admin: string;
  doctors: number;
  patients: number;
  subscription: string;
  hasGCalendar: boolean;
}

interface ClinicsSectionProps {
  clinics: Clinic[];
}

export function ClinicsSection({ clinics }: ClinicsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter clinics based on search query
  const filteredClinics = clinics.filter(clinic => 
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    clinic.admin.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="mb-3 sm:mb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold">Последние клиники</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск клиник..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {filteredClinics.length > 0 ? (
          filteredClinics.map(clinic => (
            <ClinicCard 
              key={clinic.id}
              id={clinic.id}
              name={clinic.name}
              admin={clinic.admin}
              doctors={clinic.doctors}
              patients={clinic.patients}
              subscription={clinic.subscription}
              hasGCalendar={clinic.hasGCalendar}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Не найдено клиник, соответствующих запросу
          </div>
        )}
      </div>
    </div>
  );
}
