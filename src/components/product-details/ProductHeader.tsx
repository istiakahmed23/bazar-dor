
import { IProduct } from "@/types/type";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";

interface ProductHeaderProps {
  product: IProduct;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const priceDifference = Math.abs(product.today - product.yesterday);

  const changeColor = isUp
    ? "text-red-500"
    : isDown
      ? "text-green-600"
      : "text-gray-500";

  return (
    <section className="flex flex-col items-start justify-between gap-5 rounded-xl border border-[#e2eae3] bg-[#fcfdfc] p-4 sm:flex-row sm:items-center sm:p-5">

      {/* Left side: Product information */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eff4ef] text-3xl sm:h-[58px] sm:w-[58px]">
          {product.image || "🍚"}
        </div>

        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-[#202b23] sm:text-2xl">
            {product.nameBn}
          </h1>

          <p className="mt-0.5 text-xs text-gray-500">
            {product.categoryNameBn} · চাল
          </p>

          <p className="mt-2 text-[11px] text-[#364239] sm:text-xs">
            {isUp
              ? "গতকালের তুলনায় আজ দাম বেড়েছে"
              : isDown
                ? "গতকালের তুলনায় আজ দাম কমেছে"
                : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
            {" - "}
            {formatPrice(priceDifference)} টাকা
          </p>
        </div>
      </div>

      {/* Right side: Today's price */}
      <div className="w-full rounded-xl bg-[#f0f5f0] px-5 py-3 text-center sm:w-[115px] sm:shrink-0">

        <p className="text-[11px] text-gray-500">
          আজকের দাম
        </p>

        <h2 className="mt-0.5 text-2xl font-bold leading-tight text-[#253329]">
          {formatPrice(product.today)}
        </h2>

        <p className="mt-1 text-[10px] text-gray-500">
          টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
        </p>

        <div className={`mt-1 flex items-center justify-center gap-1 text-xs font-bold ${changeColor}`}>
          {isUp ? (
            <ArrowUp size={12} />
          ) : isDown ? (
            <ArrowDown size={12} />
          ) : (
            <Minus size={12} />
          )}

          {formatPrice(product.change.pct)}%
        </div>
      </div>

    </section>
  );
};

export default ProductHeader;
