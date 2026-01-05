import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";

const banners = [
  { id: 1, image: img1, link: "/products/iphone", bgColor: "bg-gradient-to-r from-zinc-900 to-zinc-800" },
  { id: 2, image: img2, link: "/products/mac", bgColor: "bg-gradient-to-r from-slate-100 to-slate-200" },
  { id: 3, image: img3, link: "/products/apple-watch", bgColor: "bg-gradient-to-r from-rose-50 to-orange-50" },
  { id: 4, image: img4, link: "/products/accessories", bgColor: "bg-gradient-to-r from-emerald-50 to-emerald-100" },
  { id: 5, image: img5, link: "/products/special", bgColor: "bg-gradient-to-r from-indigo-50 to-indigo-100" },
  { id: 6, image: img6, link: "/products/new", bgColor: "bg-gradient-to-r from-sky-50 to-sky-100" },
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
      {/* Full-bleed image: remove container constraints so image spans edge-to-edge */}
      <div className="relative w-full">
        <Link to={currentBanner.link} className="block w-full">
          <img
            src={currentBanner.image}
            // alt={currentBanner.title}
            className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
        </Link>

        {/* Arrows overlayed on image */}
        <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
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

        {/* Dots centered over image */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-primary" : "bg-foreground/30 hover:bg-foreground/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
