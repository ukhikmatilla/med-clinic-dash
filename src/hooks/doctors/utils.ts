
import { Doctor } from "./types";
import { DoctorFormValues } from "@/components/clinics/doctors/DoctorForm";

// Parse schedule string to Record format
export const parseSchedule = (scheduleStr: string): Record<string, string> => {
  const schedule: Record<string, string> = {};
  if (!scheduleStr) return schedule;

  const parts = scheduleStr.split(", ");
  parts.forEach(part => {
    const match = part.match(/([А-Яа-я]+)[-–]?([А-Яа-я]+)?\s+(.+)/);
    if (match) {
      const [_, startDay, endDay, time] = match;
      
      if (startDay && endDay) {
        // Convert days range to individual days
        const daysMap: Record<string, string> = {
          'Пн': 'Понедельник',
          'Вт': 'Вторник',
          'Ср': 'Среда',
          'Чт': 'Четверг',
          'Пт': 'Пятница',
          'Сб': 'Суббота',
          'Вс': 'Воскресенье'
        };
        
        const fullDays = Object.keys(daysMap);
        const startIdx = fullDays.indexOf(startDay);
        const endIdx = fullDays.indexOf(endDay);
        
        if (startIdx !== -1 && endIdx !== -1) {
          for (let i = startIdx; i <= endIdx; i++) {
            schedule[fullDays[i]] = time;
          }
        } else {
          // If we can't parse the range, just add the original days
          schedule[startDay] = time;
          if (endDay) schedule[endDay] = time;
        }
      } else {
        schedule[startDay] = time;
      }
    }
  });
  
  return schedule;
};

// Convert form values to Doctor format
export const formValuesToDoctorData = (values: DoctorFormValues, doctorId?: string): Doctor => {
  return {
    id: doctorId || `doctor_${Date.now()}`,
    fullName: values.fullName,
    specialties: values.specialties.split(',').map(s => s.trim()),
    telegramId: values.telegramId || null,
    telegramBot: values.telegramBot,
    schedule: parseSchedule(values.schedule || ""),
    services: values.services || [],
    status: values.isActive ? "active" : "inactive",
    experience: values.experience,
    category: values.category
  };
};
