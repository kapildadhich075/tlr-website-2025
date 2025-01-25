import { Order } from "@/types/order";

interface OrderStatusBadgeProps {
  status: Order["status"];
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const statusStyles = {
    completed: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${statusStyles[status]}`}>
      {status}
    </span>
  );
};
