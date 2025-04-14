
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntegrationsData } from "@/hooks/useIntegrationsData";
import { IntegrationCards } from "@/components/integrations/IntegrationCards";
import { IntegrationsHeader } from "@/components/integrations/IntegrationsHeader";
import { ErrorsSection } from "@/components/dashboard/ErrorsSection";

export default function SuperAdminIntegrations() {
  const { data, isLoading, errors } = useIntegrationsData();
  
  return (
    <SidebarLayout sidebar={<SuperAdminSidebar />} className="bg-gray-50">
      <div className="mx-auto max-w-6xl">
        <IntegrationsHeader />
        
        <div className="mt-6">
          <Card className="bg-white mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Клиника: Najot Shifo</CardTitle>
            </CardHeader>
            <CardContent>
              <IntegrationCards 
                integrations={data}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
          
          {errors && errors.length > 0 && (
            <ErrorsSection errors={errors} />
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}
