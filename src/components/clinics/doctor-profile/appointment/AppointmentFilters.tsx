
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Calendar } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AppointmentFiltersProps {
  onFilterChange?: (filters: any) => void;
}

export function AppointmentFilters({ onFilterChange }: AppointmentFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleReset = () => {
    // Reset implementation would go here
    onFilterChange?.({});
  };
  
  const handleApply = () => {
    // Apply filter implementation would go here
    // For now, we'll just close the filter panel
    setIsFilterOpen(false);
  };

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <Filter className="h-4 w-4 mr-2" />
          Фильтры
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Календарь
        </Button>
      </div>
      
      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="mb-4">
        <CollapsibleContent className="bg-muted/50 p-4 rounded-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Дата</label>
              <input 
                type="date" 
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Статус</label>
              <select className="w-full rounded-md border px-3 py-2 text-sm">
                <option value="">Все статусы</option>
                <option value="completed">Завершенные</option>
                <option value="upcoming">Предстоящие</option>
                <option value="cancelled">Отмененные</option>
                <option value="missed">Пропущенные</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Услуга</label>
              <select className="w-full rounded-md border px-3 py-2 text-sm">
                <option value="">Все услуги</option>
                <option value="consultation">Консультация</option>
                <option value="procedure">Процедура</option>
                <option value="test">Анализы</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>Сбросить</Button>
            <Button size="sm" onClick={handleApply}>Применить</Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
