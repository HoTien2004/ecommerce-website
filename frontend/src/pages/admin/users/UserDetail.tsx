import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Label } from "../../../components/ui/label";
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
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  CreditCard,
  Star,
  Ban,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

const mockUserData = {
  id: "1",
  name: "Nguyễn Văn A",
  email: "nguyenvana@email.com",
  phone: "0901234567",
  avatar: "",
  status: "active",
  role: "user" as "admin" | "moderator" | "user",
  createdAt: "2024-01-15",
  lastLogin: "2025-01-02",
  addresses: [
    {
      id: "1",
      name: "Nguyễn Văn A",
      phone: "0901234567",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      isDefault: true,
    },
    {
      id: "2",
      name: "Nguyễn Văn A",
      phone: "0901234567",
      address: "456 Lê Lợi, Quận 3, TP.HCM",
      isDefault: false,
    },
  ],
  orders: [
    {
      id: "ORD001",
      date: "2025-01-02",
      total: 35990000,
      status: "delivered",
      items: 2,
    },
    {
      id: "ORD002",
      date: "2024-12-25",
      total: 24990000,
      status: "delivered",
      items: 1,
    },
    {
      id: "ORD003",
      date: "2024-12-15",
      total: 8990000,
      status: "cancelled",
      items: 1,
    },
  ],
  reviews: [
    {
      id: "1",
      product: "iPhone 15 Pro Max",
      rating: 5,
      comment: "Sản phẩm rất tốt, giao hàng nhanh!",
      date: "2025-01-03",
    },
    {
      id: "2",
      product: "AirPods Pro 2",
      rating: 4,
      comment: "Chất lượng âm thanh tuyệt vời",
      date: "2024-12-26",
    },
  ],
  stats: {
    totalOrders: 15,
    totalSpent: 125890000,
    avgOrderValue: 8392667,
    totalReviews: 8,
  },
};

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  active: { label: "Hoạt động", variant: "default" },
  inactive: { label: "Không hoạt động", variant: "secondary" },
  banned: { label: "Đã khóa", variant: "destructive" },
};

const orderStatusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Chờ xác nhận", variant: "secondary" },
  confirmed: { label: "Đã xác nhận", variant: "default" },
  shipping: { label: "Đang giao", variant: "outline" },
  delivered: { label: "Đã giao", variant: "default" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
};

const roleColors: Record<string, string> = {
  admin: "bg-red-500",
  moderator: "bg-blue-500",
  user: "bg-gray-500",
};

const roleLabels: Record<string, string> = {
  admin: "Quản trị viên",
  moderator: "Điều hành viên",
  user: "Người dùng",
};

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(mockUserData);

  const handleStatusChange = (newStatus: string) => {
    setUser({ ...user, status: newStatus });
    toast({
      title: "Cập nhật thành công",
      description: `Trạng thái người dùng đã được cập nhật thành "${statusMap[newStatus].label}"`,
    });
  };

  const handleRoleChange = (newRole: "admin" | "moderator" | "user") => {
    setUser({ ...user, role: newRole });
    toast({
      title: "Cập nhật thành công",
      description: `Vai trò người dùng đã được cập nhật thành "${roleLabels[newRole]}"`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Chi tiết người dùng - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/users")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Chi tiết người dùng</h1>
            <p className="text-muted-foreground">Quản lý thông tin người dùng #{id}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge variant={statusMap[user.status].variant}>
                      {statusMap[user.status].label}
                    </Badge>
                    <Badge className={roleColors[user.role]}>
                      {roleLabels[user.role]}
                    </Badge>
                  </div>
                </div>
                <div className="text-left space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Tham gia: {user.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Đăng nhập cuối: {user.lastLogin}</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Vai trò
                    </Label>
                    <Select value={user.role} onValueChange={handleRoleChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Người dùng</SelectItem>
                        <SelectItem value="moderator">Điều hành viên</SelectItem>
                        <SelectItem value="admin">Quản trị viên</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Trạng thái tài khoản</Label>
                    <Select value={user.status} onValueChange={handleStatusChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Hoạt động
                          </div>
                        </SelectItem>
                        <SelectItem value="inactive">
                          <div className="flex items-center gap-2">
                            <Ban className="w-4 h-4 text-gray-500" />
                            Không hoạt động
                          </div>
                        </SelectItem>
                        <SelectItem value="banned">
                          <div className="flex items-center gap-2">
                            <Ban className="w-4 h-4 text-red-500" />
                            Khóa tài khoản
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats & Tabs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.stats.totalOrders}</p>
                      <p className="text-xs text-muted-foreground">Đơn hàng</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <CreditCard className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">{formatCurrency(user.stats.totalSpent)}</p>
                      <p className="text-xs text-muted-foreground">Tổng chi tiêu</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <CreditCard className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">{formatCurrency(user.stats.avgOrderValue)}</p>
                      <p className="text-xs text-muted-foreground">TB/đơn</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.stats.totalReviews}</p>
                      <p className="text-xs text-muted-foreground">Đánh giá</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="orders">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
                <TabsTrigger value="addresses">Địa chỉ</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Lịch sử đơn hàng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mã đơn</TableHead>
                          <TableHead>Ngày đặt</TableHead>
                          <TableHead>Số SP</TableHead>
                          <TableHead>Tổng tiền</TableHead>
                          <TableHead>Trạng thái</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {user.orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>{formatCurrency(order.total)}</TableCell>
                            <TableCell>
                              <Badge variant={orderStatusMap[order.status].variant}>
                                {orderStatusMap[order.status].label}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Địa chỉ giao hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {user.addresses.map((address) => (
                      <div
                        key={address.id}
                        className="p-4 border rounded-lg flex items-start gap-3"
                      >
                        <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{address.name}</span>
                            {address.isDefault && (
                              <Badge variant="secondary" className="text-xs">
                                Mặc định
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{address.phone}</p>
                          <p className="text-sm">{address.address}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Đánh giá sản phẩm</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {user.reviews.map((review) => (
                      <div key={review.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{review.product}</span>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
