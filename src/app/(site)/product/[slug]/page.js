import Link from "next/link";
import { getImageURL, getProduct } from "../../../../../sanity/utils";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import AddToCart from "@/components/AddToCart";

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return (
      <div className="w-full h-screen flex gap-16 flex-col items-center justify-center">
        <div className="text-2xl">Product Not Found</div>
        <Link className="btn btn-default" href="/shop">
          Back to Shop
        </Link>
      </div>
    );
  }
  

  const { name, productImage, price, reviews, description, _id, ...props } =
  product;

  return (
    <div className="flex flex-col lg:flex-row w-[min(1000px,90vw)] mx-auto pt-10 gap-16">
      <Image
        src={getImageURL(productImage).url()}
        height={500}
        width={500}
        alt={productImage.alt || name}
        className="rounded-lg"
      />
      <div className="space-y-3">
        <div className="text-xl md:text-2xl lg:text-3xl">{name}</div>
        <div className="text-lg md:text-xl lg:text-2xl">Rs. {price}</div>
        <div>
          <div className="text-lg md:text-xl lg:text-2xl">Description</div>
          <PortableText value={description} />
        </div>
        <AddToCart className="btn btn-default" productId={_id}></AddToCart>
        <div className="">
          <div className="text-lg md:text-xl lg:text-2xl">Reviews</div>
          <div className="space-y-2">
            {reviews ? (
              reviews.map((review) => (
                <div key={review._id}>
                  <div className="font-medium">{review.user}</div>
                  <div>{review.review}</div>
                </div>
              ))
            ) : (
              <div>No Reviews</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
