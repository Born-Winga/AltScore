import { Bot, BookOpen, Settings2, Sheet, Table} from "lucide-react";

export const navItem = {
    user: {
      name: "AltScore",
      email: "admin@AltScore.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Statement Actions",
        url: "#",
        icon: Table,
        isActive: true,
        items: [
          {
            title: "View Statements",
            url: "/statements",
          },
          {
            title: "Upload A Statement",
            url: "/statements/upload",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Reports",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Trends",
            url: "",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Overview",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Leads",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ]
  }