
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from '@/hooks/doctors/types';
import { Tag } from 'lucide-react';

interface DoctorServiceCardProps {
  service: Service;
  onEditClick?: () => void;
}

export function DoctorServiceCard({ service, onEditClick }: DoctorServiceCardProps) {
  // Format price as uzbek currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
  };
  
  // Format duration in minutes to human-readable
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} мин`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours} ч ${remainingMinutes} мин` 
        : `${hours} ч`;
    }
  };

  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base flex items-start gap-2">
          <Tag size={18} className="mt-0.5 flex-shrink-0" />
          <span>{service.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-muted-foreground">
            {service.category}
          </div>
          <div className="text-sm font-medium">
            {formatPrice(service.price)}
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Продолжительность: {formatDuration(service.durationMin)}
        </div>
      </CardContent>
    </Card>
  );
}
