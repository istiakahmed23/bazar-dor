
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ICategory } from "@/types/type";
import { signOut, useSession } from "@/lib/auth-client";
import ProfileLinks from "@/components/ProfileLinks";
import Image from "next/image";


const CATEGORY_API ="https://api.api-store.workers.dev/api/bazardor/categories";

const Navbar = () => {
  const router = useRouter();

  // Category states
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Mobile menu state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Profile dropdown state
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Date state
  const [currentDate, setCurrentDate] = useState<string>("");

  // Sign out state
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  // Better Auth session
  const { data: session, isPending } = useSession();

  const isAuthenticated = Boolean(session?.user);

  // User information
  const userName = session?.user.name || "User";
  const userImage = session?.user.image;
  const userInitial = userName.charAt(0).toUpperCase();

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(CATEGORY_API);

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: ICategory[] = await res.json();

        setCategories(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Dynamic Bangladesh Date
  useEffect(() => {
    const updateDate = (): void => {
      const date = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(new Date());

      setCurrentDate(date);
    };

    updateDate();

    const interval = setInterval(updateDate, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Close Mobile Menu
  const closeMenu = (): void => {
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  // Toggle Profile Dropdown
  const toggleProfile = (): void => {
    setIsProfileOpen((previousState) => !previousState);
  };

  // Sign Out Function
  const handleSignOut = async (): Promise<void> => {
    try {
      setIsSigningOut(true);
      setAuthError("");

      const result = await signOut();

      if (result.error) {
        throw new Error(
          result.error.message || "Failed to sign out"
        );
      }

      closeMenu();

      router.replace("/");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong";

      setAuthError(message);
    } finally {
      setIsSigningOut(false);
    }
  };

  // Profile Dropdown Content


  return (
    <header className="w-full border-b border-gray-100 bg-white shadow-sm">

      {/* MAIN NAVBAR */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-12 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-700 text-sm text-white">
              🛒
            </div>

            <div>
              <h1 className="text-sm font-bold text-gray-800">
                বাজার দর
              </h1>

              <p className="text-[9px] text-gray-500">
                {currentDate || "তারিখ লোড হচ্ছে..."}
              </p>
            </div>
          </Link>

          {/* DESKTOP AUTHENTICATION */}
          <div className="hidden items-center gap-4 md:flex">

            {isPending ? (
              <span className="text-xs text-gray-400">
                Loading...
              </span>
            ) : isAuthenticated ? (

              /* DESKTOP PROFILE DROPDOWN */
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleProfile}
                  aria-label="Open profile menu"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="menu"
                  className="flex items-center gap-2 rounded-full border border-gray-200 p-1 pr-3 transition hover:bg-gray-50"
                >
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt={userName}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-sm font-semibold text-white">
                      {userInitial}
                    </div>
                  )}

                  <span className="text-xs font-medium text-gray-700">
                    {userName}
                  </span>

                  <svg
                    className={`h-4 w-4 transition-transform ${isProfileOpen ? "rotate-180" : ""
                      }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {isProfileOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-50 mt-2 w-56"
                  >
                    <ProfileLinks
                      userName={userName}
                      onClose={closeMenu}
                      // onSignOut={handleSignOut}
                      // isSigningOut={isSigningOut}
                    />
                  </div>
                )}
              </div>

            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-xs font-medium text-gray-700 transition hover:text-green-700"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-md bg-green-700 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-green-800"
                >
                  সাইন আপ
                </Link>
              </>
            )}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setIsOpen((previousState) => !previousState)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition hover:bg-gray-100 md:hidden"
          >
            {isOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M18 6L6 18M6 6L18 18" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* CATEGORY NAVIGATION */}
      <div className="border-t border-gray-100">
        <nav className="mx-auto max-w-6xl px-4">

          {/* DESKTOP CATEGORIES */}
          <div className="hidden h-9 items-center gap-6 md:flex">
            {loading ? (
              <p className="text-xs text-gray-400">
                Loading categories...
              </p>
            ) : error ? (
              <p className="text-xs text-red-500">{error}</p>
            ) : (
              categories.map((category) => (
                
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="flex items-center gap-1 text-xs font-medium text-gray-700 transition hover:text-green-700"
                >
                  <span>{category.icon}</span>
                  <span>{category.nameBn}</span>
                </Link>
              ))
            )}
          </div>

          {/* MOBILE NAVIGATION */}
          {isOpen && (
            <div className="space-y-1 py-3 md:hidden">

              {/* MOBILE CATEGORIES */}
              {loading ? (
                <p className="px-3 py-2 text-sm text-gray-400">
                  Loading categories...
                </p>
              ) : error ? (
                <p className="px-3 py-2 text-sm text-red-500">
                  {error}
                </p>
              ) : (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <span>{category.icon}</span>
                    <span>{category.nameBn}</span>
                  </Link>
                ))
              )}

              {/* MOBILE AUTHENTICATION */}
              <div className="flex flex-col gap-2 border-t border-gray-100 pt-3">

                {isPending ? (
                  <p className="px-3 py-2 text-sm text-gray-400">
                    Checking authentication...
                  </p>
                ) : isAuthenticated ? (

                  /* MOBILE PROFILE DROPDOWN */
                  <div className="px-2">
                    <button
                      type="button"
                      onClick={toggleProfile}
                      aria-expanded={isProfileOpen}
                      aria-haspopup="menu"
                      className="flex w-full items-center justify-between rounded-md px-2 py-2 transition hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-3">
                        {userImage ? (
                          <Image
                            src={userImage}
                            alt={userName}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-sm font-semibold text-white">
                            {userInitial}
                          </span>
                        )}

                        <span className="text-sm font-medium text-gray-700">
                          {userName}
                        </span>
                      </span>

                      <svg
                        className={`h-4 w-4 transition-transform ${isProfileOpen ? "rotate-180" : ""
                          }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {isProfileOpen && (
                      <div className="mt-2">
                        <ProfileLinks
                      userName={userName}
                      onClose={closeMenu}
                      // onSignOut={handleSignOut}
                      // isSigningOut={isSigningOut}
                    />
                      </div>
                    )}
                  </div>

                ) : (
                  <>
                    <Link
                      href="/signin"
                      onClick={closeMenu}
                      className="rounded-md border border-gray-200 px-4 py-2 text-center text-sm text-gray-700"
                    >
                      সাইন ইন
                    </Link>

                    <Link
                      href="/signup"
                      onClick={closeMenu}
                      className="rounded-md bg-green-700 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                      সাইন আপ
                    </Link>
                  </>
                )}

              </div>
            </div>
          )}
        </nav>
      </div>

      

      {/* AUTHENTICATION ERROR */}
      {authError && (
        <p className="px-4 py-1 text-center text-xs text-red-600">
          {authError}
        </p>
      )}

    </header>
  );
};

export default Navbar;
