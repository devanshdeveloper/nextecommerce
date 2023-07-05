import { createClient, groq } from "next-sanity";

const config = {
  projectId: "gg4qbk77",
  dataset: "production",
  apiVersion: "2023-06-30",
  useCdn: false,
};

export function getProducts() {
  return createClient(config).fetch(
    groq`*[_type=="product"]`
  );
}
