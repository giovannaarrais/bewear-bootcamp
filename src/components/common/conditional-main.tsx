"use client";

import { usePathname } from "next/navigation";

export function ConditionalMain({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const isAdmPage = pathname?.startsWith("/adm");

    return (
        <main className={isAdmPage ? "relative" : "relative top-25"}>
            {children}
        </main>
    );
}
