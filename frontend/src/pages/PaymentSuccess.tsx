import { Link, useLocation } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Package, ArrowRight, Copy } from "lucide-react";
import { formatPrice } from "../data/products";
import { useToast } from "../hooks/use-toast";

const PaymentSuccess = () => {
  const location = useLocation();
  const { toast } = useToast();
  const orderData = location.state as {
    orderId: string;
    finalTotal: number;
    checkoutItems: any[];
  } | undefined;

  const copyOrderId = () => {
    if (orderData?.orderId) {
      navigator.clipboard.writeText(orderData.orderId);
      toast({ title: "Đã sao chép mã đơn hàng" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Thanh toán thành công - Apple Store VN</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-20 text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-green-600">Thanh toán thành công!</h1>
            <p className="text-muted-foreground mb-8">
              Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận và sẽ được giao sớm nhất.
            </p>

            {orderData && (
              <div className="bg-card rounded-xl p-6 mb-8 border border-border text-left">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Mã đơn hàng:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{orderData.orderId}</span>
                    <button 
                      onClick={copyOrderId}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Số sản phẩm:</span>
                  <span className="font-medium">{orderData.checkoutItems?.length || 0} sản phẩm</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tổng thanh toán:</span>
                  <span className="font-bold text-lg text-primary">
                    {formatPrice(orderData.finalTotal)}
                  </span>
                </div>
              </div>
            )}

            <div className="bg-primary/5 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center gap-3 text-primary mb-3">
                <Package className="w-5 h-5" />
                <span className="font-medium">Theo dõi đơn hàng</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Bạn có thể theo dõi trạng thái đơn hàng trong mục "Tài khoản" → "Đơn hàng của tôi"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/account/orders">
                  Xem đơn hàng
                </Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link to="/products">
                  Tiếp tục mua sắm
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PaymentSuccess;
