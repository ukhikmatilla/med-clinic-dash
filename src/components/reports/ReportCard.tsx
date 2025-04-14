
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, FileText, BarChart, Users, AlertTriangle, ExternalLink } from "lucide-react";
import { ReportData } from "@/types/subscription";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ReportCardProps {
  report: ReportData;
  onRefresh: (reportId: string) => Promise<void>;
  isLoading: boolean;
}

export function ReportCard({ report, onRefresh, isLoading }: ReportCardProps) {
  const navigate = useNavigate();
  
  const handleDownload = () => {
    toast.info("Загрузка отчета...");
    // In a real app, this would trigger a download
    setTimeout(() => {
      toast.success("Отчет успешно загружен");
    }, 1500);
  };

  const handleRefresh = async () => {
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

  // Determine if this report type has a detailed view
  const hasDetailedView = ["financial", "subscriptions", "activity"].includes(report.type);

  return (
    <Card className={hasDetailedView ? "cursor-pointer hover:border-primary/50 transition-colors" : ""} 
          onClick={hasDetailedView ? handleNavigateToDetails : undefined}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        {getReportIcon()}
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              handleRefresh();
            }}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="sr-only">Обновить отчет</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              handleDownload();
            }}
          >
            <Download className="h-4 w-4" />
            <span className="sr-only">Скачать отчет</span>
          </Button>
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
    </Card>
  );
}
