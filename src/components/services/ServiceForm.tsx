
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Service, ServiceCategory } from "@/hooks/doctors/types";

interface Doctor {
  id: string;
  fullName: string;
}

interface ServiceFormProps {
  categories: ServiceCategory[];
  doctors?: Doctor[];
  service?: Service;
  onSubmit: (serviceData: Omit<Service, 'id'>) => void;
}

export function ServiceForm({ categories, doctors = [], service, onSubmit }: ServiceFormProps) {
  const [formData, setFormData] = useState<Omit<Service, 'id'>>({
    name: '',
    category: '',
    price: 0,
    durationMin: 15,
    doctors: []
  });

  // If editing an existing service, populate the form
  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        category: service.category,
        price: service.price,
        durationMin: service.durationMin,
        doctors: service.doctors || []
      });
    }
  }, [service]);

  const handleChange = (field: keyof Omit<Service, 'id'>, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDoctorToggle = (doctorId: string) => {
    setFormData(prev => {
      const doctors = [...(prev.doctors || [])];
      
      if (doctors.includes(doctorId)) {
        return {
          ...prev,
          doctors: doctors.filter(id => id !== doctorId)
        };
      } else {
        return {
          ...prev,
          doctors: [...doctors, doctorId]
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{service ? 'Редактировать услугу' : 'Добавить новую услугу'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Название услуги</Label>
              <Input 
                id="serviceName" 
                placeholder="Введите название услуги" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceCategory">Категория</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceDuration">Длительность (в минутах)</Label>
              <Input 
                id="serviceDuration" 
                type="number" 
                placeholder="Например: 30" 
                min={5} 
                step={5}
                value={formData.durationMin}
                onChange={(e) => handleChange('durationMin', parseInt(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="servicePrice">Цена (в сумах)</Label>
              <Input 
                id="servicePrice" 
                type="number" 
                placeholder="Например: 50000" 
                min={0} 
                step={1000}
                value={formData.price}
                onChange={(e) => handleChange('price', parseInt(e.target.value))}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Назначить врачам</Label>
            <div className="border rounded-md p-4 h-36 overflow-y-auto">
              <div className="space-y-2">
                {doctors.length > 0 ? (
                  doctors.map(doctor => (
                    <div key={doctor.id} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id={`doctor-${doctor.id}`} 
                        className="rounded text-primary focus:ring-primary"
                        checked={(formData.doctors || []).includes(doctor.id)}
                        onChange={() => handleDoctorToggle(doctor.id)}
                      />
                      <label htmlFor={`doctor-${doctor.id}`} className="text-sm">{doctor.fullName}</label>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">Нет доступных врачей</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">{service ? 'Сохранить изменения' : 'Сохранить'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
