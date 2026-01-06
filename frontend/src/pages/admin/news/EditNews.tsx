import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Switch } from "../../../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { ArrowLeft, Upload, Save } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

const mockNewsData = {
  "1": {
    id: "1",
    title: "iPhone 16 Pro Max chính thức ra mắt tại Việt Nam",
    category: "iphone",
    excerpt: "Apple đã chính thức giới thiệu iPhone 16 Pro Max với nhiều tính năng mới đột phá...",
    content: "Nội dung chi tiết về iPhone 16 Pro Max...",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800",
    isPublished: true,
    isFeatured: true,
  },
  "2": {
    id: "2",
    title: "MacBook Pro M4 - Hiệu năng vượt trội",
    category: "mac",
    excerpt: "Chip M4 mới mang đến hiệu năng CPU nhanh hơn 50% so với thế hệ trước...",
    content: "Nội dung chi tiết về MacBook Pro M4...",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    isPublished: true,
    isFeatured: false,
  },
};

const categories = [
  { value: "iphone", label: "iPhone" },
  { value: "ipad", label: "iPad" },
  { value: "mac", label: "Mac" },
  { value: "watch", label: "Apple Watch" },
  { value: "airpods", label: "AirPods" },
  { value: "accessories", label: "Phụ kiện" },
  { value: "tips", label: "Thủ thuật" },
  { value: "promotion", label: "Khuyến mãi" },
];

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    image: "",
    isPublished: true,
    isFeatured: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching news data
    const newsData = mockNewsData[id as keyof typeof mockNewsData];
    if (newsData) {
      setForm({
        title: newsData.title,
        category: newsData.category,
        excerpt: newsData.excerpt,
        content: newsData.content,
        image: newsData.image,
        isPublished: newsData.isPublished,
        isFeatured: newsData.isFeatured,
      });
    }
    setLoading(false);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Cập nhật thành công",
      description: "Bài viết đã được cập nhật.",
    });
    navigate("/admin/news");
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Đang tải...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Chỉnh sửa tin tức - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/news")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Chỉnh sửa tin tức</h1>
            <p className="text-muted-foreground">Cập nhật nội dung bài viết</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nội dung bài viết</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tiêu đề *</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Nhập tiêu đề bài viết"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục *</Label>
                    <Select
                      value={form.category}
                      onValueChange={(value) => setForm({ ...form, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Mô tả ngắn *</Label>
                    <Textarea
                      id="excerpt"
                      value={form.excerpt}
                      onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                      placeholder="Nhập mô tả ngắn cho bài viết"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Nội dung *</Label>
                    <Textarea
                      id="content"
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder="Nhập nội dung bài viết"
                      rows={15}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ảnh đại diện</CardTitle>
                </CardHeader>
                <CardContent>
                  {form.image ? (
                    <div className="space-y-4">
                      <img
                        src={form.image}
                        alt="Preview"
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setForm({ ...form, image: "" })}
                      >
                        Thay đổi ảnh
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Kéo thả hoặc click để tải ảnh
                      </p>
                      <Button type="button" variant="outline" size="sm">
                        Chọn ảnh
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="published">Xuất bản</Label>
                    <Switch
                      id="published"
                      checked={form.isPublished}
                      onCheckedChange={(checked) => setForm({ ...form, isPublished: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Bài viết nổi bật</Label>
                    <Switch
                      id="featured"
                      checked={form.isFeatured}
                      onCheckedChange={(checked) => setForm({ ...form, isFeatured: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => navigate("/admin/news")}>
                  Hủy
                </Button>
                <Button type="submit" className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
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

export default EditNews;
