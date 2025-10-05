import "server-only"; // so permite importar as nossas funcoes em server components

import { db } from "@/db"

export const getCategories = async () => {
    const categories = await db.query.categoryTable.findMany()
    return categories;
}
