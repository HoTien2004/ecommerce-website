import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "../../../hooks/use-toast";

const mockOrderDetails: Record<string, any> = {
  ORD001: {
    id: "ORD001",
    customer: { name: "Nguyễn Văn A", email: "a../../..email.com", phone: "0912 345 678" },
    address: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    date: "2024-01-15",
    status: "delivered",
    payment: "COD",
    items: [
      { id: "1", name: "iPhone 15 Pro Max 256GB", qty: 1, price: 25990000, image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=100" },
    ],
    subtotal: 25990000,
    shipping: 0,
    total: 25990000,
  },
  ORD002: {
    id: "ORD002",
    customer: { name: "Trần Thị B", email: "b../../..email.com", phone: "0923 456 789" },
    address: "456 Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM",
    date: "2024-01-14",
    status: "shipping",
    payment: "VNPay",
    items: [
      { id: "3", name: "MacBook Pro 14 inch M3 Pro", qty: 1, price: 45990000, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100" },
    ],
    subtotal: 45990000,
    shipping: 0,
    total: 45990000,
  },
  ORD003: {
    id: "ORD003",
    customer: { name: "Lê Văn C", email: "c../../..email.com", phone: "0934 567 890" },
    address: "789 Trần Hưng Đạo, Quận 5, TP.HCM",
    date: "2024-01-13",
    status: "processing",
    payment: "Momo",
    items: [
      { id: "6", name: "AirPods Pro 2", qty: 1, price: 6490000, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100" },
      { id: "7", name: "MagSafe Charger", qty: 1, price: 990000, image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=100" },
      { id: "5", name: "Apple Watch Series 9", qty: 1, price: 10990000, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100" },
    ],
    subtotal: 18470000,
    shipping: 0,
    total: 18470000,
  },
};

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Chờ xác nhận", variant: "secondary" },
  processing: { label: "Đang xử lý", variant: "secondary" },
  shipping: { label: "Đang giao", variant: "default" },
  delivered: { label: "Đã giao", variant: "outline" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending": return <Clock className="w-4 h-4" />;
    case "processing": return <Package className="w-4 h-4" />;
    case "shipping": return <Truck className="w-4 h-4" />;
    case "delivered": return <CheckCircle className="w-4 h-4" />;
    case "cancelled": return <XCircle className="w-4 h-4" />;
    default: return null;
  }
};

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const order = mockOrderDetails[orderId || ""];
  const [status, setStatus] = useState(order?.status || "pending");

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Không tìm thấy đơn hàng</p>
        <Button onClick={() => navigate("/admin/orders")} className="mt-4">
          Quay lại
        </Button>
      </div>
    );
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    toast({ title: `Đã cập nhật trạng thái thành "${statusMap[newStatus].label}"` });
  };

  return (
    <>
      <Helmet>
        <title>Đơn hàng #{order.id} - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Đơn hàng #{order.id}</h1>
              <p className="text-muted-foreground">
                Đặt ngày {new Date(order.date).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
          <Badge variant={statusMap[status].variant} className="text-sm px-3 py-1">
            {getStatusIcon(status)}
            <span className="ml-1">{statusMap[status].label}</span>
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Sản phẩm ({order.items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Số lượng: {item.qty}</p>
                      </div>
                      <p className="font-semibold">
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tạm tính</span>
                    <span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Phí vận chuyển</span>
                    <span>{order.shipping === 0 ? "Miễn phí" : new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.shipping)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Tổng cộng</span>
                    <span className="text-primary">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Update Status */}
            <Card>
              <CardHeader>
                <CardTitle>Cập nhật trạng thái</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Select value={status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Chờ xác nhận</SelectItem>
                      <SelectItem value="processing">Đang xử lý</SelectItem>
                      <SelectItem value="shipping">Đang giao</SelectItem>
                      <SelectItem value="delivered">Đã giao</SelectItem>
                      <SelectItem value="cancelled">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Khách hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{order.customer.name}</p>
                <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Địa chỉ giao hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{order.address}</p>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Thanh toán</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Phương thức: {order.payment}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrderDetail;
