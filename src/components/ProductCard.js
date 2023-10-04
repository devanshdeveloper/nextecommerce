import Image from "next/image";
import { getImageURL } from "../../sanity/utils";
import AddToCart from "./AddToCart";

function ProductCard({ name, _id, productImage, price, slug, ...props }) {
  return (
    <div className="space-y-1 p-3 bg-white rounded-md">
      <Image
        src={getImageURL(productImage).url()}
        height={200}
        width={300}
        className="object-fill w-full"
        style={{aspectRatio : "3/2"}}
        alt={productImage.alt || name}
      />
      <div className="text-xl">{name}</div>
      <div>Rs. {price}</div>
      <AddToCart className="btn btn-default" productId={_id} />
    </div>
  );
}

export default ProductCard;
