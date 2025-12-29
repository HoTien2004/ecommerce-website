import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { ProductCard } from "../components/product/ProductCard";
import { products, categories } from "../data/products";
import { ProductFilters } from "../components/filters/ProductFilters";
import { categoryFilters } from "../data/filters";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { formatPrice } from "../data/products";
import { Grid3X3, List, SlidersHorizontal, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";

const Products = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const currentCategory = categories.find((c) => c.slug === category);
  const hasAdvancedFilters = category && categoryFilters[category];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (category) {
      result = result.filter((p) => p.category === category);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [category, searchQuery, priceRange, sortBy, selectedFilters]);

  const handleFilterChange = (key: string, values: string[]) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: values }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    setPriceRange([0, 100000000]);
  };

  const pageTitle = currentCategory
    ? `${currentCategory.name} - Apple Store VN`
    : searchQuery
    ? `Kết quả tìm kiếm: ${searchQuery}`
    : "Tất cả sản phẩm - Apple Store VN";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {currentCategory?.name || (searchQuery ? `Kết quả: "${searchQuery}"` : "Tất cả sản phẩm")}
            </h1>
            {currentCategory && (
              <p className="text-muted-foreground">{currentCategory.description}</p>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              {filteredProducts.length} sản phẩm
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filters - Desktop */}
            <aside className="w-64 shrink-0 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {hasAdvancedFilters ? (
                  <ProductFilters
                    category={category!}
                    selectedFilters={selectedFilters}
                    priceRange={priceRange}
                    onFilterChange={handleFilterChange}
                    onPriceChange={setPriceRange}
                    onClearFilters={handleClearFilters}
                  />
                ) : (
                  <>
                    <div>
                      <h3 className="font-semibold mb-4">Khoảng giá</h3>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={60000000}
                        step={1000000}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">Danh mục</h3>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <Button
                            key={cat.id}
                            variant={category === cat.slug ? "secondary" : "ghost"}
                            size="sm"
                            className="w-full justify-start"
                            asChild
                          >
                            <a href={`/products/${cat.slug}`}>{cat.name}</a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 gap-4">
                {/* Mobile Filters */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Bộ lọc
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      {hasAdvancedFilters ? (
                        <ProductFilters
                          category={category!}
                          selectedFilters={selectedFilters}
                          priceRange={priceRange}
                          onFilterChange={handleFilterChange}
                          onPriceChange={setPriceRange}
                          onClearFilters={handleClearFilters}
                        />
                      ) : (
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-semibold mb-4">Khoảng giá</h3>
                            <Slider
                              value={priceRange}
                              onValueChange={setPriceRange}
                              min={0}
                              max={60000000}
                              step={1000000}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>{formatPrice(priceRange[0])}</span>
                              <span>{formatPrice(priceRange[1])}</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-4">Danh mục</h3>
                            <div className="space-y-2">
                              {categories.map((cat) => (
                                <Button
                                  key={cat.id}
                                  variant={category === cat.slug ? "secondary" : "ghost"}
                                  size="sm"
                                  className="w-full justify-start"
                                  asChild
                                >
                                  <a href={`/products/${cat.slug}`}>{cat.name}</a>
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="flex items-center gap-4 ml-auto">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sắp xếp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                      <SelectItem value="price-asc">Giá thấp đến cao</SelectItem>
                      <SelectItem value="price-desc">Giá cao đến thấp</SelectItem>
                      <SelectItem value="rating">Đánh giá cao</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bộ lọc */}
              {Object.values(selectedFilters).some((arr) => arr.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.entries(selectedFilters).map(([key, values]) =>
                    values.map((value) => (
                      <Button
                        key={`${key}-${value}`}
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          handleFilterChange(
                            key,
                            values.filter((v) => v !== value)
                          )
                        }
                      >
                        {value}
                        <X className="w-3 h-3 ml-1" />
                      </Button>
                    ))
                  )}
                  <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                    Xóa tất cả
                  </Button>
                </div>
              )}

              {/* Giao diện Sản phẩm */}
              {filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
