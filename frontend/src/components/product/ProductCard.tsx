import { Link, useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingBag, Star, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { type Product, formatPrice } from "../../data/products";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/use-toast";
import { Badge } from "../ui/badge";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultColor = product.variants.colors[0].name;
    const defaultStorage = product.variants.storage?.[0];
    addToCart(product, defaultColor, defaultStorage);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: product.name,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultColor = product.variants.colors[0].name;
    const defaultStorage = product.variants.storage?.[0];
    const buyNowItem = {
      product,
      quantity: 1,
      selectedColor: defaultColor,
      selectedStorage: defaultStorage,
    };

    if (isAuthenticated) {
      navigate("/checkout", { state: { buyNowItem } });
      return;
    }
    toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để mua hàng ngay.",
        variant: "destructive",
      });
    // Not authenticated: send user to auth page and preserve intent
    navigate("/auth", { state: { buyNowItem, from: location.pathname } });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Đã xóa khỏi yêu thích",
        description: product.name,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Đã thêm vào yêu thích",
        description: product.name,
      });
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="card-product relative">
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">Mới</Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 z-10 rounded-full bg-background/80 hover:bg-background"
        >
          <Heart
            className={`w-4 h-4 ${inWishlist ? "fill-destructive text-destructive" : ""}`}
          />
        </Button>

        {/* Image */}
        <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleBuyNow}
              className="flex-1 rounded-full bg-primary hover:bg-primary/90"
              size="sm"
            >
              <Zap className="w-4 h-4 mr-1" />
              Mua ngay
            </Button>
            <Button
              onClick={handleAddToCart}
              variant="outline"
              size="icon"
              className="rounded-full shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
