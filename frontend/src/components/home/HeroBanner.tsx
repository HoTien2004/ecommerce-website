import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const banners = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    subtitle: "Titanium. Mạnh mẽ. Chuyên nghiệp.",
    description: "Chip A17 Pro mang đến hiệu năng đỉnh cao cho game và sáng tạo.",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=1200&h=600&fit=crop",
    link: "/products/iphone",
    bgColor: "bg-gradient-to-r from-zinc-900 to-zinc-800",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "MacBook Pro M3",
    subtitle: "Siêu năng. Siêu mạnh.",
    description: "Chip M3 Pro và M3 Max mang đến hiệu năng chưa từng có.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=600&fit=crop",
    link: "/products/mac",
    bgColor: "bg-gradient-to-r from-slate-100 to-slate-200",
    textColor: "text-foreground",
  },
  {
    id: 3,
    title: "Apple Watch Series 9",
    subtitle: "Thông minh hơn. Sáng hơn. Mạnh mẽ hơn.",
    description: "Màn hình sáng nhất từ trước đến nay với cử chỉ Double Tap mới.",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&h=600&fit=crop",
    link: "/products/apple-watch",
    bgColor: "bg-gradient-to-r from-rose-50 to-orange-50",
    textColor: "text-foreground",
  },
];

export const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const currentBanner = banners[currentIndex];

  return (
    <section className={`relative overflow-hidden ${currentBanner.bgColor} transition-all duration-500`}>
      <div className="container-apple py-6 lg:py-12">
        <div className="relative">
          <Link to={currentBanner.link} className="block">
            <img
              src={currentBanner.image}
              alt={currentBanner.title}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
            />
          </Link>

          {/* Arrows overlayed on image */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="pointer-events-auto rounded-full bg-background/20 hover:bg-background/40"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="pointer-events-auto rounded-full bg-background/20 hover:bg-background/40"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-primary" : "bg-foreground/30 hover:bg-foreground/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
