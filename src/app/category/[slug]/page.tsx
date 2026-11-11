import CategoryProduct from "@/components/CategoryProduct";
import { ICategory, IProduct } from "@/types/type";

const CategoryPage = async({params}: {params: {slug: string}})=> {

    const { slug } = await params;
  //   console.log(slug);
  const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/products?category=${slug}`,);
  const products: IProduct[] = await res.json();
  //   console.log(products);
  const resCat = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`,);
  const category: ICategory = await resCat.json();
    
       
    

    return (
        <main className="min-h-screen w-full bg-[#f0f5f0] px-3 py-6 sm:px-5 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* Category Header */}
        <section className="mb-5 flex items-center gap-3 rounded-xl border border-[#e3eae4] bg-white p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
            {category.icon}
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#253329] sm:text-2xl">
              {category.nameBn}
            </h1>
            <p className="text-xs text-gray-500 sm:text-sm">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        <CategoryProduct
          category={category}
          products={products}
        />
      </div>
    </main>
    );
}

export default CategoryPage;
