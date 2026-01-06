import { Layout } from "../../components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Chính sách đổi trả - Apple Store VN</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-12">
          <div className="flex items-center gap-3 mb-2">
            <RefreshCw className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Chính sách đổi trả</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Đổi trả dễ dàng trong 30 ngày - Hoàn tiền 100%
          </p>

          {/* Timeline */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-primary bg-primary/5">
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="text-4xl font-bold text-primary">7</span>
                  <span className="block text-sm text-muted-foreground mt-1">ngày đầu</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-medium mb-2">Đổi mới 1-1</p>
                <p className="text-sm text-muted-foreground">
                  Đổi sản phẩm mới nếu lỗi do nhà sản xuất. Không cần lý do với sản phẩm nguyên seal.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="text-4xl font-bold text-primary">15</span>
                  <span className="block text-sm text-muted-foreground mt-1">ngày</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-medium mb-2">Đổi trả linh hoạt</p>
                <p className="text-sm text-muted-foreground">
                  Đổi sản phẩm khác hoặc hoàn tiền nếu sản phẩm còn nguyên vẹn, đầy đủ phụ kiện.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="text-4xl font-bold text-primary">30</span>
                  <span className="block text-sm text-muted-foreground mt-1">ngày</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-medium mb-2">Hoàn tiền có phí</p>
                <p className="text-sm text-muted-foreground">
                  Hoàn tiền với phí 10% giá trị sản phẩm. Sản phẩm phải còn nguyên vẹn.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Conditions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  Điều kiện đổi trả
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    Sản phẩm còn nguyên tem, seal, hộp và phụ kiện đầy đủ
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    Có hóa đơn mua hàng hoặc phiếu bảo hành
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    Sản phẩm không có dấu hiệu va đập, trầy xước
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    Đã xóa tài khoản iCloud (với sản phẩm Apple)
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-5 h-5" />
                  Không áp dụng đổi trả
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    Sản phẩm đã qua sử dụng, có dấu hiệu hư hỏng do người dùng
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    Sản phẩm đã được kích hoạt bảo hành điện tử
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    Phụ kiện đã mở seal, tai nghe, dây cáp đã sử dụng
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    Sản phẩm mua trong các chương trình Flash Sale, Clearance
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Process */}
          <Card>
            <CardHeader>
              <CardTitle>Quy trình đổi trả</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: 1, title: "Liên hệ", desc: "Gọi hotline 1900 1234 hoặc chat online" },
                  { step: 2, title: "Xác nhận", desc: "Nhân viên xác nhận điều kiện đổi trả" },
                  { step: 3, title: "Gửi hàng", desc: "Mang đến cửa hàng hoặc gửi qua bưu điện" },
                  { step: 4, title: "Hoàn tất", desc: "Nhận sản phẩm mới hoặc hoàn tiền" },
                ].map((item) => (
                  <div key={item.step} className="text-center">
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
        </div>
      </Layout>
    </>
  );
};

export default ReturnPolicy;
