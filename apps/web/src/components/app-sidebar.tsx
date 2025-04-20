"use client"

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import {navItem} from "./nav-items"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavProjects } from "./nav-projects"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="bg-green-100" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItem.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navItem.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
