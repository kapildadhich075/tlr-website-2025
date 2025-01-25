import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/app/(DashBoard)/_components/OrderStatusBadge";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
}

export const OrderTable = ({ orders, onViewDetails }: OrderTableProps) => (
  <Card>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.projectName}</TableCell>
            <TableCell className="capitalize">{order.type}</TableCell>
            <TableCell>
              <OrderStatusBadge status={order.status} />
            </TableCell>
            <TableCell>
              {new Date(order.dueDate).toLocaleDateString()}
            </TableCell>
            <TableCell>₹{order.budget.toLocaleString()}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(order)}
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);
