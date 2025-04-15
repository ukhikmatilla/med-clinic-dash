
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { ClinicAdminSidebar } from "@/components/sidebars/ClinicAdminSidebar";
import { DoctorsHeader } from "@/components/clinics/doctors/DoctorsHeader";
import { DoctorsToolbar } from "@/components/clinics/doctors/DoctorsToolbar";
import { DoctorsList } from "@/components/clinics/doctors/DoctorsList";
import { DoctorFormDialog } from "@/components/clinics/doctors/DoctorFormDialog";
import { ViewDoctorDialog } from "@/components/clinics/doctors/ViewDoctorDialog";
import { DeleteDoctorDialog } from "@/components/clinics/doctors/DeleteDoctorDialog";
import { useDoctorsData } from "@/hooks/useDoctorsData";
import { mockDoctors, mockServices } from "@/data/doctors/mockData";
import { Doctor } from "@/hooks/doctors/types";
import { useToast } from "@/hooks/use-toast";
import { Tabs } from "@/components/ui/tabs";

// Maximum number of doctors allowed in the demo for clinic admin
const maxDoctors = 10;

export function Doctors() {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize doctors data with mock data
  const {
    doctors,
    loading: doctorsLoading,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    hasReachedLimit
  } = useDoctorsData(mockDoctors, { maxDoctors });

  // Convert mockServices for compatibility with doctor form dialog
  const formattedMockServices = mockServices.map(service => ({
    id: service.id,
    name: service.name,
    price: typeof service.price === 'string' ? parseInt(String(service.price), 10) : service.price,
    durationMin: service.durationMin,
    category: service.category
  }));

  // Calculate doctor counts for different statuses
  const doctorsCount = {
    all: doctors.length,
    active: doctors.filter(d => d.status === "active").length,
    inactive: doctors.filter(d => d.status === "inactive").length
  };
  
  // Filter doctors based on search term and active/inactive status
  const filteredDoctors = doctors
    .filter(doctor => {
      const matches = doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     doctor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
                     
      if (activeFilter === "all") {
        return matches;
      } else if (activeFilter === "active") {
        return matches && doctor.status === "active";
      } else {
        return matches && doctor.status === "inactive";
      }
    });
  
  // Open dialogs
  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setIsFormOpen(true);
  };
  
  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsFormOpen(true);
  };
  
  const handleViewDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsViewOpen(true);
  };
  
  const handleDeleteDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteOpen(true);
  };
  
  // Handle form submission for add/edit doctor
  const handleFormSubmit = async (values: any, isEditing: boolean) => {
    setIsLoading(true);
    
    try {
      if (isEditing && selectedDoctor) {
        // Update existing doctor
        await updateDoctor(selectedDoctor.id, values);
        toast({
          title: "Врач обновлен",
          description: `Профиль врача ${values.fullName} был успешно обновлен`,
        });
      } else {
        // Add new doctor
        await addDoctor(values);
        toast({
          title: "Врач добавлен",
          description: `Профиль врача ${values.fullName} был успешно создан`,
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving doctor:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить данные врача. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle doctor deletion
  const handleConfirmDelete = async () => {
    if (!selectedDoctor) return;
    
    setIsLoading(true);
    
    try {
      await deleteDoctor(selectedDoctor.id);
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить врача. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <SidebarLayout sidebar={<ClinicAdminSidebar />}>
      <div className="p-6 space-y-6">
        <DoctorsHeader 
          onAddDoctor={handleAddDoctor} 
          hasReachedLimit={hasReachedLimit}
          totalDoctors={doctors.length}
          maxDoctors={maxDoctors}
        />
        
        <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
          <DoctorsToolbar 
            activeTab={activeFilter}
            setActiveTab={setActiveFilter}
            searchQuery={searchTerm}
            setSearchQuery={setSearchTerm}
            doctorsCount={doctorsCount}
            onAddDoctor={handleAddDoctor}
            hasReachedLimit={hasReachedLimit}
          />
          
          <DoctorsList 
            doctors={filteredDoctors}
            isLoading={doctorsLoading}
            onViewDoctor={(id) => handleViewDoctor(doctors.find(d => d.id === id)!)}
            onEditDoctor={(id) => handleEditDoctor(doctors.find(d => d.id === id)!)}
            onDeleteDoctor={(id) => handleDeleteDoctor(doctors.find(d => d.id === id)!)}
          />
        </Tabs>
        
        {/* Add/Edit Doctor Dialog */}
        <DoctorFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          doctor={selectedDoctor}
          services={formattedMockServices}
          loading={isLoading}
          onSave={handleFormSubmit}
        />
        
        {/* View Doctor Dialog */}
        {selectedDoctor && (
          <ViewDoctorDialog
            open={isViewOpen}
            onOpenChange={setIsViewOpen}
            doctor={selectedDoctor}
            services={formattedMockServices}
          />
        )}
        
        {/* Delete Doctor Dialog */}
        {selectedDoctor && (
          <DeleteDoctorDialog
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            doctorName={selectedDoctor.fullName}
            loading={isLoading}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
    </SidebarLayout>
  );
}

export default Doctors;
