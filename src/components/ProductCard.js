"use client";

import Image from "next/image";
import { getImageURL } from "../../sanity/utils";
import Link from "next/link";
import AddToCart from "./AddToCart";

function ProductCard({
  name,
  _id,
  productImage,
  price,
  slug,
  quantity,
  ...props
}) {
  return (
    <div className="space-y-1">
      <Image
        src={getImageURL(productImage).url()}
        height={200}
        width={300}
        className="object-fill"
        alt={productImage.alt || name}
      />
      <div className="text-xl">{name}</div>
      <div>Rs. {price}</div>
      {!quantity ? (
        <Link href={`product/${slug.current}`}>Buy</Link>
      ) : (
        <AddToCart
          className="btn btn-default"
          productId={_id}
          {...{ quantity }}
        />
      )}
    </div>
  );
}

export default ProductCard;
