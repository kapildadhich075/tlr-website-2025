"use client";

import * as React from "react";
import { PlusCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { formSchema, Order } from "@/types/order";
import { OrderTable } from "@/app/(DashBoard)/_components/OrderTable.tsx";
import { OrderStatusBadge } from "@/app/(DashBoard)/_components/OrderStatusBadge.tsx";
import { StatsCard } from "@/app/(DashBoard)/_components/StatsCard.tsx";
import { useCreateOrder, useOrders } from "@/hooks/useOrders";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loading } from "@/components/ui/loading";
import { ErrorDisplay } from "@/components/ui/error";

function Dashboard() {
  const { toast } = useToast();
  const {
    data: ordersData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useOrders();
  const orders: Order[] = ordersData.map((order) => ({
    ...order,
    status: order.status as "pending" | "in-progress" | "completed",
    type: order.type as "video" | "production",
  }));
  const createOrderMutation = useCreateOrder();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      type: "video",
      status: "pending",
      dueDate: new Date(),
      budget: 0,
    },
  });

  const orderStats = React.useMemo(
    () => ({
      active: orders.filter((o) => o.status === "in-progress").length,
      pending: orders.filter((o) => o.status === "pending").length,
      completed: orders.filter((o) => o.status === "completed").length,
    }),
    [orders]
  );

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createOrderMutation.mutateAsync({
        ...values,
        dueDate: new Date(values.dueDate),
      });
      setIsAddOrderModalOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Order created successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create order",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorDisplay message={error?.message} retry={refetch} />;
  return (
    <div className="p-6 space-y-6 bg-gradient-to-r from-gray-900 to-black min-h-screen">
      <h1 className="text-3xl font-bold text-white">TLR Studios Dashboard</h1>

      {/* Stats Overview - Simplified using StatsCard component */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Active Projects" value={orderStats.active} />
        <StatsCard title="Pending Orders" value={orderStats.pending} />
        <StatsCard title="Completed Projects" value={orderStats.completed} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Orders Table Section */}
        <div className="lg:flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Recent Orders
          </h2>
          <OrderTable orders={orders} onViewDetails={handleViewDetails} />
        </div>

        <div className="lg:w-1/3">
          {orders.length === 0 ? (
            <Card className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 shadow-xl">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-gray-800 p-4">
                  <PlusCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  No Orders Yet
                </h3>
                <p className="text-gray-400 max-w-sm">
                  Start by adding your first order. Track projects, manage
                  deadlines, and monitor budgets all in one place.
                </p>
                <Button
                  className="mt-4 bg-white text-black hover:bg-gray-200"
                  onClick={() => setIsAddOrderModalOpen(true)}
                >
                  Add Your First Order
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 shadow-xl">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-gray-800 p-4">
                  <PlusCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Add New Order
                </h3>
                <p className="text-gray-400 max-w-sm">
                  Create a new order to track your upcoming projects and manage
                  your workflow efficiently.
                </p>
                <Button
                  className="mt-4 bg-white text-black hover:bg-gray-200"
                  onClick={() => setIsAddOrderModalOpen(true)}
                >
                  Create Order
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold">Project:</span>
                <span className="col-span-3">{selectedOrder.projectName}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold">Type:</span>
                <span className="col-span-3 capitalize">
                  {selectedOrder.type}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold">Status:</span>
                <span className="col-span-3">
                  <OrderStatusBadge status={selectedOrder.status} />
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold">Due Date:</span>
                <span className="col-span-3">
                  {new Date(selectedOrder.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold">Budget:</span>
                <span className="col-span-3">
                  ₹ {selectedOrder.budget.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add New Order Modal */}
      <Dialog open={isAddOrderModalOpen} onOpenChange={setIsAddOrderModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Order</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter budget"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Add Order
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dashboard;
