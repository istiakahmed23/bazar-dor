'use client';
import Allproducts from "@/components/Allproducts";
import Hero from "@/components/Hero";
import ProductPriceDown from "@/components/ProductPriceDown";
import ProductPriceIncrease from "@/components/ProductPriceIncrease";

export default function Home() {
  return (
    <main className="w-full min-w-0 overflow-x-clip">

      <div className="mx-auto w-full max-w-7xl min-w-0 px-3 py-6 sm:px-5 lg:px-8" >
        <Hero />
        <ProductPriceIncrease />
        <ProductPriceDown />
        <Allproducts/>
      </div>
    </main>
  );
}
