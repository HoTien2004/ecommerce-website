import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminProvider } from "./contexts/AdminContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Wishlist from "./pages/Wishlist";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import AccountLayout from "./pages/account/AccountLayout";
import Profile from "./pages/account/Profile";
import Addresses from "./pages/account/Addresses";
import Orders from "./pages/account/Orders";
import OrderDetail from "./pages/account/OrderDetail";
import Reviews from "./pages/account/Reviews";
import ChangePassword from "./pages/account/ChangePassword";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import NotFound from "./pages/NotFound";
// Support pages
import SupportCenter from "./pages/support/SupportCenter";
import ShoppingGuide from "./pages/support/ShoppingGuide";
import WarrantyPolicy from "./pages/support/WarrantyPolicy";
import ReturnPolicy from "./pages/support/ReturnPolicy";
import FAQ from "./pages/support/FAQ";
// About pages
import About from "./pages/about/About";
import StoreLocations from "./pages/about/StoreLocations";
import Contact from "./pages/about/Contact";
// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/products/AdminProducts";
import CreateProduct from "./pages/admin/products/CreateProduct";
import EditProduct from "./pages/admin/products/EditProduct";
import AdminProductDetail from "./pages/admin/products/ProductDetail";
import AdminOrders from "./pages/admin/orders/AdminOrders";
import AdminOrderDetail from "./pages/admin/orders/AdminOrderDetail";
import AdminUsers from "./pages/admin/users/AdminUsers";
import AdminCategories from "./pages/admin/categories/AdminCategories";
// import AdminBrands from "./pages/admin/brands/AdminBrands";
// import AdminPayments from "./pages/admin/payments/AdminPayments";
import AdminCoupons from "./pages/admin/coupons/AdminCoupons";
import AdminBanners from "./pages/admin/banners/AdminBanners";
import AdminNews from "./pages/admin/news/AdminNews";
import CreateNews from "./pages/admin/news/CreateNews";
import EditNews from "./pages/admin/news/EditNews";
import AdminReviews from "./pages/admin/reviews/AdminReviews";
import UserDetail from "./pages/admin/users/UserDetail";
// import AdminSettings from "./pages/admin/settings/AdminSettings";
// import AdminReports from "./pages/admin/reports/AdminReports";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <WishlistProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:category" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                    <Route path="/auth/verify-email" element={<VerifyEmail />} />
                    <Route path="/account" element={<AccountLayout />}>
                      <Route index element={<Profile />} />
                      <Route path="addresses" element={<Addresses />} />
                      <Route path="orders" element={<Orders />} />
                      <Route path="orders/:orderId" element={<OrderDetail />} />
                      <Route path="reviews" element={<Reviews />} />
                      <Route path="password" element={<ChangePassword />} />
                    </Route>
                    <Route path="/news" element={<News />} />
                    <Route path="/news/:id" element={<NewsDetail />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/payment/success" element={<PaymentSuccess />} />
                    <Route path="/payment/failed" element={<PaymentFailed />} />
                    
                    {/* Support routes */}
                    <Route path="/support" element={<SupportCenter />} />
                    <Route path="/support/shopping-guide" element={<ShoppingGuide />} />
                    <Route path="/support/warranty" element={<WarrantyPolicy />} />
                    <Route path="/support/returns" element={<ReturnPolicy />} />
                    <Route path="/support/faq" element={<FAQ />} />
                    
                    {/* About routes */}
                    <Route path="/about" element={<About />} />
                    <Route path="/stores" element={<StoreLocations />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* Admin routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="products" element={<AdminProducts />} />
                      <Route path="products/create" element={<CreateProduct />} />
                      <Route path="products/:id" element={<AdminProductDetail />} />
                      <Route path="products/:id/edit" element={<EditProduct />} />
                      <Route path="categories" element={<AdminCategories />} />
                      {/* <Route path="brands" element={<AdminBrands />} /> */}
                      <Route path="orders" element={<AdminOrders />} />
                      <Route path="orders/:orderId" element={<AdminOrderDetail />} />
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="users/:id" element={<UserDetail />} />
                      {/* <Route path="payments" element={<AdminPayments />} /> */}
                      <Route path="coupons" element={<AdminCoupons />} />
                      <Route path="banners" element={<AdminBanners />} />
                      <Route path="reviews" element={<AdminReviews />} />
                      <Route path="news" element={<AdminNews />} />
                      <Route path="news/create" element={<CreateNews />} />
                      <Route path="news/:id/edit" element={<EditNews />} />
                      {/* <Route path="settings" element={<AdminSettings />} />
                      <Route path="reports" element={<AdminReports />} /> */}
                    </Route>
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </WishlistProvider>
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
