import { Link } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
  return (
    <>
      <Helmet>
        <title>Đặt hàng thành công - Apple Store VN</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
            <p className="text-muted-foreground mb-8">
              Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.
            </p>

            <div className="bg-card rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center gap-3 text-primary mb-4">
                <Package className="w-5 h-5" />
                <span className="font-medium">Theo dõi đơn hàng</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Bạn có thể theo dõi trạng thái đơn hàng trong mục "Tài khoản" → "Đơn hàng"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/account">
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

export default OrderSuccess;
