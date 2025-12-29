import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet-async";
import { User, MapPin, Package, Key, Star } from "lucide-react";
import { cn } from "../../lib/utils";

const accountNavItems = [
  { path: "/account", label: "Thông tin cá nhân", icon: User, end: true },
  { path: "/account/addresses", label: "Quản lý địa chỉ", icon: MapPin },
  { path: "/account/orders", label: "Đơn hàng của tôi", icon: Package },
  { path: "/account/reviews", label: "Đánh giá sản phẩm", icon: Star },
  { path: "/account/password", label: "Đổi mật khẩu", icon: Key },
];

const AccountLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{`Tài khoản - Apple Store VN`}</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-8">
          <h1 className="text-3xl font-bold mb-8">Tài khoản của tôi</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 shrink-0">
              <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                {accountNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0">
              <Outlet />
            </main>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AccountLayout;
