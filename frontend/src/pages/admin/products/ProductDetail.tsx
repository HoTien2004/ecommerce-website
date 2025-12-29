import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { products, categories, formatPrice } from "../../../data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

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

  const category = categories.find((c) => c.slug === product.category);

  return (
    <>
      <Helmet>
        <title>{product.name} - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">Chi tiết sản phẩm</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={`/admin/products/${product.id}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Sửa
              </Link>
            </Button>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Thông tin sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tên sản phẩm</p>
                  <p className="font-medium">{product.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Danh mục</p>
                  <p className="font-medium">{category?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Giá bán</p>
                  <p className="font-bold text-primary text-lg">{formatPrice(product.price)}</p>
                </div>
                {product.originalPrice && (
                  <div>
                    <p className="text-sm text-muted-foreground">Giá gốc</p>
                    <p className="font-medium line-through text-muted-foreground">
                      {formatPrice(product.originalPrice)}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Đánh giá</p>
                  <p className="font-medium">⭐ {product.rating}/5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trạng thái</p>
                  <div className="flex gap-2 mt-1">
                    {product.isNew && <Badge>Mới</Badge>}
                    {product.isSale && <Badge variant="destructive">Sale</Badge>}
                    {!product.isNew && !product.isSale && <Badge variant="outline">Bình thường</Badge>}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Mô tả</p>
                <p>{product.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
