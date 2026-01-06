import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { useCart, type CartItem } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { formatPrice, type Product } from "../data/products";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { MapPin, Plus, FileText } from "lucide-react";

interface CheckoutItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedStorage?: string;
}

const Checkout = () => {
  const location = useLocation();
  const { items: cartItems } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if coming from "Buy Now" with a specific product or selected items
  const buyNowItem = location.state?.buyNowItem as CheckoutItem | undefined;
  const checkoutItemsFromCart = location.state?.checkoutItems as CartItem[] | undefined;
  
  // Use buyNowItem if available, otherwise use passed checkout items or cart items
  const checkoutItems: CheckoutItem[] = buyNowItem 
    ? [buyNowItem] 
    : checkoutItemsFromCart || cartItems;
    
  const totalPrice = checkoutItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const [selectedAddressId, setSelectedAddressId] = useState(
    user?.addresses.find(a => a.isDefault)?.id || user?.addresses[0]?.id || ""
  );
  const [useNewAddress, setUseNewAddress] = useState(!isAuthenticated || !user?.addresses.length);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    ward: "",
  });
  const [note, setNote] = useState("");

  const shippingFee = totalPrice >= 5000000 ? 0 : 30000;
  const finalTotal = totalPrice + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinueToPayment = () => {
    if (useNewAddress) {
      if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
        toast({
          title: "Vui lòng điền đầy đủ thông tin",
          description: "Các trường bắt buộc: Họ tên, Số điện thoại, Địa chỉ, Tỉnh/Thành phố",
          variant: "destructive",
        });
        return;
      }
    } else if (!selectedAddressId) {
      toast({
        title: "Vui lòng chọn địa chỉ giao hàng",
        variant: "destructive",
      });
      return;
    }

    navigate("/payment", {
      state: {
        checkoutItems,
        totalPrice,
        shippingFee,
        finalTotal,
        address: useNewAddress ? formData : user?.addresses.find(a => a.id === selectedAddressId),
        note,
        isBuyNow: !!buyNowItem,
      },
    });
  };

  if (checkoutItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Thanh toán - Apple Store VN</title>
        </Helmet>
        <Layout>
          <div className="container-apple py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Không có sản phẩm</h1>
            <p className="text-muted-foreground mb-6">
              Vui lòng chọn sản phẩm trước khi thanh toán
            </p>
            <Button asChild>
              <Link to="/products">Khám phá sản phẩm</Link>
            </Button>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Thanh toán - Apple Store VN</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-8">
          <h1 className="text-2xl font-bold mb-8">Thanh toán</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-lg text-primary">Địa chỉ giao hàng</h2>
                </div>

                {isAuthenticated && user?.addresses && user.addresses.length > 0 ? (
                  <RadioGroup 
                    value={useNewAddress ? "new" : selectedAddressId} 
                    onValueChange={(val) => {
                      if (val === "new") {
                        setUseNewAddress(true);
                      } else {
                        setUseNewAddress(false);
                        setSelectedAddressId(val);
                      }
                    }}
                    className="space-y-3"
                  >
                    {user.addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                          !useNewAddress && selectedAddressId === addr.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={addr.id} className="mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{addr.name}</p>
                            {addr.isDefault && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                                Mặc định
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{addr.phone}</p>
                          <p className="text-sm mt-1">{addr.address}, {addr.ward}, {addr.city}</p>
                        </div>
                      </label>
                    ))}
                    
                    <label
                      className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                        useNewAddress
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="new" />
                      <Plus className="w-5 h-5 text-primary" />
                      <span className="font-medium text-primary">Thêm địa chỉ mới</span>
                    </label>
                  </RadioGroup>
                ) : null}

                {/* New Address Form */}
                {useNewAddress && (
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ và tên *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0912 345 678"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Địa chỉ *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Số nhà, tên đường..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ward">Phường/Xã</Label>
                      <Input
                        id="ward"
                        name="ward"
                        value={formData.ward}
                        onChange={handleInputChange}
                        placeholder="Phường Bến Nghé"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Tỉnh/Thành phố *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="TP. Hồ Chí Minh"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Notes */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-lg text-primary">Ghi chú đơn hàng</h2>
                </div>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết hơn"
                  rows={4}
                />
              </div>

              {/* Products List */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="font-semibold text-lg mb-4">Sản phẩm đặt mua</h2>
                <div className="space-y-4">
                  {checkoutItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`}
                      className="flex gap-4 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg bg-secondary"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                      </div>
                      <p className="font-semibold text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
                <h2 className="font-semibold text-lg mb-4">Tóm tắt đơn hàng</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span >{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span className={shippingFee === 0 ? "text-primary font-medium" : ""}>
                      {shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}
                    </span>
                  </div>
                  {shippingFee === 0 && (
                    <p className="text-xs text-primary">
                      Miễn phí vận chuyển cho đơn hàng trên 5 triệu
                    </p>
                  )}
                </div>

                <div className="border-t my-4" />

                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{formatPrice(finalTotal)}</span>
                </div>

                <Button 
                  onClick={handleContinueToPayment}
                  className="w-full rounded-full" 
                  size="lg"
                >
                  Tiếp tục chọn thanh toán
                </Button>

                <Button asChild variant="outline" className="w-full mt-3 rounded-full">
                  <Link to="/cart">Quay lại giỏ hàng</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;