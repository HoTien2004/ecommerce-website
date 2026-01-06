import { Link } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { 
  HelpCircle, 
  ShoppingCart, 
  Shield, 
  RefreshCw, 
  MessageCircle,
  Phone,
  Mail
} from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const supportLinks = [
  {
    title: "Hướng dẫn mua hàng",
    description: "Các bước đặt hàng, thanh toán online và offline",
    icon: ShoppingCart,
    href: "/support/shopping-guide",
  },
  {
    title: "Chính sách bảo hành",
    description: "Điều kiện và quy trình bảo hành sản phẩm",
    icon: Shield,
    href: "/support/warranty",
  },
  {
    title: "Chính sách đổi trả",
    description: "Hướng dẫn đổi trả sản phẩm trong 30 ngày",
    icon: RefreshCw,
    href: "/support/returns",
  },
  {
    title: "Câu hỏi thường gặp",
    description: "Giải đáp các thắc mắc phổ biến",
    icon: HelpCircle,
    href: "/support/faq",
  },
];

const SupportCenter = () => {
  return (
    <>
      <Helmet>
        <title>Trung tâm hỗ trợ - Apple Store VN</title>
        <meta name="description" content="Trung tâm hỗ trợ khách hàng Apple Store VN - Hướng dẫn mua hàng, bảo hành, đổi trả và FAQ" />
      </Helmet>
      <Layout>
        <div className="container-apple py-12">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Trung tâm hỗ trợ</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn. Tìm câu trả lời nhanh chóng hoặc liên hệ trực tiếp với đội ngũ hỗ trợ.
            </p>
          </div>

          {/* Support Links */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {supportLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Card className="h-full hover:border-primary transition-colors">
                  <CardHeader>
                    <link.icon className="w-10 h-10 text-primary mb-2" />
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                    <CardDescription>{link.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-center mb-8">Liên hệ hỗ trợ</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Hotline</h3>
                <p className="text-primary font-bold text-lg">1900 1234</p>
                <p className="text-sm text-muted-foreground">8:00 - 22:00 hàng ngày</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-primary font-bold">support@applestore.vn</p>
                <p className="text-sm text-muted-foreground">Phản hồi trong 24h</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <Button className="rounded-full">Chat ngay</Button>
                <p className="text-sm text-muted-foreground mt-2">Hỗ trợ trực tuyến 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SupportCenter;
