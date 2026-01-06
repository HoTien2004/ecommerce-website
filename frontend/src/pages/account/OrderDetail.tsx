import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";

const mockOrderDetails: Record<string, any> = {
  ORD001: {
    id: "ORD001",
    date: "2024-01-15",
    status: "delivered",
    total: 25990000,
    shipping: 0,
    address: {
      name: "Nguyễn Văn A",
      phone: "0912 345 678",
      address: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    },
    payment: "COD",
    items: [
      { id: "1", name: "iPhone 15 Pro Max 256GB", qty: 1, price: 25990000, image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=100&h=100&fit=crop" },
    ],
    timeline: [
      { status: "ordered", date: "2024-01-15 10:00", label: "Đơn hàng đã đặt" },
      { status: "confirmed", date: "2024-01-15 10:30", label: "Đã xác nhận" },
      { status: "shipping", date: "2024-01-16 08:00", label: "Đang vận chuyển" },
      { status: "delivered", date: "2024-01-17 14:00", label: "Đã giao hàng" },
    ],
  },
  ORD002: {
    id: "ORD002",
    date: "2024-01-10",
    status: "shipping",
    total: 45990000,
    shipping: 0,
    address: {
      name: "Nguyễn Văn A",
      phone: "0912 345 678",
      address: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    },
    payment: "VNPay",
    items: [
      { id: "3", name: "MacBook Pro 14 inch M3 Pro", qty: 1, price: 45990000, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop" },
    ],
    timeline: [
      { status: "ordered", date: "2024-01-10 14:00", label: "Đơn hàng đã đặt" },
      { status: "confirmed", date: "2024-01-10 14:30", label: "Đã xác nhận" },
      { status: "shipping", date: "2024-01-11 09:00", label: "Đang vận chuyển" },
    ],
  },
  ORD003: {
    id: "ORD003",
    date: "2024-01-05",
    status: "processing",
    total: 8990000,
    shipping: 0,
    address: {
      name: "Nguyễn Văn A",
      phone: "0912 345 678",
      address: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    },
    payment: "Momo",
    items: [
      { id: "6", name: "AirPods Pro 2", qty: 1, price: 6490000, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100&h=100&fit=crop" },
      { id: "7", name: "MagSafe Charger", qty: 1, price: 990000, image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=100&h=100&fit=crop" },
      { id: "8", name: "Apple Watch SE", qty: 1, price: 1510000, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop" },
    ],
    timeline: [
      { status: "ordered", date: "2024-01-05 16:00", label: "Đơn hàng đã đặt" },
      { status: "processing", date: "2024-01-05 16:30", label: "Đang xử lý" },
    ],
  },
  ORD004: {
    id: "ORD004",
    date: "2024-01-01",
    status: "cancelled",
    total: 12990000,
    shipping: 0,
    address: {
      name: "Nguyễn Văn A",
      phone: "0912 345 678",
      address: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    },
    payment: "PayPal",
    items: [
      { id: "4", name: "iPad Air M2", qty: 1, price: 12990000, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop" },
    ],
    timeline: [
      { status: "ordered", date: "2024-01-01 09:00", label: "Đơn hàng đã đặt" },
      { status: "cancelled", date: "2024-01-01 12:00", label: "Đã hủy" },
    ],
  },
};

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  processing: { label: "Đang xử lý", variant: "secondary" },
  shipping: { label: "Đang giao", variant: "default" },
  delivered: { label: "Đã giao", variant: "outline" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
};

const getStatusIcon = (status: string, isActive: boolean) => {
  const className = `w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`;
  switch (status) {
    case "ordered":
    case "confirmed":
    case "processing":
      return <Clock className={className} />;
    case "shipping":
      return <Truck className={className} />;
    case "delivered":
      return <CheckCircle className={className} />;
    case "cancelled":
      return <XCircle className={className} />;
    default:
      return <Package className={className} />;
  }
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const order = mockOrderDetails[orderId || ""];

  if (!order) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Không tìm thấy đơn hàng</p>
          <Button asChild className="mt-4">
            <Link to="/account/orders">Quay lại danh sách</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/account/orders"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách đơn hàng
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Đơn hàng #{order.id}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Đặt ngày {new Date(order.date).toLocaleDateString("vi-VN")}
            </p>
          </div>
          <Badge variant={statusMap[order.status].variant}>{statusMap[order.status].label}</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timeline */}
          <div>
            <h3 className="font-semibold mb-4">Trạng thái đơn hàng</h3>
            <div className="relative">
              {order.timeline.map((item: any, index: number) => (
                <div key={index} className="flex gap-4 pb-6 last:pb-0">
                  <div className="relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === order.timeline.length - 1
                          ? "bg-primary/10"
                          : "bg-secondary"
                      }`}
                    >
                      {getStatusIcon(item.status, index === order.timeline.length - 1)}
                    </div>
                    {index < order.timeline.length - 1 && (
                      <div className="absolute left-1/2 top-10 bottom-0 w-0.5 bg-border -translate-x-1/2" />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Sản phẩm</h3>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
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
          </div>

          <Separator />

          {/* Address & Payment */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Địa chỉ giao hàng</h3>
              <p className="font-medium">{order.address.name}</p>
              <p className="text-sm text-muted-foreground">{order.address.phone}</p>
              <p className="text-sm text-muted-foreground">{order.address.address}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Thanh toán</h3>
              <p className="text-sm text-muted-foreground">Phương thức: {order.payment}</p>
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tạm tính</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Phí vận chuyển</span>
                <span>{order.shipping === 0 ? "Miễn phí" : new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.shipping)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Tổng cộng</span>
                <span className="text-primary">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total + order.shipping)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetail;
