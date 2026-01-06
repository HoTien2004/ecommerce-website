import { Link } from "react-router-dom";
import { categories } from "../../data/products";

export const CategoryGrid = () => {
  return (
    <section className="container-apple py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Danh mục sản phẩm</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/products/${category.slug}`}
            className="group"
          >
            <div className="card-product text-center">
              <div className="relative w-20 h-20 mx-auto mb-4 overflow-hidden rounded-2xl">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="font-semibold text-sm">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
