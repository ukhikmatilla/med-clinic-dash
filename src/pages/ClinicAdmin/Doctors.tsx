
import { useState, useEffect } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { ClinicAdminSidebar } from "@/components/sidebars/ClinicAdminSidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoctorFormDialog } from "@/components/clinics/doctors/DoctorFormDialog";
import { DoctorFormValues } from "@/components/clinics/doctors/DoctorForm";
import { useDoctorsData } from "@/hooks/useDoctorsData";
import { mockDoctors, mockServices } from "@/data/doctors/mockData";
import { mockSubscription } from "@/data/subscription/mockData";

export function ClinicAdminDoctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const { doctors, loading, addDoctor, updateDoctor } = useDoctorsData(mockDoctors);
  
  // Filter doctors based on search query and active tab
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doctor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && doctor.status === "active";
    if (activeTab === "inactive") return matchesSearch && doctor.status === "inactive";
    
    return matchesSearch;
  });
  
  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setFormDialogOpen(true);
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
          <h1 className="text-xl sm:text-2xl font-bold">Врачи</h1>
          <Button className="flex items-center" onClick={handleAddDoctor}>
            <UserPlus className="mr-2 h-4 w-4" />
            Добавить врача
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-4 sm:mb-6" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <TabsList className="mb-0">
              <TabsTrigger value="all" className="text-xs sm:text-sm">Все врачи</TabsTrigger>
              <TabsTrigger value="active" className="text-xs sm:text-sm">Активные</TabsTrigger>
              <TabsTrigger value="inactive" className="text-xs sm:text-sm">Неактивные</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск врачей..."
                className="pl-8 w-full sm:w-[260px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="all" className="m-0">
            {/* Desktop table view */}
            <div className="hidden md:block">
              <Card className="bg-white">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left py-3 px-4 font-medium text-sm">ФИО</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Специальность(и)</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Telegram ID</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Расписание</th>
                          <th className="text-center py-3 px-4 font-medium text-sm">Статус</th>
                          <th className="text-right py-3 px-4 font-medium text-sm">Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDoctors.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-center py-6 text-muted-foreground">
                              {searchQuery ? "Нет врачей, соответствующих поиску" : "Врачи не найдены"}
                            </td>
                          </tr>
                        ) : (
                          filteredDoctors.map((doctor) => {
                            const scheduleString = Object.keys(doctor.schedule).length > 0
                              ? `${Object.keys(doctor.schedule)[0]}-${Object.keys(doctor.schedule)[Object.keys(doctor.schedule).length - 1]} ${Object.values(doctor.schedule)[0]}`
                              : "Не указано";
                              
                            return (
                              <tr key={doctor.id} className="border-t hover:bg-muted/20">
                                <td className="py-3 px-4">{doctor.fullName}</td>
                                <td className="py-3 px-4 text-sm">{doctor.specialties.join(", ")}</td>
                                <td className="py-3 px-4 text-sm">{doctor.telegramId || "—"}</td>
                                <td className="py-3 px-4 text-sm">{scheduleString}</td>
                                <td className="py-3 px-4 text-sm text-center">
                                  {doctor.status === "active" ? (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Активен
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      Неактивен
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-4 text-sm text-right space-x-1">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedDoctor(doctor);
                                      setFormDialogOpen(true);
                                    }}
                                  >
                                    Редактировать
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Mobile card view */}
            <div className="md:hidden space-y-3">
              {filteredDoctors.length === 0 ? (
                <Card className="bg-white">
                  <CardContent className="p-4 text-center text-muted-foreground">
                    {searchQuery ? "Нет врачей, соответствующих поиску" : "Врачи не найдены"}
                  </CardContent>
                </Card>
              ) : (
                filteredDoctors.map((doctor) => {
                  const scheduleString = Object.keys(doctor.schedule).length > 0
                    ? `${Object.keys(doctor.schedule)[0]}-${Object.keys(doctor.schedule)[Object.keys(doctor.schedule).length - 1]} ${Object.values(doctor.schedule)[0]}`
                    : "Не указано";
                    
                  return (
                    <Card key={doctor.id} className="bg-white">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-sm">{doctor.fullName}</h3>
                            <p className="text-xs text-muted-foreground">{doctor.specialties.join(", ")}</p>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-xs"
                              onClick={() => {
                                setSelectedDoctor(doctor);
                                setFormDialogOpen(true);
                              }}
                            >
                              Редактировать
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Telegram ID:</span>
                            <div>{doctor.telegramId || "—"}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Статус:</span>
                            <div className="flex items-center">
                              {doctor.status === "active" ? (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                  Активен
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                                  Неактивен
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Расписание:</span>
                            <div>{scheduleString}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
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
          onSave={handleSaveDoctor}
        />
      </div>
    </SidebarLayout>
  );
}

export default ClinicAdminDoctors;
