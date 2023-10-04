import ProductCard from "@/components/ProductCard";
import { getCategories } from "../../../sanity/utils";

export default async function Home() {
  const categories = await getCategories();
  return (
    <div className="w-[min(90vw,1000px)] mx-auto">
      {categories.map((category) => {
        return category.products?.map((product) => (
          <div key={product._id}>
            <h2 className="text-2xl lg:text-4xl py-5">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <ProductCard key={product._id} {...product} />
            </div>
          </div>
        ));
      })}
    </div>
  );
}
