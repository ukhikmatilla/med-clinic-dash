
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoctorsToolbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  doctorsCount: {
    all: number;
    active: number;
    inactive: number;
  };
  onAddDoctor: () => void;
  hasReachedLimit: boolean;
}

export function DoctorsToolbar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  doctorsCount,
  onAddDoctor,
  hasReachedLimit
}: DoctorsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
      <TabsList className="mb-0">
        <TabsTrigger value="all" className="text-xs sm:text-sm">
          Все врачи
          <Badge className="ml-1.5 bg-secondary">{doctorsCount.all}</Badge>
        </TabsTrigger>
        <TabsTrigger value="active" className="text-xs sm:text-sm">
          Активные
          <Badge className="ml-1.5 bg-secondary">{doctorsCount.active}</Badge>
        </TabsTrigger>
        <TabsTrigger value="inactive" className="text-xs sm:text-sm">
          Неактивные
          <Badge className="ml-1.5 bg-secondary">{doctorsCount.inactive}</Badge>
        </TabsTrigger>
      </TabsList>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск врачей..."
            className="pl-8 w-full sm:w-[260px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          className="hidden sm:flex items-center" 
          onClick={onAddDoctor} 
          disabled={hasReachedLimit}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Добавить врача
        </Button>
      </div>
    </div>
  );
}
