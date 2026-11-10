
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Form } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type SocialProvider = "google" | "github";

const SignInPage = () => {
  const router = useRouter();

  // Email login loading state
  const [loading, setLoading] = useState(false);

  // Social login loading state
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);

  // Error message state
  const [error, setError] = useState("");

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Email and password login
  const handleLogin = async ( e: React.SyntheticEvent<HTMLFormElement> ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const email = String(formData.get("email") ?? "");
      const password = String(formData.get("password") ?? "");

      const { data, error: authError } = await signIn.email({
        email,
        password,
      });

      if (authError) {
        setError(
          authError.message ?? "লগইন করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      if (data) {
        toast.success("Login Successful!");

        router.push("/");
        router.refresh();
      }
    } catch {
      setError("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google and GitHub login
  const handleSocialSignIn = async ( provider: SocialProvider) => {
    setError("");
    setSocialLoading(provider);

    try {
      const { error: authError } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (authError) {
        setError(
          authError.message ?? `${provider} authentication failed.`
        );

        setSocialLoading(null);
      }
    } catch {
      setError("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setSocialLoading(null);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px]">

        {/* Heading */}
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-[#26332A]">
            সাইন ইন
          </h1>

          <p className="mt-1 text-sm text-[#89928A]">
            বিস্তারিত দায়, বাজার মূল্য ও প্রোফাইল দেখতে অ্যাকাউন্টটি
            <br className="hidden sm:block" /> খুলুন
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-[#E0E9E1] bg-[#FAFCFA] p-5 sm:p-[19px]">

          <Form onSubmit={handleLogin} className="space-y-3">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="h-[34px] w-full rounded-md border border-[#E0E9E1] bg-transparent px-3 text-sm outline-none transition focus:border-[#078D43] focus:ring-2 focus:ring-[#078D43]/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  required
                  minLength={8}
                  autoComplete="current-password"
                  className="h-[34px] w-full rounded-md border border-[#E0E9E1] bg-transparent px-3 pr-9 text-sm outline-none transition focus:border-[#078D43] focus:ring-2 focus:ring-[#078D43]/10"
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89928A] transition hover:text-[#078D43]"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
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

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading || socialLoading !== null}
              className="h-[35px] w-full rounded-md bg-[#078D43] text-sm font-semibold text-white shadow-[0_3px_3px_rgba(0,0,0,0.22)] transition hover:bg-[#06783A] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
            </button>

          </Form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#DCE5DD]" />

            <span className="text-xs text-[#7B857D]">
              অথবা
            </span>

            <div className="h-px flex-1 bg-[#DCE5DD]" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

            {/* Google Login */}
            <button
              type="button"
              disabled={loading || socialLoading !== null}
              onClick={() => handleSocialSignIn("google")}
              className="flex h-[34px] items-center justify-center gap-1.5 rounded-md border border-[#E0E9E1] px-2 text-xs font-semibold transition hover:bg-[#F1F5F1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg viewBox="0 0 48 48" className="h-3.5 w-3.5">
                <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15z"/>
                <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44z"/>
                <path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8z"/>
                <path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12z"/>
              </svg>

              {socialLoading === "google"
                ? "Connecting..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>

            {/* GitHub Login */}
            <button
              type="button"
              disabled={loading || socialLoading !== null}
              onClick={() => handleSocialSignIn("github")}
              className="flex h-[34px] items-center justify-center gap-1.5 rounded-md border border-[#E0E9E1] px-2 text-xs font-semibold transition hover:bg-[#F1F5F1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.2 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.6 1.3a12.5 12.5 0 0 1 6.6 0c2.5-1.6 3.5-1.3 3.5-1.3.7 1.7.3 3 .2 3.3.8.9 1.2 2 1.2 3.4 0 4.8-2.9 5.9-5.6 6.2.5.4.9 1.1.9 2.2v3.1c0 .4.2.7.8.6A11.1 11.1 0 0 0 12 .9z" />
              </svg>

              {socialLoading === "github"
                ? "Connecting..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>

          </div>

          {/* Register Link */}
          <p className="mt-3 text-center text-sm text-[#6E786F]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#078D43] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>

        </div>

        {/* Back Button */}
        <Link
          href="/"
          className="mt-4 block text-center text-sm text-[#89928A] transition hover:text-[#078D43]"
        >
          ← হোম পেজে ফিরে যান
        </Link>

      </div>
    </main>
  );
};

export default SignInPage;
