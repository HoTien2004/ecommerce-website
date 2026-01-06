import { Layout } from "../../components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Shield, CheckCircle, XCircle } from "lucide-react";

const warrantyPeriods = [
  { product: "iPhone", period: "12 tháng" },
  { product: "MacBook", period: "12 tháng" },
  { product: "iPad", period: "12 tháng" },
  { product: "Apple Watch", period: "12 tháng" },
  { product: "AirPods", period: "12 tháng" },
  { product: "Phụ kiện Apple", period: "6 tháng" },
  { product: "Phụ kiện hãng khác", period: "3-6 tháng" },
];

const coveredItems = [
  "Lỗi phần cứng do nhà sản xuất",
  "Lỗi phần mềm hệ thống",
  "Màn hình bị điểm chết (dead pixel)",
  "Lỗi pin (dung lượng dưới 80%)",
  "Camera không hoạt động đúng",
  "Loa, mic gặp sự cố",
];

const notCoveredItems = [
  "Hư hỏng do va đập, rơi vỡ",
  "Hư hỏng do nước, chất lỏng",
  "Tự ý tháo lắp, sửa chữa",
  "Sử dụng phụ kiện không chính hãng",
  "Hư hỏng do thiên tai",
  "Hết thời hạn bảo hành",
];

const WarrantyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Chính sách bảo hành - Apple Store VN</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-12">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Chính sách bảo hành</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Apple Store VN cam kết bảo hành chính hãng cho tất cả sản phẩm
          </p>

          {/* Warranty Periods */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Thời gian bảo hành theo sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {warrantyPeriods.map((item) => (
                  <div key={item.product} className="flex justify-between p-4 bg-secondary rounded-lg">
                    <span className="font-medium">{item.product}</span>
                    <span className="text-primary font-bold">{item.period}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Coverage */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  Được bảo hành
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {coveredItems.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="w-5 h-5" />
                  Không được bảo hành
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {notCoveredItems.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-destructive shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Process */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quy trình bảo hành</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { step: 1, title: "Liên hệ", desc: "Gọi hotline hoặc đến cửa hàng" },
                  { step: 2, title: "Kiểm tra", desc: "Kỹ thuật viên kiểm tra sản phẩm" },
                  { step: 3, title: "Xử lý", desc: "Sửa chữa hoặc đổi mới" },
                  { step: 4, title: "Nhận hàng", desc: "Nhận sản phẩm đã bảo hành" },
                ].map((item) => (
                  <div key={item.step} className="text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                      {item.step}
                    </div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <h2 className="text-2xl font-bold mb-4">Câu hỏi về bảo hành</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="1">
              <AccordionTrigger>Tôi cần mang theo gì khi đến bảo hành?</AccordionTrigger>
              <AccordionContent>
                Bạn cần mang theo sản phẩm, hóa đơn mua hàng và phiếu bảo hành (nếu có). Đối với sản phẩm Apple chính hãng, bạn có thể tra cứu bảo hành bằng IMEI/Serial.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionTrigger>Thời gian bảo hành mất bao lâu?</AccordionTrigger>
              <AccordionContent>
                Tùy vào tình trạng lỗi, thời gian bảo hành từ 1-7 ngày làm việc. Với các lỗi đơn giản có thể xử lý trong ngày.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="3">
              <AccordionTrigger>Tôi có được mượn máy thay thế không?</AccordionTrigger>
              <AccordionContent>
                Có, chúng tôi cung cấp máy mượn miễn phí trong thời gian bảo hành (tùy tình trạng và sản phẩm).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Layout>
    </>
  );
};

export default WarrantyPolicy;
