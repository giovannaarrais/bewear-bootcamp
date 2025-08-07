import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";

//importa o arq do schema dos forms
import * as schema from "./schema";

// chama ele aqui para o db saber 
export const db = drizzle(process.env.DATABASE_URL!, {
    schema,
});
