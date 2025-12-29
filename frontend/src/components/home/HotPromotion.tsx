import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { ProductCard } from "../product/ProductCard";
import { ArrowRight, Flame } from "lucide-react";

export const HotPromotion = () => {
  const [activeTab] = useState("iphone");

  const filteredProducts = products
    .filter((p) => p.category === activeTab && p.originalPrice)
    .slice(0, 4);

  return (
    <section className="container-apple py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
            <Flame className="w-5 h-5 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold">Khuyến mãi hot</h2>
        </div>
        <Link
          to="/products"
          className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
        >
          Xem tất cả
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-4 text-center py-12 text-muted-foreground">
            Không có sản phẩm khuyến mãi trong danh mục này
          </div>
        )}
      </div>
    </section>
  );
};