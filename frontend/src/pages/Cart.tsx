import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../data/products";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useToast } from "../hooks/use-toast";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, updateQuantity, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>(
    items.map((item) => `${item.product.id}-${item.selectedColor}-${item.selectedStorage}`)
  );
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Giỏ hàng - Apple Store VN</title>
        </Helmet>
        <Layout>
          <div className="container-apple py-20 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Giỏ hàng trống</h1>
            <p className="text-muted-foreground mb-6">
              Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
            </p>
            <Button asChild>
              <Link to="/products">Khám phá sản phẩm</Link>
            </Button>
          </div>
        </Layout>
      </>
    );
  }

  const getItemKey = (item: typeof items[0]) =>
    `${item.product.id}-${item.selectedColor}-${item.selectedStorage}`;

  const toggleItem = (key: string) => {
    setSelectedItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(getItemKey));
    }
  };

  const removeSelected = () => {
    selectedItems.forEach((key) => {
      const productId = key.split("-")[0];
      removeFromCart(productId);
    });
    setSelectedItems([]);
  };

  const selectedCartItems = items.filter((item) => selectedItems.includes(getItemKey(item)));
  const subtotal = selectedCartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const originalTotal = selectedCartItems.reduce(
    (sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );
  const productDiscount = originalTotal - subtotal;
  const shippingFee = subtotal >= 5000000 ? 0 : subtotal > 0 ? 30000 : 0;
  const finalTotal = subtotal - discount + shippingFee;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "APPLE10") {
      const discountAmount = Math.floor(subtotal * 0.1);
      setDiscount(discountAmount);
      toast({ title: "Áp dụng mã giảm giá thành công!" });
    } else {
      toast({ title: "Mã giảm giá không hợp lệ", variant: "destructive" });
    }
  };

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) {
      toast({ title: "Vui lòng chọn sản phẩm để thanh toán", variant: "destructive" });
      return;
    }
    navigate("/checkout", {
      state: { checkoutItems: selectedCartItems },
    });
  };

  return (
    <>
      <Helmet>
        <title>{`Giỏ hàng (${items.length} sản phẩm) - Apple Store VN`}</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-8">
          <h1 className="text-2xl font-bold mb-6">
            Giỏ hàng ({items.length} sản phẩm)
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Giỏ hàng */}
            <div className="lg:col-span-2 space-y-4">
              {/* Chọn tất cả */}
              <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={selectedItems.length === items.length}
                    onCheckedChange={toggleAll}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="font-medium text-primary">
                    Chọn tất cả ({selectedItems.length} sản phẩm)
                  </span>
                </label>
                {selectedItems.length > 0 && (
                  <button
                    onClick={removeSelected}
                    className="text-sm text-primary hover:underline"
                  >
                    Xóa đã chọn
                  </button>
                )}
              </div>

              {/* Items */}
              {items.map((item) => {
                const itemKey = getItemKey(item);
                const isSelected = selectedItems.includes(itemKey);
                return (
                  <div
                    key={itemKey}
                    className={`p-4 bg-card rounded-xl border transition-colors ${
                      isSelected ? "border-primary" : "border-border"
                    }`}
                  >
                    <div className="flex gap-4 items-start">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleItem(itemKey)}
                        className="mt-8 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Link to={`/product/${item.product.id}`} className="shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-lg bg-secondary"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-semibold hover:text-primary line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-bold text-primary">
                            {formatPrice(item.product.price)}
                          </span>
                          {item.product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(item.product.originalPrice)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            size="sm"
                            className="rounded-full text-xs px-4"
                            onClick={() => {
                              navigate("/checkout", {
                                state: {
                                  buyNowItem: {
                                    product: item.product,
                                    quantity: item.quantity,
                                    selectedColor: item.selectedColor,
                                    selectedStorage: item.selectedStorage,
                                  },
                                },
                              });
                            }}
                          >
                            Mua ngay
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 sticky top-24 border border-border">
                <h2 className="font-semibold text-lg mb-4">Tóm tắt đơn hàng</h2>

                {/* Mã giảm giá */}
                <div className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Nhập mã giảm giá"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" onClick={handleApplyCoupon}>
                    Áp dụng
                  </Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Tạm tính ({selectedCartItems.length} sản phẩm)
                    </span>
                    <span>{formatPrice(originalTotal)}</span>
                  </div>
                  {productDiscount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Giảm giá sản phẩm</span>
                      <span>-{formatPrice(productDiscount)}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Mã giảm giá</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span className={shippingFee === 0 ? "text-primary" : ""}>
                      {shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}
                    </span>
                  </div>
                </div>

                <div className="border-t my-4" />

                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{formatPrice(finalTotal)}</span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full rounded-full"
                  size="lg"
                  disabled={selectedCartItems.length === 0}
                >
                  Tiến hành thanh toán →
                </Button>

                <Button asChild variant="outline" className="w-full mt-3 rounded-full">
                  <Link to="/products">Tiếp tục mua sắm</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Cart;
