"use client";

import { usePathname } from "next/navigation";

import Header from "./header";

export function ConditionalHeader() {
    const pathname = usePathname();
    const isAdmPage = pathname?.startsWith("/adm");

    // Não renderiza o Header nas páginas de administração
    if (isAdmPage) {
        return null;
    }

    return <Header />;
}
