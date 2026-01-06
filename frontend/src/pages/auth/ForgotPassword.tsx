import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../components/ui/input-otp";
import { useToast } from "../../hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { Mail, ArrowLeft, CheckCircle, KeyRound } from "lucide-react";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "otp" | "newPassword" | "success">("email");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Vui lòng nhập email", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep("otp");
    toast({ title: "Đã gửi mã OTP đến email của bạn!" });
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({ title: "Vui lòng nhập đủ 6 số", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("newPassword");
    toast({ title: "Xác minh thành công!" });
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast({ title: "Vui lòng nhập đầy đủ thông tin", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Mật khẩu xác nhận không khớp", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Mật khẩu phải có ít nhất 6 ký tự", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep("success");
    toast({ title: "Đặt lại mật khẩu thành công!" });
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
                  {step === "email" && "Nhập email để nhận mã xác minh"}
                  {step === "otp" && "Nhập mã OTP đã gửi đến email của bạn"}
                  {step === "newPassword" && "Tạo mật khẩu mới"}
                  {step === "success" && "Đặt lại mật khẩu thành công!"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === "email" && (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
                      {isLoading ? "Đang gửi..." : "Gửi mã OTP"}
                    </Button>
                  </form>
                )}

                {step === "otp" && (
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Mã OTP đã được gửi đến <strong>{email}</strong>
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

                    <Button type="submit" className="w-full rounded-full" disabled={isLoading || otp.length !== 6}>
                      {isLoading ? "Đang xác minh..." : "Xác minh"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Không nhận được mã?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          toast({ title: "Đã gửi lại mã OTP!" });
                        }}
                        className="text-primary hover:underline"
                      >
                        Gửi lại
                      </button>
                    </p>
                  </form>
                )}

                {step === "newPassword" && (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Mật khẩu mới</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
                      {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                    </Button>
                  </form>
                )}

                {step === "success" && (
                  <div className="text-center py-6">
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                    <p className="text-muted-foreground mb-6">
                      Mật khẩu của bạn đã được đặt lại thành công. Bạn có thể đăng nhập ngay bây giờ.
                    </p>
                    <Button asChild className="rounded-full">
                      <Link to="/auth">Đăng nhập</Link>
                    </Button>
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

export default ForgotPassword;
