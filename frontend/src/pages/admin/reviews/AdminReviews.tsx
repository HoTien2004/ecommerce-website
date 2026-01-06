import { useState } from "react";
import { Star, Search, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  reply?: string;
  repliedAt?: string;
}

const mockReviews: Review[] = [
  {
    id: "RV001",
    productId: "1",
    productName: "iPhone 15 Pro Max 256GB",
    productImage: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100",
    userId: "U001",
    userName: "Nguyễn Văn A",
    userEmail: "nguyenvana@gmail.com",
    rating: 5,
    title: "Sản phẩm tuyệt vời",
    comment: "Điện thoại rất đẹp, chụp ảnh nét, pin trâu. Giao hàng nhanh, đóng gói cẩn thận.",
    images: [],
    status: "approved",
    createdAt: "2024-01-15T10:30:00",
    reply: "Cảm ơn bạn đã tin tưởng và mua hàng tại cửa hàng!",
    repliedAt: "2024-01-15T14:00:00"
  },
  {
    id: "RV002",
    productId: "2",
    productName: "MacBook Pro 14 M3 Pro",
    productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100",
    userId: "U002",
    userName: "Trần Thị B",
    userEmail: "tranthib@gmail.com",
    rating: 4,
    title: "Máy tính chất lượng",
    comment: "MacBook chạy rất mượt, màn hình đẹp. Tuy nhiên giá hơi cao.",
    images: [],
    status: "pending",
    createdAt: "2024-01-16T09:15:00"
  },
  {
    id: "RV003",
    productId: "3",
    productName: "iPad Pro 12.9 M2",
    productImage: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100",
    userId: "U003",
    userName: "Lê Văn C",
    userEmail: "levanc@gmail.com",
    rating: 3,
    title: "Tạm được",
    comment: "Sản phẩm ổn nhưng phụ kiện đi kèm ít quá.",
    images: [],
    status: "pending",
    createdAt: "2024-01-17T14:20:00"
  },
  {
    id: "RV004",
    productId: "4",
    productName: "Apple Watch Ultra 2",
    productImage: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100",
    userId: "U004",
    userName: "Phạm Thị D",
    userEmail: "phamthid@gmail.com",
    rating: 1,
    title: "Thất vọng",
    comment: "Sản phẩm không như mô tả, pin yếu.",
    images: [],
    status: "rejected",
    createdAt: "2024-01-18T11:45:00"
  },
  {
    id: "RV005",
    productId: "5",
    productName: "AirPods Pro 2",
    productImage: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100",
    userId: "U005",
    userName: "Hoàng Văn E",
    userEmail: "hoangvane@gmail.com",
    rating: 5,
    title: "Âm thanh xuất sắc",
    comment: "Chống ồn rất tốt, âm bass mạnh mẽ. Rất hài lòng!",
    images: [],
    status: "approved",
    createdAt: "2024-01-19T16:30:00"
  }
];

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState("");

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    const matchesRating = ratingFilter === "all" || review.rating === parseInt(ratingFilter);
    return matchesSearch && matchesStatus && matchesRating;
  });

  const handleApprove = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: "approved" as const } : r));
    toast.success("Đã duyệt đánh giá");
  };

  const handleReject = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: "rejected" as const } : r));
    toast.success("Đã từ chối đánh giá");
  };

  const handleDelete = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
    toast.success("Đã xóa đánh giá");
  };

  const handleReply = () => {
    if (!selectedReview || !replyText.trim()) return;
    
    setReviews(reviews.map(r => 
      r.id === selectedReview.id 
        ? { ...r, reply: replyText, repliedAt: new Date().toISOString() } 
        : r
    ));
    setReplyText("");
    setSelectedReview(null);
    toast.success("Đã gửi phản hồi");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Đã duyệt</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Từ chối</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === "pending").length,
    approved: reviews.filter(r => r.status === "approved").length,
    rejected: reviews.filter(r => r.status === "rejected").length,
    avgRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý đánh giá</h1>
        <p className="text-muted-foreground">Duyệt và phản hồi đánh giá của khách hàng</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground">Tổng đánh giá</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground">Chờ duyệt</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground">Đã duyệt</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground">Từ chối</p>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground">Đánh giá TB</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">{stats.avgRating}</p>
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo sản phẩm, khách hàng, nội dung..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="pending">Chờ duyệt</SelectItem>
            <SelectItem value="approved">Đã duyệt</SelectItem>
            <SelectItem value="rejected">Từ chối</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Số sao" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả số sao</SelectItem>
            <SelectItem value="5">5 sao</SelectItem>
            <SelectItem value="4">4 sao</SelectItem>
            <SelectItem value="3">3 sao</SelectItem>
            <SelectItem value="2">2 sao</SelectItem>
            <SelectItem value="1">1 sao</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Đánh giá</TableHead>
              <TableHead>Nội dung</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={review.productImage}
                      alt={review.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span className="font-medium line-clamp-2 max-w-[150px]">
                      {review.productName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{review.userName}</p>
                    <p className="text-sm text-muted-foreground">{review.userEmail}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {renderStars(review.rating)}
                    <p className="text-sm font-medium">{review.title}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="line-clamp-2 max-w-[200px] text-sm">
                    {review.comment}
                  </p>
                  {review.reply && (
                    <p className="text-xs text-blue-600 mt-1">Đã phản hồi</p>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(review.status)}</TableCell>
                <TableCell>
                  {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedReview(review);
                        setReplyText(review.reply || "");
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {review.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleApprove(review.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleReject(review.id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(review.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Review Detail Dialog */}
      <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết đánh giá</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-6">
              {/* Product Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={selectedReview.productImage}
                  alt={selectedReview.productName}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{selectedReview.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    Mã sản phẩm: {selectedReview.productId}
                  </p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Khách hàng</p>
                  <p className="font-medium">{selectedReview.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedReview.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ngày đánh giá</p>
                  <p className="font-medium">
                    {new Date(selectedReview.createdAt).toLocaleString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trạng thái</p>
                  {getStatusBadge(selectedReview.status)}
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {renderStars(selectedReview.rating)}
                  <span className="font-medium">{selectedReview.title}</span>
                </div>
                <p className="text-gray-700">{selectedReview.comment}</p>
              </div>

              {/* Reply Section */}
              <div className="space-y-3 border-t pt-4">
                <p className="font-medium">Phản hồi của cửa hàng</p>
                {selectedReview.reply && selectedReview.repliedAt && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm">{selectedReview.reply}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Đã phản hồi: {new Date(selectedReview.repliedAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                )}
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Nhập phản hồi..."
                  className="w-full p-3 border rounded-lg resize-none h-24"
                />
                <div className="flex justify-end gap-2">
                  {selectedReview.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        className="text-green-600"
                        onClick={() => {
                          handleApprove(selectedReview.id);
                          setSelectedReview(null);
                        }}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Duyệt
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-600"
                        onClick={() => {
                          handleReject(selectedReview.id);
                          setSelectedReview(null);
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Từ chối
                      </Button>
                    </>
                  )}
                  <Button onClick={handleReply} disabled={!replyText.trim()}>
                    Gửi phản hồi
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReviews;
