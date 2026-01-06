import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "iPhone 16 Pro Max - Đỉnh cao công nghệ smartphone 2024",
    excerpt: "Khám phá những tính năng đột phá của iPhone 16 Pro Max với chip A18 Pro mạnh mẽ nhất từ trước đến nay.",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    date: "20/12/2024",
    category: "Công nghệ",
  },
  {
    id: 2,
    title: "MacBook Pro M4 - Hiệu năng vượt trội cho chuyên gia",
    excerpt: "Apple ra mắt MacBook Pro với chip M4 mới, mang đến hiệu năng đồ họa và AI ấn tượng.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    date: "18/12/2024",
    category: "Sản phẩm mới",
  },
  {
    id: 3,
    title: "Hướng dẫn chọn mua Apple Watch phù hợp nhất",
    excerpt: "Tổng hợp các dòng Apple Watch hiện có và cách chọn phiên bản phù hợp với nhu cầu của bạn.",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400",
    date: "15/12/2024",
    category: "Hướng dẫn",
  },
  {
    id: 4,
    title: "Top 10 phụ kiện Apple không thể thiếu trong năm 2024",
    excerpt: "Danh sách những phụ kiện Apple chất lượng cao được yêu thích nhất trong năm nay.",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
    date: "12/12/2024",
    category: "Đánh giá",
  },
];

export const NewsSection = () => {
  return (
    <section className="container-apple py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Tin tức</h2>
        <Link
          to="/news"
          className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
        >
          Xem tất cả
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsItems.map((news) => (
          <Link
            key={news.id}
            to={`/news/${news.id}`}
            className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
                  {news.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {news.date}
                </span>
              </div>
              <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                {news.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {news.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};