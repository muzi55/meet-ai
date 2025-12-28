import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { DashboardSidebar } from "../modules/dashboard/ul/components/dashboard-sidebar";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted">
        {children}
      </main>
    </SidebarProvider>
  );
}
