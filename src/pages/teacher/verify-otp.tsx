import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import API from "@/config/request";

export const TeacherOTPVerify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<"send" | "verify">("send");
  const [isLoading, setIsLoading] = useState(false);

  const emailFromURL = searchParams.get("email") || "";

  const [email] = useState(emailFromURL);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  console.log("📧 Email from URL:", emailFromURL);

  useEffect(() => {
    if (!emailFromURL) {
      toast.error("Email not found. Please try logging in again.");
      navigate("/teacher/login");
    }
  }, [emailFromURL, navigate]);

  const handleSendOTP = async () => {
    console.log("🚀 Send OTP clicked!");
    console.log("📤 Data:", { email, phoneNumber, password: "***" });

    if (!phoneNumber || phoneNumber.length < 9) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const response = await API.post("/teacher/google/send-otp", {
        email,
        phoneNumber,
        password,
      });

      console.log("✅ OTP sent:", response.data);
      toast.success(response.data.message || "OTP sent to your email!");
      setStep("verify");
    } catch (error: any) {
      console.error("❌ Error:", error);
      const message = error?.response?.data?.message || "Failed to send OTP";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    console.log("🚀 Verify OTP clicked!");
    console.log("📤 OTP:", otp);

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const response = await API.post("/teacher/google/verify-otp", {
        email,
        otp,
      });

      console.log("✅ Verified:", response.data);
      toast.success(response.data.message || "Account activated!");

      setTimeout(() => {
        navigate("/teacher/login");
      }, 2000);
    } catch (error: any) {
      console.error("❌ Error:", error);
      const message = error?.response?.data?.message || "Invalid OTP";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

return (
  <div className="fixed bg-linear-to-br from-slate-50 via-orange-50/30 to-teal-50/40 inset-0 flex items-center justify-center p-4">
    <Card className="w-full max-w-md shadow-xl border border-slate-200 rounded-2xl">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-[#20B2AA] to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl text-white">✉️</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {step === "send" ? "Complete Your Registration" : "Verify OTP"}
          </h2>
          <p className="text-slate-600 mt-2">
            {step === "send"
              ? "Enter your phone number and create a password"
              : "Enter the 6-digit code sent to your email"}
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span>📧</span> Email
            </label>
            <Input
              value={email}
              disabled
              className="bg-slate-100 border-slate-200 mt-2 h-11 rounded-lg cursor-not-allowed"
            />
          </div>

          {step === "send" ? (
            <>
              <div>
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span>📱</span> Phone Number
                </label>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+998901234567"
                  disabled={isLoading}
                  className="mt-2 h-11 border-slate-300 focus:ring-2 focus:ring-[#20B2AA]/30 focus:border-[#20B2AA] rounded-lg transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span>🔒</span> Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min 6 characters)"
                  disabled={isLoading}
                  className="mt-2 h-11 border-slate-300 focus:ring-2 focus:ring-[#20B2AA]/30 focus:border-[#20B2AA] rounded-lg transition-all"
                />
              </div>

              <Button
                onClick={handleSendOTP}
                className="w-full h-12 bg-[#20B2AA] hover:bg-teal-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>

              <Button
                onClick={() => navigate("/teacher/login")}
                variant="outline"
                className="w-full h-12 border-2 border-slate-200 hover:bg-slate-50 hover:border-[#ff9933]/30 rounded-lg font-medium transition-all"
                disabled={isLoading}
              >
                Back to Login
              </Button>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span>🔑</span> OTP Code
                </label>
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  disabled={isLoading}
                  className="mt-2 h-11 border-slate-300 focus:ring-2 focus:ring-[#20B2AA]/30 focus:border-[#20B2AA] rounded-lg transition-all text-center text-lg font-semibold tracking-widest"
                />
              </div>

              <Button
                onClick={handleVerifyOTP}
                className="w-full h-12 bg-[#20B2AA] hover:bg-teal-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify & Complete"}
              </Button>

              <Button
                onClick={() => setStep("send")}
                variant="outline"
                className="w-full h-12 border-2 border-slate-200 hover:bg-slate-50 hover:border-[#ff9933]/30 rounded-lg font-medium transition-all"
                disabled={isLoading}
              >
                Resend OTP
              </Button>
            </>
          )}
        </div>

        <div className="mt-8 text-center bg-linear-to-r from-[#20B2AA]/5 to-teal-50/50 rounded-lg p-4 border border-[#20B2AA]/10">
          <p className="text-sm text-slate-600">
            After verification, your account will be pending admin approval.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);
};
