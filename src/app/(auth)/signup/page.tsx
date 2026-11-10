
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Form } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


type SocialProvider = "google" | "github";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);

  const [passwordError, setPasswordError] = useState("");

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  // Email and password signup
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();
    setPasswordError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      setPasswordError("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    // console.log("Sign Up Data:", data);
    const { data:resData, error } = await signUp.email({
        email: data.email as string, // user email address
        password:data.password as string, // user password -> min 8 characters by default
        name: data.name as string, // user display name
    });   
    if(resData?.user.name){
       toast.success("Account Created Successfully, Login to continue");
      router.push("/signin");

    }
    console.log(resData, error);
     
 };
  // Google and GitHub authentication
  const handleSocialSignIn = async ( provider: SocialProvider ) => {
    setPasswordError("");
    setSocialLoading(provider);

    try {
      const { error: authError } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (authError) {
        setPasswordError(
          authError.message ??
            `${provider} authentication failed.`
        );

        setSocialLoading(null);
      }
    } catch {
      setPasswordError("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setSocialLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-5 py-8 sm:py-12 flex justify-center">
      <div className="w-full max-w-[420px]">

        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="text-[22px] font-bold text-[#26332B]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="text-[13px] text-[#7B847D] mt-1">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-[#FAFCFA] border border-[#DFE7DF] rounded-[14px] p-5">

          <Form onSubmit={handleSubmit} className="space-y-3.5">

            {/* Name */}
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-[13px] font-medium text-[#303B33] mb-1"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="যেমন: ইশতিয়াক আহমেদ "
                required
                className="w-full h-[33px] px-2.5 text-[12px] text-[#29352D] bg-transparent border border-[#E1E9E1] rounded-[7px] outline-none focus:border-[#078B46] focus:ring-1 focus:ring-[#078B46] transition"
              />
            </div>

            {/* Email */}
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-[13px] font-medium text-[#303B33] mb-1"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full h-[33px] px-2.5 text-[12px] text-[#29352D] bg-transparent border border-[#E1E9E1] rounded-[7px] outline-none focus:border-[#078B46] focus:ring-1 focus:ring-[#078B46] transition"
              />
            </div>

            {/* Password */}
            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-[13px] font-medium text-[#303B33] mb-1"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  minLength={8}
                  required
                  className="w-full h-[33px] px-2.5 pr-9 text-[12px] text-[#29352D] bg-transparent border border-[#E1E9E1] rounded-[7px] outline-none focus:border-[#078B46] focus:ring-1 focus:ring-[#078B46] transition"
                />

                <button
                  type="button"
                  onClick={() =>setShowPassword((prev) => !prev) }
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7B847D] hover:text-[#078B46] transition"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="w-full">
              <label
                htmlFor="confirmPassword"
                className="block text-[13px] font-medium text-[#303B33] mb-1"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  placeholder="আবার লিখুন"
                  minLength={8}
                  required
                  className="w-full h-[33px] px-2.5 pr-9 text-[12px] text-[#29352D] bg-transparent border border-[#E1E9E1] rounded-[7px] outline-none focus:border-[#078B46] focus:ring-1 focus:ring-[#078B46] transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7B847D] hover:text-[#078B46] transition"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {passwordError && (
              <p className="w-full text-[12px] text-red-600">
                {passwordError}
              </p>
            )}

            {/* Submit Button */}
            <button
             
              type="submit"
              disabled={loading || socialLoading !== null}
              className="w-full h-[34px] mt-1 bg-[#078B46] hover:bg-[#06783D] text-white text-[13px] font-semibold rounded-[7px] shadow-[0_3px_3px_rgba(0,0,0,0.22)] transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "অপেক্ষা করুন..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </button>

          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-[#E0E6E0]" />

            <span className="text-[12px] text-[#6D756E]">
              অথবা
            </span>

            <div className="h-px flex-1 bg-[#E0E6E0]" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-2">

            {/* Google */}
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={loading || socialLoading !== null}
              className="h-[34px] flex bg-transparent items-center justify-center gap-1.5 border border-[#DFE7DF] rounded-[7px] text-[11px] sm:text-[12px] font-medium text-[#303B33] hover:bg-[#F0F5F0] transition disabled:opacity-50"
            >
              <svg viewBox="0 0 48 48" className="w-[13px] h-[13px]">
                <path
                  fill="#FFC107"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4.1 6v5h6.6c3.9-3.6 6.1-8.7 6.1-14.7Z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.1C9.2 39.5 16 44 24 44Z"
                />
                <path
                  fill="#1976D2"
                  d="M12.6 27.8a12 12 0 0 1 0-7.6v-5.1H5.8a20 20 0 0 0 0 17.8l6.8-5.1Z"
                />
                <path
                  fill="#EA4335"
                  d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4 16 4 9.2 8.5 5.8 15.1l6.8 5.1C14.2 15.6 18.7 12 24 12Z"
                />
              </svg>

              {socialLoading === "google"
                ? "Connecting..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={loading || socialLoading !== null}
              className="h-[34px] flex bg-transparent items-center justify-center gap-1.5 border border-[#DFE7DF] rounded-[7px] text-[11px] sm:text-[12px] font-medium text-[#303B33] hover:bg-[#F0F5F0] transition disabled:opacity-50"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[13px] h-[13px]"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.6v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              {socialLoading === "github"
                ? "Connecting..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>

          </div>

          {/* Login Link */}
          <p className="text-center text-[12px] text-[#515A53] mt-3.5">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="text-[#078B46] font-medium hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>

        </div>

        {/* Back to Home */}
        <div className="text-center mt-5">
          <Link
            href="/"
            className="text-[12px] text-[#8A938B] hover:text-[#078B46] transition"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </main>
  );
};

export default SignUpPage;
