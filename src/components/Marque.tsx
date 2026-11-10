
"use client";

import { useCallback, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { IProduct } from "@/types/type";

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

const Marque = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(API_URL, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: unknown = await res.json();

      // Support both direct arrays and { data: [...] } responses
      let productData: IProduct[];

      if (Array.isArray(data)) {
        productData = data as IProduct[];
      } else if (
        data &&
        typeof data === "object" &&
        "data" in data &&
        Array.isArray(data.data)
      ) {
        productData = data.data as IProduct[];
      } else {
        throw new Error("Invalid product API response");
      }

      setProducts(productData);
      setError(false);
    } catch (err) {
      console.error("Product fetching error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + automatic refresh
  useEffect(() => {
    fetchProducts();

    const interval = setInterval(() => {
      fetchProducts();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchProducts]);

  // Loading state
  if (loading) {
    return (
      <div className="flex h-10 items-center bg-[#F8FAF8] px-4">
        <p className="text-xs text-gray-400">
          বাজার দর লোড হচ্ছে...
        </p>
      </div>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <div className="flex h-10 items-center bg-[#F8FAF8] px-4">
        <p className="text-xs text-gray-400">
          বাজার দরের তথ্য পাওয়া যাচ্ছে না।
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-[#F8FAF8]">

      <Marquee
        speed={40}
        direction="left"
        pauseOnHover={true}
        gradient={false}
        autoFill={true}
      >
        {products.map((product) => {
          // Price direction
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          // Dynamic arrow
          const arrow = isUp
            ? "▲"
            : isDown
              ? "▼"
              : "—";

          // Dynamic color
          const color = isUp
            ? "text-red-500"
            : isDown
              ? "text-green-600"
              : "text-gray-400";

          // Format price
          const price = new Intl.NumberFormat("bn-BD").format(
            product.today
          );

          // Format percentage
          const percentage = new Intl.NumberFormat("bn-BD", {
            maximumFractionDigits: 1,
          }).format(Math.abs(product.change.pct));

          return (
            <div
              key={product.id}
              className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 px-3 py-2 sm:gap-2 sm:px-4"
            >
              {/* Product Icon */}
              <span className="text-sm">
                {product.categoryIcon}
              </span>

              {/* Product Name */}
              <span className="whitespace-nowrap text-[11px] font-medium text-gray-700 sm:text-xs">
                {product.nameBn}
              </span>

              {/* Today's Price */}
              <span className="whitespace-nowrap text-[11px] font-semibold text-gray-800 sm:text-xs">
                {price} টাকা/{product.unit}
              </span>

              {/* Price Change */}
              <span
                className={`flex items-center gap-1 whitespace-nowrap text-[10px] font-bold sm:text-[11px] ${color}`}
              >
                <span>{arrow}</span>
                <span>{percentage}%</span>
              </span>
            </div>
          );
        })}
      </Marquee>

    </div>
  );
};

export default Marque;
