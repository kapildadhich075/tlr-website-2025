import { NextResponse } from "next/server";
import { getOrders, createOrder } from "@/lib/db-queries";
import { NewOrder } from "@/db/drizzle";
import { ZodError } from "zod";
import { orderSchema } from "@/types/order";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const allOrders = await getOrders();
    return NextResponse.json(allOrders);
  } catch (error) {
    console.error("GET Orders Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch orders", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const body = await request.json();

    // Validate the request body against your schema
    const validatedData = orderSchema.parse(body);

    // Ensure the data matches your NewOrder type
    const orderData: NewOrder = {
      clientName: user.fullName ?? "Unknown",
      projectName: validatedData.projectName,
      type: validatedData.type,
      status: validatedData.status,
      dueDate: new Date(validatedData.dueDate),
      budget: validatedData.budget,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newOrder = await createOrder(orderData);

    if (!newOrder || newOrder.length === 0) {
      throw new Error("Order creation failed - no data returned");
    }

    return NextResponse.json(newOrder[0]);
  } catch (error) {
    console.error("POST Order Error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid order data", details: error.errors },
        { status: 400 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Failed to create order",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
