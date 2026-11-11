import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <section className="w-full bg-[#F1F6F2] py-5 sm:py-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-5 rounded-[20px] border border-[#E1EAE3] bg-[#FAFCFA] px-5 py-6 sm:grid-cols-[1fr_200px] sm:px-7 sm:py-5 md:grid-cols-[1fr_230px] md:px-9 lg:px-10">

          {/* Left Content */}
          <div className="flex flex-col items-start">
            <span className="rounded-full bg-[#DDF2E4] px-3 py-1 text-xs font-medium text-[#168B45] sm:text-sm">
              শনিবার, ৮ অগ্রহায়ণ, ২০২৬
            </span>

            <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#202A23] sm:text-3xl md:text-[34px]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-3 max-w-[590px] text-sm leading-6 text-[#727B74] sm:text-[15px]">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, দ্রুত, সর্বনিম্ন-সর্বাধিক
              এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="/products"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#078B43] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#067438] hover:shadow-md"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Right Side Image */}
          <div className="relative flex h-full min-h-[200px] w-full items-center justify-center sm:min-h-[210px]">
            <div className="relative h-[210px] w-full sm:h-[220px] md:h-[230px] lg:h-[240px]">
              <Image
                src="/images/bazar-hero.png"
                alt="Vegetable basket illustration"
                fill
                priority
                sizes="(max-width: 640px) 170px, (max-width: 768px) 190px, 210px"
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
    );
};

export default Hero;