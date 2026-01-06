import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { products as initialProducts, categories, formatPrice } from "../../../data/products";
import { toast } from "../../../hooks/use-toast";
import { useState } from "react";

// Thông số kỹ thuật theo danh mục
const categorySpecs: Record<string, { label: string; key: string }[]> = {
  iphone: [
    { label: "Màn hình", key: "screen" },
    { label: "Chip", key: "chip" },
    { label: "RAM", key: "ram" },
    { label: "Bộ nhớ trong", key: "storage" },
    { label: "Camera sau", key: "rearCamera" },
    { label: "Camera trước", key: "frontCamera" },
    { label: "Pin", key: "battery" },
    { label: "SIM", key: "sim" },
    { label: "Hệ điều hành", key: "os" },
  ],
  ipad: [
    { label: "Màn hình", key: "screen" },
    { label: "Chip", key: "chip" },
    { label: "RAM", key: "ram" },
    { label: "Bộ nhớ trong", key: "storage" },
    { label: "Camera sau", key: "rearCamera" },
    { label: "Camera trước", key: "frontCamera" },
    { label: "Kết nối", key: "connectivity" },
    { label: "Hỗ trợ bút", key: "pencilSupport" },
  ],
  mac: [
    { label: "Màn hình", key: "screen" },
    { label: "Chip", key: "chip" },
    { label: "CPU", key: "cpu" },
    { label: "GPU", key: "gpu" },
    { label: "RAM", key: "ram" },
    { label: "SSD", key: "ssd" },
    { label: "Cổng kết nối", key: "ports" },
    { label: "Hệ điều hành", key: "os" },
  ],
  watch: [
    { label: "Kích thước", key: "size" },
    { label: "Màn hình", key: "screen" },
    { label: "Chip", key: "chip" },
    { label: "Chống nước", key: "waterResistance" },
    { label: "GPS", key: "gps" },
    { label: "Tính năng sức khỏe", key: "healthFeatures" },
    { label: "Thời lượng pin", key: "battery" },
  ],
  airpods: [
    { label: "Loại", key: "type" },
    { label: "Chip", key: "chip" },
    { label: "Chống ồn", key: "anc" },
    { label: "Chế độ xuyên âm", key: "transparency" },
    { label: "Thời lượng nghe", key: "listeningTime" },
    { label: "Thời lượng pin (kèm hộp)", key: "totalBattery" },
    { label: "Chống nước", key: "waterResistance" },
  ],
  "phu-kien": [
    { label: "Loại phụ kiện", key: "accessoryType" },
    { label: "Tương thích", key: "compatibility" },
    { label: "Chất liệu", key: "material" },
    { label: "Màu sắc", key: "color" },
    { label: "Công suất", key: "power" },
  ],
};

// Mock specs data for display
const mockProductSpecs: Record<string, Record<string, string>> = {
  "1": { screen: "6.7 inch OLED", chip: "A17 Pro", ram: "8GB", storage: "256GB", rearCamera: "48MP", frontCamera: "12MP", battery: "4422mAh", sim: "1 Nano SIM & 1 eSIM", os: "iOS 17" },
  "2": { screen: "6.1 inch OLED", chip: "A16 Bionic", ram: "6GB", storage: "128GB", rearCamera: "48MP", frontCamera: "12MP", battery: "3349mAh", sim: "1 Nano SIM & 1 eSIM", os: "iOS 17" },
  "3": { screen: "16.2 inch Liquid Retina XDR", chip: "M3 Pro", cpu: "12-core", gpu: "18-core", ram: "36GB", ssd: "512GB", ports: "3x Thunderbolt 4, HDMI, SD, MagSafe", os: "macOS Sonoma" },
};

const ProductDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(initialProducts);
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Không tìm thấy sản phẩm</p>
        <Button onClick={() => navigate("/admin/products")} className="mt-4">
          Quay lại
        </Button>
      </div>
    );
  }
  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({ title: "Đã xóa sản phẩm" });
    navigate("/admin/products");
  };
  const category = categories.find((c) => c.slug === product.category);
  const specs = categorySpecs[product.category] || [];
  const productSpecs = mockProductSpecs[product.id] || {};

  return (
    <>
      <Helmet>
        <title>{product.name} - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">Chi tiết sản phẩm</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={`/admin/products/${product.id}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Sửa
              </Link>
            </Button>
            <Button variant="destructive" onClick={() => handleDelete(product.id)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Thông tin sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tên sản phẩm</p>
                  <p className="font-medium">{product.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Danh mục</p>
                  <p className="font-medium">{category?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Giá bán</p>
                  <p className="font-bold text-primary text-lg">{formatPrice(product.price)}</p>
                </div>
                {product.originalPrice && (
                  <div>
                    <p className="text-sm text-muted-foreground">Giá gốc</p>
                    <p className="font-medium line-through text-muted-foreground">
                      {formatPrice(product.originalPrice)}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Đánh giá</p>
                  <p className="font-medium">⭐ {product.rating}/5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trạng thái</p>
                  <div className="flex gap-2 mt-1">
                    {product.isNew && <Badge>Mới</Badge>}
                    {product.isSale && <Badge variant="destructive">Sale</Badge>}
                    {!product.isNew && !product.isSale && <Badge variant="outline">Bình thường</Badge>}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Mô tả</p>
                <p>{product.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Thông số kỹ thuật theo danh mục */}
        {specs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Thông số kỹ thuật</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {specs.map((spec) => (
                  <div key={spec.key} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">{spec.label}</p>
                    <p className="font-medium">{productSpecs[spec.key] || "—"}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
