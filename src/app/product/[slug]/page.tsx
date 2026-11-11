import { IProduct } from '@/types/type';
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import ProductHeader from '@/components/product-details/ProductHeader';
import PriceSummary from '@/components/product-details/PriceSummary';
import MarketPriceTable from '@/components/product-details/MarketPriceTable';

const SingleProdPage = async ({params,}: {params: Promise<{ slug: string }>})  => {
    const { slug } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    notFound();
  }
    const product: IProduct = await res.json();

    return (
        <main className="min-h-screen bg-[#f0f5f0] pb-7">

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-5 lg:px-6">

        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] text-gray-600">

          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            হোম
          </Link>

          <ChevronRight size={13} />

          <Link
            href={`/categories/${product.category}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <ChevronRight size={13} />

          <span className="font-medium text-[#26342a]">
            {product.nameBn}
          </span>

        </nav>

        {/* Product Details */}
        <div className="space-y-4">

          {/* Product Header */}
          <ProductHeader product={product} />

          {/* Price Summary */}
          <PriceSummary product={product} />
            {/* Market Table */}
          <MarketPriceTable product={product} />

        </div>

      </div>

    </main>
    );
};

export default SingleProdPage;