
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "@/types/subscription";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface CreateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateReportDialog({ open, onOpenChange }: CreateReportDialogProps) {
  const [reportType, setReportType] = useState<string>("financial");
  const [reportPeriod, setReportPeriod] = useState<string>("month");
  const [groupBy, setGroupBy] = useState<string>("clinic");
  const [exportFormat, setExportFormat] = useState<string>("excel");
  const [reportName, setReportName] = useState<string>("");
  const [date, setDate] = useState<DateRange>({
    from: new Date(new Date().setDate(1)), // First day of current month
    to: new Date()
  });
  const [isCustomPeriod, setIsCustomPeriod] = useState<boolean>(false);
  
  const handlePeriodChange = (value: string) => {
    setReportPeriod(value);
    setIsCustomPeriod(value === "custom");
  };
  
  const handleCreateReport = () => {
    // Validate inputs
    if (!reportName.trim()) {
      toast.error("Пожалуйста, укажите название отчета");
      return;
    }
    
    // In a real app, this would call an API to create the report
    toast.info("Создание отчета...");
    
    setTimeout(() => {
      toast.success("Отчет успешно создан", {
        description: `Отчет "${reportName}" сохранен в истории отчетов`
      });
      
      // Reset form and close dialog
      resetForm();
      onOpenChange(false);
    }, 1500);
  };
  
  const resetForm = () => {
    setReportType("financial");
    setReportPeriod("month");
    setGroupBy("clinic");
    setExportFormat("excel");
    setReportName("");
    setDate({
      from: new Date(new Date().setDate(1)),
      to: new Date()
    });
    setIsCustomPeriod(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Создать отчет</DialogTitle>
          <DialogDescription>
            Выберите параметры для создания нового отчета
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Тип отчета</TabsTrigger>
            <TabsTrigger value="filters">Параметры</TabsTrigger>
            <TabsTrigger value="export">Формат</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-name">Название отчета</Label>
                <Input 
                  id="report-name" 
                  value={reportName} 
                  onChange={(e) => setReportName(e.target.value)} 
                  placeholder="Например: Финансовый отчет за апрель 2025"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Тип отчета</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип отчета" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Финансовый отчет</SelectItem>
                    <SelectItem value="subscriptions">Подписки и продления</SelectItem>
                    <SelectItem value="activity">Активность платформы</SelectItem>
                    <SelectItem value="custom">Пользовательский</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {reportType === "custom" && (
                <div className="space-y-2 border rounded-md p-3 bg-muted/20">
                  <Label>Выберите метрики для отчета</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-revenue" defaultChecked />
                      <label htmlFor="metric-revenue">Доход</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-subscriptions" defaultChecked />
                      <label htmlFor="metric-subscriptions">Подписки</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-doctors" />
                      <label htmlFor="metric-doctors">Врачи</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-patients" />
                      <label htmlFor="metric-patients">Пациенты</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="filters" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Период</Label>
                <Select value={reportPeriod} onValueChange={handlePeriodChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите период" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">За неделю</SelectItem>
                    <SelectItem value="month">За месяц</SelectItem>
                    <SelectItem value="quarter">За квартал</SelectItem>
                    <SelectItem value="year">За год</SelectItem>
                    <SelectItem value="custom">Произвольный период</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {isCustomPeriod && (
                <div className="space-y-2">
                  <Label>Выберите диапазон дат</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "dd.MM.yyyy", { locale: ru })} -{" "}
                              {format(date.to, "dd.MM.yyyy", { locale: ru })}
                            </>
                          ) : (
                            format(date.from, "dd.MM.yyyy", { locale: ru })
                          )
                        ) : (
                          <span>Выберите даты</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(range) => setDate(range as DateRange)}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Группировка</Label>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите группировку" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clinic">По клиникам</SelectItem>
                    <SelectItem value="tariff">По тарифам</SelectItem>
                    <SelectItem value="status">По статусу</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="export" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Формат экспорта</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите формат" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 border rounded-md p-3 bg-muted/20 mt-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="schedule-email" />
                <label htmlFor="schedule-email">Отправить на email после создания</label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <input type="checkbox" id="save-template" />
                <label htmlFor="save-template">Сохранить как шаблон для будущих отчетов</label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Отмена</Button>
          <Button onClick={handleCreateReport}>Создать отчет</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
