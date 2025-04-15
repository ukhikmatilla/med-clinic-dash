
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientDetailsDialog } from "@/components/clinics/doctor-profile/PatientDetailsDialog";
import { AppointmentFilters } from "@/components/clinics/doctor-profile/appointment/AppointmentFilters";
import { AppointmentsTable } from "@/components/clinics/doctor-profile/appointment/AppointmentsTable";
import { AppointmentSearch } from "@/components/clinics/doctor-profile/appointment/AppointmentSearch";
import { Doctor, Appointment, getMockAppointments } from "@/components/clinics/doctor-profile/types/appointment";

interface DoctorAppointmentsTabProps {
  doctor: Doctor;
}

export function DoctorAppointmentsTab({ doctor }: DoctorAppointmentsTabProps) {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [patientDetailsOpen, setPatientDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  
  // Get appointments data
  const allAppointments = getMockAppointments();
  
  // Filter appointments by search query
  const filteredAppointments = allAppointments.filter(appointment => 
    appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleViewPatient = (patientId: string) => {
    setSelectedPatient(patientId);
    setPatientDetailsOpen(true);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Additional filter logic would go here
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">История приёмов</CardTitle>
          <AppointmentFilters onFilterChange={handleFilterChange} />
        </CardHeader>
        
        <CardContent>
          <AppointmentSearch onSearch={handleSearch} />
          
          {filteredAppointments.length > 0 ? (
            <AppointmentsTable 
              appointments={filteredAppointments} 
              onViewPatient={handleViewPatient} 
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              У врача нет записей на приём
            </div>
          )}
        </CardContent>
      </Card>
      
      <PatientDetailsDialog
        open={patientDetailsOpen}
        onOpenChange={setPatientDetailsOpen}
        patientId={selectedPatient}
      />
    </>
  );
}
