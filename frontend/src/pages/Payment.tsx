import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { useCart } from "../contexts/CartContext";
import { formatPrice,type Product } from "../data/products";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { useToast } from "../hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { 
  CreditCard, 
  Wallet, 
  Banknote, 
  Building2,
  ShieldCheck,
  ChevronLeft
} from "lucide-react";

interface CheckoutItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedStorage?: string;
}

const paymentMethods = [
  { 
    id: "vnpay", 
    name: "VNPay", 
    icon: CreditCard, 
    description: "Thanh toán qua VNPay QR" 
  },
  { 
    id: "momo", 
    name: "Ví MoMo", 
    icon: Wallet, 
    description: "Thanh toán qua ví MoMo" 
  },
  { 
    id: "bank", 
    name: "Chuyển khoản ngân hàng", 
    icon: Building2, 
    description: "Chuyển khoản trực tiếp" 
  },
  { 
    id: "cod", 
    name: "Thanh toán khi nhận hàng", 
    icon: Banknote, 
    description: "COD - Cash on Delivery" 
  },
];

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clearCart } = useCart();
  
  const checkoutData = location.state as {
    checkoutItems: CheckoutItem[];
    totalPrice: number;
    shippingFee: number;
    finalTotal: number;
    address: any;
    note: string;
    isBuyNow: boolean;
  } | undefined;

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!checkoutData) {
    return (
      <>
        <Helmet>
          <title>Thanh toán - Apple Store VN</title>
        </Helmet>
        <Layout>
          <div className="container-apple py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Không có thông tin đơn hàng</h1>
            <p className="text-muted-foreground mb-6">
              Vui lòng quay lại giỏ hàng để tiếp tục
            </p>
            <Button asChild>
              <Link to="/cart">Về giỏ hàng</Link>
            </Button>
          </div>
        </Layout>
      </>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random success/failure (80% success rate)
    const isSuccess = Math.random() > 0.2;
    
    if (isSuccess) {
      // Clear cart if not buy now
      if (!checkoutData.isBuyNow) {
        clearCart();
      }
      navigate("/payment/success", {
        state: {
          orderId: `ORD${Date.now()}`,
          ...checkoutData,
        },
      });
    } else {
      navigate("/payment/failed", {
        state: {
          reason: "Thanh toán không thành công. Vui lòng thử lại.",
          ...checkoutData,
        },
      });
    }
    
    setIsProcessing(false);
  };

  return (
    <>
      <Helmet>
        <title>Chọn phương thức thanh toán - Apple Store VN</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-8">
          <Link 
            to="/checkout"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Quay lại
          </Link>

          <h1 className="text-2xl font-bold mb-8">Chọn phương thức thanh toán</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-6 border border-border">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={method.id} />
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <method.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Order Items Preview */}
              <div className="bg-card rounded-xl p-6 border border-border mt-6">
                <h2 className="font-semibold mb-4">Sản phẩm đặt mua</h2>
                <div className="space-y-3">
                  {checkoutData.checkoutItems.map((item) => (
                    <div 
                      key={`${item.product.id}-${item.selectedColor}`}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
                <h2 className="font-semibold text-lg mb-4">Chi tiết thanh toán</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span>{formatPrice(checkoutData.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span className={checkoutData.shippingFee === 0 ? "text-primary" : ""}>
                      {checkoutData.shippingFee === 0 ? "Miễn phí" : formatPrice(checkoutData.shippingFee)}
                    </span>
                  </div>
                </div>

                <div className="border-t my-4" />

                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Tổng thanh toán</span>
                  <span className="text-primary">{formatPrice(checkoutData.finalTotal)}</span>
                </div>

                <Button 
                  onClick={handlePayment}
                  className="w-full rounded-full" 
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Đang xử lý..." : "Xác nhận thanh toán"}
                </Button>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Thanh toán an toàn & bảo mật</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Payment;
