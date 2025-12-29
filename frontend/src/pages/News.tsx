import { Layout } from "../components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Badge } from "../components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const newsArticles = [
  {
    id: 1,
    title: "iPhone 16 Pro Max chính thức ra mắt với chip A18 Pro mạnh mẽ",
    excerpt: "Apple vừa công bố iPhone 16 Pro Max với nhiều cải tiến đáng chú ý về hiệu năng và camera.",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=400&fit=crop",
    date: "2024-01-15",
    category: "iPhone",
  },
  {
    id: 2,
    title: "MacBook Pro M4 - Hiệu năng đột phá cho người sáng tạo",
    excerpt: "MacBook Pro mới với chip M4 mang đến hiệu năng vượt trội cho công việc đồ họa và video.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=400&fit=crop",
    date: "2024-01-12",
    category: "Mac",
  },
  {
    id: 3,
    title: "Apple Watch Series 10 - Mỏng nhẹ và thông minh hơn",
    excerpt: "Apple Watch mới với thiết kế mỏng hơn 10% và nhiều tính năng sức khỏe tiên tiến.",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=400&fit=crop",
    date: "2024-01-10",
    category: "Apple Watch",
  },
  {
    id: 4,
    title: "AirPods Pro 3 với âm thanh không gian thế hệ mới",
    excerpt: "Tai nghe không dây cao cấp của Apple nay có chống ồn tốt hơn và thời lượng pin dài hơn.",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&h=400&fit=crop",
    date: "2024-01-08",
    category: "AirPods",
  },
];

const News = () => {
  return (
    <>
      <Helmet>
        <title>Tin tức - Apple Store VN</title>
        <meta name="description" content="Cập nhật tin tức mới nhất về Apple, iPhone, iPad, Mac và các sản phẩm Apple khác." />
      </Helmet>
      <Layout>
        <div className="container-apple py-8">
          <h1 className="text-3xl font-bold mb-2">Tin tức</h1>
          <p className="text-muted-foreground mb-8">Cập nhật mới nhất về sản phẩm Apple</p>

          <div className="grid md:grid-cols-2 gap-6">
            {newsArticles.map((article) => (
              <article 
                key={article.id} 
                className="group bg-card rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <h2 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <Link 
                    to={`/news/${article.id}`} 
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Đọc thêm
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default News;
