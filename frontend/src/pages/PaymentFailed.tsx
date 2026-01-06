import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import { Helmet } from "react-helmet-async";
import { XCircle, RefreshCw, ArrowLeft } from "lucide-react";

const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const failedData = location.state as {
    reason: string;
    checkoutItems: any[];
    totalPrice: number;
    shippingFee: number;
    finalTotal: number;
    address: any;
    note: string;
    isBuyNow: boolean;
  } | undefined;

  const handleRetry = () => {
    if (failedData) {
      navigate("/payment", {
        state: failedData,
      });
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      <Helmet>
        <title>Thanh toán thất bại - Apple Store VN</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-20 text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-destructive" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-destructive">Thanh toán thất bại</h1>
            <p className="text-muted-foreground mb-4">
              {failedData?.reason || "Đã có lỗi xảy ra trong quá trình thanh toán."}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Vui lòng kiểm tra lại thông tin thanh toán hoặc thử phương thức thanh toán khác.
            </p>

            <div className="bg-card rounded-xl p-6 mb-8 border border-border">
              <h3 className="font-medium mb-3">Có thể do một số nguyên nhân:</h3>
              <ul className="text-sm text-muted-foreground text-left space-y-2">
                <li>• Số dư tài khoản không đủ</li>
                <li>• Thông tin thẻ không chính xác</li>
                <li>• Kết nối mạng không ổn định</li>
                <li>• Giao dịch bị từ chối bởi ngân hàng</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/cart">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Về giỏ hàng
                </Link>
              </Button>
              <Button onClick={handleRetry} className="rounded-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Thử lại thanh toán
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PaymentFailed;
