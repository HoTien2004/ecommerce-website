import { Layout } from "../../components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Search, ShoppingCart, CreditCard, Truck, CheckCircle } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Tìm kiếm sản phẩm",
    description: "Duyệt danh mục hoặc sử dụng thanh tìm kiếm để tìm sản phẩm bạn cần. Xem chi tiết thông số kỹ thuật, màu sắc và dung lượng.",
    icon: Search,
  },
  {
    step: 2,
    title: "Thêm vào giỏ hàng",
    description: "Chọn màu sắc, dung lượng phù hợp và nhấn \"Thêm vào giỏ\" hoặc \"Mua ngay\" để thanh toán ngay lập tức.",
    icon: ShoppingCart,
  },
  {
    step: 3,
    title: "Thanh toán",
    description: "Điền thông tin giao hàng, chọn phương thức thanh toán: COD, chuyển khoản, VNPay, Momo hoặc thẻ tín dụng.",
    icon: CreditCard,
  },
  {
    step: 4,
    title: "Giao hàng",
    description: "Đơn hàng sẽ được xác nhận qua SMS/Email. Theo dõi trạng thái đơn hàng trong tài khoản của bạn.",
    icon: Truck,
  },
  {
    step: 5,
    title: "Nhận hàng & Kiểm tra",
    description: "Kiểm tra sản phẩm khi nhận, xác nhận tình trạng nguyên seal. Kích hoạt bảo hành và bắt đầu sử dụng.",
    icon: CheckCircle,
  },
];

const paymentMethods = [
  { name: "COD", desc: "Thanh toán khi nhận hàng" },
  { name: "VNPay", desc: "QR Code hoặc thẻ ATM nội địa" },
  { name: "Momo", desc: "Ví điện tử Momo" },
  { name: "Thẻ quốc tế", desc: "Visa, MasterCard, JCB" },
  { name: "Chuyển khoản", desc: "Chuyển khoản ngân hàng" },
  { name: "Trả góp", desc: "0% lãi suất qua các ngân hàng đối tác" },
];

const ShoppingGuide = () => {
  return (
    <>
      <Helmet>
        <title>Hướng dẫn mua hàng - Apple Store VN</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-12">
          <h1 className="text-3xl font-bold mb-2">Hướng dẫn mua hàng</h1>
          <p className="text-muted-foreground mb-8">Quy trình đặt hàng đơn giản, nhanh chóng tại Apple Store VN</p>

          {/* Steps */}
          <div className="space-y-6 mb-12">
            {steps.map((step) => (
              <Card key={step.step}>
                <CardContent className="flex items-start gap-6 p-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm text-primary font-medium mb-1">Bước {step.step}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Methods */}
          <h2 className="text-2xl font-bold mb-6">Phương thức thanh toán</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {paymentMethods.map((method) => (
              <Card key={method.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{method.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Notes */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Lưu ý quan trọng</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Kiểm tra kỹ thông tin đơn hàng trước khi xác nhận</li>
                <li>• Giữ lại hóa đơn để phục vụ bảo hành</li>
                <li>• Liên hệ hotline 1900 1234 nếu cần hỗ trợ</li>
                <li>• Đơn hàng từ 1.000.000đ được miễn phí vận chuyển</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default ShoppingGuide;
