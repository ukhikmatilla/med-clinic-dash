
import { LicenseInfoCard } from "@/components/dashboard/LicenseInfoCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

interface LicenseAndActivitySectionProps {
  licenseInfo: {
    status: string;
    type: string;
    clinics: { current: number; max: string | number };
    doctors: { current: number; max: string | number };
  };
  activities: Array<{
    id: number;
    type: "subscription" | "doctor" | "error" | "patient" | "appointment";
    message: string;
    date: string;
    time: string;
  }>;
}

export function LicenseAndActivitySection({ 
  licenseInfo, 
  activities 
}: LicenseAndActivitySectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
      <LicenseInfoCard {...licenseInfo} />
      <ActivityFeed activities={activities} />
    </div>
  );
}
