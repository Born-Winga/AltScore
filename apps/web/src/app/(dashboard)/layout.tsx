import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type React from "react";
import { useAuthStore } from "@/lib/auth/authStore";
import { redirect } from "next/navigation";
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1 overflow-aut">{children}</main>
		</SidebarProvider>
	);
}
