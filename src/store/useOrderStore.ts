// store/useOrderStore.ts
import { create } from "zustand";
import { Order, OrderStatus } from "@/types/order";

type OrderState = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
};

// Initial mock data
const initialOrders: Order[] = [
  {
    id: "001",
    projectName: "Corporate Event Video",
    status: "in-progress",
    type: "video",
    dueDate: "2024-04-15",
    budget: 2500,
  },
  {
    id: "002",
    projectName: "Wedding Highlights",
    status: "pending",
    type: "production",
    dueDate: "2024-05-01",
    budget: 3500,
  },
];

export const useOrderStore = create<OrderState>((set) => ({
  orders: [...initialOrders],
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status } : order
      ),
    })),
  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    })),
}));
