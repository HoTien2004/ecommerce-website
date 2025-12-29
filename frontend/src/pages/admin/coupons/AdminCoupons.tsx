import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Helmet } from "react-helmet-async";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

const initialCoupons = [
  { id: "1", code: "SALE10", discount: 10, type: "percent", minOrder: 500000, maxUse: 100, used: 45, expiry: "2024-12-31", active: true },
  { id: "2", code: "FREESHIP", discount: 50000, type: "fixed", minOrder: 1000000, maxUse: 50, used: 30, expiry: "2024-06-30", active: true },
  { id: "3", code: "VIP20", discount: 20, type: "percent", minOrder: 2000000, maxUse: 20, used: 20, expiry: "2024-03-31", active: false },
];

const AdminCoupons = () => {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState(initialCoupons);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setCoupons(coupons.filter((c) => c.id !== id));
    toast({ title: "Đã xóa mã giảm giá" });
  };

  return (
    <>
      <Helmet><title>Mã giảm giá - Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mã giảm giá</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />Thêm mã</Button></DialogTrigger>
            <DialogContent className="bg-background">
              <DialogHeader><DialogTitle>Thêm mã giảm giá</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Mã coupon</Label><Input placeholder="VD: SALE10" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Giảm giá</Label><Input type="number" /></div>
                  <div><Label>Đơn tối thiểu</Label><Input type="number" /></div>
                </div>
                <Button className="w-full" onClick={() => { setDialogOpen(false); toast({ title: "Đã thêm mã giảm giá" }); }}>Thêm</Button>
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
                    <TableCell className="font-mono font-bold">{c.code}</TableCell>
                    <TableCell>{c.type === "percent" ? `${c.discount}%` : new Intl.NumberFormat("vi-VN").format(c.discount) + "đ"}</TableCell>
                    <TableCell>{new Intl.NumberFormat("vi-VN").format(c.minOrder)}đ</TableCell>
                    <TableCell className="text-center">{c.used}/{c.maxUse}</TableCell>
                    <TableCell>{c.expiry}</TableCell>
                    <TableCell className="text-center"><Badge variant={c.active ? "outline" : "secondary"}>{c.active ? "Hoạt động" : "Hết hạn"}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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
