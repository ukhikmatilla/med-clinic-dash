
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
    },
    {
      id: '2',
      name: 'Концентрация гемоглобина (HGB)',
      category: 'Анализы',
      price: 28000,
      durationMin: 10,
      doctors: ['doctor1']
    },
    {
      id: '3',
      name: 'Глюкоза натощак',
      category: 'Анализы',
      price: 34000,
      durationMin: 10,
      doctors: ['doctor2']
    },
    {
      id: '4',
      name: 'ТТГ',
      category: 'Гормоны',
      price: 90000,
      durationMin: 30,
      doctors: ['doctor1', 'doctor3']
    },
    {
      id: '5',
      name: 'УЗИ щитовидной железы',
      category: 'УЗИ',
      price: 90000,
      durationMin: 30,
      doctors: ['doctor3']
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
    return services.find(s => s.id === serviceId) as Service;
  };

  const deleteService = async (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
    toast.success('Услуга удалена');
  };

  // Helper method to get services grouped by category
  const getServicesByCategory = () => {
    const servicesByCategory: Record<string, Service[]> = {};
    
    services.forEach(service => {
      if (!servicesByCategory[service.category]) {
        servicesByCategory[service.category] = [];
      }
      servicesByCategory[service.category].push(service);
    });
    
    return Object.entries(servicesByCategory).map(([category, services]) => ({
      category,
      icon: mockCategories.find(c => c.name === category)?.icon || '🏥',
      services
    }));
  };

  return {
    services,
    categories: mockCategories,
    addService,
    updateService,
    deleteService,
    getServicesByCategory
  };
}
