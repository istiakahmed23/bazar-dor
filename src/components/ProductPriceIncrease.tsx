'use client';
import React, { useEffect, useState } from 'react';
import { IProduct } from "@/types/type";
import ProductCard from './ProductCard';

const ProductPriceIncrease = () => {
    const [topProducts, setTopProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate an API call to fetch top products
        const fetchTopProducts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
                const data: IProduct[] = await res.json();
                const filteredProducts = data.filter((item) => item.change.dir === "up")
                    .sort((a, b) => b.change.pct - a.change.pct)
                    .slice(0, 6);
                setTopProducts(filteredProducts);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopProducts();
    }, [])

    if (loading) {
    return <p className="py-4 text-sm text-gray-500">Loading products...</p>;
  }

    
    return (
        <section className="container mx-auto mb-8 w-full">

            <div>
                    <h2 className="mb-4 text-base font-bold text-[#253329] sm:text-lg">
                        🔺 আজ দাম বেড়েছে
                    </h2>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {topProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>

                </div>

        </section>
    );
};

export default ProductPriceIncrease;