import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

const categoryOptions = ["Tin tức", "Hướng dẫn", "Đánh giá", "Khuyến mãi", "Sự kiện"];

const CreateNews = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Đăng bài viết thành công!" });
    navigate("/admin/news");
  };

  const handleSaveDraft = () => {
    toast({ title: "Đã lưu bản nháp!" });
    navigate("/admin/news");
  };

  return (
    <>
      <Helmet>
        <title>Viết bài mới - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Viết bài mới</h1>
            <p className="text-muted-foreground">Tạo bài viết tin tức mới</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Thông tin cơ bản */}
              <Card>
                <CardHeader>
                  <CardTitle>Nội dung bài viết</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Nhập tiêu đề bài viết..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục</Label>
                    <Select
                      value={form.category}
                      onValueChange={(v) => setForm({ ...form, category: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
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

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Mô tả ngắn</Label>
                    <Textarea
                      id="excerpt"
                      rows={2}
                      value={form.excerpt}
                      onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                      placeholder="Mô tả ngắn gọn về bài viết (hiển thị trong danh sách)..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Nội dung chi tiết</Label>
                    <Textarea
                      id="content"
                      rows={15}
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder="Viết nội dung bài viết ở đây..."
                      className="min-h-[400px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Hỗ trợ định dạng Markdown
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Hình ảnh */}
              <Card>
                <CardHeader>
                  <CardTitle>Ảnh đại diện</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {form.image ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                      <img src={form.image} alt="Thumbnail" className="w-full h-full object-cover" />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => setForm({ ...form, image: "" })}
                      >
                        Đổi ảnh
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Kéo thả hoặc click để upload
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                      />
                      <Button type="button" variant="outline" size="sm" asChild>
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Chọn ảnh
                        </label>
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Kích thước khuyến nghị: 1200x630px (tỷ lệ 16:9)
                  </p>
                </CardContent>
              </Card>

              {/* Cài đặt */}
              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="isPublished">Đăng ngay</Label>
                      <p className="text-xs text-muted-foreground">Bài viết sẽ hiển thị công khai</p>
                    </div>
                    <Switch
                      id="isPublished"
                      checked={form.isPublished}
                      onCheckedChange={(v) => setForm({ ...form, isPublished: v })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="isFeatured">Bài viết nổi bật</Label>
                      <p className="text-xs text-muted-foreground">Hiển thị ở vị trí đặc biệt</p>
                    </div>
                    <Switch
                      id="isFeatured"
                      checked={form.isFeatured}
                      onCheckedChange={(v) => setForm({ ...form, isFeatured: v })}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={handleSaveDraft}>
                  Lưu nháp
                </Button>
                <Button type="submit" className="flex-1">
                  {form.isPublished ? "Đăng bài" : "Lưu"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNews;
