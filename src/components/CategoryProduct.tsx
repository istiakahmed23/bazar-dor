'use client';
import { useMemo, useState } from "react";
import { Select, ListBox } from "@heroui/react";
import { ICategory, IProduct } from "@/types/type";
import ProductCard from './ProductCard';
import Link from "next/link";

interface CategoryProductsProps {
  category: ICategory;
  products: IProduct[];
}

type SortOption = "default" | "low" | "high" | "change";

const CategoryProduct = ({ category, products }: CategoryProductsProps) => {
    const [sortBy, setSortBy] = useState<SortOption>("default");

    const sortedProducts = useMemo(() => {
        const result = [...products];

        if (sortBy === "low") {
            result.sort((a, b) => a.today - b.today);
        } else if (sortBy === "high") {
            result.sort((a, b) => b.today - a.today);
        } else if (sortBy === "change") {
            result.sort(
                (a, b) =>
                    Math.abs(b.change.pct) - Math.abs(a.change.pct)
            );
        }

        return result;
    }, [products, sortBy]);

    return (
        <main className="min-h-screen w-full min-w-0 bg-[#f0f5f0]">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-5 lg:px-6">


        {/* Sorting */}
        <section className="mb-3 flex justify-end rounded-xl border border-[#e3eae4] bg-white p-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">সাজান</span>

            <Select
              className="w-[130px]"
              value={sortBy}
              onChange={(value) => {
                if (value) setSortBy(value as SortOption);
              }}
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox aria-label="পণ্য সাজান">
                  <ListBox.Item id="default" textValue="ডিফল্ট">
                    ডিফল্ট
                  </ListBox.Item>
                  <ListBox.Item id="low" textValue="কম দাম">
                    কম দাম
                  </ListBox.Item>
                  <ListBox.Item id="high" textValue="বেশি দাম">
                    বেশি দাম
                  </ListBox.Item>
                  <ListBox.Item id="change" textValue="দামের পরিবর্তন">
                    দামের পরিবর্তন
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </section>

        {/* Product Count */}
        <p className="mb-3 text-xs text-gray-500 sm:text-sm">
          মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Products */}
        {sortedProducts.length > 0 ? (
          <div
          
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
                
              <div key={product.id} className="min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[#e3eae4] bg-white p-10 text-center text-sm text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </main>
    );
};

export default CategoryProduct;