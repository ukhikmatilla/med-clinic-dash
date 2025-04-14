
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { Building2, UserRound, Users, CalendarClock } from "lucide-react";

interface StatsSectionProps {
  stats: {
    clinics: number;
    doctors: number;
    doctorsChange: string;
    doctorsTrend: "up" | "down";
    patients: number;
    patientsChange: string;
    patientsTrend: "up" | "down";
    appointments: number;
    appointmentsChange: string;
    appointmentsTrend: "up" | "down";
  };
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      <StatisticsCard
        title="Всего клиник"
        value={stats.clinics}
        icon={<Building2 />}
      />
      
      <StatisticsCard
        title="Всего врачей"
        value={stats.doctors}
        icon={<UserRound />}
        change={stats.doctorsChange}
        trend={stats.doctorsTrend}
      />
      
      <StatisticsCard
        title="Всего пациентов"
        value={stats.patients}
        icon={<Users />}
        change={stats.patientsChange}
        trend={stats.patientsTrend}
      />
      
      <StatisticsCard
        title="Приёмов сегодня"
        value={stats.appointments}
        icon={<CalendarClock />}
        change={stats.appointmentsChange}
        trend={stats.appointmentsTrend}
      />
    </div>
  );
}
