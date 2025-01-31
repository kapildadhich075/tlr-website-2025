import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { orders } from "./schema";

config({ path: ".env.local" }); // or .env.local

export const db = drizzle(process.env.DATABASE_URL!);

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
