import { Layout } from "../components/layout/Layout";
import { HeroBanner } from "../components/home/HeroBanner";
import { FeatureBoxes } from "../components/home/FeatureBoxes";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { HotPromotion } from "../components/home/HotPromotion";
// import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { NewProducts } from "../components/home/NewProducts";
import { NewsSection } from "../components/home/NewsSection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Apple Store VN - Cửa hàng Apple chính hãng</title>
        <meta
          name="description"
          content="Mua iPhone, iPad, Mac, Apple Watch, AirPods và phụ kiện chính hãng Apple. Giao hàng miễn phí, bảo hành 12 tháng."
        />
      </Helmet>
      <Layout>
        <HeroBanner />
        <FeatureBoxes />
        <CategoryGrid />
        <HotPromotion />
        {/* <FeaturedProducts /> */}
        <NewProducts />
        <NewsSection />
      </Layout>
    </>
  );
};

export default Index;