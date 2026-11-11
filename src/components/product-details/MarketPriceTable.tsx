
import { IProduct } from "@/types/type";
import { formatPrice } from "@/lib/formatPrice";
import { MapPin } from "lucide-react";

interface MarketPriceTableProps {
  product: IProduct;
}

const MarketPriceTable = ({ product }: MarketPriceTableProps) => {
  return (
   <section className="w-full min-w-0 rounded-xl border border-[#e2eae3] bg-[#fcfdfc] p-3 sm:p-5">

      <h2 className="mb-4 text-sm font-bold text-[#26342a] sm:text-base">
        বাজারভিত্তিক আজকের দাম
      </h2>

      {/* ================================= */}
      {/* DESKTOP AND TABLET TABLE */}
      {/* ================================= */}

      <div className="hidden overflow-hidden rounded-lg border border-[#e5eae6] md:block">

        <table className="w-full border-collapse text-left">

          <thead>
            <tr className="bg-[#f7faf7] text-xs text-gray-500">

              <th className="px-4 py-3 font-semibold">
                বাজার
              </th>

              <th className="px-4 py-3 font-semibold">
                বিভাগ
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                সর্বনিম্ন
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                সর্বোচ্চ
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                গড়
              </th>

            </tr>
          </thead>

          <tbody>
            {product.markets.map((market, index) => {

              const averagePrice =
                (market.min + market.max) / 2;

              return (
                <tr
                  key={`${market.market}-${index}`}
                  className={`border-t border-[#dce3dd] text-xs text-[#303a32] transition-colors hover:bg-[#eaf1eb] ${
                    index % 2 === 0
                      ? "bg-[#f0f5f0]"
                      : "bg-[#fcfdfc]"
                  }`}
                >

                  <td className="px-4 py-3 font-medium">
                    {market.market}
                  </td>

                  <td className="px-4 py-3">
                    {market.division}
                  </td>

                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {formatPrice(market.min)} টাকা
                  </td>

                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {formatPrice(market.max)} টাকা
                  </td>

                  <td className="px-4 py-3 text-right font-semibold whitespace-nowrap text-green-700">
                    {formatPrice(averagePrice)} টাকা
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      {/* ================================= */}
      {/* MOBILE MARKET CARDS */}
      {/* ================================= */}

      <div className="grid grid-cols-1 gap-3 md:hidden">

        {product.markets.map((market, index) => {

          const averagePrice =
            (market.min + market.max) / 2;

          return (
            <div
              key={`${market.market}-${index}`}
              className="rounded-xl border border-[#e2eae3] bg-white p-3 transition-colors hover:border-green-300"
            >

              {/* Market name */}
              <div className="flex items-start justify-between gap-2">

                <div className="flex min-w-0 items-center gap-2">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0f5f0]">
                    <MapPin
                      size={15}
                      className="text-green-700"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-[#26342a]">
                      {market.market}
                    </h3>

                    <p className="mt-0.5 text-[11px] text-gray-500">
                      {market.division}
                    </p>
                  </div>

                </div>

                <span className="shrink-0 rounded-full bg-[#f0f5f0] px-2 py-1 text-[10px] text-green-700">
                  #{formatPrice(index + 1)}
                </span>

              </div>

              {/* Market prices */}
              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#edf0ed] pt-3">

                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 sm:text-xs">
                    সর্বনিম্ন
                  </p>

                  <p className="mt-1 break-words text-xs font-bold text-[#253329] sm:text-sm">
                    {formatPrice(market.min)}
                    <span className="ml-0.5 text-[9px] font-normal text-gray-500">
                      টাকা
                    </span>
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 sm:text-xs">
                    সর্বোচ্চ
                  </p>

                  <p className="mt-1 break-words text-xs font-bold text-[#253329] sm:text-sm">
                    {formatPrice(market.max)}
                    <span className="ml-0.5 text-[9px] font-normal text-gray-500">
                      টাকা
                    </span>
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 sm:text-xs">
                    গড়
                  </p>

                  <p className="mt-1 break-words text-xs font-bold text-green-700 sm:text-sm">
                    {formatPrice(averagePrice)}
                    <span className="ml-0.5 text-[9px] font-normal text-gray-500">
                      টাকা
                    </span>
                  </p>
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Empty state */}
      {product.markets.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500">
          কোনো বাজারের তথ্য পাওয়া যায়নি।
        </p>
      )}

      

    </section>
  
  );
};

export default MarketPriceTable;
