import { eq } from "drizzle-orm"

import { db } from "@/db"
import { adminTable } from "@/db/schema"

export const getAdmin = async(id: string) => {
    const admin = await db.query.adminTable.findFirst({
        where: eq(adminTable.id, id)
    })

    return admin
}

export const getAdmins = async() => {
    const admins = await db.query.adminTable.findMany()
    
    return admins
}