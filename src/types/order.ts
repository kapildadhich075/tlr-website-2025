import { z } from "zod";

export const orderSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  type: z.enum(["video", "production"]),
  status: z.enum(["pending", "in-progress", "completed"]),
  dueDate: z.coerce.date(),
  budget: z.coerce.number().min(0),
});

export type OrderStatus = "pending" | "in-progress" | "completed";

export type Order = z.infer<typeof orderSchema> & {
  id: number;

  createdAt: Date | null;

  updatedAt: Date | null;
};
