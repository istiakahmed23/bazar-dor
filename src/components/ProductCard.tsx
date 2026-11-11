
import Link from "next/link";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { IProduct } from "@/types/type";


interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-xl border border-[#e3eae4] bg-white p-3 transition-all duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-md sm:p-4"
    >
      {/* Product information */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f5f0] text-2xl">
          {product.image || "🍚"}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-[#253329] transition-colors group-hover:text-green-700 sm:text-base">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      {/* Price information */}
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-lg font-bold text-[#243329] sm:text-xl">
            {product.today} টাকা
          </p>
        </div>

        {/* Price change badge */}
        <div
          className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? (
            <ArrowUp size={11} />
          ) : isDown ? (
            <ArrowDown size={11} />
          ) : (
            <Minus size={11} />
          )}

          {Math.abs(product.change.pct)}%
        </div>
      </div>
    </Link>
  );
}
