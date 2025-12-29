import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Helmet } from "react-helmet-async";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

const initialBanners = [
  { id: "1", title: "iPhone 15 Pro Max", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800", link: "/product/1", active: true },
  { id: "2", title: "MacBook Pro M3", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800", link: "/product/3", active: true },
  { id: "3", title: "Khuyến mãi tháng 1", image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=800", link: "/products", active: false },
];

const AdminBanners = () => {
  const { toast } = useToast();
  const [banners, setBanners] = useState(initialBanners);
  const [dialogOpen, setDialogOpen] = useState(false);

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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />Thêm banner</Button></DialogTrigger>
            <DialogContent className="bg-background">
              <DialogHeader><DialogTitle>Thêm banner</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Tiêu đề</Label><Input /></div>
                <div><Label>Link</Label><Input placeholder="/products" /></div>
                <div><Label>Ảnh</Label><Input type="file" accept="image/*" /></div>
                <Button className="w-full" onClick={() => { setDialogOpen(false); toast({ title: "Đã thêm banner" }); }}>Thêm</Button>
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
                  <p className="text-sm text-muted-foreground">{banner.link}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Switch checked={banner.active} onCheckedChange={() => toggleActive(banner.id)} />
                  <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(banner.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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
