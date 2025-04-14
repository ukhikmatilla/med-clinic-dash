
import { useState } from "react";
import { 
  Popover,
  PopoverTrigger,
  PopoverContent 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ReportPreviewDialog } from "./ReportPreviewDialog";

interface ReportFormatSelectorProps {
  onExport: (format: "pdf" | "excel" | "csv") => Promise<void>;
  reportType?: "financial" | "subscriptions" | "activity";
  reportData?: any;
  period?: string;
  reportTitle?: string;
  label?: string;
  disabled?: boolean;
}

export function ReportFormatSelector({ 
  onExport, 
  reportType,
  reportData,
  period,
  reportTitle = "Отчет",
  label = "Скачать отчет", 
  disabled = false 
}: ReportFormatSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  
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
  
  const handlePreview = () => {
    if (!reportType || !reportData) {
      toast.error("Данные для предпросмотра недоступны");
      return;
    }
    
    setIsOpen(false);
    setPreviewOpen(true);
  };

  return (
    <>
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
            {reportType && reportData && (
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={handlePreview}
                disabled={isExporting}
              >
                <Eye className="h-4 w-4 mr-2" />
                Предпросмотр PDF
              </Button>
            )}
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
      
      {reportType && reportData && (
        <ReportPreviewDialog
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          reportType={reportType}
          reportData={reportData}
          period={period}
          title={reportTitle}
        />
      )}
    </>
  );
}
