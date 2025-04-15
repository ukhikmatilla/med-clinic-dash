
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, Calendar, Tag, MessageSquare, Award, Clock } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Doctor } from "@/hooks/useDoctorsData";
import { Service } from "@/hooks/doctors/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ViewDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: Doctor | null;
  services: Service[];
}

export function ViewDoctorDialog({ 
  open, 
  onOpenChange,
  doctor,
  services
}: ViewDoctorDialogProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  const [checkingTelegram, setCheckingTelegram] = useState(false);

  if (!doctor) return null;
  
  const doctorServices = services.filter(service => 
    doctor.services.includes(service.id)
  );
  
  const scheduleEntries = Object.entries(doctor.schedule);
  
  const handleCheckTelegram = () => {
    setCheckingTelegram(true);
    
    // Simulate API call to check Telegram connection
    setTimeout(() => {
      setCheckingTelegram(false);
      
      if (doctor.telegramId && doctor.telegramId.startsWith('@doctor')) {
        toast({
          title: "Telegram проверка",
          description: "Аккаунт врача успешно подключен к боту."
        });
      } else {
        toast({
          title: "Telegram проверка",
          description: "Аккаунт врача не подключен к боту.",
          variant: "destructive"
        });
      }
    }, 1500);
  };
  
  // Format price helper function
  const formatPrice = (price: number): string => {
    return `${price.toLocaleString()} сум`;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Информация о враче</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="info" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Основная информация</TabsTrigger>
            <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">ФИО</h3>
                <p className="font-medium">{doctor.fullName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Telegram ID</h3>
                <div className="flex items-center">
                  <p>{doctor.telegramId || "—"}</p>
                  {doctor.telegramId && (
                    <Badge className="ml-2" variant={doctor.telegramId.startsWith('@doctor') ? "success" : "destructive"}>
                      {doctor.telegramId.startsWith('@doctor') ? "Подключен" : "Не подключен"}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Специальность(и)</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  <Clock className="h-4 w-4 inline mr-1" /> Стаж
                </h3>
                <p>{doctor.experience || "—"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  <Award className="h-4 w-4 inline mr-1" /> Категория
                </h3>
                <p>{doctor.category || "—"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Первичная консультация</h3>
                <p>{doctor.initialConsultation || "—"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Повторная консультация</h3>
                <p>{doctor.followupConsultation || "—"}</p>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Расписание
                </CardTitle>
              </CardHeader>
              <CardContent>
                {scheduleEntries.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {scheduleEntries.map(([day, time]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium">{day}</span>
                        <span>{time}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Расписание не указано</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Услуги
                </CardTitle>
              </CardHeader>
              <CardContent>
                {doctorServices.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {doctorServices.map((service) => (
                      <div key={service.id} className="flex justify-between">
                        <span>{service.name}</span>
                        <span className="text-muted-foreground">{formatPrice(service.price)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Услуги не указаны</p>
                )}
              </CardContent>
            </Card>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Статус</h3>
              <div className="flex items-center">
                {doctor.status === "active" ? (
                  <>
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Активен</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-500 mr-2" />
                    <span>Неактивен</span>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4 py-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Telegram Bot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Статус подключения</p>
                      <div className="flex items-center mt-1">
                        {doctor.telegramId && doctor.telegramId.startsWith('@doctor') ? (
                          <>
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Подключен</span>
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 text-red-500 mr-2" />
                            <span>Не подключен</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {doctor.telegramBot || "@najot_doctor_bot"}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCheckTelegram} 
                      disabled={checkingTelegram}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {checkingTelegram ? 'Проверка...' : 'Проверить подключение'}
                    </Button>
                  </div>
                  
                  {!doctor.telegramId?.startsWith('@doctor') && (
                    <div className="text-sm">
                      <p className="font-medium text-destructive">Необходимо действие</p>
                      <p className="mt-1">
                        Врач не подключен к боту. Пригласите врача добавить Telegram бота
                        и идентифицировать себя через него.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Отправить приглашение
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Google Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Статус подключения</p>
                    <div className="flex items-center mt-1">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span>Не подключен</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Подключить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
