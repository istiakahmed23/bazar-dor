
import { IProduct } from "@/types/type";
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";

interface PriceSummaryProps {
  product: IProduct;
}

const PriceSummary = ({ product }: PriceSummaryProps) => {

  const marketPrices = product.markets;

  const minimumPrice = marketPrices.length
    ? Math.min(...marketPrices.map((market) => market.min))
    : 0;

  const maximumPrice = marketPrices.length
    ? Math.max(...marketPrices.map((market) => market.max))
    : 0;

  const averagePrice = marketPrices.length
    ? (minimumPrice + maximumPrice) / 2
    : 0;

  const summaryItems = [
    {
      title: "সর্বনিম্ন দাম",
      price: minimumPrice,
      description: "সবচেয়ে কম বাজার দর",
      color: "text-green-600",
      icon: ArrowDown,
    },
    {
      title: "সর্বোচ্চ দাম",
      price: maximumPrice,
      description: "সবচেয়ে বেশি বাজার দর",
      color: "text-red-500",
      icon: ArrowUp,
    },
    {
      title: "গড় দাম",
      price: averagePrice,
      description: "প্রতি কেজির গড় মূল্য",
      color: "text-green-600",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="rounded-xl border border-[#e2eae3] bg-[#fcfdfc] p-4 sm:p-5">

      <h2 className="mb-4 text-sm font-bold text-[#26342a] sm:text-base">
        দামের সারসংক্ষেপ
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-[#e2eae3] bg-[#fafcfb] px-4 py-3 transition-colors hover:bg-white"
            >
              <p className="text-[11px] font-medium text-gray-600">
                {item.title}
              </p>

              <div className={`mt-1 flex items-center gap-1 ${item.color}`}>
                <span className="text-lg font-bold">
                  {formatPrice(item.price)}
                </span>

                <span className="text-xs font-medium">
                  টাকা
                </span>
              </div>

              <p className="mt-1 text-[10px] text-gray-500">
                {item.description}
              </p>
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default PriceSummary;
