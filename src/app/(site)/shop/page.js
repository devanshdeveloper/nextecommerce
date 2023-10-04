import ProductCard from "@/components/ProductCard";
import { getProducts } from "../../../../sanity/utils";

export default async function Page() {
  const products = await getProducts();
  console.log(products);
  return (
    <div className="w-[min(90vw,1000px)] mx-auto">
      <h2 className="text-2xl lg:text-4xl py-4">Shop</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}
