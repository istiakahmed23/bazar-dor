
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";




const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-[#F1F6F1] px-4 py-10 sm:py-14">

      <div className="mx-auto max-w-3xl space-y-5">

        {/* Back to Home */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-green-700"
          >
            <span>←</span>
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>

        {/* Page Heading */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#26332A]">
            আমার প্রোফাইল
          </h1>

          <p className="text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Information Card */}
        <section className="flex flex-col gap-4 rounded-xl border border-[#DFE8DF] bg-[#FBFDFB] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

          {/* User Details */}
          <div className="flex items-center gap-4">

            {/* User Avatar */}
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User profile"}
                  fill
                  sizes="56px"
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-green-100 text-xl font-bold text-green-700">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name and Email */}
            <div className="min-w-0 space-y-1">
              <h2 className="truncate text-base font-semibold text-[#26332A]">
                {user.name || "ব্যবহারকারী"}
              </h2>

              <p className="truncate text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="sm:shrink-0">
            <SignOutButton />
          </div>

        </section>

        {/* Personal Information Card */}
        <section className="space-y-6 rounded-xl border border-[#DFE8DF] bg-[#FBFDFB] p-5 sm:p-6">

          <h3 className="text-base font-semibold text-[#26332A]">
            তথ্য
          </h3>

          {/* Name Field */}
          <div className="space-y-2 px-0 sm:px-3">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="userName"
              type="text"
              value={user.name || ""}
              readOnly
              className="h-10 w-full rounded-lg border border-[#DFE8DF] bg-transparent px-3 text-sm text-gray-700 outline-none"
            />

            {/* Update Button */}
            <Link
              href="/profile/updateprofile"
              className="flex h-10 w-full items-center justify-center rounded-lg bg-green-500 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#067638] hover:shadow-lg"
            >
              আপডেট
            </Link>
          </div>

        </section>

      </div>
    </main>
  );
};

export default ProfilePage;
