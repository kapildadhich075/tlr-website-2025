import { NextRequest, NextResponse } from "next/server";
import { getOrderById, updateOrder, deleteOrder } from "@/lib/db-queries";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const order = await getOrderById(Number(context.params.id));
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const body = await request.json();
    const updatedOrder = await updateOrder(Number(context.params.id), body);
    return NextResponse.json(updatedOrder[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await deleteOrder(Number(context.params.id));
    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
