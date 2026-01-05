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
import { Plus, Search, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

const mockNews = [
  {
    id: 1,
    title: "iPhone 16 Pro Max chính thức ra mắt với nhiều cải tiến đáng giá",
    slug: "iphone-16-pro-max-chinh-thuc-ra-mat",
    category: "Tin tức",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    author: "Admin",
    status: "published",
    views: 1250,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Top 5 phụ kiện không thể thiếu cho MacBook Pro 2024",
    slug: "top-5-phu-kien-macbook-pro-2024",
    category: "Hướng dẫn",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    author: "Admin",
    status: "published",
    views: 890,
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    title: "So sánh chi tiết AirPods Pro 2 và AirPods 4 ANC",
    slug: "so-sanh-airpods-pro-2-va-airpods-4",
    category: "Đánh giá",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop",
    author: "Admin",
    status: "published",
    views: 654,
    createdAt: "2024-01-13",
  },
  {
    id: 4,
    title: "Khuyến mãi đặc biệt mùa Tết - Giảm đến 20% các sản phẩm Apple",
    slug: "khuyen-mai-tet-giam-20-apple",
    category: "Khuyến mãi",
    image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=400&h=300&fit=crop",
    author: "Admin",
    status: "published",
    views: 2100,
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    title: "Hướng dẫn bảo quản pin iPhone đúng cách",
    slug: "huong-dan-bao-quan-pin-iphone",
    category: "Hướng dẫn",
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=300&fit=crop",
    author: "Admin",
    status: "draft",
    views: 0,
    createdAt: "2024-01-11",
  },
];

const categoryOptions = ["Tất cả", "Tin tức", "Hướng dẫn", "Đánh giá", "Khuyến mãi", "Sự kiện"];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  published: { label: "Đã đăng", variant: "default" },
  draft: { label: "Bản nháp", variant: "secondary" },
};

const AdminNews = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tất cả");
  const [news, setNews] = useState(mockNews);
  const { toast } = useToast();

  const filteredNews = news.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "Tất cả" || n.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: number) => {
    setNews(news.filter(n => n.id !== id));
    toast({
      title: "Đã xóa bài viết",
      variant: "destructive",
    });
  };

  return (
    <>
      <Helmet>
        <title>Quản lý tin tức - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Tin tức</h1>
            <p className="text-muted-foreground">{news.length} bài viết</p>
          </div>
          <Button asChild>
            <Link to="/admin/news/create">
              <Plus className="w-4 h-4 mr-2" />
              Viết bài mới
            </Link>
          </Button>
        </div>

        {/* Thống kê */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{news.length}</p>
              <p className="text-xs text-muted-foreground">Tổng bài viết</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-500">{news.filter(n => n.status === "published").length}</p>
              <p className="text-xs text-muted-foreground">Đã đăng</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">{news.filter(n => n.status === "draft").length}</p>
              <p className="text-xs text-muted-foreground">Bản nháp</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">{news.reduce((sum, n) => sum + n.views, 0).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Tổng lượt xem</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm bài viết..."
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
                  {categoryOptions.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
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
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead className="text-center">Lượt xem</TableHead>
                    <TableHead className="text-center">Ngày đăng</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNews.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                      </TableCell>
                      <TableCell className="font-medium max-w-[300px]">
                        <p className="truncate">{article.title}</p>
                        <p className="text-xs text-muted-foreground">{article.author}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{article.category}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {article.views.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.createdAt).toLocaleDateString("vi-VN")}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={statusMap[article.status].variant}>
                          {statusMap[article.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/news/${article.id}`} target="_blank">
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/admin/news/${article.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Không tìm thấy bài viết nào
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminNews;
