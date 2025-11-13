import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema";

import { sessionTable } from "./../db/schema";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  //login com google
  socialProviders: {
      google: { 
          clientId: process.env.GOOGLE_CLIENT_ID as string, 
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
      }, 
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  user: {
    modelName: "userTable",
  },
  session: {
    modelName: "sessionTable",
  },
  account: {
    modelName: "accountTable",
  },
  verification: {
    modelName: "verificationTable",
  }
});
console.log('NEXT_PUBLIC_APP_URL: ', process.env.NEXT_PUBLIC_APP_URL,'NEXT_PUBLIC_APP_URL: ', process.env.GOOGLE_CLIENT_ID)
