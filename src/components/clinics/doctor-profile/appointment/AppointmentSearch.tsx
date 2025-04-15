
import { Search } from "lucide-react";

interface AppointmentSearchProps {
  onSearch: (query: string) => void;
}

export function AppointmentSearch({ onSearch }: AppointmentSearchProps) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input 
        type="search" 
        placeholder="Поиск по имени пациента..." 
        className="w-full rounded-md border pl-9 pr-4 py-2 text-sm"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
