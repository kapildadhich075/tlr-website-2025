"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge.tsx";

import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loading } from "@/components/ui/loading";
import { ErrorDisplay } from "@/components/ui/error";
import { useToast } from "@/hooks/use-toast";
import {
  useOrders,
  useCreateOrder,
  useUpdateOrder,
  useDeleteOrder,
} from "@/hooks/useOrders";
import { formSchema, OrderStatus } from "@/types/order";

export default function Admin() {
  const { toast } = useToast();
  const { data: orders = [], isLoading, isError, error, refetch } = useOrders();
  const createOrderMutation = useCreateOrder();
  const updateOrderMutation = useUpdateOrder();
  const deleteOrderMutation = useDeleteOrder();

  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedTab, setSelectedTab] = useState("all");

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

  const stats = React.useMemo(
    () => ({
      totalSales: {
        amount: orders.reduce((sum, order) => sum + order.budget, 0),
        change: "+20.1%",
      },
      activeOrders: {
        count: orders.filter((o) => o.status === "in-progress").length,
        pendingDelivery: orders.filter((o) => o.status === "pending").length,
      },
      customers: {
        count: orders.length,
        newToday: Math.floor(Math.random() * 5),
      },
    }),
    [orders]
  );

  const filteredOrders = React.useMemo(() => {
    let filtered = [...orders];
    if (selectedTab !== "all") {
      filtered = filtered.filter((order) => order.status === selectedTab);
    }
    return filtered.sort((a, b) => {
      const comparison = sortOrder === "asc" ? a.id - b.id : b.id - a.id;
      return comparison;
    });
  }, [orders, selectedTab, sortOrder]);

  const handleUpdateStatus = async (id: number, status: OrderStatus) => {
    try {
      await updateOrderMutation.mutateAsync({ id, order: { status } });
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteOrder = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteOrderMutation.mutateAsync(id);
      toast({
        title: "Success",
        description: "Order deleted successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      });
    }
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
    <div className="container mx-auto p-6 space-y-8 bg-gradient-to-r from-gray-900 to-black min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">
            Manage your orders and track performance
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsAddOrderModalOpen(true)}
          className="bg-white text-black hover:bg-gray-200"
        >
          Add New Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-gray-900 to-black border border-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white">Total Sales</CardTitle>
            <CardDescription>For the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              ₹{stats.totalSales.amount.toLocaleString()}
            </div>
            <p className="text-sm text-green-500">
              {stats.totalSales.change} from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-gray-900 to-black border border-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white">Active Orders</CardTitle>
            <CardDescription>Currently processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {stats.activeOrders.count}
            </div>
            <p className="text-sm text-gray-400">
              {stats.activeOrders.pendingDelivery} pending delivery
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-gray-900 to-black border border-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white">Total Orders</CardTitle>
            <CardDescription>All time orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {stats.customers.count}
            </div>
            <p className="text-sm text-green-500">
              +{stats.customers.newToday} new today
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={setSelectedTab}
      >
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="all" className="text-white">
            All Orders
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-white">
            Pending
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="text-white">
            In Progress
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-white">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab}>
          <Card className="bg-gradient-to-r from-gray-900 to-black border border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Orders</CardTitle>
              <CardDescription>
                Manage and track all your orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-gray-800">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-gray-800/50">
                      <TableHead className="text-gray-300">
                        <Button
                          variant="ghost"
                          onClick={() =>
                            setSortOrder((prev) =>
                              prev === "asc" ? "desc" : "asc"
                            )
                          }
                          className="flex items-center gap-1 text-gray-300"
                        >
                          Order ID
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-gray-300">
                        Project Name
                      </TableHead>
                      <TableHead className="text-gray-300">Type</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Due Date</TableHead>
                      <TableHead className="text-right text-gray-300">
                        Budget
                      </TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-800/50">
                        <TableCell className="font-medium text-gray-300">
                          {order.id}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {order.projectName}
                        </TableCell>
                        <TableCell className="capitalize text-gray-300">
                          {order.type}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "success"
                                : order.status === "in-progress"
                                ? "pending"
                                : "default"
                            }
                            className="capitalize"
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {new Date(order.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right text-gray-300">
                          ₹{order.budget.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4 text-gray-300" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-gray-800 text-gray-300"
                            >
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id, "pending")
                                }
                                className="cursor-pointer hover:bg-gray-700"
                              >
                                Mark as Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id, "in-progress")
                                }
                                className="cursor-pointer hover:bg-gray-700"
                              >
                                Mark as In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id, "completed")
                                }
                                className="cursor-pointer hover:bg-gray-700"
                              >
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteOrder(Number(order.id))
                                }
                                className="cursor-pointer text-red-500 hover:bg-gray-700 hover:text-red-400"
                              >
                                Delete Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddOrderModalOpen} onOpenChange={setIsAddOrderModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
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
                      <Input
                        placeholder="Enter project name"
                        {...field}
                        className="bg-gray-800 border-gray-700"
                      />
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
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700">
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
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700">
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
                          field.value instanceof Date
                            ? field.value.toISOString().split("T")[0]
                            : field.value
                        }
                        className="bg-gray-800 border-gray-700"
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
                        className="bg-gray-800 border-gray-700"
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
