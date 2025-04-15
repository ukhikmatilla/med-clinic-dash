
import { useState, useEffect } from 'react';
import { Service, ServiceCategory } from '@/hooks/doctors/types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export function useServicesData() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all services and categories on component mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('service_categories')
          .select('*');
        
        if (categoriesError) {
          console.error("Error fetching categories:", categoriesError);
        } else {
          setCategories(categoriesData as ServiceCategory[]);
        }
        
        // Fetch services with their categories
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select(`
            *,
            service_categories:category_id(name, icon),
            doctor_services(doctor_id)
          `);
        
        if (servicesError) {
          console.error("Error fetching services:", servicesError);
        } else {
          // Transform the data to match our frontend model
          const transformedServices: Service[] = servicesData.map(service => ({
            id: service.id,
            name: service.name,
            category: service.service_categories ? service.service_categories.name : "",
            category_id: service.category_id,
            price: service.price,
            durationMin: service.duration_min,
            doctors: service.doctor_services ? service.doctor_services.map((ds: any) => ds.doctor_id) : []
          }));
          
          setServices(transformedServices);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const addService = async (serviceData: Omit<Service, 'id'>) => {
    try {
      // Insert into Supabase
      let category_id: string | null = null;
      
      // Find the category ID based on the category name
      if (serviceData.category) {
        const matchingCategory = categories.find(c => c.name === serviceData.category);
        category_id = matchingCategory?.id || null;
      }
      
      const { data, error } = await supabase
        .from('services')
        .insert({
          name: serviceData.name,
          category_id: category_id,
          price: serviceData.price,
          duration_min: serviceData.durationMin
        })
        .select('*')
        .single();
      
      if (error) {
        throw error;
      }
      
      // If doctors are specified, create entries in the doctor_services table
      if (serviceData.doctors && serviceData.doctors.length > 0 && data) {
        const doctorServiceEntries = serviceData.doctors.map(doctorId => ({
          doctor_id: doctorId,
          service_id: data.id
        }));
        
        const { error: linkError } = await supabase
          .from('doctor_services')
          .insert(doctorServiceEntries);
        
        if (linkError) {
          console.error("Error linking doctors to service:", linkError);
        }
      }
      
      const newService: Service = {
        id: data.id,
        name: data.name,
        category: serviceData.category,
        category_id: data.category_id,
        price: data.price,
        durationMin: data.duration_min,
        doctors: serviceData.doctors || []
      };
      
      setServices(prev => [...prev, newService]);
      toast.success('Услуга добавлена');
      return newService;
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error('Не удалось добавить услугу');
      throw error;
    }
  };

  const updateService = async (serviceId: string, updatedService: Partial<Service>) => {
    try {
      // Prepare data for Supabase
      const updateData: any = {};
      
      if (updatedService.name !== undefined) {
        updateData.name = updatedService.name;
      }
      
      if (updatedService.price !== undefined) {
        updateData.price = updatedService.price;
      }
      
      if (updatedService.durationMin !== undefined) {
        updateData.duration_min = updatedService.durationMin;
      }
      
      if (updatedService.category !== undefined) {
        // Find the category ID based on the category name
        const matchingCategory = categories.find(c => c.name === updatedService.category);
        updateData.category_id = matchingCategory?.id || null;
      }
      
      // Update service in Supabase
      const { data, error } = await supabase
        .from('services')
        .update(updateData)
        .eq('id', serviceId)
        .select('*')
        .single();
      
      if (error) {
        throw error;
      }
      
      // If doctors list was updated, update the doctor_services table
      if (updatedService.doctors !== undefined) {
        // First, delete existing relationships
        const { error: deleteError } = await supabase
          .from('doctor_services')
          .delete()
          .eq('service_id', serviceId);
        
        if (deleteError) {
          console.error("Error removing existing doctor-service links:", deleteError);
        }
        
        // Then, add new relationships
        if (updatedService.doctors.length > 0) {
          const doctorServiceEntries = updatedService.doctors.map(doctorId => ({
            doctor_id: doctorId,
            service_id: serviceId
          }));
          
          const { error: insertError } = await supabase
            .from('doctor_services')
            .insert(doctorServiceEntries);
          
          if (insertError) {
            console.error("Error linking doctors to service:", insertError);
          }
        }
      }
      
      // Update the local state
      setServices(prev => 
        prev.map(service => 
          service.id === serviceId 
            ? { ...service, ...updatedService } 
            : service
        )
      );
      
      toast.success('Услуга обновлена');
      
      return services.find(s => s.id === serviceId) as Service;
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error('Не удалось обновить услугу');
      throw error;
    }
  };

  const deleteService = async (serviceId: string) => {
    try {
      // Delete service from Supabase
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setServices(prev => prev.filter(service => service.id !== serviceId));
      toast.success('Услуга удалена');
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error('Не удалось удалить услугу');
      throw error;
    }
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
    
    return Object.entries(servicesByCategory).map(([category, services]) => {
      // Find the category to get the icon
      const categoryObj = categories.find(c => c.name === category);
      
      return {
        category,
        icon: categoryObj?.icon || '🏥',
        services
      };
    });
  };

  return {
    services,
    categories,
    loading,
    addService,
    updateService,
    deleteService,
    getServicesByCategory
  };
}
