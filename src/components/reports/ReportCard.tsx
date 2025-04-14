
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, FileText, BarChart, Users, AlertTriangle, ExternalLink, Eye } from "lucide-react";
import { ReportData } from "@/types/subscription";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { generateAndDownloadReport } from "@/utils/reportGenerator";
import { ReportFormatSelector } from "./ReportFormatSelector";
import { ReportPreviewDialog } from "./ReportPreviewDialog";

interface ReportCardProps {
  report: ReportData;
  onRefresh: (reportId: string) => Promise<void>;
  isLoading: boolean;
}

export function ReportCard({ report, onRefresh, isLoading }: ReportCardProps) {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  const handleExport = async (format: "pdf" | "excel" | "csv") => {
    setIsDownloading(true);
    try {
      const data = getReportData(report);
      await generateAndDownloadReport(
        report.type as any,
        format,
        data,
        "Текущий период"
      );
      toast.success(`Отчет успешно загружен в формате ${format.toUpperCase()}`);
      setDownloadOpen(false);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Не удалось загрузить отчет");
    } finally {
      setIsDownloading(false);
    }
  };

  const getReportData = (report: ReportData) => {
    // Prepare data based on report type
    switch (report.type) {
      case "financial":
        return {
          revenueData: report.data.revenue || [],
          paymentData: [
            { date: '01.04.2025', clinic: 'Najot Shifo', tariff: 'CRM + Telegram', amount: '250,000 сум', status: 'Успешно', method: 'Payme (бот)' },
            { date: '01.03.2025', clinic: 'Najot Shifo', tariff: 'CRM + Telegram', amount: '250,000 сум', status: 'Успешно', method: 'Payme (бот)' },
          ]
        };
      case "subscriptions":
        return {
          subscriptionData: [
            { clinic: 'Najot Shifo', expiry: '15.05.2025', autoRenewal: true, status: 'Активна', tariff: 'CRM + Telegram' },
            { clinic: 'Medlife', expiry: '05.05.2025', autoRenewal: false, status: 'Активна', tariff: 'CRM' },
          ],
          stats: {
            activeSubscriptions: report.data.activeSubscriptions || 42,
            autoRenewal: report.data.autoRenewal || 28,
            activePercentage: Math.round((report.data.autoRenewal / report.data.activeSubscriptions) * 100) || 66,
            expiringCount: report.data.expiringSubscriptions?.length || 2
          }
        };
      case "activity":
        return {
          clinicActivityData: [
            { clinic: 'Najot Shifo', doctors: 10, patients: 800, appointments: 156, integrations: ['Google Calendar', 'Telegram'], lastActive: '2025-04-14T10:23:00' },
            { clinic: 'Medlife', doctors: 8, patients: 650, appointments: 120, integrations: ['Telegram'], lastActive: '2025-04-13T15:45:00' },
          ],
          stats: {
            newClinics: report.data.newClinics || 3,
            newDoctors: report.data.newDoctors || 12,
            newPatients: report.data.newPatients || 87,
            totalAppointments: report.data.totalAppointments || 156
          }
        };
      default:
        return report.data;
    }
  };

  const handleRefresh = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    try {
      await onRefresh(report.id);
      toast.success("Отчет успешно обновлен");
    } catch (error) {
      toast.error("Не удалось обновить отчет");
    }
  };
  
  const handleNavigateToDetails = () => {
    switch(report.type) {
      case "financial":
        navigate("/super-admin/reports-fin");
        break;
      case "subscriptions":
        navigate("/super-admin/reports-sub");
        break;
      case "activity":
        navigate("/super-admin/reports-active");
        break;
      default:
        // For errors or other types, stay on the main page
        break;
    }
  };

  const getReportIcon = () => {
    switch (report.type) {
      case "financial":
        return <BarChart className="h-8 w-8 text-primary" />;
      case "subscriptions":
        return <FileText className="h-8 w-8 text-primary" />;
      case "activity":
        return <Users className="h-8 w-8 text-primary" />;
      case "errors":
        return <AlertTriangle className="h-8 w-8 text-primary" />;
      default:
        return <FileText className="h-8 w-8 text-primary" />;
    }
  };
  
  const getReportTitle = () => {
    switch (report.type) {
      case "financial":
        return "Финансовый отчет";
      case "subscriptions":
        return "Отчет по подпискам";
      case "activity":
        return "Отчет по активности";
      default:
        return "Отчет";
    }
  };

  // Determine if this report type has a detailed view
  const hasDetailedView = ["financial", "subscriptions", "activity"].includes(report.type);
  const reportData = getReportData(report);

  return (
    <Card className={hasDetailedView ? "cursor-pointer hover:border-primary/50 transition-colors" : ""} 
          onClick={hasDetailedView ? handleNavigateToDetails : undefined}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        {getReportIcon()}
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="sr-only">Обновить отчет</span>
          </Button>
          
          {(report.type === "financial" || report.type === "subscriptions" || report.type === "activity") && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                setPreviewOpen(true);
              }}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">Предпросмотр отчета</span>
            </Button>
          )}
          
          <Popover open={downloadOpen} onOpenChange={setDownloadOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                }}
                disabled={isDownloading}
              >
                <Download className={`h-4 w-4 ${isDownloading ? 'animate-spin' : ''}`} />
                <span className="sr-only">Скачать отчет</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" onClick={(e) => e.stopPropagation()}>
              <div className="grid gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExport("pdf");
                  }}
                  disabled={isDownloading}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  PDF документ
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExport("excel");
                  }}
                  disabled={isDownloading}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Excel (.xlsx)
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExport("csv");
                  }}
                  disabled={isDownloading}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  CSV
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          {hasDetailedView && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                handleNavigateToDetails();
              }}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Открыть детали</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <CardTitle>{report.title}</CardTitle>
          <CardDescription>{report.description}</CardDescription>
          <p className="text-xs text-muted-foreground mt-2">
            Обновлен: {formatDate(report.generatedAt)}
          </p>
        </div>
      </CardContent>
      
      {/* Preview dialog */}
      {(report.type === "financial" || report.type === "subscriptions" || report.type === "activity") && (
        <ReportPreviewDialog
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          reportType={report.type}
          reportData={reportData}
          period="Текущий период"
          title={getReportTitle()}
        />
      )}
    </Card>
  );
}
