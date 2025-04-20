"use client";

import * as React from "react";
import { CheckCircle, ChevronsUpDown, EuroIcon, Menu, Plus } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function TeamSwitcher() {
	const { toggleSidebar } = useSidebar();
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<div className="">
						<Menu onClick={toggleSidebar} />
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
          <div className="flex items-center gap-2 mx-auto">
          <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(#1E8449 0deg, #26A65B 90deg, #4CD964 180deg, #00566B 270deg, #002E42 360deg)",
                }}
              />
            </div>
            <CheckCircle className="w-5 h-5 text-white z-10" />
          </div>
          <h1 className="text-2xl font-bold text-AltScore-navy">AltScore</h1>
        </div>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
