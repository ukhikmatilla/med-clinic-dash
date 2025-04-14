
import { useState } from "react";
import { 
  Popover,
  PopoverTrigger,
  PopoverContent 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ReportFormatSelectorProps {
  onExport: (format: "pdf" | "excel" | "csv") => Promise<void>;
  label?: string;
  disabled?: boolean;
}

export function ReportFormatSelector({ 
  onExport, 
  label = "Скачать отчет", 
  disabled = false 
}: ReportFormatSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async (format: "pdf" | "excel" | "csv") => {
    setIsExporting(true);
    try {
      await onExport(format);
      setIsOpen(false);
      toast.success(`Отчет успешно скачан в формате ${format.toUpperCase()}`);
    } catch (error) {
      console.error("Error exporting report:", error);
      toast.error("Ошибка при экспорте отчета");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" disabled={disabled || isExporting}>
          {isExporting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        <div className="grid gap-2">
          <Button 
            variant="ghost" 
            className="justify-start"
            onClick={() => handleExport("pdf")}
            disabled={isExporting}
          >
            <FileText className="h-4 w-4 mr-2" />
            PDF документ
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start"
            onClick={() => handleExport("excel")}
            disabled={isExporting}
          >
            <FileText className="h-4 w-4 mr-2" />
            Excel (.xlsx)
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start"
            onClick={() => handleExport("csv")}
            disabled={isExporting}
          >
            <FileText className="h-4 w-4 mr-2" />
            CSV
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
