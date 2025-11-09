import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export default async function AdmPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    console.log(session?.user.name)

    const userName = session?.user.name

    return (
        <div>
            <h1 className="text-3xl font-bold">Dashboard Admin</h1>
            <p className="text-muted-foreground">
                Bem-vindo, <span className="font-semibold text-primary">{userName}</span> ao painel administrativo BEWEAR
            </p>
        </div>
    );
}
