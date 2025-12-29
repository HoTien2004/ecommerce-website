import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Helmet } from "react-helmet-async";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

const initialBrands = [
  { id: "1", name: "Apple", slug: "apple", logo: "🍎", products: 45 },
  { id: "2", name: "Beats", slug: "beats", logo: "🎧", products: 12 },
  { id: "3", name: "Belkin", slug: "belkin", logo: "🔌", products: 8 },
];

const AdminBrands = () => {
  const { toast } = useToast();
  const [brands, setBrands] = useState(initialBrands);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any>(null);
  const [form, setForm] = useState({ name: "", slug: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBrand) {
      toast({ title: "Cập nhật thương hiệu thành công!" });
    } else {
      setBrands([...brands, { id: Date.now().toString(), ...form, logo: "🏷️", products: 0 }]);
      toast({ title: "Thêm thương hiệu thành công!" });
    }
    setDialogOpen(false);
    setEditingBrand(null);
    setForm({ name: "", slug: "" });
  };

  const openEdit = (brand: any) => {
    setEditingBrand(brand);
    setForm({ name: brand.name, slug: brand.slug });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setBrands(brands.filter((b) => b.id !== id));
    toast({ title: "Đã xóa thương hiệu" });
  };

  return (
    <>
      <Helmet>
        <title>Quản lý thương hiệu - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Thương hiệu</h1>
            <p className="text-muted-foreground">{brands.length} thương hiệu</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingBrand(null); setForm({ name: "", slug: "" }); }}>
                <Plus className="w-4 h-4 mr-2" />
                Thêm thương hiệu
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background">
              <DialogHeader>
                <DialogTitle>{editingBrand ? "Sửa thương hiệu" : "Thêm thương hiệu"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Tên thương hiệu</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingBrand ? "Cập nhật" : "Thêm"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">Logo</TableHead>
                  <TableHead>Tên thương hiệu</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-center">Sản phẩm</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((brand) => (
                  <TableRow key={brand.id}>
                    <TableCell className="text-2xl">{brand.logo}</TableCell>
                    <TableCell className="font-medium">{brand.name}</TableCell>
                    <TableCell className="text-muted-foreground">{brand.slug}</TableCell>
                    <TableCell className="text-center">{brand.products}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(brand)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(brand.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
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

export default AdminBrands;
