import { products } from "../../data/products";
import { ProductCard } from "../product/ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const NewProducts = () => {
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="py-16">
      <div className="container-apple">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Sản phẩm mới</h2>
          <Link
            to="/products?sort=newest"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            Xem tất cả
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
