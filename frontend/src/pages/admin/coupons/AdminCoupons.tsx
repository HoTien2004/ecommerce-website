import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
// import { Badge } from "../../../components/ui/badge";
import { Switch } from "../../../components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Helmet } from "react-helmet-async";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: "percent" | "fixed";
  minOrder: number;
  maxDiscount?: number;
  maxUse: number;
  used: number;
  expiry: string;
  active: boolean;
  description?: string;
}

const initialCoupons: Coupon[] = [
  { id: "1", code: "SALE10", discount: 10, type: "percent", minOrder: 500000, maxDiscount: 500000, maxUse: 100, used: 45, expiry: "2025-12-31", active: true, description: "Giảm 10% cho đơn từ 500k" },
  { id: "2", code: "FREESHIP", discount: 50000, type: "fixed", minOrder: 1000000, maxUse: 50, used: 30, expiry: "2025-06-30", active: true, description: "Miễn phí vận chuyển" },
  { id: "3", code: "VIP20", discount: 20, type: "percent", minOrder: 2000000, maxDiscount: 1000000, maxUse: 20, used: 20, expiry: "2024-03-31", active: false, description: "Ưu đãi VIP" },
];

const AdminCoupons = () => {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [form, setForm] = useState({
    code: "",
    discount: "",
    type: "percent" as "percent" | "fixed",
    minOrder: "",
    maxDiscount: "",
    maxUse: "",
    expiry: "",
    description: "",
    active: true,
  });

  const resetForm = () => {
    setForm({
      code: "",
      discount: "",
      type: "percent",
      minOrder: "",
      maxDiscount: "",
      maxUse: "",
      expiry: "",
      description: "",
      active: true,
    });
    setEditingCoupon(null);
  };

  const openEditDialog = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setForm({
      code: coupon.code,
      discount: coupon.discount.toString(),
      type: coupon.type,
      minOrder: coupon.minOrder.toString(),
      maxDiscount: coupon.maxDiscount?.toString() || "",
      maxUse: coupon.maxUse.toString(),
      expiry: coupon.expiry,
      description: coupon.description || "",
      active: coupon.active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!form.code || !form.discount) {
      toast({ title: "Vui lòng nhập đầy đủ thông tin", variant: "destructive" });
      return;
    }

    if (editingCoupon) {
      setCoupons(coupons.map((c) =>
        c.id === editingCoupon.id
          ? {
              ...c,
              code: form.code,
              discount: parseInt(form.discount),
              type: form.type,
              minOrder: parseInt(form.minOrder) || 0,
              maxDiscount: form.maxDiscount ? parseInt(form.maxDiscount) : undefined,
              maxUse: parseInt(form.maxUse) || 100,
              expiry: form.expiry || "2025-12-31",
              description: form.description,
              active: form.active,
            }
          : c
      ));
      toast({ title: "Đã cập nhật mã giảm giá" });
    } else {
      const newCoupon: Coupon = {
        id: Date.now().toString(),
        code: form.code,
        discount: parseInt(form.discount),
        type: form.type,
        minOrder: parseInt(form.minOrder) || 0,
        maxDiscount: form.maxDiscount ? parseInt(form.maxDiscount) : undefined,
        maxUse: parseInt(form.maxUse) || 100,
        used: 0,
        expiry: form.expiry || "2025-12-31",
        description: form.description,
        active: form.active,
      };
      setCoupons([...coupons, newCoupon]);
      toast({ title: "Đã thêm mã giảm giá" });
    }

    setDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setCoupons(coupons.filter((c) => c.id !== id));
    toast({ title: "Đã xóa mã giảm giá" });
  };

  const toggleActive = (id: string) => {
    setCoupons(coupons.map((c) => c.id === id ? { ...c, active: !c.active } : c));
    toast({ title: "Đã cập nhật trạng thái" });
  };

  return (
    <>
      <Helmet><title>Mã giảm giá - Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mã giảm giá</h1>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Thêm mã</Button>
            </DialogTrigger>
            <DialogContent className="bg-background max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingCoupon ? "Sửa mã giảm giá" : "Thêm mã giảm giá"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Mã coupon</Label>
                    <Input placeholder="VD: SALE10" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Loại giảm giá</Label>
                    <Select value={form.type} onValueChange={(v: "percent" | "fixed") => setForm({ ...form, type: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percent">Phần trăm (%)</SelectItem>
                        <SelectItem value="fixed">Số tiền cố định (VNĐ)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{form.type === "percent" ? "Giảm giá (%)" : "Giảm giá (VNĐ)"}</Label>
                    <Input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Đơn tối thiểu (VNĐ)</Label>
                    <Input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })} />
                  </div>
                </div>

                {form.type === "percent" && (
                  <div className="space-y-2">
                    <Label>Giảm tối đa (VNĐ)</Label>
                    <Input type="number" placeholder="Không giới hạn" value={form.maxDiscount} onChange={(e) => setForm({ ...form, maxDiscount: e.target.value })} />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số lần sử dụng tối đa</Label>
                    <Input type="number" placeholder="100" value={form.maxUse} onChange={(e) => setForm({ ...form, maxUse: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày hết hạn</Label>
                    <Input type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Mô tả</Label>
                  <Input placeholder="Mô tả ngắn về mã giảm giá" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Trạng thái hoạt động</Label>
                  <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
                </div>

                <Button className="w-full" onClick={handleSubmit}>
                  {editingCoupon ? "Cập nhật" : "Thêm"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã</TableHead>
                  <TableHead>Giảm giá</TableHead>
                  <TableHead>Đơn tối thiểu</TableHead>
                  <TableHead className="text-center">Đã dùng</TableHead>
                  <TableHead>Hết hạn</TableHead>
                  <TableHead className="text-center">Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div>
                        <p className="font-mono font-bold">{c.code}</p>
                        {c.description && <p className="text-xs text-muted-foreground">{c.description}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      {c.type === "percent" ? `${c.discount}%` : new Intl.NumberFormat("vi-VN").format(c.discount) + "đ"}
                      {c.maxDiscount && c.type === "percent" && (
                        <span className="text-xs text-muted-foreground block">Tối đa {new Intl.NumberFormat("vi-VN").format(c.maxDiscount)}đ</span>
                      )}
                    </TableCell>
                    <TableCell>{new Intl.NumberFormat("vi-VN").format(c.minOrder)}đ</TableCell>
                    <TableCell className="text-center">{c.used}/{c.maxUse}</TableCell>
                    <TableCell>{c.expiry}</TableCell>
                    <TableCell className="text-center">
                      <Switch checked={c.active} onCheckedChange={() => toggleActive(c.id)} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(c)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminCoupons;
