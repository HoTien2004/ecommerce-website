import { Layout } from "../../components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { HelpCircle } from "lucide-react";

const faqData = {
  ordering: [
    {
      q: "Làm thế nào để đặt hàng?",
      a: "Bạn có thể đặt hàng trực tiếp trên website bằng cách chọn sản phẩm, thêm vào giỏ hàng và tiến hành thanh toán. Hoặc liên hệ hotline 1900 1234 để được hỗ trợ.",
    },
    {
      q: "Tôi có thể thanh toán bằng những phương thức nào?",
      a: "Chúng tôi hỗ trợ: COD (thanh toán khi nhận hàng), VNPay, Momo, thẻ tín dụng Visa/MasterCard, chuyển khoản ngân hàng và trả góp 0%.",
    },
    {
      q: "Làm sao để theo dõi đơn hàng?",
      a: "Đăng nhập vào tài khoản, vào mục 'Đơn hàng của tôi' để xem trạng thái đơn hàng. Bạn cũng sẽ nhận được SMS/Email cập nhật khi đơn hàng thay đổi trạng thái.",
    },
    {
      q: "Tôi có thể hủy đơn hàng không?",
      a: "Bạn có thể hủy đơn hàng khi đơn chưa được xác nhận giao hàng. Vào mục 'Đơn hàng' và chọn 'Hủy đơn' hoặc liên hệ hotline.",
    },
  ],
  shipping: [
    {
      q: "Thời gian giao hàng là bao lâu?",
      a: "Nội thành HCM, Hà Nội: 1-2 ngày. Các tỉnh thành khác: 2-5 ngày. Đơn hàng trước 14h sẽ được giao trong ngày (nội thành).",
    },
    {
      q: "Phí vận chuyển là bao nhiêu?",
      a: "Miễn phí vận chuyển cho đơn hàng từ 1.000.000đ. Đơn dưới 1.000.000đ phí ship 30.000đ.",
    },
    {
      q: "Tôi có thể nhận hàng tại cửa hàng không?",
      a: "Có, bạn có thể chọn 'Nhận tại cửa hàng' khi đặt hàng. Sản phẩm sẽ sẵn sàng trong 2 giờ sau khi đặt.",
    },
  ],
  warranty: [
    {
      q: "Sản phẩm được bảo hành bao lâu?",
      a: "iPhone, MacBook, iPad, Apple Watch: 12 tháng. Phụ kiện Apple: 6 tháng. Phụ kiện hãng khác: 3-6 tháng.",
    },
    {
      q: "Bảo hành ở đâu?",
      a: "Bạn có thể mang sản phẩm đến bất kỳ cửa hàng nào trong hệ thống Apple Store VN hoặc các trung tâm bảo hành ủy quyền của Apple.",
    },
    {
      q: "Làm sao kiểm tra thời hạn bảo hành?",
      a: "Truy cập checkcoverage.apple.com và nhập số Serial của sản phẩm để kiểm tra.",
    },
  ],
  payment: [
    {
      q: "Trả góp như thế nào?",
      a: "Chúng tôi hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng các ngân hàng: Techcombank, VPBank, Sacombank, VIB... Kỳ hạn từ 3-24 tháng.",
    },
    {
      q: "Có cần chứng minh thu nhập không?",
      a: "Trả góp qua thẻ tín dụng không cần chứng minh thu nhập. Trả góp qua công ty tài chính cần CMND/CCCD và sao kê tài khoản.",
    },
    {
      q: "Thanh toán online có an toàn không?",
      a: "Tất cả giao dịch đều được mã hóa SSL 256-bit. Chúng tôi không lưu trữ thông tin thẻ của bạn.",
    },
  ],
  product: [
    {
      q: "Sản phẩm có phải hàng chính hãng không?",
      a: "100% sản phẩm tại Apple Store VN là hàng chính hãng Apple Việt Nam, nguyên seal, đầy đủ VAT và bảo hành chính hãng.",
    },
    {
      q: "Làm sao phân biệt hàng thật - giả?",
      a: "Kiểm tra Serial trên checkcoverage.apple.com, so sánh với thông tin trên hộp. Sản phẩm chính hãng có tem bảo hành Apple Việt Nam.",
    },
    {
      q: "Có thể trade-in máy cũ không?",
      a: "Có, chúng tôi thu mua và trade-in các sản phẩm Apple cũ với giá tốt nhất thị trường. Liên hệ cửa hàng để được định giá.",
    },
  ],
};

const FAQ = () => {
  return (
    <>
      <Helmet>
        <title>Câu hỏi thường gặp - Apple Store VN</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-12">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Câu hỏi thường gặp</h1>
          </div>
          <p className="text-muted-foreground mb-8">Tìm câu trả lời cho các thắc mắc phổ biến</p>

          <Tabs defaultValue="ordering" className="space-y-6">
            <TabsList className="flex-wrap h-auto gap-2">
              <TabsTrigger value="ordering">Đặt hàng</TabsTrigger>
              <TabsTrigger value="shipping">Vận chuyển</TabsTrigger>
              <TabsTrigger value="warranty">Bảo hành</TabsTrigger>
              <TabsTrigger value="payment">Thanh toán</TabsTrigger>
              <TabsTrigger value="product">Sản phẩm</TabsTrigger>
            </TabsList>

            {Object.entries(faqData).map(([key, questions]) => (
              <TabsContent key={key} value={key}>
                <Accordion type="single" collapsible className="w-full">
                  {questions.map((item, index) => (
                    <AccordionItem key={index} value={`${key}-${index}`}>
                      <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Layout>
    </>
  );
};

export default FAQ;
