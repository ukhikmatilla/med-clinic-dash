
import { ReactNode } from "react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger,
  SidebarRail,
  SidebarInset
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type SidebarLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SidebarLayout({ sidebar, children, className }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar component */}
        <Sidebar>
          <SidebarContent>
            {sidebar}
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        
        {/* Main content */}
        <SidebarInset className={cn("relative", className)}>
          <div className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <div className="flex-1" />
          </div>
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
