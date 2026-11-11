
const Footer = () => {
  return (
    <footer className="w-full border-t border-[#e5ebe5] bg-[#fcfdfc]">

      <div className="mx-auto flex min-h-[48px] max-w-7xl flex-col items-center justify-between gap-2 px-4 py-3 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">

        {/* Left Content */}
        <p className="text-[11px] leading-relaxed text-[#526055] sm:text-xs">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right Content */}
        <p className="text-[11px] leading-relaxed text-[#526055] sm:text-xs">
          সকল দাম সম্ভাব্য; বাজার অবস্থার উপর ভিত্তি করে পরিবর্তিত হয়।
        </p>

      </div>

    </footer>
  );
};

export default Footer;
