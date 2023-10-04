import ProductCard from "@/components/ProductCard";
import { getCategory } from "../../../../sanity/utils";

export default async function Page({ params }) {
  const category = await getCategory(params.category);
  if (!category) return <h2>Category Not Exist</h2>;
  if (category.length === 0) return <h2>No Products in category</h2>;
  console.log(category[0]);
  return (
    <div className="w-[min(90vw,1000px)] mx-auto pt-10 space-y-5">
      <h2 className="text-2xl lg:text-4xl">{category[0].name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {category[0].products?.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}
