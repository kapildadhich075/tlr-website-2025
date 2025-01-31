// lib/db-queries.ts
import { db, NewOrder } from "@/db/drizzle";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getOrders() {
  return await db.select().from(orders).orderBy(orders.createdAt);
}

export async function getOrderById(id: number) {
  return await db
    .select()
    .from(orders)
    .where(eq(orders.id, id))
    .then((res) => res[0]);
}

export async function createOrder(order: NewOrder) {
  return await db.insert(orders).values(order).returning();
}

export async function updateOrder(id: number, order: Partial<NewOrder>) {
  return await db
    .update(orders)
    .set({ ...order, updatedAt: new Date() })
    .where(eq(orders.id, id))
    .returning();
}

export async function deleteOrder(id: number) {
  return await db.delete(orders).where(eq(orders.id, id)).returning();
}
