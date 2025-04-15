
import { useState } from 'react';
import { Service, ServiceCategory } from '@/hooks/doctors/types';
import { toast } from 'sonner';

// Updated categories to include all from the provided list
const mockCategories: ServiceCategory[] = [
  { id: '1', name: 'Анализы крови', icon: '🧪' },
  { id: '2', name: 'Анализы мочи', icon: '🧪' },
  { id: '3', name: 'Биохимия', icon: '🧬' },
  { id: '4', name: 'Гормоны', icon: '⚗️' },
  { id: '5', name: 'Онкомаркеры', icon: '🧫' },
  { id: '6', name: 'Иммунология', icon: '🧫' },
  { id: '7', name: 'Гинекология', icon: '👩‍⚕️' },
  { id: '8', name: 'Электролиты', icon: '⚡' },
  { id: '9', name: 'Паразитология', icon: '🦠' },
  { id: '10', name: 'УЗИ', icon: '🦴' }
];

export function useServicesData() {
  const [services, setServices] = useState<Service[]>([
    // Общие анализы крови и мочи
    {
      id: '1',
      name: 'Общий анализ крови + СОЭ (21 показателей)',
      category: 'Анализы крови',
      price: 50000,
      durationMin: 30,
      doctors: ['doctor1', 'doctor2']
    },
    {
      id: '2',
      name: 'Общий анализ мочи',
      category: 'Анализы мочи',
      price: 45000,
      durationMin: 30,
      doctors: ['doctor1']
    },
    {
      id: '3',
      name: 'Моча по Ничепоренко',
      category: 'Анализы мочи',
      price: 45000,
      durationMin: 30,
      doctors: ['doctor2']
    },
    {
      id: '4',
      name: 'Моча по Зимницкому',
      category: 'Анализы мочи',
      price: 45000,
      durationMin: 30,
      doctors: ['doctor1', 'doctor3']
    },
    {
      id: '5',
      name: 'Суточная моча',
      category: 'Анализы мочи',
      price: 45000,
      durationMin: 30,
      doctors: ['doctor3']
    },
    {
      id: '6',
      name: 'Суточная моча на сахар',
      category: 'Анализы мочи',
      price: 45000,
      durationMin: 30,
      doctors: ['doctor1']
    },
    {
      id: '7',
      name: 'Каль на яйца глист',
      category: 'Паразитология',
      price: 62000,
      durationMin: 30,
      doctors: ['doctor2']
    },

    // Биохимия
    {
      id: '8',
      name: 'Глюкоза натощак',
      category: 'Биохимия',
      price: 34000,
      durationMin: 20,
      doctors: ['doctor1', 'doctor2']
    },
    {
      id: '9',
      name: 'Холестерин общий',
      category: 'Биохимия',
      price: 50000,
      durationMin: 20,
      doctors: ['doctor1']
    },
    {
      id: '10',
      name: 'Триглицериды',
      category: 'Биохимия',
      price: 50000,
      durationMin: 20,
      doctors: ['doctor2']
    },
    {
      id: '11',
      name: 'Калий',
      category: 'Электролиты',
      price: 45000,
      durationMin: 20,
      doctors: ['doctor1']
    },
    {
      id: '12',
      name: 'Натрий',
      category: 'Электролиты',
      price: 78000,
      durationMin: 20,
      doctors: ['doctor3']
    },
    {
      id: '13',
      name: 'Кальций',
      category: 'Электролиты',
      price: 78000,
      durationMin: 20,
      doctors: ['doctor1']
    },
    {
      id: '14',
      name: 'Магний',
      category: 'Электролиты',
      price: 78000,
      durationMin: 20,
      doctors: ['doctor2']
    },
    {
      id: '15',
      name: 'Железо',
      category: 'Биохимия',
      price: 78000,
      durationMin: 20,
      doctors: ['doctor1']
    },
    
    // Гормоны
    {
      id: '16',
      name: 'ТТГ (тиреотропный гормон)',
      category: 'Гормоны',
      price: 90000,
      durationMin: 40,
      doctors: ['doctor1', 'doctor3']
    },
    {
      id: '17',
      name: 'Т3 свободный',
      category: 'Гормоны',
      price: 95000,
      durationMin: 40,
      doctors: ['doctor3']
    },
    {
      id: '18',
      name: 'Т4 свободный',
      category: 'Гормоны',
      price: 90000,
      durationMin: 40,
      doctors: ['doctor3']
    },
    {
      id: '19',
      name: 'Пролактин',
      category: 'Гормоны',
      price: 90000,
      durationMin: 40,
      doctors: ['doctor3']
    },
    {
      id: '20',
      name: 'Тестостерон',
      category: 'Гормоны',
      price: 90000,
      durationMin: 40,
      doctors: ['doctor3']
    },
    
    // Онкомаркеры
    {
      id: '21',
      name: 'Раковый эмбриональный антиген (CEA)',
      category: 'Онкомаркеры',
      price: 84000,
      durationMin: 35,
      doctors: ['doctor1']
    },
    {
      id: '22',
      name: 'СА 15-3',
      category: 'Онкомаркеры',
      price: 73000,
      durationMin: 35,
      doctors: ['doctor1']
    },
    {
      id: '23',
      name: 'СА 19-9',
      category: 'Онкомаркеры',
      price: 84000,
      durationMin: 35,
      doctors: ['doctor1']
    },
    {
      id: '24',
      name: 'ПСА общий',
      category: 'Онкомаркеры',
      price: 123000,
      durationMin: 35,
      doctors: ['doctor1']
    },
    
    // Иммунология
    {
      id: '25',
      name: 'ВИЧ',
      category: 'Иммунология',
      price: 84000,
      durationMin: 30,
      doctors: ['doctor1', 'doctor2']
    },
    {
      id: '26',
      name: 'Цитомегаловирус IgG',
      category: 'Иммунология',
      price: 73000,
      durationMin: 30,
      doctors: ['doctor2']
    },
    {
      id: '27',
      name: 'Хламидиоз IgG',
      category: 'Иммунология',
      price: 73000,
      durationMin: 30,
      doctors: ['doctor1']
    },
    
    // Гинекология
    {
      id: '28',
      name: 'Токсоплазма IgG',
      category: 'Гинекология',
      price: 73000,
      durationMin: 45,
      doctors: ['doctor3']
    },
    {
      id: '29',
      name: 'Мазок',
      category: 'Гинекология',
      price: 62000,
      durationMin: 20,
      doctors: ['doctor3']
    },
    {
      id: '30',
      name: 'ПАП-тест',
      category: 'Гинекология',
      price: 246000,
      durationMin: 60,
      doctors: ['doctor3']
    },
    
    // УЗИ
    {
      id: '31',
      name: 'УЗИ щитовидной железы',
      category: 'УЗИ',
      price: 90000,
      durationMin: 30,
      doctors: ['doctor5']
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
