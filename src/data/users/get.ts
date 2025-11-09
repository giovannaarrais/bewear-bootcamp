import { eq } from "drizzle-orm"

import { db } from "@/db"
import { userTable } from "@/db/schema"

export const getUserByRole = async( id: string ) => {
    const userRole = await db.query.userTable.findFirst({
        where: eq(userTable.id, id)
    })

    return userRole
}