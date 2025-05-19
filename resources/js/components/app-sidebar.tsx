"use client";

import * as React from "react";
import {
    Coins,
    Command,
    Frame,
    HandCoinsIcon,
    Home,
    LifeBuoy,
    Send,
    SendToBack,
    SquareTerminal,
    UsersIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "Penduduk",
            url: "/penduduk",
            icon: UsersIcon,
            isActive: true,
            //   items: [
            //     {
            //       title: "History",
            //       url: "#",
            //     },
            //   ],
        },
        {
            title: "Pembayaran Zakat",
            url: "/bayar",
            icon: HandCoinsIcon,
        },
        {
            title: "Pembagian Distribusi Zakat",
            url: "/bayar",
            icon: SendToBack,
        },
    ],
    navSecondary: [
        // {
        //   title: "Support",
        //   url: "#",
        //   icon: LifeBuoy,
        // },
        // {
        //   title: "Feedback",
        //   url: "#",
        //   icon: Send,
        // },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage<PageProps>().props;

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route("dashboard")}>
                                <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Coins className="size-4" />
                                </div>
                                <div className="grid flex-1 text-sm leading-tight text-left">
                                    <span className="font-semibold truncate">
                                        Zakafit
                                    </span>
                                    <span className="text-xs truncate">
                                        Pengelola Zakat Fitrah
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={auth.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
