import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Helmet } from "react-helmet-async";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  position: "hero" | "promo" | "category";
  order: number;
  active: boolean;
  startDate?: string;
  endDate?: string;
}

const initialBanners: Banner[] = [
  { id: "1", title: "iPhone 15 Pro Max", subtitle: "Titanium. Mạnh mẽ. Đẹp.", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800", link: "/product/1", position: "hero", order: 1, active: true },
  { id: "2", title: "MacBook Pro M3", subtitle: "Hiệu năng đột phá", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800", link: "/product/3", position: "hero", order: 2, active: true },
  { id: "3", title: "Khuyến mãi tháng 1", subtitle: "Giảm đến 20%", image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=800", link: "/products", position: "promo", order: 1, active: false },
];

const positionLabels: Record<string, string> = {
  hero: "Banner chính (Hero)",
  promo: "Banner khuyến mãi",
  category: "Banner danh mục",
};

const AdminBanners = () => {
  const { toast } = useToast();
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    link: "",
    position: "hero" as "hero" | "promo" | "category",
    startDate: "",
    endDate: "",
    active: true,
  });

  const resetForm = () => {
    setForm({
      title: "",
      subtitle: "",
      link: "",
      position: "hero",
      startDate: "",
      endDate: "",
      active: true,
    });
    setEditingBanner(null);
  };

  const openEditDialog = (banner: Banner) => {
    setEditingBanner(banner);
    setForm({
      title: banner.title,
      subtitle: banner.subtitle || "",
      link: banner.link,
      position: banner.position,
      startDate: banner.startDate || "",
      endDate: banner.endDate || "",
      active: banner.active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!form.title) {
      toast({ title: "Vui lòng nhập tiêu đề", variant: "destructive" });
      return;
    }

    if (editingBanner) {
      setBanners(banners.map((b) =>
        b.id === editingBanner.id
          ? {
              ...b,
              title: form.title,
              subtitle: form.subtitle,
              link: form.link || "/products",
              position: form.position,
              startDate: form.startDate,
              endDate: form.endDate,
              active: form.active,
            }
          : b
      ));
      toast({ title: "Đã cập nhật banner" });
    } else {
      const newBanner: Banner = {
        id: Date.now().toString(),
        title: form.title,
        subtitle: form.subtitle,
        image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=800",
        link: form.link || "/products",
        position: form.position,
        order: banners.filter((b) => b.position === form.position).length + 1,
        startDate: form.startDate,
        endDate: form.endDate,
        active: form.active,
      };
      setBanners([...banners, newBanner]);
      toast({ title: "Đã thêm banner" });
    }

    setDialogOpen(false);
    resetForm();
  };

  const toggleActive = (id: string) => {
    setBanners(banners.map((b) => b.id === id ? { ...b, active: !b.active } : b));
    toast({ title: "Đã cập nhật trạng thái" });
  };

  const handleDelete = (id: string) => {
    setBanners(banners.filter((b) => b.id !== id));
    toast({ title: "Đã xóa banner" });
  };

  return (
    <>
      <Helmet><title>Quản lý Banner - Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Banner / Slider</h1>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Thêm banner</Button>
            </DialogTrigger>
            <DialogContent className="bg-background max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingBanner ? "Sửa banner" : "Thêm banner"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tiêu đề</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>

                <div className="space-y-2">
                  <Label>Tiêu đề phụ</Label>
                  <Input placeholder="Mô tả ngắn" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vị trí hiển thị</Label>
                    <Select value={form.position} onValueChange={(v: "hero" | "promo" | "category") => setForm({ ...form, position: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hero">Banner chính (Hero)</SelectItem>
                        <SelectItem value="promo">Banner khuyến mãi</SelectItem>
                        <SelectItem value="category">Banner danh mục</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Link</Label>
                    <Input placeholder="/products" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ngày bắt đầu</Label>
                    <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày kết thúc</Label>
                    <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ảnh banner</Label>
                  <Input type="file" accept="image/*" />
                  <p className="text-xs text-muted-foreground">Khuyến nghị: 1920x600px cho Hero, 800x400px cho Promo</p>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Trạng thái hoạt động</Label>
                  <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
                </div>

                <Button className="w-full" onClick={handleSubmit}>
                  {editingBanner ? "Cập nhật" : "Thêm"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-4">
          {banners.map((banner) => (
            <Card key={banner.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                <img src={banner.image} alt={banner.title} className="w-32 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="font-semibold">{banner.title}</p>
                  {banner.subtitle && <p className="text-sm text-muted-foreground">{banner.subtitle}</p>}
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded">{positionLabels[banner.position]}</span>
                    <span className="text-xs text-muted-foreground">{banner.link}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Switch checked={banner.active} onCheckedChange={() => toggleActive(banner.id)} />
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(banner)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(banner.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminBanners;
