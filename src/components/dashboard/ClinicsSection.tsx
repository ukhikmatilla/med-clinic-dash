
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ClinicCard } from "./ClinicCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddEditClinicDialog } from "@/components/clinics/AddEditClinicDialog";
import { toast } from "sonner";

interface Clinic {
  id: number;
  name: string;
  admin: string;
  email?: string;
  doctors: number;
  patients: number;
  subscription: string;
  subscriptionActive: boolean;
  hasGCalendar: boolean;
  plan?: string;
  doctorsLimit?: number;
  telegramBotPatient?: string;
  telegramBotDoctor?: string;
  timezone?: string;
}

interface ClinicsSectionProps {
  clinics: Clinic[];
}

export function ClinicsSection({ clinics: initialClinics }: ClinicsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [clinics, setClinics] = useState(initialClinics);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);
  
  // Filter clinics based on search query
  const filteredClinics = clinics.filter(clinic => 
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    clinic.admin.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddClinic = (clinic: Omit<Clinic, "id">) => {
    const newClinic = {
      ...clinic,
      id: clinics.length > 0 ? Math.max(...clinics.map(c => c.id)) + 1 : 1
    } as Clinic;
    
    setClinics([...clinics, newClinic]);
    setIsAddDialogOpen(false);
    
    toast.success("Клиника добавлена", {
      description: "Новая клиника была успешно добавлена в систему",
    });
  };
  
  const handleEditClinic = (id: number) => {
    const clinic = clinics.find(c => c.id === id);
    if (clinic) {
      setEditingClinic(clinic);
    }
  };
  
  const handleUpdateClinic = (updatedClinic: Clinic | Omit<Clinic, "id">) => {
    if ('id' in updatedClinic) {
      setClinics(clinics.map(clinic => 
        clinic.id === updatedClinic.id ? updatedClinic as Clinic : clinic
      ));
    }
    setEditingClinic(null);
    
    toast.success("Клиника обновлена", {
      description: "Данные клиники были успешно обновлены",
    });
  };
  
  const handleDeleteClinic = (id: number) => {
    setClinics(clinics.filter(clinic => clinic.id !== id));
    
    toast.success("Клиника удалена", {
      description: "Клиника была успешно удалена из системы",
    });
  };
  
  return (
    <div className="mb-3 sm:mb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold">Последние клиники</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск клиник..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Добавить
          </Button>
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
              onEdit={handleEditClinic}
              onDelete={handleDeleteClinic}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Не найдено клиник, соответствующих запросу
          </div>
        )}
      </div>
      
      {/* Add Clinic Dialog */}
      <AddEditClinicDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddClinic}
      />
      
      {/* Edit Clinic Dialog */}
      {editingClinic && (
        <AddEditClinicDialog
          open={!!editingClinic}
          onOpenChange={(open) => !open && setEditingClinic(null)}
          onSubmit={handleUpdateClinic}
          clinic={editingClinic}
        />
      )}
    </div>
  );
}
