import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { ClinicAdminSidebar } from "@/components/sidebars/ClinicAdminSidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DoctorFormDialog } from "@/components/clinics/doctors/DoctorFormDialog";
import { ViewDoctorDialog } from "@/components/clinics/profile/ViewDoctorDialog";
import { DoctorFormValues } from "@/components/clinics/doctors/DoctorForm";
import { useDoctorsData } from "@/hooks/useDoctorsData";
import { mockDoctors, mockServices } from "@/data/doctors/mockData";
import { mockSubscription } from "@/data/subscription/mockData";
import { DoctorsHeader } from "@/components/clinics/doctors/DoctorsHeader";
import { DoctorsToolbar } from "@/components/clinics/doctors/DoctorsToolbar";
import { DoctorsList } from "@/components/clinics/doctors/DoctorsList";
import { DeleteDoctorDialog } from "@/components/clinics/doctors/DeleteDoctorDialog";

export function ClinicAdminDoctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  
  // Get subscription details from mock data
  const subscription = mockSubscription;
  const maxDoctors = subscription.doctorsLimit || 10;
  const subscriptionHasDoctorLimit = !!subscription.doctorsLimit;
  
  const { 
    doctors, 
    loading, 
    addDoctor, 
    updateDoctor,
    deleteDoctor,
    hasReachedLimit
  } = useDoctorsData(mockDoctors, { maxDoctors });
  
  // Filter doctors based on search query and active tab
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doctor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && doctor.status === "active";
    if (activeTab === "inactive") return matchesSearch && doctor.status === "inactive";
    
    return matchesSearch;
  });
  
  const doctorsCount = {
    all: doctors.length,
    active: doctors.filter(d => d.status === "active").length,
    inactive: doctors.filter(d => d.status === "inactive").length
  };
  
  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setFormDialogOpen(true);
  };
  
  const handleEditDoctor = (doctor: any) => {
    setSelectedDoctor(doctor);
    setFormDialogOpen(true);
  };
  
  const handleViewDoctor = (doctor: any) => {
    setSelectedDoctor(doctor);
    setViewDialogOpen(true);
  };
  
  const handleDeleteClick = (doctor: any) => {
    setSelectedDoctor(doctor);
    setDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (selectedDoctor) {
      await deleteDoctor(selectedDoctor.id);
      setDeleteDialogOpen(false);
    }
  };
  
  const handleSaveDoctor = async (values: DoctorFormValues, isEditing: boolean) => {
    if (isEditing && selectedDoctor) {
      await updateDoctor(selectedDoctor.id, values);
    } else {
      await addDoctor(values);
    }
  };
  
  return (
    <SidebarLayout sidebar={<ClinicAdminSidebar clinicName="Najot Shifo" />}>
      <div className="p-2 sm:p-6">
        <DoctorsHeader 
          totalDoctors={doctors.length}
          maxDoctors={maxDoctors}
          onAddDoctor={handleAddDoctor}
          hasReachedLimit={hasReachedLimit}
        />
        
        <Tabs defaultValue="all" className="mb-4 sm:mb-6" onValueChange={setActiveTab}>
          <DoctorsToolbar 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            doctorsCount={doctorsCount}
            onAddDoctor={handleAddDoctor}
            hasReachedLimit={hasReachedLimit}
          />
          
          <TabsContent value="all" className="m-0">
            <DoctorsList 
              doctors={filteredDoctors}
              onViewDoctor={handleViewDoctor}
              onEditDoctor={handleEditDoctor}
              onDeleteDoctor={handleDeleteClick}
            />
          </TabsContent>
          
          <TabsContent value="active" className="m-0">
            {/* This content will be populated by the filtered doctors automatically */}
          </TabsContent>
          
          <TabsContent value="inactive" className="m-0">
            {/* This content will be populated by the filtered doctors automatically */}
          </TabsContent>
        </Tabs>
        
        {/* Doctor Form Dialog */}
        <DoctorFormDialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          doctor={selectedDoctor}
          services={mockServices}
          subscriptionHasDoctorLimit={subscriptionHasDoctorLimit}
          currentDoctorCount={doctors.length}
          maxDoctorsAllowed={maxDoctors}
          onSave={handleSaveDoctor}
        />
        
        {/* View Doctor Dialog */}
        <ViewDoctorDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          doctor={selectedDoctor}
          services={mockServices}
        />
        
        {/* Delete Confirmation Dialog */}
        <DeleteDoctorDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          doctorName={selectedDoctor?.fullName}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </SidebarLayout>
  );
}

export default ClinicAdminDoctors;
