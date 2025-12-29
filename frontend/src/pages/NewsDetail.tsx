import { useParams, Link } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const newsArticles = [
  {
    id: "1",
    title: "iPhone 16 Pro Max chính thức ra mắt với chip A18 Pro mạnh mẽ",
    excerpt: "Apple vừa công bố iPhone 16 Pro Max với nhiều cải tiến đáng chú ý về hiệu năng và camera.",
    content: `
      <p>Apple vừa chính thức ra mắt iPhone 16 Pro Max, phiên bản cao cấp nhất trong dòng iPhone 16 với nhiều cải tiến đáng chú ý về hiệu năng, camera và thiết kế.</p>
      
      <h2>Chip A18 Pro - Hiệu năng vượt trội</h2>
      <p>iPhone 16 Pro Max được trang bị chip A18 Pro mới nhất, mang lại hiệu năng CPU nhanh hơn 15% và GPU mạnh hơn 20% so với thế hệ trước. Chip mới cũng hỗ trợ các tính năng AI tiên tiến và machine learning.</p>
      
      <h2>Camera 48MP cải tiến</h2>
      <p>Hệ thống camera của iPhone 16 Pro Max được nâng cấp với cảm biến chính 48MP lớn hơn, khả năng zoom quang học 5x và chế độ chụp đêm được cải thiện đáng kể.</p>
      
      <h2>Thiết kế titanium Grade 5</h2>
      <p>Tiếp tục sử dụng chất liệu titanium cao cấp, iPhone 16 Pro Max có trọng lượng nhẹ hơn và bền hơn. Màn hình Super Retina XDR 6.9 inch mang lại trải nghiệm xem tuyệt vời.</p>
      
      <h2>Giá bán và thời điểm mở bán</h2>
      <p>iPhone 16 Pro Max sẽ được mở bán tại Việt Nam từ ngày 20/09 với giá khởi điểm từ 34.990.000đ cho phiên bản 256GB.</p>
    `,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&h=600&fit=crop",
    date: "2024-01-15",
    category: "iPhone",
    author: "Apple Store VN",
  },
  {
    id: "2",
    title: "MacBook Pro M4 - Hiệu năng đột phá cho người sáng tạo",
    excerpt: "MacBook Pro mới với chip M4 mang đến hiệu năng vượt trội cho công việc đồ họa và video.",
    content: `
      <p>Apple đã chính thức giới thiệu MacBook Pro với chip M4, đánh dấu một bước tiến lớn về hiệu năng cho các chuyên gia sáng tạo nội dung.</p>
      
      <h2>Chip M4 - Sức mạnh mới</h2>
      <p>Chip M4 mới mang lại hiệu năng CPU nhanh hơn 50% và GPU mạnh hơn 60% so với M3, đồng thời tiết kiệm năng lượng hơn.</p>
      
      <h2>Màn hình Liquid Retina XDR</h2>
      <p>Màn hình mới hỗ trợ độ sáng cao hơn, lên đến 1600 nits HDR, mang lại trải nghiệm xem nội dung chuyên nghiệp.</p>
    `,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=600&fit=crop",
    date: "2024-01-12",
    category: "Mac",
    author: "Apple Store VN",
  },
  {
    id: "3",
    title: "Apple Watch Series 10 - Mỏng nhẹ và thông minh hơn",
    excerpt: "Apple Watch mới với thiết kế mỏng hơn 10% và nhiều tính năng sức khỏe tiên tiến.",
    content: `
      <p>Apple Watch Series 10 đánh dấu kỷ niệm 10 năm ra mắt Apple Watch với thiết kế hoàn toàn mới và nhiều tính năng sức khỏe đột phá.</p>
      
      <h2>Thiết kế mỏng nhẹ nhất</h2>
      <p>Series 10 mỏng hơn 10% so với thế hệ trước, mang lại cảm giác đeo thoải mái hơn bao giờ hết.</p>
    `,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1200&h=600&fit=crop",
    date: "2024-01-10",
    category: "Apple Watch",
    author: "Apple Store VN",
  },
  {
    id: "4",
    title: "AirPods Pro 3 với âm thanh không gian thế hệ mới",
    excerpt: "Tai nghe không dây cao cấp của Apple nay có chống ồn tốt hơn và thời lượng pin dài hơn.",
    content: `
      <p>AirPods Pro 3 mang đến trải nghiệm âm thanh không gian được cải tiến với công nghệ chống ồn thế hệ mới.</p>
    `,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=1200&h=600&fit=crop",
    date: "2024-01-08",
    category: "AirPods",
    author: "Apple Store VN",
  },
];

const NewsDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  const article = newsArticles.find(a => a.id === id);
  
  if (!article) {
    return (
      <Layout>
        <div className="container-apple py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h1>
          <Button asChild>
            <Link to="/news">Quay lại tin tức</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const relatedArticles = newsArticles.filter(a => a.id !== id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Đã sao chép link bài viết" });
  };

  return (
    <>
      <Helmet>
        <title>{article.title} - Apple Store VN</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>
      <Layout>
        <article className="container-apple py-8">
          <Link 
            to="/news"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại tin tức
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge>{article.category}</Badge>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-lg text-muted-foreground">{article.excerpt}</p>
          </header>

          {/* Featured Image */}
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share */}
          <div className="flex items-center gap-4 py-6 border-t border-b mb-12">
            <span className="font-medium">Chia sẻ:</span>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="w-4 h-4" />
            </Button>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link 
                    key={related.id} 
                    to={`/news/${related.id}`}
                    className="group bg-card rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="mb-2">{related.category}</Badge>
                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </Layout>
    </>
  );
};

export default NewsDetail;
