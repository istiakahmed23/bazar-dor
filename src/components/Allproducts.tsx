'use client';

import { IProduct } from "@/types/type";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Allproducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
                const data: IProduct[] = await res.json();
                setProducts(data);

            } catch (error) {
                console.error("Error fetching all products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllProducts();
    }, []);

    if (loading) {
        return <p className="py-4 text-sm text-gray-500">Loading products...</p>;
    }

    return (
        <section id="all-products" className="mb-8 w-full">
            <div>

                <h2 className="mb-4 text-base font-bold text-[#253329] sm:text-lg">
                     সব পণ্য
                </h2>
                <p className="mb-4 text-sm text-gray-400">
                    মোট ৩৩টি পণ্য দেখানো হচ্ছে
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default Allproducts;