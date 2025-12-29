import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { useToast } from "../../hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Vui lòng nhập email", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
    toast({ title: "Đã gửi link đặt lại mật khẩu!" });
  };

  return (
    <>
      <Helmet>
        <title>{`Quên mật khẩu - Apple Store VN`}</title>
      </Helmet>
      <Layout>
        <div className="container-apple py-12">
          <div className="max-w-md mx-auto">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại đăng nhập
            </Link>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Quên mật khẩu</CardTitle>
                <CardDescription>
                  {isSubmitted
                    ? "Kiểm tra hộp thư của bạn"
                    : "Nhập email để nhận link đặt lại mật khẩu"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-6">
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Chúng tôi đã gửi link đặt lại mật khẩu đến email{" "}
                      <strong>{email}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Không nhận được email?{" "}
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-primary hover:underline"
                      >
                        Thử lại
                      </button>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="email../..example.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
                      {isLoading ? "Đang gửi..." : "Gửi link đặt lại"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
