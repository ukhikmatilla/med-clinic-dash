
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { ReactNode } from "react";

interface StatisticsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  change?: string;
  trend?: "up" | "down";
}

export function StatisticsCard({ 
  title, 
  value, 
  icon, 
  change, 
  trend 
}: StatisticsCardProps) {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-4 w-4 text-medical-dark">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="text-xl sm:text-2xl font-bold">{value}</div>
          {change && (
            <div className="flex items-center text-xs font-medium">
              {trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
                {change}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
