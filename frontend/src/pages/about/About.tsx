import { Layout } from "../../components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "../../components/ui/card";
import { Award, Store, Truck, Shield, HeartHandshake } from "lucide-react";

const stats = [
  { label: "Năm thành lập", value: "2015" },
  { label: "Cửa hàng", value: "25+" },
  { label: "Khách hàng", value: "500K+" },
  { label: "Sản phẩm đã bán", value: "1M+" },
];

const values = [
  {
    icon: Award,
    title: "Chính hãng 100%",
    description: "Cam kết 100% sản phẩm Apple chính hãng, nguyên seal, đầy đủ VAT và bảo hành.",
  },
  {
    icon: Shield,
    title: "Bảo hành uy tín",
    description: "Bảo hành chính hãng Apple, hỗ trợ đổi trả 30 ngày, bảo hành 1 đổi 1 trong 7 ngày.",
  },
  {
    icon: Truck,
    title: "Giao hàng nhanh",
    description: "Giao hàng trong 2h nội thành, miễn phí ship đơn từ 1 triệu đồng.",
  },
  {
    icon: HeartHandshake,
    title: "Hỗ trợ tận tâm",
    description: "Đội ngũ tư vấn viên nhiệt tình, hỗ trợ 24/7 qua hotline và live chat.",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>Giới thiệu - Apple Store VN</title>
        <meta name="description" content="Apple Store VN - Hệ thống bán lẻ Apple uy tín hàng đầu Việt Nam" />
      </Helmet>
      <Layout>
        {/* Hero */}
        <div className="bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container-apple text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Apple Store VN</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hệ thống bán lẻ Apple ủy quyền hàng đầu Việt Nam, mang đến trải nghiệm mua sắm tuyệt vời nhất cho khách hàng.
            </p>
          </div>
        </div>

        <div className="container-apple py-12">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Story */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Câu chuyện của chúng tôi</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Apple Store VN được thành lập vào năm 2015 với sứ mệnh mang đến cho người Việt những sản phẩm Apple chính hãng với giá cả hợp lý và dịch vụ chăm sóc khách hàng tốt nhất.
                </p>
                <p>
                  Từ một cửa hàng nhỏ tại TP.HCM, chúng tôi đã phát triển thành hệ thống hơn 25 cửa hàng trên toàn quốc, phục vụ hơn 500,000 khách hàng mỗi năm.
                </p>
                <p>
                  Với đội ngũ nhân viên được đào tạo bài bản về sản phẩm Apple, chúng tôi tự hào là đối tác ủy quyền đáng tin cậy của Apple tại Việt Nam.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl aspect-video flex items-center justify-center">
              <Store className="w-24 h-24 text-primary/50" />
            </div>
          </div>

          {/* Values */}
          <h2 className="text-3xl font-bold text-center mb-8">Giá trị cốt lõi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="pt-6 text-center">
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Vision */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Tầm nhìn & Sứ mệnh</h2>
              <p className="max-w-2xl mx-auto opacity-90">
                Trở thành hệ thống bán lẻ Apple số 1 Việt Nam, nơi mọi người có thể trải nghiệm và sở hữu sản phẩm Apple với dịch vụ tốt nhất, giá cả hợp lý nhất.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default About;
