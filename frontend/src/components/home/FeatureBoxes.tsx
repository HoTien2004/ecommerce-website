import { Truck, Shield, Headphones, CreditCard } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Miễn phí vận chuyển",
    description: "Cho đơn hàng trên 5 triệu",
  },
  {
    icon: Shield,
    title: "Bảo hành chính hãng",
    description: "Bảo hành 12 tháng toàn quốc",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Tư vấn miễn phí mọi lúc",
  },
  {
    icon: CreditCard,
    title: "Thanh toán an toàn",
    description: "Bảo mật thông tin 100%",
  },
];

export const FeatureBoxes = () => {
  return (
    <section className="container-apple py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};