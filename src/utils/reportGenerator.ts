
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { ReportData } from "@/types/subscription";
import { formatDate } from "@/lib/utils";

// Extend jsPDF types to include autoTable method
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// Helper function to add company header to PDF
const addCompanyHeader = (doc: jsPDF, title: string) => {
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text("MedicalCRM", 14, 22);
  
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  doc.text(title, 14, 30);
  
  doc.setFontSize(10);
  doc.text(`Сгенерировано: ${new Date().toLocaleDateString("ru-RU")}`, 14, 36);
  
  // Add horizontal line
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 40, 196, 40);
};

// Generate Financial Report PDF
export const generateFinancialReportPDF = (
  revenueData: any[],
  paymentData: any[],
  period: string
) => {
  const doc = new jsPDF();
  
  // Add header
  addCompanyHeader(doc, `Финансовый отчет - ${period}`);
  
  // Add revenue summary
  doc.setFontSize(14);
  doc.text("Доход по тарифам", 14, 50);
  
  // Calculate total revenue
  const totalRevenue = revenueData.reduce(
    (sum, item) => sum + item.total,
    0
  );
  
  // Add revenue summary
  doc.setFontSize(11);
  doc.text(`Общий доход: ${new Intl.NumberFormat("ru-RU").format(totalRevenue)} сум`, 14, 58);
  
  // Add payments table
  doc.setFontSize(14);
  doc.text("Таблица платежей", 14, 68);
  
  // Define the columns for the payments table
  const columns = [
    { header: "Дата", dataKey: "date" },
    { header: "Клиника", dataKey: "clinic" },
    { header: "Тариф", dataKey: "tariff" },
    { header: "Сумма", dataKey: "amount" },
    { header: "Статус", dataKey: "status" },
    { header: "Способ оплаты", dataKey: "method" },
  ];
  
  // Add the table
  doc.autoTable({
    startY: 72,
    head: [columns.map(col => col.header)],
    body: paymentData.map(row => 
      columns.map(col => row[col.dataKey as keyof typeof row])
    ),
    theme: "grid",
    headStyles: { fillColor: [60, 60, 200], textColor: 255 },
    styles: { font: "helvetica", fontSize: 10 },
  });
  
  // Footer with page numbers
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Страница ${i} из ${pageCount}`,
      (doc as any).internal.pageSize.width / 2,
      (doc as any).internal.pageSize.height - 10,
      { align: "center" }
    );
  }
  
  return doc;
};

// Generate Subscriptions Report PDF
export const generateSubscriptionsReportPDF = (
  subscriptionData: any[],
  stats: any,
  period: string
) => {
  const doc = new jsPDF();
  
  // Add header
  addCompanyHeader(doc, `Отчет по подпискам - ${period}`);
  
  // Add subscription stats
  doc.setFontSize(14);
  doc.text("Статистика подписок", 14, 50);
  
  // Add stats summary
  doc.setFontSize(11);
  doc.text(`Активные подписки: ${stats.activeSubscriptions}`, 14, 58);
  doc.text(`С автопродлением: ${stats.autoRenewal} (${stats.activePercentage}%)`, 14, 64);
  doc.text(`Истекающие в ближайшие 30 дней: ${stats.expiringCount}`, 14, 70);
  
  // Add subscriptions table
  doc.setFontSize(14);
  doc.text("Таблица подписок", 14, 80);
  
  // Define the columns for the subscriptions table
  const columns = [
    { header: "Клиника", dataKey: "clinic" },
    { header: "Подписка до", dataKey: "expiry" },
    { header: "Автопродление", dataKey: "autoRenewal" },
    { header: "Статус", dataKey: "status" },
    { header: "Тариф", dataKey: "tariff" },
  ];
  
  // Add the table
  doc.autoTable({
    startY: 84,
    head: [columns.map(col => col.header)],
    body: subscriptionData.map(row => [
      row.clinic,
      row.expiry,
      row.autoRenewal ? "Да" : "Нет",
      row.status,
      row.tariff,
    ]),
    theme: "grid",
    headStyles: { fillColor: [60, 130, 60], textColor: 255 },
    styles: { font: "helvetica", fontSize: 10 },
  });
  
  // Footer with page numbers
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Страница ${i} из ${pageCount}`,
      (doc as any).internal.pageSize.width / 2,
      (doc as any).internal.pageSize.height - 10,
      { align: "center" }
    );
  }
  
  return doc;
};

