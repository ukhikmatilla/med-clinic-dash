
import { IntegrationErrorsTable } from "@/components/dashboard/IntegrationErrorsTable";

interface ErrorsSectionProps {
  errors: Array<{
    id: number;
    clinic: string;
    type: string;
    error: string;
    date: string;
  }>;
}

export function ErrorsSection({ errors }: ErrorsSectionProps) {
  return (
    <>
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Ошибки интеграций</h2>
      <IntegrationErrorsTable errors={errors} />
    </>
  );
}
