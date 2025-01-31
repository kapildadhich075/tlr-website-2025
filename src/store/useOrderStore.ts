// store/useOrderStore.ts
import { create } from "zustand";
import { Order, OrderStatus } from "@/types/order";

type OrderState = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: number, status: OrderStatus) => void;
  deleteOrder: (id: number) => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  updateOrderStatus: (id: number, status: OrderStatus) =>
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
