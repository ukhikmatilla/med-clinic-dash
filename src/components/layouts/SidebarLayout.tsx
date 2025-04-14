
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SidebarLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SidebarLayout({ sidebar, children, className }: SidebarLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="bg-sidebar w-64 shrink-0 h-full overflow-y-auto border-r border-sidebar-border">
        {sidebar}
      </aside>
      
      {/* Main content */}
      <main className={cn("flex-1 overflow-y-auto", className)}>
        {children}
      </main>
    </div>
  );
}
