import * as z from "zod";

export type OrderStatus = "pending" | "in-progress" | "completed";

export interface Order {
  id: string;
  projectName: string;
  status: OrderStatus;
  type: "video" | "production";
  dueDate: string;
  budget: number;
}

export const formSchema = z.object({
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  type: z.enum(["video", "production"]),
  status: z.enum(["pending", "in-progress", "completed"]),
  dueDate: z.string(),
  budget: z.string().transform((val) => Number(val)),
});
