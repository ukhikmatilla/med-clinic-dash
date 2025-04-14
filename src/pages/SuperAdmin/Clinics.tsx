
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddEditClinicDialog } from "@/components/clinics/AddEditClinicDialog";
import { ClinicsTable } from "@/components/clinics/table/ClinicsTable";
import { useClinicsData, Clinic } from "@/components/clinics/useClinicsData";

export function SuperAdminClinics() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);
  const { clinics, handleDeleteClinic, handleAddClinic, handleEditClinic } = useClinicsData();
  
  // Filter clinics based on search query
  const filteredClinics = clinics.filter(clinic => 
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    clinic.admin.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle starting edit for a clinic
  const startEditClinic = (id: number) => {
    const clinic = clinics.find(c => c.id === id);
    if (clinic) {
      setEditingClinic(clinic);
    }
  };
  
  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />}>
      <div className="p-2 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
          <h1 className="text-xl sm:text-2xl font-bold">Клиники</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Добавить клинику
          </Button>
        </div>
        
        <div className="mb-4 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск клиник по названию или ID администратора..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <ClinicsTable 
          clinics={filteredClinics}
          onEdit={startEditClinic}
          onDelete={handleDeleteClinic}
        />
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
          onSubmit={handleEditClinic}
          clinic={editingClinic}
        />
      )}
    </SidebarLayout>
  );
}

export default SuperAdminClinics;
