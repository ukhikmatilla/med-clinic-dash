
import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "@/types/subscription";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface PeriodFilterProps {
  onPeriodChange: (value: string) => void;
  onCustomDateChange?: (range: DateRange) => void;
  defaultValue?: string;
}

export function PeriodFilter({ onPeriodChange, onCustomDateChange, defaultValue = "month" }: PeriodFilterProps) {
  const [period, setPeriod] = useState<string>(defaultValue);
  const [date, setDate] = useState<DateRange>({
    from: new Date(new Date().setDate(1)), // First day of current month
    to: new Date()
  });
  const [isCustomPeriod, setIsCustomPeriod] = useState<boolean>(false);

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    setIsCustomPeriod(value === "custom");
    
    if (value !== "custom") {
      onPeriodChange(value);
    }
  };

  const handleDateSelect = (selectedRange: DateRange) => {
    setDate(selectedRange);
    
    if (selectedRange.from && selectedRange.to) {
      onCustomDateChange?.(selectedRange);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={period} onValueChange={handlePeriodChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Период" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">За неделю</SelectItem>
          <SelectItem value="month">За месяц</SelectItem>
          <SelectItem value="quarter">За квартал</SelectItem>
          <SelectItem value="year">За год</SelectItem>
          <SelectItem value="custom">Произвольный период</SelectItem>
        </SelectContent>
      </Select>
      
      {isCustomPeriod && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
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
              onSelect={(range) => handleDateSelect(range as DateRange)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
