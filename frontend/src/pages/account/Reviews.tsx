import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { useToast } from "../../hooks/use-toast";
import { Star, Edit, Trash2 } from "lucide-react";

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: "REV001",
    productId: "1",
    productName: "iPhone 15 Pro Max",
    productImage: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Sản phẩm tuyệt vời, camera chụp rất đẹp. Giao hàng nhanh, đóng gói cẩn thận.",
    date: "2024-01-20",
  },
  {
    id: "REV002",
    productId: "6",
    productName: "AirPods Pro 2",
    productImage: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100&h=100&fit=crop",
    rating: 4,
    comment: "Âm thanh hay, chống ồn tốt. Chỉ hơi nhỏ so với tai mình.",
    date: "2024-01-18",
  },
];

const mockPendingReviews = [
  {
    orderId: "ORD002",
    productId: "3",
    productName: "MacBook Pro 14 inch M3 Pro",
    productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
  },
];

const Reviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmitReview = () => {
    if (!comment.trim()) {
      toast({ title: "Vui lòng nhập nội dung đánh giá", variant: "destructive" });
      return;
    }

    const newReview: Review = {
      id: `REV${Date.now()}`,
      productId: selectedProduct.productId,
      productName: selectedProduct.productName,
      productImage: selectedProduct.productImage,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([newReview, ...reviews]);
    setDialogOpen(false);
    setComment("");
    setRating(5);
    toast({ title: "Đã gửi đánh giá thành công!" });
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id));
    toast({ title: "Đã xóa đánh giá" });
  };

  const renderStars = (count: number, interactive = false, onSelect?: (n: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => interactive && onSelect?.(n)}
            className={interactive ? "cursor-pointer" : "cursor-default"}
          >
            <Star
              className={`w-5 h-5 ${n <= count ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Pending Reviews */}
      {mockPendingReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Chờ đánh giá</CardTitle>
            <CardDescription>Các sản phẩm bạn chưa đánh giá</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPendingReviews.map((product) => (
                <div
                  key={product.productId}
                  className="flex items-center justify-between p-4 border border-border rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{product.productName}</p>
                      <p className="text-sm text-muted-foreground">Đơn hàng #{product.orderId}</p>
                    </div>
                  </div>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedProduct(product)}>Đánh giá ngay</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-background">
                      <DialogHeader>
                        <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={selectedProduct?.productImage}
                            alt={selectedProduct?.productName}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <p className="font-medium">{selectedProduct?.productName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Đánh giá của bạn</p>
                          {renderStars(rating, true, setRating)}
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Nhận xét</p>
                          <Textarea
                            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                          />
                        </div>
                        <Button onClick={handleSubmitReview} className="w-full">
                          Gửi đánh giá
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* My Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Đánh giá của tôi</CardTitle>
          <CardDescription>Các đánh giá bạn đã viết</CardDescription>
        </CardHeader>
        <CardContent>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 border border-border rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{review.productName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                        <p className="text-sm mt-2">{review.comment}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteReview(review.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">Bạn chưa có đánh giá nào</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reviews;
