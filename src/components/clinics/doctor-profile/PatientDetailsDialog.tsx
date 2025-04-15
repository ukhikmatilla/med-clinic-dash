
import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Calendar, List, FileText } from "lucide-react";

interface PatientDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string | null;
}

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  birthDate: string;
  notes: string;
  appointments: {
    id: string;
    date: string;
    service: string;
    doctor: string;
    status: string;
  }[];
}

export function PatientDetailsDialog({ 
  open, 
  onOpenChange,
  patientId
}: PatientDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<Patient | null>(null);
  
  useEffect(() => {
    if (open && patientId) {
      setLoading(true);
      
      // In a real app, this would fetch patient data from an API
      setTimeout(() => {
        // Mock data for the selected patient
        const mockPatient: Patient = {
          id: patientId,
          name: "Иванов Иван Иванович",
          phone: "+7 (999) 123-45-67",
          email: "ivanov@example.com",
          address: "г. Москва, ул. Примерная, д. 123",
          birthDate: "01.01.1980",
          notes: "Аллергия на пенициллин. Хронические заболевания: гипертония.",
          appointments: [
            {
              id: "appt1",
              date: "15.04.2025 10:00",
              service: "Первичная консультация",
              doctor: "Петров А.А. (Терапевт)",
              status: "Завершен"
            },
            {
              id: "appt2",
              date: "10.03.2025 14:30",
              service: "УЗИ органов брюшной полости",
              doctor: "Сидорова Е.В. (УЗИ-диагност)",
              status: "Завершен"
            },
            {
              id: "appt3",
              date: "20.04.2025 11:00",
              service: "Повторная консультация",
              doctor: "Петров А.А. (Терапевт)",
              status: "Запланирован"
            }
          ]
        };
        
        setPatient(mockPatient);
        setLoading(false);
      }, 700);
    }
  }, [open, patientId]);
  
  if (!patient && !loading) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Информация о пациенте</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ) : (
          <>
            <Tabs defaultValue="info" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Основная информация</TabsTrigger>
                <TabsTrigger value="history">История приёмов</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-4 py-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Персональные данные</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium">ФИО</h3>
                      <p>{patient?.name}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <h3 className="text-sm font-medium flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          Телефон
                        </h3>
                        <p>{patient?.phone}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </h3>
                        <p>{patient?.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Адрес
                        </h3>
                        <p>{patient?.address}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Дата рождения
                        </h3>
                        <p>{patient?.birthDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Примечания
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{patient?.notes || "Нет примечаний"}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4 py-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <List className="h-4 w-4 mr-2" />
                      История приёмов
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patient?.appointments.length ? (
                      <div className="space-y-4">
                        {patient.appointments.map((appointment) => (
                          <div key={appointment.id} className="border-b pb-3 last:border-0 last:pb-0">
                            <div className="flex justify-between">
                              <div className="font-medium">{appointment.date}</div>
                              <div className="text-sm">{appointment.status}</div>
                            </div>
                            <div>{appointment.service}</div>
                            <div className="text-sm text-muted-foreground">{appointment.doctor}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Нет истории приёмов</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>
                Закрыть
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
