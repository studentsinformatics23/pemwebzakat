import { PropsWithChildren, ReactNode } from "react";
import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import AppearanceDropdown from "@/components/appearance-dropdown";

export default function AuthenticatedLayout({
    header,
    children
}: PropsWithChildren<{
    header?: ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <header className="sticky top-0 z-50 flex items-center justify-between h-16 gap-2 p-4 border-b bg-background shrink-0 md:border-none md:rounded-xl">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="h-4 mr-2" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{header}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div>
                        <AppearanceDropdown />
                    </div>
                </header>

                <main className="h-full p-4 md:pt-0">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
