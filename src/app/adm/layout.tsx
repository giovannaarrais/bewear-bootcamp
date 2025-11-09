import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUserByRole } from "@/data/users/get";
import { auth } from "@/lib/auth";

import AppSidebar from "./components/sidebar";

export default async function AdmLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const userId = String(session?.session.userId);
    
    const userByRole = await getUserByRole(userId)
    console.log(userByRole)

    if(userByRole?.role == 'user' || userByRole?.role == null) {
        redirect("/")
    }

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <SidebarTrigger className="-ml-2 z-50" />
                    <main className="p-5">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
