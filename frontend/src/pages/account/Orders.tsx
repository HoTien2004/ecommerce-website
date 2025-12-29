import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../hooks/use-toast";
import { X, Eye, Star, RefreshCcw } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: "pending" | "shipping" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    date: "2024-12-17",
    status: "pending",
    total: 54970000,
    items: [
      { id: "1", name: "MacBook Pro 14 inch M3 Pro", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop", qty: 1, price: 45990000 },
      { id: "2", name: "Chuột Logitech MX Master 3S", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop", qty: 2, price: 4490000 },
    ],
  },
  {
    id: "ORD002",
    date: "2024-12-15",
    status: "shipping",
    total: 42990000,
    items: [
      { id: "3", name: "Dell XPS 15 Core i7", image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=100&h=100&fit=crop", qty: 1, price: 42990000 },
    ],
  },
  {
    id: "ORD003",
    date: "2024-12-10",
    status: "delivered",
    total: 25990000,
    items: [
      { id: "4", name: "iPhone 15 Pro Max 256GB", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=100&h=100&fit=crop", qty: 1, price: 25990000 },
    ],
  },
  {
    id: "ORD004",
    date: "2024-12-05",
    status: "cancelled",
    total: 12990000,
    items: [
      { id: "5", name: "iPad Air M2", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop", qty: 1, price: 12990000 },
    ],
  },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Chờ xác nhận", variant: "secondary" },
  shipping: { label: "Đang giao", variant: "default" },
  delivered: { label: "Đã giao", variant: "outline" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleCancelOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: "cancelled" as const } : order
    ));
    toast({ title: "Đã hủy đơn hàng" });
  };

  const handleBuyAgain = (item: OrderItem) => {
    // Navigate to product page for buying
    navigate(`/product/${item.id}`);
    toast({ title: "Đang chuyển đến sản phẩm..." });
  };

  const handleReview = (item: OrderItem) => {
    navigate("/account/reviews");
    toast({ title: "Chuyển đến trang đánh giá" });
  };

  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const formatPrice = (price: number) => 
    new Intl.NumberFormat("vi-VN").format(price) + " đ";

  const formatDate = (dateStr: string) => 
    new Date(dateStr).toLocaleDateString("vi-VN");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 mb-6">
          <TabsTrigger 
            value="all" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Tất cả
          </TabsTrigger>
          <TabsTrigger 
            value="pending"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Chờ xác nhận
          </TabsTrigger>
          <TabsTrigger 
            value="shipping"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Đang giao
          </TabsTrigger>
          <TabsTrigger 
            value="delivered"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Đã giao
          </TabsTrigger>
          <TabsTrigger 
            value="cancelled"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Đã hủy
          </TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Không có đơn hàng nào
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border border-border rounded-xl overflow-hidden"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{order.id}</span>
                    <Badge variant={statusMap[order.status].variant}>
                      {statusMap[order.status].label}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(order.date)}
                  </span>
                </div>

                {/* Order Items */}
                <div className="p-4 space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-muted"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-primary">x{item.qty}</p>
                      </div>
                      {/* Per-item actions for delivered orders */}
                      {order.status === "delivered" && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReview(item)}
                          >
                            <Star className="w-4 h-4 mr-1" />
                            Đánh giá
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleBuyAgain(item)}
                          >
                            <RefreshCcw className="w-4 h-4 mr-1" />
                            Mua lại
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
                  <div>
                    <span className="text-sm text-muted-foreground">Tổng tiền: </span>
                    <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                  </div>
                  <div className="flex gap-2">
                    {/* Cancel button for pending orders */}
                    {order.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Hủy đơn
                      </Button>
                    )}

                    {/* Buy again for cancelled orders */}
                    {order.status === "cancelled" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBuyAgain(order.items[0])}
                      >
                        <RefreshCcw className="w-4 h-4 mr-1" />
                        Mua lại
                      </Button>
                    )}

                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/account/orders/${order.id}`}>
                        <Eye className="w-4 h-4 mr-1" />
                        Xem chi tiết
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default Orders;
