
import { useState } from 'react';
import { Service, ServiceCategory } from '@/hooks/doctors/types';
import { toast } from 'sonner';

const mockCategories: ServiceCategory[] = [
  { id: '1', name: 'Анализы', icon: '🧬' },
  { id: '2', name: 'Гормоны', icon: '⚗️' },
  { id: '3', name: 'УЗИ', icon: '🦴' }
];

export function useServicesData() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Общий анализ крови',
      category: 'Анализы',
      price: 50000,
      durationMin: 15,
      doctors: ['doctor1', 'doctor2']
    }
  ]);

  const addService = async (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: Date.now().toString()
    };
    
    setServices(prev => [...prev, newService]);
    toast.success('Услуга добавлена');
    return newService;
  };

  const updateService = async (serviceId: string, updatedService: Partial<Service>) => {
    setServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, ...updatedService } 
          : service
      )
    );
    toast.success('Услуга обновлена');
    return {} as Service; // Placeholder for future API return
  };

  const deleteService = async (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
    toast.success('Услуга удалена');
  };

  return {
    services,
    categories: mockCategories,
    addService,
    updateService,
    deleteService
  };
}
