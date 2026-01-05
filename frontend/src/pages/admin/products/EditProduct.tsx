import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Switch } from "../../../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import { products, categories } from "../../../data/products";
import { useToast } from "../../../hooks/use-toast";

// Thông số kỹ thuật theo danh mục
const categorySpecs: Record<string, { label: string; key: string; type: string; options?: string[] }[]> = {
  iphone: [
    { label: "Màn hình", key: "screen", type: "text" },
    { label: "Chip", key: "chip", type: "text" },
    { label: "RAM", key: "ram", type: "select", options: ["4GB", "6GB", "8GB"] },
    { label: "Bộ nhớ trong", key: "storage", type: "select", options: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
    { label: "Camera sau", key: "rearCamera", type: "text" },
    { label: "Camera trước", key: "frontCamera", type: "text" },
    { label: "Pin", key: "battery", type: "text" },
    { label: "SIM", key: "sim", type: "select", options: ["1 Nano SIM & 1 eSIM", "2 Nano SIM", "1 Nano SIM"] },
    { label: "Hệ điều hành", key: "os", type: "text" },
  ],
  ipad: [
    { label: "Màn hình", key: "screen", type: "text" },
    { label: "Chip", key: "chip", type: "text" },
    { label: "RAM", key: "ram", type: "select", options: ["4GB", "8GB", "16GB"] },
    { label: "Bộ nhớ trong", key: "storage", type: "select", options: ["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"] },
    { label: "Camera sau", key: "rearCamera", type: "text" },
    { label: "Camera trước", key: "frontCamera", type: "text" },
    { label: "Kết nối", key: "connectivity", type: "select", options: ["WiFi", "WiFi + Cellular"] },
    { label: "Hỗ trợ bút", key: "pencilSupport", type: "select", options: ["Apple Pencil Pro", "Apple Pencil (USB-C)", "Apple Pencil 2", "Apple Pencil 1"] },
  ],
  mac: [
    { label: "Màn hình", key: "screen", type: "text" },
    { label: "Chip", key: "chip", type: "select", options: ["M1", "M2", "M3", "M3 Pro", "M3 Max", "M4", "M4 Pro", "M4 Max"] },
    { label: "CPU", key: "cpu", type: "text" },
    { label: "GPU", key: "gpu", type: "text" },
    { label: "RAM", key: "ram", type: "select", options: ["8GB", "16GB", "24GB", "32GB", "36GB", "48GB", "64GB", "128GB"] },
    { label: "SSD", key: "ssd", type: "select", options: ["256GB", "512GB", "1TB", "2TB", "4TB", "8TB"] },
    { label: "Cổng kết nối", key: "ports", type: "text" },
    { label: "Hệ điều hành", key: "os", type: "text" },
  ],
  watch: [
    { label: "Kích thước", key: "size", type: "select", options: ["41mm", "42mm", "44mm", "45mm", "46mm", "49mm"] },
    { label: "Màn hình", key: "screen", type: "text" },
    { label: "Chip", key: "chip", type: "text" },
    { label: "Chống nước", key: "waterResistance", type: "text" },
    { label: "GPS", key: "gps", type: "select", options: ["GPS", "GPS + Cellular"] },
    { label: "Tính năng sức khỏe", key: "healthFeatures", type: "text" },
    { label: "Thời lượng pin", key: "battery", type: "text" },
  ],
  airpods: [
    { label: "Loại", key: "type", type: "select", options: ["In-ear", "Over-ear"] },
    { label: "Chip", key: "chip", type: "text" },
    { label: "Chống ồn", key: "anc", type: "select", options: ["Có", "Không"] },
    { label: "Chế độ xuyên âm", key: "transparency", type: "select", options: ["Có", "Không"] },
    { label: "Thời lượng nghe", key: "listeningTime", type: "text" },
    { label: "Thời lượng pin (kèm hộp)", key: "totalBattery", type: "text" },
    { label: "Chống nước", key: "waterResistance", type: "text" },
  ],
  "phu-kien": [
    { label: "Loại phụ kiện", key: "accessoryType", type: "select", options: ["Sạc", "Cáp", "Ốp lưng", "Bao da", "Dây đeo", "Bàn phím", "Chuột", "Khác"] },
    { label: "Tương thích", key: "compatibility", type: "text" },
    { label: "Chất liệu", key: "material", type: "text" },
    { label: "Màu sắc", key: "color", type: "text" },
    { label: "Công suất (nếu có)", key: "power", type: "text" },
  ],
};

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const product = products.find((p) => p.id === id);

  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price.toString() || "",
    originalPrice: product?.originalPrice?.toString() || "",
    description: product?.description || "",
    stock: "100",
    isNew: product?.isNew || false,
    isSale: product?.isSale || false,
  });

  const [images, setImages] = useState<string[]>(product ? [product.image] : []);
  const [specs, setSpecs] = useState<Record<string, string>>({});
  const [variants, setVariants] = useState<{ color: string; storage?: string; price: string }[]>([]);

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

  const handleImageUpload = () => {
    const newImage = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=400&fit=crop`;
    setImages([...images, newImage]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants([...variants, { color: "", storage: "", price: "" }]);
  };

  const updateVariant = (index: number, field: string, value: string) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const currentSpecs = form.category ? categorySpecs[form.category] || [] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Cập nhật sản phẩm thành công!" });
    navigate("/admin/products");
  };

  return (
    <>
      <Helmet>
        <title>Sửa sản phẩm - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Sửa sản phẩm</h1>
            <p className="text-muted-foreground">{product.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Thông tin cơ bản */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên sản phẩm</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Danh mục</Label>
                      <Select
                        value={form.category}
                        onValueChange={(v) => {
                          setForm({ ...form, category: v });
                          setSpecs({});
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.slug}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stock">Số lượng tồn kho</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={form.stock}
                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Thông số kỹ thuật */}
              {currentSpecs.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Thông số kỹ thuật</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {currentSpecs.map((spec) => (
                        <div key={spec.key} className="space-y-2">
                          <Label>{spec.label}</Label>
                          {spec.type === "select" && spec.options ? (
                            <Select
                              value={specs[spec.key] || ""}
                              onValueChange={(v) => setSpecs({ ...specs, [spec.key]: v })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={`Chọn ${spec.label.toLowerCase()}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {spec.options.map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              value={specs[spec.key] || ""}
                              onChange={(e) => setSpecs({ ...specs, [spec.key]: e.target.value })}
                              placeholder={spec.label}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Giá bán */}
              <Card>
                <CardHeader>
                  <CardTitle>Giá bán</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Giá bán (VNĐ)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">Giá gốc (nếu có)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        value={form.originalPrice}
                        onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Biến thể */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Biến thể sản phẩm</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm biến thể
                  </Button>
                </CardHeader>
                <CardContent>
                  {variants.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Chưa có biến thể nào</p>
                  ) : (
                    <div className="space-y-4">
                      {variants.map((variant, index) => (
                        <div key={index} className="flex gap-4 items-end p-4 border rounded-lg">
                          <div className="flex-1 space-y-2">
                            <Label>Màu sắc</Label>
                            <Input
                              value={variant.color}
                              onChange={(e) => updateVariant(index, "color", e.target.value)}
                              placeholder="VD: Đen, Trắng, Xanh..."
                            />
                          </div>
                          {(form.category === "iphone" || form.category === "ipad" || form.category === "mac") && (
                            <div className="flex-1 space-y-2">
                              <Label>Dung lượng</Label>
                              <Input
                                value={variant.storage}
                                onChange={(e) => updateVariant(index, "storage", e.target.value)}
                                placeholder="VD: 128GB, 256GB..."
                              />
                            </div>
                          )}
                          <div className="flex-1 space-y-2">
                            <Label>Giá (VNĐ)</Label>
                            <Input
                              type="number"
                              value={variant.price}
                              onChange={(e) => updateVariant(index, "price", e.target.value)}
                            />
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(index)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Hình ảnh */}
              <Card>
                <CardHeader>
                  <CardTitle>Hình ảnh sản phẩm</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {images.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                        <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 w-6 h-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                            Ảnh chính
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Kéo thả hoặc click để upload
                    </p>
                    <Button type="button" variant="outline" size="sm" onClick={handleImageUpload}>
                      Chọn ảnh
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trạng thái */}
              <Card>
                <CardHeader>
                  <CardTitle>Trạng thái</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isNew">Sản phẩm mới</Label>
                    <Switch
                      id="isNew"
                      checked={form.isNew}
                      onCheckedChange={(v) => setForm({ ...form, isNew: v })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isSale">Đang giảm giá</Label>
                    <Switch
                      id="isSale"
                      checked={form.isSale}
                      onCheckedChange={(v) => setForm({ ...form, isSale: v })}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(-1)}>
                  Hủy
                </Button>
                <Button type="submit" className="flex-1">
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
