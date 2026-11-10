
"use client";

import { ICategory } from "@/types/type";
import { useEffect, useState } from "react";




const Marquee = () => {
  

  return (
    <section
      aria-label="আজকের বাজার দর"
      className="w-full overflow-hidden border-y border-gray-200 bg-[#F8FAF8]"
    >
      <div className="marquee-container flex h-10 items-center">

        <div className="marquee-content flex w-max shrink-0 items-center">

         

        </div>
      </div>
    </section>
  );
};

export default Marquee;
