/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';

export default function SignUp() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const router = useRouter();
  const restrictedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "zoho.com",
    "protonmail.com",
    "yandex.com",
  ];

  // Function to check if the email domain is restricted
  const isRestrictedDomain = (email: string) => {
    const domain = email.split("@")[1]?.toLowerCase();
    return restrictedDomains.includes(domain);
  };
  const validatePassword = (pass: string) => {
    const hasLength = pass.length >= 8 && pass.length <= 15;
    const hasLowerUpper = /(?=.*[a-z])(?=.*[A-Z])/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    return hasLength && hasLowerUpper && hasSpecial;
  };

  const handleSendOtp = async () => {
    if (
      !email ||
      !validatePassword(password) ||
      !name ||
      !phone ||
      !termsAccepted ||
      (type === "jobSeeker" && !resume)
    ) {
      setError("Please fill all fields correctly and accept terms.");
      return;
    }

    // Validate restricted domains for job posters
    if (type === "jobPoster" && isRestrictedDomain(email)) {
      setError("Personal email addresses are not allowed for job posters. Please use your office email.");
      return;
    }

    setIsLoading(true);
    try {
      // Upload resume if job seeker
      if (type === "jobSeeker" && resume) {
        const formData = new FormData();
        formData.append("resume", resume);

        const uploadResponse = await fetch("/api/upload/resume", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (!uploadData.success) {
          setError(uploadData.error || "Failed to upload resume");
          setIsLoading(false);
          return;
        }

        setResumeUrl(uploadData.url);
      }

      const response = await fetch("api/auth/sign-up/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.message);
        setShowOtpDialog(false); // Display the alert to the user
      }
      if (data.success) {
        setShowOtpDialog(true);
        setError("");
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
          type,
          mobile: phone,
          otp,
          resume: resumeUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast("Successfully account created !!")
        
        router.push("/signin");
      } else {
        setError(data.message || "Sign up failed");
      }
    } catch (err) {
      setError("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200/80 ">
      <ToastContainer/>
      <div className="mx-auto max-w-[1200px] p-4 h-auto flex items-center ">
        <div className="w-full flex shadow-lg rounded-lg overflow-hidden bg-white">
          <div className="hidden sm:flex bg-gray-600 p-12 relative">
            <div className="text-white text-4xl font-medium max-w-md mt-24">
              Discover world best online courses here. 24k online course is
              waiting for you
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
              {/* <Image
                src="/images/authBanner.png"
                alt="Student studying"
                width={300}
                height={300}
                priority
                className="mx-auto z-10 h-auto w-auto"
              /> */}
            </div>
          </div>

          <div className="flex-1 p-12 bg-white">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
              <p className="mb-8">
                Already have an account?{" "}
                <button
                  onClick={() => router.push("/signin")}
                  className="text-blue-500 hover:underline"
                >
                  Sign In
                </button>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block">
                     Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Select Account Type <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={type}
                    onValueChange={(value: React.SetStateAction<string>) => setType(value)}
                  >
                    <SelectTrigger className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jobSeeker">Job seeker</SelectItem>
                      <SelectItem value="jobPoster">Job poster (It Referral)</SelectItem>
        
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your Email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your Phone Number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your Password"
                    required
                  />
                  <div className="bg-slate-900 p-4 rounded-lg text-sm space-y-1">
                    <div className="text-blue-400">Password Should be:</div>
                    <ul className="text-blue-400 space-y-1 list-disc pl-4">
                      <li>At least 8 characters (and up to 15 characters)</li>
                      <li>At least one lowercase and uppercase character</li>
                      <li>
                        Inclusion of at least one special character, e.g., ! @ #
                        ?
                      </li>
                    </ul>
                  </div>
                </div>

                {type === "jobSeeker" && (
                  <div className="space-y-2">
                    <label className="block">
                      Resume <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setResume(e.target.files?.[0] || null)}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                    {resume && <p>Resume uploaded: {resume.name}</p>}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="terms" className="text-sm">
                    By clicking Sign up, I agree that I have read and accepted
                    the{" "}
                    <a
                      href="/terms"
                      className="text-black hover:underline"
                    >
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-black hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="w-full bg-black text-white p-3 rounded-lg hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
            </div>
          </div>

          <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter OTP</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p>Please enter the OTP sent to your email address.</p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter OTP"
                />
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !otp}
                  className="w-full bg-black text-white p-3 rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify & Sign Up"
                  )}
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}