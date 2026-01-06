import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  products: [
    { name: "Tất cả sản phẩm", href: "/products" },
    { name: "iPhone", href: "/products/iphone" },
    { name: "iPad", href: "/products/ipad" },
    { name: "Mac", href: "/products/mac" },
    { name: "Apple Watch", href: "/products/apple-watch" },
    { name: "AirPods", href: "/products/airpods" },
    { name: "Phụ kiện", href: "/products/accessories" },
  ],
  support: [
    { name: "Trung tâm hỗ trợ", href: "/support" },
    { name: "Hướng dẫn mua hàng", href: "/support/shopping-guide" },
    { name: "Chính sách bảo hành", href: "/support/warranty" },
    { name: "Chính sách đổi trả", href: "/support/returns" },
    { name: "Câu hỏi thường gặp", href: "/support/faq" },
  ],
  about: [
    { name: "Giới thiệu", href: "/about" },
    { name: "Hệ thống cửa hàng", href: "/stores" },
    { name: "Tin tức", href: "/news" },
    { name: "Liên hệ", href: "/contact" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-secondary mt-16">
      <div className="container-apple py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-lg"></span>
              </div>
              <span className="font-semibold text-lg">Apple Store VN</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Cửa hàng phân phối sản phẩm Apple chính hãng tại Việt Nam.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>70 Tô Ký, Phường Trung Mỹ Tây, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1900 1900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@applestore.vn</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Sản phẩm</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">Về chúng tôi</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Apple Store VN. Tất cả quyền được bảo lưu.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Chính sách bảo mật
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