// Generate Activity Report PDF
export const generateActivityReportPDF = (
  clinicActivityData: any[],
  stats: any,
  period: string
) => {
  const doc = new jsPDF();
  
  // Add header
  addCompanyHeader(doc, `Отчет по активности - ${period}`);
  
  // Add activity stats
  doc.setFontSize(14);
  doc.text("Статистика активности", 14, 50);
  
  // Add stats summary
  doc.setFontSize(11);
  doc.text(`Новые клиники: ${stats.newClinics}`, 14, 58);
  doc.text(`Новые врачи: ${stats.newDoctors}`, 14, 64);
  doc.text(`Новые пациенты: ${stats.newPatients}`, 14, 70);
  doc.text(`Всего приёмов: ${stats.totalAppointments}`, 14, 76);
  
  // Add activity table
  doc.setFontSize(14);
  doc.text("Активность клиник", 14, 86);
  
  // Define the columns for the activity table
  const columns = [
    { header: "Клиника", dataKey: "clinic" },
    { header: "Врачи", dataKey: "doctors" },
    { header: "Пациенты", dataKey: "patients" },
    { header: "Приёмов", dataKey: "appointments" },
    { header: "Последняя активность", dataKey: "lastActive" },
  ];
  
  // Add the table
  doc.autoTable({
    startY: 90,
    head: [columns.map(col => col.header)],
    body: clinicActivityData.map(row => [
      row.clinic,
      row.doctors,
      row.patients,
      row.appointments,
      formatDate(row.lastActive),
    ]),
    theme: "grid",
    headStyles: { fillColor: [100, 80, 180], textColor: 255 },
    styles: { font: "helvetica", fontSize: 10 },
  });
  
  // Footer with page numbers
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Страница ${i} из ${pageCount}`,
      (doc as any).internal.pageSize.width / 2,
      (doc as any).internal.pageSize.height - 10,
      { align: "center" }
    );
  }
  
  return doc;
};

// Generate Excel report for any data
export const generateExcelReport = (
  data: any[],
  sheetName: string,
  fileName: string
) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
  // Create an array buffer
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  
  // Convert to a Blob
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  
  return blob;
};

// Generate CSV report for any data
export const generateCSVReport = (data: any[]) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Create an array buffer
  const csvBuffer = XLSX.write(wb, { bookType: "csv", type: "array" });
  
  // Convert to a Blob
  const blob = new Blob([csvBuffer], {
    type: "text/csv;charset=UTF-8",
  });
  
  return blob;
};

// Download Blob as a file
export const downloadBlob = (blob: Blob, fileName: string) => {
  // Create a URL for the blob
  const url = window.URL.createObjectURL(blob);
  
  // Create a link element
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  
  // Append to the document body
  document.body.appendChild(link);
  
  // Click the link
  link.click();
  
  // Clean up
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, 0);
};

// Helper function for getting file name with date
export const getReportFileName = (reportType: string, format: string) => {
  const date = new Date().toISOString().split("T")[0];
  return `${reportType}_report_${date}.${format}`;
};

// Main function to generate and download report
export const generateAndDownloadReport = async (
  reportType: "financial" | "subscriptions" | "activity",
  format: "pdf" | "excel" | "csv",
  data: any,
  period: string = "Текущий период"
): Promise<string> => {
  let blob: Blob;
  let fileName: string;
  
  switch (reportType) {
    case "financial":
      if (format === "pdf") {
        const doc = generateFinancialReportPDF(
          data.revenueData,
          data.paymentData,
          period
        );
        blob = doc.output("blob");
      } else if (format === "excel") {
        blob = generateExcelReport(
          data.paymentData,
          "Финансовый отчет",
          `financial_report_${new Date().toISOString().split("T")[0]}.xlsx`
        );
      } else {
        blob = generateCSVReport(data.paymentData);
      }
      fileName = getReportFileName("financial", format === "excel" ? "xlsx" : format);
      break;
      
    case "subscriptions":
      if (format === "pdf") {
        const doc = generateSubscriptionsReportPDF(
          data.subscriptionData,
          data.stats,
          period
        );
        blob = doc.output("blob");
      } else if (format === "excel") {
        blob = generateExcelReport(
          data.subscriptionData,
          "Отчет по подпискам",
          `subscriptions_report_${new Date().toISOString().split("T")[0]}.xlsx`
        );
      } else {
        blob = generateCSVReport(data.subscriptionData);
      }
      fileName = getReportFileName("subscriptions", format === "excel" ? "xlsx" : format);
      break;
      
    case "activity":
      if (format === "pdf") {
        const doc = generateActivityReportPDF(
          data.clinicActivityData,
          data.stats,
          period
        );
        blob = doc.output("blob");
      } else if (format === "excel") {
        blob = generateExcelReport(
          data.clinicActivityData,
          "Отчет по активности",
          `activity_report_${new Date().toISOString().split("T")[0]}.xlsx`
        );
      } else {
        blob = generateCSVReport(data.clinicActivityData);
      }
      fileName = getReportFileName("activity", format === "excel" ? "xlsx" : format);
      break;
      
    default:
      throw new Error("Unsupported report type");
  }
  
  downloadBlob(blob!, fileName);
  return fileName;
};
