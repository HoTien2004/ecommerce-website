import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Helmet } from "react-helmet-async";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  
  const [status, setStatus] = useState<"loading" | "success" | "error" | "pending">(
    token ? "loading" : "pending"
  );

  useEffect(() => {
    if (token) {
      // Simulate verification
      const timer = setTimeout(() => {
        setStatus("success");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [token]);

  const handleResend = async () => {
    toast({ title: "Đã gửi lại email xác minh!" });
  };

  return (
    <>
      <Helmet>
        <title>{`Xác minh email - Apple Store VN`}</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-12">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Xác minh email</CardTitle>
                <CardDescription>
                  {status === "pending"
                    ? "Vui lòng kiểm tra email của bạn"
                    : status === "loading"
                    ? "Đang xác minh..."
                    : status === "success"
                    ? "Xác minh thành công!"
                    : "Xác minh thất bại"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {status === "loading" && (
                  <div className="text-center py-8">
                    <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">Đang xác minh tài khoản của bạn...</p>
                  </div>
                )}

                {status === "success" && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                    <p className="text-muted-foreground mb-6">
                      Email của bạn đã được xác minh thành công. Bạn có thể đăng nhập ngay bây giờ.
                    </p>
                    <Button asChild className="rounded-full">
                      <Link to="/auth">Đăng nhập</Link>
                    </Button>
                  </div>
                )}

                {status === "error" && (
                  <div className="text-center py-8">
                    <XCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
                    <p className="text-muted-foreground mb-6">
                      Link xác minh đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu gửi lại.
                    </p>
                    <Button onClick={handleResend} className="rounded-full">
                      Gửi lại email
                    </Button>
                  </div>
                )}

                {status === "pending" && (
                  <div className="text-center py-8">
                    <Mail className="w-16 h-16 mx-auto text-primary mb-4" />
                    <p className="text-muted-foreground mb-2">
                      Chúng tôi đã gửi email xác minh đến:
                    </p>
                    {email && <p className="font-semibold mb-6">{email}</p>}
                    <p className="text-sm text-muted-foreground mb-6">
                      Vui lòng kiểm tra hộp thư (bao gồm thư rác) và nhấp vào link xác minh.
                    </p>
                    <div className="space-y-3">
                      <Button onClick={handleResend} variant="outline" className="w-full rounded-full">
                        Gửi lại email xác minh
                      </Button>
                      <Button asChild variant="ghost" className="w-full rounded-full">
                        <Link to="/auth">Quay lại đăng nhập</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default VerifyEmail;
