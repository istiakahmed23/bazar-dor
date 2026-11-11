
import { IProduct } from "@/types/type";
import { formatPrice } from "@/lib/formatPrice";

interface MarketPriceTableProps {
  product: IProduct;
}

const MarketPriceTable = ({ product }: MarketPriceTableProps) => {
  return (
    <section className="rounded-xl border border-[#e2eae3] bg-[#fcfdfc] p-4 sm:p-5">

      <h2 className="mb-4 text-sm font-bold text-[#26342a] sm:text-base">
        বাজারভিত্তিক আজকের দাম
      </h2>

      <div className="overflow-x-auto rounded-lg border border-[#e5eae6]">

        <table className="w-full min-w-[600px] border-collapse text-left">

          {/* Table header */}
          <thead>
            <tr className="bg-[#f7faf7] text-[11px] font-medium text-gray-500 sm:text-xs">

              <th className="px-3 py-3 font-semibold">
                বাজার
              </th>

              <th className="px-3 py-3 font-semibold">
                বিভাগ
              </th>

              <th className="px-3 py-3 text-right font-semibold">
                সর্বনিম্ন
              </th>

              <th className="px-3 py-3 text-right font-semibold">
                সর্বোচ্চ
              </th>

              <th className="px-3 py-3 text-right font-semibold">
                গড়
              </th>

            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {product.markets.map((market, index) => {

              const averagePrice =
                (market.min + market.max) / 2;

              return (
                <tr
                  key={`${market.market}-${index}`}
                  className={`border-t border-[#dce3dd] text-[11px] text-[#303a32] transition-colors hover:bg-[#eaf1eb] sm:text-xs ${
                    index % 2 === 0
                      ? "bg-[#f0f5f0]"
                      : "bg-[#fcfdfc]"
                  }`}
                >

                  <td className="px-3 py-3 font-medium">
                    {market.market}
                  </td>

                  <td className="px-3 py-3">
                    {market.division}
                  </td>

                  <td className="px-3 py-3 text-right whitespace-nowrap">
                    {formatPrice(market.min)} টাকা
                  </td>

                  <td className="px-3 py-3 text-right whitespace-nowrap">
                    {formatPrice(market.max)} টাকা
                  </td>

                  <td className="px-3 py-3 text-right font-semibold whitespace-nowrap text-[#253329]">
                    {formatPrice(averagePrice)} টাকা
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      {product.markets.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500">
          কোনো বাজারের তথ্য পাওয়া যায়নি।
        </p>
      )}

      <p className="mt-3 text-[10px] text-gray-400">
        সকল মূল্য বাংলাদেশি টাকা প্রতি {product.unit === "kg" ? "কেজি" : product.unit} হিসেবে দেখানো হয়েছে।
      </p>

    </section>
  );
};

export default MarketPriceTable;
