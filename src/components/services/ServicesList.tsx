
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Service } from "@/hooks/doctors/types";

interface ServicesListProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (serviceId: string) => void;
}

export function ServicesList({ services, onEdit, onDelete }: ServicesListProps) {
  // Helper function to find category name
  const formatPrice = (price: number) => {
    return price.toLocaleString() + ' сум';
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название услуги</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead className="text-center">Длительность (мин)</TableHead>
            <TableHead className="text-right">Цена (сум)</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id} className="hover:bg-muted/20">
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.category}</TableCell>
              <TableCell className="text-center">{service.durationMin}</TableCell>
              <TableCell className="text-right">{formatPrice(service.price)}</TableCell>
              <TableCell className="text-right space-x-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 p-0"
                  onClick={() => onEdit(service)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => onDelete(service.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
