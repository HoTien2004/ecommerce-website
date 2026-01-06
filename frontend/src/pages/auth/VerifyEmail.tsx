import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../components/ui/input-otp";
import { Helmet } from "react-helmet-async";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const token = searchParams.get("token");
  const email = searchParams.get("email") || "user@example.com";
  
  const [status, setStatus] = useState<"loading" | "success" | "error" | "pending">(
    token ? "loading" : "pending"
  );
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (token) {
      // Simulate verification with token
      const timer = setTimeout(() => {
        setStatus("success");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [token]);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({ title: "Vui lòng nhập đủ 6 số", variant: "destructive" });
      return;
    }

    setIsVerifying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsVerifying(false);
    setStatus("success");
    toast({ title: "Xác minh email thành công!" });
  };

  const handleResend = async () => {
    toast({ title: "Đã gửi lại mã xác minh!" });
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
                    ? "Nhập mã xác minh đã gửi đến email của bạn"
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
                      Mã xác minh đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu gửi lại.
                    </p>
                    <Button onClick={handleResend} className="rounded-full">
                      Gửi lại mã
                    </Button>
                  </div>
                )}

                {status === "pending" && (
                  <div className="text-center py-4 space-y-6">
                    <div>
                      <Mail className="w-12 h-12 mx-auto text-primary mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Chúng tôi đã gửi mã xác minh đến:
                      </p>
                      <p className="font-semibold">{email}</p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Nhập mã gồm 6 chữ số:
                      </p>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={(value) => setOtp(value)}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>

                    <Button 
                      onClick={handleVerifyOtp} 
                      className="w-full rounded-full"
                      disabled={otp.length !== 6 || isVerifying}
                    >
                      {isVerifying ? "Đang xác minh..." : "Xác minh"}
                    </Button>

                    <div className="space-y-3 pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Không nhận được mã?{" "}
                        <button onClick={handleResend} className="text-primary hover:underline">
                          Gửi lại
                        </button>
                      </p>
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
