
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Service, ServiceCategory } from '@/hooks/doctors/types';
import { ServiceForm } from './ServiceForm';

interface Doctor {
  id: string;
  fullName: string;
}

interface EditServiceDialogProps {
  service: Service | null;
  categories: ServiceCategory[];
  doctors?: Doctor[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (serviceId: string, updatedService: Partial<Service>) => void;
}

export function EditServiceDialog({ 
  service, 
  categories, 
  doctors = [], 
  open, 
  onOpenChange, 
  onSubmit 
}: EditServiceDialogProps) {
  if (!service) return null;

  const handleSubmit = (formData: Omit<Service, 'id'>) => {
    onSubmit(service.id, formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Редактировать услугу</DialogTitle>
        </DialogHeader>
        <ServiceForm 
          categories={categories}
          doctors={doctors}
          service={service}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
