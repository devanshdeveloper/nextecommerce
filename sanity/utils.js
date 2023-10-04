import { createClient, groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: "gg4qbk77",
  dataset: "production",
  apiVersion: "2023-06-30",
  useCdn: false,
};
const builder = imageUrlBuilder(config);
const client = createClient(config);

export function getProducts() {
  return client.fetch(groq`*[_type=="product"]{
    _id,
    name, 
    productImage,
    price,
    slug
  }`);
}

export function getProductsById(ids) {
  return client.fetch(
    groq`*[_type=="product" && _id in $ids]{
    _id,
    name, 
    productImage,
    price,
    slug
  }`,
    { ids }
  );
}

export function getProduct(slug) {
  return client.fetch(
    groq`*[_type=="product"&&slug.current==$slug][0]{
    _id,
    name, 
    productImage,
    price,
    description,
    reviews[]->
  }`,
    { slug }
  );
}
export function getProductById(id) {
  return client.fetch(
    groq`*[_type=="product"&&_id==$id][0]{
    _id,
    name, 
    productImage,
    price,
    description,
  }`,
    { id }
  );
}
export function getCategory(category) {
  return client.fetch(groq`*[_type=="category"&&name==$category]{
    name,
    _id,
    slug,
    products[]-> {
      _id,
      name, 
      productImage,
      price,
      description,
    },
    description,
  }`, {
    category,
  });
}
export function getCategories() {
  return client.fetch(groq`*[_type=="category"]{
    name,
    _id,
    slug,
    products[]-> {
      _id,
      name, 
      productImage,
      price,
      description,
    },
    description,
  }`);
}

export function addProduct({ name, productImage, price, description }) {
  return client.create({
    _type: "product",
    productImage: getImageURL(productImage),
    name,
    price,
    description,
  });
}

export function getImageURL(source) {
  return builder.image(source);
}
