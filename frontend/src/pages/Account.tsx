import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useToast } from "../hooks/use-toast";
import { useAuth,type Address } from "../contexts/AuthContext";
import { Helmet } from "react-helmet-async";
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  Plus,
  Edit,
  Trash2,
  LogOut,
  Key,
  Eye,
  EyeOff
} from "lucide-react";

const mockOrders = [
  { id: "ORD001", date: "2024-01-15", status: "delivered", total: 25990000, items: 2 },
  { id: "ORD002", date: "2024-01-10", status: "shipping", total: 45990000, items: 1 },
  { id: "ORD003", date: "2024-01-05", status: "processing", total: 8990000, items: 3 },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  processing: { label: "Đang xử lý", variant: "secondary" },
  shipping: { label: "Đang giao", variant: "default" },
  delivered: { label: "Đã giao", variant: "outline" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
};

const Account = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, logout, updateProfile, addAddress, updateAddress, deleteAddress, setDefaultAddress, changePassword } = useAuth();
  
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  
  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    isDefault: false,
  });
  
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["profile", "addresses", "orders", "wishlist", "password"].includes(tab)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profile);
    toast({ title: "Cập nhật thành công" });
    setIsEditing(false);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      updateAddress(editingAddress.id, addressForm);
      toast({ title: "Cập nhật địa chỉ thành công" });
    } else {
      addAddress(addressForm);
      toast({ title: "Thêm địa chỉ thành công" });
    }
    setAddressDialogOpen(false);
    setEditingAddress(null);
    setAddressForm({ name: "", phone: "", address: "", city: "", district: "", ward: "", isDefault: false });
  };

  const openEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressForm({
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      district: address.district,
      ward: address.ward,
      isDefault: address.isDefault,
    });
    setAddressDialogOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    deleteAddress(id);
    toast({ title: "Đã xóa địa chỉ" });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({ title: "Mật khẩu xác nhận không khớp", variant: "destructive" });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast({ title: "Mật khẩu mới phải có ít nhất 6 ký tự", variant: "destructive" });
      return;
    }
    const success = await changePassword(passwordForm.oldPassword, passwordForm.newPassword);
    if (success) {
      toast({ title: "Đổi mật khẩu thành công" });
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      toast({ title: "Mật khẩu cũ không đúng", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>Tài khoản - Apple Store VN</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-8">
          <h1 className="text-3xl font-bold mb-8">Tài khoản của tôi</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-secondary/50 p-1 rounded-full w-full sm:w-auto flex-wrap h-auto">
              <TabsTrigger value="profile" className="rounded-full data-[state=active]:bg-background">
                <User className="w-4 h-4 mr-2" />
                Thông tin
              </TabsTrigger>
              <TabsTrigger value="addresses" className="rounded-full data-[state=active]:bg-background">
                <MapPin className="w-4 h-4 mr-2" />
                Địa chỉ
              </TabsTrigger>
              <TabsTrigger value="orders" className="rounded-full data-[state=active]:bg-background">
                <Package className="w-4 h-4 mr-2" />
                Đơn hàng
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="rounded-full data-[state=active]:bg-background">
                <Heart className="w-4 h-4 mr-2" />
                Yêu thích
              </TabsTrigger>
              <TabsTrigger value="password" className="rounded-full data-[state=active]:bg-background">
                <Key className="w-4 h-4 mr-2" />
                Mật khẩu
              </TabsTrigger>
            </TabsList>

            {/* Hồ sơ */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                  <CardDescription>Quản lý thông tin tài khoản của bạn</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ và tên</Label>
                      <Input
                        id="fullName"
                        value={profile.fullName}
                        onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      {isEditing ? (
                        <>
                          <Button type="submit">Lưu thay đổi</Button>
                          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Hủy</Button>
                        </>
                      ) : (
                        <Button type="button" onClick={() => setIsEditing(true)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </Button>
                      )}
                    </div>
                  </form>

                  <div className="border-t mt-8 pt-8">
                    <Button variant="outline" className="text-destructive hover:text-destructive" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng xuất
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sổ địa chỉ */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Sổ địa chỉ</CardTitle>
                    <CardDescription>Quản lý địa chỉ giao hàng</CardDescription>
                  </div>
                  <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => { setEditingAddress(null); setAddressForm({ name: "", phone: "", address: "", city: "", district: "", ward: "", isDefault: false }); }}>
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm địa chỉ
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-background">
                      <DialogHeader>
                        <DialogTitle>{editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Họ tên</Label>
                            <Input value={addressForm.name} onChange={(e) => setAddressForm(p => ({ ...p, name: e.target.value }))} required />
                          </div>
                          <div className="space-y-2">
                            <Label>Số điện thoại</Label>
                            <Input value={addressForm.phone} onChange={(e) => setAddressForm(p => ({ ...p, phone: e.target.value }))} required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Địa chỉ</Label>
                          <Input value={addressForm.address} onChange={(e) => setAddressForm(p => ({ ...p, address: e.target.value }))} required />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Tỉnh/Thành</Label>
                            <Input value={addressForm.city} onChange={(e) => setAddressForm(p => ({ ...p, city: e.target.value }))} required />
                          </div>
                          <div className="space-y-2">
                            <Label>Quận/Huyện</Label>
                            <Input value={addressForm.district} onChange={(e) => setAddressForm(p => ({ ...p, district: e.target.value }))} />
                          </div>
                          <div className="space-y-2">
                            <Label>Phường/Xã</Label>
                            <Input value={addressForm.ward} onChange={(e) => setAddressForm(p => ({ ...p, ward: e.target.value }))} />
                          </div>
                        </div>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={addressForm.isDefault} onChange={(e) => setAddressForm(p => ({ ...p, isDefault: e.target.checked }))} />
                          <span className="text-sm">Đặt làm địa chỉ mặc định</span>
                        </label>
                        <Button type="submit" className="w-full">{editingAddress ? "Cập nhật" : "Thêm địa chỉ"}</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user?.addresses.map((address) => (
                      <div key={address.id} className={`p-4 border rounded-xl ${address.isDefault ? "border-primary bg-primary/5" : "border-border"}`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{address.name}</p>
                              {address.isDefault && <Badge variant="secondary">Mặc định</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{address.phone}</p>
                            <p className="text-sm mt-2">{address.address}, {address.ward}, {address.district}, {address.city}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openEditAddress(address)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            {!address.isDefault && (
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                        </div>
                        {!address.isDefault && (
                          <Button variant="link" className="p-0 h-auto mt-2 text-primary" onClick={() => { setDefaultAddress(address.id); toast({ title: "Đã đặt làm địa chỉ mặc định" }); }}>
                            Đặt làm mặc định
                          </Button>
                        )}
                      </div>
                    ))}
                    {(!user?.addresses || user.addresses.length === 0) && (
                      <p className="text-muted-foreground text-center py-8">Chưa có địa chỉ nào</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Lịch sử đơn hàng */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Lịch sử đơn hàng</CardTitle>
                  <CardDescription>Theo dõi và quản lý đơn hàng của bạn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="p-4 border border-border rounded-xl hover:border-primary/50 transition-colors">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <p className="font-semibold">#{order.id}</p>
                              <Badge variant={statusMap[order.status].variant}>{statusMap[order.status].label}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString("vi-VN")} • {order.items} sản phẩm
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">
                              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
                            </p>
                            <Button variant="link" className="p-0 h-auto" asChild>
                              <Link to={`/order/${order.id}`}>Xem chi tiết →</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Đổi mật khẩu */}
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Đổi mật khẩu</CardTitle>
                  <CardDescription>Cập nhật mật khẩu để bảo mật tài khoản</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="oldPassword">Mật khẩu hiện tại</Label>
                      <div className="relative">
                        <Input
                          id="oldPassword"
                          type={showPassword ? "text" : "password"}
                          value={passwordForm.oldPassword}
                          onChange={(e) => setPasswordForm(p => ({ ...p, oldPassword: e.target.value }))}
                          required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Mật khẩu mới</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                        required
                      />
                    </div>
                    <Button type="submit">Đổi mật khẩu</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  );
};

export default Account;
