
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Service } from "@/hooks/doctors/types";

interface CategoryGroup {
  category: string;
  icon: string;
  services: Service[];
}

interface ServicesByCategoryProps {
  serviceGroups: CategoryGroup[];
}

export function ServicesByCategory({ serviceGroups }: ServicesByCategoryProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString() + ' сум';
  };

  return (
    <div className="space-y-6">
      {serviceGroups.map((group, index) => (
        <Card key={index} className="bg-white">
          <CardHeader className="pb-3">
            <CardTitle>{group.icon} {group.category}</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-sm">Название</th>
                  <th className="text-center py-2 font-medium text-sm">Длительность</th>
                  <th className="text-right py-2 font-medium text-sm">Цена</th>
                </tr>
              </thead>
              <tbody>
                {group.services.map(service => (
                  <tr key={service.id} className="border-b last:border-0">
                    <td className="py-2 text-sm">{service.name}</td>
                    <td className="py-2 text-sm text-center">{service.durationMin} мин</td>
                    <td className="py-2 text-sm text-right">{formatPrice(service.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
