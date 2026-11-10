
import Link from "next/link";
import SignOutButton from "./SignOutButton";


interface ProfileLinksProps {
  userName: string;
  onClose: () => void;
  
}

const ProfileLinks = ({
  userName,
  onClose,
  
}: ProfileLinksProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">

      {/* USER INFORMATION */}
      <div className="border-b border-gray-100 px-4 py-3">
        <p className="text-sm font-semibold text-gray-800">
          {userName}
        </p>
        <p className="text-xs text-gray-500">
          আপনার অ্যাকাউন্ট
        </p>
      </div>

      <div className="p-1">

        {/* PROFILE */}
        <Link
          href="/profile"
          onClick={onClose}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
        >
          <span>👤</span>
          <span>প্রোফাইল</span>
        </Link>

        {/* UPDATE PROFILE */}
        <Link
          href="/profile/updateprofile"
          onClick={onClose}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
        >
          <span>✏️</span>
          <span>আপডেট প্রোফাইল</span>
        </Link>

        <div className="my-1 border-t border-gray-100" />

        {/* SIGN OUT */}
        <SignOutButton />   

      </div>
    </div>
  );
};

export default ProfileLinks;
