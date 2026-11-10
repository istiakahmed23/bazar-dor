
"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";

const SignOutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);

      await signOut();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="flex items-center justify-center gap-1.5 rounded-lg border border-red-400 px-3 py-2 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <HiOutlineLogout className="h-4 w-4" />

      {loading ? "অপেক্ষা করুন..." : "সাইন আউট"}
    </button>
  );
};

export default SignOutButton;
