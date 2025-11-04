import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { adminAuth } from "@/lib/auth-admin";

import AppSidebar from "./components/sidebar";

export default async function AdmLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {

    // const session = await adminAuth.api.getSession({
    //     headers: await headers()
    // })

    // if(!session?.user) {
    //     redirect("/adm/login")
    // }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SidebarTrigger className="-ml-2 z-50" />
                <main className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
