import { useState } from "react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Helmet } from "react-helmet-async";
import { Search, Eye, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useToast } from "../../../hooks/use-toast";

const mockOrders = [
  { 
    id: "ORD006", 
    customer: "Đỗ Thị F", 
    phone: "0901234567",
    email: "f@email.com", 
    products: [{ name: "iPhone 15 Pro Max 256GB", qty: 1 }],
    total: 34990000, 
    status: "pending", 
    paymentStatus: "unpaid",
    paymentMethod: "COD",
    date: "2024-01-16" 
  },
  { 
    id: "ORD005", 
    customer: "Hoàng Văn E", 
    phone: "0912345678",
    email: "e@email.com", 
    products: [{ name: "MacBook Pro 14\" M3", qty: 1 }, { name: "AirPods Pro 2", qty: 2 }],
    total: 52990000, 
    status: "pending", 
    paymentStatus: "paid",
    paymentMethod: "Banking",
    date: "2024-01-15" 
  },
  { 
    id: "ORD004", 
    customer: "Phạm Thị D", 
    phone: "0923456789",
    email: "d@email.com", 
    products: [{ name: "iPad Pro 11\" M4", qty: 1 }],
    total: 28990000, 
    status: "processing", 
    paymentStatus: "paid",
    paymentMethod: "Banking",
    date: "2024-01-14" 
  },
  { 
    id: "ORD003", 
    customer: "Lê Văn C", 
    phone: "0934567890",
    email: "c@email.com", 
    products: [{ name: "Apple Watch Ultra 2", qty: 1 }, { name: "Dây đeo Sport Band", qty: 2 }, { name: "Sạc nhanh 20W", qty: 1 }],
    total: 25990000, 
    status: "shipping", 
    paymentStatus: "paid",
    paymentMethod: "VNPay",
    date: "2024-01-13" 
  },
  { 
    id: "ORD002", 
    customer: "Trần Thị B", 
    phone: "0945678901",
    email: "b@email.com", 
    products: [{ name: "MacBook Air 15\" M3", qty: 1 }],
    total: 35990000, 
    status: "delivered", 
    paymentStatus: "paid",
    paymentMethod: "MoMo",
    date: "2024-01-12" 
  },
  { 
    id: "ORD001", 
    customer: "Nguyễn Văn A", 
    phone: "0956789012",
    email: "a@email.com", 
    products: [{ name: "iPhone 15 128GB", qty: 1 }],
    total: 22990000, 
    status: "cancelled", 
    paymentStatus: "refunded",
    paymentMethod: "Banking",
    date: "2024-01-11" 
  },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Chờ xác nhận", variant: "secondary" },
  processing: { label: "Đang xử lý", variant: "secondary" },
  shipping: { label: "Đang giao", variant: "default" },
  delivered: { label: "Đã giao", variant: "outline" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
};

const paymentStatusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  unpaid: { label: "Chưa thanh toán", variant: "destructive" },
  paid: { label: "Đã thanh toán", variant: "default" },
  refunded: { label: "Đã hoàn tiền", variant: "outline" },
};

const AdminOrders = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState(mockOrders);
  const { toast } = useToast();

  // Sắp xếp theo mã đơn mới nhất (ORD006 > ORD005 > ...)
  const sortedOrders = [...orders].sort((a, b) => {
    const numA = parseInt(a.id.replace("ORD", ""));
    const numB = parseInt(b.id.replace("ORD", ""));
    return numB - numA;
  });

  const filteredOrders = sortedOrders.filter((o) => {
    const matchesSearch = 
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search);
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    toast({
      title: "Cập nhật thành công",
      description: `Đơn hàng #${orderId} đã được cập nhật trạng thái`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Quản lý đơn hàng - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Đơn hàng</h1>
          <p className="text-muted-foreground">{orders.length} đơn hàng</p>
        </div>

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="cursor-pointer hover:border-primary" onClick={() => setStatusFilter("pending")}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">{orders.filter(o => o.status === "pending").length}</p>
              <p className="text-xs text-muted-foreground">Chờ xác nhận</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary" onClick={() => setStatusFilter("processing")}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">{orders.filter(o => o.status === "processing").length}</p>
              <p className="text-xs text-muted-foreground">Đang xử lý</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary" onClick={() => setStatusFilter("shipping")}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-purple-500">{orders.filter(o => o.status === "shipping").length}</p>
              <p className="text-xs text-muted-foreground">Đang giao</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary" onClick={() => setStatusFilter("delivered")}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-500">{orders.filter(o => o.status === "delivered").length}</p>
              <p className="text-xs text-muted-foreground">Đã giao</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary" onClick={() => setStatusFilter("cancelled")}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-destructive">{orders.filter(o => o.status === "cancelled").length}</p>
              <p className="text-xs text-muted-foreground">Đã hủy</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo mã đơn, khách hàng, SĐT..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="pending">Chờ xác nhận</SelectItem>
                  <SelectItem value="processing">Đang xử lý</SelectItem>
                  <SelectItem value="shipping">Đang giao</SelectItem>
                  <SelectItem value="delivered">Đã giao</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead className="text-center">SL</TableHead>
                    <TableHead className="text-right">Tổng tiền</TableHead>
                    <TableHead className="text-center">Thanh toán</TableHead>
                    <TableHead className="text-center">Cập nhật trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <p className="font-semibold">#{order.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.date).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-primary">{order.phone}</p>
                          <p className="text-xs text-muted-foreground">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px]">
                          {order.products.map((product, i) => (
                            <p key={i} className="text-sm truncate">{product.name}</p>
                          ))}
                          {order.products.length > 1 && (
                            <p className="text-xs text-muted-foreground">
                              +{order.products.length - 1} sản phẩm khác
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">
                          {order.products.reduce((sum, p) => sum + p.qty, 0)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <Badge variant={paymentStatusMap[order.paymentStatus].variant}>
                            {paymentStatusMap[order.paymentStatus].label}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{order.paymentMethod}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Badge variant={statusMap[order.status].variant}>
                                {statusMap[order.status].label}
                              </Badge>
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "pending")}>
                              Chờ xác nhận
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "processing")}>
                              Đang xử lý
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "shipping")}>
                              Đang giao hàng
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "delivered")}>
                              Đã giao hàng
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "cancelled")} className="text-destructive">
                              Hủy đơn
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/orders/${order.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Không tìm thấy đơn hàng nào
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminOrders;
