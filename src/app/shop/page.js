import ProductCard from "@/components/ProductCard";
import { getProducts } from "../../../sanity/utils";

export default async function Page() {
  const products = await getProducts();
  console.log(products);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 p-10 gap-10">
      <ProductCard title="Product Title" />
      <ProductCard title="Product Title" />
      <ProductCard title="Product Title" />
      <ProductCard title="Product Title" />
      <ProductCard title="Product Title" />
      <ProductCard title="Product Title" />
      <ProductCard title="Product Title" />
    </div>
  );
}
