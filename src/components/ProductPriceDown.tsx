import { IProduct } from '@/types/type';
import  { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductPriceDown = () => {
    const [downPrice, setDownPrice] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect (()=>{
        const fetchDownPrice = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
                const data: IProduct[] = await res.json();
                const filteredProds = data.filter((item)=> item.change.dir === "down")
                .sort((a,b)=> b.change.pct - a.change.pct)
                .slice(0,6);
                setDownPrice(filteredProds);

            }catch(error){
               console.log(error); 
            }finally{
                setLoading(false);
            }

        };
        fetchDownPrice();

    },[]);

    if(loading){
        return <p className="py-4 text-sm text-gray-500">Loading products...</p>;
    }


    return (
        <section className="mb-8 w-full">
  <h2 className="mb-4 text-base font-bold text-[#253329] sm:text-lg">
    <span className="text-green-600">▼</span> আজ দাম কমেছে
  </h2>

  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {downPrice.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</section>
    );
};

export default ProductPriceDown;