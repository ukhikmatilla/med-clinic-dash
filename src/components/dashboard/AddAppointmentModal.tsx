
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

interface AddAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddAppointmentModal({ 
  open, 
  onOpenChange,
  onSuccess
}: AddAppointmentModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    service: "",
    date: "",
    time: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!formData.patient || !formData.doctor || !formData.service || !formData.date || !formData.time) {
        throw new Error("Пожалуйста, заполните все поля");
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Успешно добавлено",
        description: "Новый приём успешно создан"
      });
      
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error adding appointment:", error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось создать приём",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock data for selects
  const doctors = [
    { id: "1", name: "Закирова Г.А." },
    { id: "2", name: "Каримова Д.Э." },
    { id: "3", name: "Эронов М.М." },
    { id: "4", name: "Ортиков Ш.О." }
  ];
  
  const patients = [
    { id: "1", name: "Ахмедов Рустам" },
    { id: "2", name: "Исмаилова Нигора" },
    { id: "3", name: "Сулейманов Фаррух" },
    { id: "4", name: "Рахимова Зарина" }
  ];
  
  const services = [
    { id: "1", name: "Консультация кардиолога" },
    { id: "2", name: "УЗИ щитовидной железы" },
    { id: "3", name: "ЭКГ + консультация" },
    { id: "4", name: "Консультация дерматолога" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Добавить новый приём</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="patient" className="text-right">
              Пациент
            </Label>
            <div className="col-span-3">
              <Select onValueChange={(value) => handleInputChange("patient", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите пациента" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="doctor" className="text-right">
              Врач
            </Label>
            <div className="col-span-3">
              <Select onValueChange={(value) => handleInputChange("doctor", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите врача" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map(doctor => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="service" className="text-right">
              Услуга
            </Label>
            <div className="col-span-3">
              <Select onValueChange={(value) => handleInputChange("service", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите услугу" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Дата
            </Label>
            <div className="col-span-3">
              <Input
                id="date"
                type="date"
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Время
            </Label>
            <div className="col-span-3">
              <Input
                id="time"
                type="time"
                onChange={(e) => handleInputChange("time", e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {isSubmitting ? "Создание..." : "Создать"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
