"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import axios from "axios";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "./ui/navbar";
import AddCategoryDialog from "@/app/custom components/admin components/add-category-dialog";

// Fetch Product Categories from the database
interface CategoryLink {
  title: string;
  url: string;
}

async function fetchCategories(): Promise<CategoryLink[]> {
  try {
    const response = await axios.get(`/api/categories`);
    let data = response.data;
    console.log("Fetched categories:", data);
    data = data.map((category: string) => ({
      title: category[0].toUpperCase() +  category.slice(1) , // Capitalize first letter
      url: `/admin/products/${category}`,
    }));
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [categories, setCategories] = React.useState<CategoryLink[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchCats = async () => {
    setLoading(true);
    const cats = await fetchCategories();
    setCategories(cats);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchCats();
  }, []);

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Products",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: loading ? [] : [{ component: <AddCategoryDialog onCategoryAdded={fetchCats} /> }, ...categories],
      },
      {
        title: "Access Controls",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Manage Users",
            url: "/admin/users/manage",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "/admin/docs/intro",
          },
          {
            title: "Managing Products",
            url: "/admin/docs/manage-products",
          },
          {
            title: "Managing Users",
            url: "/admin/docs/manage-users",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex items-center gap-2 my-2">
                <Logo className="h-6 w-6" />
                <span className="text-lg font-semibold tracking-tight">
                  QuikSave
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavProjects projects={data.projects} />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
