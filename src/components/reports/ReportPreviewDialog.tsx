
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { generateReportPreview, generateAndDownloadReport } from "@/utils/reportGenerator";
import { toast } from "sonner";

interface ReportPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  reportType: "financial" | "subscriptions" | "activity";
  reportData: any;
  period?: string;
  title: string;
}

export function ReportPreviewDialog({
  open,
  onClose,
  reportType,
  reportData,
  period = "Текущий период",
  title
}: ReportPreviewDialogProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Generate preview when dialog opens
  useEffect(() => {
    if (open) {
      setIsLoading(true);
      try {
        // Start the progress animation
        setDownloadProgress(10);
        
        // Generate preview with small delay to allow for progress animation
        setTimeout(() => {
          try {
            const dataUrl = generateReportPreview(reportType, reportData, period);
            setPreviewUrl(dataUrl);
            setDownloadProgress(100);
          } catch (error) {
            console.error("Error generating preview:", error);
            toast.error("Не удалось сгенерировать предпросмотр отчета");
          } finally {
            setIsLoading(false);
          }
        }, 500);
      } catch (error) {
        console.error("Error in preview generation:", error);
        setIsLoading(false);
        toast.error("Не удалось сгенерировать предпросмотр отчета");
      }
    } else {
      // Reset state when dialog closes
      setPreviewUrl(null);
      setIsLoading(true);
      setDownloadProgress(0);
    }
  }, [open, reportType, reportData, period]);
  
  // Handle download
  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(15);
    
    try {
      // Simulate progress during generation
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => Math.min(prev + 10, 90));
      }, 200);
      
      await generateAndDownloadReport(reportType, "pdf", reportData, period);
      clearInterval(progressInterval);
      setDownloadProgress(100);
      toast.success("Отчет успешно скачан");
      
      // Close dialog after short delay
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Не удалось скачать отчет");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Предпросмотр PDF отчета. Скачайте отчет или закройте окно.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Генерация предпросмотра...</p>
            <div className="w-full max-w-md mt-4">
              <Progress value={downloadProgress} className="h-2" />
            </div>
          </div>
        ) : (
          <div className="flex-1 min-h-[500px] overflow-auto border rounded-md">
            {previewUrl ? (
              <iframe 
                src={previewUrl} 
                className="w-full h-full"
                title="PDF Preview"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Не удалось загрузить предпросмотр</p>
              </div>
            )}
          </div>
        )}
        
        <DialogFooter className="gap-2 sm:gap-0">
          {isDownloading && (
            <div className="flex-1 mr-auto">
              <Progress value={downloadProgress} className="h-2" />
            </div>
          )}
          <Button variant="outline" onClick={onClose} disabled={isDownloading}>
            <X className="h-4 w-4 mr-2" />
            Закрыть
          </Button>
          <Button 
            onClick={handleDownload} 
            disabled={isLoading || isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Скачать PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
