import { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { MapPin, Phone, Clock } from "lucide-react";

const stores = {
  "ho-chi-minh": [
    {
      name: "Apple Store Nguyễn Huệ",
      address: "123 Nguyễn Huệ, P. Bến Nghé, Q.1",
      phone: "028 1234 5678",
      hours: "9:00 - 21:30",
      mapUrl: "#",
    },
    {
      name: "Apple Store Lê Lợi",
      address: "456 Lê Lợi, P. Bến Thành, Q.1",
      phone: "028 1234 5679",
      hours: "9:00 - 21:30",
      mapUrl: "#",
    },
    {
      name: "Apple Store Vincom Đồng Khởi",
      address: "Tầng 3, Vincom Center, 72 Lê Thánh Tôn, Q.1",
      phone: "028 1234 5680",
      hours: "9:30 - 22:00",
      mapUrl: "#",
    },
    {
      name: "Apple Store Phạm Văn Đồng",
      address: "789 Phạm Văn Đồng, P. 13, Q. Bình Thạnh",
      phone: "028 1234 5681",
      hours: "9:00 - 21:00",
      mapUrl: "#",
    },
    {
      name: "Apple Store Aeon Mall Tân Phú",
      address: "Tầng 2, Aeon Mall Tân Phú, 30 Bờ Bao Tân Thắng",
      phone: "028 1234 5682",
      hours: "10:00 - 22:00",
      mapUrl: "#",
    },
  ],
  "ha-noi": [
    {
      name: "Apple Store Tràng Tiền",
      address: "12 Tràng Tiền, P. Tràng Tiền, Q. Hoàn Kiếm",
      phone: "024 1234 5678",
      hours: "9:00 - 21:30",
      mapUrl: "#",
    },
    {
      name: "Apple Store Vincom Bà Triệu",
      address: "Tầng 3, Vincom Center, 191 Bà Triệu, Q. Hai Bà Trưng",
      phone: "024 1234 5679",
      hours: "9:30 - 22:00",
      mapUrl: "#",
    },
    {
      name: "Apple Store Times City",
      address: "Tầng 2, Times City, 458 Minh Khai, Q. Hai Bà Trưng",
      phone: "024 1234 5680",
      hours: "10:00 - 22:00",
      mapUrl: "#",
    },
    {
      name: "Apple Store Royal City",
      address: "Tầng B2, Royal City, 72A Nguyễn Trãi, Q. Thanh Xuân",
      phone: "024 1234 5681",
      hours: "10:00 - 22:00",
      mapUrl: "#",
    },
  ],
  "da-nang": [
    {
      name: "Apple Store Nguyễn Văn Linh",
      address: "123 Nguyễn Văn Linh, Q. Hải Châu",
      phone: "0236 1234 567",
      hours: "9:00 - 21:00",
      mapUrl: "#",
    },
    {
      name: "Apple Store Vincom Đà Nẵng",
      address: "Tầng 2, Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
      phone: "0236 1234 568",
      hours: "9:30 - 22:00",
      mapUrl: "#",
    },
  ],
  other: [
    {
      name: "Apple Store Cần Thơ",
      address: "45 Đường 30/4, Q. Ninh Kiều, TP. Cần Thơ",
      phone: "0292 1234 567",
      hours: "9:00 - 21:00",
      mapUrl: "#",
    },
    {
      name: "Apple Store Hải Phòng",
      address: "67 Lạch Tray, Q. Ngô Quyền, TP. Hải Phòng",
      phone: "0225 1234 567",
      hours: "9:00 - 21:00",
      mapUrl: "#",
    },
    {
      name: "Apple Store Biên Hòa",
      address: "Tầng 1, Vincom Biên Hòa, TP. Biên Hòa, Đồng Nai",
      phone: "0251 1234 567",
      hours: "10:00 - 22:00",
      mapUrl: "#",
    },
  ],
};

const StoreLocations = () => {
  const [selectedCity, setSelectedCity] = useState("ho-chi-minh");

  return (
    <>
      <Helmet>
        <title>Hệ thống cửa hàng - Apple Store VN</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-12">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Hệ thống cửa hàng</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Hơn 25 cửa hàng trên toàn quốc, sẵn sàng phục vụ bạn
          </p>

          <Tabs value={selectedCity} onValueChange={setSelectedCity}>
            <TabsList className="mb-6">
              <TabsTrigger value="ho-chi-minh">TP. Hồ Chí Minh</TabsTrigger>
              <TabsTrigger value="ha-noi">Hà Nội</TabsTrigger>
              <TabsTrigger value="da-nang">Đà Nẵng</TabsTrigger>
              <TabsTrigger value="other">Tỉnh thành khác</TabsTrigger>
            </TabsList>

            {Object.entries(stores).map(([city, storeList]) => (
              <TabsContent key={city} value={city}>
                <div className="grid md:grid-cols-2 gap-6">
                  {storeList.map((store) => (
                    <Card key={store.name}>
                      <CardHeader>
                        <CardTitle className="text-lg">{store.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{store.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-sm">{store.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-sm">{store.hours}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Layout>
    </>
  );
};

export default StoreLocations;
