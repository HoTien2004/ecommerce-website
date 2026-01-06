import { Link } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { useWishlist } from "../contexts/WishlistContext";
import { Button } from "../components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { ProductCard } from "../components/product/ProductCard";

const Wishlist = () => {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Yêu thích - Apple Store VN</title>
        </Helmet>
        <Layout>
          <div className="container-apple py-20 text-center">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Chưa có sản phẩm yêu thích</h1>
            <p className="text-muted-foreground mb-6">
              Hãy thêm sản phẩm vào danh sách yêu thích của bạn
            </p>
            <Button asChild>
              <Link to="/products">Khám phá sản phẩm</Link>
            </Button>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Yêu thích (${items.length}) - Apple Store VN`}</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Sản phẩm yêu thích</h1>
              <p className="text-muted-foreground text-sm">{items.length} sản phẩm trong danh sách</p>
            </div>
            <Button 
              variant="outline" 
              onClick={clearWishlist}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Xóa tất cả
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Wishlist;