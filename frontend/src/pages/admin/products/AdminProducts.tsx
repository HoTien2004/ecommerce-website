import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Helmet } from "react-helmet-async";
import { Plus, Search, Edit, Trash2, Eye, Package } from "lucide-react";
import { products as initialProducts, categories, formatPrice } from "../../../data/products";
import { useToast } from "../../../hooks/use-toast";

const AdminProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Tính tổng số sản phẩm theo danh mục
  const categoryStats = categories.map(cat => ({
    ...cat,
    count: products.filter(p => p.category === cat.slug).length
  }));

  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({ title: "Đã xóa sản phẩm" });
  };

  return (
    <>
      <Helmet>
        <title>Quản lý sản phẩm - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Sản phẩm</h1>
            <p className="text-muted-foreground">Quản lý {products.length} sản phẩm</p>
          </div>
          <Button asChild>
            <Link to="/admin/products/create">
              <Plus className="w-4 h-4 mr-2" />
              Thêm sản phẩm
            </Link>
          </Button>
        </div>

        {/* Thống kê */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categoryStats.map(cat => (
            <Card key={cat.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => setCategoryFilter(cat.slug)}>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{cat.count}</p>
                <p className="text-xs text-muted-foreground">{cat.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span>Tổng tồn kho: <strong>{totalStock.toLocaleString("vi-VN")}</strong> sản phẩm</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Ảnh</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead className="text-right">Giá</TableHead>
                    <TableHead className="text-center">Tồn kho</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      </TableCell>
                      <TableCell className="font-medium max-w-[200px]">
                        <p className="truncate">{product.name}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {categories.find((c) => c.slug === product.category)?.name}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatPrice(product.price)}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={product.stock && product.stock > 0 ? "text-green-600" : "text-destructive"}>
                          {product.stock || 0}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          {product.isNew && <Badge className="text-xs">Mới</Badge>}
                          {product.isSale && <Badge variant="destructive" className="text-xs">Sale</Badge>}
                          {!product.isNew && !product.isSale && <span className="text-muted-foreground text-xs">-</span>}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/admin/products/${product.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/admin/products/${product.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Không tìm thấy sản phẩm nào
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminProducts;
