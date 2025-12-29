import { useState } from "react";
import { useParams, Link, useNavigate,useLocation } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { products, formatPrice } from "../data/products";
import { ProductCard } from "../components/product/ProductCard";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/use-toast";
import { Heart, ShoppingBag, Star, Truck, Shield, ChevronRight, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Avatar } from "../components/ui/avatar";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.variants.colors[0].name || "");
  const [selectedStorage, setSelectedStorage] = useState(product?.variants.storage?.[0] || "");

  if (!product) {
    return (
      <Layout>
        <div className="container-apple py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
          <Button asChild>
            <Link to="/products">Quay lại cửa hàng</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // order spec keys for better display based on category
  const specOrderMap: Record<string, string[]> = {
    iphone: ["Màn hình", "Chip", "Camera", "RAM", "Pin", "Kết nối"],
    ipad: ["Màn hình", "Chip", "Camera", "Kết nối", "RAM", "Pin"],
    mac: ["Màn hình", "Chip", "RAM", "Storage", "Pin"],
    "apple-watch": ["Màn hình", "Chip", "Chống nước", "Pin"],
    airpods: ["Chip", "Chống ồn", "Pin", "Chống nước"],
    accessories: ["Công suất", "Tương thích", "Chiều dài cáp"],
  };

  const orderedSpecs = (() => {
    const entries = Object.entries(product.specs || {});
    const order = specOrderMap[product.category] || [];
    // put known keys first
    const known = order
      .map((k) => entries.find((e) => e[0] === k))
      .filter(Boolean) as [string, string][];
    const rest = entries.filter(([k]) => !order.includes(k));
    return [...known, ...rest];
  })();

  // Simple local reviews (mock) — derive a few sample reviews to display
  type Review = { id: string; author: string; rating: number; comment: string; date: string };
  const initialReviews: Review[] = [
    { id: "r1", author: "Nguyễn Văn A", rating: Math.round(product.rating), comment: "Sản phẩm rất tốt, đáng tiền.", date: "2025-11-01" },
    { id: "r2", author: "Trần Thị B", rating: Math.max(4, Math.round(product.rating) - 1), comment: "Máy chạy mượt, pin ổn.", date: "2025-10-15" },
  ];
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });


  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedStorage);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: product.name,
    });
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để mua hàng ngay.",
        variant: "destructive",
      });
      // pass the intended buyNowItem so Auth page can redirect to checkout after login
      navigate("/auth", { state: { from: location, buyNowItem: { product, quantity: 1, selectedColor, selectedStorage } } });
      return;
    }
    navigate("/checkout", {
      state: {
        buyNowItem: {
          product,
          quantity: 1,
          selectedColor,
          selectedStorage,
        },
      },
    });
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({ title: "Đã xóa khỏi yêu thích" });
    } else {
      addToWishlist(product);
      toast({ title: "Đã thêm vào yêu thích" });
    }
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - Apple Store VN</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <Layout>
        <div className="container-apple py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-foreground">Sản phẩm</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex gap-2">
                {product.isNew && <Badge>Mới</Badge>}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    Giảm {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-warning text-warning"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} đánh giá)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold mb-3">Màu sắc: {selectedColor}</h3>
                <div className="flex gap-3">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-primary scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Storage Selection */}
              {product.variants.storage && (
                <div>
                  <h3 className="font-semibold mb-3">Dung lượng</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.storage.map((storage) => (
                      <Button
                        key={storage}
                        variant={selectedStorage === storage ? "default" : "outline"}
                        onClick={() => setSelectedStorage(storage)}
                        className="rounded-full"
                      >
                        {storage}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <Button onClick={handleAddToCart} variant="outline" className="flex-1 rounded-full" size="lg">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Thêm vào giỏ
                </Button>
                <Button onClick={handleBuyNow} className="flex-1 rounded-full" size="lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Mua ngay
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleWishlist}
                  className="rounded-full"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? "fill-destructive text-destructive" : ""}`} />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-sm">Miễn phí vận chuyển</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm">Bảo hành 12 tháng</span>
                </div>
              </div>

              {/* Description / Specs / Reviews Tabs */}
              <div className="pt-6 border-t">
                <Tabs defaultValue="description" className="space-y-4">
                  <TabsList className="bg-secondary/50 p-1 rounded-full w-full sm:w-auto flex-wrap h-auto">
                    <TabsTrigger value="description" className="rounded-full">Mô tả sản phẩm</TabsTrigger>
                    <TabsTrigger value="specs" className="rounded-full">Thông số kỹ thuật</TabsTrigger>
                    <TabsTrigger value="reviews" className="rounded-full">Đánh giá ({product.reviews})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description">
                    <div className="prose max-w-none text-muted-foreground">
                      <p>{product.description}</p>
                      {/* if more detailed description is available, show here */}
                    </div>
                  </TabsContent>

                  <TabsContent value="specs">
                    <dl className="grid grid-cols-1 gap-3">
                      {orderedSpecs.map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <dt className="text-muted-foreground">{key}</dt>
                          <dd className="font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </TabsContent>

                  <TabsContent value="reviews">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-muted"}`} />
                          ))}
                        </div>
                        <div>
                          <div className="font-semibold">{product.rating} / 5</div>
                          <div className="text-sm text-muted-foreground">{product.reviews} đánh giá</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {reviews.map((r) => (
                          <div key={r.id} className="border rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="w-9 h-9" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="font-medium">{r.author}</div>
                                  <div className="text-sm text-muted-foreground">{r.date}</div>
                                </div>
                                <div className="mt-1 flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < r.rating ? "fill-warning text-warning" : "text-muted"}`} />
                                  ))}
                                </div>
                                <p className="mt-2 text-sm">{r.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Sản phẩm liên quan</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ProductDetail;
